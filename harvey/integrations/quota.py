"""Claude subscription quota gauge.

Reads the real 5-hour-window and weekly utilization the same way Claude
Code's own /usage command does: GET api.anthropic.com/api/oauth/usage with
the locally-stored OAuth token. The endpoint is undocumented, so every
failure degrades to None and callers fall back to Harvey's own call
counting. Responses are cached in-memory to stay polite.
"""

import asyncio
import json
import logging
import subprocess
import sys
import time
from pathlib import Path
from typing import Optional

import httpx

from harvey.usage import claude_config_dir

logger = logging.getLogger("harvey.quota")

USAGE_URL = "https://api.anthropic.com/api/oauth/usage"
OAUTH_BETA_HEADER = "oauth-2025-04-20"
CACHE_TTL_OK = 300.0     # seconds to reuse a good response
CACHE_TTL_FAIL = 60.0    # seconds to back off after a failure
# The endpoint rate-limits hard (429), and Claude Code polls it with the same
# token. One reading on disk is shared by Harvey, the dashboard and the CLI and
# survives restarts; when a fetch fails, a reading up to STALE_OK old stands in
# rather than dropping to the much stricter call counter.
SHARED_CACHE = Path(__file__).resolve().parents[2] / "data" / "quota_cache.json"
STALE_OK = 1800.0
REQUEST_TIMEOUT = httpx.Timeout(connect=5.0, read=10.0, write=5.0, pool=5.0)

# macOS keychain item Claude Code stores credentials under.
KEYCHAIN_SERVICE = "Claude Code-credentials"


def _token_from_json_blob(blob: str) -> Optional[str]:
    try:
        data = json.loads(blob)
    except (json.JSONDecodeError, TypeError):
        return None
    if not isinstance(data, dict):
        return None
    oauth = data.get("claudeAiOauth")
    if isinstance(oauth, dict):
        token = oauth.get("accessToken")
        if isinstance(token, str) and token:
            return token
    return None


def get_oauth_token() -> Optional[str]:
    """Find the Claude Code OAuth access token on this machine.

    Tries the credentials file (Linux / CLAUDE_CONFIG_DIR overrides),
    then the macOS keychain. Returns None when not logged in.
    """
    creds_file = claude_config_dir() / ".credentials.json"
    try:
        if creds_file.is_file():
            token = _token_from_json_blob(creds_file.read_text())
            if token:
                return token
    except OSError as e:
        logger.debug(f"Could not read {creds_file}: {e}")

    # Default config dir fallback, in case CLAUDE_CONFIG_DIR points elsewhere
    default_creds = Path.home() / ".claude" / ".credentials.json"
    if default_creds != creds_file:
        try:
            if default_creds.is_file():
                token = _token_from_json_blob(default_creds.read_text())
                if token:
                    return token
        except OSError:
            pass

    if sys.platform == "darwin":
        # Claude Code stores credentials per config dir: the default item is
        # "Claude Code-credentials", but a CLAUDE_CONFIG_DIR install uses a
        # hash-suffixed service name (and the default item may hold an empty
        # token). Enumerate every matching service and take the first item
        # with a real token.
        for service in _keychain_services():
            try:
                result = subprocess.run(
                    ["security", "find-generic-password", "-s", service, "-w"],
                    capture_output=True, text=True, timeout=5,
                )
            except (subprocess.TimeoutExpired, OSError) as e:
                logger.debug(f"Keychain lookup failed for {service}: {e}")
                continue
            if result.returncode == 0:
                token = _token_from_json_blob(result.stdout.strip())
                if token:
                    return token

    return None


def _keychain_services() -> list[str]:
    """All keychain service names Claude Code may store credentials under."""
    services = [KEYCHAIN_SERVICE]
    try:
        dump = subprocess.run(
            ["security", "dump-keychain"],
            capture_output=True, text=True, timeout=10,
        )
        if dump.returncode == 0:
            for line in dump.stdout.splitlines():
                # Lines look like:  "svce"<blob>="Claude Code-credentials-53f815ad"
                if '"svce"<blob>="' not in line:
                    continue
                name = line.split('"svce"<blob>="', 1)[1].rstrip('"')
                if name.startswith(KEYCHAIN_SERVICE) and name not in services:
                    services.append(name)
    except (subprocess.TimeoutExpired, OSError) as e:
        logger.debug(f"Keychain enumeration failed: {e}")
    return services


def _parse_window(value) -> Optional[dict]:
    """Normalize one utilization window to {'utilization': float, 'resets_at': str}."""
    if not isinstance(value, dict):
        return None
    utilization = value.get("utilization")
    if not isinstance(utilization, (int, float)):
        return None
    resets_at = value.get("resets_at") or value.get("resetsAt") or ""
    return {
        "utilization": float(utilization),
        "resets_at": str(resets_at) if resets_at else "",
    }


class QuotaClient:
    """Cached reader of Claude subscription utilization."""

    def __init__(self, cache_path: Optional[Path] = SHARED_CACHE):
        self._cache_path = cache_path
        self._cache: Optional[dict] = None
        self._cache_at = 0.0
        self._cache_ttl = 0.0
        self._lock = asyncio.Lock()

    async def get_utilization(self) -> Optional[dict]:
        """Return {'five_hour': {...}, 'seven_day': {...}} or None.

        Each window dict has 'utilization' (percent, 0-100) and
        'resets_at' (ISO timestamp or ''). Missing windows are omitted;
        an empty result is reported as None.
        """
        async with self._lock:
            now = time.monotonic()
            if self._cache_at and now - self._cache_at < self._cache_ttl:
                return self._cache

            saved, age = self._read_saved()
            if saved and age < CACHE_TTL_OK:
                result = saved                  # another process just read it
            else:
                result = await self._fetch()
                if result:
                    self._save(result)
                elif saved and age < STALE_OK:
                    logger.debug(f"Quota: fetch failed; using the reading from {age:.0f}s ago.")
                    result = saved
            self._cache = result
            self._cache_at = now
            self._cache_ttl = CACHE_TTL_OK if result else CACHE_TTL_FAIL
            return result

    def _read_saved(self) -> tuple[Optional[dict], float]:
        if not self._cache_path:
            return None, 0.0
        try:
            saved = json.loads(self._cache_path.read_text())
            return saved["windows"], time.time() - float(saved["at"])
        except (OSError, ValueError, KeyError, TypeError):
            return None, 0.0

    def _save(self, windows: dict):
        if not self._cache_path:
            return
        try:
            tmp = self._cache_path.with_suffix(".tmp")
            tmp.write_text(json.dumps({"at": time.time(), "windows": windows}))
            tmp.replace(self._cache_path)
        except OSError as e:
            logger.debug(f"Quota: couldn't save the reading: {e}")

    async def _fetch(self) -> Optional[dict]:
        token = await asyncio.get_event_loop().run_in_executor(None, get_oauth_token)
        if not token:
            logger.debug("Quota: no Claude OAuth token found; falling back.")
            return None

        try:
            async with httpx.AsyncClient(timeout=REQUEST_TIMEOUT) as client:
                resp = await client.get(
                    USAGE_URL,
                    headers={
                        "Authorization": f"Bearer {token}",
                        "anthropic-beta": OAUTH_BETA_HEADER,
                    },
                )
        except httpx.HTTPError as e:
            logger.debug(f"Quota fetch failed: {e}")
            return None

        if resp.status_code != 200:
            logger.debug(f"Quota endpoint returned {resp.status_code}.")
            return None

        try:
            payload = resp.json()
        except ValueError:
            return None
        if not isinstance(payload, dict):
            return None

        windows = {}
        for key in ("five_hour", "seven_day"):
            parsed = _parse_window(payload.get(key))
            if parsed:
                windows[key] = parsed
        return windows or None

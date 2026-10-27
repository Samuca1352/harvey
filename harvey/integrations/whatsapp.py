"""WhatsApp provider — a self-hosted WA-AKG gateway.

WA-AKG (github.com/mrifqidaffaaditya/WA-AKG) wraps Baileys behind a REST API
with an API-key header. Harvey uses four calls:

- ``GET  /api/sessions/{session}``              is the number paired and online?
- ``POST /api/chat/{session}/check``            does this number have WhatsApp?
- ``POST /api/messages/{session}/{jid}/send``   send a text message
- ``GET  /api/messages/{session}/search?jid=``  read what a contact wrote back
- ``PUT  /api/chat/{session}/{jid}/read``        blue ticks on what we read
- ``GET  /api/media/{session}-{keyId}.{ext}``    a received voice note
- ``GET  /api/chat/{session}/{jid}/presence``    is the contact typing?

Replies are polled rather than pushed: WA-AKG only delivers webhooks to
public HTTPS URLs (it blocks private and plain-HTTP targets), which a
locally-running Harvey is not.
"""

import logging
import re
import unicodedata
from dataclasses import dataclass
from datetime import datetime, timezone
from urllib.parse import quote

import httpx

logger = logging.getLogger("harvey.whatsapp")

TIMEOUT = httpx.Timeout(connect=10.0, read=30.0, write=10.0, pool=10.0)
JID_SUFFIX = "@s.whatsapp.net"
# A "typing..." WhatsApp never cleared (app closed mid-sentence) stops
# counting after this long.
TYPING_FRESH_SECONDS = 60

# Brazilian numbers: 55 + 2-digit area code + 9 digits for a mobile (starting
# with 9) or 8 digits for a landline (starting 2-5). Landlines can't hold a
# WhatsApp account, so they are rejected before spending a send on them.
_BR = "55"


def normalize_phone(raw: str, default_country_code: str = _BR) -> str:
    """Digits-only international number ("5511912345678"), or "" if unusable.

    Accepts what Google Maps and websites actually show: "(11) 91234-5678",
    "+55 11 91234-5678", "011 91234 5678", "11912345678".
    """
    digits = re.sub(r"\D", "", raw or "")
    if not digits:
        return ""
    # "00" is the international call prefix; a single leading 0 is the
    # national trunk prefix ("011 91234-5678").
    digits = digits[2:] if digits.startswith("00") else digits.lstrip("0")
    cc = re.sub(r"\D", "", default_country_code or "") or _BR

    if cc == _BR:
        # National format (area code + number) -> add the country code.
        if len(digits) in (10, 11):
            digits = _BR + digits
        elif len(digits) in (8, 9):
            return ""  # no area code: can't know where it is
        # Older mobiles were written with 8 digits; WhatsApp wants the 9.
        if digits.startswith(_BR) and len(digits) == 12 and digits[4] in "6789":
            digits = digits[:4] + "9" + digits[4:]
    elif not digits.startswith(cc) and len(digits) <= 10:
        digits = cc + digits

    return digits if 10 <= len(digits) <= 15 else ""


def is_mobile(phone: str) -> bool:
    """True unless the number is known to be unable to hold WhatsApp.

    Only Brazilian numbers can be judged offline; for every other country
    the gateway's own ``check`` call is the authority.
    """
    if not phone:
        return False
    if phone.startswith(_BR):
        return len(phone) == 13 and phone[4] == "9"
    return 10 <= len(phone) <= 15


def to_jid(phone: str) -> str:
    return f"{phone}{JID_SUFFIX}"


def phone_from_jid(jid: str) -> str:
    return (jid or "").split("@", 1)[0].split(":", 1)[0]


@dataclass
class WaSendResult:
    ok: bool
    message_id: str = ""
    error: str = ""
    # True only when the message certainly did NOT leave (gateway down,
    # session offline), so the caller may try again without double-sending.
    retryable: bool = False


@dataclass
class WaInbound:
    id: str                  # WhatsApp message key id (dedup key)
    phone: str
    body: str
    type: str = "TEXT"
    timestamp: str = ""      # ISO-8601, UTC


class WhatsAppClient:
    """Thin async client for one WA-AKG session."""

    name = "wa-akg"

    def __init__(self, env, transport: httpx.AsyncBaseTransport | None = None):
        self.base_url = (getattr(env, "wa_akg_url", "") or "").rstrip("/")
        self.api_key = getattr(env, "wa_akg_api_key", "") or ""
        self.session_id = getattr(env, "wa_akg_session_id", "") or ""
        self._transport = transport

    def is_configured(self) -> bool:
        return bool(self.base_url and self.api_key and self.session_id)

    def _client(self) -> httpx.AsyncClient:
        return httpx.AsyncClient(
            base_url=self.base_url,
            headers={"X-API-Key": self.api_key},
            timeout=TIMEOUT,
            transport=self._transport,
        )

    def _path(self, *parts: str) -> str:
        return "/api/" + "/".join(quote(p, safe="") for p in parts)

    async def test_connection(self) -> tuple[bool, str]:
        """(ok, detail) — ok only when the session is paired and online."""
        if not self.is_configured():
            return False, ("WhatsApp is not configured: set WA_AKG_URL, "
                           "WA_AKG_API_KEY and WA_AKG_SESSION_ID in .env")
        try:
            async with self._client() as c:
                r = await c.get(self._path("sessions", self.session_id))
        except httpx.HTTPError as e:
            return False, f"cannot reach WA-AKG at {self.base_url}: {e}"
        if r.status_code == 401:
            return False, "WA-AKG rejected the API key (401)"
        if r.status_code in (403, 404):
            return False, f"session '{self.session_id}' not found or not accessible ({r.status_code})"
        if r.status_code != 200:
            return False, f"WA-AKG answered {r.status_code}"
        data = (r.json() or {}).get("data") or {}
        status = str(data.get("status") or "").upper()
        if status != "CONNECTED":
            return False, f"session '{self.session_id}' is {status or 'unknown'}, not CONNECTED"
        me = (data.get("me") or {}).get("id", "")
        return True, f"session '{self.session_id}' connected" + (f" as {phone_from_jid(me)}" if me else "")

    async def session_status(self) -> str:
        """The gateway's view of the session: CONNECTED, STOPPED, SCAN_QR, ...
        "" when it can't be read."""
        try:
            async with self._client() as c:
                r = await c.get(self._path("sessions", self.session_id))
            if r.status_code != 200:
                return ""
            return str(((r.json() or {}).get("data") or {}).get("status") or "").upper()
        except (httpx.HTTPError, ValueError):
            return ""

    async def start_session(self) -> bool:
        """Ask the gateway to start a stopped session. Credentials are kept by
        the gateway, so a paired number reconnects without a new QR code."""
        try:
            async with self._client() as c:
                r = await c.post(self._path("sessions", self.session_id, "start"))
            return r.status_code == 200
        except httpx.HTTPError:
            return False

    async def exists(self, phone: str) -> bool | None:
        """Whether the number has WhatsApp. None when it can't be determined."""
        try:
            async with self._client() as c:
                r = await c.post(
                    self._path("chat", self.session_id, "check"),
                    json={"numbers": [phone]},
                )
            if r.status_code != 200:
                return None
            data = (r.json() or {}).get("data") or {}
            results = data.get("results") if isinstance(data, dict) else data
            if not results:
                return None
            return bool(results[0].get("exists"))
        except (httpx.HTTPError, ValueError):
            return None

    async def send_text(self, phone: str, text: str) -> WaSendResult:
        return await self.send_jid(to_jid(phone), text)

    async def send_jid(self, jid: str, text: str) -> WaSendResult:
        """Send to any chat: a person's JID or a group's (``...@g.us``)."""
        try:
            async with self._client() as c:
                r = await c.post(
                    self._path("messages", self.session_id, jid, "send"),
                    json={"message": {"text": text}},
                )
        except (httpx.ConnectError, httpx.ConnectTimeout) as e:
            return WaSendResult(False, error=f"gateway unreachable: {e}", retryable=True)
        except httpx.HTTPError as e:
            # A read timeout can mean the message went out: never auto-retry.
            return WaSendResult(False, error=f"gateway error: {e}")

        try:
            payload = r.json() or {}
        except ValueError:
            payload = {}
        if r.status_code == 200 and payload.get("status", True) is not False:
            key = ((payload.get("data") or {}).get("key") or {})
            return WaSendResult(True, message_id=str(key.get("id") or ""))

        detail = str(payload.get("message") or payload.get("error") or r.text)[:200]
        offline = r.status_code == 503 or "disconnected" in detail.lower()
        return WaSendResult(
            False, error=f"{r.status_code}: {detail}", retryable=offline,
        )

    async def download_audio(self, message_id: str) -> bytes:
        """A received audio's bytes, b"" if the gateway doesn't have it.

        WA-AKG saves media as <session>-<keyId>.<ext from the mimetype>; voice
        notes are ogg, forwarded audio files can be mpeg or mp4. (Its
        /download/{id}/media route can't be used: it compares the session's
        internal id with its name and always answers 403.)
        """
        safe_session = re.sub(r"[^A-Za-z0-9_-]", "", self.session_id)
        safe_id = re.sub(r"[^A-Za-z0-9_-]", "", message_id)
        try:
            async with self._client() as c:
                for ext in ("ogg", "mpeg", "mp4"):
                    r = await c.get(self._path("media", f"{safe_session}-{safe_id}.{ext}"))
                    if r.status_code == 200 and r.content:
                        return r.content
        except httpx.HTTPError as e:
            logger.warning(f"WhatsApp: audio download failed: {e}")
        return b""

    async def mark_read(self, phone: str, message_ids: list[str]) -> bool:
        """Blue ticks on the contact's messages. False if the gateway refused."""
        try:
            async with self._client() as c:
                r = await c.put(
                    self._path("chat", self.session_id, to_jid(phone), "read"),
                    json={"messageIds": message_ids},
                )
            return r.status_code == 200
        except httpx.HTTPError:
            return False

    async def is_typing(self, phone: str) -> bool:
        """True while the contact is typing or recording a voice note.

        Needs the presence GET route of our patched WA-AKG; an older gateway,
        or a contact who hides it, reads as not typing.
        """
        try:
            async with self._client() as c:
                r = await c.get(self._path("chat", self.session_id, to_jid(phone), "presence"))
            if r.status_code != 200:
                return False
            data = (r.json() or {}).get("data") or {}
        except (httpx.HTTPError, ValueError):
            return False
        age = data.get("ageSeconds")
        return (
            data.get("presence") in ("composing", "recording")
            and isinstance(age, (int, float)) and age <= TYPING_FRESH_SECONDS
        )

    async def get_incoming(self, phone: str, since: str = "", limit: int = 30) -> list[WaInbound]:
        """Messages the contact sent us, oldest first, newer than ``since``."""
        async with self._client() as c:
            r = await c.get(
                self._path("messages", self.session_id, "search"),
                params={"jid": to_jid(phone), "fromMe": "false", "limit": limit},
            )
        r.raise_for_status()
        cutoff = _parse_ts(since)
        out: list[WaInbound] = []
        for m in (r.json() or {}).get("data") or []:
            if m.get("fromMe"):
                continue
            ts = _parse_ts(m.get("timestamp"))
            if cutoff and ts and ts <= cutoff:
                continue
            key = str(m.get("keyId") or m.get("id") or "")
            if not key:
                continue
            out.append(WaInbound(
                id=key, phone=phone, body=(m.get("content") or "").strip(),
                type=str(m.get("type") or "TEXT").upper(),
                timestamp=str(m.get("timestamp") or ""),
            ))
        out.sort(key=lambda m: m.timestamp)
        return out


def _parse_ts(value) -> datetime | None:
    """ISO-8601 -> aware UTC datetime. Naive values are taken as UTC."""
    if not value:
        return None
    try:
        dt = datetime.fromisoformat(str(value).replace("Z", "+00:00"))
    except ValueError:
        return None
    return dt if dt.tzinfo else dt.replace(tzinfo=timezone.utc)


# Outbox subject that marks the first message to a contact a shop shared with
# us: it jumps the cold queue and goes out from the fast watcher too.
HANDOFF_SUBJECT = "contato compartilhado"

# Words a contact is saved under that aren't a name ("RENAN AMOR", "Mãe").
_NOT_A_NAME = {
    "amor", "mor", "meu", "minha", "vida", "bebe", "bb", "mozao", "mozinho", "gato", "gata",
    "love", "lindo", "linda", "querido", "querida", "esposo", "esposa", "marido", "mulher",
    "namorado", "namorada", "noivo", "noiva", "pai", "mae", "papai", "mamae", "irmao", "irma",
    "filho", "filha", "tio", "tia", "vo", "socio", "socia", "dono", "dona", "loja", "gerente",
    "financeiro", "comercial", "vendas", "atendimento", "whatsapp", "zap", "celular", "cel",
    "novo", "nova", "pessoal", "trabalho", "casa", "oficial", "sr", "sra", "dr", "dra",
}


def _fold(word: str) -> str:
    return unicodedata.normalize("NFKD", word).encode("ascii", "ignore").decode().lower()


def parse_contact_cards(body: str) -> list[tuple[str, str]]:
    """A CONTACT message's content ("Name | 5517..." per card, from our
    patched gateway) -> [(name, digits)]; digits is "" when the card had none."""
    cards = []
    for line in (body or "").splitlines():
        name, *numbers = [part.strip() for part in line.split("|")]
        digits = next((d for d in (re.sub(r"\D", "", n) for n in numbers) if d), "")
        if name or digits:
            cards.append((name, digits))
    return cards


# A mobile typed in a message: optional +55, optional area code, then 9XXXX-XXXX.
_TYPED_MOBILE = re.compile(
    r"(?<!\d)(?:\+?55[\s.-]?)?(?:\(?\d{2}\)?[\s.-]?)?9[\s.-]?\d{4}[\s.-]?\d{4}(?!\d)"
)
_GREETING_WORDS = {"bom", "boa", "dia", "tarde", "noite", "oi", "ola", "obrigado", "obrigada", "ok"}


def typed_contacts(body: str, own_phone: str) -> list[tuple[str, str]]:
    """Mobiles typed in a message ("996261809\nPaula") -> [(name, digits)].

    A number without an area code borrows the sender's: a shop passing a
    colleague's number nearly always means one in its own city. The name is
    a short line (or the rest of the number's line) right after or before it.
    """
    lines = (body or "").splitlines()
    found = []
    for i, line in enumerate(lines):
        for m in _TYPED_MOBILE.finditer(line):
            digits = re.sub(r"\D", "", m.group())
            if len(digits) == 9 and own_phone.startswith(_BR) and len(own_phone) == 13:
                digits = own_phone[2:4] + digits
            name = ""
            rest = (line[:m.start()] + " " + line[m.end():]).strip()
            for near in (rest, *lines[i + 1:i + 2], *lines[max(i - 1, 0):i]):
                words = re.findall(r"[^\W\d_]+", near)
                if 0 < len(words) <= 2 and not {_fold(w) for w in words} & _GREETING_WORDS:
                    name = near
                    break
            found.append((name, digits))
    return found


def contact_first_name(display: str, store: str) -> str:
    """The first word of a saved contact name that is a name: not part of the
    store's name, not a pet name or a role. "" when there is none."""
    store_words = {_fold(w) for w in re.findall(r"\w+", store or "")}
    for word in re.findall(r"[^\W\d_]+", display or ""):
        folded = _fold(word)
        if len(folded) >= 2 and folded not in store_words and folded not in _NOT_A_NAME:
            return word.capitalize()
    return ""


def get_whatsapp_client(config, env) -> WhatsAppClient | None:
    """The WhatsApp client when the channel is enabled, else None."""
    if not config.channels.whatsapp.enabled:
        return None
    return WhatsAppClient(env)

# check_cli_version

> 18 nodes · cohesion 0.15

## Key Concepts

- **check_cli_version()** (15 connections) — `harvey/codex.py`
- **_setup_error()** (9 connections) — `harvey/codex.py`
- **.launch()** (8 connections) — `harvey/codex.py`
- **build_child_env()** (7 connections) — `harvey/codex.py`
- **parse_cli_version()** (6 connections) — `harvey/codex.py`
- **require_supported_version()** (6 connections) — `harvey/codex.py`
- **._spawn()** (5 connections) — `harvey/codex.py`
- **.read_version()** (4 connections) — `harvey/codex.py`
- **._child_kwargs()** (3 connections) — `harvey/codex.py`
- **server_version()** (3 connections) — `harvey/codex.py`
- **test_cli_version_parsing()** (3 connections) — `tests/test_codex.py`
- **._drain_stderr()** (2 connections) — `harvey/codex.py`
- **test_environment_allowlist_is_case_insensitive_and_drops_secrets()** (2 connections) — `tests/test_codex_platform.py`
- **test_child_env_is_allowlisted()** (2 connections) — `tests/test_codex.py`
- **``codex --version`` output ("codex-cli 0.159.3") -> "0.159.3".** (1 connections) — `harvey/codex.py`
- **Synchronous version preflight for setup. Returns the version or raises…** (1 connections) — `harvey/codex.py`
- **Allowlisted environment with HOME and CODEX_HOME pointed at the private…** (1 connections) — `harvey/codex.py`
- **The server's own version from its ``initialize`` user agent ("harvey/0.159.3…** (1 connections) — `harvey/codex.py`

## Relationships

- [CodexClient](CodexClient.md) (11 shared connections)
- [codex.py](codex.py.md) (6 shared connections)
- [setup.py](setup.py.md) (3 shared connections)
- [.run_cli](run_cli.md) (2 shared connections)
- [test_codex_cli_surface.py](test_codex_cli_surface.py.md) (2 shared connections)
- [test_codex.py](test_codex.py.md) (2 shared connections)
- [.init_db](init_db.md) (1 shared connections)
- [email_finder.py](email_finder.py.md) (1 shared connections)
- [json](json.md) (1 shared connections)
- [check_native_auth](check_native_auth.md) (1 shared connections)
- [handler.py](handler.py.md) (1 shared connections)
- [_load_native_auth](_load_native_auth.md) (1 shared connections)

## Source Files

- `harvey/codex.py`
- `tests/test_codex.py`
- `tests/test_codex_platform.py`

## Audit Trail

- EXTRACTED: 56 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
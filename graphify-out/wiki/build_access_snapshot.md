# build_access_snapshot

> 6 nodes · cohesion 0.33

## Key Concepts

- **build_access_snapshot()** (9 connections) — `harvey/codex.py`
- **_parse_timestamp()** (4 connections) — `harvey/codex.py`
- **test_login_a_week_old_is_still_used()** (3 connections) — `tests/test_codex.py`
- **test_unreadable_token_expiry_is_an_auth_error()** (2 connections) — `tests/test_codex.py`
- **RFC 3339 (as Codex writes it, up to nanoseconds) -> epoch seconds.** (1 connections) — `harvey/codex.py`
- **An access-only copy of the operator's login for one runtime. The refresh token…** (1 connections) — `harvey/codex.py`

## Relationships

- [CodexClient](CodexClient.md) (2 shared connections)
- [codex.py](codex.py.md) (2 shared connections)
- [test_codex.py](test_codex.py.md) (2 shared connections)
- [state.py](state.py.md) (1 shared connections)
- [test_microsoft.py](test_microsoft.py.md) (1 shared connections)
- [handler.py](handler.py.md) (1 shared connections)
- [_write_login](_write_login.md) (1 shared connections)

## Source Files

- `harvey/codex.py`
- `tests/test_codex.py`

## Audit Trail

- EXTRACTED: 15 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
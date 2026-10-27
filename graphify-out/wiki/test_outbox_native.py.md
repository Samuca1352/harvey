# test_outbox_native.py

> 90 nodes · cohesion 0.06

## Key Concepts

- **test_outbox_native.py** (46 connections) — `tests/test_outbox_native.py`
- **test_precleared.py** (46 connections) — `tests/test_precleared.py`
- **FakeProvider** (32 connections) — `tests/test_outbox_native.py`
- **seed_prospect()** (30 connections) — `tests/test_outbox_native.py`
- **make_sender()** (22 connections) — `tests/test_outbox_native.py`
- **PreclearedClient** (16 connections) — `harvey/integrations/precleared.py`
- **mock_precleared()** (16 connections) — `tests/test_precleared.py`
- **precleared.py** (15 connections) — `harvey/integrations/precleared.py`
- **pytest_asyncio** (15 connections)
- **asyncio** (14 connections)
- **Cfg** (13 connections) — `tests/test_outbox_native.py`
- **queue()** (13 connections) — `tests/test_precleared.py`
- **_now_iso()** (12 connections) — `tests/test_outbox_native.py`
- **with_check()** (12 connections) — `tests/test_precleared.py`
- **test_bounce_marks_invalid_and_kill_switch()** (11 connections) — `tests/test_outbox_native.py`
- **test_malformed_response_holds_cold_email_and_reply_still_sends()** (11 connections) — `tests/test_precleared.py`
- **.clear()** (10 connections) — `harvey/integrations/precleared.py`
- **make_handler()** (10 connections) — `tests/test_outbox_native.py`
- **test_reply_cancels_pending_outbox()** (10 connections) — `tests/test_outbox_native.py`
- **test_daily_limit_holds_cold_email_but_replies_still_go()** (10 connections) — `tests/test_precleared.py`
- **test_network_error_holds_the_email()** (10 connections) — `tests/test_precleared.py`
- **looks_like_bounce()** (9 connections) — `harvey/integrations/mail_provider.py`
- **asyncio** (9 connections)
- **StubBrain** (9 connections) — `tests/test_outbox_native.py`
- **test_blocked_verdict_is_remembered_for_later_steps()** (9 connections) — `tests/test_precleared.py`
- *... and 65 more nodes in this community*

## Relationships

- [asyncio](asyncio.md) (19 shared connections)
- [InboundMessage](InboundMessage.md) (15 shared connections)
- [test_microsoft.py](test_microsoft.py.md) (14 shared connections)
- [test_codex_e2e.py](test_codex_e2e.py.md) (13 shared connections)
- [StateManager](StateManager.md) (9 shared connections)
- [state.py](state.py.md) (6 shared connections)
- [json](json.md) (6 shared connections)
- [email_finder.py](email_finder.py.md) (6 shared connections)
- [handler.py](handler.py.md) (6 shared connections)
- [Prospect](Prospect.md) (6 shared connections)
- [Campaign](Campaign.md) (5 shared connections)
- [config.py](config.py.md) (5 shared connections)

## Source Files

- `harvey/integrations/mail_provider.py`
- `harvey/integrations/precleared.py`
- `tests/test_outbox_native.py`
- `tests/test_precleared.py`

## Audit Trail

- EXTRACTED: 335 (84%)
- INFERRED: 62 (16%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
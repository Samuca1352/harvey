# test_whatsapp_followup_priority.py

> 16 nodes · cohesion 0.24

## Key Concepts

- **test_whatsapp_followup_priority.py** (16 connections) — `tests/test_whatsapp_followup_priority.py`
- **_now_iso()** (10 connections) — `tests/test_whatsapp.py`
- **quiet_conversation()** (9 connections) — `tests/test_whatsapp.py`
- **test_followup_is_dropped_if_the_customer_wrote_back()** (9 connections) — `tests/test_whatsapp.py`
- **pending_followup()** (8 connections) — `tests/test_whatsapp_followup_priority.py`
- **test_after_the_last_followup_the_owner_is_told()** (7 connections) — `tests/test_whatsapp.py`
- **test_quiet_customer_gets_a_followup_after_a_day()** (7 connections) — `tests/test_whatsapp.py`
- **test_due_followup_precedes_more_than_sixty_older_cold_messages()** (6 connections) — `tests/test_whatsapp_followup_priority.py`
- **test_followup_rechecks_customer_and_conversation_before_sending()** (6 connections) — `tests/test_whatsapp_followup_priority.py`
- **test_cold_silence_is_never_followed_up()** (6 connections) — `tests/test_whatsapp.py`
- **test_fast_watcher_leaves_followups_for_the_heartbeat()** (5 connections) — `tests/test_whatsapp_followup_priority.py`
- **followups()** (5 connections) — `tests/test_whatsapp.py`
- **asyncio** (4 connections)
- **test_cold_daily_cap_does_not_hold_an_approved_followup()** (4 connections) — `tests/test_whatsapp_followup_priority.py`
- **parametrize** (2 connections)
- **Existing WhatsApp conversations cannot be starved by the cold outbox.** (1 connections) — `tests/test_whatsapp_followup_priority.py`

## Relationships

- [asyncio](asyncio.md) (18 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (8 shared connections)
- [make_handler](make_handler.md) (7 shared connections)
- [Conversation](Conversation.md) (5 shared connections)
- [Prospect](Prospect.md) (5 shared connections)
- [StateManager](StateManager.md) (2 shared connections)
- [pytest](pytest.md) (1 shared connections)
- [.init_db](init_db.md) (1 shared connections)

## Source Files

- `tests/test_whatsapp.py`
- `tests/test_whatsapp_followup_priority.py`

## Audit Trail

- EXTRACTED: 69 (91%)
- INFERRED: 7 (9%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
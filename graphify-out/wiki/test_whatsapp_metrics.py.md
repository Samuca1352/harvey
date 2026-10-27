# test_whatsapp_metrics.py

> 18 nodes · cohesion 0.31

## Key Concepts

- **test_whatsapp_metrics.py** (24 connections) — `tests/test_whatsapp_metrics.py`
- **variant_stats()** (17 connections) — `harvey/agents/whatsapp.py`
- **variant_examples()** (11 connections) — `harvey/agents/whatsapp.py`
- **reply()** (8 connections) — `tests/test_whatsapp_metrics.py`
- **sent_contact()** (8 connections) — `tests/test_whatsapp_metrics.py`
- **test_email_and_empty_conversations_do_not_count_as_whatsapp_replies()** (8 connections) — `tests/test_whatsapp_metrics.py`
- **test_metrics_separate_people_bots_and_recorded_interest()** (8 connections) — `tests/test_whatsapp_metrics.py`
- **get_openers()** (7 connections) — `harvey/dashboard.py`
- **test_auto_events_before_contact_or_for_other_channels_are_ignored()** (7 connections) — `tests/test_whatsapp_metrics.py`
- **test_only_explicit_test_markers_exclude_contacts_from_stats_and_examples()** (7 connections) — `tests/test_whatsapp_metrics.py`
- **test_repeated_outbox_rows_do_not_duplicate_contacts()** (7 connections) — `tests/test_whatsapp_metrics.py`
- **asyncio** (6 connections)
- **test_seven_day_cohort_uses_timestamps_not_lexical_iso_comparison()** (6 connections) — `tests/test_whatsapp_metrics.py`
- **bot_log()** (4 connections) — `tests/test_whatsapp_metrics.py`
- **Count contacts, with human responses separate from automatic ones.…** (1 connections) — `harvey/agents/whatsapp.py`
- **Latest real-contact openers, distinguishing human and automatic replies.** (1 connections) — `harvey/agents/whatsapp.py`
- **Opener variant comparison for the Openers tab.** (1 connections) — `harvey/dashboard.py`
- **Opener metrics use isolated storage, without gateway or model calls.** (1 connections) — `tests/test_whatsapp_metrics.py`

## Relationships

- [StateManager](StateManager.md) (5 shared connections)
- [Conversation](Conversation.md) (5 shared connections)
- [asyncio](asyncio.md) (4 shared connections)
- [dashboard.py](dashboard.py.md) (4 shared connections)
- [Prospect](Prospect.md) (4 shared connections)
- [handler.py](handler.py.md) (3 shared connections)
- [pytest](pytest.md) (3 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (2 shared connections)
- [cli.py](cli.py.md) (2 shared connections)
- [.init_db](init_db.md) (2 shared connections)
- [state.py](state.py.md) (2 shared connections)
- [_state](_state.md) (1 shared connections)

## Source Files

- `harvey/agents/whatsapp.py`
- `harvey/dashboard.py`
- `tests/test_whatsapp_metrics.py`

## Audit Trail

- EXTRACTED: 79 (93%)
- INFERRED: 6 (7%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
# test_codex_e2e.py

> 94 nodes · cohesion 0.05

## Key Concepts

- **test_codex_e2e.py** (65 connections) — `tests/test_codex_e2e.py`
- **asyncio** (26 connections)
- **.run_cycles()** (25 connections) — `tests/test_codex_e2e.py`
- **_open_thread()** (22 connections) — `tests/test_codex_e2e.py`
- **Harness** (20 connections) — `tests/test_codex_e2e.py`
- **_reply()** (19 connections) — `tests/test_codex_e2e.py`
- **.status()** (17 connections) — `tests/test_codex_e2e.py`
- **test_instantly_path_leaves_the_reply_unprocessed_when_the_brain_is_down()** (17 connections) — `tests/test_codex_e2e.py`
- **test_instantly_reply_survives_an_outage_while_drafting()** (15 connections) — `tests/test_codex_e2e.py`
- **_approved_item()** (11 connections) — `tests/test_codex_e2e.py`
- **.__init__()** (11 connections) — `tests/test_codex_e2e.py`
- **test_a_message_that_fails_to_process_holds_that_cycles_sends()** (10 connections) — `tests/test_codex_e2e.py`
- **test_expired_login_pauses_everything_and_recovers_after_renewal()** (9 connections) — `tests/test_codex_e2e.py`
- **test_isolation_failure_mid_cycle_leaves_the_reply_for_later()** (9 connections) — `tests/test_codex_e2e.py`
- **test_outage_during_the_handler_holds_queued_sends_until_recovery()** (9 connections) — `tests/test_codex_e2e.py`
- **test_outage_while_drafting_the_reply_loses_nothing_and_duplicates_nothing()** (9 connections) — `tests/test_codex_e2e.py`
- **test_rejected_model_never_sends_queued_mail()** (9 connections) — `tests/test_codex_e2e.py`
- **test_renewed_login_is_picked_up_without_a_restart()** (9 connections) — `tests/test_codex_e2e.py`
- **test_mailbox_error_holds_sends_until_replies_can_be_read()** (8 connections) — `tests/test_codex_e2e.py`
- **test_rejected_model_pauses_with_an_actionable_reason()** (8 connections) — `tests/test_codex_e2e.py`
- **test_reply_is_classified_answered_for_review_and_never_reprocessed()** (8 connections) — `tests/test_codex_e2e.py`
- **test_usage_limit_stops_calls_and_closes_the_budget()** (8 connections) — `tests/test_codex_e2e.py`
- **.entries()** (7 connections) — `tests/test_codex_e2e.py`
- **test_a_reply_cancels_its_due_follow_up_before_the_send_phase()** (7 connections) — `tests/test_codex_e2e.py`
- **test_pre_codex_database_migrates_and_runs_on_codex()** (7 connections) — `tests/test_codex_e2e.py`
- *... and 69 more nodes in this community*

## Relationships

- [test_outbox_native.py](test_outbox_native.py.md) (13 shared connections)
- [pytest](pytest.md) (11 shared connections)
- [StateManager](StateManager.md) (6 shared connections)
- [_write_login](_write_login.md) (5 shared connections)
- [Conversation](Conversation.md) (4 shared connections)
- [Brain](Brain.md) (4 shared connections)
- [state.py](state.py.md) (3 shared connections)
- [InboundMessage](InboundMessage.md) (3 shared connections)
- [Handler](Handler.md) (3 shared connections)
- [Campaign](Campaign.md) (3 shared connections)
- [.init_db](init_db.md) (2 shared connections)
- [main.py](main.py.md) (2 shared connections)

## Source Files

- `tests/test_codex_e2e.py`
- `tests/test_precleared.py`
- `tests/test_whatsapp.py`

## Audit Trail

- EXTRACTED: 200 (68%)
- INFERRED: 92 (32%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
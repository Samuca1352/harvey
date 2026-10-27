# asyncio

> 45 nodes · cohesion 0.11

## Key Concepts

- **asyncio** (73 connections)
- **.get_outbox()** (34 connections) — `harvey/state.py`
- **make_agent()** (30 connections) — `tests/test_whatsapp.py`
- **.get_prospects_by_status()** (19 connections) — `harvey/state.py`
- **.add_outbox_item()** (18 connections) — `harvey/state.py`
- **staged_agent()** (18 connections) — `tests/test_whatsapp.py`
- **seed_company()** (12 connections) — `tests/test_whatsapp.py`
- **test_opener_c_gets_its_prompt_and_google_rating_and_examples_are_listed()** (12 connections) — `tests/test_whatsapp.py`
- **test_email_sender_ignores_whatsapp_rows()** (10 connections) — `tests/test_whatsapp.py`
- **test_a_cold_message_waits_for_its_turn_but_a_reply_does_not()** (9 connections) — `tests/test_whatsapp.py`
- **test_a_reply_frees_a_slot_under_the_unanswered_cap()** (9 connections) — `tests/test_whatsapp.py`
- **test_an_opener_too_close_to_a_recent_one_is_redrafted()** (9 connections) — `tests/test_whatsapp.py`
- **test_reply_is_held_while_the_customer_types_or_wrote_again()** (9 connections) — `tests/test_whatsapp.py`
- **test_shared_contact_message_goes_out_first_even_from_the_fast_watcher()** (9 connections) — `tests/test_whatsapp.py`
- **test_daily_cap_ramps_up_from_the_first_cold_send()** (8 connections) — `tests/test_whatsapp.py`
- **test_daily_cap_applies_to_cold_messages_only()** (7 connections) — `tests/test_whatsapp.py`
- **test_excluded_industries_are_never_messaged()** (7 connections) — `tests/test_whatsapp.py`
- **test_send_stops_on_reply_and_respects_kill_switch()** (7 connections) — `tests/test_whatsapp.py`
- **test_write_retries_a_draft_the_gate_rejects_then_gives_up()** (7 connections) — `tests/test_whatsapp.py`
- **test_write_stages_a_pending_message_with_opt_out()** (7 connections) — `tests/test_whatsapp.py`
- **test_any_shop_that_sells_products_fits_but_services_do_not()** (6 connections) — `tests/test_whatsapp.py`
- **test_openers_are_split_between_two_variants_and_counted()** (6 connections) — `tests/test_whatsapp.py`
- **test_send_delivers_and_marks_contacted()** (6 connections) — `tests/test_whatsapp.py`
- **test_cold_schedule_is_random_and_honours_a_pause()** (5 connections) — `tests/test_whatsapp.py`
- **test_prepare_creates_prospects_and_sets_aside_bad_numbers()** (5 connections) — `tests/test_whatsapp.py`
- *... and 20 more nodes in this community*

## Relationships

- [test_whatsapp.py](test_whatsapp.py.md) (43 shared connections)
- [make_handler](make_handler.md) (30 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (19 shared connections)
- [StateManager](StateManager.md) (18 shared connections)
- [test_whatsapp_followup_priority.py](test_whatsapp_followup_priority.py.md) (18 shared connections)
- [Conversation](Conversation.md) (12 shared connections)
- [Prospect](Prospect.md) (5 shared connections)
- [night.py](night.py.md) (5 shared connections)
- [Company](Company.md) (5 shared connections)
- [test_whatsapp_metrics.py](test_whatsapp_metrics.py.md) (4 shared connections)
- [test_state_extra.py](test_state_extra.py.md) (4 shared connections)
- [Brain](Brain.md) (2 shared connections)

## Source Files

- `harvey/brain.py`
- `harvey/state.py`
- `tests/test_whatsapp.py`

## Audit Trail

- EXTRACTED: 191 (67%)
- INFERRED: 95 (33%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
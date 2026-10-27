# make_handler

> 49 nodes · cohesion 0.12

## Key Concepts

- **make_handler()** (46 connections) — `tests/test_whatsapp.py`
- **contacted_prospect()** (34 connections) — `tests/test_whatsapp.py`
- **inbound()** (24 connections) — `tests/test_whatsapp.py`
- **test_whatsapp_conversation_context.py** (21 connections) — `tests/test_whatsapp_conversation_context.py`
- **.get_prospect()** (19 connections) — `harvey/state.py`
- **.get_conversations_by_status()** (17 connections) — `harvey/state.py`
- **WaInbound** (13 connections) — `harvey/integrations/whatsapp.py`
- **.is_reply_processed()** (10 connections) — `harvey/state.py`
- **test_classifier_receives_the_correct_channel_history_and_opener()** (10 connections) — `tests/test_whatsapp_conversation_context.py`
- **test_shop_bot_greeting_is_not_answered()** (10 connections) — `tests/test_whatsapp.py`
- **test_unheard_voice_note_next_to_text_goes_to_a_human()** (10 connections) — `tests/test_whatsapp.py`
- **test_voice_note_is_transcribed_and_answered()** (10 connections) — `tests/test_whatsapp.py`
- **test_accepted_demo_has_a_handoff_even_without_designer_in_the_reply()** (9 connections) — `tests/test_whatsapp_conversation_context.py`
- **test_harvey_stays_out_of_conversations_a_human_has()** (9 connections) — `tests/test_whatsapp.py`
- **ReplyBrain** (8 connections) — `tests/test_whatsapp.py`
- **test_a_shared_contact_gets_a_warm_first_message()** (8 connections) — `tests/test_whatsapp.py`
- **test_no_answer_while_the_customer_is_still_typing()** (8 connections) — `tests/test_whatsapp.py`
- **test_reply_is_answered_through_the_whatsapp_outbox()** (8 connections) — `tests/test_whatsapp.py`
- **conversation()** (7 connections) — `tests/test_whatsapp_conversation_context.py`
- **asyncio** (7 connections)
- **test_courtesy_after_referral_keeps_the_opportunity_without_another_pitch()** (7 connections) — `tests/test_whatsapp_conversation_context.py`
- **test_courtesy_does_not_hide_a_refusal()** (7 connections) — `tests/test_whatsapp_conversation_context.py`
- **test_empty_whatsapp_notice_is_not_a_reply()** (7 connections) — `tests/test_whatsapp.py`
- **test_media_only_reply_is_escalated()** (7 connections) — `tests/test_whatsapp.py`
- **test_opt_out_in_portuguese_suppresses_the_number()** (7 connections) — `tests/test_whatsapp.py`
- *... and 24 more nodes in this community*

## Relationships

- [asyncio](asyncio.md) (30 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (28 shared connections)
- [Conversation](Conversation.md) (23 shared connections)
- [StateManager](StateManager.md) (10 shared connections)
- [test_whatsapp_followup_priority.py](test_whatsapp_followup_priority.py.md) (7 shared connections)
- [FakeWa](FakeWa.md) (6 shared connections)
- [test_state_extra.py](test_state_extra.py.md) (5 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (4 shared connections)
- [test_email_wiring.py](test_email_wiring.py.md) (4 shared connections)
- [pytest](pytest.md) (3 shared connections)
- [FakeBrain](FakeBrain.md) (3 shared connections)
- [Prospect](Prospect.md) (2 shared connections)

## Source Files

- `harvey/integrations/whatsapp.py`
- `harvey/state.py`
- `tests/test_whatsapp.py`
- `tests/test_whatsapp_conversation_context.py`

## Audit Trail

- EXTRACTED: 209 (76%)
- INFERRED: 66 (24%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
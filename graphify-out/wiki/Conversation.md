# Conversation

> 30 nodes · cohesion 0.14

## Key Concepts

- **Conversation** (51 connections) — `harvey/models/conversation.py`
- **Message** (43 connections) — `harvey/models/conversation.py`
- **RecordingBrain** (13 connections) — `tests/test_whatsapp.py`
- **.add_conversation()** (12 connections) — `harvey/state.py`
- **.thread_from_json()** (9 connections) — `harvey/models/conversation.py`
- **test_pro_plan_is_due_after_a_few_turns_without_a_mention()** (7 connections) — `tests/test_whatsapp.py`
- **test_talk_of_posting_brings_up_the_pro()** (7 connections) — `tests/test_whatsapp.py`
- **test_whatsapp_prompt_knows_when_the_trial_was_just_offered()** (7 connections) — `tests/test_whatsapp.py`
- **test_whatsapp_prompt_tracks_pro_mentions_and_turns()** (7 connections) — `tests/test_whatsapp.py`
- **test_whatsapp_reply_counts_recent_questions()** (7 connections) — `tests/test_whatsapp.py`
- **test_whatsapp_reply_uses_its_own_prompt_and_counts_team_mentions()** (7 connections) — `tests/test_whatsapp.py`
- **test_conversation_add_and_fetch()** (6 connections) — `tests/test_state_extra.py`
- **test_update_conversation_stage_and_status()** (6 connections) — `tests/test_state_extra.py`
- **BlockedOnceBrain** (6 connections) — `tests/test_whatsapp.py`
- **test_always_blocked_whatsapp_draft_goes_to_a_human()** (6 connections) — `tests/test_whatsapp.py`
- **test_blocked_whatsapp_draft_is_redrafted()** (6 connections) — `tests/test_whatsapp.py`
- **.thread_json()** (5 connections) — `harvey/models/conversation.py`
- **test_thread_json_preserves_timestamps()** (5 connections) — `tests/test_models_extra.py`
- **test_conversation_thread_json_round_trip()** (5 connections) — `tests/test_models.py`
- **test_conversation_empty_thread_round_trip()** (4 connections) — `tests/test_models_extra.py`
- **instruction()** (4 connections) — `tests/test_whatsapp.py`
- **test_thread_from_malformed_json_returns_empty()** (3 connections) — `tests/test_models_extra.py`
- **.__init__()** (3 connections) — `tests/test_whatsapp.py`
- **.__init__()** (3 connections) — `tests/test_whatsapp.py`
- **BaseModel** (2 connections)
- *... and 5 more nodes in this community*

## Relationships

- [Prospect](Prospect.md) (24 shared connections)
- [make_handler](make_handler.md) (23 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (12 shared connections)
- [asyncio](asyncio.md) (12 shared connections)
- [test_state_extra.py](test_state_extra.py.md) (10 shared connections)
- [StateManager](StateManager.md) (7 shared connections)
- [test_whatsapp_metrics.py](test_whatsapp_metrics.py.md) (5 shared connections)
- [test_whatsapp_followup_priority.py](test_whatsapp_followup_priority.py.md) (5 shared connections)
- [Handler](Handler.md) (4 shared connections)
- [test_codex_e2e.py](test_codex_e2e.py.md) (4 shared connections)
- [handler.py](handler.py.md) (4 shared connections)
- [.paused_reason](paused_reason.md) (3 shared connections)

## Source Files

- `harvey/models/conversation.py`
- `harvey/state.py`
- `tests/test_models.py`
- `tests/test_models_extra.py`
- `tests/test_state_extra.py`
- `tests/test_whatsapp.py`

## Audit Trail

- EXTRACTED: 124 (69%)
- INFERRED: 57 (31%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
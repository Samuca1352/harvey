# Conversation

> God node · 51 connections · `harvey/models/conversation.py`

**Community:** [Conversation](Conversation.md)

## Connections by Relation

### calls
- _open_thread() `EXTRACTED`
- ._process_reply() `EXTRACTED`
- quiet_conversation() `EXTRACTED`
- reply() `EXTRACTED`
- conversation() `EXTRACTED`
- test_thread_json_preserves_timestamps() `EXTRACTED`
- test_conversation_thread_json_round_trip() `EXTRACTED`
- test_conversation_empty_thread_round_trip() `EXTRACTED`
- instruction() `EXTRACTED`
- test_conversation_requires_prospect_id() `EXTRACTED`
- test_conversation_default_stage_is_first_pipeline_stage() `EXTRACTED`
- test_conversation_defaults() `EXTRACTED`

### contains
- conversation.py `EXTRACTED`

### imports
- [test_whatsapp.py](test_whatsapp.py.md) `EXTRACTED`
- [test_codex_e2e.py](test_codex_e2e.py.md) `EXTRACTED`
- [state.py](state.py.md) `EXTRACTED`
- [test_state_extra.py](test_state_extra.py.md) `EXTRACTED`
- [handler.py](handler.py.md) `EXTRACTED`
- test_models_extra.py `EXTRACTED`
- [test_whatsapp_metrics.py](test_whatsapp_metrics.py.md) `EXTRACTED`
- test_whatsapp_conversation_context.py `EXTRACTED`
- test_models.py `EXTRACTED`
- models/__init__.py `EXTRACTED`

### inherits
- BaseModel `EXTRACTED`

### method
- .thread_from_json() `EXTRACTED`
- .thread_json() `EXTRACTED`

### references
- .get_conversations_by_status() `EXTRACTED`
- .add_conversation() `EXTRACTED`
- ._generate_whatsapp_response() `EXTRACTED`
- ._generate_response() `EXTRACTED`
- ._classify_intent() `EXTRACTED`
- .get_conversation() `EXTRACTED`

### uses
- [StateManager](StateManager.md) `INFERRED`
- [Handler](Handler.md) `INFERRED`
- test_state_summary_shape() `INFERRED`
- test_classifier_receives_the_correct_channel_history_and_opener() `INFERRED`
- test_a_reply_frees_a_slot_under_the_unanswered_cap() `INFERRED`
- test_harvey_stays_out_of_conversations_a_human_has() `INFERRED`
- test_campaign_stats() `INFERRED`
- test_pro_plan_is_due_after_a_few_turns_without_a_mention() `INFERRED`
- test_talk_of_posting_brings_up_the_pro() `INFERRED`
- test_whatsapp_prompt_knows_when_the_trial_was_just_offered() `INFERRED`
- test_whatsapp_prompt_tracks_pro_mentions_and_turns() `INFERRED`
- test_whatsapp_reply_counts_recent_questions() `INFERRED`
- test_whatsapp_reply_uses_its_own_prompt_and_counts_team_mentions() `INFERRED`
- test_conversation_add_and_fetch() `INFERRED`
- test_intent_and_stage_distribution() `INFERRED`
- test_update_conversation_stage_and_status() `INFERRED`
- test_always_blocked_whatsapp_draft_goes_to_a_human() `INFERRED`
- test_blocked_whatsapp_draft_is_redrafted() `INFERRED`
- test_thread_from_malformed_json_returns_empty() `INFERRED`

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
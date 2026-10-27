# Prospect

> God node · 87 connections · `harvey/models/prospect.py`

**Community:** [Prospect](Prospect.md)

## Connections by Relation

### calls
- seed_prospect() `EXTRACTED`
- ._prospect_via_linkedin() `EXTRACTED`
- ._prospect_via_hunter() `EXTRACTED`
- ._prospect_via_profile_search() `EXTRACTED`
- pending_followup() `EXTRACTED`
- sent_contact() `EXTRACTED`
- .prepare() `EXTRACTED`
- ._message_shared_contact() `EXTRACTED`
- _seed_prospects() `EXTRACTED`
- test_prospect_is_valid() `EXTRACTED`
- test_prospect_rejects_non_coercible_score() `EXTRACTED`
- test_prospect_full_name() `EXTRACTED`
- test_prospect_invalid_missing_name() `EXTRACTED`
- test_prospect_invalid_missing_title() `EXTRACTED`
- test_gate_blocks_bad_content() `EXTRACTED`
- test_whatsapp_gate() `EXTRACTED`
- test_prospect_coerces_numeric_string_score() `EXTRACTED`
- test_prospect_defaults() `EXTRACTED`
- test_prospect_full_name_strips_when_partial() `EXTRACTED`
- test_prospect_invalid_when_all_empty() `EXTRACTED`

### contains
- prospect.py `EXTRACTED`

### imports
- [test_whatsapp.py](test_whatsapp.py.md) `EXTRACTED`
- [state.py](state.py.md) `EXTRACTED`
- [test_outbox_native.py](test_outbox_native.py.md) `EXTRACTED`
- [test_state_extra.py](test_state_extra.py.md) `EXTRACTED`
- [handler.py](handler.py.md) `EXTRACTED`
- agents/whatsapp.py `EXTRACTED`
- test_models_extra.py `EXTRACTED`
- scout.py `EXTRACTED`
- [test_signals_export.py](test_signals_export.py.md) `EXTRACTED`
- [test_whatsapp_metrics.py](test_whatsapp_metrics.py.md) `EXTRACTED`
- [test_state.py](test_state.py.md) `EXTRACTED`
- [test_email_wiring.py](test_email_wiring.py.md) `EXTRACTED`
- test_models.py `EXTRACTED`
- [test_whatsapp_followup_priority.py](test_whatsapp_followup_priority.py.md) `EXTRACTED`
- models/__init__.py `EXTRACTED`

### inherits
- BaseModel `EXTRACTED`

### method
- .is_valid() `EXTRACTED`
- .full_name() `EXTRACTED`
- ._normalize_email() `EXTRACTED`
- ._strip_linkedin() `EXTRACTED`

### references
- .add_prospect() `EXTRACTED`
- .get_prospects_by_status() `EXTRACTED`
- .get_prospect() `EXTRACTED`
- ._contacts_from_company() `EXTRACTED`
- ._is_duplicate_prospect() `EXTRACTED`
- ._draft() `EXTRACTED`
- .get_prospect_by_email() `EXTRACTED`
- ._prospect_from_row() `EXTRACTED`
- ._remember_prospect() `EXTRACTED`
- ._score_contacts() `EXTRACTED`
- .get_prospect_by_phone() `EXTRACTED`
- .get_contacts_for_company() `EXTRACTED`
- ._heuristic_score() `EXTRACTED`
- ._prospect_key() `EXTRACTED`
- ._variant() `EXTRACTED`

### uses
- [StateManager](StateManager.md) `INFERRED`
- [Scout](Scout.md) `INFERRED`
- [Handler](Handler.md) `INFERRED`
- [WhatsAppAgent](WhatsAppAgent.md) `INFERRED`
- test_state_summary_shape() `INFERRED`
- test_an_opener_too_close_to_a_recent_one_is_redrafted() `INFERRED`
- test_shared_contact_message_goes_out_first_even_from_the_fast_watcher() `INFERRED`
- test_daily_cap_ramps_up_from_the_first_cold_send() `INFERRED`
- test_sender_only_sends_verified() `INFERRED`
- test_contacts_for_company() `INFERRED`
- test_pro_plan_is_due_after_a_few_turns_without_a_mention() `INFERRED`
- test_talk_of_posting_brings_up_the_pro() `INFERRED`
- test_whatsapp_prompt_knows_when_the_trial_was_just_offered() `INFERRED`
- test_whatsapp_prompt_tracks_pro_mentions_and_turns() `INFERRED`
- test_whatsapp_reply_counts_recent_questions() `INFERRED`
- test_whatsapp_reply_uses_its_own_prompt_and_counts_team_mentions() `INFERRED`
- test_update_prospect_email() `INFERRED`
- test_count_prospects_by_status() `INFERRED`
- test_prospect_status_update() `INFERRED`
- test_due_followup_precedes_more_than_sixty_older_cold_messages() `INFERRED`
- *…and 11 more `uses` connection(s) not listed (lowest-degree first to go)*

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
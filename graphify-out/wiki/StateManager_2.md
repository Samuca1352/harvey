# StateManager

> God node · 208 connections · `harvey/state.py`

**Community:** [StateManager](StateManager.md)

## Connections by Relation

### calls
- heartbeat() `EXTRACTED`
- _state() `EXTRACTED`
- cmd_whatsapp() `EXTRACTED`
- ._check_codex() `EXTRACTED`
- cmd_discover() `EXTRACTED`
- cmd_usage() `EXTRACTED`
- _usage() `EXTRACTED`
- .__init__() `EXTRACTED`
- cmd_status() `EXTRACTED`
- ._check_claude() `EXTRACTED`
- _discover() `EXTRACTED`
- _status() `EXTRACTED`
- _handler_with_prospect() `EXTRACTED`
- cmd_export() `EXTRACTED`
- _outbox() `EXTRACTED`
- cmd_profile() `EXTRACTED`
- cmd_signals() `EXTRACTED`
- _signals() `EXTRACTED`
- cmd_outbox() `EXTRACTED`
- cmd_sending() `EXTRACTED`
- *…and 11 more `calls` connection(s) not listed (lowest-degree first to go)*

### contains
- [state.py](state.py.md) `EXTRACTED`

### imports
- [test_whatsapp.py](test_whatsapp.py.md) `EXTRACTED`
- [dashboard.py](dashboard.py.md) `EXTRACTED`
- [test_brain_provider.py](test_brain_provider.py.md) `EXTRACTED`
- [test_codex_e2e.py](test_codex_e2e.py.md) `EXTRACTED`
- [test_discover.py](test_discover.py.md) `EXTRACTED`
- [cli.py](cli.py.md) `EXTRACTED`
- [test_microsoft.py](test_microsoft.py.md) `EXTRACTED`
- [test_outbox_native.py](test_outbox_native.py.md) `EXTRACTED`
- test_precleared.py `EXTRACTED`
- [test_state_extra.py](test_state_extra.py.md) `EXTRACTED`
- [handler.py](handler.py.md) `EXTRACTED`
- [main.py](main.py.md) `EXTRACTED`
- [test_email_finder.py](test_email_finder.py.md) `EXTRACTED`
- test_pipeline.py `EXTRACTED`
- agents/whatsapp.py `EXTRACTED`
- [test_codex_cli_surface.py](test_codex_cli_surface.py.md) `EXTRACTED`
- brain.py `EXTRACTED`
- [setup.py](setup.py.md) `EXTRACTED`
- scout.py `EXTRACTED`
- [test_collectors_profile.py](test_collectors_profile.py.md) `EXTRACTED`
- *…and 14 more `imports` connection(s) not listed (lowest-degree first to go)*

### method
- ._connect() `EXTRACTED`
- .init_db() `EXTRACTED`
- .get_outbox() `EXTRACTED`
- .add_company() `EXTRACTED`
- .add_prospect() `EXTRACTED`
- .get_prospect() `EXTRACTED`
- .get_prospects_by_status() `EXTRACTED`
- .add_outbox_item() `EXTRACTED`
- .get_conversations_by_status() `EXTRACTED`
- .get_setting() `EXTRACTED`
- .set_signal_status() `EXTRACTED`
- .add_conversation() `EXTRACTED`
- .add_observation() `EXTRACTED`
- .set_setting() `EXTRACTED`
- .count_companies_needing_profile() `EXTRACTED`
- .is_reply_processed() `EXTRACTED`
- .add_campaign() `EXTRACTED`
- .get_usage_today() `EXTRACTED`
- .get_state_summary() `EXTRACTED`
- .get_company() `EXTRACTED`
- *…and 70 more `method` connection(s) not listed (lowest-degree first to go)*

### references
- .__init__() `EXTRACTED`
- .__init__() `EXTRACTED`
- .__init__() `EXTRACTED`
- .__init__() `EXTRACTED`
- .__init__() `EXTRACTED`
- .__init__() `EXTRACTED`
- .__init__() `EXTRACTED`

### uses
- [Prospect](Prospect.md) `INFERRED`
- [Brain](Brain.md) `INFERRED`
- [Scout](Scout.md) `INFERRED`
- [Company](Company.md) `INFERRED`
- [Conversation](Conversation.md) `INFERRED`
- [Handler](Handler.md) `INFERRED`
- [WhatsAppAgent](WhatsAppAgent.md) `INFERRED`
- [Campaign](Campaign.md) `INFERRED`
- Sender `INFERRED`
- SetupWizard `INFERRED`
- [Trainer](Trainer.md) `INFERRED`
- Harness `INFERRED`
- test_instantly_path_leaves_the_reply_unprocessed_when_the_brain_is_down() `INFERRED`
- Writer `INFERRED`
- export_prospects_csv() `INFERRED`
- [Analyst](Analyst.md) `INFERRED`
- test_real_cli_all_catalog_models_and_config_defaults() `INFERRED`
- _seed_observations() `INFERRED`
- test_soak_mixed_faults_across_concurrent_brains() `INFERRED`
- test_existing_usage_rows_become_claude() `INFERRED`
- *…and 25 more `uses` connection(s) not listed (lowest-degree first to go)*

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
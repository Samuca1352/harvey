# BrainConfig

> God node · 46 connections · `harvey/config.py`

**Community:** [BrainConfig](BrainConfig.md)

## Connections by Relation

### calls
- load_brain_config() `EXTRACTED`
- _codex_brain() `EXTRACTED`
- cmd_train() `EXTRACTED`
- _ask_brain_config() `EXTRACTED`
- test_cli_status_check_reports_readiness() `EXTRACTED`
- .__init__() `EXTRACTED`
- test_cli_usage_reads_only_the_active_providers_quota() `EXTRACTED`
- test_dashboard_codex_quota_is_labelled_codex() `EXTRACTED`
- test_cli_train_flags_select_the_provider() `EXTRACTED`
- test_dashboard_hides_another_providers_pause() `EXTRACTED`
- test_dashboard_reports_unavailable_codex_quota() `EXTRACTED`
- test_load_brain_config() `EXTRACTED`
- test_paused_brain_is_visible_on_the_dashboard() `EXTRACTED`
- test_claude_is_the_default() `EXTRACTED`
- test_cli_status_hides_another_providers_pause() `EXTRACTED`
- test_cli_status_shows_a_recorded_pause() `EXTRACTED`
- test_dashboard_claude_default_unchanged() `EXTRACTED`
- test_dashboard_codex_quota_client_follows_the_configured_model() `EXTRACTED`
- test_trainer_uses_and_writes_back_the_selection() `EXTRACTED`
- brain() `EXTRACTED`
- *…and 4 more `calls` connection(s) not listed (lowest-degree first to go)*

### contains
- [config.py](config.py.md) `EXTRACTED`

### imports
- [test_brain_provider.py](test_brain_provider.py.md) `EXTRACTED`
- [cli.py](cli.py.md) `EXTRACTED`
- brain.py `EXTRACTED`
- [setup.py](setup.py.md) `EXTRACTED`
- [test_codex_platform.py](test_codex_platform.py.md) `EXTRACTED`
- trainer.py `EXTRACTED`
- test_codex_soak.py `EXTRACTED`

### inherits
- BaseModel `EXTRACTED`

### method
- ._valid_provider() `EXTRACTED`
- ._valid_model() `EXTRACTED`
- ._valid_effort() `EXTRACTED`

### rationale_for
- Which subscription Harvey thinks with. ``claude`` (default) runs Claude Code… `EXTRACTED`

### references
- .__init__() `EXTRACTED`

### uses
- [Brain](Brain.md) `INFERRED`
- SetupWizard `INFERRED`
- [Trainer](Trainer.md) `INFERRED`
- soak() `INFERRED`
- brain_section() `INFERRED`
- test_claude_model_choice_is_passed_per_call() `INFERRED`
- test_main_heartbeat_builds_brain_from_config() `INFERRED`
- test_windows_quota_and_brain_pause_cleanly() `INFERRED`

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
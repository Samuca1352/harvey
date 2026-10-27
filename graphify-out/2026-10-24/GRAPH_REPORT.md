# Graph Report - harvey  (2026-10-24)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 3441 nodes · 8838 edges · 160 communities (115 shown, 45 thin omitted)
- Extraction: 86% EXTRACTED · 14% INFERRED · 0% AMBIGUOUS · INFERRED: 1210 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `22f546b2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- StateManager
- react-dom.js
- test_microsoft.py
- test_codex_e2e.py
- test_outbox_native.py
- Scout
- app.js
- components.js
- ref_react
- cli.py
- InstantlyClient
- InboundMessage
- handler.py
- Prospect
- Company
- Trainer
- discover.py
- make_handler
- setup.py
- json
- config.py
- asyncio
- ni
- test_whatsapp.py
- CodexClient
- ri
- dashboard.py
- pytest
- state.py
- test_codex_cli_surface.py
- test_codex.py
- Campaign
- WhatsAppAgent
- Brain
- WhatsAppClient
- codex.py
- test_signals_export.py
- .init_db
- Conversation
- xk
- Handler
- react.js
- harvey
- _state
- test_state_extra.py
- test_dashboard_signals.py
- steps
- LinkedInAutomation
- m
- asyncio
- index.js
- main.py
- ProfileCollector
- index.d.ts
- email_finder.py
- asyncio
- find_email
- ConfigFileNotFoundError
- DiscoveryProvider
- test_email_finder.py
- test_codex_platform.py
- Icon
- steps
- test_whatsapp_metrics.py
- whatsapp
- check_cli_version
- ._on_turn_message
- test_collectors_profile.py
- test_discover.py
- night.py
- BrainConfig
- derive_pattern
- package.json
- test_whatsapp_followup_priority.py
- Badge.jsx
- Analyst
- _client
- FakeWa
- test_state.py
- test_email_wiring.py
- test_brain_provider.py
- _leftover_runtimes
- design-system/package.json
- pi
- .run_cli
- email
- .set_signal_status
- .paused_reason
- _write_login
- handler
- ios-frame.js
- wk
- _load_native_auth
- DataForSEOListings
- _Quota
- product
- check-design-system.mjs
- build-design-system.mjs
- _MockModel
- ios-frame.jsx
- harvey.yaml
- CodexQuotaClient
- _check_harvey_pid
- icp
- CalendarClient
- offer
- _capture_exec
- fake
- soak
- FakeBrain
- Shell.jsx
- attest_effective_config
- get_usage
- persona
- test_brain_no_tools.py
- FakeDiscovery
- eslint.config.mjs
- build_private_config_toml
- build_access_snapshot
- check_native_auth
- discovery
- scripts
- offline
- MetricCard.jsx
- precleared
- EmailResult
- _hunter_domain_pattern
- _answering
- _StubCodex
- test_cli_status_check_reports_readiness
- test_watcher_over_budget_still_sends_written_replies_but_reads_nothing
- Menu.d.ts
- exports
- HomeScreen.jsx
- TasksScreen.jsx
- normalize_usage
- save_env_settings
- client
- test_dashboard_text_is_utf8_with_windows_default_encoding
- Select.d.ts
- Tabs.d.ts
- AgentScreen.jsx
- App.jsx
- code-review-graph
- client
- entrypoint.sh
- _mask_key
- harvey

## God Nodes (most connected - your core abstractions)
1. `StateManager` - 208 edges
2. `Prospect` - 87 edges
3. `Brain` - 84 edges
4. `Scout` - 57 edges
5. `Company` - 52 edges
6. `Conversation` - 51 edges
7. `m()` - 47 edges
8. `BrainConfig` - 46 edges
9. `make_handler()` - 46 edges
10. `Handler` - 45 edges

## Surprising Connections (you probably didn't know these)
- `state()` --uses--> `StateManager`  [INFERRED]
  tests/test_brain_no_tools.py → harvey/state.py
- `client()` --uses--> `StateManager`  [INFERRED]
  tests/test_brain_provider.py → harvey/state.py
- `state()` --uses--> `StateManager`  [INFERRED]
  tests/test_brain_provider.py → harvey/state.py
- `test_codex_setup_does_not_require_claude()` --uses--> `StateManager`  [INFERRED]
  tests/test_brain_provider.py → harvey/state.py
- `test_real_cli_all_catalog_models_and_config_defaults()` --uses--> `StateManager`  [INFERRED]
  tests/test_codex_cli_surface.py → harvey/state.py

## Import Cycles
- None detected.

## Communities (160 total, 45 thin omitted)

### Community 0 - "StateManager"
Cohesion: 0.04
Nodes (14): _outbox(), _run(), _usage(), _new_id(), _norm(), StateManager, _utcnow(), seed() (+6 more)

### Community 1 - "react-dom.js"
Cohesion: 0.04
Nodes (80): $a(), Ab(), bc(), Bd(), be(), Ce(), dd(), de() (+72 more)

### Community 2 - "test_microsoft.py"
Cohesion: 0.05
Nodes (51): _test(), _jwt_expiry(), _checked_next_link(), GraphError, _load_token(), _LoopbackServer, _LoopbackServerV6, MicrosoftProvider (+43 more)

### Community 3 - "test_codex_e2e.py"
Cohesion: 0.05
Nodes (39): _approved_item(), _DownBrain, Harness, harvey(), _load_pre_codex_db(), _none(), _open_thread(), _reply() (+31 more)

### Community 4 - "test_outbox_native.py"
Cohesion: 0.06
Nodes (52): looks_like_bounce(), Clearance, _from_cache(), PreclearedClient, _reason(), _text(), _utcnow(), Cfg (+44 more)

### Community 6 - "app.js"
Cohesion: 0.08
Nodes (76): api(), applyTheme(), badge(), brainCallChips(), _campaigns, _cohort, _companies, cycleTheme() (+68 more)

### Community 7 - "components.js"
Cohesion: 0.08
Nodes (61): AgentPanel(), AgentScreen(), App(), NewAgentDialog(), ArtifactsScreen(), PlaceholderScreen(), ActionRow(), ActivityCard() (+53 more)

### Community 8 - "ref_react"
Cohesion: 0.03
Nodes (37): AvatarProps, BadgeProps, BadgeTone, ButtonProps, CardProps, EyebrowProps, IconProps, IconButtonProps (+29 more)

### Community 9 - "cli.py"
Cohesion: 0.06
Nodes (29): _check_python_version(), cmd_dashboard(), cmd_gmail(), cmd_install(), cmd_microsoft(), cmd_outbox(), cmd_profile(), _profile() (+21 more)

### Community 11 - "InboundMessage"
Cohesion: 0.06
Nodes (9): _test(), GmailProvider, _load_token(), run_auth_flow(), _save_token(), InboundMessage, MailProvider, SendResult (+1 more)

### Community 12 - "handler.py"
Cohesion: 0.07
Nodes (19): _plain(), _skeleton(), _run(), _strip_code(), _text(), GateResult, pre_send_check(), pre_send_check_whatsapp() (+11 more)

### Community 13 - "Prospect"
Cohesion: 0.06
Nodes (23): _utcnow(), _utcnow(), _utcnow(), Prospect, _utcnow(), test_campaign_requires_id_field(), test_company_all_fields_default_empty(), test_conversation_default_stage_is_first_pipeline_stage() (+15 more)

### Community 14 - "Company"
Cohesion: 0.09
Nodes (23): Company, _seed_observations(), chain(), config(), state(), test_a_cohort_reflects_the_newest_observation(), test_a_dry_run_neither_discovers_nor_profiles(), test_a_failing_profile_stage_does_not_lose_the_discovery() (+15 more)

### Community 15 - "Trainer"
Cohesion: 0.06
Nodes (6): CloudflareCrawler, FallbackCrawler, main(), _normalize_start_url(), run_training(), Trainer

### Community 16 - "discover.py"
Cohesion: 0.07
Nodes (18): cmd_discover(), _discover(), build_queries(), Business, DiscoveryQuery, DiscoveryReport, geocode_city(), GoogleMapsScraper (+10 more)

### Community 17 - "make_handler"
Cohesion: 0.12
Nodes (34): WaInbound, contacted_prospect(), ContextBrain, conversation(), test_accepted_demo_has_a_handoff_even_without_designer_in_the_reply(), test_classifier_receives_the_correct_channel_history_and_opener(), test_courtesy_after_referral_keeps_the_opportunity_without_another_pitch(), test_courtesy_does_not_hide_a_refusal() (+26 more)

### Community 18 - "setup.py"
Cohesion: 0.09
Nodes (11): _ask(), _ask_brain_config(), _ask_yes_no(), _check_claude_cli(), _check_codex_cli(), _print_harvey(), _print_step(), SetupWizard (+3 more)

### Community 19 - "json"
Cohesion: 0.07
Nodes (16): get_oauth_token(), _keychain_services(), _parse_window(), QuotaClient, _token_from_json_blob(), claude_config_dir(), answer_for(), effective_config() (+8 more)

### Community 20 - "config.py"
Cohesion: 0.07
Nodes (18): ChannelsConfig, ComplianceConfig, DiscoveryConfig, EmailChannelConfig, _format_validation_error(), ICPConfig, LinkedInChannelConfig, OfferConfig (+10 more)

### Community 21 - "asyncio"
Cohesion: 0.11
Nodes (31): make_agent(), seed_company(), staged_agent(), test_a_cold_message_waits_for_its_turn_but_a_reply_does_not(), test_a_reply_frees_a_slot_under_the_unanswered_cap(), test_a_session_that_needs_a_qr_code_is_not_restarted(), test_a_stopped_session_is_started_again_and_sending_resumes(), test_an_opener_too_close_to_a_recent_one_is_redrafted() (+23 more)

### Community 22 - "ni"
Cohesion: 0.09
Nodes (44): ah(), ai(), bi(), ci(), ef(), Eh(), fb(), $g() (+36 more)

### Community 23 - "test_whatsapp.py"
Cohesion: 0.07
Nodes (27): is_auto_message(), wants_opt_out_pt(), _parse_ts(), _at(), _client(), _env(), fast_polling(), scraper_transport() (+19 more)

### Community 24 - "CodexClient"
Cohesion: 0.09
Nodes (6): _AppServer, _classify_turn_error(), CodexClient, CodexError, require_supported_platform(), test_codex_missing_is_setup_error()

### Community 25 - "ri"
Cohesion: 0.16
Nodes (42): aa(), ac(), df(), dh(), b(), c(), d(), e() (+34 more)

### Community 26 - "dashboard.py"
Cohesion: 0.09
Nodes (21): active_brain_status(), _active_provider(), _brain_status(), dashboard(), export_prospects(), get_activity(), get_campaigns(), get_companies() (+13 more)

### Community 27 - "pytest"
Cohesion: 0.10
Nodes (25): ConfigError, EnvConfig, HarveyConfig, load_config(), get_mail_provider(), test_config_missing_required_persona_field(), test_config_wrong_type_raises(), test_email_channel_rejects_negative_sends() (+17 more)

### Community 28 - "state.py"
Cohesion: 0.11
Nodes (6): _alive(), _native_identity(), test_soak_cancellation_storm(), test_soak_many_concurrent_clients(), test_soak_mixed_faults_across_concurrent_brains(), _timed()

### Community 29 - "test_codex_cli_surface.py"
Cohesion: 0.09
Nodes (18): find_codex(), attacker(), _bundled_catalog(), _fake_native_login(), _hostile_routes(), _jwt(), mock_codex(), _model_visible_tools() (+10 more)

### Community 30 - "test_codex.py"
Cohesion: 0.15
Nodes (29): _client(), test_attempted_tool_use_aborts_the_call(), test_calls_are_serialized(), test_code_mode_model_runs_with_a_private_text_catalog(), test_commentary_alone_is_not_an_answer(), test_every_isolation_check_happens_before_the_prompt(), test_exhausted_plan_reads_as_full(), test_inherited_mcp_is_disabled_and_attested() (+21 more)

### Community 31 - "Campaign"
Cohesion: 0.10
Nodes (14): Writer, Campaign, EmailStep, test_campaign_empty_sequence_round_trip(), test_campaign_sequence_from_json_bad_step_shape_raises(), test_campaign_sequence_from_malformed_json_returns_empty(), test_campaign_sequence_json_unicode_round_trip(), test_email_step_delay_defaults_to_zero() (+6 more)

### Community 32 - "WhatsAppAgent"
Cohesion: 0.10
Nodes (3): _now(), WhatsAppAgent, whatsapp_persona_name()

### Community 33 - "Brain"
Cohesion: 0.10
Nodes (5): Brain, parse_brain_status(), test_brain_records_usage_from_payload(), test_parse_result_payload_json(), test_parse_result_payload_plain_text_fallback()

### Community 34 - "WhatsAppClient"
Cohesion: 0.11
Nodes (3): get_whatsapp_client(), to_jid(), WhatsAppClient

### Community 35 - "codex.py"
Cohesion: 0.12
Nodes (19): attest_hooks(), attest_mcp_status(), attest_thread(), build_thread_config(), build_thread_params(), describe_catalog(), describe_model(), _isolation_error() (+11 more)

### Community 36 - "test_signals_export.py"
Cohesion: 0.12
Nodes (15): cmd_export(), _export(), collect_prospects(), export_prospects_csv(), to_csv(), detect_tech(), _get_compiled(), _seed_prospects() (+7 more)

### Community 37 - ".init_db"
Cohesion: 0.08
Nodes (14): _stats(), state(), state(), state(), state(), state(), state(), state() (+6 more)

### Community 38 - "Conversation"
Cohesion: 0.14
Nodes (20): Conversation, Message, test_conversation_empty_thread_round_trip(), test_thread_from_malformed_json_returns_empty(), test_thread_json_preserves_timestamps(), test_conversation_thread_json_round_trip(), test_conversation_add_and_fetch(), test_update_conversation_stage_and_status() (+12 more)

### Community 39 - "xk"
Cohesion: 0.12
Nodes (29): af(), bj(), Bk(), cf(), $d(), Db(), Dc(), fi() (+21 more)

### Community 41 - "react.js"
Cohesion: 0.12
Nodes (19): B(), C(), D(), Fa(), Qh(), E(), fa(), M() (+11 more)

### Community 42 - "harvey"
Cohesion: 0.07
Nodes (27): DISABLE_TELEMETRY, GMAPS_SCRAPER_URL, command, environment, image, ports, restart, volumes (+19 more)

### Community 43 - "_state"
Cohesion: 0.11
Nodes (17): estimate_cost(), add_feedback(), _discovery_queries(), estimate_discovery(), outbox_approve(), outbox_approve_all(), outbox_reject(), preview_cohort() (+9 more)

### Community 44 - "test_state_extra.py"
Cohesion: 0.15
Nodes (21): test_add_company_generates_id_when_missing(), test_add_company_same_id_is_ignored(), test_add_prospect_same_id_is_ignored(), test_count_prospects_by_status(), test_get_company_by_id(), test_get_company_missing_returns_none(), test_get_prospect_by_email_empty_string(), test_get_prospect_by_id_roundtrips_bools() (+13 more)

### Community 45 - "test_dashboard_signals.py"
Cohesion: 0.07
Nodes (7): test_cohort_is_a_set_intersection(), test_cohort_with_no_requirements_is_empty_not_everything(), test_confirming_before_the_catalog_loads_still_works(), test_cost_notes_are_machine_classifiable(), test_reseeding_never_overrides_a_users_decision(), test_signal_counts_surface_in_the_review_ui(), test_signals_seed_as_proposed_not_confirmed()

### Community 46 - "steps"
Cohesion: 0.07
Nodes (26): HARVEY_CODEX_CLI_TESTS, HARVEY_PACKAGE_TESTS, jobs, test, os, python, name, permissions (+18 more)

### Community 48 - "m"
Cohesion: 0.11
Nodes (26): Ag(), B(), Bg(), Cc(), cd(), Cg(), Gk(), $h() (+18 more)

### Community 49 - "asyncio"
Cohesion: 0.18
Nodes (16): biz(), FakeProvider, register(), test_a_failed_query_does_not_lose_the_successful_ones(), fetch(), test_budget_cap_refuses_before_spending(), test_budget_stops_mid_run_when_actual_exceeds_estimate(), test_dry_run_estimates_without_calling_anything() (+8 more)

### Community 50 - "index.js"
Cohesion: 0.21
Nodes (12): Button(), IconButton(), ActivityCard(), ArtifactCard(), KIND, ProgressCard(), SegmentBar(), Dialog() (+4 more)

### Community 51 - "main.py"
Cohesion: 0.14
Nodes (8): decide_next_action(), heartbeat(), in_quiet_hours(), _interruptible_sleep(), _run_agents(), _run_with_signals(), seconds_until_quiet_hours_end(), whatsapp_watcher()

### Community 54 - "email_finder.py"
Cohesion: 0.16
Nodes (9): detect_catch_all(), _hunter_api_key(), hunter_domain_people(), _hunter_monthly_cap(), _verify_candidate(), verify_email_smtp(), verify_hunter(), verify_reoon() (+1 more)

### Community 55 - "asyncio"
Cohesion: 0.16
Nodes (14): CodexResult, _codex_brain(), test_codex_brain_never_touches_claude(), test_codex_budget_uses_codex_quota_and_counter(), test_codex_cancellation_propagates(), test_codex_known_denial_closes_the_budget(), test_codex_non_retryable_failure_stops_immediately(), test_codex_pause_is_sticky_until_the_login_or_cli_changes() (+6 more)

### Community 56 - "find_email"
Cohesion: 0.13
Nodes (11): _clean_domain(), find_email(), get_mx_host(), Env, test_find_email_catch_all_is_risky(), test_find_email_inconclusive_is_guess_not_verified(), test_find_email_invalid_from_provider(), test_find_email_verified_via_reoon() (+3 more)

### Community 57 - "ConfigFileNotFoundError"
Cohesion: 0.12
Nodes (8): ConfigFileNotFoundError, _find_config_file(), _current_provider(), get_settings(), get_setup_status(), _read_env_file(), _resolve_config_file(), _needs_setup()

### Community 58 - "DiscoveryProvider"
Cohesion: 0.11
Nodes (7): DataForSEOSerp, _dfs_items(), DiscoveryProvider, normalize_domain(), Serper, test_dataforseo_serp_adapter_reads_rank_group_not_position(), test_serper_adapter()

### Community 59 - "test_email_finder.py"
Cohesion: 0.14
Nodes (11): build_email(), classify_mx(), _clean_name_part(), generate_patterns(), infer_pattern_from_email(), _status_from_verdict(), test_build_email_patterns(), test_classify_mx() (+3 more)

### Community 60 - "test_codex_platform.py"
Cohesion: 0.15
Nodes (8): on_windows(), test_claude_is_unaffected_on_windows(), test_long_non_ascii_prompt_reaches_codex_intact(), test_paths_with_spaces_and_non_ascii(), test_private_runtime_and_login_copy_modes(), test_real_executable_in_a_path_with_spaces(), test_windows_codex_is_refused_before_login_or_runtime(), test_windows_quota_and_brain_pause_cleanly()

### Community 61 - "Icon"
Cohesion: 0.23
Nodes (10): Icon(), IconChip(), ICONS, ActionRow(), Menu(), MenuTrigger(), Checkbox(), Select() (+2 more)

### Community 62 - "steps"
Cohesion: 0.11
Nodes (18): jobs, verify, name, permissions, contents, branches, name, run (+10 more)

### Community 63 - "test_whatsapp_metrics.py"
Cohesion: 0.31
Nodes (12): variant_examples(), variant_stats(), get_openers(), bot_log(), reply(), sent_contact(), test_auto_events_before_contact_or_for_other_channels_are_ignored(), test_email_and_empty_conversations_do_not_count_as_whatsapp_replies() (+4 more)

### Community 64 - "whatsapp"
Cohesion: 0.11
Nodes (18): whatsapp, cold_paused_until, default_country_code, enabled, followup_delays_hours, max_daily_sends, max_daily_unanswered, max_gap_seconds (+10 more)

### Community 65 - "check_cli_version"
Cohesion: 0.15
Nodes (9): build_child_env(), check_cli_version(), parse_cli_version(), require_supported_version(), server_version(), _setup_error(), test_environment_allowlist_is_case_insensitive_and_drops_secrets(), test_child_env_is_allowlisted() (+1 more)

### Community 66 - "._on_turn_message"
Cohesion: 0.15
Nodes (9): bucket_applies(), _iso_from_unix(), mark_exhausted(), parse_rate_limits(), select_rate_limits(), _Turn, _usage_blocked(), test_parse_rate_limits() (+1 more)

### Community 67 - "test_collectors_profile.py"
Cohesion: 0.18
Nodes (13): title_looks_like_role(), collector(), test_agency_descriptive_anchor_scores_lower_but_records(), test_agency_detected_from_strong_credit(), test_bare_link_is_not_recorded(), test_benign_footer_links_ignored(), test_clean_page_has_no_false_tech(), test_page_titles_are_not_people() (+5 more)

### Community 68 - "test_discover.py"
Cohesion: 0.12
Nodes (6): test_an_unmappable_term_is_reported_not_silently_skipped(), test_configured_coordinates_win_over_geocoding(), test_directories_and_institutions_are_junk(), test_real_businesses_survive_the_filter(), test_the_default_provider_needs_no_account(), test_unconfigured_provider_says_which_key_is_missing()

### Community 69 - "night.py"
Cohesion: 0.14
Nodes (6): night_shift(), night_step(), queue_size(), search_pairs(), test_night_shift_searches_then_drafts_and_stops_at_the_target(), test_night_shift_without_the_brain_only_searches()

### Community 70 - "BrainConfig"
Cohesion: 0.12
Nodes (10): BrainConfig, test_brain_config_validation(), test_claude_is_the_default(), test_cli_train_flags_select_the_provider(), test_cli_usage_reads_only_the_active_providers_quota(), test_load_brain_config(), test_main_heartbeat_builds_brain_from_config(), test_setup_writes_the_selection() (+2 more)

### Community 71 - "derive_pattern"
Cohesion: 0.17
Nodes (11): derive_pattern(), hunter_searches_remaining(), _hunter_usage_key(), record_hunter_search(), test_derive_pattern_default_no_signal(), test_derive_pattern_from_known_email(), test_derive_pattern_spends_and_respects_hunter_budget(), test_derive_pattern_uses_cache() (+3 more)

### Community 72 - "package.json"
Cohesion: 0.16
Nodes (16): devDependencies, esbuild@0.25.12, eslint@9.39.1, react@18.3.1, @types/react@18.3.27, @types/react-dom@18.3.7, typescript@5.9.3, react (+8 more)

### Community 73 - "test_whatsapp_followup_priority.py"
Cohesion: 0.24
Nodes (12): pending_followup(), test_cold_daily_cap_does_not_hold_an_approved_followup(), test_due_followup_precedes_more_than_sixty_older_cold_messages(), test_fast_watcher_leaves_followups_for_the_heartbeat(), test_followup_rechecks_customer_and_conversation_before_sending(), followups(), _now_iso(), quiet_conversation() (+4 more)

### Community 74 - "Badge.jsx"
Cohesion: 0.24
Nodes (9): Badge(), Count(), STATUS_COLORS, StatusDot(), KanbanColumn(), TaskCardProps, TaskTag, TaskCard() (+1 more)

### Community 76 - "_client"
Cohesion: 0.17
Nodes (7): OpenStreetMap, _client(), test_osm_maps_the_trades_it_does_know(), test_osm_refuses_a_term_it_cannot_map_instead_of_guessing(), test_overpass_falls_over_to_the_next_mirror(), test_overpass_needs_a_coordinate_and_says_so(), test_overpass_throttling_is_an_error_not_an_empty_market()

### Community 77 - "FakeWa"
Cohesion: 0.14
Nodes (3): WaSendResult, fail(), FakeWa

### Community 78 - "test_state.py"
Cohesion: 0.21
Nodes (8): test_add_and_get_company(), test_add_and_get_prospect(), test_company_exists(), test_contacts_for_company(), test_get_prospect_by_email(), test_prospect_status_update(), test_reply_deduplication(), test_usage_tracking()

### Community 79 - "test_email_wiring.py"
Cohesion: 0.20
Nodes (9): _Cfg, channels, email, test_migration_downgrades_legacy_verified(), test_prospect_email_status_roundtrips(), test_save_email_pattern_keeps_highest_confidence(), test_save_email_pattern_updates_catch_all_independently(), test_sender_only_sends_verified() (+1 more)

### Community 80 - "test_brain_provider.py"
Cohesion: 0.22
Nodes (10): _render_js(), _render_quota_card(), _status_cli(), test_claude_preflight_is_a_no_op(), test_cli_status_hides_another_providers_pause(), test_cli_status_shows_a_recorded_pause(), test_dashboard_hides_another_providers_pause(), test_paused_brain_is_visible_on_the_dashboard() (+2 more)

### Community 81 - "_leftover_runtimes"
Cohesion: 0.19
Nodes (10): _alive(), _leftover_runtimes(), test_blocked_prompt_write_is_bounded_by_the_deadline(), test_cancellation_kills_the_runtime(), test_codex_failing_to_start_is_a_setup_error(), test_crash_is_retryable_and_cleaned_up(), test_group_readable_login_is_refused(), test_isolated_turn_returns_final_answer_and_usage() (+2 more)

### Community 82 - "design-system/package.json"
Cohesion: 0.18
Nodes (12): react, main, name, peerDependencies, react@^18.3.1, react-dom@^18.3.1, private, type (+4 more)

### Community 83 - "pi"
Cohesion: 0.18
Nodes (13): bh(), ch(), Ck(), Id(), Ie(), ii(), ji(), me() (+5 more)

### Community 84 - ".run_cli"
Cohesion: 0.19
Nodes (4): _kill_tree(), _remaining(), _timeout_error(), _wait_exit()

### Community 85 - "email"
Cohesion: 0.17
Nodes (12): channels, email, linkedin, enabled, max_bounce_rate, max_daily_sends, provider, require_approval (+4 more)

### Community 86 - ".set_signal_status"
Cohesion: 0.23
Nodes (5): test_only_confirmed_signals_are_collected(), test_seeded_catalog_starts_unconfirmed(), test_user_decision_survives_reseeding(), state(), test_unconfirmed_signals_are_not_recorded()

### Community 88 - "_write_login"
Cohesion: 0.18
Nodes (8): renew(), _jwt(), native_home(), private_tempdir(), _rfc3339(), test_each_call_reads_the_login_afresh(), test_expired_login_fails_before_anything_runs(), _write_login()

### Community 89 - "handler"
Cohesion: 0.22
Nodes (6): _geo_client(), test_a_geocode_miss_is_cached_too(), test_dataforseo_listings_adapter(), handler(), test_geocode_is_cached_so_a_city_is_looked_up_once(), test_one_geocode_per_city_not_per_query()

### Community 90 - "ios-frame.js"
Cohesion: 0.29
Nodes (6): IOSDevice(), IOSGlassPill(), IOSKeyboard(), IOSNavBar(), IOSStatusBar(), Phone()

### Community 91 - "wk"
Cohesion: 0.22
Nodes (10): Bf(), eb(), gf(), Ih(), ld(), oe(), qg(), ub() (+2 more)

### Community 93 - "DataForSEOListings"
Cohesion: 0.27
Nodes (3): DataForSEOListings, test_dataforseo_errors_surface_the_message_not_just_the_code(), test_dataforseo_sandbox_is_never_the_live_host()

### Community 94 - "_Quota"
Cohesion: 0.22
Nodes (7): _NeverRead, _Quota, test_dashboard_claude_default_unchanged(), test_dashboard_codex_quota_client_follows_the_configured_model(), __init__(), test_dashboard_codex_quota_is_labelled_codex(), test_dashboard_reports_unavailable_codex_quota()

### Community 95 - "product"
Cohesion: 0.22
Nodes (9): already have a solution, not interested, too expensive, product, description, key_benefits, name, objection_responses (+1 more)

### Community 96 - "check-design-system.mjs"
Cohesion: 0.22
Nodes (5): ds, lint, root, triage, walk()

### Community 97 - "build-design-system.mjs"
Cohesion: 0.22
Nodes (6): ds, htmls, links, root, runtime, walk()

### Community 99 - "ios-frame.jsx"
Cohesion: 0.39
Nodes (5): IOSDevice(), IOSGlassPill(), IOSKeyboard(), IOSNavBar(), IOSStatusBar()

### Community 100 - "harvey.yaml"
Cohesion: 0.25
Nodes (7): end, start, timezone, heartbeat_interval_minutes, max_daily_claude_percent, quiet_hours, usage

### Community 102 - "_check_harvey_pid"
Cohesion: 0.25
Nodes (4): _check_harvey_pid(), get_harvey_status(), start_harvey(), stop_harvey()

### Community 103 - "icp"
Cohesion: 0.25
Nodes (8): icp, company_size, exclude_industries, geography, hiring_signals, include_keywords, industries, titles

### Community 105 - "offer"
Cohesion: 0.25
Nodes (8): booking_method, booking_url, entry, goal, meeting_duration, meeting_owner, primary, offer

### Community 106 - "_capture_exec"
Cohesion: 0.25
Nodes (5): _capture_exec(), fake_exec(), _FakeProcess, test_claude_model_choice_is_passed_per_call(), test_long_claude_prompts_still_go_via_stdin()

### Community 107 - "fake"
Cohesion: 0.32
Nodes (4): fake(), entries(), methods(), servers()

### Community 108 - "soak"
Cohesion: 0.29
Nodes (5): soak(), brain(), client(), entries(), pids()

### Community 111 - "attest_effective_config"
Cohesion: 0.33
Nodes (5): attest_effective_config(), _find_custom_endpoint(), _good_effective_config(), test_attest_effective_config_rejects_custom_routes(), test_attest_effective_config_requires_every_lockdown_setting()

### Community 112 - "get_usage"
Cohesion: 0.29
Nodes (3): _active_brain(), get_usage(), _quota_client_for()

### Community 113 - "persona"
Cohesion: 0.29
Nodes (7): persona, company, email, linkedin, name, role, tone

### Community 114 - "test_brain_no_tools.py"
Cohesion: 0.38
Nodes (3): _FakeProcess, test_brain_runs_claude_with_no_tools(), fake_exec()

### Community 116 - "eslint.config.mjs"
Cohesion: 0.33
Nodes (4): adherence, restrictedImports, syntax, variants

### Community 118 - "build_private_config_toml"
Cohesion: 0.33
Nodes (3): build_private_config_toml(), _toml_value(), test_private_config_is_valid_toml_with_every_feature_off()

### Community 119 - "build_access_snapshot"
Cohesion: 0.33
Nodes (4): build_access_snapshot(), _parse_timestamp(), test_login_a_week_old_is_still_used(), test_unreadable_token_expiry_is_an_auth_error()

### Community 120 - "check_native_auth"
Cohesion: 0.33
Nodes (5): check_native_auth(), test_windows_setup_checks_refuse_codex(), test_api_key_login_is_refused(), test_external_token_login_is_refused(), test_missing_login_is_actionable()

### Community 121 - "discovery"
Cohesion: 0.33
Nodes (6): discovery, cities, night_shift, provider, queue_target, results_per_search

### Community 122 - "scripts"
Cohesion: 0.33
Nodes (6): scripts, build:design-system, check:design-system, lint, test:design-system, typecheck:design-system

### Community 124 - "MetricCard.jsx"
Cohesion: 0.50
Nodes (4): MetricCard(), MiniChart(), TEXT, TONES

### Community 125 - "precleared"
Cohesion: 0.40
Nodes (5): compliance, precleared, address_source, enabled, sender_country

### Community 127 - "_hunter_domain_pattern"
Cohesion: 0.40
Nodes (3): _hunter_domain_pattern(), _translate_hunter_pattern(), test_translate_hunter_pattern()

### Community 130 - "test_cli_status_check_reports_readiness"
Cohesion: 0.40
Nodes (3): test_cli_status_check_reports_readiness(), test_codex_setup_does_not_require_claude(), ready()

### Community 132 - "Menu.d.ts"
Cohesion: 0.50
Nodes (3): MenuItem, MenuProps, MenuTriggerProps

### Community 133 - "exports"
Cohesion: 0.50
Nodes (4): exports, ./assets/*, ./styles.css, ./tokens/*

### Community 134 - "HomeScreen.jsx"
Cohesion: 0.83
Nodes (3): AgentPerfRow(), greeting(), HomeScreen()

### Community 135 - "TasksScreen.jsx"
Cohesion: 0.83
Nodes (3): NewTask(), TaskDetail(), TasksScreen()

## Knowledge Gaps
- **2 isolated node(s):** `uvx`, `harvey`
  These have ≤1 connection - possible missing edges. (Counts symbols only; 1183 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **45 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StateManager` connect `StateManager` to `test_cli_status_check_reports_readiness`, `test_codex_e2e.py`, `test_microsoft.py`, `Scout`, `test_outbox_native.py`, `cli.py`, `InstantlyClient`, `handler.py`, `Prospect`, `Company`, `Trainer`, `discover.py`, `make_handler`, `setup.py`, `client`, `json`, `asyncio`, `test_whatsapp.py`, `dashboard.py`, `pytest`, `state.py`, `test_codex_cli_surface.py`, `Campaign`, `WhatsAppAgent`, `Brain`, `WhatsAppClient`, `test_signals_export.py`, `.init_db`, `Conversation`, `Handler`, `_state`, `test_state_extra.py`, `test_dashboard_signals.py`, `asyncio`, `main.py`, `asyncio`, `test_email_finder.py`, `test_codex_platform.py`, `test_whatsapp_metrics.py`, `test_collectors_profile.py`, `test_discover.py`, `night.py`, `BrainConfig`, `Analyst`, `test_state.py`, `test_email_wiring.py`, `test_brain_provider.py`, `.set_signal_status`, `_Quota`, `CodexQuotaClient`, `test_brain_no_tools.py`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Are the 45 inferred relationships involving `StateManager` (e.g. with `Analyst` and `Handler`) actually correct?**
  _`StateManager` has 45 INFERRED edges - model-reasoned connections that need verification._
- **What connects `uvx`, `harvey` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `StateManager` be split into smaller, more focused modules?**
  _Cohesion score 0.03519599666388657 - nodes in this community are weakly interconnected._
- **Why does `Brain` connect `Brain` to `StateManager`, `test_cli_status_check_reports_readiness`, `test_codex_e2e.py`, `test_watcher_over_budget_still_sends_written_replies_but_reads_nothing`, `Scout`, `cli.py`, `InstantlyClient`, `handler.py`, `Trainer`, `setup.py`, `json`, `asyncio`, `test_whatsapp.py`, `CodexClient`, `pytest`, `state.py`, `test_codex_cli_surface.py`, `Campaign`, `WhatsAppAgent`, `WhatsAppClient`, `Handler`, `main.py`, `asyncio`, `test_codex_platform.py`, `BrainConfig`, `test_brain_provider.py`, `.paused_reason`, `CodexQuotaClient`, `_capture_exec`, `soak`, `test_brain_no_tools.py`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Are the 31 inferred relationships involving `Prospect` (e.g. with `Handler` and `Scout`) actually correct?**
  _`Prospect` has 31 INFERRED edges - model-reasoned connections that need verification._
- **Should `react-dom.js` be split into smaller, more focused modules?**
  _Cohesion score 0.03871239217336419 - nodes in this community are weakly interconnected._
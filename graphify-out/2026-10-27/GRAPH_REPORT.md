# Graph Report - harvey  (2026-10-24)

## Corpus Check
- 257 files · ~214,851 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 26 file(s) not represented in the graph (top: .css 10, .woff2 9, (none) 4)

## Summary
- 3798 nodes · 9174 edges · 204 communities (123 shown, 81 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 1225 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `22f546b2`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- StateManager
- react-dom.js
- MicrosoftProvider
- test_codex_e2e.py
- test_outbox_native.py
- Scout
- app.js
- components.js
- ref_react
- cli.py
- InstantlyClient
- InboundMessage
- agents/whatsapp.py
- Prospect
- Company
- Trainer
- discover.py
- make_handler
- setup.py
- json
- config.py
- asyncio
- ia
- test_whatsapp.py
- CodexClient
- ri
- dashboard.py
- pytest
- test_codex_soak.py
- test_codex_cli_surface.py
- test_codex.py
- Writer
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
- test_collectors_profile.py
- index.d.ts
- email_finder.py
- test_brain_provider.py
- find_email
- ConfigFileNotFoundError
- DiscoveryProvider
- test_email_finder.py
- test_codex_platform.py
- Icon
- steps
- test_whatsapp_metrics.py
- whatsapp
- CodexError
- test_microsoft.py
- test_discover.py
- Cold Email Copywriting
- xa
- derive_pattern
- package.json
- test_whatsapp_followup_priority.py
- Badge.jsx
- Analyst
- _client
- FakeWa
- .add_prospect
- Harvey
- DIY Prospecting Tactics
- microsoft.py
- design-system/package.json
- CloudflareCrawler
- Sales Methodology
- email
- .set_signal_status
- Offer Strategy & Closing Mechanics
- config.py
- handler
- ios-frame.js
- LinkedIn Outreach Skills
- Objection Handling Skills
- ni
- get_mail_provider
- product
- GmailProvider
- Como a Vitrine funciona na prática (fatos confirmados no código do produto)
- _MockModel
- ios-frame.jsx
- harvey.yaml
- _new_id
- _check_harvey_pid
- icp
- CalendarClient
- offer
- Account Navigation: Working Multiple Contacts at One Company
- Changelog
- QuotaClient
- FakeBrain
- Shell.jsx
- Lead Qualification Skills
- get_usage
- persona
- test_brain_no_tools.py
- FakeDiscovery
- design-system/README.md
- EnvConfig
- Signal-Based Outreach Playbook
- Harvey — Autonomous AI Sales Agent
- Design system do Harvey
- discovery
- pipeline.py
- offline
- MetricCard.jsx
- precleared
- EmailResult
- _hunter_domain_pattern
- Graph
- [0.2.0] — 2026-09-13
- Setup Flow
- test_watcher_over_budget_still_sends_written_replies_but_reads_nothing
- Menu.d.ts
- ProspectBoost Design System
- HomeScreen.jsx
- TasksScreen.jsx
- How Harvey Works (Technical Reference)
- Skills
- transcribe.py
- time
- The prospecting pipeline
- Quick start
- Select.d.ts
- Tabs.d.ts
- AgentScreen.jsx
- App.jsx
- code-review-graph
- Integração visual
- entrypoint.sh
- test_an_unmappable_term_is_reported_not_silently_skipped
- dashboard/README.md
- harvey
- GEMINI.md

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
- `Architecture` --references--> `DiscoveryProvider`  [INFERRED]
  CLAUDE.md → harvey/collectors/discover.py
- `For developers` --references--> `MailProvider`  [INFERRED]
  docs/microsoft365.md → harvey/integrations/mail_provider.py
- `For developers` --references--> `GraphError`  [INFERRED]
  docs/microsoft365.md → harvey/integrations/microsoft.py
- `For developers` --references--> `MicrosoftProvider`  [INFERRED]
  docs/microsoft365.md → harvey/integrations/microsoft.py
- `Quick health check (do this silently):` --references--> `harvey()`  [INFERRED]
  CLAUDE.md → tests/test_codex_e2e.py

## Import Cycles
- None detected.

## Communities (204 total, 81 thin omitted)

### Community 0 - "StateManager"
Cohesion: 0.04
Nodes (14): cmd_outbox(), _outbox(), _run(), cmd_status(), _status(), _usage(), StateManager, _utcnow() (+6 more)

### Community 1 - "react-dom.js"
Cohesion: 0.04
Nodes (77): $a(), Ab(), bc(), Bd(), be(), bh(), Ce(), ch() (+69 more)

### Community 2 - "MicrosoftProvider"
Cohesion: 0.12
Nodes (13): _test(), _checked_next_link(), GraphError, _load_token(), MicrosoftProvider, obj(), text(), Env (+5 more)

### Community 3 - "test_codex_e2e.py"
Cohesion: 0.06
Nodes (37): _approved_item(), _DownBrain, Harness, _load_pre_codex_db(), _none(), _open_thread(), _reply(), test_a_message_that_fails_to_process_holds_that_cycles_sends() (+29 more)

### Community 4 - "test_outbox_native.py"
Cohesion: 0.05
Nodes (56): PreclearedConfig, GateResult, pre_send_check(), Clearance, _from_cache(), PreclearedClient, _reason(), _text() (+48 more)

### Community 6 - "app.js"
Cohesion: 0.08
Nodes (82): api(), applyTheme(), badge(), brainCallChips(), _campaigns, _cohort, _companies, cycleTheme() (+74 more)

### Community 7 - "components.js"
Cohesion: 0.08
Nodes (61): AgentPanel(), AgentScreen(), App(), NewAgentDialog(), ArtifactsScreen(), PlaceholderScreen(), ActionRow(), ActivityCard() (+53 more)

### Community 8 - "ref_react"
Cohesion: 0.03
Nodes (37): AvatarProps, BadgeProps, BadgeTone, ButtonProps, CardProps, EyebrowProps, IconProps, IconButtonProps (+29 more)

### Community 9 - "cli.py"
Cohesion: 0.07
Nodes (21): _check_python_version(), cmd_dashboard(), cmd_export(), cmd_gmail(), cmd_install(), cmd_microsoft(), cmd_profile(), cmd_run() (+13 more)

### Community 11 - "InboundMessage"
Cohesion: 0.09
Nodes (6): InboundMessage, looks_like_bounce(), MailProvider, SendResult, SmtpImapProvider, test_bounce_detection()

### Community 12 - "agents/whatsapp.py"
Cohesion: 0.14
Nodes (5): _plain(), _skeleton(), whatsapp_persona_name(), pre_send_check_whatsapp(), test_whatsapp_gate()

### Community 13 - "Prospect"
Cohesion: 0.07
Nodes (22): EmailStep, _utcnow(), _utcnow(), Prospect, _utcnow(), test_campaign_requires_id_field(), test_company_all_fields_default_empty(), test_conversation_default_stage_is_first_pipeline_stage() (+14 more)

### Community 14 - "Company"
Cohesion: 0.10
Nodes (21): Company, test_company_defaults(), chain(), test_a_cohort_reflects_the_newest_observation(), test_a_dry_run_neither_discovers_nor_profiles(), test_a_failing_profile_stage_does_not_lose_the_discovery(), test_a_false_boolean_is_recorded_but_not_in_the_cohort(), test_a_new_company_needs_profiling() (+13 more)

### Community 15 - "Trainer"
Cohesion: 0.11
Nodes (4): main(), _normalize_start_url(), run_training(), Trainer

### Community 16 - "discover.py"
Cohesion: 0.07
Nodes (18): cmd_discover(), _discover(), build_queries(), Business, DiscoveryQuery, DiscoveryReport, estimate_cost(), geocode_city() (+10 more)

### Community 17 - "make_handler"
Cohesion: 0.15
Nodes (31): WaInbound, contacted_prospect(), conversation(), test_accepted_demo_has_a_handoff_even_without_designer_in_the_reply(), test_classifier_receives_the_correct_channel_history_and_opener(), test_courtesy_after_referral_keeps_the_opportunity_without_another_pitch(), test_courtesy_does_not_hide_a_refusal(), test_forwarding_to_the_owner_is_a_referral_not_a_loss_or_meeting() (+23 more)

### Community 18 - "setup.py"
Cohesion: 0.08
Nodes (13): _ask(), _ask_brain_config(), _ask_yes_no(), _check_claude_cli(), _check_codex_cli(), main(), _print_harvey(), _print_step() (+5 more)

### Community 19 - "json"
Cohesion: 0.06
Nodes (15): parse_brain_status(), get_oauth_token(), _keychain_services(), _parse_window(), _token_from_json_blob(), claude_config_dir(), answer_for(), effective_config() (+7 more)

### Community 20 - "config.py"
Cohesion: 0.11
Nodes (6): QuietHoursConfig, UsageConfig, WhatsAppChannelConfig, test_quiet_hours_defaults(), test_notify_group_must_be_a_group_jid(), test_whatsapp_config_validation()

### Community 21 - "asyncio"
Cohesion: 0.09
Nodes (34): make_agent(), _now_iso(), seed_company(), staged_agent(), test_a_cold_message_waits_for_its_turn_but_a_reply_does_not(), test_a_reply_frees_a_slot_under_the_unanswered_cap(), test_a_session_that_needs_a_qr_code_is_not_restarted(), test_a_stopped_session_is_started_again_and_sending_resumes() (+26 more)

### Community 22 - "ia"
Cohesion: 0.12
Nodes (28): ah(), fb(), $g(), gf(), gi(), hi(), ia(), ic() (+20 more)

### Community 23 - "test_whatsapp.py"
Cohesion: 0.06
Nodes (32): is_auto_message(), wants_opt_out_pt(), contact_first_name(), _fold(), is_mobile(), parse_contact_cards(), _parse_ts(), _at() (+24 more)

### Community 24 - "CodexClient"
Cohesion: 0.07
Nodes (9): _classify_turn_error(), CodexClient, _load_native_auth(), native_codex_home(), normalize_usage(), require_supported_platform(), _Turn, test_codex_missing_is_setup_error() (+1 more)

### Community 25 - "ri"
Cohesion: 0.16
Nodes (44): aa(), ac(), Bf(), dh(), b(), c(), d(), e() (+36 more)

### Community 26 - "dashboard.py"
Cohesion: 0.09
Nodes (19): dashboard(), export_prospects(), get_activity(), get_campaigns(), get_companies(), get_company_contacts(), get_conversations(), get_discovery_providers() (+11 more)

### Community 27 - "pytest"
Cohesion: 0.17
Nodes (19): ConfigError, HarveyConfig, load_config(), test_config_missing_required_persona_field(), test_config_wrong_type_raises(), test_email_channel_rejects_negative_sends(), test_load_config_empty_file_raises(), test_load_config_from_yaml_file() (+11 more)

### Community 28 - "test_codex_soak.py"
Cohesion: 0.16
Nodes (9): _alive(), _native_identity(), soak(), brain(), client(), entries(), pids(), test_soak_cancellation_storm() (+1 more)

### Community 29 - "test_codex_cli_surface.py"
Cohesion: 0.09
Nodes (17): find_codex(), attacker(), _bundled_catalog(), _fake_native_login(), _hostile_routes(), _jwt(), mock_codex(), _model_visible_tools() (+9 more)

### Community 30 - "test_codex.py"
Cohesion: 0.05
Nodes (64): attest_effective_config(), check_native_auth(), _find_custom_endpoint(), _alive(), _client(), renew(), fake(), entries() (+56 more)

### Community 33 - "Brain"
Cohesion: 0.09
Nodes (4): Brain, CodexQuotaClient, test_parse_result_payload_json(), test_parse_result_payload_plain_text_fallback()

### Community 34 - "WhatsAppClient"
Cohesion: 0.11
Nodes (4): get_whatsapp_client(), phone_from_jid(), to_jid(), WhatsAppClient

### Community 35 - "codex.py"
Cohesion: 0.07
Nodes (31): attest_hooks(), attest_mcp_status(), attest_thread(), bucket_applies(), build_access_snapshot(), build_thread_config(), build_thread_params(), describe_catalog() (+23 more)

### Community 36 - "test_signals_export.py"
Cohesion: 0.14
Nodes (12): collect_prospects(), to_csv(), detect_tech(), _get_compiled(), _seed_prospects(), test_collect_prospects_default_deliverable_only(), test_collect_prospects_filters(), test_detect_tech_matches_known_fingerprints() (+4 more)

### Community 37 - ".init_db"
Cohesion: 0.07
Nodes (18): _export(), _profile(), _stats(), state(), client(), _codex_platform(), state(), state() (+10 more)

### Community 38 - "Conversation"
Cohesion: 0.11
Nodes (22): Conversation, Message, _utcnow(), test_conversation_empty_thread_round_trip(), test_thread_from_malformed_json_returns_empty(), test_thread_json_preserves_timestamps(), test_conversation_thread_json_round_trip(), test_conversation_add_and_fetch() (+14 more)

### Community 39 - "xk"
Cohesion: 0.11
Nodes (30): bj(), Bk(), cf(), $d(), Db(), Dc(), di(), fi() (+22 more)

### Community 40 - "Handler"
Cohesion: 0.08
Nodes (3): Handler, requested_next_step(), BrainUnavailable

### Community 41 - "react.js"
Cohesion: 0.14
Nodes (16): B(), C(), D(), E(), fa(), M(), N(), O() (+8 more)

### Community 42 - "harvey"
Cohesion: 0.07
Nodes (27): DISABLE_TELEMETRY, GMAPS_SCRAPER_URL, command, environment, image, ports, restart, volumes (+19 more)

### Community 43 - "_state"
Cohesion: 0.11
Nodes (17): add_feedback(), _discovery_queries(), estimate_discovery(), outbox_approve(), outbox_approve_all(), outbox_reject(), preview_cohort(), save_env_settings() (+9 more)

### Community 44 - "test_state_extra.py"
Cohesion: 0.10
Nodes (28): Campaign, test_campaign_empty_sequence_round_trip(), test_campaign_sequence_from_json_bad_step_shape_raises(), test_campaign_sequence_from_malformed_json_returns_empty(), test_campaign_sequence_json_unicode_round_trip(), test_campaign_sequence_json_round_trip(), test_add_company_generates_id_when_missing(), test_add_company_same_id_is_ignored() (+20 more)

### Community 45 - "test_dashboard_signals.py"
Cohesion: 0.06
Nodes (10): client(), _seed_observations(), test_cohort_is_a_set_intersection(), test_cohort_with_no_requirements_is_empty_not_everything(), test_confirming_before_the_catalog_loads_still_works(), test_cost_notes_are_machine_classifiable(), test_dashboard_text_is_utf8_with_windows_default_encoding(), test_reseeding_never_overrides_a_users_decision() (+2 more)

### Community 46 - "steps"
Cohesion: 0.07
Nodes (26): HARVEY_CODEX_CLI_TESTS, HARVEY_PACKAGE_TESTS, jobs, test, os, python, name, permissions (+18 more)

### Community 48 - "m"
Cohesion: 0.11
Nodes (27): Ag(), B(), Bg(), Cc(), cd(), Cg(), df(), Gk() (+19 more)

### Community 49 - "asyncio"
Cohesion: 0.16
Nodes (16): biz(), FakeProvider, register(), test_a_failed_query_does_not_lose_the_successful_ones(), fetch(), test_budget_cap_refuses_before_spending(), test_budget_stops_mid_run_when_actual_exceeds_estimate(), test_dry_run_estimates_without_calling_anything() (+8 more)

### Community 50 - "index.js"
Cohesion: 0.21
Nodes (12): Button(), IconButton(), ActivityCard(), ArtifactCard(), KIND, ProgressCard(), SegmentBar(), Dialog() (+4 more)

### Community 51 - "main.py"
Cohesion: 0.07
Nodes (17): ConfigFileNotFoundError, _find_config_file(), decide_next_action(), heartbeat(), in_quiet_hours(), _interruptible_sleep(), main(), _needs_setup() (+9 more)

### Community 52 - "test_collectors_profile.py"
Cohesion: 0.07
Nodes (17): ProfileCollector, add(), _strip_code(), _text(), title_looks_like_role(), collector(), test_agency_descriptive_anchor_scores_lower_but_records(), test_agency_detected_from_strong_credit() (+9 more)

### Community 54 - "email_finder.py"
Cohesion: 0.15
Nodes (10): detect_catch_all(), _hunter_api_key(), hunter_domain_people(), _hunter_usage_key(), record_hunter_search(), _verify_candidate(), verify_email_smtp(), verify_hunter() (+2 more)

### Community 55 - "test_brain_provider.py"
Cohesion: 0.05
Nodes (52): CodexResult, BrainConfig, load_brain_config(), _answering(), _capture_exec(), fake_exec(), _codex_brain(), _FakeProcess (+44 more)

### Community 56 - "find_email"
Cohesion: 0.13
Nodes (11): _clean_domain(), find_email(), get_mx_host(), Env, test_find_email_catch_all_is_risky(), test_find_email_inconclusive_is_guess_not_verified(), test_find_email_invalid_from_provider(), test_find_email_verified_via_reoon() (+3 more)

### Community 57 - "ConfigFileNotFoundError"
Cohesion: 0.15
Nodes (6): _current_provider(), get_settings(), get_setup_status(), _read_env_file(), _resolve_config_file(), _write_env_file()

### Community 58 - "DiscoveryProvider"
Cohesion: 0.10
Nodes (7): DataForSEOListings, DataForSEOSerp, _dfs_items(), DiscoveryProvider, normalize_domain(), Serper, test_dataforseo_sandbox_is_never_the_live_host()

### Community 59 - "test_email_finder.py"
Cohesion: 0.14
Nodes (11): build_email(), classify_mx(), _clean_name_part(), generate_patterns(), infer_pattern_from_email(), _status_from_verdict(), test_build_email_patterns(), test_classify_mx() (+3 more)

### Community 60 - "test_codex_platform.py"
Cohesion: 0.14
Nodes (9): on_windows(), test_claude_is_unaffected_on_windows(), test_long_non_ascii_prompt_reaches_codex_intact(), test_paths_with_spaces_and_non_ascii(), test_private_runtime_and_login_copy_modes(), test_real_executable_in_a_path_with_spaces(), test_windows_codex_is_refused_before_login_or_runtime(), test_windows_quota_and_brain_pause_cleanly() (+1 more)

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

### Community 65 - "CodexError"
Cohesion: 0.06
Nodes (18): _AppServer, build_child_env(), build_private_config_toml(), check_cli_version(), CodexError, _kill_tree(), parse_cli_version(), _remaining() (+10 more)

### Community 67 - "test_microsoft.py"
Cohesion: 0.20
Nodes (25): _handler_with_prospect(), message(), provider(), test_a_bad_later_page_fails_the_whole_read(), test_bad_later_page_holds_sends_and_handles_nothing(), test_empty_202_and_204_are_success(), test_empty_inbox_is_an_empty_list(), test_every_page_of_the_week_is_read() (+17 more)

### Community 68 - "test_discover.py"
Cohesion: 0.13
Nodes (4): test_configured_coordinates_win_over_geocoding(), test_directories_and_institutions_are_junk(), test_real_businesses_survive_the_filter(), test_the_default_provider_needs_no_account()

### Community 69 - "Cold Email Copywriting"
Cohesion: 0.06
Nodes (30): Adjustments by prospect, Bad personalization, Bad subjects, Banned Formatting, Banned Patterns, Campaign Variety, Cold Email Copywriting, Compliance & Deliverability (Overrides Everything Below) (+22 more)

### Community 70 - "xa"
Cohesion: 0.10
Nodes (25): ai(), bi(), ci(), Dg(), ef(), Eh(), hb(), kb() (+17 more)

### Community 71 - "derive_pattern"
Cohesion: 0.18
Nodes (10): derive_pattern(), _hunter_monthly_cap(), hunter_searches_remaining(), test_derive_pattern_default_no_signal(), test_derive_pattern_from_known_email(), test_derive_pattern_spends_and_respects_hunter_budget(), test_derive_pattern_uses_cache(), test_find_email_no_mx_is_invalid() (+2 more)

### Community 72 - "package.json"
Cohesion: 0.05
Nodes (39): adherence, restrictedImports, syntax, variants, devDependencies, esbuild@0.25.12, eslint@9.39.1, react@18.3.1 (+31 more)

### Community 73 - "test_whatsapp_followup_priority.py"
Cohesion: 0.25
Nodes (11): pending_followup(), test_cold_daily_cap_does_not_hold_an_approved_followup(), test_due_followup_precedes_more_than_sixty_older_cold_messages(), test_fast_watcher_leaves_followups_for_the_heartbeat(), test_followup_rechecks_customer_and_conversation_before_sending(), followups(), quiet_conversation(), test_after_the_last_followup_the_owner_is_told() (+3 more)

### Community 74 - "Badge.jsx"
Cohesion: 0.24
Nodes (9): Badge(), Count(), STATUS_COLORS, StatusDot(), KanbanColumn(), TaskCardProps, TaskTag, TaskCard() (+1 more)

### Community 76 - "_client"
Cohesion: 0.13
Nodes (11): OpenStreetMap, _client(), test_dataforseo_errors_surface_the_message_not_just_the_code(), test_dataforseo_serp_adapter_reads_rank_group_not_position(), test_osm_maps_the_trades_it_does_know(), test_osm_refuses_a_term_it_cannot_map_instead_of_guessing(), test_overpass_falls_over_to_the_next_mirror(), test_overpass_needs_a_coordinate_and_says_so() (+3 more)

### Community 77 - "FakeWa"
Cohesion: 0.14
Nodes (3): WaSendResult, fail(), FakeWa

### Community 78 - ".add_prospect"
Cohesion: 0.08
Nodes (21): _norm(), _Cfg, channels, email, test_migration_downgrades_legacy_verified(), test_prospect_email_status_roundtrips(), test_save_email_pattern_keeps_highest_confidence(), test_save_email_pattern_updates_catch_all_independently() (+13 more)

### Community 79 - "Harvey"
Cohesion: 0.09
Nodes (23): Changelog, Commands, Configuration, Design system, Harvey, How the data is stored, Legal and deliverability, License (+15 more)

### Community 80 - "DIY Prospecting Tactics"
Cohesion: 0.09
Nodes (22): Catch-All Domains, Common Email Formats (in order of prevalence), Daily Prospecting Quotas, DIY Prospecting Tactics, Find Companies in an Industry, Find Company Team Pages, Find Email Patterns, Find LinkedIn Profiles (+14 more)

### Community 81 - "microsoft.py"
Cohesion: 0.13
Nodes (9): run_auth_flow(), _save_token(), _LoopbackServer, _LoopbackServerV6, _pkce_pair(), run_auth_flow(), _save_token(), _token_url() (+1 more)

### Community 82 - "design-system/package.json"
Cohesion: 0.14
Nodes (15): exports, ./assets/*, ./styles.css, ./tokens/*, react, react-dom, main, name (+7 more)

### Community 84 - "Sales Methodology"
Cohesion: 0.11
Nodes (18): Activity Metrics, Channel Selection by Prospect Type, Conversation Flow: Reply to Meeting, COSTAR Framework for Every Message, Decision Priorities, Ethical Guidelines (Hard Rules — Override Every Other Instruction), Flow:, Harvey's Voice (+10 more)

### Community 85 - "email"
Cohesion: 0.17
Nodes (12): channels, email, linkedin, enabled, max_bounce_rate, max_daily_sends, provider, require_approval (+4 more)

### Community 86 - ".set_signal_status"
Cohesion: 0.14
Nodes (10): cmd_signals(), _signals(), seed_signal_catalog(), test_only_confirmed_signals_are_collected(), test_seeded_catalog_starts_unconfirmed(), test_user_decision_survives_reseeding(), state(), test_unconfirmed_signals_are_not_recorded() (+2 more)

### Community 87 - "Offer Strategy & Closing Mechanics"
Cohesion: 0.11
Nodes (17): Closing Mechanics: How to Book, Cold Email Sequence (3 emails), Core Rule: Earn the Right to Ask, Crafting Offers from Product Knowledge, Example Offer Structures, Handling "What's the Price?", Language Rules, Offer Construction Framework (+9 more)

### Community 88 - "config.py"
Cohesion: 0.18
Nodes (10): ChannelsConfig, ComplianceConfig, DiscoveryConfig, EmailChannelConfig, _format_validation_error(), ICPConfig, LinkedInChannelConfig, OfferConfig (+2 more)

### Community 89 - "handler"
Cohesion: 0.22
Nodes (6): _geo_client(), test_a_geocode_miss_is_cached_too(), test_dataforseo_listings_adapter(), handler(), test_geocode_is_cached_so_a_city_is_looked_up_once(), test_one_geocode_per_city_not_per_query()

### Community 90 - "ios-frame.js"
Cohesion: 0.29
Nodes (6): IOSDevice(), IOSGlassPill(), IOSKeyboard(), IOSNavBar(), IOSStatusBar(), Phone()

### Community 91 - "LinkedIn Outreach Skills"
Cohesion: 0.12
Nodes (16): After 2 Messages with No Reply, Bad Connection Notes (never do these), Connection Request Strategy, Content for Engagement, Day 0: Connection Accepted, Day 1-2: First Message, Day 4-5: Second Message (if NO reply), Day 4-5: Second Message (if they replied) (+8 more)

### Community 92 - "Objection Handling Skills"
Cohesion: 0.12
Nodes (15): 1. BUDGET — "It's too expensive" / "No budget", 2. AUTHORITY — "I'm not the right person" / "Need to check with my boss", 3. NEED — "We already have a solution" / "Not a priority right now", 4. TIMING — "Not right now" / "Maybe next quarter", Advanced Techniques, Core Framework: LAARC, Diagnose Before You Respond, Hard Ethical Guardrails (Non-Negotiable) (+7 more)

### Community 93 - "ni"
Cohesion: 0.18
Nodes (15): af(), Eg(), hc(), Kk(), Li(), Lk(), Nd(), ni() (+7 more)

### Community 94 - "get_mail_provider"
Cohesion: 0.13
Nodes (12): 1. Register an app in Entra ID, 2. Configure Harvey, 3. Sign in once, Deliverability notes, For developers, How it behaves, If you see "Need admin approval", Sending from a Microsoft 365 mailbox (+4 more)

### Community 95 - "product"
Cohesion: 0.22
Nodes (9): already have a solution, not interested, too expensive, product, description, key_benefits, name, objection_responses (+1 more)

### Community 96 - "GmailProvider"
Cohesion: 0.22
Nodes (3): _test(), GmailProvider, _load_token()

### Community 97 - "Como a Vitrine funciona na prática (fatos confirmados no código do produto)"
Cohesion: 0.14
Nodes (13): As artes do plano Pro (resposta definitiva), Cadastro dos produtos: quem faz, e quando, Como a Vitrine funciona na prática (fatos confirmados no código do produto), Como responder as dúvidas mais comuns, Descubra o que o cliente quer e adapte a conversa, Domínio e endereço, Fatos do produto e fatos da loja, O plano Pro: venda com tato, não com script (+5 more)

### Community 99 - "ios-frame.jsx"
Cohesion: 0.39
Nodes (5): IOSDevice(), IOSGlassPill(), IOSKeyboard(), IOSNavBar(), IOSStatusBar()

### Community 100 - "harvey.yaml"
Cohesion: 0.25
Nodes (7): end, start, timezone, heartbeat_interval_minutes, max_daily_claude_percent, quiet_hours, usage

### Community 101 - "_new_id"
Cohesion: 0.18
Nodes (5): _new_id(), test_record_usage_event_and_totals(), test_request_key_dedup(), test_usage_by_agent_groups_and_counts_sessions(), test_usage_is_harvey_only()

### Community 102 - "_check_harvey_pid"
Cohesion: 0.25
Nodes (4): _check_harvey_pid(), get_harvey_status(), start_harvey(), stop_harvey()

### Community 103 - "icp"
Cohesion: 0.25
Nodes (8): icp, company_size, exclude_industries, geography, hiring_signals, include_keywords, industries, titles

### Community 105 - "offer"
Cohesion: 0.25
Nodes (8): booking_method, booking_url, entry, goal, meeting_duration, meeting_owner, primary, offer

### Community 106 - "Account Navigation: Working Multiple Contacts at One Company"
Cohesion: 0.15
Nodes (12): Account Navigation: Working Multiple Contacts at One Company, Companies vs Contacts, Company Profiles, Contact Profiles, Data Quality Rules, Multi-Threading: Working Multiple Contacts, Sample Flow, Sample Verification (+4 more)

### Community 107 - "Changelog"
Cohesion: 0.17
Nodes (12): [0.1.0], [0.2.1] — 2026-10-13, [0.3.0] — 2026-10-13, Added, Added, Added, Changed, Changelog (+4 more)

### Community 109 - "FakeBrain"
Cohesion: 0.21
Nodes (3): ContextBrain, FakeBrain, ReplyBrain

### Community 111 - "Lead Qualification Skills"
Cohesion: 0.17
Nodes (11): Authority, BANT Framework (Initial Qualification), Budget, Disqualification Signals, Enrichment Priorities, ICP Scoring System, Lead Qualification Skills, MEDDIC (For Complex Deals — Future Use) (+3 more)

### Community 112 - "get_usage"
Cohesion: 0.17
Nodes (6): active_brain_status(), _active_brain(), _active_provider(), _brain_status(), get_usage(), _quota_client_for()

### Community 113 - "persona"
Cohesion: 0.29
Nodes (7): persona, company, email, linkedin, name, role, tone

### Community 114 - "test_brain_no_tools.py"
Cohesion: 0.32
Nodes (3): _FakeProcess, test_brain_runs_claude_with_no_tools(), fake_exec()

### Community 116 - "design-system/README.md"
Cohesion: 0.27
Nodes (4): Comparações e escolhas, Relatório de triagem e integração, Resultado, Validação

### Community 117 - "EnvConfig"
Cohesion: 0.20
Nodes (5): EnvConfig, test_env_config_rejects_non_string(), test_config_from_dict(), test_env_config_defaults(), test_offer_config_defaults()

### Community 118 - "Signal-Based Outreach Playbook"
Cohesion: 0.18
Nodes (10): Following up on a signal, Funding signal (recent raise), Hiring signal (they're hiring for a relevant role), New-domain / new-business signal, Signal → angle map, Signal-Based Outreach Playbook, Tech-stack signal (a tool detected on their site), The core rule (+2 more)

### Community 119 - "Harvey — Autonomous AI Sales Agent"
Cohesion: 0.20
Nodes (10): After Setup — Ongoing Help, Design system development, Explaining Harvey to Users, graphify, Harvey — Autonomous AI Sales Agent, Key Tools, MCP Tools: code-review-graph, Verify in the source (+2 more)

### Community 120 - "Design system do Harvey"
Cohesion: 0.20
Nodes (9): Quick health check (do this silently):, Then introduce yourself based on what you find:, When Someone First Opens This Project, Abrir as referências, Build, lint e validação, Design system do Harvey, Proveniência, Usar e manter (+1 more)

### Community 121 - "discovery"
Cohesion: 0.33
Nodes (6): discovery, cities, night_shift, provider, queue_target, results_per_search

### Community 124 - "MetricCard.jsx"
Cohesion: 0.50
Nodes (4): MetricCard(), MiniChart(), TEXT, TONES

### Community 125 - "precleared"
Cohesion: 0.40
Nodes (5): compliance, precleared, address_source, enabled, sender_country

### Community 127 - "_hunter_domain_pattern"
Cohesion: 0.40
Nodes (3): _hunter_domain_pattern(), _translate_hunter_pattern(), test_translate_hunter_pattern()

### Community 128 - "Graph"
Cohesion: 0.25
Nodes (5): graph(), Graph, bad_draft(), not_json(), self_link()

### Community 129 - "[0.2.0] — 2026-09-13"
Cohesion: 0.29
Nodes (8): [0.2.0] — 2026-09-13, Added, Changed, Fixed, Security, K(), R(), Nothing sends without you

### Community 130 - "Setup Flow"
Cohesion: 0.25
Nodes (8): Setup Flow, Step 1: Install Dependencies, Step 2: API Keys (`.env`), Step 3: Product Training, Step 4: Confirm Signals, Step 5: Find Businesses, Step 6: Behavior Settings, Step 7: Start Harvey

### Community 132 - "Menu.d.ts"
Cohesion: 0.50
Nodes (3): MenuItem, MenuProps, MenuTriggerProps

### Community 133 - "ProspectBoost Design System"
Cohesion: 0.25
Nodes (8): Components, CONTENT FUNDAMENTALS, Font substitutions (flagged), ICONOGRAPHY, Index, ProspectBoost Design System, Sources, VISUAL FOUNDATIONS

### Community 134 - "HomeScreen.jsx"
Cohesion: 0.83
Nodes (3): AgentPerfRow(), greeting(), HomeScreen()

### Community 135 - "TasksScreen.jsx"
Cohesion: 0.83
Nodes (3): NewTask(), TaskDetail(), TasksScreen()

### Community 136 - "How Harvey Works (Technical Reference)"
Cohesion: 0.29
Nodes (7): Architecture, Common Issues, Conversation Stages, How Harvey Works (Technical Reference), Key Commands, Priority Order, Sub-Agents

### Community 137 - "Skills"
Cohesion: 0.29
Nodes (6): Adding or Editing Skills, Auto-Generated Skills, Built-in Skills, How Skills Work, Skill → Agent Mapping, Skills

### Community 139 - "transcribe.py"
Cohesion: 0.47
Nodes (3): _load(), _run(), transcribe()

### Community 141 - "The prospecting pipeline"
Cohesion: 0.40
Nodes (5): 1. DISCOVER — who exists, 2. PROFILE — what they are, 3. ENRICH — who decides, 4. VERIFY — can you reach them, The prospecting pipeline

### Community 142 - "Quick start"
Cohesion: 0.50
Nodes (4): Easiest: let Claude set it up, Or do it yourself, Prerequisites, Quick start

## Knowledge Gaps
- **2 isolated node(s):** `uvx`, `harvey`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1452 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **81 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StateManager` connect `StateManager` to `test_codex_e2e.py`, `test_outbox_native.py`, `Scout`, `cli.py`, `InstantlyClient`, `.__init__`, `agents/whatsapp.py`, `Prospect`, `Company`, `Trainer`, `discover.py`, `make_handler`, `setup.py`, `json`, `asyncio`, `test_whatsapp.py`, `dashboard.py`, `pytest`, `test_codex_soak.py`, `test_codex_cli_surface.py`, `Writer`, `WhatsAppAgent`, `Brain`, `WhatsAppClient`, `test_signals_export.py`, `.init_db`, `Conversation`, `Handler`, `_state`, `test_state_extra.py`, `test_dashboard_signals.py`, `asyncio`, `main.py`, `test_collectors_profile.py`, `test_brain_provider.py`, `test_email_finder.py`, `test_codex_platform.py`, `test_whatsapp_metrics.py`, `test_microsoft.py`, `test_discover.py`, `Analyst`, `.add_prospect`, `.set_signal_status`, `get_mail_provider`, `_new_id`, `test_brain_no_tools.py`, `EnvConfig`?**
  _High betweenness centrality (0.263) - this node is a cross-community bridge._
- **Are the 45 inferred relationships involving `StateManager` (e.g. with `Analyst` and `Handler`) actually correct?**
  _`StateManager` has 45 INFERRED edges - model-reasoned connections that need verification._
- **What connects `uvx`, `harvey` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `StateManager` be split into smaller, more focused modules?**
  _Cohesion score 0.0390893470790378 - nodes in this community are weakly interconnected._
- **Why does `[0.2.0] — 2026-09-13` connect `[0.2.0] — 2026-09-13` to `Changelog`?**
  _High betweenness centrality (0.159) - this node is a cross-community bridge._
- **Are the 31 inferred relationships involving `Prospect` (e.g. with `Handler` and `Scout`) actually correct?**
  _`Prospect` has 31 INFERRED edges - model-reasoned connections that need verification._
- **Should `react-dom.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04053751399776036 - nodes in this community are weakly interconnected._
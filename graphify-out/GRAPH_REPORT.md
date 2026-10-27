# Graph Report - harvey  (2026-10-27)

## Corpus Check
- 258 files · ~218,815 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 26 file(s) not represented in the graph (top: .css 10, .woff2 9, (none) 4)

## Summary
- 3849 nodes · 9321 edges · 217 communities (120 shown, 97 thin omitted)
- Extraction: 87% EXTRACTED · 13% INFERRED · 0% AMBIGUOUS · INFERRED: 1189 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `4f2c50f4`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- StateManager
- react-dom.js
- test_microsoft.py
- test_codex_e2e.py
- test_outbox_native.py
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
- _client
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
- BrainConfig
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
- test_brain_provider.py
- ConfigFileNotFoundError
- DiscoveryProvider
- Rk
- test_codex_platform.py
- Icon
- steps
- test_whatsapp_metrics.py
- whatsapp
- CodexError
- ._fetch
- test_collectors_profile.py
- test_discover.py
- Cold Email Copywriting
- check_native_auth
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
- ._draft
- Sales Methodology
- email
- .set_signal_status
- Offer Strategy & Closing Mechanics
- config.py
- handler
- ios-frame.js
- LinkedIn Outreach Skills
- Objection Handling Skills
- _strip_code
- Sender
- product
- night_step
- Como a Vitrine funciona na prática (fatos confirmados no código do produto)
- fake_codex.py
- ios-frame.jsx
- harvey.yaml
- load_brain_config
- _check_harvey_pid
- icp
- CalendarClient
- offer
- Account Navigation: Working Multiple Contacts at One Company
- test_outreach_metrics.py
- QuotaClient
- FakeBrain
- Shell.jsx
- Lead Qualification Skills
- _Quota
- persona
- test_brain_no_tools.py
- FakeDiscovery
- soak
- Signal-Based Outreach Playbook
- Harvey — Autonomous AI Sales Agent
- Design system do Harvey
- discovery
- _render_js
- offline
- MetricCard.jsx
- precleared
- wk
- _parse_ts
- _seed_observations
- _answering
- Setup Flow
- _StubCodex
- Menu.d.ts
- ProspectBoost Design System
- HomeScreen.jsx
- TasksScreen.jsx
- DiscoveryProvider
- Skills
- Relatório de triagem e integração
- _FakeProcess
- The prospecting pipeline
- Quick start
- Select.d.ts
- Tabs.d.ts
- AgentScreen.jsx
- App.jsx
- code-review-graph
- Integração visual
- entrypoint.sh
- test_dashboard_text_is_utf8_with_windows_default_encoding
- dashboard/README.md
- harvey
- GEMINI.md
- The skills library
- _codex_platform
- test_cli_usage_reads_only_the_active_providers_quota
- get_whatsapp_client

## God Nodes (most connected - your core abstractions)
1. `StateManager` - 209 edges
2. `Prospect` - 87 edges
3. `Brain` - 80 edges
4. `Scout` - 57 edges
5. `Conversation` - 51 edges
6. `Company` - 50 edges
7. `make_handler()` - 49 edges
8. `m()` - 47 edges
9. `BrainConfig` - 46 edges
10. `Message` - 45 edges

## Surprising Connections (you probably didn't know these)
- `Quick health check (do this silently):` --references--> `harvey()`  [INFERRED]
  CLAUDE.md → tests/test_codex_e2e.py
- `Architecture` --references--> `DiscoveryProvider`  [INFERRED]
  CLAUDE.md → harvey/collectors/discover.py
- `Usar e manter` --references--> `harvey()`  [INFERRED]
  design-system/README.md → tests/test_codex_e2e.py
- `For developers` --references--> `MailProvider`  [INFERRED]
  docs/microsoft365.md → harvey/integrations/mail_provider.py
- `Added` --references--> `K()`  [INFERRED]
  CHANGELOG.md → design-system/references/runtime/react.js

## Import Cycles
- None detected.

## Communities (217 total, 97 thin omitted)

### Community 0 - "StateManager"
Cohesion: 0.04
Nodes (8): cmd_outbox(), _outbox(), cmd_sending(), _run(), StateManager, _utcnow(), seed(), test_feedback_crud()

### Community 1 - "react-dom.js"
Cohesion: 0.04
Nodes (69): $a(), Ab(), bc(), Bd(), be(), Ce(), dd(), de() (+61 more)

### Community 2 - "test_microsoft.py"
Cohesion: 0.05
Nodes (57): 1. Register an app in Entra ID, 2. Configure Harvey, 3. Sign in once, Deliverability notes, For developers, How it behaves, If you see "Need admin approval", Sending from a Microsoft 365 mailbox (+49 more)

### Community 3 - "test_codex_e2e.py"
Cohesion: 0.05
Nodes (39): Usar e manter, _approved_item(), _DownBrain, Harness, harvey(), _load_pre_codex_db(), _none(), _open_thread() (+31 more)

### Community 4 - "test_outbox_native.py"
Cohesion: 0.06
Nodes (54): PreclearedConfig, looks_like_bounce(), Clearance, _from_cache(), PreclearedClient, _reason(), _text(), _utcnow() (+46 more)

### Community 6 - "app.js"
Cohesion: 0.08
Nodes (83): api(), applyTheme(), badge(), brainCallChips(), _campaigns, _cohort, _companies, cycleTheme() (+75 more)

### Community 7 - "components.js"
Cohesion: 0.08
Nodes (61): AgentPanel(), AgentScreen(), App(), NewAgentDialog(), ArtifactsScreen(), PlaceholderScreen(), ActionRow(), ActivityCard() (+53 more)

### Community 8 - "ref_react"
Cohesion: 0.03
Nodes (37): AvatarProps, BadgeProps, BadgeTone, ButtonProps, CardProps, EyebrowProps, IconProps, IconButtonProps (+29 more)

### Community 9 - "cli.py"
Cohesion: 0.06
Nodes (27): _check_python_version(), cmd_dashboard(), cmd_discover(), _discover(), cmd_gmail(), cmd_install(), cmd_microsoft(), cmd_profile() (+19 more)

### Community 11 - "InboundMessage"
Cohesion: 0.06
Nodes (9): _test(), GmailProvider, _load_token(), run_auth_flow(), _save_token(), InboundMessage, MailProvider, SendResult (+1 more)

### Community 12 - "handler.py"
Cohesion: 0.08
Nodes (17): requested_next_step(), _plain(), _skeleton(), _run(), GateResult, pre_send_check(), pre_send_check_whatsapp(), contact_first_name() (+9 more)

### Community 13 - "Prospect"
Cohesion: 0.05
Nodes (41): _utcnow(), _utcnow(), Conversation, Message, _utcnow(), Prospect, _utcnow(), test_campaign_requires_id_field() (+33 more)

### Community 14 - "Company"
Cohesion: 0.09
Nodes (22): Company, chain(), config(), state(), test_a_cohort_reflects_the_newest_observation(), test_a_dry_run_neither_discovers_nor_profiles(), test_a_failing_profile_stage_does_not_lose_the_discovery(), test_a_false_boolean_is_recorded_but_not_in_the_cohort() (+14 more)

### Community 15 - "Trainer"
Cohesion: 0.07
Nodes (4): CloudflareCrawler, FallbackCrawler, run_training(), Trainer

### Community 16 - "discover.py"
Cohesion: 0.08
Nodes (12): Business, DiscoveryQuery, DiscoveryReport, estimate_cost(), geocode_city(), GoogleMapsScraper, is_junk(), _observations() (+4 more)

### Community 17 - "make_handler"
Cohesion: 0.14
Nodes (33): WaInbound, contacted_prospect(), conversation(), test_accepted_demo_has_a_handoff_even_without_designer_in_the_reply(), test_classifier_receives_the_correct_channel_history_and_opener(), test_courtesy_after_referral_keeps_the_opportunity_without_another_pitch(), test_courtesy_does_not_hide_a_refusal(), test_forwarding_to_the_owner_is_a_referral_not_a_loss_or_meeting() (+25 more)

### Community 18 - "setup.py"
Cohesion: 0.08
Nodes (15): check_cli_version(), require_supported_platform(), _ask(), _ask_brain_config(), _ask_yes_no(), _check_claude_cli(), _check_codex_cli(), main() (+7 more)

### Community 19 - "json"
Cohesion: 0.07
Nodes (13): active_brain_status(), parse_brain_status(), _text(), get_oauth_token(), _keychain_services(), _parse_window(), _token_from_json_blob(), main() (+5 more)

### Community 20 - "config.py"
Cohesion: 0.13
Nodes (4): UsageConfig, WhatsAppChannelConfig, test_notify_group_must_be_a_group_jid(), test_whatsapp_config_validation()

### Community 21 - "asyncio"
Cohesion: 0.08
Nodes (49): wants_opt_out_pt(), followups(), make_agent(), quiet_conversation(), seed_company(), staged_agent(), test_a_cold_message_waits_for_its_turn_but_a_reply_does_not(), test_a_reply_frees_a_slot_under_the_unanswered_cap() (+41 more)

### Community 22 - "ni"
Cohesion: 0.10
Nodes (42): aa(), af(), ai(), bi(), ci(), ef(), Eg(), Eh() (+34 more)

### Community 23 - "_client"
Cohesion: 0.10
Nodes (17): client(), _client(), _env(), scraper_transport(), test_client_connection_states(), make(), handler(), test_client_exists() (+9 more)

### Community 24 - "CodexClient"
Cohesion: 0.07
Nodes (15): bucket_applies(), CodexClient, CodexQuotaClient, _iso_from_unix(), mark_exhausted(), normalize_usage(), parse_rate_limits(), select_rate_limits() (+7 more)

### Community 25 - "ri"
Cohesion: 0.14
Nodes (47): ac(), Bf(), dh(), b(), c(), d(), e(), f() (+39 more)

### Community 26 - "dashboard.py"
Cohesion: 0.06
Nodes (29): _active_brain(), _active_provider(), _brain_status(), cold_status(), dashboard(), export_prospects(), get_activity(), get_campaigns() (+21 more)

### Community 27 - "pytest"
Cohesion: 0.15
Nodes (22): ConfigError, HarveyConfig, load_config(), QuietHoursConfig, test_config_missing_required_persona_field(), test_config_wrong_type_raises(), test_email_channel_rejects_negative_sends(), test_env_config_rejects_non_string() (+14 more)

### Community 28 - "test_codex_soak.py"
Cohesion: 0.32
Nodes (6): _alive(), _native_identity(), test_soak_cancellation_storm(), test_soak_many_concurrent_clients(), test_soak_mixed_faults_across_concurrent_brains(), _timed()

### Community 29 - "test_codex_cli_surface.py"
Cohesion: 0.07
Nodes (20): find_codex(), attacker(), _Attacker, _bundled_catalog(), _fake_native_login(), _hostile_routes(), _jwt(), mock_codex() (+12 more)

### Community 30 - "test_codex.py"
Cohesion: 0.09
Nodes (46): _alive(), _client(), renew(), _jwt(), _leftover_runtimes(), _rfc3339(), test_attempted_tool_use_aborts_the_call(), test_blocked_prompt_write_is_bounded_by_the_deadline() (+38 more)

### Community 33 - "Brain"
Cohesion: 0.09
Nodes (4): Brain, decide_next_action(), heartbeat(), test_parse_result_payload_plain_text_fallback()

### Community 34 - "WhatsAppClient"
Cohesion: 0.14
Nodes (3): phone_from_jid(), to_jid(), WhatsAppClient

### Community 35 - "codex.py"
Cohesion: 0.07
Nodes (28): attest_effective_config(), attest_hooks(), attest_mcp_status(), attest_thread(), build_access_snapshot(), build_thread_config(), build_thread_params(), describe_catalog() (+20 more)

### Community 36 - "test_signals_export.py"
Cohesion: 0.12
Nodes (15): cmd_export(), _export(), collect_prospects(), export_prospects_csv(), to_csv(), detect_tech(), _get_compiled(), _seed_prospects() (+7 more)

### Community 37 - ".init_db"
Cohesion: 0.07
Nodes (17): _profile(), _stats(), state(), state(), state(), state(), state(), state() (+9 more)

### Community 38 - "BrainConfig"
Cohesion: 0.12
Nodes (13): BrainConfig, _status_cli(), test_brain_config_validation(), test_claude_is_the_default(), test_cli_status_check_reports_readiness(), test_cli_status_hides_another_providers_pause(), test_cli_status_shows_a_recorded_pause(), test_cli_train_flags_select_the_provider() (+5 more)

### Community 39 - "xk"
Cohesion: 0.12
Nodes (29): bj(), Bk(), cf(), $d(), Db(), Dc(), fi(), Ha() (+21 more)

### Community 41 - "react.js"
Cohesion: 0.11
Nodes (22): Added, B(), C(), D(), Fa(), Qh(), E(), fa() (+14 more)

### Community 42 - "harvey"
Cohesion: 0.07
Nodes (27): DISABLE_TELEMETRY, GMAPS_SCRAPER_URL, command, environment, image, ports, restart, volumes (+19 more)

### Community 43 - "_state"
Cohesion: 0.10
Nodes (18): add_feedback(), _discovery_queries(), estimate_discovery(), get_openers(), outbox_approve(), outbox_approve_all(), outbox_reject(), preview_cohort() (+10 more)

### Community 44 - "test_state_extra.py"
Cohesion: 0.08
Nodes (37): Campaign, EmailStep, _new_id(), test_campaign_empty_sequence_round_trip(), test_campaign_sequence_from_json_bad_step_shape_raises(), test_campaign_sequence_from_malformed_json_returns_empty(), test_campaign_sequence_json_unicode_round_trip(), test_email_step_delay_defaults_to_zero() (+29 more)

### Community 45 - "test_dashboard_signals.py"
Cohesion: 0.07
Nodes (6): client(), test_cohort_with_no_requirements_is_empty_not_everything(), test_confirming_before_the_catalog_loads_still_works(), test_cost_notes_are_machine_classifiable(), test_reseeding_never_overrides_a_users_decision(), test_signals_seed_as_proposed_not_confirmed()

### Community 46 - "steps"
Cohesion: 0.07
Nodes (26): HARVEY_CODEX_CLI_TESTS, HARVEY_PACKAGE_TESTS, jobs, test, os, python, name, permissions (+18 more)

### Community 48 - "m"
Cohesion: 0.08
Nodes (34): Ag(), B(), Bg(), Cc(), cd(), Cg(), df(), Dg() (+26 more)

### Community 49 - "asyncio"
Cohesion: 0.17
Nodes (17): biz(), FakeProvider, register(), test_a_failed_query_does_not_lose_the_successful_ones(), fetch(), test_budget_cap_refuses_before_spending(), test_budget_stops_mid_run_when_actual_exceeds_estimate(), test_dry_run_estimates_without_calling_anything() (+9 more)

### Community 50 - "index.js"
Cohesion: 0.21
Nodes (12): Button(), IconButton(), ActivityCard(), ArtifactCard(), KIND, ProgressCard(), SegmentBar(), Dialog() (+4 more)

### Community 51 - "main.py"
Cohesion: 0.10
Nodes (7): _interruptible_sleep(), _run_agents(), _run_with_signals(), seconds_until_quiet_hours_end(), whatsapp_watcher(), night_shift(), test_watcher_over_budget_still_sends_written_replies_but_reads_nothing()

### Community 54 - "email_finder.py"
Cohesion: 0.05
Nodes (46): build_email(), classify_mx(), _clean_domain(), _clean_name_part(), derive_pattern(), detect_catch_all(), EmailResult, find_email() (+38 more)

### Community 55 - "test_brain_provider.py"
Cohesion: 0.14
Nodes (20): CodexResult, _capture_exec(), _codex_brain(), test_claude_model_choice_is_passed_per_call(), test_claude_preflight_is_a_no_op(), test_codex_brain_never_touches_claude(), test_codex_budget_uses_codex_quota_and_counter(), test_codex_cancellation_propagates() (+12 more)

### Community 57 - "ConfigFileNotFoundError"
Cohesion: 0.11
Nodes (9): ConfigFileNotFoundError, _find_config_file(), _current_provider(), get_settings(), get_setup_status(), _read_env_file(), _resolve_config_file(), _write_env_file() (+1 more)

### Community 58 - "DiscoveryProvider"
Cohesion: 0.12
Nodes (7): DataForSEOListings, DataForSEOSerp, _dfs_items(), normalize_domain(), test_dataforseo_errors_surface_the_message_not_just_the_code(), test_dataforseo_sandbox_is_never_the_live_host(), test_dataforseo_serp_adapter_reads_rank_group_not_position()

### Community 59 - "Rk"
Cohesion: 0.12
Nodes (17): ah(), bh(), ch(), Ck(), Hk(), Id(), Ie(), ii() (+9 more)

### Community 60 - "test_codex_platform.py"
Cohesion: 0.08
Nodes (17): build_child_env(), fake(), entries(), methods(), servers(), native_home(), on_windows(), test_claude_is_unaffected_on_windows() (+9 more)

### Community 61 - "Icon"
Cohesion: 0.23
Nodes (10): Icon(), IconChip(), ICONS, ActionRow(), Menu(), MenuTrigger(), Checkbox(), Select() (+2 more)

### Community 62 - "steps"
Cohesion: 0.11
Nodes (18): jobs, verify, name, permissions, contents, branches, name, run (+10 more)

### Community 63 - "test_whatsapp_metrics.py"
Cohesion: 0.37
Nodes (11): variant_examples(), variant_stats(), bot_log(), reply(), sent_contact(), test_auto_events_before_contact_or_for_other_channels_are_ignored(), test_email_and_empty_conversations_do_not_count_as_whatsapp_replies(), test_metrics_separate_people_bots_and_recorded_interest() (+3 more)

### Community 64 - "whatsapp"
Cohesion: 0.11
Nodes (18): whatsapp, cold_paused_until, default_country_code, enabled, followup_delays_hours, max_daily_sends, max_daily_unanswered, max_gap_seconds (+10 more)

### Community 65 - "CodexError"
Cohesion: 0.07
Nodes (15): _AppServer, build_private_config_toml(), _classify_turn_error(), CodexError, _kill_tree(), parse_cli_version(), _remaining(), require_supported_version() (+7 more)

### Community 67 - "test_collectors_profile.py"
Cohesion: 0.21
Nodes (11): collector(), test_agency_descriptive_anchor_scores_lower_but_records(), test_agency_detected_from_strong_credit(), test_bare_link_is_not_recorded(), test_benign_footer_links_ignored(), test_clean_page_has_no_false_tech(), test_only_confirmed_signals_are_collected(), test_page_titles_are_not_people() (+3 more)

### Community 68 - "test_discover.py"
Cohesion: 0.11
Nodes (6): test_an_unmappable_term_is_reported_not_silently_skipped(), test_configured_coordinates_win_over_geocoding(), test_directories_and_institutions_are_junk(), test_real_businesses_survive_the_filter(), test_the_default_provider_needs_no_account(), test_unconfigured_provider_says_which_key_is_missing()

### Community 69 - "Cold Email Copywriting"
Cohesion: 0.06
Nodes (30): Adjustments by prospect, Bad personalization, Bad subjects, Banned Formatting, Banned Patterns, Campaign Variety, Cold Email Copywriting, Compliance & Deliverability (Overrides Everything Below) (+22 more)

### Community 70 - "check_native_auth"
Cohesion: 0.15
Nodes (6): check_native_auth(), _load_native_auth(), native_codex_home(), test_windows_setup_checks_refuse_codex(), test_api_key_login_is_refused(), test_missing_login_is_actionable()

### Community 72 - "package.json"
Cohesion: 0.05
Nodes (39): adherence, restrictedImports, syntax, variants, devDependencies, esbuild@0.25.12, eslint@9.39.1, react@18.3.1 (+31 more)

### Community 73 - "test_whatsapp_followup_priority.py"
Cohesion: 0.42
Nodes (6): pending_followup(), test_cold_daily_cap_does_not_hold_an_approved_followup(), test_due_followup_precedes_more_than_sixty_older_cold_messages(), test_fast_watcher_leaves_followups_for_the_heartbeat(), test_followup_rechecks_customer_and_conversation_before_sending(), _now_iso()

### Community 74 - "Badge.jsx"
Cohesion: 0.24
Nodes (9): Badge(), Count(), STATUS_COLORS, StatusDot(), KanbanColumn(), TaskCardProps, TaskTag, TaskCard() (+1 more)

### Community 76 - "_client"
Cohesion: 0.17
Nodes (7): OpenStreetMap, _client(), test_osm_maps_the_trades_it_does_know(), test_osm_refuses_a_term_it_cannot_map_instead_of_guessing(), test_overpass_falls_over_to_the_next_mirror(), test_overpass_needs_a_coordinate_and_says_so(), test_overpass_throttling_is_an_error_not_an_empty_market()

### Community 77 - "FakeWa"
Cohesion: 0.14
Nodes (3): WaSendResult, fail(), FakeWa

### Community 78 - ".add_prospect"
Cohesion: 0.08
Nodes (18): _norm(), _Cfg, channels, email, test_migration_downgrades_legacy_verified(), test_prospect_email_status_roundtrips(), test_save_email_pattern_keeps_highest_confidence(), test_save_email_pattern_updates_catch_all_independently() (+10 more)

### Community 79 - "Harvey"
Cohesion: 0.10
Nodes (20): Changelog, Commands, Configuration, Design system, Harvey, How the data is stored, Legal and deliverability, License (+12 more)

### Community 80 - "DIY Prospecting Tactics"
Cohesion: 0.09
Nodes (22): Catch-All Domains, Common Email Formats (in order of prevalence), Daily Prospecting Quotas, DIY Prospecting Tactics, Find Companies in an Industry, Find Company Team Pages, Find Email Patterns, Find LinkedIn Profiles (+14 more)

### Community 81 - "microsoft.py"
Cohesion: 0.10
Nodes (8): _jwt_expiry(), _LoopbackServer, _LoopbackServerV6, _pkce_pair(), run_auth_flow(), main(), run_server(), test_pkce_challenge_matches_verifier()

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
Cohesion: 0.24
Nodes (4): _signals(), test_seeded_catalog_starts_unconfirmed(), test_user_decision_survives_reseeding(), state()

### Community 87 - "Offer Strategy & Closing Mechanics"
Cohesion: 0.11
Nodes (17): Closing Mechanics: How to Book, Cold Email Sequence (3 emails), Core Rule: Earn the Right to Ask, Crafting Offers from Product Knowledge, Example Offer Structures, Handling "What's the Price?", Language Rules, Offer Construction Framework (+9 more)

### Community 88 - "config.py"
Cohesion: 0.11
Nodes (14): ChannelsConfig, ComplianceConfig, DiscoveryConfig, EmailChannelConfig, EnvConfig, _format_validation_error(), ICPConfig, LinkedInChannelConfig (+6 more)

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

### Community 93 - "_strip_code"
Cohesion: 0.20
Nodes (4): _strip_code(), title_looks_like_role(), test_strip_code_removes_script_before_text_extraction(), test_title_role_gate()

### Community 95 - "product"
Cohesion: 0.22
Nodes (9): already have a solution, not interested, too expensive, product, description, key_benefits, name, objection_responses (+1 more)

### Community 96 - "night_step"
Cohesion: 0.20
Nodes (4): night_step(), queue_size(), search_pairs(), test_night_shift_searches_then_drafts_and_stops_at_the_target()

### Community 97 - "Como a Vitrine funciona na prática (fatos confirmados no código do produto)"
Cohesion: 0.14
Nodes (13): As artes do plano Pro (resposta definitiva), Cadastro dos produtos: quem faz, e quando, Como a Vitrine funciona na prática (fatos confirmados no código do produto), Como responder as dúvidas mais comuns, Descubra o que o cliente quer e adapte a conversa, Domínio e endereço, Fatos do produto e fatos da loja, O plano Pro: venda com tato, não com script (+5 more)

### Community 98 - "fake_codex.py"
Cohesion: 0.24
Nodes (6): answer_for(), effective_config(), log(), read_auth(), send(), turn_events()

### Community 99 - "ios-frame.jsx"
Cohesion: 0.39
Nodes (5): IOSDevice(), IOSGlassPill(), IOSKeyboard(), IOSNavBar(), IOSStatusBar()

### Community 100 - "harvey.yaml"
Cohesion: 0.25
Nodes (7): end, start, timezone, usage, heartbeat_interval_minutes, max_daily_claude_percent, quiet_hours

### Community 101 - "load_brain_config"
Cohesion: 0.10
Nodes (11): cmd_status(), _status(), cmd_usage(), _usage(), load_brain_config(), test_existing_usage_rows_become_claude(), test_brain_records_usage_from_payload(), test_record_usage_event_and_totals() (+3 more)

### Community 102 - "_check_harvey_pid"
Cohesion: 0.33
Nodes (3): _check_harvey_pid(), start_harvey(), stop_harvey()

### Community 103 - "icp"
Cohesion: 0.25
Nodes (8): icp, company_size, exclude_industries, geography, hiring_signals, include_keywords, industries, titles

### Community 105 - "offer"
Cohesion: 0.25
Nodes (8): booking_method, booking_url, entry, goal, meeting_duration, meeting_owner, primary, offer

### Community 106 - "Account Navigation: Working Multiple Contacts at One Company"
Cohesion: 0.15
Nodes (12): Account Navigation: Working Multiple Contacts at One Company, Companies vs Contacts, Company Profiles, Contact Profiles, Data Quality Rules, Multi-Threading: Working Multiple Contacts, Sample Flow, Sample Verification (+4 more)

### Community 107 - "test_outreach_metrics.py"
Cohesion: 0.08
Nodes (32): [0.1.0], [0.2.0] — 2026-09-13, [0.2.1] — 2026-10-13, [0.3.0] — 2026-10-13, Added, Added, Added, Changed (+24 more)

### Community 109 - "FakeBrain"
Cohesion: 0.16
Nodes (4): ContextBrain, FakeBrain, ReplyBrain, __init__()

### Community 111 - "Lead Qualification Skills"
Cohesion: 0.17
Nodes (11): Authority, BANT Framework (Initial Qualification), Budget, Disqualification Signals, Enrichment Priorities, ICP Scoring System, Lead Qualification Skills, MEDDIC (For Complex Deals — Future Use) (+3 more)

### Community 112 - "_Quota"
Cohesion: 0.22
Nodes (7): _NeverRead, _Quota, test_dashboard_claude_default_unchanged(), test_dashboard_codex_quota_client_follows_the_configured_model(), __init__(), test_dashboard_codex_quota_is_labelled_codex(), test_dashboard_reports_unavailable_codex_quota()

### Community 113 - "persona"
Cohesion: 0.29
Nodes (7): persona, company, email, linkedin, name, role, tone

### Community 114 - "test_brain_no_tools.py"
Cohesion: 0.38
Nodes (3): _FakeProcess, test_brain_runs_claude_with_no_tools(), fake_exec()

### Community 117 - "soak"
Cohesion: 0.29
Nodes (5): soak(), brain(), client(), entries(), pids()

### Community 118 - "Signal-Based Outreach Playbook"
Cohesion: 0.18
Nodes (10): Following up on a signal, Funding signal (recent raise), Hiring signal (they're hiring for a relevant role), New-domain / new-business signal, Signal → angle map, Signal-Based Outreach Playbook, Tech-stack signal (a tool detected on their site), The core rule (+2 more)

### Community 119 - "Harvey — Autonomous AI Sales Agent"
Cohesion: 0.15
Nodes (13): After Setup — Ongoing Help, Design system development, Explaining Harvey to Users, graphify, Harvey — Autonomous AI Sales Agent, Key Tools, MCP Tools: code-review-graph, Quick health check (do this silently): (+5 more)

### Community 120 - "Design system do Harvey"
Cohesion: 0.50
Nodes (4): Abrir as referências, Build, lint e validação, Design system do Harvey, Proveniência

### Community 121 - "discovery"
Cohesion: 0.33
Nodes (6): discovery, cities, night_shift, provider, queue_target, results_per_search

### Community 122 - "_render_js"
Cohesion: 0.29
Nodes (6): _render_js(), _render_quota_card(), test_dashboard_hides_another_providers_pause(), test_paused_brain_is_visible_on_the_dashboard(), test_quota_card_renders_gauges_and_limit_reached(), test_quota_card_renders_unavailable_codex_quota()

### Community 124 - "MetricCard.jsx"
Cohesion: 0.50
Nodes (4): MetricCard(), MiniChart(), TEXT, TONES

### Community 125 - "precleared"
Cohesion: 0.40
Nodes (5): compliance, precleared, address_source, enabled, sender_country

### Community 126 - "wk"
Cohesion: 0.40
Nodes (6): gf(), Ih(), ld(), oe(), qg(), wk()

### Community 127 - "_parse_ts"
Cohesion: 0.40
Nodes (4): is_auto_message(), _parse_ts(), _at(), test_shop_bots_are_told_apart_from_people()

### Community 128 - "_seed_observations"
Cohesion: 0.33
Nodes (3): _seed_observations(), test_cohort_is_a_set_intersection(), test_signal_counts_surface_in_the_review_ui()

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

### Community 136 - "DiscoveryProvider"
Cohesion: 0.12
Nodes (10): Architecture, Common Issues, Conversation Stages, How Harvey Works (Technical Reference), Key Commands, Priority Order, Sub-Agents, DiscoveryProvider (+2 more)

### Community 137 - "Skills"
Cohesion: 0.29
Nodes (6): Adding or Editing Skills, Auto-Generated Skills, Built-in Skills, How Skills Work, Skill → Agent Mapping, Skills

### Community 138 - "Relatório de triagem e integração"
Cohesion: 0.50
Nodes (4): Comparações e escolhas, Relatório de triagem e integração, Resultado, Validação

### Community 141 - "The prospecting pipeline"
Cohesion: 0.40
Nodes (5): 1. DISCOVER — who exists, 2. PROFILE — what they are, 3. ENRICH — who decides, 4. VERIFY — can you reach them, The prospecting pipeline

### Community 142 - "Quick start"
Cohesion: 0.50
Nodes (4): Easiest: let Claude set it up, Or do it yourself, Prerequisites, Quick start

### Community 204 - "The skills library"
Cohesion: 0.67
Nodes (3): The skills library, What ships, Which agent gets which

## Knowledge Gaps
- **2 isolated node(s):** `uvx`, `harvey`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1470 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **97 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StateManager` connect `StateManager` to `_seed_observations`, `test_microsoft.py`, `test_codex_e2e.py`, `test_outbox_native.py`, `cli.py`, `handler.py`, `Prospect`, `Company`, `Trainer`, `make_handler`, `setup.py`, `json`, `asyncio`, `_client`, `CodexClient`, `dashboard.py`, `test_codex_soak.py`, `test_codex_cli_surface.py`, `Writer`, `WhatsAppAgent`, `Brain`, `test_signals_export.py`, `.init_db`, `BrainConfig`, `Handler`, `_state`, `test_state_extra.py`, `test_dashboard_signals.py`, `asyncio`, `main.py`, `email_finder.py`, `test_brain_provider.py`, `test_codex_platform.py`, `test_whatsapp_metrics.py`, `._fetch`, `test_collectors_profile.py`, `test_discover.py`, `Analyst`, `.add_prospect`, `test_cli_usage_reads_only_the_active_providers_quota`, `.set_signal_status`, `config.py`, `Sender`, `night_step`, `load_brain_config`, `test_outreach_metrics.py`, `_Quota`, `test_brain_no_tools.py`, `_render_js`?**
  _High betweenness centrality (0.237) - this node is a cross-community bridge._
- **Are the 42 inferred relationships involving `StateManager` (e.g. with `Analyst` and `Handler`) actually correct?**
  _`StateManager` has 42 INFERRED edges - model-reasoned connections that need verification._
- **What connects `uvx`, `harvey` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `StateManager` be split into smaller, more focused modules?**
  _Cohesion score 0.04201680672268908 - nodes in this community are weakly interconnected._
- **Why does `[0.2.0] — 2026-09-13` connect `test_outreach_metrics.py` to `react.js`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Are the 15 inferred relationships involving `Prospect` (e.g. with `Scout` and `test_prospect_email_status_roundtrips()`) actually correct?**
  _`Prospect` has 15 INFERRED edges - model-reasoned connections that need verification._
- **Should `react-dom.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04330392943063352 - nodes in this community are weakly interconnected._
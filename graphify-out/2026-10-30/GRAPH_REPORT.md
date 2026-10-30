# Graph Report - harvey  (2026-10-30)

## Corpus Check
- 259 files · ~224,048 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 26 file(s) not represented in the graph (top: .css 10, .woff2 9, (none) 4)

## Summary
- 3958 nodes · 9744 edges · 221 communities (136 shown, 85 thin omitted)
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 1443 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `15c4dd67`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- ._connect
- react-dom.js
- PreclearedClient
- test_codex_e2e.py
- FakeProvider
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
- QuotaClient
- field_validator
- asyncio
- ia
- test_microsoft.py
- CodexQuotaClient
- ri
- dashboard.py
- pytest
- test_codex_soak.py
- test_codex_cli_surface.py
- test_codex.py
- ._draft
- WhatsAppAgent
- Brain
- WhatsAppClient
- codex.py
- test_signals_export.py
- .init_db
- pre_codex_harvey_0_2_1.sql
- xk
- Handler
- react.js
- harvey
- run_discovery
- Ce
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
- BrainConfig
- test_precleared.py
- Rk
- test_codex_platform.py
- Icon
- steps
- test_whatsapp_metrics.py
- whatsapp
- CodexError
- ._fetch
- test_email_finder.py
- test_discover.py
- Cold Email Copywriting
- check_native_auth
- setup.py
- package.json
- .add_outbox_item
- Badge.jsx
- Analyst
- _client
- FakeWa
- test_state_extra.py
- Harvey
- DIY Prospecting Tactics
- json
- design-system/package.json
- find_email
- Sales Methodology
- email
- ni
- Offer Strategy & Closing Mechanics
- state.py
- test_email_wiring.py
- ios-frame.js
- LinkedIn Outreach Skills
- Objection Handling Skills
- CloudflareCrawler
- Sender
- product
- night.py
- Como a Vitrine funciona na prática (fatos confirmados no código do produto)
- .add_observation
- ios-frame.jsx
- harvey.yaml
- test_usage.py
- derive_pattern
- icp
- CalendarClient
- offer
- Account Navigation: Working Multiple Contacts at One Company
- test_outreach_metrics.py
- Changelog
- FakeBrain
- Shell.jsx
- Lead Qualification Skills
- test_outbox_native.py
- persona
- GmailProvider
- FakeDiscovery
- design-system/README.md
- handler
- Signal-Based Outreach Playbook
- Harvey — Autonomous AI Sales Agent
- FallbackCrawler
- discovery
- test_watcher_over_budget_still_sends_written_replies_but_reads_nothing
- offline
- MetricCard.jsx
- precleared
- test_state.py
- _Quota
- .prepare
- _answering
- Setup Flow
- _StubCodex
- Menu.d.ts
- ProspectBoost Design System
- HomeScreen.jsx
- TasksScreen.jsx
- load_env
- Skills
- soak
- _render_js
- _capture_exec
- test_discovery_keeps_instagram_only_businesses
- [0.2.0] — 2026-09-13
- Select.d.ts
- Tabs.d.ts
- AgentScreen.jsx
- App.jsx
- code-review-graph
- Integração visual
- entrypoint.sh
- EmailResult
- dashboard/README.md
- harvey
- GEMINI.md
- _codex_platform
- build_access_snapshot
- test_unconfirmed_signals_are_not_recorded
- How Harvey Works (Technical Reference)
- attest_effective_config
- Relatório de triagem e integração
- test_brain_no_tools.py
- normalize_usage
- build_private_config_toml
- brain_section
- _hunter_domain_pattern
- The prospecting pipeline
- Quick start
- state
- test_whatsapp.py

## God Nodes (most connected - your core abstractions)
1. `StateManager` - 213 edges
2. `Prospect` - 91 edges
3. `Brain` - 84 edges
4. `Scout` - 57 edges
5. `Conversation` - 56 edges
6. `Company` - 53 edges
7. `make_handler()` - 53 edges
8. `Message` - 49 edges
9. `m()` - 47 edges
10. `Handler` - 47 edges

## Surprising Connections (you probably didn't know these)
- `Architecture` --references--> `DiscoveryProvider`  [INFERRED]
  CLAUDE.md → harvey/collectors/discover.py
- `Quick health check (do this silently):` --references--> `harvey()`  [INFERRED]
  CLAUDE.md → tests/test_codex_e2e.py
- `For developers` --references--> `MailProvider`  [INFERRED]
  docs/microsoft365.md → harvey/integrations/mail_provider.py
- `For developers` --references--> `get_mail_provider()`  [INFERRED]
  docs/microsoft365.md → harvey/integrations/mail_provider.py
- `Usar e manter` --references--> `harvey()`  [INFERRED]
  design-system/README.md → tests/test_codex_e2e.py

## Import Cycles
- None detected.

## Communities (221 total, 85 thin omitted)

### Community 0 - "._connect"
Cohesion: 0.04
Nodes (3): _new_id(), _norm(), test_feedback_crud()

### Community 1 - "react-dom.js"
Cohesion: 0.05
Nodes (50): $a(), Ab(), ai(), bi(), dd(), Dg(), dj(), Eh() (+42 more)

### Community 2 - "PreclearedClient"
Cohesion: 0.14
Nodes (9): Clearance, _from_cache(), PreclearedClient, _reason(), _text(), _utcnow(), test_changed_decision_inputs_require_a_new_check(), test_legacy_address_only_cache_entry_is_not_reused() (+1 more)

### Community 3 - "test_codex_e2e.py"
Cohesion: 0.05
Nodes (37): Usar e manter, _approved_item(), _DownBrain, Harness, harvey(), _load_pre_codex_db(), _none(), _open_thread() (+29 more)

### Community 4 - "FakeProvider"
Cohesion: 0.20
Nodes (24): FakeProvider, make_sender(), seed_campaign(), seed_prospect(), test_drain_gate_failure_marks_failed(), test_drain_respects_kill_switch(), test_drain_sends_approved_due_items(), test_send_failure_recorded() (+16 more)

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
Nodes (26): active_brain_status(), _check_python_version(), cmd_dashboard(), cmd_gmail(), cmd_install(), cmd_microsoft(), cmd_outbox(), cmd_run() (+18 more)

### Community 11 - "InboundMessage"
Cohesion: 0.09
Nodes (4): InboundMessage, MailProvider, SendResult, SmtpImapProvider

### Community 12 - "agents/whatsapp.py"
Cohesion: 0.08
Nodes (19): _plain(), _skeleton(), _strip_code(), _text(), contact_first_name(), _fold(), normalize_phone(), parse_contact_cards() (+11 more)

### Community 13 - "Prospect"
Cohesion: 0.07
Nodes (35): Campaign, EmailStep, _utcnow(), _utcnow(), Conversation, Message, _utcnow(), Prospect (+27 more)

### Community 14 - "Company"
Cohesion: 0.11
Nodes (16): chain(), config(), test_a_dry_run_neither_discovers_nor_profiles(), test_a_failing_profile_stage_does_not_lose_the_discovery(), test_a_new_company_needs_profiling(), test_a_profiled_company_drops_out(), test_a_stale_profile_comes_back_round(), test_discovery_flows_straight_into_profiling() (+8 more)

### Community 15 - "Trainer"
Cohesion: 0.11
Nodes (4): main(), _normalize_start_url(), run_training(), Trainer

### Community 16 - "discover.py"
Cohesion: 0.06
Nodes (16): Business, DataForSEOListings, DataForSEOSerp, _dfs_items(), DiscoveryProvider, DiscoveryQuery, geocode_city(), GoogleMapsScraper (+8 more)

### Community 17 - "make_handler"
Cohesion: 0.13
Nodes (36): WaInbound, contacted_prospect(), conversation(), test_accepted_demo_has_a_handoff_even_without_designer_in_the_reply(), test_classifier_receives_the_correct_channel_history_and_opener(), test_courtesy_after_referral_keeps_the_opportunity_without_another_pitch(), test_courtesy_does_not_hide_a_refusal(), test_forwarding_to_the_owner_is_a_referral_not_a_loss_or_meeting() (+28 more)

### Community 18 - "setup.py"
Cohesion: 0.15
Nodes (4): _ask(), _ask_yes_no(), _print_harvey(), SetupWizard

### Community 19 - "QuotaClient"
Cohesion: 0.19
Nodes (3): _quota_client_for(), QuotaClient, test_quota_reading_is_shared_and_stands_in_when_the_endpoint_refuses()

### Community 20 - "field_validator"
Cohesion: 0.13
Nodes (4): UsageConfig, WhatsAppChannelConfig, test_notify_group_must_be_a_group_jid(), test_whatsapp_config_validation()

### Community 21 - "asyncio"
Cohesion: 0.08
Nodes (46): is_auto_message(), wants_opt_out_pt(), _at(), make_agent(), seed_company(), staged_agent(), test_a_cold_message_waits_for_its_turn_but_a_reply_does_not(), test_a_reply_frees_a_slot_under_the_unanswered_cap() (+38 more)

### Community 22 - "ia"
Cohesion: 0.13
Nodes (27): fb(), $g(), gf(), gi(), hi(), ia(), ic(), Ih() (+19 more)

### Community 23 - "test_microsoft.py"
Cohesion: 0.05
Nodes (55): 1. Register an app in Entra ID, 2. Configure Harvey, 3. Sign in once, Deliverability notes, For developers, How it behaves, If you see "Need admin approval", Sending from a Microsoft 365 mailbox (+47 more)

### Community 25 - "ri"
Cohesion: 0.15
Nodes (44): aa(), ac(), Bf(), ci(), dh(), b(), c(), d() (+36 more)

### Community 26 - "dashboard.py"
Cohesion: 0.04
Nodes (50): estimate_cost(), _active_brain(), _active_provider(), add_feedback(), _brain_status(), _check_harvey_pid(), _current_provider(), dashboard() (+42 more)

### Community 27 - "pytest"
Cohesion: 0.07
Nodes (36): _run(), ChannelsConfig, ComplianceConfig, ConfigError, DiscoveryConfig, EmailChannelConfig, EnvConfig, _format_validation_error() (+28 more)

### Community 28 - "test_codex_soak.py"
Cohesion: 0.32
Nodes (6): _alive(), _native_identity(), test_soak_cancellation_storm(), test_soak_many_concurrent_clients(), test_soak_mixed_faults_across_concurrent_brains(), _timed()

### Community 29 - "test_codex_cli_surface.py"
Cohesion: 0.07
Nodes (18): attacker(), _Attacker, _bundled_catalog(), _fake_native_login(), _hostile_routes(), _jwt(), mock_codex(), _MockModel (+10 more)

### Community 30 - "test_codex.py"
Cohesion: 0.11
Nodes (41): _alive(), _client(), _leftover_runtimes(), test_attempted_tool_use_aborts_the_call(), test_blocked_prompt_write_is_bounded_by_the_deadline(), test_calls_are_serialized(), test_cancellation_kills_the_runtime(), test_code_mode_model_runs_with_a_private_text_catalog() (+33 more)

### Community 31 - "._draft"
Cohesion: 0.18
Nodes (6): whatsapp_persona_name(), GateResult, pre_send_check(), pre_send_check_whatsapp(), test_gate_blocks_bad_content(), test_whatsapp_gate()

### Community 32 - "WhatsAppAgent"
Cohesion: 0.09
Nodes (3): _now(), WhatsAppAgent, _run()

### Community 33 - "Brain"
Cohesion: 0.06
Nodes (5): Writer, Brain, BrainUnavailable, test_parse_result_payload_json(), test_parse_result_payload_plain_text_fallback()

### Community 34 - "WhatsAppClient"
Cohesion: 0.09
Nodes (3): get_whatsapp_client(), to_jid(), WhatsAppClient

### Community 35 - "codex.py"
Cohesion: 0.07
Nodes (30): attest_hooks(), attest_mcp_status(), attest_thread(), bucket_applies(), build_thread_config(), build_thread_params(), _classify_turn_error(), describe_catalog() (+22 more)

### Community 36 - "test_signals_export.py"
Cohesion: 0.11
Nodes (16): cmd_export(), _export(), collect_prospects(), export_prospects_csv(), to_csv(), detect_tech(), _get_compiled(), _seed_prospects() (+8 more)

### Community 37 - ".init_db"
Cohesion: 0.06
Nodes (25): _outbox(), _signals(), _status(), _usage(), _stats(), StateManager, state(), state() (+17 more)

### Community 38 - "pre_codex_harvey_0_2_1.sql"
Cohesion: 0.08
Nodes (44): actions, campaigns, companies, conversations, email_patterns, feedback, idx_actions_created_at, idx_campaigns_status (+36 more)

### Community 39 - "xk"
Cohesion: 0.11
Nodes (32): bj(), Bk(), cf(), $d(), Db(), Dc(), di(), fi() (+24 more)

### Community 40 - "Handler"
Cohesion: 0.07
Nodes (3): Handler, requested_next_step(), test_instantly_path_leaves_the_reply_unprocessed_when_the_brain_is_down()

### Community 41 - "react.js"
Cohesion: 0.12
Nodes (19): B(), C(), D(), Bd(), Fa(), Qh(), E(), fa() (+11 more)

### Community 42 - "harvey"
Cohesion: 0.07
Nodes (27): DISABLE_TELEMETRY, GMAPS_SCRAPER_URL, command, environment, image, ports, restart, volumes (+19 more)

### Community 43 - "run_discovery"
Cohesion: 0.09
Nodes (14): cmd_discover(), _discover(), cmd_profile(), _profile(), build_queries(), DiscoveryReport, is_junk(), provider_menu() (+6 more)

### Community 44 - "Ce"
Cohesion: 0.10
Nodes (30): bc(), be(), Ce(), ec(), ed(), fc(), Fg(), fj() (+22 more)

### Community 45 - "test_dashboard_signals.py"
Cohesion: 0.06
Nodes (10): client(), _seed_observations(), test_cohort_is_a_set_intersection(), test_cohort_with_no_requirements_is_empty_not_everything(), test_confirming_before_the_catalog_loads_still_works(), test_cost_notes_are_machine_classifiable(), test_dashboard_text_is_utf8_with_windows_default_encoding(), test_reseeding_never_overrides_a_users_decision() (+2 more)

### Community 46 - "steps"
Cohesion: 0.07
Nodes (26): HARVEY_CODEX_CLI_TESTS, HARVEY_PACKAGE_TESTS, jobs, test, os, python, name, on (+18 more)

### Community 48 - "m"
Cohesion: 0.10
Nodes (29): Ag(), B(), Bg(), Cc(), cd(), Cg(), de(), df() (+21 more)

### Community 49 - "asyncio"
Cohesion: 0.16
Nodes (15): biz(), FakeProvider, register(), test_a_failed_query_does_not_lose_the_successful_ones(), fetch(), test_budget_cap_refuses_before_spending(), test_budget_stops_mid_run_when_actual_exceeds_estimate(), test_dry_run_estimates_without_calling_anything() (+7 more)

### Community 50 - "index.js"
Cohesion: 0.21
Nodes (12): Button(), IconButton(), ActivityCard(), ArtifactCard(), KIND, ProgressCard(), SegmentBar(), Dialog() (+4 more)

### Community 51 - "main.py"
Cohesion: 0.09
Nodes (13): ConfigFileNotFoundError, _find_config_file(), _resolve_config_file(), decide_next_action(), heartbeat(), in_quiet_hours(), _interruptible_sleep(), _needs_setup() (+5 more)

### Community 52 - "test_collectors_profile.py"
Cohesion: 0.07
Nodes (17): profile_companies(), ProfileCollector, add(), title_looks_like_role(), collector(), test_agency_descriptive_anchor_scores_lower_but_records(), test_agency_detected_from_strong_credit(), test_bare_link_is_not_recorded() (+9 more)

### Community 54 - "email_finder.py"
Cohesion: 0.16
Nodes (9): detect_catch_all(), _hunter_api_key(), hunter_domain_people(), _hunter_monthly_cap(), _verify_candidate(), verify_email_smtp(), verify_hunter(), verify_reoon() (+1 more)

### Community 55 - "test_brain_provider.py"
Cohesion: 0.14
Nodes (18): CodexError, CodexResult, _codex_brain(), test_claude_preflight_is_a_no_op(), test_codex_brain_never_touches_claude(), test_codex_budget_uses_codex_quota_and_counter(), test_codex_cancellation_propagates(), test_codex_known_denial_closes_the_budget() (+10 more)

### Community 57 - "BrainConfig"
Cohesion: 0.10
Nodes (13): BrainConfig, _status_cli(), test_brain_config_validation(), test_claude_is_the_default(), test_cli_status_check_reports_readiness(), test_cli_status_hides_another_providers_pause(), test_cli_status_shows_a_recorded_pause(), test_cli_train_flags_select_the_provider() (+5 more)

### Community 58 - "test_precleared.py"
Cohesion: 0.12
Nodes (11): PreclearedConfig, Cfg, channels, email, linkedin, persona, product, logged_receipts() (+3 more)

### Community 59 - "Rk"
Cohesion: 0.17
Nodes (13): ah(), bh(), ch(), Ck(), Id(), Ie(), ii(), ji() (+5 more)

### Community 60 - "test_codex_platform.py"
Cohesion: 0.07
Nodes (22): build_child_env(), renew(), fake(), entries(), methods(), servers(), _jwt(), native_home() (+14 more)

### Community 61 - "Icon"
Cohesion: 0.23
Nodes (10): Icon(), IconChip(), ICONS, ActionRow(), Menu(), MenuTrigger(), Checkbox(), Select() (+2 more)

### Community 62 - "steps"
Cohesion: 0.11
Nodes (18): jobs, verify, name, on, pull_request, push, permissions, contents (+10 more)

### Community 63 - "test_whatsapp_metrics.py"
Cohesion: 0.37
Nodes (11): variant_examples(), variant_stats(), bot_log(), reply(), sent_contact(), test_auto_events_before_contact_or_for_other_channels_are_ignored(), test_email_and_empty_conversations_do_not_count_as_whatsapp_replies(), test_metrics_separate_people_bots_and_recorded_interest() (+3 more)

### Community 64 - "whatsapp"
Cohesion: 0.11
Nodes (18): whatsapp, cold_paused_until, default_country_code, enabled, followup_delays_hours, max_daily_sends, max_daily_unanswered, max_gap_seconds (+10 more)

### Community 65 - "CodexError"
Cohesion: 0.06
Nodes (12): _AppServer, CodexClient, _kill_tree(), parse_cli_version(), _remaining(), require_supported_version(), _setup_error(), _timeout_error() (+4 more)

### Community 67 - "test_email_finder.py"
Cohesion: 0.14
Nodes (11): build_email(), classify_mx(), _clean_name_part(), generate_patterns(), infer_pattern_from_email(), _status_from_verdict(), test_build_email_patterns(), test_classify_mx() (+3 more)

### Community 68 - "test_discover.py"
Cohesion: 0.12
Nodes (5): test_an_unmappable_term_is_reported_not_silently_skipped(), test_configured_coordinates_win_over_geocoding(), test_directories_and_institutions_are_junk(), test_real_businesses_survive_the_filter(), test_the_default_provider_needs_no_account()

### Community 69 - "Cold Email Copywriting"
Cohesion: 0.06
Nodes (30): Adjustments by prospect, Bad personalization, Bad subjects, Banned Formatting, Banned Patterns, Campaign Variety, Cold Email Copywriting, Compliance & Deliverability (Overrides Everything Below) (+22 more)

### Community 70 - "check_native_auth"
Cohesion: 0.14
Nodes (7): check_native_auth(), _load_native_auth(), native_codex_home(), test_windows_setup_checks_refuse_codex(), test_api_key_login_is_refused(), test_external_token_login_is_refused(), test_missing_login_is_actionable()

### Community 71 - "setup.py"
Cohesion: 0.14
Nodes (9): check_cli_version(), find_codex(), require_supported_platform(), _ask_brain_config(), _check_claude_cli(), _check_codex_cli(), _print_step(), _test_claude() (+1 more)

### Community 72 - "package.json"
Cohesion: 0.05
Nodes (39): adherence, restrictedImports, syntax, variants, devDependencies, esbuild@0.25.12, eslint@9.39.1, react@18.3.1 (+31 more)

### Community 73 - ".add_outbox_item"
Cohesion: 0.16
Nodes (16): pending_followup(), test_cold_daily_cap_does_not_hold_an_approved_followup(), test_due_followup_precedes_more_than_sixty_older_cold_messages(), test_fast_watcher_leaves_followups_for_the_heartbeat(), test_followup_rechecks_customer_and_conversation_before_sending(), followups(), _now_iso(), quiet_conversation() (+8 more)

### Community 74 - "Badge.jsx"
Cohesion: 0.24
Nodes (9): Badge(), Count(), STATUS_COLORS, StatusDot(), KanbanColumn(), TaskCardProps, TaskTag, TaskCard() (+1 more)

### Community 76 - "_client"
Cohesion: 0.13
Nodes (11): OpenStreetMap, _client(), test_dataforseo_errors_surface_the_message_not_just_the_code(), test_dataforseo_serp_adapter_reads_rank_group_not_position(), test_osm_maps_the_trades_it_does_know(), test_osm_refuses_a_term_it_cannot_map_instead_of_guessing(), test_overpass_falls_over_to_the_next_mirror(), test_overpass_needs_a_coordinate_and_says_so() (+3 more)

### Community 77 - "FakeWa"
Cohesion: 0.09
Nodes (4): WaHealth, WaSendResult, fail(), FakeWa

### Community 78 - "test_state_extra.py"
Cohesion: 0.12
Nodes (27): test_add_company_same_id_is_ignored(), test_add_prospect_same_id_is_ignored(), test_campaign_add_and_fetch_by_status(), test_campaign_stats(), test_campaign_stats_zero_prospects_no_division_error(), test_conversation_add_and_fetch(), test_count_prospects_by_status(), test_get_company_by_id() (+19 more)

### Community 79 - "Harvey"
Cohesion: 0.09
Nodes (23): Changelog, Commands, Configuration, Design system, Harvey, How the data is stored, Legal and deliverability, License (+15 more)

### Community 80 - "DIY Prospecting Tactics"
Cohesion: 0.09
Nodes (22): Catch-All Domains, Common Email Formats (in order of prevalence), Daily Prospecting Quotas, DIY Prospecting Tactics, Find Companies in an Industry, Find Company Team Pages, Find Email Patterns, Find LinkedIn Profiles (+14 more)

### Community 81 - "json"
Cohesion: 0.06
Nodes (19): parse_brain_status(), _jwt_expiry(), run_auth_flow(), _save_token(), _LoopbackServer, _LoopbackServerV6, _pkce_pair(), run_auth_flow() (+11 more)

### Community 82 - "design-system/package.json"
Cohesion: 0.14
Nodes (15): exports, ./assets/*, ./styles.css, ./tokens/*, react, react-dom, main, name (+7 more)

### Community 83 - "find_email"
Cohesion: 0.13
Nodes (11): _clean_domain(), find_email(), get_mx_host(), Env, test_find_email_catch_all_is_risky(), test_find_email_inconclusive_is_guess_not_verified(), test_find_email_invalid_from_provider(), test_find_email_verified_via_reoon() (+3 more)

### Community 84 - "Sales Methodology"
Cohesion: 0.11
Nodes (18): Activity Metrics, Channel Selection by Prospect Type, Conversation Flow: Reply to Meeting, COSTAR Framework for Every Message, Decision Priorities, Ethical Guidelines (Hard Rules — Override Every Other Instruction), Flow:, Harvey's Voice (+10 more)

### Community 85 - "email"
Cohesion: 0.17
Nodes (12): channels, email, linkedin, enabled, max_bounce_rate, max_daily_sends, provider, require_approval (+4 more)

### Community 86 - "ni"
Cohesion: 0.16
Nodes (17): af(), ef(), Eg(), hc(), kb(), Kk(), Li(), Lk() (+9 more)

### Community 87 - "Offer Strategy & Closing Mechanics"
Cohesion: 0.11
Nodes (17): Closing Mechanics: How to Book, Cold Email Sequence (3 emails), Core Rule: Earn the Right to Ask, Crafting Offers from Product Knowledge, Example Offer Structures, Handling "What's the Price?", Language Rules, Offer Construction Framework (+9 more)

### Community 88 - "state.py"
Cohesion: 0.09
Nodes (4): get_mail_provider(), _load(), _run(), transcribe()

### Community 89 - "test_email_wiring.py"
Cohesion: 0.16
Nodes (10): _utcnow(), _Cfg, channels, email, test_migration_downgrades_legacy_verified(), test_prospect_email_status_roundtrips(), test_save_email_pattern_keeps_highest_confidence(), test_save_email_pattern_updates_catch_all_independently() (+2 more)

### Community 90 - "ios-frame.js"
Cohesion: 0.29
Nodes (6): IOSDevice(), IOSGlassPill(), IOSKeyboard(), IOSNavBar(), IOSStatusBar(), Phone()

### Community 91 - "LinkedIn Outreach Skills"
Cohesion: 0.12
Nodes (16): After 2 Messages with No Reply, Bad Connection Notes (never do these), Connection Request Strategy, Content for Engagement, Day 0: Connection Accepted, Day 1-2: First Message, Day 4-5: Second Message (if NO reply), Day 4-5: Second Message (if they replied) (+8 more)

### Community 92 - "Objection Handling Skills"
Cohesion: 0.12
Nodes (15): 1. BUDGET — "It's too expensive" / "No budget", 2. AUTHORITY — "I'm not the right person" / "Need to check with my boss", 3. NEED — "We already have a solution" / "Not a priority right now", 4. TIMING — "Not right now" / "Maybe next quarter", Advanced Techniques, Core Framework: LAARC, Diagnose Before You Respond, Hard Ethical Guardrails (Non-Negotiable) (+7 more)

### Community 95 - "product"
Cohesion: 0.22
Nodes (9): already have a solution, not interested, too expensive, product, description, key_benefits, name, objection_responses (+1 more)

### Community 96 - "night.py"
Cohesion: 0.32
Nodes (3): night_step(), queue_size(), search_pairs()

### Community 97 - "Como a Vitrine funciona na prática (fatos confirmados no código do produto)"
Cohesion: 0.14
Nodes (13): As artes do plano Pro (resposta definitiva), Cadastro dos produtos e Prévia Assistida (Concierge), Como a Vitrine funciona na prática (fatos confirmados no código do produto), Como responder as dúvidas mais comuns, Descubra o que o cliente quer e adapte a conversa, Domínio e endereço, Fatos do produto e fatos da loja, Loja Modelo (Demonstração) e Teste Grátis (+5 more)

### Community 98 - ".add_observation"
Cohesion: 0.21
Nodes (4): test_a_cohort_reflects_the_newest_observation(), test_a_false_boolean_is_recorded_but_not_in_the_cohort(), test_exclusions_also_read_the_value(), test_text_signals_count_by_their_existence()

### Community 99 - "ios-frame.jsx"
Cohesion: 0.39
Nodes (5): IOSDevice(), IOSGlassPill(), IOSKeyboard(), IOSNavBar(), IOSStatusBar()

### Community 100 - "harvey.yaml"
Cohesion: 0.25
Nodes (7): end, start, timezone, heartbeat_interval_minutes, max_daily_claude_percent, quiet_hours, usage

### Community 101 - "test_usage.py"
Cohesion: 0.15
Nodes (9): _parse_window(), _token_from_json_blob(), test_brain_records_usage_from_payload(), test_parse_window(), test_record_usage_event_and_totals(), test_request_key_dedup(), test_token_from_json_blob(), test_usage_by_agent_groups_and_counts_sessions() (+1 more)

### Community 102 - "derive_pattern"
Cohesion: 0.17
Nodes (11): derive_pattern(), hunter_searches_remaining(), _hunter_usage_key(), record_hunter_search(), test_derive_pattern_default_no_signal(), test_derive_pattern_from_known_email(), test_derive_pattern_spends_and_respects_hunter_budget(), test_derive_pattern_uses_cache() (+3 more)

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
Cohesion: 0.19
Nodes (15): answered(), contacted(), status(), test_a_cap_of_zero_reads_as_a_setting_not_as_a_day_that_ran_out(), test_a_reply_from_someone_never_messaged_cold_is_not_counted(), test_a_second_message_to_the_same_person_is_one_cold_contact(), test_a_switch_beats_a_clock_which_beats_a_cap(), test_an_auto_responder_is_not_an_answer_today() (+7 more)

### Community 108 - "Changelog"
Cohesion: 0.17
Nodes (12): [0.1.0], [0.2.1] — 2026-10-13, [0.3.0] — 2026-10-13, Added, Added, Added, Changed, Changelog (+4 more)

### Community 109 - "FakeBrain"
Cohesion: 0.08
Nodes (14): BlockedOnceBrain, ContextBrain, FakeBrain, RecordingBrain, ReplyBrain, test_always_blocked_whatsapp_draft_goes_to_a_human(), __init__(), test_blocked_whatsapp_draft_is_redrafted() (+6 more)

### Community 111 - "Lead Qualification Skills"
Cohesion: 0.17
Nodes (11): Authority, BANT Framework (Initial Qualification), Budget, Disqualification Signals, Enrichment Priorities, ICP Scoring System, Lead Qualification Skills, MEDDIC (For Complex Deals — Future Use) (+3 more)

### Community 112 - "test_outbox_native.py"
Cohesion: 0.31
Nodes (9): looks_like_bounce(), Env, make_handler(), _now_iso(), test_bounce_detection(), test_bounce_marks_invalid_and_kill_switch(), test_gate_link_and_html_limits(), test_inbound_dedup() (+1 more)

### Community 113 - "persona"
Cohesion: 0.29
Nodes (7): persona, company, email, linkedin, name, role, tone

### Community 114 - "GmailProvider"
Cohesion: 0.22
Nodes (3): _test(), GmailProvider, _load_token()

### Community 116 - "design-system/README.md"
Cohesion: 0.27
Nodes (4): Abrir as referências, Build, lint e validação, Design system do Harvey, Proveniência

### Community 117 - "handler"
Cohesion: 0.22
Nodes (6): _geo_client(), test_a_geocode_miss_is_cached_too(), test_dataforseo_listings_adapter(), handler(), test_geocode_is_cached_so_a_city_is_looked_up_once(), test_one_geocode_per_city_not_per_query()

### Community 118 - "Signal-Based Outreach Playbook"
Cohesion: 0.18
Nodes (10): Following up on a signal, Funding signal (recent raise), Hiring signal (they're hiring for a relevant role), New-domain / new-business signal, Signal → angle map, Signal-Based Outreach Playbook, Tech-stack signal (a tool detected on their site), The core rule (+2 more)

### Community 119 - "Harvey — Autonomous AI Sales Agent"
Cohesion: 0.15
Nodes (13): After Setup — Ongoing Help, Design system development, Explaining Harvey to Users, graphify, Harvey — Autonomous AI Sales Agent, Key Tools, MCP Tools: code-review-graph, Quick health check (do this silently): (+5 more)

### Community 121 - "discovery"
Cohesion: 0.33
Nodes (6): discovery, cities, night_shift, provider, queue_target, results_per_search

### Community 124 - "MetricCard.jsx"
Cohesion: 0.50
Nodes (4): MetricCard(), MiniChart(), TEXT, TONES

### Community 125 - "precleared"
Cohesion: 0.40
Nodes (5): compliance, precleared, address_source, enabled, sender_country

### Community 126 - "test_state.py"
Cohesion: 0.18
Nodes (10): Company, test_company_all_fields_default_empty(), test_company_defaults(), test_add_and_get_company(), test_company_exists(), test_contacts_for_company(), test_get_prospect_by_email(), test_prospect_status_update() (+2 more)

### Community 127 - "_Quota"
Cohesion: 0.22
Nodes (7): _NeverRead, _Quota, test_dashboard_claude_default_unchanged(), test_dashboard_codex_quota_client_follows_the_configured_model(), __init__(), test_dashboard_codex_quota_is_labelled_codex(), test_dashboard_reports_unavailable_codex_quota()

### Community 128 - ".prepare"
Cohesion: 0.22
Nodes (3): has_own_website(), is_mobile(), test_is_mobile()

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

### Community 136 - "load_env"
Cohesion: 0.25
Nodes (5): load_env(), cold_status(), get_outreach(), queued(), test_load_env_reads_environment()

### Community 137 - "Skills"
Cohesion: 0.29
Nodes (6): Adding or Editing Skills, Auto-Generated Skills, Built-in Skills, How Skills Work, Skill → Agent Mapping, Skills

### Community 138 - "soak"
Cohesion: 0.29
Nodes (5): soak(), brain(), client(), entries(), pids()

### Community 139 - "_render_js"
Cohesion: 0.29
Nodes (6): _render_js(), _render_quota_card(), test_dashboard_hides_another_providers_pause(), test_paused_brain_is_visible_on_the_dashboard(), test_quota_card_renders_gauges_and_limit_reached(), test_quota_card_renders_unavailable_codex_quota()

### Community 140 - "_capture_exec"
Cohesion: 0.25
Nodes (5): _capture_exec(), fake_exec(), _FakeProcess, test_claude_model_choice_is_passed_per_call(), test_long_claude_prompts_still_go_via_stdin()

### Community 141 - "test_discovery_keeps_instagram_only_businesses"
Cohesion: 0.29
Nodes (5): scraper_transport(), test_discovery_keeps_instagram_only_businesses(), client_factory(), test_gmaps_scraper_failed_job_raises(), test_gmaps_scraper_runs_a_job_and_parses_the_csv()

### Community 142 - "[0.2.0] — 2026-09-13"
Cohesion: 0.29
Nodes (8): [0.2.0] — 2026-09-13, Added, Changed, Fixed, Security, K(), R(), Nothing sends without you

### Community 206 - "build_access_snapshot"
Cohesion: 0.33
Nodes (4): build_access_snapshot(), _parse_timestamp(), test_login_a_week_old_is_still_used(), test_unreadable_token_expiry_is_an_auth_error()

### Community 208 - "How Harvey Works (Technical Reference)"
Cohesion: 0.29
Nodes (7): Architecture, Common Issues, Conversation Stages, How Harvey Works (Technical Reference), Key Commands, Priority Order, Sub-Agents

### Community 209 - "attest_effective_config"
Cohesion: 0.33
Nodes (5): attest_effective_config(), _find_custom_endpoint(), _good_effective_config(), test_attest_effective_config_rejects_custom_routes(), test_attest_effective_config_requires_every_lockdown_setting()

### Community 210 - "Relatório de triagem e integração"
Cohesion: 0.50
Nodes (4): Comparações e escolhas, Relatório de triagem e integração, Resultado, Validação

### Community 211 - "test_brain_no_tools.py"
Cohesion: 0.38
Nodes (3): _FakeProcess, test_brain_runs_claude_with_no_tools(), fake_exec()

### Community 213 - "build_private_config_toml"
Cohesion: 0.25
Nodes (3): build_private_config_toml(), _toml_value(), test_private_config_is_valid_toml_with_every_feature_off()

### Community 215 - "_hunter_domain_pattern"
Cohesion: 0.40
Nodes (3): _hunter_domain_pattern(), _translate_hunter_pattern(), test_translate_hunter_pattern()

### Community 216 - "The prospecting pipeline"
Cohesion: 0.40
Nodes (5): 1. DISCOVER — who exists, 2. PROFILE — what they are, 3. ENRICH — who decides, 4. VERIFY — can you reach them, The prospecting pipeline

### Community 217 - "Quick start"
Cohesion: 0.50
Nodes (4): Easiest: let Claude set it up, Or do it yourself, Prerequisites, Quick start

### Community 218 - "state"
Cohesion: 0.27
Nodes (3): fast_polling(), state(), test_normalize_phone_brazil()

### Community 219 - "test_whatsapp.py"
Cohesion: 0.09
Nodes (18): _client(), _env(), test_a_connected_session_answering_not_ready_is_restarted(), test_a_flapping_socket_cannot_declare_a_number_unreachable(), test_a_positive_check_needs_no_second_opinion(), test_a_send_to_a_vanished_session_marks_it_not_ready(), test_a_settled_socket_may_declare_a_number_unreachable(), test_client_connection_states() (+10 more)

## Knowledge Gaps
- **2 isolated node(s):** `uvx`, `harvey`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1497 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **85 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StateManager` connect `.init_db` to `._connect`, `test_codex_e2e.py`, `._contacts_from_company`, `cli.py`, `_render_js`, `agents/whatsapp.py`, `Prospect`, `Company`, `Trainer`, `make_handler`, `setup.py`, `asyncio`, `test_microsoft.py`, `CodexQuotaClient`, `dashboard.py`, `pytest`, `test_codex_soak.py`, `test_codex_cli_surface.py`, `WhatsAppAgent`, `Brain`, `test_signals_export.py`, `Handler`, `run_discovery`, `test_dashboard_signals.py`, `asyncio`, `main.py`, `test_collectors_profile.py`, `test_brain_provider.py`, `._find_companies_via_directories`, `BrainConfig`, `test_precleared.py`, `test_codex_platform.py`, `test_whatsapp_metrics.py`, `._fetch`, `test_email_finder.py`, `test_discover.py`, `setup.py`, `.add_outbox_item`, `Analyst`, `_codex_platform`, `test_state_extra.py`, `test_unconfirmed_signals_are_not_recorded`, `test_brain_no_tools.py`, `state.py`, `test_email_wiring.py`, `state`, `Sender`, `.add_observation`, `test_usage.py`, `test_outreach_metrics.py`, `test_outbox_native.py`, `test_state.py`, `_Quota`?**
  _High betweenness centrality (0.260) - this node is a cross-community bridge._
- **Are the 46 inferred relationships involving `StateManager` (e.g. with `Analyst` and `Handler`) actually correct?**
  _`StateManager` has 46 INFERRED edges - model-reasoned connections that need verification._
- **What connects `uvx`, `harvey` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `._connect` be split into smaller, more focused modules?**
  _Cohesion score 0.04208065458796026 - nodes in this community are weakly interconnected._
- **Why does `[0.2.0] — 2026-09-13` connect `[0.2.0] — 2026-09-13` to `Changelog`?**
  _High betweenness centrality (0.158) - this node is a cross-community bridge._
- **Are the 33 inferred relationships involving `Prospect` (e.g. with `Handler` and `Scout`) actually correct?**
  _`Prospect` has 33 INFERRED edges - model-reasoned connections that need verification._
- **Should `react-dom.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04960491659350307 - nodes in this community are weakly interconnected._
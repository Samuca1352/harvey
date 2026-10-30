# Graph Report - harvey  (2026-10-30)

## Corpus Check
- 259 files · ~224,303 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 26 file(s) not represented in the graph (top: .css 10, .woff2 9, (none) 4)

## Summary
- 3959 nodes · 9751 edges · 214 communities (125 shown, 89 thin omitted)
- Extraction: 85% EXTRACTED · 15% INFERRED · 0% AMBIGUOUS · INFERRED: 1445 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `15c4dd67`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- MicrosoftProvider
- react-dom.js
- PreclearedClient
- asyncio
- FakeProvider
- app.js
- components.js
- ref_react
- cli.py
- InstantlyClient
- InboundMessage
- integrations/whatsapp.py
- Prospect
- Company
- Trainer
- discover.py
- make_handler
- setup.py
- _state
- field_validator
- asyncio
- ia
- test_microsoft.py
- Writer
- ri
- dashboard.py
- pytest
- test_codex_soak.py
- test_codex_cli_surface.py
- test_codex.py
- test_collectors_profile.py
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
- discover.py
- Ce
- test_dashboard_signals.py
- steps
- LinkedInAutomation
- m
- test_discover.py
- index.js
- get_setup_status
- test_collectors_profile.py
- index.d.ts
- email_finder.py
- test_brain_provider.py
- test_instantly_path_leaves_the_reply_unprocessed_when_the_brain_is_down
- PreclearedConfig
- MailProvider
- test_codex_platform.py
- Icon
- steps
- test_whatsapp_metrics.py
- whatsapp
- CodexError
- ._fetch
- test_email_finder.py
- .run_cycles
- Cold Email Copywriting
- check_native_auth
- ._print_summary
- package.json
- .add_outbox_item
- Badge.jsx
- Analyst
- Harness
- FakeWa
- Prospect
- Harvey
- DIY Prospecting Tactics
- microsoft.py
- design-system/package.json
- find_email
- Sales Methodology
- email
- test_codex_e2e.py
- Offer Strategy & Closing Mechanics
- state.py
- time
- ios-frame.js
- LinkedIn Outreach Skills
- Objection Handling Skills
- CloudflareCrawler
- WhatsAppClient
- product
- night.py
- Como a Vitrine funciona na prática (fatos confirmados no código do produto)
- proposal.py
- ios-frame.jsx
- harvey.yaml
- json
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
- Sending from a Microsoft 365 mailbox
- Signal-Based Outreach Playbook
- Harvey — Autonomous AI Sales Agent
- FallbackCrawler
- discovery
- test_watcher_over_budget_still_sends_written_replies_but_reads_nothing
- WaHealth
- MetricCard.jsx
- precleared
- Graph
- asyncio
- test_outage_during_the_handler_holds_queued_sends_until_recovery
- test_a_message_that_fails_to_process_holds_that_cycles_sends
- _check_harvey_pid
- Menu.d.ts
- ProspectBoost Design System
- HomeScreen.jsx
- TasksScreen.jsx
- Cfg
- Skills
- StubBrain
- MCP Tools: code-review-graph
- seed_signal_catalog
- PipelineReport
- test_dashboard_text_is_utf8_with_windows_default_encoding
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
- client
- _test_instantly
- How Harvey Works (Technical Reference)
- attest_effective_config
- os
- ._run
- build_private_config_toml
- _hunter_domain_pattern
- test_whatsapp.py

## God Nodes (most connected - your core abstractions)
1. `StateManager` - 213 edges
2. `Prospect` - 91 edges
3. `Brain` - 84 edges
4. `Scout` - 57 edges
5. `Conversation` - 56 edges
6. `make_handler()` - 54 edges
7. `Company` - 53 edges
8. `Message` - 49 edges
9. `m()` - 47 edges
10. `Handler` - 47 edges

## Surprising Connections (you probably didn't know these)
- `Architecture` --references--> `DiscoveryProvider`  [INFERRED]
  CLAUDE.md → harvey/collectors/discover.py
- `Quick health check (do this silently):` --references--> `harvey()`  [INFERRED]
  CLAUDE.md → tests/test_codex_e2e.py
- `For developers` --references--> `GraphError`  [INFERRED]
  docs/microsoft365.md → harvey/integrations/microsoft.py
- `For developers` --references--> `MicrosoftProvider`  [INFERRED]
  docs/microsoft365.md → harvey/integrations/microsoft.py
- `Usar e manter` --references--> `harvey()`  [INFERRED]
  design-system/README.md → tests/test_codex_e2e.py

## Import Cycles
- None detected.

## Communities (214 total, 89 thin omitted)

### Community 0 - "MicrosoftProvider"
Cohesion: 0.13
Nodes (8): _test(), _checked_next_link(), GraphError, _load_token(), MicrosoftProvider, obj(), text(), test_wrong_account_is_refused()

### Community 1 - "react-dom.js"
Cohesion: 0.05
Nodes (50): $a(), Ab(), ah(), bh(), ch(), Ck(), dd(), de() (+42 more)

### Community 2 - "PreclearedClient"
Cohesion: 0.14
Nodes (9): Clearance, _from_cache(), PreclearedClient, _reason(), _text(), _utcnow(), test_changed_decision_inputs_require_a_new_check(), test_legacy_address_only_cache_entry_is_not_reused() (+1 more)

### Community 3 - "asyncio"
Cohesion: 0.26
Nodes (12): _open_thread(), _reply(), test_expired_login_pauses_everything_and_recovers_after_renewal(), test_no_final_answer_escalates_to_a_human_without_replying(), test_rejected_model_never_sends_queued_mail(), test_rejected_model_pauses_with_an_actionable_reason(), test_renewed_login_is_picked_up_without_a_restart(), test_reply_is_classified_answered_for_review_and_never_reprocessed() (+4 more)

### Community 4 - "FakeProvider"
Cohesion: 0.26
Nodes (16): make_sender(), logged_receipts(), mock_precleared(), queue(), test_api_key_is_sent_as_bearer(), test_blocked_verdict_is_remembered_for_later_steps(), test_consent_needed_fails_the_item_with_the_reason(), test_daily_limit_holds_cold_email_but_replies_still_go() (+8 more)

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
Nodes (24): _check_python_version(), cmd_dashboard(), cmd_install(), cmd_microsoft(), cmd_outbox(), cmd_profile(), _profile(), cmd_run() (+16 more)

### Community 11 - "InboundMessage"
Cohesion: 0.11
Nodes (7): run_auth_flow(), _save_token(), InboundMessage, looks_like_bounce(), SendResult, SmtpImapProvider, test_bounce_detection()

### Community 12 - "integrations/whatsapp.py"
Cohesion: 0.18
Nodes (7): contact_first_name(), _fold(), get_whatsapp_client(), parse_contact_cards(), typed_contacts(), test_contact_cards_give_a_number_and_a_usable_first_name(), test_typed_numbers_are_contacts()

### Community 13 - "Prospect"
Cohesion: 0.06
Nodes (41): Campaign, EmailStep, _utcnow(), _utcnow(), Conversation, Message, _utcnow(), _utcnow() (+33 more)

### Community 14 - "Company"
Cohesion: 0.07
Nodes (26): Company, chain(), config(), state(), test_a_cohort_reflects_the_newest_observation(), test_a_dry_run_neither_discovers_nor_profiles(), test_a_failing_profile_stage_does_not_lose_the_discovery(), test_a_false_boolean_is_recorded_but_not_in_the_cohort() (+18 more)

### Community 16 - "discover.py"
Cohesion: 0.08
Nodes (11): Business, DataForSEOListings, DataForSEOSerp, _dfs_items(), DiscoveryProvider, GoogleMapsScraper, normalize_domain(), Serper (+3 more)

### Community 17 - "make_handler"
Cohesion: 0.14
Nodes (37): WaInbound, contacted_prospect(), conversation(), test_accepted_demo_has_a_handoff_even_without_designer_in_the_reply(), test_classifier_receives_the_correct_channel_history_and_opener(), test_courtesy_after_referral_keeps_the_opportunity_without_another_pitch(), test_courtesy_does_not_hide_a_refusal(), test_forwarding_to_the_owner_is_a_referral_not_a_loss_or_meeting() (+29 more)

### Community 18 - "setup.py"
Cohesion: 0.12
Nodes (7): _ask(), _ask_brain_config(), _ask_yes_no(), _print_harvey(), _print_step(), SetupWizard, _test_claude()

### Community 19 - "_state"
Cohesion: 0.12
Nodes (16): add_feedback(), _discovery_queries(), estimate_discovery(), outbox_approve(), outbox_approve_all(), outbox_reject(), preview_cohort(), save_env_settings() (+8 more)

### Community 20 - "field_validator"
Cohesion: 0.14
Nodes (4): UsageConfig, WhatsAppChannelConfig, test_notify_group_must_be_a_group_jid(), test_whatsapp_config_validation()

### Community 21 - "asyncio"
Cohesion: 0.06
Nodes (34): is_auto_message(), wants_opt_out_pt(), is_mobile(), _parse_ts(), _at(), fast_polling(), scraper_transport(), staged_agent() (+26 more)

### Community 22 - "ia"
Cohesion: 0.12
Nodes (35): ai(), bi(), ci(), ef(), Eh(), fb(), $g(), gf() (+27 more)

### Community 23 - "test_microsoft.py"
Cohesion: 0.17
Nodes (29): Env, _handler_with_prospect(), message(), provider(), test_a_bad_later_page_fails_the_whole_read(), test_bad_later_page_holds_sends_and_handles_nothing(), test_empty_202_and_204_are_success(), test_empty_inbox_is_an_empty_list() (+21 more)

### Community 25 - "ri"
Cohesion: 0.13
Nodes (47): aa(), ac(), Bf(), dh(), b(), c(), d(), e() (+39 more)

### Community 26 - "dashboard.py"
Cohesion: 0.06
Nodes (28): active_brain_status(), _active_brain(), _active_provider(), _brain_status(), dashboard(), export_prospects(), get_activity(), get_campaigns() (+20 more)

### Community 27 - "pytest"
Cohesion: 0.07
Nodes (38): ChannelsConfig, ComplianceConfig, ConfigError, ConfigFileNotFoundError, DiscoveryConfig, EmailChannelConfig, _find_config_file(), _format_validation_error() (+30 more)

### Community 28 - "test_codex_soak.py"
Cohesion: 0.16
Nodes (11): _alive(), _native_identity(), soak(), brain(), client(), entries(), pids(), test_soak_cancellation_storm() (+3 more)

### Community 29 - "test_codex_cli_surface.py"
Cohesion: 0.07
Nodes (20): find_codex(), attacker(), _Attacker, _bundled_catalog(), _fake_native_login(), _hostile_routes(), _jwt(), mock_codex() (+12 more)

### Community 30 - "test_codex.py"
Cohesion: 0.10
Nodes (42): _alive(), _client(), _leftover_runtimes(), test_attempted_tool_use_aborts_the_call(), test_blocked_prompt_write_is_bounded_by_the_deadline(), test_calls_are_serialized(), test_cancellation_kills_the_runtime(), test_code_mode_model_runs_with_a_private_text_catalog() (+34 more)

### Community 31 - "test_collectors_profile.py"
Cohesion: 0.16
Nodes (14): title_looks_like_role(), collector(), test_agency_descriptive_anchor_scores_lower_but_records(), test_agency_detected_from_strong_credit(), test_bare_link_is_not_recorded(), test_benign_footer_links_ignored(), test_clean_page_has_no_false_tech(), test_only_confirmed_signals_are_collected() (+6 more)

### Community 32 - "WhatsAppAgent"
Cohesion: 0.06
Nodes (4): _now(), WhatsAppAgent, _run(), whatsapp_persona_name()

### Community 33 - "Brain"
Cohesion: 0.08
Nodes (8): Sender, Brain, CodexQuotaClient, EnvConfig, decide_next_action(), heartbeat(), _interruptible_sleep(), whatsapp_watcher()

### Community 35 - "codex.py"
Cohesion: 0.08
Nodes (25): attest_hooks(), attest_mcp_status(), attest_thread(), build_access_snapshot(), build_thread_config(), build_thread_params(), describe_catalog(), describe_model() (+17 more)

### Community 36 - "test_signals_export.py"
Cohesion: 0.12
Nodes (15): cmd_export(), _export(), collect_prospects(), export_prospects_csv(), to_csv(), detect_tech(), _get_compiled(), _seed_prospects() (+7 more)

### Community 37 - ".init_db"
Cohesion: 0.03
Nodes (28): _outbox(), _signals(), _status(), _usage(), _stats(), _new_id(), StateManager, _utcnow() (+20 more)

### Community 38 - "pre_codex_harvey_0_2_1.sql"
Cohesion: 0.08
Nodes (44): actions, campaigns, companies, conversations, email_patterns, feedback, idx_actions_created_at, idx_campaigns_status (+36 more)

### Community 39 - "xk"
Cohesion: 0.07
Nodes (44): af(), B(), bj(), Bk(), cf(), $d(), Db(), Dc() (+36 more)

### Community 40 - "Handler"
Cohesion: 0.06
Nodes (3): Handler, requested_next_step(), test_reply_dedup_distinct_ids()

### Community 41 - "react.js"
Cohesion: 0.09
Nodes (28): [0.2.0] — 2026-09-13, Added, Changed, Fixed, Security, B(), C(), D() (+20 more)

### Community 42 - "harvey"
Cohesion: 0.07
Nodes (27): DISABLE_TELEMETRY, GMAPS_SCRAPER_URL, command, environment, image, ports, restart, volumes (+19 more)

### Community 43 - "discover.py"
Cohesion: 0.09
Nodes (14): cmd_discover(), _discover(), build_queries(), DiscoveryQuery, DiscoveryReport, estimate_cost(), geocode_city(), is_junk() (+6 more)

### Community 44 - "Ce"
Cohesion: 0.07
Nodes (40): Ag(), bc(), Bd(), be(), Bg(), Ce(), Cg(), df() (+32 more)

### Community 45 - "test_dashboard_signals.py"
Cohesion: 0.07
Nodes (8): _seed_observations(), test_cohort_is_a_set_intersection(), test_cohort_with_no_requirements_is_empty_not_everything(), test_confirming_before_the_catalog_loads_still_works(), test_cost_notes_are_machine_classifiable(), test_reseeding_never_overrides_a_users_decision(), test_signal_counts_surface_in_the_review_ui(), test_signals_seed_as_proposed_not_confirmed()

### Community 46 - "steps"
Cohesion: 0.07
Nodes (26): HARVEY_CODEX_CLI_TESTS, HARVEY_PACKAGE_TESTS, jobs, test, os, python, name, on (+18 more)

### Community 48 - "m"
Cohesion: 0.12
Nodes (25): Cc(), cd(), Eg(), Gk(), $h(), jd(), Kh(), Kk() (+17 more)

### Community 49 - "test_discover.py"
Cohesion: 0.05
Nodes (41): OpenStreetMap, biz(), _client(), config(), FakeProvider, _geo_client(), offline(), register() (+33 more)

### Community 50 - "index.js"
Cohesion: 0.21
Nodes (12): Button(), IconButton(), ActivityCard(), ArtifactCard(), KIND, ProgressCard(), SegmentBar(), Dialog() (+4 more)

### Community 51 - "get_setup_status"
Cohesion: 0.15
Nodes (6): _current_provider(), get_settings(), get_setup_status(), _read_env_file(), _resolve_config_file(), _write_env_file()

### Community 52 - "test_collectors_profile.py"
Cohesion: 0.13
Nodes (3): profile_companies(), ProfileCollector, add()

### Community 54 - "email_finder.py"
Cohesion: 0.15
Nodes (10): detect_catch_all(), _hunter_api_key(), hunter_domain_people(), _hunter_usage_key(), record_hunter_search(), _verify_candidate(), verify_email_smtp(), verify_hunter() (+2 more)

### Community 55 - "test_brain_provider.py"
Cohesion: 0.04
Nodes (52): CodexResult, BrainConfig, _answering(), _capture_exec(), fake_exec(), client(), _codex_brain(), _codex_platform() (+44 more)

### Community 57 - "test_instantly_path_leaves_the_reply_unprocessed_when_the_brain_is_down"
Cohesion: 0.11
Nodes (5): BrainUnavailable, _DownBrain, test_instantly_path_leaves_the_reply_unprocessed_when_the_brain_is_down(), active(), test_instantly_reply_survives_an_outage_while_drafting()

### Community 58 - "PreclearedConfig"
Cohesion: 0.17
Nodes (5): PreclearedConfig, Env, test_check_is_off_unless_enabled(), test_config_needs_a_sender_country_when_enabled(), test_from_config_reads_settings_key_and_pitch()

### Community 59 - "MailProvider"
Cohesion: 0.14
Nodes (4): For developers, get_mail_provider(), MailProvider, test_registry_builds_the_microsoft_provider()

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
Nodes (14): _AppServer, _classify_turn_error(), CodexClient, CodexError, _kill_tree(), parse_cli_version(), _remaining(), require_supported_platform() (+6 more)

### Community 67 - "test_email_finder.py"
Cohesion: 0.14
Nodes (11): build_email(), classify_mx(), _clean_name_part(), generate_patterns(), infer_pattern_from_email(), _status_from_verdict(), test_build_email_patterns(), test_classify_mx() (+3 more)

### Community 68 - ".run_cycles"
Cohesion: 0.16
Nodes (6): _approved_item(), test_approved_email_is_delivered_once_across_cycles(), test_fixture_transport_is_the_only_mail_path(), test_mailbox_error_holds_sends_until_replies_can_be_read(), test_timed_out_reply_handling_holds_sends(), test_writer_drafts_through_codex_and_waits_for_approval()

### Community 69 - "Cold Email Copywriting"
Cohesion: 0.06
Nodes (30): Adjustments by prospect, Bad personalization, Bad subjects, Banned Formatting, Banned Patterns, Campaign Variety, Cold Email Copywriting, Compliance & Deliverability (Overrides Everything Below) (+22 more)

### Community 70 - "check_native_auth"
Cohesion: 0.14
Nodes (7): check_native_auth(), _load_native_auth(), native_codex_home(), test_windows_setup_checks_refuse_codex(), test_api_key_login_is_refused(), test_external_token_login_is_refused(), test_missing_login_is_actionable()

### Community 72 - "package.json"
Cohesion: 0.05
Nodes (39): adherence, restrictedImports, syntax, variants, devDependencies, esbuild@0.25.12, eslint@9.39.1, react@18.3.1 (+31 more)

### Community 73 - ".add_outbox_item"
Cohesion: 0.14
Nodes (19): pending_followup(), test_cold_daily_cap_does_not_hold_an_approved_followup(), test_due_followup_precedes_more_than_sixty_older_cold_messages(), test_fast_watcher_leaves_followups_for_the_heartbeat(), test_followup_rechecks_customer_and_conversation_before_sending(), followups(), _now_iso(), quiet_conversation() (+11 more)

### Community 74 - "Badge.jsx"
Cohesion: 0.24
Nodes (9): Badge(), Count(), STATUS_COLORS, StatusDot(), KanbanColumn(), TaskCardProps, TaskTag, TaskCard() (+1 more)

### Community 76 - "Harness"
Cohesion: 0.15
Nodes (3): Usar e manter, Harness, harvey()

### Community 77 - "FakeWa"
Cohesion: 0.13
Nodes (3): WaSendResult, fail(), FakeWa

### Community 78 - "Prospect"
Cohesion: 0.06
Nodes (38): Prospect, _norm(), _Cfg, channels, email, test_migration_downgrades_legacy_verified(), test_prospect_email_status_roundtrips(), test_save_email_pattern_keeps_highest_confidence() (+30 more)

### Community 79 - "Harvey"
Cohesion: 0.06
Nodes (32): 1. DISCOVER — who exists, 2. PROFILE — what they are, 3. ENRICH — who decides, 4. VERIFY — can you reach them, Changelog, Commands, Configuration, Design system (+24 more)

### Community 80 - "DIY Prospecting Tactics"
Cohesion: 0.09
Nodes (22): Catch-All Domains, Common Email Formats (in order of prevalence), Daily Prospecting Quotas, DIY Prospecting Tactics, Find Companies in an Industry, Find Company Team Pages, Find Email Patterns, Find LinkedIn Profiles (+14 more)

### Community 81 - "microsoft.py"
Cohesion: 0.20
Nodes (7): _LoopbackServer, _LoopbackServerV6, _pkce_pair(), run_auth_flow(), _save_token(), _token_url(), test_pkce_challenge_matches_verifier()

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

### Community 86 - "test_codex_e2e.py"
Cohesion: 0.18
Nodes (6): _load_pre_codex_db(), _none(), test_a_reply_cancels_its_due_follow_up_before_the_send_phase(), test_pre_codex_database_migrates_and_runs_on_codex(), test_restart_clears_a_stale_paused_status(), test_switching_providers_keeps_counters_and_budgets_separate()

### Community 87 - "Offer Strategy & Closing Mechanics"
Cohesion: 0.11
Nodes (17): Closing Mechanics: How to Book, Cold Email Sequence (3 emails), Core Rule: Earn the Right to Ask, Crafting Offers from Product Knowledge, Example Offer Structures, Handling "What's the Price?", Language Rules, Offer Construction Framework (+9 more)

### Community 88 - "state.py"
Cohesion: 0.04
Nodes (22): _plain(), _skeleton(), _strip_code(), _text(), GateResult, pre_send_check(), pre_send_check_whatsapp(), in_quiet_hours() (+14 more)

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
Cohesion: 0.33
Nodes (3): night_step(), queue_size(), search_pairs()

### Community 97 - "Como a Vitrine funciona na prática (fatos confirmados no código do produto)"
Cohesion: 0.14
Nodes (13): As artes do plano Pro (resposta definitiva), Cadastro dos produtos e Prévia Assistida (Concierge), Como a Vitrine funciona na prática (fatos confirmados no código do produto), Como responder as dúvidas mais comuns, Descubra o que o cliente quer e adapte a conversa, Domínio e endereço, Fatos do produto e fatos da loja, Loja Modelo (Demonstração) e Teste Grátis (+5 more)

### Community 98 - "proposal.py"
Cohesion: 0.31
Nodes (6): build_proposal_html(), pick_theme(), proposal_filename(), render_proposal_pdf(), store_monogram(), store_slug()

### Community 99 - "ios-frame.jsx"
Cohesion: 0.39
Nodes (5): IOSDevice(), IOSGlassPill(), IOSKeyboard(), IOSNavBar(), IOSStatusBar()

### Community 100 - "harvey.yaml"
Cohesion: 0.25
Nodes (7): end, start, timezone, heartbeat_interval_minutes, max_daily_claude_percent, quiet_hours, usage

### Community 101 - "json"
Cohesion: 0.06
Nodes (21): parse_brain_status(), get_oauth_token(), _keychain_services(), _parse_window(), QuotaClient, _token_from_json_blob(), claude_config_dir(), answer_for() (+13 more)

### Community 102 - "derive_pattern"
Cohesion: 0.18
Nodes (10): derive_pattern(), _hunter_monthly_cap(), hunter_searches_remaining(), test_derive_pattern_default_no_signal(), test_derive_pattern_from_known_email(), test_derive_pattern_spends_and_respects_hunter_budget(), test_derive_pattern_uses_cache(), test_find_email_no_mx_is_invalid() (+2 more)

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
Cohesion: 0.17
Nodes (16): cold_status(), answered(), contacted(), status(), test_a_cap_of_zero_reads_as_a_setting_not_as_a_day_that_ran_out(), test_a_reply_from_someone_never_messaged_cold_is_not_counted(), test_a_second_message_to_the_same_person_is_one_cold_contact(), test_a_switch_beats_a_clock_which_beats_a_cap() (+8 more)

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
Cohesion: 0.23
Nodes (16): FakeProvider, make_handler(), _now_iso(), seed_campaign(), seed_prospect(), test_bounce_marks_invalid_and_kill_switch(), test_drain_gate_failure_marks_failed(), test_drain_respects_kill_switch() (+8 more)

### Community 113 - "persona"
Cohesion: 0.29
Nodes (7): persona, company, email, linkedin, name, role, tone

### Community 114 - "GmailProvider"
Cohesion: 0.19
Nodes (4): cmd_gmail(), _test(), GmailProvider, _load_token()

### Community 116 - "design-system/README.md"
Cohesion: 0.18
Nodes (8): Abrir as referências, Build, lint e validação, Design system do Harvey, Proveniência, Comparações e escolhas, Relatório de triagem e integração, Resultado, Validação

### Community 117 - "Sending from a Microsoft 365 mailbox"
Cohesion: 0.20
Nodes (10): 1. Register an app in Entra ID, 2. Configure Harvey, 3. Sign in once, Deliverability notes, How it behaves, If you see "Need admin approval", Sending from a Microsoft 365 mailbox, Setup (+2 more)

### Community 118 - "Signal-Based Outreach Playbook"
Cohesion: 0.18
Nodes (10): Following up on a signal, Funding signal (recent raise), Hiring signal (they're hiring for a relevant role), New-domain / new-business signal, Signal → angle map, Signal-Based Outreach Playbook, Tech-stack signal (a tool detected on their site), The core rule (+2 more)

### Community 119 - "Harvey — Autonomous AI Sales Agent"
Cohesion: 0.12
Nodes (16): After Setup — Ongoing Help, Design system development, Explaining Harvey to Users, graphify, Harvey — Autonomous AI Sales Agent, Quick health check (do this silently):, Setup Flow, Step 1: Install Dependencies (+8 more)

### Community 121 - "discovery"
Cohesion: 0.33
Nodes (6): discovery, cities, night_shift, provider, queue_target, results_per_search

### Community 124 - "MetricCard.jsx"
Cohesion: 0.50
Nodes (4): MetricCard(), MiniChart(), TEXT, TONES

### Community 125 - "precleared"
Cohesion: 0.40
Nodes (5): compliance, precleared, address_source, enabled, sender_country

### Community 126 - "Graph"
Cohesion: 0.25
Nodes (5): graph(), Graph, bad_draft(), test_malformed_identity_response_raises(), not_json()

### Community 128 - "asyncio"
Cohesion: 0.15
Nodes (21): has_own_website(), make_agent(), seed_company(), test_a_reply_frees_a_slot_under_the_unanswered_cap(), test_any_shop_that_sells_products_fits_but_services_do_not(), test_auto_greeting_or_ooo_gets_a_single_followup_after_two_hours(), test_client_not_configured(), test_cold_gaps_are_random_and_fill_the_day() (+13 more)

### Community 129 - "test_outage_during_the_handler_holds_queued_sends_until_recovery"
Cohesion: 0.29
Nodes (3): test_outage_during_the_handler_holds_queued_sends_until_recovery(), test_outage_while_drafting_the_reply_loses_nothing_and_duplicates_nothing(), after_outage()

### Community 130 - "test_a_message_that_fails_to_process_holds_that_cycles_sends"
Cohesion: 0.29
Nodes (4): test_a_message_that_fails_to_process_holds_that_cycles_sends(), test_isolation_failure_mid_cycle_leaves_the_reply_for_later(), after_first(), check_paused()

### Community 131 - "_check_harvey_pid"
Cohesion: 0.33
Nodes (3): _check_harvey_pid(), start_harvey(), stop_harvey()

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

### Community 136 - "Cfg"
Cohesion: 0.33
Nodes (6): Cfg, channels, email, linkedin, persona, product

### Community 137 - "Skills"
Cohesion: 0.29
Nodes (6): Adding or Editing Skills, Auto-Generated Skills, Built-in Skills, How Skills Work, Skill → Agent Mapping, Skills

### Community 139 - "MCP Tools: code-review-graph"
Cohesion: 0.40
Nodes (5): Key Tools, MCP Tools: code-review-graph, Verify in the source, When to use graph tools FIRST, Workflow

### Community 208 - "How Harvey Works (Technical Reference)"
Cohesion: 0.29
Nodes (7): Architecture, Common Issues, Conversation Stages, How Harvey Works (Technical Reference), Key Commands, Priority Order, Sub-Agents

### Community 209 - "attest_effective_config"
Cohesion: 0.33
Nodes (5): attest_effective_config(), _find_custom_endpoint(), _good_effective_config(), test_attest_effective_config_rejects_custom_routes(), test_attest_effective_config_requires_every_lockdown_setting()

### Community 211 - "os"
Cohesion: 0.14
Nodes (6): check_cli_version(), _FakeProcess, test_brain_runs_claude_with_no_tools(), fake_exec(), test_installed_wheel_runs_codex_without_the_checkout(), state()

### Community 212 - "._run"
Cohesion: 0.12
Nodes (11): bucket_applies(), _iso_from_unix(), mark_exhausted(), normalize_usage(), parse_rate_limits(), select_rate_limits(), _Turn, _usage_blocked() (+3 more)

### Community 213 - "build_private_config_toml"
Cohesion: 0.25
Nodes (3): build_private_config_toml(), _toml_value(), test_private_config_is_valid_toml_with_every_feature_off()

### Community 215 - "_hunter_domain_pattern"
Cohesion: 0.40
Nodes (3): _hunter_domain_pattern(), _translate_hunter_pattern(), test_translate_hunter_pattern()

### Community 219 - "test_whatsapp.py"
Cohesion: 0.09
Nodes (18): _client(), _env(), test_a_connected_session_answering_not_ready_is_restarted(), test_a_flapping_socket_cannot_declare_a_number_unreachable(), test_a_positive_check_needs_no_second_opinion(), test_a_send_to_a_vanished_session_marks_it_not_ready(), test_a_settled_socket_may_declare_a_number_unreachable(), test_client_connection_states() (+10 more)

## Knowledge Gaps
- **2 isolated node(s):** `uvx`, `harvey`
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 1497 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **89 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `StateManager` connect `.init_db` to `asyncio`, `FakeProvider`, `._contacts_from_company`, `cli.py`, `Prospect`, `Company`, `Trainer`, `make_handler`, `setup.py`, `_state`, `asyncio`, `test_microsoft.py`, `Writer`, `dashboard.py`, `pytest`, `test_codex_soak.py`, `test_codex_cli_surface.py`, `test_collectors_profile.py`, `WhatsAppAgent`, `Brain`, `test_signals_export.py`, `Handler`, `discover.py`, `test_dashboard_signals.py`, `test_discover.py`, `test_brain_provider.py`, `._find_companies_via_directories`, `test_instantly_path_leaves_the_reply_unprocessed_when_the_brain_is_down`, `test_codex_platform.py`, `test_whatsapp_metrics.py`, `._fetch`, `test_email_finder.py`, `.add_outbox_item`, `Analyst`, `Harness`, `Prospect`, `os`, `test_codex_e2e.py`, `state.py`, `json`, `test_outreach_metrics.py`, `test_outbox_native.py`?**
  _High betweenness centrality (0.258) - this node is a cross-community bridge._
- **Are the 46 inferred relationships involving `StateManager` (e.g. with `Analyst` and `Handler`) actually correct?**
  _`StateManager` has 46 INFERRED edges - model-reasoned connections that need verification._
- **What connects `uvx`, `harvey` to the rest of the system?**
  _2 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `MicrosoftProvider` be split into smaller, more focused modules?**
  _Cohesion score 0.13333333333333333 - nodes in this community are weakly interconnected._
- **Why does `[0.2.0] — 2026-09-13` connect `react.js` to `Changelog`?**
  _High betweenness centrality (0.156) - this node is a cross-community bridge._
- **Are the 33 inferred relationships involving `Prospect` (e.g. with `Handler` and `Scout`) actually correct?**
  _`Prospect` has 33 INFERRED edges - model-reasoned connections that need verification._
- **Should `react-dom.js` be split into smaller, more focused modules?**
  _Cohesion score 0.04741000877963126 - nodes in this community are weakly interconnected._
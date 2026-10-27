# test_codex.py

> 37 nodes · cohesion 0.15

## Key Concepts

- **test_codex.py** (83 connections) — `tests/test_codex.py`
- **_client()** (44 connections) — `tests/test_codex.py`
- **asyncio** (39 connections)
- **parametrize** (9 connections)
- **test_attempted_tool_use_aborts_the_call()** (6 connections) — `tests/test_codex.py`
- **test_native_login_is_never_modified()** (5 connections) — `tests/test_codex.py`
- **test_queued_call_rechecks_the_pause_after_getting_the_lock()** (4 connections) — `tests/test_codex.py`
- **test_temp_folder_failure_is_a_codex_error()** (4 connections) — `tests/test_codex.py`
- **test_unsafe_config_is_caught_before_the_login_is_exposed()** (4 connections) — `tests/test_codex.py`
- **test_unsafe_or_unverifiable_state_never_sends_the_prompt()** (4 connections) — `tests/test_codex.py`
- **test_unverified_codex_version_is_refused_before_login()** (4 connections) — `tests/test_codex.py`
- **test_waiting_for_the_lock_counts_against_the_deadline()** (4 connections) — `tests/test_codex.py`
- **test_calls_are_serialized()** (3 connections) — `tests/test_codex.py`
- **test_code_mode_model_runs_with_a_private_text_catalog()** (3 connections) — `tests/test_codex.py`
- **test_commentary_alone_is_not_an_answer()** (3 connections) — `tests/test_codex.py`
- **test_every_isolation_check_happens_before_the_prompt()** (3 connections) — `tests/test_codex.py`
- **test_exhausted_plan_reads_as_full()** (3 connections) — `tests/test_codex.py`
- **test_inherited_mcp_is_disabled_and_attested()** (3 connections) — `tests/test_codex.py`
- **test_known_denial_without_windows_still_reads_as_full()** (3 connections) — `tests/test_codex.py`
- **test_late_commentary_does_not_replace_the_final_answer()** (3 connections) — `tests/test_codex.py`
- **test_model_substitution_is_refused()** (3 connections) — `tests/test_codex.py`
- **test_private_runtime_environment()** (3 connections) — `tests/test_codex.py`
- **test_rate_limit_reads_attest_the_route_too()** (3 connections) — `tests/test_codex.py`
- **test_rate_limits_for_a_model_with_its_own_bucket()** (3 connections) — `tests/test_codex.py`
- **test_rate_limits_read_sends_no_prompt()** (3 connections) — `tests/test_codex.py`
- *... and 12 more nodes in this community*

## Relationships

- [_leftover_runtimes](_leftover_runtimes.md) (25 shared connections)
- [_write_login](_write_login.md) (12 shared connections)
- [codex.py](codex.py.md) (6 shared connections)
- [test_codex_platform.py](test_codex_platform.py.md) (6 shared connections)
- [state.py](state.py.md) (4 shared connections)
- [attest_effective_config](attest_effective_config.md) (4 shared connections)
- [check_native_auth](check_native_auth.md) (3 shared connections)
- [json](json.md) (2 shared connections)
- [build_access_snapshot](build_access_snapshot.md) (2 shared connections)
- [check_cli_version](check_cli_version.md) (2 shared connections)
- [CodexQuotaClient](CodexQuotaClient.md) (2 shared connections)
- [._on_turn_message](_on_turn_message.md) (2 shared connections)

## Source Files

- `tests/test_codex.py`

## Audit Trail

- EXTRACTED: 176 (99%)
- INFERRED: 2 (1%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
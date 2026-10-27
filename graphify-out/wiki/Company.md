# Company

> 52 nodes · cohesion 0.09

## Key Concepts

- **Company** (52 connections) — `harvey/models/company.py`
- **test_pipeline.py** (38 connections) — `tests/test_pipeline.py`
- **.add_company()** (29 connections) — `harvey/state.py`
- **asyncio** (17 connections)
- **.add_observation()** (11 connections) — `harvey/state.py`
- **chain()** (11 connections) — `tests/test_pipeline.py`
- **.count_companies_needing_profile()** (10 connections) — `harvey/state.py`
- **_seed_observations()** (10 connections) — `tests/test_dashboard_signals.py`
- **test_a_false_boolean_is_recorded_but_not_in_the_cohort()** (9 connections) — `tests/test_pipeline.py`
- **.cohort()** (8 connections) — `harvey/state.py`
- **test_a_cohort_reflects_the_newest_observation()** (8 connections) — `tests/test_pipeline.py`
- **test_a_stale_profile_comes_back_round()** (7 connections) — `tests/test_pipeline.py`
- **test_discovery_observations_do_not_count_as_a_profile()** (7 connections) — `tests/test_pipeline.py`
- **test_exclusions_also_read_the_value()** (7 connections) — `tests/test_pipeline.py`
- **test_text_signals_count_by_their_existence()** (7 connections) — `tests/test_pipeline.py`
- **.get_observations()** (6 connections) — `harvey/state.py`
- **state()** (6 connections) — `tests/test_pipeline.py`
- **test_a_new_company_needs_profiling()** (6 connections) — `tests/test_pipeline.py`
- **test_a_profiled_company_drops_out()** (6 connections) — `tests/test_pipeline.py`
- **test_profiling_sweeps_up_what_an_earlier_run_left()** (6 connections) — `tests/test_pipeline.py`
- **test_state_summary_reports_the_profiling_backlog()** (6 connections) — `tests/test_pipeline.py`
- **test_websiteless_companies_are_never_queued_for_profiling()** (6 connections) — `tests/test_pipeline.py`
- **test_company_signals_roundtrip_and_merge()** (6 connections) — `tests/test_signals_export.py`
- **test_profiling_runs_even_when_discovery_finds_nothing()** (5 connections) — `tests/test_pipeline.py`
- **test_a_dry_run_neither_discovers_nor_profiles()** (4 connections) — `tests/test_pipeline.py`
- *... and 27 more nodes in this community*

## Relationships

- [StateManager](StateManager.md) (25 shared connections)
- [test_state_extra.py](test_state_extra.py.md) (9 shared connections)
- [Prospect](Prospect.md) (7 shared connections)
- [asyncio](asyncio.md) (7 shared connections)
- [test_state.py](test_state.py.md) (7 shared connections)
- [test_dashboard_signals.py](test_dashboard_signals.py.md) (5 shared connections)
- [cli.py](cli.py.md) (5 shared connections)
- [discover.py](discover.py.md) (4 shared connections)
- [.set_signal_status](set_signal_status.md) (4 shared connections)
- [state.py](state.py.md) (3 shared connections)
- [test_signals_export.py](test_signals_export.py.md) (3 shared connections)
- [.init_db](init_db.md) (3 shared connections)

## Source Files

- `harvey/models/company.py`
- `harvey/state.py`
- `tests/test_dashboard_signals.py`
- `tests/test_pipeline.py`
- `tests/test_signals_export.py`

## Audit Trail

- EXTRACTED: 143 (67%)
- INFERRED: 70 (33%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
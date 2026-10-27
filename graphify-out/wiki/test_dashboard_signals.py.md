# test_dashboard_signals.py

> 27 nodes · cohesion 0.07

## Key Concepts

- **test_dashboard_signals.py** (31 connections) — `tests/test_dashboard_signals.py`
- **signals.py** (6 connections) — `harvey/signals.py`
- **fastapi_testclient** (2 connections)
- **test_cohort_is_a_set_intersection()** (2 connections) — `tests/test_dashboard_signals.py`
- **test_cohort_with_no_requirements_is_empty_not_everything()** (2 connections) — `tests/test_dashboard_signals.py`
- **test_confirming_before_the_catalog_loads_still_works()** (2 connections) — `tests/test_dashboard_signals.py`
- **test_cost_notes_are_machine_classifiable()** (2 connections) — `tests/test_dashboard_signals.py`
- **test_reseeding_never_overrides_a_users_decision()** (2 connections) — `tests/test_dashboard_signals.py`
- **test_signal_counts_surface_in_the_review_ui()** (2 connections) — `tests/test_dashboard_signals.py`
- **test_signals_seed_as_proposed_not_confirmed()** (2 connections) — `tests/test_dashboard_signals.py`
- **The signal vocabulary Harvey proposes, and the user confirms. Harvey never…** (1 connections) — `harvey/signals.py`
- **Dashboard API for the signal-confirmation gate, cohorts, and Today. These cover…** (1 connections) — `tests/test_dashboard_signals.py`
- **An empty cohort must never mean 'select all' — that would silently turn a mis-…** (1 connections) — `tests/test_dashboard_signals.py`
- **`harvey signals --confirm free` and the dashboard's green/amber cost chip both…** (1 connections) — `tests/test_dashboard_signals.py`
- **Harvey proposes. Nothing is live until a human says so.** (1 connections) — `tests/test_dashboard_signals.py`
- **Every /api/signals load re-seeds so upgrades add new signals. It must not…** (1 connections) — `tests/test_dashboard_signals.py`
- **A confirm can arrive before anything has read /api/signals. It must seed the…** (1 connections) — `tests/test_dashboard_signals.py`
- **test_confirm_and_reject_signals()** (1 connections) — `tests/test_dashboard_signals.py`
- **test_dashboard_serves_its_files()** (1 connections) — `tests/test_dashboard_signals.py`
- **test_every_signal_has_a_category_the_ui_renders()** (1 connections) — `tests/test_dashboard_signals.py`
- **test_invalid_status_is_rejected()** (1 connections) — `tests/test_dashboard_signals.py`
- **test_signals_grouped_with_plain_language()** (1 connections) — `tests/test_dashboard_signals.py`
- **test_static_route_refuses_to_escape_the_web_directory()** (1 connections) — `tests/test_dashboard_signals.py`
- **test_today_flags_a_fully_rejected_vocabulary()** (1 connections) — `tests/test_dashboard_signals.py`
- **test_today_leads_with_unconfirmed_signals()** (1 connections) — `tests/test_dashboard_signals.py`
- *... and 2 more nodes in this community*

## Relationships

- [Company](Company.md) (5 shared connections)
- [cli.py](cli.py.md) (2 shared connections)
- [state.py](state.py.md) (2 shared connections)
- [test_brain_provider.py](test_brain_provider.py.md) (1 shared connections)
- [test_collectors_profile.py](test_collectors_profile.py.md) (1 shared connections)
- [test_discover.py](test_discover.py.md) (1 shared connections)
- [pytest](pytest.md) (1 shared connections)
- [dashboard.py](dashboard.py.md) (1 shared connections)
- [StateManager](StateManager.md) (1 shared connections)
- [.init_db](init_db.md) (1 shared connections)
- [client](client.md) (1 shared connections)
- [test_dashboard_text_is_utf8_with_windows_default_encoding](test_dashboard_text_is_utf8_with_windows_default_encoding.md) (1 shared connections)

## Source Files

- `harvey/signals.py`
- `tests/test_dashboard_signals.py`

## Audit Trail

- EXTRACTED: 44 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
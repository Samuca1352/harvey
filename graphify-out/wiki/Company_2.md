# Company

> God node · 52 connections · `harvey/models/company.py`

**Community:** [Company](Company.md)

## Connections by Relation

### calls
- seed_company() `EXTRACTED`
- _seed_observations() `EXTRACTED`
- test_a_false_boolean_is_recorded_but_not_in_the_cohort() `EXTRACTED`
- test_a_cohort_reflects_the_newest_observation() `EXTRACTED`
- test_a_stale_profile_comes_back_round() `EXTRACTED`
- test_discovery_observations_do_not_count_as_a_profile() `EXTRACTED`
- test_exclusions_also_read_the_value() `EXTRACTED`
- test_text_signals_count_by_their_existence() `EXTRACTED`
- test_excluded_industries_are_never_messaged() `EXTRACTED`
- ._ensure_company() `EXTRACTED`
- _upsert() `EXTRACTED`
- test_a_new_company_needs_profiling() `EXTRACTED`
- test_a_profiled_company_drops_out() `EXTRACTED`
- test_profiling_sweeps_up_what_an_earlier_run_left() `EXTRACTED`
- test_state_summary_reports_the_profiling_backlog() `EXTRACTED`
- test_websiteless_companies_are_never_queued_for_profiling() `EXTRACTED`
- test_any_shop_that_sells_products_fits_but_services_do_not() `EXTRACTED`
- test_profiling_runs_even_when_discovery_finds_nothing() `EXTRACTED`
- test_company_all_fields_default_empty() `EXTRACTED`
- test_company_defaults() `EXTRACTED`

### contains
- company.py `EXTRACTED`

### imports
- [test_whatsapp.py](test_whatsapp.py.md) `EXTRACTED`
- [state.py](state.py.md) `EXTRACTED`
- [test_state_extra.py](test_state_extra.py.md) `EXTRACTED`
- [discover.py](discover.py.md) `EXTRACTED`
- test_pipeline.py `EXTRACTED`
- test_models_extra.py `EXTRACTED`
- scout.py `EXTRACTED`
- [test_collectors_profile.py](test_collectors_profile.py.md) `EXTRACTED`
- [test_dashboard_signals.py](test_dashboard_signals.py.md) `EXTRACTED`
- [test_signals_export.py](test_signals_export.py.md) `EXTRACTED`
- [test_state.py](test_state.py.md) `EXTRACTED`
- test_models.py `EXTRACTED`
- models/__init__.py `EXTRACTED`

### inherits
- BaseModel `EXTRACTED`

### method
- ._normalize_domain() `EXTRACTED`

### references
- .add_company() `EXTRACTED`
- .get_company() `EXTRACTED`
- ._company_from_row() `EXTRACTED`
- .get_company_by_domain() `EXTRACTED`
- .get_company_by_external_id() `EXTRACTED`
- .get_companies_needing_whatsapp_prospect() `EXTRACTED`

### uses
- [StateManager](StateManager.md) `INFERRED`
- [Scout](Scout.md) `INFERRED`
- test_only_confirmed_signals_are_collected() `INFERRED`
- test_contacts_for_company() `INFERRED`
- test_company_signals_roundtrip_and_merge() `INFERRED`
- test_add_company_same_id_is_ignored() `INFERRED`
- test_get_company_by_id() `INFERRED`
- test_add_and_get_company() `INFERRED`
- test_company_exists() `INFERRED`
- test_add_company_generates_id_when_missing() `INFERRED`

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
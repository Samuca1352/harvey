# StateManager

> 110 nodes · cohesion 0.04

## Key Concepts

- **StateManager** (208 connections) — `harvey/state.py`
- **._connect()** (84 connections) — `harvey/state.py`
- **_new_id()** (14 connections) — `harvey/state.py`
- **.get_setting()** (14 connections) — `harvey/state.py`
- **_norm()** (12 connections) — `harvey/state.py`
- **_usage()** (11 connections) — `harvey/cli.py`
- **.set_setting()** (11 connections) — `harvey/state.py`
- **_utcnow()** (11 connections) — `harvey/state.py`
- **.get_prospect_by_email()** (8 connections) — `harvey/state.py`
- **._prospect_from_row()** (8 connections) — `harvey/state.py`
- **.record_usage_event()** (8 connections) — `harvey/state.py`
- **.update_prospect_status()** (8 connections) — `harvey/state.py`
- **test_existing_usage_rows_become_claude()** (8 connections) — `tests/test_brain_provider.py`
- **_outbox()** (7 connections) — `harvey/cli.py`
- **._company_from_row()** (7 connections) — `harvey/state.py`
- **.get_company_by_domain()** (7 connections) — `harvey/state.py`
- **.get_email_pattern()** (7 connections) — `harvey/state.py`
- **.update_conversation()** (7 connections) — `harvey/state.py`
- **.usage_by_provider()** (7 connections) — `harvey/state.py`
- **._usage_grouped()** (7 connections) — `harvey/state.py`
- **.usage_totals()** (7 connections) — `harvey/state.py`
- **.add_observations()** (6 connections) — `harvey/state.py`
- **.approve_outbox()** (6 connections) — `harvey/state.py`
- **.get_company_by_external_id()** (6 connections) — `harvey/state.py`
- **.get_prospect_by_phone()** (6 connections) — `harvey/state.py`
- *... and 85 more nodes in this community*

## Relationships

- [asyncio](asyncio.md) (30 shared connections)
- [Company](Company.md) (25 shared connections)
- [test_state_extra.py](test_state_extra.py.md) (23 shared connections)
- [.init_db](init_db.md) (21 shared connections)
- [cli.py](cli.py.md) (18 shared connections)
- [state.py](state.py.md) (14 shared connections)
- [Campaign](Campaign.md) (11 shared connections)
- [test_state.py](test_state.py.md) (11 shared connections)
- [make_handler](make_handler.md) (10 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (9 shared connections)
- [main.py](main.py.md) (8 shared connections)
- [json](json.md) (7 shared connections)

## Source Files

- `harvey/cli.py`
- `harvey/state.py`
- `tests/test_brain_provider.py`
- `tests/test_state_extra.py`
- `tests/test_usage.py`

## Audit Trail

- EXTRACTED: 365 (73%)
- INFERRED: 137 (27%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
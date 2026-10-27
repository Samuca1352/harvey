# test_state_extra.py

> 28 nodes · cohesion 0.15

## Key Concepts

- **test_state_extra.py** (46 connections) — `tests/test_state_extra.py`
- **asyncio** (28 connections)
- **.add_prospect()** (23 connections) — `harvey/state.py`
- **test_state_summary_shape()** (10 connections) — `tests/test_state_extra.py`
- **.get_company()** (9 connections) — `harvey/state.py`
- **.prospect_exists()** (7 connections) — `harvey/state.py`
- **test_count_prospects_by_status()** (6 connections) — `tests/test_state_extra.py`
- **test_intent_and_stage_distribution()** (6 connections) — `tests/test_state_extra.py`
- **test_add_company_same_id_is_ignored()** (5 connections) — `tests/test_state_extra.py`
- **test_add_prospect_same_id_is_ignored()** (5 connections) — `tests/test_state_extra.py`
- **test_get_company_by_id()** (5 connections) — `tests/test_state_extra.py`
- **test_get_prospect_by_id_roundtrips_bools()** (5 connections) — `tests/test_state_extra.py`
- **test_prospect_exists_all_empty_args()** (5 connections) — `tests/test_state_extra.py`
- **test_prospect_exists_by_linkedin()** (5 connections) — `tests/test_state_extra.py`
- **test_prospect_exists_name_company_case_insensitive()** (5 connections) — `tests/test_state_extra.py`
- **test_add_company_generates_id_when_missing()** (4 connections) — `tests/test_state_extra.py`
- **test_get_company_missing_returns_none()** (4 connections) — `tests/test_state_extra.py`
- **test_init_db_creates_parent_dirs()** (4 connections) — `tests/test_state_extra.py`
- **test_init_db_is_idempotent()** (4 connections) — `tests/test_state_extra.py`
- **test_reply_dedup_distinct_ids()** (4 connections) — `tests/test_state_extra.py`
- **test_update_prospect_status_nonexistent_id_noop()** (4 connections) — `tests/test_state_extra.py`
- **test_get_prospect_by_email_empty_string()** (3 connections) — `tests/test_state_extra.py`
- **test_get_prospect_missing_returns_none()** (3 connections) — `tests/test_state_extra.py`
- **test_is_reply_processed_empty_id()** (3 connections) — `tests/test_state_extra.py`
- **test_log_action_with_and_without_details()** (3 connections) — `tests/test_state_extra.py`
- *... and 3 more nodes in this community*

## Relationships

- [StateManager](StateManager.md) (23 shared connections)
- [Prospect](Prospect.md) (13 shared connections)
- [Campaign](Campaign.md) (12 shared connections)
- [Conversation](Conversation.md) (10 shared connections)
- [Company](Company.md) (9 shared connections)
- [test_state.py](test_state.py.md) (7 shared connections)
- [asyncio](asyncio.md) (5 shared connections)
- [make_handler](make_handler.md) (5 shared connections)
- [test_email_wiring.py](test_email_wiring.py.md) (3 shared connections)
- [.init_db](init_db.md) (3 shared connections)
- [test_signals_export.py](test_signals_export.py.md) (1 shared connections)
- [email_finder.py](email_finder.py.md) (1 shared connections)

## Source Files

- `harvey/state.py`
- `tests/test_state_extra.py`

## Audit Trail

- EXTRACTED: 87 (56%)
- INFERRED: 67 (44%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
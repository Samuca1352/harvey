# test_state.py

> 15 nodes · cohesion 0.21

## Key Concepts

- **test_state.py** (21 connections) — `tests/test_state.py`
- **asyncio** (9 connections)
- **test_contacts_for_company()** (7 connections) — `tests/test_state.py`
- **.increment_usage()** (6 connections) — `harvey/state.py`
- **.mark_reply_processed()** (6 connections) — `harvey/state.py`
- **test_prospect_status_update()** (6 connections) — `tests/test_state.py`
- **test_add_and_get_company()** (5 connections) — `tests/test_state.py`
- **test_add_and_get_prospect()** (5 connections) — `tests/test_state.py`
- **test_company_exists()** (5 connections) — `tests/test_state.py`
- **test_get_prospect_by_email()** (5 connections) — `tests/test_state.py`
- **test_usage_tracking()** (5 connections) — `tests/test_state.py`
- **test_reply_deduplication()** (4 connections) — `tests/test_state.py`
- **Mark a reply as processed to avoid double-handling.** (1 connections) — `harvey/state.py`
- **Tests for state management (SQLite operations).** (1 connections) — `tests/test_state.py`
- **Usage increment should use UPSERT, not insert duplicate rows.** (1 connections) — `tests/test_state.py`

## Relationships

- [StateManager](StateManager.md) (11 shared connections)
- [test_state_extra.py](test_state_extra.py.md) (7 shared connections)
- [Prospect](Prospect.md) (7 shared connections)
- [Company](Company.md) (7 shared connections)
- [asyncio](asyncio.md) (4 shared connections)
- [.init_db](init_db.md) (2 shared connections)
- [email_finder.py](email_finder.py.md) (1 shared connections)
- [pytest](pytest.md) (1 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (1 shared connections)
- [state.py](state.py.md) (1 shared connections)
- [make_handler](make_handler.md) (1 shared connections)

## Source Files

- `harvey/state.py`
- `tests/test_state.py`

## Audit Trail

- EXTRACTED: 36 (55%)
- INFERRED: 29 (45%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
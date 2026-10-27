# test_email_wiring.py

> 15 nodes · cohesion 0.20

## Key Concepts

- **test_email_wiring.py** (18 connections) — `tests/test_email_wiring.py`
- **.save_email_pattern()** (7 connections) — `harvey/state.py`
- **test_sender_only_sends_verified()** (7 connections) — `tests/test_email_wiring.py`
- **asyncio** (6 connections)
- **test_update_prospect_email()** (6 connections) — `tests/test_email_wiring.py`
- **test_prospect_email_status_roundtrips()** (5 connections) — `tests/test_email_wiring.py`
- **test_migration_downgrades_legacy_verified()** (4 connections) — `tests/test_email_wiring.py`
- **test_save_email_pattern_keeps_highest_confidence()** (4 connections) — `tests/test_email_wiring.py`
- **test_save_email_pattern_updates_catch_all_independently()** (4 connections) — `tests/test_email_wiring.py`
- **_Cfg** (3 connections) — `tests/test_email_wiring.py`
- **channels** (2 connections) — `tests/test_email_wiring.py`
- **Upsert what we've learned about a domain's email conventions. Only overwrites…** (1 connections) — `harvey/state.py`
- **email** (1 connections) — `tests/test_email_wiring.py`
- **Tests for email_status persistence and sender/scout wiring.** (1 connections) — `tests/test_email_wiring.py`
- **v4 migration must strip the old inflated verified flag to 'guess'.** (1 connections) — `tests/test_email_wiring.py`

## Relationships

- [StateManager](StateManager.md) (7 shared connections)
- [Prospect](Prospect.md) (5 shared connections)
- [make_handler](make_handler.md) (4 shared connections)
- [test_state_extra.py](test_state_extra.py.md) (3 shared connections)
- [InstantlyClient](InstantlyClient.md) (2 shared connections)
- [.init_db](init_db.md) (2 shared connections)
- [derive_pattern](derive_pattern.md) (1 shared connections)
- [email_finder.py](email_finder.py.md) (1 shared connections)
- [pytest](pytest.md) (1 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (1 shared connections)
- [state.py](state.py.md) (1 shared connections)

## Source Files

- `harvey/state.py`
- `tests/test_email_wiring.py`

## Audit Trail

- EXTRACTED: 32 (65%)
- INFERRED: 17 (35%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
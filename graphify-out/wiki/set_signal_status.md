# .set_signal_status

> 12 nodes · cohesion 0.23

## Key Concepts

- **.set_signal_status()** (12 connections) — `harvey/state.py`
- **test_only_confirmed_signals_are_collected()** (9 connections) — `tests/test_collectors_profile.py`
- **test_unconfirmed_signals_are_not_recorded()** (8 connections) — `tests/test_discover.py`
- **.get_signal_codes()** (6 connections) — `harvey/state.py`
- **state()** (6 connections) — `tests/test_discover.py`
- **test_seeded_catalog_starts_unconfirmed()** (5 connections) — `tests/test_collectors_profile.py`
- **test_user_decision_survives_reseeding()** (5 connections) — `tests/test_collectors_profile.py`
- **.confirmed_signal_codes()** (4 connections) — `harvey/state.py`
- **asyncio** (3 connections)
- **Confirm / reject a proposed signal. Only confirmed signals are collected —…** (1 connections) — `harvey/state.py`
- **fake_get()** (1 connections) — `tests/test_collectors_profile.py`
- **The confirmation gate has to hold inside the collector, not just in the UI that…** (1 connections) — `tests/test_discover.py`

## Relationships

- [StateManager](StateManager.md) (6 shared connections)
- [cli.py](cli.py.md) (6 shared connections)
- [asyncio](asyncio.md) (5 shared connections)
- [Company](Company.md) (4 shared connections)
- [test_collectors_profile.py](test_collectors_profile.py.md) (4 shared connections)
- [test_discover.py](test_discover.py.md) (2 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (1 shared connections)
- [night.py](night.py.md) (1 shared connections)
- [offline](offline.md) (1 shared connections)
- [.init_db](init_db.md) (1 shared connections)

## Source Files

- `harvey/state.py`
- `tests/test_collectors_profile.py`
- `tests/test_discover.py`

## Audit Trail

- EXTRACTED: 26 (57%)
- INFERRED: 20 (43%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
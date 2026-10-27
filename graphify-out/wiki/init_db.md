# .init_db

> 30 nodes · cohesion 0.08

## Key Concepts

- **.init_db()** (38 connections) — `harvey/state.py`
- **tempfile** (29 connections)
- **state()** (6 connections) — `tests/test_state.py`
- **state()** (6 connections) — `tests/test_whatsapp.py`
- **state()** (5 connections) — `tests/test_collectors_profile.py`
- **state()** (5 connections) — `tests/test_email_wiring.py`
- **state()** (5 connections) — `tests/test_outbox_native.py`
- **state()** (5 connections) — `tests/test_precleared.py`
- **state()** (5 connections) — `tests/test_signals_export.py`
- **state()** (5 connections) — `tests/test_state_extra.py`
- **state()** (5 connections) — `tests/test_usage.py`
- **_stats()** (4 connections) — `harvey/cli.py`
- **state()** (4 connections) — `tests/test_brain_no_tools.py`
- **state()** (4 connections) — `tests/test_brain_provider.py`
- **state()** (4 connections) — `tests/test_email_finder.py`
- **state()** (4 connections) — `tests/test_whatsapp_metrics.py`
- **Create/upgrade the schema. Safe to call on every startup.** (1 connections) — `harvey/state.py`
- **fixture** (1 connections)
- **fixture** (1 connections)
- **fixture** (1 connections)
- **fixture** (1 connections)
- **fixture** (1 connections)
- **fixture** (1 connections)
- **fixture** (1 connections)
- **fixture** (1 connections)
- *... and 5 more nodes in this community*

## Relationships

- [StateManager](StateManager.md) (21 shared connections)
- [cli.py](cli.py.md) (4 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (4 shared connections)
- [test_signals_export.py](test_signals_export.py.md) (3 shared connections)
- [Company](Company.md) (3 shared connections)
- [test_state_extra.py](test_state_extra.py.md) (3 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (3 shared connections)
- [test_whatsapp_metrics.py](test_whatsapp_metrics.py.md) (2 shared connections)
- [setup.py](setup.py.md) (2 shared connections)
- [test_codex_e2e.py](test_codex_e2e.py.md) (2 shared connections)
- [state.py](state.py.md) (2 shared connections)
- [test_brain_no_tools.py](test_brain_no_tools.py.md) (2 shared connections)

## Source Files

- `harvey/cli.py`
- `harvey/state.py`
- `tests/test_brain_no_tools.py`
- `tests/test_brain_provider.py`
- `tests/test_collectors_profile.py`
- `tests/test_email_finder.py`
- `tests/test_email_wiring.py`
- `tests/test_outbox_native.py`
- `tests/test_precleared.py`
- `tests/test_signals_export.py`
- `tests/test_state.py`
- `tests/test_state_extra.py`
- `tests/test_usage.py`
- `tests/test_whatsapp.py`
- `tests/test_whatsapp_metrics.py`

## Audit Trail

- EXTRACTED: 65 (58%)
- INFERRED: 48 (42%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
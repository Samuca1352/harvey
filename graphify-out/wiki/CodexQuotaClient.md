# CodexQuotaClient

> 8 nodes · cohesion 0.29

## Key Concepts

- **CodexQuotaClient** (14 connections) — `harvey/codex.py`
- **.__init__()** (6 connections) — `harvey/brain.py`
- **test_quota_client_degrades_to_none()** (5 connections) — `tests/test_codex.py`
- **.invalidate()** (3 connections) — `harvey/codex.py`
- **.get_utilization()** (2 connections) — `harvey/codex.py`
- **.__init__()** (2 connections) — `harvey/codex.py`
- **Cached ChatGPT-plan utilization, same interface as QuotaClient.** (1 connections) — `harvey/codex.py`
- **Forget the cached reading (e.g. after a usage-limit error).** (1 connections) — `harvey/codex.py`

## Relationships

- [CodexClient](CodexClient.md) (3 shared connections)
- [Brain](Brain.md) (3 shared connections)
- [StateManager](StateManager.md) (2 shared connections)
- [cli.py](cli.py.md) (2 shared connections)
- [test_codex.py](test_codex.py.md) (2 shared connections)
- [json](json.md) (1 shared connections)
- [BrainConfig](BrainConfig.md) (1 shared connections)
- [get_usage](get_usage.md) (1 shared connections)
- [state.py](state.py.md) (1 shared connections)
- [dashboard.py](dashboard.py.md) (1 shared connections)
- [codex.py](codex.py.md) (1 shared connections)

## Source Files

- `harvey/brain.py`
- `harvey/codex.py`
- `tests/test_codex.py`

## Audit Trail

- EXTRACTED: 23 (88%)
- INFERRED: 3 (12%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
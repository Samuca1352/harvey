# get_usage

> 7 nodes · cohesion 0.29

## Key Concepts

- **get_usage()** (7 connections) — `harvey/dashboard.py`
- **_quota_client_for()** (6 connections) — `harvey/dashboard.py`
- **_active_brain()** (5 connections) — `harvey/dashboard.py`
- **grouped()** (1 connections) — `harvey/dashboard.py`
- **The brain config harvey.yaml selects (None if unreadable).** (1 connections) — `harvey/dashboard.py`
- **One cached quota reader per provider (and Codex model). Each reads only its own…** (1 connections) — `harvey/dashboard.py`
- **Token/cost accounting + live subscription quota for the Usage tab.** (1 connections) — `harvey/dashboard.py`

## Relationships

- [dashboard.py](dashboard.py.md) (6 shared connections)
- [cli.py](cli.py.md) (1 shared connections)
- [CodexClient](CodexClient.md) (1 shared connections)
- [CodexQuotaClient](CodexQuotaClient.md) (1 shared connections)
- [json](json.md) (1 shared connections)

## Source Files

- `harvey/dashboard.py`

## Audit Trail

- EXTRACTED: 16 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
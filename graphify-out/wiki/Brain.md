# Brain

> 33 nodes · cohesion 0.10

## Key Concepts

- **Brain** (84 connections) — `harvey/brain.py`
- **.preflight()** (9 connections) — `harvey/brain.py`
- **._think_codex()** (9 connections) — `harvey/brain.py`
- **.is_within_budget()** (7 connections) — `harvey/brain.py`
- **.provider_label()** (7 connections) — `harvey/brain.py`
- **.think()** (7 connections) — `harvey/brain.py`
- **test_brain_records_usage_from_payload()** (7 connections) — `tests/test_usage.py`
- **._expire_usage_pause()** (6 connections) — `harvey/brain.py`
- **parse_brain_status()** (6 connections) — `harvey/brain.py`
- **._mark_unavailable()** (5 connections) — `harvey/brain.py`
- **._parse_result_payload()** (5 connections) — `harvey/brain.py`
- **._record_status()** (5 connections) — `harvey/brain.py`
- **._mark_available()** (4 connections) — `harvey/brain.py`
- **._record_usage()** (4 connections) — `harvey/brain.py`
- **._start_usage_pause()** (4 connections) — `harvey/brain.py`
- **test_parse_result_payload_json()** (4 connections) — `tests/test_usage.py`
- **.check_usage()** (3 connections) — `harvey/brain.py`
- **.load_skill()** (3 connections) — `harvey/brain.py`
- **.load_skills_for_agent()** (3 connections) — `harvey/brain.py`
- **._record_codex_usage()** (3 connections) — `harvey/brain.py`
- **test_parse_result_payload_plain_text_fallback()** (3 connections) — `tests/test_usage.py`
- **Can this Brain be used right now? Returns "" or the reason not. Codex only…** (1 connections) — `harvey/brain.py`
- **Record recovery once a usage-limit pause has run out.** (1 connections) — `harvey/brain.py`
- **Send a prompt to the configured provider and return the response. Retries…** (1 connections) — `harvey/brain.py`
- **One isolated Codex turn per attempt (see harvey/codex.py).** (1 connections) — `harvey/brain.py`
- *... and 8 more nodes in this community*

## Relationships

- [json](json.md) (7 shared connections)
- [main.py](main.py.md) (6 shared connections)
- [setup.py](setup.py.md) (6 shared connections)
- [state.py](state.py.md) (6 shared connections)
- [cli.py](cli.py.md) (4 shared connections)
- [asyncio](asyncio.md) (4 shared connections)
- [test_codex_e2e.py](test_codex_e2e.py.md) (4 shared connections)
- [pytest](pytest.md) (4 shared connections)
- [.paused_reason](paused_reason.md) (4 shared connections)
- [Trainer](Trainer.md) (4 shared connections)
- [CodexClient](CodexClient.md) (4 shared connections)
- [StateManager](StateManager.md) (4 shared connections)

## Source Files

- `harvey/brain.py`
- `tests/test_usage.py`

## Audit Trail

- EXTRACTED: 101 (70%)
- INFERRED: 44 (30%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
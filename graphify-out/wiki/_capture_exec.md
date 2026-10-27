# _capture_exec

> 8 nodes · cohesion 0.25

## Key Concepts

- **_capture_exec()** (5 connections) — `tests/test_brain_provider.py`
- **test_claude_model_choice_is_passed_per_call()** (5 connections) — `tests/test_brain_provider.py`
- **test_long_claude_prompts_still_go_via_stdin()** (5 connections) — `tests/test_brain_provider.py`
- **_FakeProcess** (4 connections) — `tests/test_brain_provider.py`
- **fake_exec()** (2 connections) — `tests/test_brain_provider.py`
- **.communicate()** (1 connections) — `tests/test_brain_provider.py`
- **.__init__()** (1 connections) — `tests/test_brain_provider.py`
- **Windows long-prompt fix: prompts past the argv limit travel on stdin.** (1 connections) — `tests/test_brain_provider.py`

## Relationships

- [test_brain_provider.py](test_brain_provider.py.md) (4 shared connections)
- [asyncio](asyncio.md) (3 shared connections)
- [Brain](Brain.md) (2 shared connections)
- [BrainConfig](BrainConfig.md) (1 shared connections)

## Source Files

- `tests/test_brain_provider.py`

## Audit Trail

- EXTRACTED: 13 (76%)
- INFERRED: 4 (24%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
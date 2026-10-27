# test_codex_platform.py

> 20 nodes · cohesion 0.15

## Key Concepts

- **test_codex_platform.py** (30 connections) — `tests/test_codex_platform.py`
- **asyncio** (8 connections)
- **test_claude_is_unaffected_on_windows()** (6 connections) — `tests/test_codex_platform.py`
- **test_real_executable_in_a_path_with_spaces()** (6 connections) — `tests/test_codex_platform.py`
- **test_long_non_ascii_prompt_reaches_codex_intact()** (5 connections) — `tests/test_codex_platform.py`
- **test_paths_with_spaces_and_non_ascii()** (5 connections) — `tests/test_codex_platform.py`
- **test_windows_quota_and_brain_pause_cleanly()** (5 connections) — `tests/test_codex_platform.py`
- **test_private_runtime_and_login_copy_modes()** (4 connections) — `tests/test_codex_platform.py`
- **test_windows_codex_is_refused_before_login_or_runtime()** (4 connections) — `tests/test_codex_platform.py`
- **on_windows()** (3 connections) — `tests/test_codex_platform.py`
- **posix_only** (2 connections)
- **skipif** (2 connections)
- **no_login_read()** (1 connections) — `tests/test_codex_platform.py`
- **fixture** (1 connections)
- **parametrize** (1 connections)
- **Platform-sensitive paths of the Codex adapter. Two kinds of test, kept apart on…** (1 connections) — `tests/test_codex_platform.py`
- **Prompts go over the stdio pipe, never argv, so length and encoding don't matter…** (1 connections) — `tests/test_codex_platform.py`
- **No routing fixture: Harvey execs a real file whose path has spaces and non-…** (1 connections) — `tests/test_codex_platform.py`
- **communicate()** (1 connections) — `tests/test_codex_platform.py`
- **fake_claude()** (1 connections) — `tests/test_codex_platform.py`

## Relationships

- [test_codex.py](test_codex.py.md) (6 shared connections)
- [_write_login](_write_login.md) (4 shared connections)
- [Brain](Brain.md) (3 shared connections)
- [BrainConfig](BrainConfig.md) (3 shared connections)
- [StateManager](StateManager.md) (3 shared connections)
- [test_microsoft.py](test_microsoft.py.md) (1 shared connections)
- [json](json.md) (1 shared connections)
- [email_finder.py](email_finder.py.md) (1 shared connections)
- [cli.py](cli.py.md) (1 shared connections)
- [.init_db](init_db.md) (1 shared connections)
- [pytest](pytest.md) (1 shared connections)
- [codex.py](codex.py.md) (1 shared connections)

## Source Files

- `tests/test_codex_platform.py`

## Audit Trail

- EXTRACTED: 53 (88%)
- INFERRED: 7 (12%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
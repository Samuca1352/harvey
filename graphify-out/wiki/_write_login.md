# _write_login

> 11 nodes · cohesion 0.18

## Key Concepts

- **_write_login()** (18 connections) — `tests/test_codex.py`
- **test_expired_login_fails_before_anything_runs()** (5 connections) — `tests/test_codex.py`
- **native_home()** (4 connections) — `tests/test_codex.py`
- **private_tempdir()** (4 connections) — `tests/test_codex.py`
- **test_each_call_reads_the_login_afresh()** (4 connections) — `tests/test_codex.py`
- **fixture** (3 connections)
- **renew()** (2 connections) — `tests/test_codex_e2e.py`
- **_jwt()** (2 connections) — `tests/test_codex.py`
- **_rfc3339()** (2 connections) — `tests/test_codex.py`
- **Path** (1 connections)
- **Runtimes go under this test's own temp dir, so leftover checks can't race other…** (1 connections) — `tests/test_codex.py`

## Relationships

- [test_codex.py](test_codex.py.md) (12 shared connections)
- [test_codex_e2e.py](test_codex_e2e.py.md) (5 shared connections)
- [test_codex_platform.py](test_codex_platform.py.md) (4 shared connections)
- [fake](fake.md) (1 shared connections)
- [soak](soak.md) (1 shared connections)
- [check_native_auth](check_native_auth.md) (1 shared connections)
- [build_access_snapshot](build_access_snapshot.md) (1 shared connections)
- [state.py](state.py.md) (1 shared connections)

## Source Files

- `tests/test_codex.py`
- `tests/test_codex_e2e.py`

## Audit Trail

- EXTRACTED: 35 (97%)
- INFERRED: 1 (3%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
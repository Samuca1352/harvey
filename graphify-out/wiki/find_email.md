# find_email

> 21 nodes · cohesion 0.13

## Key Concepts

- **find_email()** (18 connections) — `harvey/integrations/email_finder.py`
- **test_find_email_invalid_from_provider()** (8 connections) — `tests/test_email_finder.py`
- **_clean_domain()** (7 connections) — `harvey/integrations/email_finder.py`
- **test_find_email_catch_all_is_risky()** (7 connections) — `tests/test_email_finder.py`
- **test_find_email_inconclusive_is_guess_not_verified()** (7 connections) — `tests/test_email_finder.py`
- **test_find_email_verified_via_reoon()** (7 connections) — `tests/test_email_finder.py`
- **get_mx_host()** (6 connections) — `harvey/integrations/email_finder.py`
- **Env** (6 connections) — `tests/test_email_finder.py`
- **test_find_email_verify_false_is_guess()** (5 connections) — `tests/test_email_finder.py`
- **google_mx()** (4 connections) — `tests/test_email_finder.py`
- **fake_reoon()** (2 connections) — `tests/test_email_finder.py`
- **Primary MX host for a domain (cached; None on failure).** (1 connections) — `harvey/integrations/email_finder.py`
- **Find and honestly grade one email for a person at a company. Returns an…** (1 connections) — `harvey/integrations/email_finder.py`
- **.__init__()** (1 connections) — `tests/test_email_finder.py`
- **The core bug fix: no verifier confirmation → 'guess', never 'verified'.** (1 connections) — `tests/test_email_finder.py`
- **fake_zb()** (1 connections) — `tests/test_email_finder.py`
- **ms_mx()** (1 connections) — `tests/test_email_finder.py`
- **google_mx()** (1 connections) — `tests/test_email_finder.py`
- **fake_reoon()** (1 connections) — `tests/test_email_finder.py`
- **google_mx()** (1 connections) — `tests/test_email_finder.py`
- **google_mx()** (1 connections) — `tests/test_email_finder.py`

## Relationships

- [test_email_finder.py](test_email_finder.py.md) (10 shared connections)
- [derive_pattern](derive_pattern.md) (8 shared connections)
- [email_finder.py](email_finder.py.md) (6 shared connections)
- [StateManager](StateManager.md) (2 shared connections)
- [handler.py](handler.py.md) (1 shared connections)
- [Scout](Scout.md) (1 shared connections)
- [EmailResult](EmailResult.md) (1 shared connections)
- [state.py](state.py.md) (1 shared connections)
- [cli.py](cli.py.md) (1 shared connections)

## Source Files

- `harvey/integrations/email_finder.py`
- `tests/test_email_finder.py`

## Audit Trail

- EXTRACTED: 49 (83%)
- INFERRED: 10 (17%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
# test_email_finder.py

> 20 nodes · cohesion 0.14

## Key Concepts

- **test_email_finder.py** (38 connections) — `tests/test_email_finder.py`
- **build_email()** (8 connections) — `harvey/integrations/email_finder.py`
- **infer_pattern_from_email()** (8 connections) — `harvey/integrations/email_finder.py`
- **classify_mx()** (5 connections) — `harvey/integrations/email_finder.py`
- **generate_patterns()** (5 connections) — `harvey/integrations/email_finder.py`
- **_status_from_verdict()** (5 connections) — `harvey/integrations/email_finder.py`
- **_clean_name_part()** (4 connections) — `harvey/integrations/email_finder.py`
- **integrations/__init__.py** (3 connections) — `harvey/integrations/__init__.py`
- **test_build_email_patterns()** (2 connections) — `tests/test_email_finder.py`
- **test_classify_mx()** (2 connections) — `tests/test_email_finder.py`
- **test_generate_patterns_dedup_and_order()** (2 connections) — `tests/test_email_finder.py`
- **test_infer_pattern_from_email()** (2 connections) — `tests/test_email_finder.py`
- **test_status_from_verdict()** (2 connections) — `tests/test_email_finder.py`
- **All candidate addresses for a person, most-likely first (deduped).** (1 connections) — `harvey/integrations/email_finder.py`
- **Bucket a domain by its mail host — decides the verification strategy.** (1 connections) — `harvey/integrations/email_finder.py`
- **Given one known address, work out which named pattern produced it.** (1 connections) — `harvey/integrations/email_finder.py`
- **Map a provider verdict dict to our status, or None if inconclusive.** (1 connections) — `harvey/integrations/email_finder.py`
- **Render a named pattern into an address, or '' if it can't be built.** (1 connections) — `harvey/integrations/email_finder.py`
- **External integrations: Instantly, LinkedIn, email discovery, calendar.…** (1 connections) — `harvey/integrations/__init__.py`
- **Tests for the pattern-first email pipeline.** (1 connections) — `tests/test_email_finder.py`

## Relationships

- [find_email](find_email.md) (10 shared connections)
- [email_finder.py](email_finder.py.md) (9 shared connections)
- [derive_pattern](derive_pattern.md) (9 shared connections)
- [state.py](state.py.md) (2 shared connections)
- [_hunter_domain_pattern](_hunter_domain_pattern.md) (2 shared connections)
- [.init_db](init_db.md) (2 shared connections)
- [handler.py](handler.py.md) (1 shared connections)
- [Scout](Scout.md) (1 shared connections)
- [test_microsoft.py](test_microsoft.py.md) (1 shared connections)
- [EmailResult](EmailResult.md) (1 shared connections)
- [pytest](pytest.md) (1 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (1 shared connections)

## Source Files

- `harvey/integrations/__init__.py`
- `harvey/integrations/email_finder.py`
- `tests/test_email_finder.py`

## Audit Trail

- EXTRACTED: 67 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
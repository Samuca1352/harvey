# derive_pattern

> 17 nodes · cohesion 0.17

## Key Concepts

- **derive_pattern()** (14 connections) — `harvey/integrations/email_finder.py`
- **asyncio** (12 connections)
- **hunter_searches_remaining()** (9 connections) — `harvey/integrations/email_finder.py`
- **record_hunter_search()** (7 connections) — `harvey/integrations/email_finder.py`
- **test_derive_pattern_spends_and_respects_hunter_budget()** (4 connections) — `tests/test_email_finder.py`
- **test_derive_pattern_uses_cache()** (4 connections) — `tests/test_email_finder.py`
- **test_find_email_no_mx_is_invalid()** (4 connections) — `tests/test_email_finder.py`
- **test_hunter_budget_defaults_to_free_tier()** (4 connections) — `tests/test_email_finder.py`
- **_hunter_usage_key()** (3 connections) — `harvey/integrations/email_finder.py`
- **test_derive_pattern_default_no_signal()** (3 connections) — `tests/test_email_finder.py`
- **test_derive_pattern_from_known_email()** (3 connections) — `tests/test_email_finder.py`
- **test_hunter_budget_follows_paid_plan_setting()** (3 connections) — `tests/test_email_finder.py`
- **Domain-searches left this calendar month (UTC). Without a state store there is…** (1 connections) — `harvey/integrations/email_finder.py`
- **Count one domain-search against this month's budget. Called before the request,…** (1 connections) — `harvey/integrations/email_finder.py`
- **Determine a domain's email pattern. Returns (pattern, source, confidence).…** (1 connections) — `harvey/integrations/email_finder.py`
- **fake_hunter()** (1 connections) — `tests/test_email_finder.py`
- **no_mx()** (1 connections) — `tests/test_email_finder.py`

## Relationships

- [test_email_finder.py](test_email_finder.py.md) (9 shared connections)
- [find_email](find_email.md) (8 shared connections)
- [email_finder.py](email_finder.py.md) (6 shared connections)
- [Scout](Scout.md) (2 shared connections)
- [state.py](state.py.md) (2 shared connections)
- [_hunter_domain_pattern](_hunter_domain_pattern.md) (1 shared connections)
- [test_email_wiring.py](test_email_wiring.py.md) (1 shared connections)

## Source Files

- `harvey/integrations/email_finder.py`
- `tests/test_email_finder.py`

## Audit Trail

- EXTRACTED: 49 (94%)
- INFERRED: 3 (6%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
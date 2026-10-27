# ProfileCollector

> 23 nodes · cohesion 0.14

## Key Concepts

- **ProfileCollector** (19 connections) — `harvey/collectors/profile.py`
- **.profile_company()** (13 connections) — `harvey/collectors/profile.py`
- **.detect_people()** (5 connections) — `harvey/collectors/profile.py`
- **.run()** (5 connections) — `harvey/collectors/profile.py`
- **.detect_agency()** (4 connections) — `harvey/collectors/profile.py`
- **._first_present()** (4 connections) — `harvey/collectors/profile.py`
- **._get()** (4 connections) — `harvey/collectors/profile.py`
- **._resolve_site()** (4 connections) — `harvey/collectors/profile.py`
- **.wants()** (3 connections) — `harvey/collectors/profile.py`
- **._any()** (2 connections) — `harvey/collectors/profile.py`
- **.detect_tech()** (2 connections) — `harvey/collectors/profile.py`
- **._mark_checked()** (2 connections) — `harvey/collectors/profile.py`
- **add()** (2 connections) — `harvey/collectors/profile.py`
- **.__aenter__()** (1 connections) — `harvey/collectors/profile.py`
- **.__aexit__()** (1 connections) — `harvey/collectors/profile.py`
- **.__init__()** (1 connections) — `harvey/collectors/profile.py`
- **Fetches a business's public pages and emits observations. Only signals the user…** (1 connections) — `harvey/collectors/profile.py`
- **Return (working base url, homepage html), or ("", "") if none work. Tries…** (1 connections) — `harvey/collectors/profile.py`
- **Return (url, html) for the first path that returns content.** (1 connections) — `harvey/collectors/profile.py`
- **Find the agency credited in the footer. (name, confidence, url).** (1 connections) — `harvey/collectors/profile.py`
- **Names + titles from a team page. Conservative on purpose.** (1 connections) — `harvey/collectors/profile.py`
- **Collect every confirmed profile signal for one business.** (1 connections) — `harvey/collectors/profile.py`
- **Profile many businesses, flushing observations after each one. Flush-per-item…** (1 connections) — `harvey/collectors/profile.py`

## Relationships

- [handler.py](handler.py.md) (4 shared connections)
- [test_collectors_profile.py](test_collectors_profile.py.md) (3 shared connections)
- [cli.py](cli.py.md) (2 shared connections)

## Source Files

- `harvey/collectors/profile.py`

## Audit Trail

- EXTRACTED: 42 (95%)
- INFERRED: 2 (5%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
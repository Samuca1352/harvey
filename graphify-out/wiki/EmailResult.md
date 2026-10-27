# EmailResult

> 5 nodes · cohesion 0.40

## Key Concepts

- **EmailResult** (6 connections) — `harvey/integrations/email_finder.py`
- **.sendable()** (2 connections) — `harvey/integrations/email_finder.py`
- **.verified()** (1 connections) — `harvey/integrations/email_finder.py`
- **Outcome of an email lookup. status is the source of truth.** (1 connections) — `harvey/integrations/email_finder.py`
- **Safe to send cold: confirmed mailbox only (risky is opt-in elsewhere).** (1 connections) — `harvey/integrations/email_finder.py`

## Relationships

- [find_email](find_email.md) (1 shared connections)
- [test_email_finder.py](test_email_finder.py.md) (1 shared connections)
- [email_finder.py](email_finder.py.md) (1 shared connections)

## Source Files

- `harvey/integrations/email_finder.py`

## Audit Trail

- EXTRACTED: 7 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
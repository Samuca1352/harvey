# email_finder.py

> 21 nodes · cohesion 0.16

## Key Concepts

- **email_finder.py** (39 connections) — `harvey/integrations/email_finder.py`
- **os** (35 connections)
- **httpx** (27 connections)
- **_verify_candidate()** (10 connections) — `harvey/integrations/email_finder.py`
- **detect_catch_all()** (6 connections) — `harvey/integrations/email_finder.py`
- **verify_email_smtp()** (6 connections) — `harvey/integrations/email_finder.py`
- **hunter_domain_people()** (5 connections) — `harvey/integrations/email_finder.py`
- **_hunter_api_key()** (4 connections) — `harvey/integrations/email_finder.py`
- **verify_reoon()** (4 connections) — `harvey/integrations/email_finder.py`
- **verify_zerobounce()** (4 connections) — `harvey/integrations/email_finder.py`
- **aiosmtplib** (3 connections)
- **_hunter_monthly_cap()** (3 connections) — `harvey/integrations/email_finder.py`
- **verify_hunter()** (3 connections) — `harvey/integrations/email_finder.py`
- **dns_resolver** (1 connections)
- **Email discovery — pattern-first, verify-once, honest about confidence. Raw SMTP…** (1 connections) — `harvey/integrations/email_finder.py`
- **Hunter's domain-search doesn't just give a pattern — it lists real named people…** (1 connections) — `harvey/integrations/email_finder.py`
- **Reoon email-verifier — generous free tier, good catch-all flagging. Returns…** (1 connections) — `harvey/integrations/email_finder.py`
- **ZeroBounce — its 2026 engine is the reliable one for M365/Workspace catch-alls.** (1 connections) — `harvey/integrations/email_finder.py`
- **SMTP RCPT check — only trustworthy for small, self-hosted mail servers. Returns…** (1 connections) — `harvey/integrations/email_finder.py`
- **Probe a definitely-fake address; if accepted, the domain is catch-all. Only…** (1 connections) — `harvey/integrations/email_finder.py`
- **Run the best available verifier for this domain type. Returns (status_or_None,…** (1 connections) — `harvey/integrations/email_finder.py`

## Relationships

- [test_email_finder.py](test_email_finder.py.md) (9 shared connections)
- [state.py](state.py.md) (8 shared connections)
- [handler.py](handler.py.md) (7 shared connections)
- [json](json.md) (6 shared connections)
- [find_email](find_email.md) (6 shared connections)
- [derive_pattern](derive_pattern.md) (6 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (6 shared connections)
- [test_microsoft.py](test_microsoft.py.md) (5 shared connections)
- [InboundMessage](InboundMessage.md) (3 shared connections)
- [_hunter_domain_pattern](_hunter_domain_pattern.md) (3 shared connections)
- [discover.py](discover.py.md) (3 shared connections)
- [cli.py](cli.py.md) (2 shared connections)

## Source Files

- `harvey/integrations/email_finder.py`

## Audit Trail

- EXTRACTED: 123 (100%)
- INFERRED: 0 (0%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
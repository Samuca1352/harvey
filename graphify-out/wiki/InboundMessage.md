# InboundMessage

> 54 nodes · cohesion 0.06

## Key Concepts

- **InboundMessage** (21 connections) — `harvey/integrations/mail_provider.py`
- **mail_provider.py** (20 connections) — `harvey/integrations/mail_provider.py`
- **gmail.py** (19 connections) — `harvey/integrations/gmail.py`
- **GmailProvider** (18 connections) — `harvey/integrations/gmail.py`
- **MailProvider** (16 connections) — `harvey/integrations/mail_provider.py`
- **smtp_mail.py** (15 connections) — `harvey/integrations/smtp_mail.py`
- **SendResult** (14 connections) — `harvey/integrations/mail_provider.py`
- **SmtpImapProvider** (13 connections) — `harvey/integrations/smtp_mail.py`
- **run_auth_flow()** (9 connections) — `harvey/integrations/gmail.py`
- **._parse_message()** (5 connections) — `harvey/integrations/gmail.py`
- **._request()** (5 connections) — `harvey/integrations/gmail.py`
- **_load_token()** (5 connections) — `harvey/integrations/gmail.py`
- **_test()** (4 connections) — `harvey/cli.py`
- **._extract_text()** (4 connections) — `harvey/integrations/gmail.py`
- **.get_replies()** (4 connections) — `harvey/integrations/gmail.py`
- **.test_connection()** (4 connections) — `harvey/integrations/gmail.py`
- **._token()** (4 connections) — `harvey/integrations/gmail.py`
- **._parse_rfc822()** (4 connections) — `harvey/integrations/smtp_mail.py`
- **.send_email()** (3 connections) — `harvey/integrations/gmail.py`
- **_save_token()** (3 connections) — `harvey/integrations/gmail.py`
- **.get_replies()** (3 connections) — `harvey/integrations/mail_provider.py`
- **.send_email()** (3 connections) — `harvey/integrations/mail_provider.py`
- **._fetch_unseen()** (3 connections) — `harvey/integrations/smtp_mail.py`
- **.test_connection()** (3 connections) — `harvey/integrations/smtp_mail.py`
- **ABC** (2 connections)
- *... and 29 more nodes in this community*

## Relationships

- [test_outbox_native.py](test_outbox_native.py.md) (15 shared connections)
- [test_microsoft.py](test_microsoft.py.md) (14 shared connections)
- [state.py](state.py.md) (7 shared connections)
- [pytest](pytest.md) (5 shared connections)
- [cli.py](cli.py.md) (5 shared connections)
- [json](json.md) (3 shared connections)
- [email_finder.py](email_finder.py.md) (3 shared connections)
- [handler.py](handler.py.md) (3 shared connections)
- [test_codex_e2e.py](test_codex_e2e.py.md) (3 shared connections)

## Source Files

- `harvey/cli.py`
- `harvey/integrations/gmail.py`
- `harvey/integrations/mail_provider.py`
- `harvey/integrations/smtp_mail.py`
- `tests/test_outbox_native.py`

## Audit Trail

- EXTRACTED: 138 (92%)
- INFERRED: 12 (8%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
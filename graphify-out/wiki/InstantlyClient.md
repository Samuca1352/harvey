# InstantlyClient

> 57 nodes · cohesion 0.06

## Key Concepts

- **InstantlyClient** (27 connections) — `harvey/integrations/instantly.py`
- **Sender** (26 connections) — `harvey/agents/sender.py`
- **._request()** (19 connections) — `harvey/integrations/instantly.py`
- **._deploy_campaign()** (9 connections) — `harvey/agents/sender.py`
- **._extract_items()** (7 connections) — `harvey/integrations/instantly.py`
- **._drain_due()** (6 connections) — `harvey/agents/sender.py`
- **.run()** (6 connections) — `harvey/agents/sender.py`
- **._run_native()** (5 connections) — `harvey/agents/sender.py`
- **._stage_campaign_native()** (5 connections) — `harvey/agents/sender.py`
- **.get_replies()** (5 connections) — `harvey/integrations/instantly.py`
- **._count_sends_today()** (4 connections) — `harvey/agents/sender.py`
- **._validate_sequence()** (4 connections) — `harvey/agents/sender.py`
- **.add_leads()** (4 connections) — `harvey/integrations/instantly.py`
- **.create_campaign()** (4 connections) — `harvey/integrations/instantly.py`
- **.get_campaign_emails_sent()** (4 connections) — `harvey/integrations/instantly.py`
- **.list_accounts()** (4 connections) — `harvey/integrations/instantly.py`
- **._retry_delay()** (4 connections) — `harvey/integrations/instantly.py`
- **.send_reply()** (4 connections) — `harvey/integrations/instantly.py`
- **.set_campaign_emails()** (4 connections) — `harvey/integrations/instantly.py`
- **._render()** (3 connections) — `harvey/agents/sender.py`
- **.activate_campaign()** (3 connections) — `harvey/integrations/instantly.py`
- **.check_warmup_status()** (3 connections) — `harvey/integrations/instantly.py`
- **.get_campaign()** (3 connections) — `harvey/integrations/instantly.py`
- **.get_campaign_analytics()** (3 connections) — `harvey/integrations/instantly.py`
- **.get_lead()** (3 connections) — `harvey/integrations/instantly.py`
- *... and 32 more nodes in this community*

## Relationships

- [handler.py](handler.py.md) (5 shared connections)
- [pytest](pytest.md) (5 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (3 shared connections)
- [Handler](Handler.md) (3 shared connections)
- [main.py](main.py.md) (2 shared connections)
- [test_email_wiring.py](test_email_wiring.py.md) (2 shared connections)
- [Conversation](Conversation.md) (2 shared connections)
- [asyncio](asyncio.md) (2 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (1 shared connections)
- [Brain](Brain.md) (1 shared connections)
- [StateManager](StateManager.md) (1 shared connections)

## Source Files

- `harvey/agents/sender.py`
- `harvey/integrations/instantly.py`

## Audit Trail

- EXTRACTED: 101 (86%)
- INFERRED: 17 (14%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
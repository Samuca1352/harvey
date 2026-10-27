# WhatsAppAgent

> 35 nodes · cohesion 0.10

## Key Concepts

- **WhatsAppAgent** (35 connections) — `harvey/agents/whatsapp.py`
- **._send()** (13 connections) — `harvey/agents/whatsapp.py`
- **._draft()** (8 connections) — `harvey/agents/whatsapp.py`
- **.write()** (8 connections) — `harvey/agents/whatsapp.py`
- **whatsapp_persona_name()** (8 connections) — `harvey/config.py`
- **_now()** (6 connections) — `harvey/agents/whatsapp.py`
- **.cold_due()** (6 connections) — `harvey/agents/whatsapp.py`
- **.enabled()** (5 connections) — `harvey/agents/whatsapp.py`
- **._revive_session()** (5 connections) — `harvey/agents/whatsapp.py`
- **.run()** (5 connections) — `harvey/agents/whatsapp.py`
- **.cold_paused()** (4 connections) — `harvey/agents/whatsapp.py`
- **._customer_busy()** (4 connections) — `harvey/agents/whatsapp.py`
- **.ensure_online()** (4 connections) — `harvey/agents/whatsapp.py`
- **._variant()** (4 connections) — `harvey/agents/whatsapp.py`
- **._append_to_thread()** (3 connections) — `harvey/agents/whatsapp.py`
- **.cold_gap_seconds()** (3 connections) — `harvey/agents/whatsapp.py`
- **._opening()** (3 connections) — `harvey/agents/whatsapp.py`
- **._review_facts()** (3 connections) — `harvey/agents/whatsapp.py`
- **.send()** (3 connections) — `harvey/agents/whatsapp.py`
- **._still_waiting()** (3 connections) — `harvey/agents/whatsapp.py`
- **datetime** (2 connections)
- **._opt_out_line()** (2 connections) — `harvey/agents/whatsapp.py`
- **The cheap half of a cycle: find prospects and draft their messages.** (1 connections) — `harvey/agents/whatsapp.py`
- **Draft a first message for new WhatsApp prospects and stage it.** (1 connections) — `harvey/agents/whatsapp.py`
- **One of the active openers, stable per prospect and evenly split (ids are hex).** (1 connections) — `harvey/agents/whatsapp.py`
- *... and 10 more nodes in this community*

## Relationships

- [handler.py](handler.py.md) (8 shared connections)
- [main.py](main.py.md) (3 shared connections)
- [.prepare](prepare.md) (3 shared connections)
- [.cold_left_today](cold_left_today.md) (3 shared connections)
- [Prospect](Prospect.md) (3 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (2 shared connections)
- [WhatsAppClient](WhatsAppClient.md) (2 shared connections)
- [pytest](pytest.md) (2 shared connections)
- [Conversation](Conversation.md) (2 shared connections)
- [.paused_reason](paused_reason.md) (2 shared connections)
- [asyncio](asyncio.md) (1 shared connections)
- [Brain](Brain.md) (1 shared connections)

## Source Files

- `harvey/agents/whatsapp.py`
- `harvey/config.py`

## Audit Trail

- EXTRACTED: 84 (90%)
- INFERRED: 9 (10%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
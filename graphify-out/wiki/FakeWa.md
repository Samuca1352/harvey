# FakeWa

> 15 nodes · cohesion 0.14

## Key Concepts

- **FakeWa** (18 connections) — `tests/test_whatsapp.py`
- **WaSendResult** (10 connections) — `harvey/integrations/whatsapp.py`
- **fail()** (2 connections) — `tests/test_whatsapp_conversation_context.py`
- **.__init__()** (2 connections) — `tests/test_whatsapp.py`
- **.exists()** (1 connections) — `tests/test_whatsapp.py`
- **.get_incoming()** (1 connections) — `tests/test_whatsapp.py`
- **.is_configured()** (1 connections) — `tests/test_whatsapp.py`
- **.is_typing()** (1 connections) — `tests/test_whatsapp.py`
- **.mark_read()** (1 connections) — `tests/test_whatsapp.py`
- **.send_jid()** (1 connections) — `tests/test_whatsapp.py`
- **.send_text()** (1 connections) — `tests/test_whatsapp.py`
- **.session_status()** (1 connections) — `tests/test_whatsapp.py`
- **.start_session()** (1 connections) — `tests/test_whatsapp.py`
- **.test_connection()** (1 connections) — `tests/test_whatsapp.py`
- **Stands in for the gateway client.** (1 connections) — `tests/test_whatsapp.py`

## Relationships

- [make_handler](make_handler.md) (6 shared connections)
- [WhatsAppClient](WhatsAppClient.md) (2 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (2 shared connections)
- [asyncio](asyncio.md) (2 shared connections)
- [handler.py](handler.py.md) (1 shared connections)

## Source Files

- `harvey/integrations/whatsapp.py`
- `tests/test_whatsapp.py`
- `tests/test_whatsapp_conversation_context.py`

## Audit Trail

- EXTRACTED: 23 (82%)
- INFERRED: 5 (18%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
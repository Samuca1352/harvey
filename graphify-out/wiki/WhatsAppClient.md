# WhatsAppClient

> 31 nodes · cohesion 0.11

## Key Concepts

- **WhatsAppClient** (28 connections) — `harvey/integrations/whatsapp.py`
- **._client()** (11 connections) — `harvey/integrations/whatsapp.py`
- **._path()** (10 connections) — `harvey/integrations/whatsapp.py`
- **.get_incoming()** (7 connections) — `harvey/integrations/whatsapp.py`
- **.__init__()** (6 connections) — `harvey/agents/whatsapp.py`
- **.send_jid()** (6 connections) — `harvey/integrations/whatsapp.py`
- **.test_connection()** (6 connections) — `harvey/integrations/whatsapp.py`
- **to_jid()** (5 connections) — `harvey/integrations/whatsapp.py`
- **.is_typing()** (5 connections) — `harvey/integrations/whatsapp.py`
- **.mark_read()** (5 connections) — `harvey/integrations/whatsapp.py`
- **.download_audio()** (4 connections) — `harvey/integrations/whatsapp.py`
- **.exists()** (4 connections) — `harvey/integrations/whatsapp.py`
- **.send_text()** (4 connections) — `harvey/integrations/whatsapp.py`
- **.session_status()** (4 connections) — `harvey/integrations/whatsapp.py`
- **.start_session()** (4 connections) — `harvey/integrations/whatsapp.py`
- **get_whatsapp_client()** (3 connections) — `harvey/integrations/whatsapp.py`
- **.__init__()** (2 connections) — `harvey/integrations/whatsapp.py`
- **.is_configured()** (2 connections) — `harvey/integrations/whatsapp.py`
- **AsyncBaseTransport** (1 connections)
- **AsyncClient** (1 connections)
- **Thin async client for one WA-AKG session.** (1 connections) — `harvey/integrations/whatsapp.py`
- **(ok, detail) — ok only when the session is paired and online.** (1 connections) — `harvey/integrations/whatsapp.py`
- **The gateway's view of the session: CONNECTED, STOPPED, SCAN_QR, ... "" when it…** (1 connections) — `harvey/integrations/whatsapp.py`
- **Ask the gateway to start a stopped session. Credentials are kept by the…** (1 connections) — `harvey/integrations/whatsapp.py`
- **Whether the number has WhatsApp. None when it can't be determined.** (1 connections) — `harvey/integrations/whatsapp.py`
- *... and 6 more nodes in this community*

## Relationships

- [handler.py](handler.py.md) (6 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (4 shared connections)
- [pytest](pytest.md) (3 shared connections)
- [WhatsAppAgent](WhatsAppAgent.md) (2 shared connections)
- [cli.py](cli.py.md) (2 shared connections)
- [FakeWa](FakeWa.md) (2 shared connections)
- [Brain](Brain.md) (1 shared connections)
- [StateManager](StateManager.md) (1 shared connections)
- [Handler](Handler.md) (1 shared connections)
- [make_handler](make_handler.md) (1 shared connections)

## Source Files

- `harvey/agents/whatsapp.py`
- `harvey/integrations/whatsapp.py`

## Audit Trail

- EXTRACTED: 73 (96%)
- INFERRED: 3 (4%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
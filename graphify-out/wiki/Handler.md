# Handler

> 29 nodes · cohesion 0.12

## Key Concepts

- **Handler** (45 connections) — `harvey/agents/handler.py`
- **._process_reply()** (17 connections) — `harvey/agents/handler.py`
- **.run()** (8 connections) — `harvey/agents/handler.py`
- **._run_whatsapp_locked()** (7 connections) — `harvey/agents/handler.py`
- **._whatsapp_followups()** (6 connections) — `harvey/agents/handler.py`
- **._notify_owner()** (5 connections) — `harvey/agents/handler.py`
- **._run_native()** (5 connections) — `harvey/agents/handler.py`
- **requested_next_step()** (5 connections) — `harvey/agents/handler.py`
- **._determine_stage()** (4 connections) — `harvey/agents/handler.py`
- **._handle_reply()** (4 connections) — `harvey/agents/handler.py`
- **._queue_whatsapp_reply()** (4 connections) — `harvey/agents/handler.py`
- **._run_whatsapp()** (4 connections) — `harvey/agents/handler.py`
- **._handle_bounce()** (3 connections) — `harvey/agents/handler.py`
- **.is_native()** (3 connections) — `harvey/agents/handler.py`
- **._pending_material_handoff()** (3 connections) — `harvey/agents/handler.py`
- **._queue_native_reply()** (3 connections) — `harvey/agents/handler.py`
- **Tell the owner, on WhatsApp, that a conversation needs them. Once per…** (1 connections) — `harvey/agents/handler.py`
- **An undelivered demo/portfolio request must remain visible for the owner.** (1 connections) — `harvey/agents/handler.py`
- **Route Harvey's WhatsApp reply through the outbox approval ladder.** (1 connections) — `harvey/agents/handler.py`
- **A bounce is a data bug AND a reputation threat. Fix both.** (1 connections) — `harvey/agents/handler.py`
- **Route Harvey's reply through the outbox (approval ladder applies).** (1 connections) — `harvey/agents/handler.py`
- **Advance the conversation stage based on intent and context.** (1 connections) — `harvey/agents/handler.py`
- **Check for new replies and handle them. Returns True only if every reply could…** (1 connections) — `harvey/agents/handler.py`
- **Process a single reply. Returns True if a new reply was handled.** (1 connections) — `harvey/agents/handler.py`
- **Classify, record, and respond to a single reply. ``lead_email`` is the…** (1 connections) — `harvey/agents/handler.py`
- *... and 4 more nodes in this community*

## Relationships

- [.paused_reason](paused_reason.md) (7 shared connections)
- [._shared_contact](_shared_contact.md) (5 shared connections)
- [test_whatsapp.py](test_whatsapp.py.md) (4 shared connections)
- [handler.py](handler.py.md) (4 shared connections)
- [Conversation](Conversation.md) (4 shared connections)
- [test_codex_e2e.py](test_codex_e2e.py.md) (3 shared connections)
- [pytest](pytest.md) (3 shared connections)
- [InstantlyClient](InstantlyClient.md) (3 shared connections)
- [main.py](main.py.md) (2 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (2 shared connections)
- [test_microsoft.py](test_microsoft.py.md) (2 shared connections)
- [make_handler](make_handler.md) (1 shared connections)

## Source Files

- `harvey/agents/handler.py`

## Audit Trail

- EXTRACTED: 76 (83%)
- INFERRED: 16 (17%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
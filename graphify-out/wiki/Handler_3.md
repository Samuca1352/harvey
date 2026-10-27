# Handler

> God node · 45 connections · `harvey/agents/handler.py`

**Community:** [Handler](Handler.md)

## Connections by Relation

### calls
- [make_handler()](make_handler_2.md) `EXTRACTED`
- heartbeat() `EXTRACTED`
- [make_handler()](make_handler_2.md) `EXTRACTED`

### contains
- [handler.py](handler.py.md) `EXTRACTED`

### imports
- [test_whatsapp.py](test_whatsapp.py.md) `EXTRACTED`
- [test_codex_e2e.py](test_codex_e2e.py.md) `EXTRACTED`
- [test_microsoft.py](test_microsoft.py.md) `EXTRACTED`
- [test_outbox_native.py](test_outbox_native.py.md) `EXTRACTED`
- [main.py](main.py.md) `EXTRACTED`

### method
- ._process_reply() `EXTRACTED`
- ._generate_whatsapp_response() `EXTRACTED`
- .__init__() `EXTRACTED`
- .run() `EXTRACTED`
- ._shared_contact() `EXTRACTED`
- ._generate_response() `EXTRACTED`
- ._run_whatsapp_locked() `EXTRACTED`
- ._classify_intent() `EXTRACTED`
- ._whatsapp_followups() `EXTRACTED`
- ._message_shared_contact() `EXTRACTED`
- ._notify_owner() `EXTRACTED`
- ._run_native() `EXTRACTED`
- ._queue_whatsapp_reply() `EXTRACTED`
- ._determine_stage() `EXTRACTED`
- ._handle_reply() `EXTRACTED`
- ._run_whatsapp() `EXTRACTED`
- ._draft_handoff() `EXTRACTED`
- ._pending_material_handoff() `EXTRACTED`
- ._handle_bounce() `EXTRACTED`
- ._queue_native_reply() `EXTRACTED`
- *…and 2 more `method` connection(s) not listed (lowest-degree first to go)*

### uses
- [StateManager](StateManager.md) `INFERRED`
- [Prospect](Prospect.md) `INFERRED`
- [Brain](Brain.md) `INFERRED`
- [Conversation](Conversation.md) `INFERRED`
- Message `INFERRED`
- HarveyConfig `INFERRED`
- EnvConfig `INFERRED`
- [WhatsAppClient](WhatsAppClient.md) `INFERRED`
- [InstantlyClient](InstantlyClient.md) `INFERRED`
- test_instantly_path_leaves_the_reply_unprocessed_when_the_brain_is_down() `INFERRED`
- test_instantly_reply_survives_an_outage_while_drafting() `INFERRED`
- BrainUnavailable `INFERRED`
- test_watcher_over_budget_still_sends_written_replies_but_reads_nothing() `INFERRED`
- test_handler_holds_sends_when_graph_is_down() `INFERRED`

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
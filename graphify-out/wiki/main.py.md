# main.py

> 23 nodes · cohesion 0.14

## Key Concepts

- **main.py** (39 connections) — `harvey/main.py`
- **heartbeat()** (32 connections) — `harvey/main.py`
- **.get_state_summary()** (10 connections) — `harvey/state.py`
- **decide_next_action()** (7 connections) — `harvey/main.py`
- **in_quiet_hours()** (7 connections) — `harvey/main.py`
- **_run_with_signals()** (7 connections) — `harvey/main.py`
- **_interruptible_sleep()** (6 connections) — `harvey/main.py`
- **whatsapp_watcher()** (6 connections) — `harvey/main.py`
- **seconds_until_quiet_hours_end()** (5 connections) — `harvey/main.py`
- **_run_agents()** (4 connections) — `harvey/main.py`
- **pytz** (4 connections)
- **signal** (4 connections)
- **Event** (2 connections)
- **Harvey's main heartbeat loop. Always Be Closing.** (1 connections) — `harvey/main.py`
- **Run (name, coroutine) pairs in parallel; return {name: outcome}. Errors are…** (1 connections) — `harvey/main.py`
- **Sleep up to `seconds`, waking immediately on shutdown. Returns True if a…** (1 connections) — `harvey/main.py`
- **Answer WhatsApp messages within seconds instead of at the next heartbeat.…** (1 connections) — `harvey/main.py`
- **Harvey's main loop. Wakes up, decides, acts, sleeps. Repeat.** (1 connections) — `harvey/main.py`
- **Run the heartbeat with SIGINT/SIGTERM wired to a graceful shutdown.** (1 connections) — `harvey/main.py`
- **Check if we're currently in quiet hours.** (1 connections) — `harvey/main.py`
- **Calculate seconds until quiet hours end.** (1 connections) — `harvey/main.py`
- **Decide what Harvey should do next based on current state. Uses deterministic…** (1 connections) — `harvey/main.py`
- **_request_shutdown()** (1 connections) — `harvey/main.py`

## Relationships

- [cli.py](cli.py.md) (14 shared connections)
- [StateManager](StateManager.md) (8 shared connections)
- [pytest](pytest.md) (8 shared connections)
- [Brain](Brain.md) (6 shared connections)
- [state.py](state.py.md) (4 shared connections)
- [WhatsAppAgent](WhatsAppAgent.md) (3 shared connections)
- [ConfigFileNotFoundError](ConfigFileNotFoundError.md) (3 shared connections)
- [Scout](Scout.md) (2 shared connections)
- [Campaign](Campaign.md) (2 shared connections)
- [InstantlyClient](InstantlyClient.md) (2 shared connections)
- [Handler](Handler.md) (2 shared connections)
- [Analyst](Analyst.md) (2 shared connections)

## Source Files

- `harvey/main.py`
- `harvey/state.py`

## Audit Trail

- EXTRACTED: 89 (82%)
- INFERRED: 19 (18%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
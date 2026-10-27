# ConfigFileNotFoundError

> 20 nodes · cohesion 0.12

## Key Concepts

- **ConfigFileNotFoundError** (10 connections) — `harvey/config.py`
- **_find_config_file()** (9 connections) — `harvey/config.py`
- **get_setup_status()** (8 connections) — `harvey/dashboard.py`
- **_resolve_config_file()** (7 connections) — `harvey/dashboard.py`
- **get_settings()** (6 connections) — `harvey/dashboard.py`
- **_current_provider()** (5 connections) — `harvey/dashboard.py`
- **_read_env_file()** (5 connections) — `harvey/dashboard.py`
- **_needs_setup()** (5 connections) — `harvey/main.py`
- **FileNotFoundError** (1 connections)
- **Config file is missing. Subclasses FileNotFoundError for backward compatibility…** (1 connections) — `harvey/config.py`
- **Search for Harvey's config. ``harvey.local.yaml`` wins when present. It is…** (1 connections) — `harvey/config.py`
- **is_set()** (1 connections) — `harvey/dashboard.py`
- **_has()** (1 connections) — `harvey/dashboard.py`
- **Path** (1 connections)
- **Check what's configured and what still needs setup.** (1 connections) — `harvey/dashboard.py`
- **Read channels.email.provider from the active config (best-effort).** (1 connections) — `harvey/dashboard.py`
- **Get current settings — presence flags only for secrets, never raw values.** (1 connections) — `harvey/dashboard.py`
- **harvey.local.yaml wins when present — same resolution as config.py's loader, so…** (1 connections) — `harvey/dashboard.py`
- **Read .env file and return as dict.** (1 connections) — `harvey/dashboard.py`
- **Check if Harvey needs first-time setup.** (1 connections) — `harvey/main.py`

## Relationships

- [dashboard.py](dashboard.py.md) (10 shared connections)
- [pytest](pytest.md) (3 shared connections)
- [main.py](main.py.md) (3 shared connections)
- [config.py](config.py.md) (2 shared connections)
- [cli.py](cli.py.md) (2 shared connections)
- [save_env_settings](save_env_settings.md) (1 shared connections)

## Source Files

- `harvey/config.py`
- `harvey/dashboard.py`
- `harvey/main.py`

## Audit Trail

- EXTRACTED: 42 (95%)
- INFERRED: 2 (5%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
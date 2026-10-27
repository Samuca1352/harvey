# offline

> 6 nodes · cohesion 0.33

## Key Concepts

- **offline()** (5 connections) — `tests/test_discover.py`
- **fixture** (4 connections)
- **config()** (3 connections) — `tests/test_discover.py`
- **no_geocode()** (1 connections) — `tests/test_discover.py`
- **no_sleep()** (1 connections) — `tests/test_discover.py`
- **No test reaches the network, and none of them wait a real second. The geocoding…** (1 connections) — `tests/test_discover.py`

## Relationships

- [test_discover.py](test_discover.py.md) (2 shared connections)
- [pytest](pytest.md) (1 shared connections)
- [asyncio](asyncio.md) (1 shared connections)
- [.set_signal_status](set_signal_status.md) (1 shared connections)

## Source Files

- `tests/test_discover.py`

## Audit Trail

- EXTRACTED: 8 (80%)
- INFERRED: 2 (20%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
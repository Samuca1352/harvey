# handler

> 11 nodes · cohesion 0.22

## Key Concepts

- **handler()** (6 connections) — `tests/test_discover.py`
- **test_geocode_is_cached_so_a_city_is_looked_up_once()** (6 connections) — `tests/test_discover.py`
- **test_one_geocode_per_city_not_per_query()** (6 connections) — `tests/test_discover.py`
- **test_a_geocode_miss_is_cached_too()** (5 connections) — `tests/test_discover.py`
- **test_dataforseo_listings_adapter()** (5 connections) — `tests/test_discover.py`
- **_geo_client()** (4 connections) — `tests/test_discover.py`
- **Nominatim permits single place lookups and forbids bulk enumeration. Caching…** (1 connections) — `tests/test_discover.py`
- **Twelve queries across four cities is four lookups, not twelve.** (1 connections) — `tests/test_discover.py`
- **handler()** (1 connections) — `tests/test_discover.py`
- **handler()** (1 connections) — `tests/test_discover.py`
- **handler()** (1 connections) — `tests/test_discover.py`

## Relationships

- [test_discover.py](test_discover.py.md) (5 shared connections)
- [asyncio](asyncio.md) (4 shared connections)
- [_client](_client.md) (3 shared connections)
- [DataForSEOListings](DataForSEOListings.md) (1 shared connections)

## Source Files

- `tests/test_discover.py`

## Audit Trail

- EXTRACTED: 18 (72%)
- INFERRED: 7 (28%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
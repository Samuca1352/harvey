# _client

> 15 nodes · cohesion 0.17

## Key Concepts

- **_client()** (9 connections) — `tests/test_discover.py`
- **.fetch()** (8 connections) — `harvey/collectors/discover.py`
- **test_overpass_throttling_is_an_error_not_an_empty_market()** (7 connections) — `tests/test_discover.py`
- **test_overpass_falls_over_to_the_next_mirror()** (6 connections) — `tests/test_discover.py`
- **OpenStreetMap** (5 connections) — `harvey/collectors/discover.py`
- **test_osm_refuses_a_term_it_cannot_map_instead_of_guessing()** (5 connections) — `tests/test_discover.py`
- **._tags()** (4 connections) — `harvey/collectors/discover.py`
- **test_overpass_needs_a_coordinate_and_says_so()** (4 connections) — `tests/test_discover.py`
- **test_osm_maps_the_trades_it_does_know()** (3 connections) — `tests/test_discover.py`
- **Genuinely free, no account, no key. Honest about what that costs you. Good…** (1 connections) — `harvey/collectors/discover.py`
- **The OSM tags that actually carry this kind of business, or none. There is…** (1 connections) — `harvey/collectors/discover.py`
- **A silent [] on a 504 is indistinguishable from 'no businesses here', which is…** (1 connections) — `tests/test_discover.py`
- **An earlier fallback to `office=company` answered "roofers in Denver" with every…** (1 connections) — `tests/test_discover.py`
- **handler()** (1 connections) — `tests/test_discover.py`
- **handler()** (1 connections) — `tests/test_discover.py`

## Relationships

- [test_discover.py](test_discover.py.md) (6 shared connections)
- [asyncio](asyncio.md) (5 shared connections)
- [DiscoveryProvider](DiscoveryProvider.md) (4 shared connections)
- [handler](handler_2.md) (3 shared connections)
- [discover.py](discover.py.md) (2 shared connections)
- [DataForSEOListings](DataForSEOListings.md) (1 shared connections)

## Source Files

- `harvey/collectors/discover.py`
- `tests/test_discover.py`

## Audit Trail

- EXTRACTED: 32 (82%)
- INFERRED: 7 (18%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
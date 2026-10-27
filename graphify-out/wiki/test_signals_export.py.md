# test_signals_export.py

> 30 nodes · cohesion 0.12

## Key Concepts

- **test_signals_export.py** (27 connections) — `tests/test_signals_export.py`
- **export_prospects_csv()** (12 connections) — `harvey/export.py`
- **export.py** (10 connections) — `harvey/export.py`
- **detect_tech()** (9 connections) — `harvey/integrations/tech_detect.py`
- **cmd_export()** (7 connections) — `harvey/cli.py`
- **collect_prospects()** (7 connections) — `harvey/export.py`
- **to_csv()** (6 connections) — `harvey/export.py`
- **tech_detect.py** (5 connections) — `harvey/integrations/tech_detect.py`
- **asyncio** (5 connections)
- **_seed_prospects()** (5 connections) — `tests/test_signals_export.py`
- **_export()** (4 connections) — `harvey/cli.py`
- **test_collect_prospects_default_deliverable_only()** (4 connections) — `tests/test_signals_export.py`
- **test_collect_prospects_filters()** (4 connections) — `tests/test_signals_export.py`
- **test_export_csv_shape()** (4 connections) — `tests/test_signals_export.py`
- **test_legacy_company_rows_parse()** (4 connections) — `tests/test_signals_export.py`
- **csv** (3 connections)
- **_get_compiled()** (3 connections) — `harvey/integrations/tech_detect.py`
- **io** (3 connections)
- **test_detect_tech_matches_known_fingerprints()** (2 connections) — `tests/test_signals_export.py`
- **test_detect_tech_no_false_positives_on_plain_page()** (2 connections) — `tests/test_signals_export.py`
- **test_to_csv_ignores_extra_keys()** (2 connections) — `tests/test_signals_export.py`
- **Export the prospect list as a sequencer-ready CSV.** (1 connections) — `harvey/cli.py`
- **Prospect-list export — the list itself is the product. Produces a CSV that…** (1 connections) — `harvey/export.py`
- **Export prospects to CSV. Returns (row_count, csv_text). Writes to ``out_path``…** (1 connections) — `harvey/export.py`
- **Fetch prospects matching the filters as export-ready dicts. Default view is the…** (1 connections) — `harvey/export.py`
- *... and 5 more nodes in this community*

## Relationships

- [StateManager](StateManager.md) (6 shared connections)
- [cli.py](cli.py.md) (4 shared connections)
- [state.py](state.py.md) (4 shared connections)
- [Prospect](Prospect.md) (4 shared connections)
- [.init_db](init_db.md) (3 shared connections)
- [Company](Company.md) (3 shared connections)
- [discover.py](discover.py.md) (2 shared connections)
- [dashboard.py](dashboard.py.md) (2 shared connections)
- [Scout](Scout.md) (2 shared connections)
- [handler.py](handler.py.md) (1 shared connections)
- [email_finder.py](email_finder.py.md) (1 shared connections)
- [pytest](pytest.md) (1 shared connections)

## Source Files

- `harvey/cli.py`
- `harvey/export.py`
- `harvey/integrations/tech_detect.py`
- `tests/test_signals_export.py`

## Audit Trail

- EXTRACTED: 81 (94%)
- INFERRED: 5 (6%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
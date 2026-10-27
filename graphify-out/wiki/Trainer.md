# Trainer

> 49 nodes · cohesion 0.06

## Key Concepts

- **Trainer** (20 connections) — `harvey/trainer.py`
- **.train()** (14 connections) — `harvey/trainer.py`
- **.think_json()** (8 connections) — `harvey/brain.py`
- **CloudflareCrawler** (7 connections) — `harvey/trainer.py`
- **FallbackCrawler** (7 connections) — `harvey/trainer.py`
- **._poll_job()** (5 connections) — `harvey/trainer.py`
- **.crawl()** (5 connections) — `harvey/trainer.py`
- **main()** (5 connections) — `harvey/trainer.py`
- **run_training()** (5 connections) — `harvey/trainer.py`
- **._extract_competitive_intel()** (5 connections) — `harvey/trainer.py`
- **._extract_icp()** (5 connections) — `harvey/trainer.py`
- **._extract_product_info()** (5 connections) — `harvey/trainer.py`
- **._get_all_content()** (5 connections) — `harvey/trainer.py`
- **._collect_results()** (4 connections) — `harvey/trainer.py`
- **._fetch_page()** (4 connections) — `harvey/trainer.py`
- **_normalize_start_url()** (4 connections) — `harvey/trainer.py`
- **._build_config()** (4 connections) — `harvey/trainer.py`
- **._generate_objections()** (4 connections) — `harvey/trainer.py`
- **._extract_json()** (3 connections) — `harvey/brain.py`
- **.crawl()** (3 connections) — `harvey/trainer.py`
- **._extract_links()** (3 connections) — `harvey/trainer.py`
- **._normalize_url()** (3 connections) — `harvey/trainer.py`
- **AsyncClient** (3 connections)
- **._generate_battle_cards()** (3 connections) — `harvey/trainer.py`
- **._generate_product_knowledge()** (3 connections) — `harvey/trainer.py`
- *... and 24 more nodes in this community*

## Relationships

- [state.py](state.py.md) (6 shared connections)
- [Brain](Brain.md) (4 shared connections)
- [cli.py](cli.py.md) (4 shared connections)
- [setup.py](setup.py.md) (4 shared connections)
- [BrainConfig](BrainConfig.md) (1 shared connections)
- [StateManager](StateManager.md) (1 shared connections)
- [.init_db](init_db.md) (1 shared connections)

## Source Files

- `harvey/brain.py`
- `harvey/trainer.py`

## Audit Trail

- EXTRACTED: 81 (89%)
- INFERRED: 10 (11%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
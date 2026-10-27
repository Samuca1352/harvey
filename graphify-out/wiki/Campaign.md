# Campaign

> 36 nodes · cohesion 0.10

## Key Concepts

- **Campaign** (31 connections) — `harvey/models/campaign.py`
- **EmailStep** (19 connections) — `harvey/models/campaign.py`
- **Writer** (16 connections) — `harvey/agents/writer.py`
- **.add_campaign()** (10 connections) — `harvey/state.py`
- **.sequence_from_json()** (9 connections) — `harvey/models/campaign.py`
- **.run()** (7 connections) — `harvey/agents/writer.py`
- **.get_campaigns_by_status()** (7 connections) — `harvey/state.py`
- **test_campaign_stats()** (7 connections) — `tests/test_state_extra.py`
- **test_campaign_add_and_fetch_by_status()** (6 connections) — `tests/test_state_extra.py`
- **test_update_campaign_fields()** (6 connections) — `tests/test_state_extra.py`
- **._write_sequence()** (5 connections) — `harvey/agents/writer.py`
- **.get_campaign_stats()** (5 connections) — `harvey/state.py`
- **test_campaign_sequence_json_round_trip()** (5 connections) — `tests/test_models.py`
- **test_campaign_stats_zero_prospects_no_division_error()** (5 connections) — `tests/test_state_extra.py`
- **._group_prospects()** (4 connections) — `harvey/agents/writer.py`
- **.__init__()** (4 connections) — `harvey/agents/writer.py`
- **._parse_sequence()** (4 connections) — `harvey/agents/writer.py`
- **._personalize_first_emails()** (4 connections) — `harvey/agents/writer.py`
- **.sequence_json()** (4 connections) — `harvey/models/campaign.py`
- **test_campaign_empty_sequence_round_trip()** (4 connections) — `tests/test_models_extra.py`
- **test_campaign_sequence_from_json_bad_step_shape_raises()** (4 connections) — `tests/test_models_extra.py`
- **test_campaign_sequence_json_unicode_round_trip()** (4 connections) — `tests/test_models_extra.py`
- **.is_native()** (3 connections) — `harvey/agents/writer.py`
- **._write_personal_email()** (3 connections) — `harvey/agents/writer.py`
- **test_campaign_sequence_from_malformed_json_returns_empty()** (3 connections) — `tests/test_models_extra.py`
- *... and 11 more nodes in this community*

## Relationships

- [Prospect](Prospect.md) (16 shared connections)
- [test_state_extra.py](test_state_extra.py.md) (12 shared connections)
- [StateManager](StateManager.md) (11 shared connections)
- [state.py](state.py.md) (5 shared connections)
- [test_outbox_native.py](test_outbox_native.py.md) (5 shared connections)
- [pytest](pytest.md) (4 shared connections)
- [test_codex_e2e.py](test_codex_e2e.py.md) (3 shared connections)
- [main.py](main.py.md) (2 shared connections)
- [Brain](Brain.md) (2 shared connections)
- [Conversation](Conversation.md) (2 shared connections)

## Source Files

- `harvey/agents/writer.py`
- `harvey/models/campaign.py`
- `harvey/state.py`
- `tests/test_models.py`
- `tests/test_models_extra.py`
- `tests/test_state_extra.py`

## Audit Trail

- EXTRACTED: 96 (75%)
- INFERRED: 32 (25%)
- AMBIGUOUS: 0 (0%)

---

*Part of the graphify knowledge wiki. See [index](index.md) to navigate.*
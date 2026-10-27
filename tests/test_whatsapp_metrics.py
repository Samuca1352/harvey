"""Opener metrics use isolated storage, without gateway or model calls."""

from datetime import datetime, timedelta, timezone

import pytest
import pytest_asyncio

from harvey.agents.whatsapp import variant_examples, variant_stats
from harvey.models.conversation import Conversation, Message
from harvey.models.prospect import Prospect
from harvey.state import StateManager


@pytest_asyncio.fixture
async def state(tmp_path):
    state = StateManager(str(tmp_path / "metrics.db"))
    await state.init_db()
    return state


async def sent_contact(state, name, *, variant="A", status="contacted", days_ago=1):
    prospect = Prospect(company=name, phone=f"55119{len(name):08}", status=status)
    prospect.id = await state.add_prospect(prospect)
    # Each contact needs its own phone, including equally long company names.
    prospect.phone = f"55119{int(prospect.id, 16) % 100000000:08}"
    async with state._connect() as db:
        await db.execute("UPDATE prospects SET phone = ? WHERE id = ?", (prospect.phone, prospect.id))
        await db.commit()
    await state.set_setting(f"wa_variant:{prospect.id}", variant)
    sent_at = (datetime.now(timezone.utc).replace(tzinfo=None) - timedelta(days=days_ago)).isoformat()
    outbox_id = await state.add_outbox_item(
        prospect_id=prospect.id, to_email=prospect.phone, subject="", body=f"Oi, {name}!",
        send_at=sent_at, status="sent", channel="whatsapp", kind="sequence",
    )
    async with state._connect() as db:
        await db.execute("UPDATE outbox SET sent_at = ? WHERE id = ?", (sent_at, outbox_id))
        await db.commit()
    return prospect


async def reply(state, prospect, intent, *, channel="whatsapp", thread=None):
    return await state.add_conversation(Conversation(
        id="", prospect_id=prospect.id, channel=channel, intent=intent,
        thread=[Message(sender="prospect", content="Mensagem recebida")] if thread is None else thread,
    ))


async def bot_log(state, prospect):
    await state.log_action("whatsapp_auto_message", "handler", {"prospect_phone": prospect.phone})


@pytest.mark.asyncio
async def test_metrics_separate_people_bots_and_recorded_interest(state):
    old_bot = await sent_contact(state, "Bot legado")
    await reply(state, old_bot, "ooo")
    ignored_bot = await sent_contact(state, "Bot ignorado")
    await bot_log(state, ignored_bot)
    mixed = await sent_contact(state, "Perguntou depois do bot")
    await reply(state, mixed, "ooo")
    await reply(state, mixed, "question")
    await bot_log(state, mixed)
    await bot_log(state, mixed)  # repeated events must not inflate contacts
    interested = await sent_contact(state, "Quer testar", status="meeting")
    await reply(state, interested, "interested")
    greeting = await sent_contact(state, "Disse oi")
    await reply(state, greeting, "greeting")
    refused = await sent_contact(state, "Recusou", status="lost")
    await reply(state, refused, "not_interested")
    await sent_contact(state, "Silêncio")

    [stats] = await variant_stats(state)
    assert stats["sent"] == 7
    assert stats["replied"] == stats["human_replied"] == 4
    assert stats["rate"] == pytest.approx(4 / 7)
    assert stats["automatic_replied"] == 3
    assert stats["automatic_only"] == 2
    assert stats["any_reply"] == 6
    assert stats["engaged"] == 2
    assert stats["engaged_rate"] == pytest.approx(2 / 7)
    assert stats["interested"] == stats["refused"] == stats["meetings"] == 1
    assert stats["sent_7d"] == 7
    assert stats["replied_7d"] == 4
    assert stats["automatic_only_7d"] == 2
    assert stats["any_reply_7d"] == 6

    examples = {row["company"]: row for row in (await variant_examples(state))["A"]}
    assert examples[old_bot.company]["automatic_only"]
    assert not examples[old_bot.company]["replied"]
    assert examples[mixed.company]["human_replied"]
    assert examples[mixed.company]["automatic_replied"]
    assert not examples[mixed.company]["automatic_only"]
    assert not examples["Silêncio"]["replied"]


@pytest.mark.asyncio
async def test_only_explicit_test_markers_exclude_contacts_from_stats_and_examples(state):
    marked = await sent_contact(state, "Cliente interno", status="meeting")
    await reply(state, marked, "interested")
    await state.set_setting(f"wa_test_contact:{marked.id}", "1")
    # A business name containing 'teste' is not evidence of an internal test.
    real = await sent_contact(state, "Loja de Teste (nome comercial)")
    await reply(state, real, "question")
    unmarked = await sent_contact(state, "Contato normal")
    await state.set_setting(f"wa_test_contact:{unmarked.id}", "0")
    only_test = await sent_contact(state, "Teste variante B", variant="B")
    await state.set_setting(f"wa_test_contact:{only_test.id}", "1")

    [stats] = await variant_stats(state)
    assert stats["variant"] == "A"
    assert stats["sent"] == 2 and stats["replied"] == 1
    assert stats["meetings"] == stats["interested"] == 0
    examples = await variant_examples(state)
    assert set(examples) == {"A"}
    assert {row["company"] for row in examples["A"]} == {real.company, unmarked.company}


@pytest.mark.asyncio
async def test_email_and_empty_conversations_do_not_count_as_whatsapp_replies(state):
    email_only = await sent_contact(state, "Só email")
    await reply(state, email_only, "interested", channel="email")
    empty = await sent_contact(state, "Conversa vazia")
    await reply(state, empty, "interested", thread=[])
    outgoing_only = await sent_contact(state, "Só saída")
    await reply(state, outgoing_only, "question", thread=[Message(sender="harvey", content="Oi")])
    blank = await sent_contact(state, "Aviso vazio")
    await reply(state, blank, "question", thread=[Message(sender="prospect", content=" ")])
    corrupt = await sent_contact(state, "Histórico ilegível")
    convo_id = await reply(state, corrupt, "question")
    await state.update_conversation(convo_id, thread_json="not json")

    [stats] = await variant_stats(state)
    assert stats["sent"] == 5
    assert stats["any_reply"] == stats["engaged"] == stats["interested"] == 0
    assert all(not row["replied"] for row in (await variant_examples(state))["A"])


@pytest.mark.asyncio
async def test_seven_day_cohort_uses_timestamps_not_lexical_iso_comparison(state):
    recent = await sent_contact(state, "Recente", days_ago=1)
    await reply(state, recent, "question")
    old = await sent_contact(state, "Mais de sete dias", days_ago=7 + 1 / 24)
    await reply(state, old, "interested")
    await bot_log(state, old)

    [stats] = await variant_stats(state)
    assert stats["sent"] == stats["replied"] == 2
    assert stats["sent_7d"] == stats["replied_7d"] == stats["any_reply_7d"] == 1
    assert stats["rate_7d"] == 1.0
    assert stats["automatic_only_7d"] == 0


@pytest.mark.asyncio
async def test_auto_events_before_contact_or_for_other_channels_are_ignored(state):
    prospect = await sent_contact(state, "Contato novo")
    await bot_log(state, prospect)
    async with state._connect() as db:
        await db.execute("UPDATE actions SET created_at = datetime('now', '-2 days')")
        await db.commit()
    await state.log_action("other_action", "handler", {"prospect_phone": prospect.phone})
    await state.log_action("whatsapp_auto_message", "handler", {"prospect_phone": "other_phone"})

    [stats] = await variant_stats(state)
    assert stats["sent"] == 1
    assert stats["any_reply"] == stats["automatic_replied"] == 0


@pytest.mark.asyncio
async def test_repeated_outbox_rows_do_not_duplicate_contacts(state):
    prospect = await sent_contact(state, "Dois envios")
    await reply(state, prospect, "question")
    await state.add_outbox_item(
        prospect_id=prospect.id, to_email=prospect.phone, subject="", body="Segundo envio",
        send_at="2026-01-01", status="sent", channel="whatsapp", kind="sequence", step=2,
    )
    [stats] = await variant_stats(state)
    assert stats["sent"] == stats["replied"] == stats["engaged"] == 1
    assert len((await variant_examples(state, per_variant=1))["A"]) == 1

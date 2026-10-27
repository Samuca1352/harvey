"""Today's cold-outreach counters: how many people were messaged, how many
answered, and the one line that explains a quiet day.

The counters run against isolated storage; the status line is a pure function,
so the order it resolves reasons in is pinned here rather than guessed from
the UI.
"""

from datetime import datetime, timedelta, timezone

import pytest
import pytest_asyncio

from harvey.dashboard import cold_status
from harvey.models.conversation import Conversation, Message
from harvey.models.prospect import Prospect
from harvey.state import StateManager


@pytest_asyncio.fixture
async def state(tmp_path):
    state = StateManager(str(tmp_path / "outreach.db"))
    await state.init_db()
    return state


async def contacted(state, name, *, status="contacted", days_ago=0, channel="whatsapp"):
    prospect = Prospect(company=name, phone=f"5511{abs(hash(name)) % 10**9:09}", status=status)
    prospect.id = await state.add_prospect(prospect)
    sent_at = (datetime.now(timezone.utc).replace(tzinfo=None) - timedelta(days=days_ago)).isoformat()
    item = await state.add_outbox_item(
        prospect_id=prospect.id, to_email=prospect.phone, subject="", body=f"Oi, {name}!",
        send_at=sent_at, status="sent", channel=channel, kind="sequence",
    )
    async with state._connect() as db:
        await db.execute("UPDATE outbox SET sent_at = ? WHERE id = ?", (sent_at, item))
        await db.commit()
    return prospect


async def answered(state, prospect, intent, *, channel="whatsapp", thread=None, days_ago=0):
    at = datetime.now(timezone.utc).replace(tzinfo=None) - timedelta(days=days_ago)
    return await state.add_conversation(Conversation(
        id="", prospect_id=prospect.id, channel=channel, intent=intent,
        thread=[Message(sender="prospect", content="Oi!", timestamp=at)]
        if thread is None else thread,
    ))


# ── the counters ──


@pytest.mark.asyncio
async def test_counts_people_contacted_and_who_actually_wrote_back(state):
    asked = await contacted(state, "Perguntou")
    await answered(state, asked, "question")
    booked = await contacted(state, "Marcou", status="meeting")
    await answered(state, booked, "interested")
    refused = await contacted(state, "Recusou", status="lost")
    await answered(state, refused, "not_interested")
    bot = await contacted(state, "Autoresposta")
    await answered(state, bot, "ooo")
    await contacted(state, "Silêncio")

    stats = await state.cold_outreach_stats()
    assert stats["contacted"] == 5
    assert stats["replied"] == 3            # the auto-responder is not a person
    assert stats["awaiting"] == 2
    assert stats["rate"] == pytest.approx(3 / 5)
    assert stats["engaged"] == 2            # interested/question, minus the lost one
    assert stats["meetings"] == 1
    assert stats["refused"] == 1


@pytest.mark.asyncio
async def test_a_second_message_to_the_same_person_is_one_cold_contact(state):
    prospect = await contacted(state, "Dois envios")
    await state.add_outbox_item(
        prospect_id=prospect.id, to_email=prospect.phone, subject="", body="Segundo",
        send_at="2026-01-01", status="sent", channel="whatsapp", kind="sequence", step=2,
    )
    stats = await state.cold_outreach_stats()
    assert stats["contacted"] == stats["contacted_today"] == 1


@pytest.mark.asyncio
async def test_other_channels_empty_threads_and_test_contacts_stay_out(state):
    by_email = await contacted(state, "Só email", channel="email")
    await answered(state, by_email, "interested", channel="email")
    empty = await contacted(state, "Conversa vazia")
    await answered(state, empty, "interested", thread=[])
    outgoing = await contacted(state, "Só saída")
    await answered(state, outgoing, "question", thread=[Message(sender="harvey", content="Oi")])
    marked = await contacted(state, "Contato de teste")
    await answered(state, marked, "interested")
    await state.set_setting(f"wa_test_contact:{marked.id}", "1")

    stats = await state.cold_outreach_stats()
    assert stats["contacted"] == 2          # the email one and the test one are out
    assert stats["replied"] == 0

    email_stats = await state.cold_outreach_stats("email")
    assert email_stats["contacted"] == email_stats["replied"] == 1


@pytest.mark.asyncio
async def test_seven_day_window_uses_timestamps_not_string_order(state):
    recent = await contacted(state, "Recente", days_ago=1)
    await answered(state, recent, "question")
    old = await contacted(state, "Antigo", days_ago=8)
    await answered(state, old, "interested")

    stats = await state.cold_outreach_stats()
    assert stats["contacted"] == stats["replied"] == 2
    assert stats["contacted_7d"] == stats["replied_7d"] == 1
    assert stats["rate_7d"] == 1.0


@pytest.mark.asyncio
async def test_todays_numbers_count_answers_by_when_they_arrived(state):
    """A reply today to someone messaged last week is a reply today."""
    old = await contacted(state, "Abordado na semana passada", days_ago=6)
    await answered(state, old, "question")                      # wrote back today
    yesterday = await contacted(state, "Respondeu ontem", days_ago=2)
    await answered(state, yesterday, "question", days_ago=1)
    fresh = await contacted(state, "Abordado hoje")
    await answered(state, fresh, "interested")
    await contacted(state, "Abordado hoje, calado")

    stats = await state.cold_outreach_stats()
    assert stats["contacted"] == 4
    assert stats["contacted_today"] == 2
    assert stats["replied"] == 3
    assert stats["replied_today"] == 2          # the old contact and today's


@pytest.mark.asyncio
async def test_an_auto_responder_is_not_an_answer_today(state):
    bot = await contacted(state, "Autoresposta")
    await answered(state, bot, "ooo")
    assert (await state.cold_outreach_stats())["replied_today"] == 0


@pytest.mark.asyncio
async def test_a_reply_from_someone_never_messaged_cold_is_not_counted(state):
    from harvey.models.prospect import Prospect as P
    walk_in = P(company="Chegou sozinho", phone="5511000000000", status="contacted")
    walk_in.id = await state.add_prospect(walk_in)
    await answered(state, walk_in, "interested")
    assert (await state.cold_outreach_stats())["replied_today"] == 0


@pytest.mark.asyncio
async def test_daily_series_covers_the_whole_history_and_keeps_silent_days(state):
    first = await contacted(state, "Primeiro", days_ago=3)
    await answered(state, first, "question", days_ago=3)
    await contacted(state, "Hoje")

    days = await state.cold_outreach_by_day()
    assert len(days) == 4                       # from the first send to today
    assert [d["sent"] for d in days] == [1, 0, 0, 1]
    assert [d["replied"] for d in days] == [1, 0, 0, 0]
    assert days[-1]["day"] == datetime.now(timezone.utc).date().isoformat()
    assert [d["sent"] for d in await state.cold_outreach_by_day(2)] == [0, 1]


@pytest.mark.asyncio
async def test_the_daily_series_is_empty_before_the_first_cold_message(state):
    assert await state.cold_outreach_by_day() == []


# ── why it stopped ──


def status(**over):
    base = dict(enabled=True, paused="", cold_paused=False, quiet=False,
                cap=25, sent_today=5, left=20, pending=0, approved=0,
                ready=0, untouched=0)
    return cold_status(**{**base, **over})


def test_a_switch_beats_a_clock_which_beats_a_cap():
    """Every reason below is also true here; only the top one is reported."""
    blocked = dict(paused="parado pelo usuário", cold_paused=True, quiet=True,
                   left=0, pending=3)
    assert status(enabled=False, **blocked)["title"] == "Canal desligado"
    assert status(**blocked)["title"] == "Envio pausado"
    assert status(**{**blocked, "paused": ""})["title"] == "Mensagens frias em pausa"
    assert status(**{**blocked, "paused": "", "cold_paused": False})["title"] == "Horário de silêncio"
    assert "Limite do dia" in status(left=0, pending=3, quiet=False)["title"]


def test_an_empty_queue_is_only_the_answer_when_nothing_else_blocks():
    assert "aprovação" in status(pending=3, approved=1)["title"]
    assert "fila para sair" in status(approved=2)["title"]
    assert "redação" in status(ready=4, untouched=9)["title"]
    assert "virando contato" in status(untouched=9)["title"]
    out = status()
    assert out["title"] == "Acabaram os contatos" and out["tone"] == "warn"


def test_a_cap_of_zero_reads_as_a_setting_not_as_a_day_that_ran_out():
    """max_daily_sends: 0 stops sending outright — a queue won't drain tomorrow
    either, so pointing at the cap is the only useful answer."""
    out = status(cap=0, left=0, approved=1)
    assert out["title"] == "Limite diário zerado" and out["tone"] == "bad"

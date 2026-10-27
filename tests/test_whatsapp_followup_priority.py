"""Existing WhatsApp conversations cannot be starved by the cold outbox."""

import pytest

from harvey.models.conversation import Message
from harvey.models.prospect import Prospect
from tests.test_whatsapp import (
    _now_iso,
    make_agent,
    quiet_conversation,
    state,
)


async def pending_followup(state):
    prospect = Prospect(company="Loja interessada", phone="5511912345678", status="replied")
    prospect.id = await state.add_prospect(prospect)
    convo = await quiet_conversation(state, prospect, hours_ago=25)
    item_id = await state.add_outbox_item(
        prospect_id=prospect.id, conversation_id=convo.id, kind="followup",
        to_email=prospect.phone, subject="", body="Posso ajudar com o exemplo que você pediu?",
        status="approved", provider="wa-akg", channel="whatsapp", send_at=_now_iso(-5),
    )
    return prospect, convo, item_id


@pytest.mark.asyncio
async def test_due_followup_precedes_more_than_sixty_older_cold_messages(state):
    agent = make_agent(state, max_daily_sends=1)
    for i in range(65):
        prospect = Prospect(
            company=f"Loja {i}", phone=f"551198765{i:04d}", status="queued",
            phone_verified=True,
        )
        prospect.id = await state.add_prospect(prospect)
        await state.add_outbox_item(
            prospect_id=prospect.id, kind="sequence", to_email=prospect.phone,
            subject="", body="Oi! Como vocês apresentam os produtos hoje?",
            status="approved", provider="wa-akg", channel="whatsapp", send_at=_now_iso(-60),
        )
    prospect, _, item_id = await pending_followup(state)

    await agent.send()

    assert agent.client.sent[0][0] == prospect.phone
    assert len(agent.client.sent) == 2  # one follow-up and the single allowed cold message
    assert (await state.get_outbox_item(item_id))["status"] == "sent"
    assert len(await state.get_outbox(status="approved", kind="sequence")) == 64


@pytest.mark.asyncio
async def test_cold_daily_cap_does_not_hold_an_approved_followup(state):
    agent = make_agent(state, max_daily_sends=0)
    prospect, convo, item_id = await pending_followup(state)

    await agent.send()

    assert [phone for phone, _ in agent.client.sent] == [prospect.phone]
    assert (await state.get_outbox_item(item_id))["status"] == "sent"
    stored = await state.get_conversation(convo.id)
    assert stored.thread[-1].content == agent.client.sent[0][1]


@pytest.mark.asyncio
@pytest.mark.parametrize("quiet_hours", [False, True])
async def test_fast_watcher_leaves_followups_for_the_heartbeat(state, monkeypatch, quiet_hours):
    agent = make_agent(state)
    agent.send_pacing = True
    monkeypatch.setattr("harvey.main.in_quiet_hours", lambda _: quiet_hours)
    _, _, item_id = await pending_followup(state)

    await agent.send(replies_only=True)

    assert agent.client.sent == []
    assert (await state.get_outbox_item(item_id))["status"] == "approved"


@pytest.mark.asyncio
@pytest.mark.parametrize("reason", [
    "customer_replied", "closed", "needs_human", "opted_out", "lost", "meeting",
])
async def test_followup_rechecks_customer_and_conversation_before_sending(state, reason):
    agent = make_agent(state)
    prospect, convo, item_id = await pending_followup(state)
    if reason == "customer_replied":
        convo.thread.append(Message(sender="prospect", content="Voltei, tenho uma dúvida."))
        await state.update_conversation(convo.id, thread_json=convo.thread_json())
    elif reason in {"closed", "needs_human"}:
        await state.update_conversation(convo.id, status=reason)
    else:
        await state.update_prospect_status(prospect.id, reason)

    await agent.send()

    assert agent.client.sent == []
    assert (await state.get_outbox_item(item_id))["status"] == "cancelled"

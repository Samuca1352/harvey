"""Sales regressions from courtesy, referrals, and trial acceptance.

All messages and model responses are local stubs; nothing reaches a gateway.
"""

import pytest

from harvey.models.conversation import Conversation, Message
from tests.test_whatsapp import (
    ReplyBrain, contacted_prospect, inbound, make_handler, state,
)


async def conversation(state, prospect, last="Obrigado pela ajuda! Boas vendas!", **kw):
    convo = Conversation(
        id="", prospect_id=prospect.id, channel="whatsapp",
        intent="referral", stage="presenting", thread=[
            Message(sender="prospect", content="Pode mandar, eu passo para o dono da loja."),
            Message(sender="harvey", content=last),
        ], **kw,
    )
    convo.id = await state.add_conversation(convo)
    return convo


@pytest.mark.asyncio
@pytest.mark.parametrize("thanks", ["obrigada, voces tambem", "Obrigada, igualmente 😊", "blzz"])
async def test_courtesy_after_referral_keeps_the_opportunity_without_another_pitch(state, thanks):
    prospect = await contacted_prospect(state)
    convo = await conversation(state, prospect)
    handler = make_handler(state, intent="not_interested")  # reproduce the old bad classification
    handler.wa.inbound[prospect.phone] = inbound(thanks)
    await handler.run()
    saved = await state.get_conversation(convo.id)
    assert (saved.status, saved.stage, saved.intent) == ("open", "presenting", "referral")
    assert saved.thread[-1].content == thanks
    assert (await state.get_prospect(prospect.id)).status == "replied"
    assert not [o for o in await state.get_outbox(channel="whatsapp") if o["kind"] == "reply"]


@pytest.mark.asyncio
@pytest.mark.parametrize("text,intent,status", [
    ("Obrigada, não quero receber mensagens", "interested", "opted_out"),
    ("Obrigada, mas já temos uma solução e vamos ficar com ela", "not_interested", "lost"),
])
async def test_courtesy_does_not_hide_a_refusal(state, text, intent, status):
    prospect = await contacted_prospect(state)
    convo = await conversation(state, prospect)
    handler = make_handler(state, intent=intent)
    handler.wa.inbound[prospect.phone] = inbound(text)
    await handler.run()
    assert (await state.get_prospect(prospect.id)).status == status
    assert (await state.get_conversation(convo.id)).status == "closed"


class ContextBrain(ReplyBrain):
    def __init__(self, intent):
        super().__init__(intent=intent)
        self.classification_prompt = ""

    async def think(self, prompt, session_id=None, agent="", task=""):
        if task == "classify_intent":
            self.classification_prompt = prompt
        return await super().think(prompt, session_id=session_id, agent=agent, task=task)


@pytest.mark.asyncio
@pytest.mark.parametrize("offer", ["Quer receber o link para testar?", "Me avisa se quer receber o link para testar."])
async def test_classifier_receives_the_correct_channel_history_and_opener(state, offer):
    prospect = await contacted_prospect(state)
    email = Conversation(id="", prospect_id=prospect.id, channel="email", thread=[
        Message(sender="prospect", content="EMAIL-ONLY HISTORY"),
    ])
    await state.add_conversation(email)
    convo = await conversation(state, prospect, last=offer)
    handler = make_handler(state)
    handler.brain = ContextBrain("interested")
    handler.wa.inbound[prospect.phone] = inbound("Ok")
    await handler.run()
    prompt = handler.brain.classification_prompt
    assert "latest whatsapp message" in prompt
    assert offer in prompt
    assert await state.get_first_sent_whatsapp(prospect.id) in prompt
    assert "EMAIL-ONLY HISTORY" not in prompt
    assert (await state.get_conversation(convo.id)).thread[-1].content == "Ok"
    assert len([o for o in await state.get_outbox(channel="whatsapp") if o["kind"] == "reply"]) == 1


@pytest.mark.asyncio
async def test_greeting_does_not_advance_a_sale(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="greeting")
    handler.wa.inbound[prospect.phone] = inbound("Oi Rafael, boa tarde!")
    await handler.run()
    convo = (await state.get_conversations_by_status("open"))[0]
    assert (convo.intent, convo.stage) == ("greeting", "initial_outreach")
    assert len([o for o in await state.get_outbox(channel="whatsapp") if o["kind"] == "reply"]) == 1


@pytest.mark.asyncio
async def test_forwarding_to_the_owner_is_a_referral_not_a_loss_or_meeting(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="referral")
    handler.wa.inbound[prospect.phone] = inbound("Vou passar pro responsável da loja")
    await handler.run()
    convo = (await state.get_conversations_by_status("open"))[0]
    assert convo.intent == "referral" and convo.stage == "initial_outreach"
    assert (await state.get_prospect(prospect.id)).status == "replied"


@pytest.mark.asyncio
@pytest.mark.parametrize("text", ["Quero testar", "Quero testar sem reunião", "Quero testar, minha loja funciona 24h"])
async def test_trial_interest_is_not_recorded_as_a_meeting(state, text):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="interested")
    handler.config.product.offer.goal = "start_trial"
    handler.wa_cfg.notify_group = "120363428715949829@g.us"
    handler.wa.inbound[prospect.phone] = inbound(text)
    await handler.run()
    assert (await state.get_prospect(prospect.id)).status == "replied"
    convo = (await state.get_conversations_by_status("open"))[0]
    assert convo.stage == "closing"  # intent to begin, not a completed activation
    assert len(handler.wa.sent) == 1
    assert "ativação ainda não confirmados" in handler.wa.sent[0][1]
    assert "Reunião" not in handler.wa.sent[0][1]


@pytest.mark.asyncio
@pytest.mark.parametrize("delivery", ["ok", "missing", "failed"])
async def test_accepted_demo_has_a_handoff_even_without_designer_in_the_reply(state, delivery):
    from harvey.integrations.whatsapp import WaSendResult
    prospect = await contacted_prospect(state)
    convo = await conversation(state, prospect, last="Posso te mostrar um exemplo?")
    handler = make_handler(state, intent="interested")
    handler.brain._reply = "Combinado, vou solicitar o material."
    if delivery != "missing":
        handler.wa_cfg.notify_group = "120363428715949829@g.us"
    if delivery == "failed":
        async def fail(*args):
            return WaSendResult(ok=False, error="offline")
        handler.wa.send_jid = fail
    handler.wa.inbound[prospect.phone] = inbound("Pode mostrar sim")
    await handler.run()
    saved = await state.get_conversation(convo.id)
    if delivery == "ok":
        assert any("pediu vídeo ou exemplo" in text for _, text in handler.wa.sent)
        assert saved.status == "open"
    else:
        assert saved.status == "needs_human"
    assert len([o for o in await state.get_outbox(channel="whatsapp") if o["kind"] == "reply"]) == 1

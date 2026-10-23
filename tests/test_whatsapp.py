"""WhatsApp channel (WA-AKG) and the Google Maps scraper discovery source.

Nothing here touches the network: the gateway and the scraper are httpx mock
transports, and the brain is a stub that returns canned drafts.
"""

import asyncio
import json
import os
import tempfile
from datetime import datetime, timedelta, timezone

import httpx
import pytest
import pytest_asyncio

from harvey.agents.handler import DEMO_REQUEST_RE, Handler, is_auto_message, wants_opt_out_pt
from harvey.agents.sender import Sender
from harvey.agents.whatsapp import WhatsAppAgent
from harvey.collectors import discover as D
from harvey.config import EnvConfig, WhatsAppChannelConfig, load_config
from harvey.gate import pre_send_check_whatsapp
from harvey.integrations.whatsapp import (
    WaInbound,
    WaSendResult,
    HANDOFF_SUBJECT,
    WhatsAppClient,
    _parse_ts,
    contact_first_name,
    is_mobile,
    normalize_phone,
    parse_contact_cards,
)
from harvey.models import Company
from harvey.models.prospect import Prospect
from harvey.state import StateManager


def _now_iso(minutes=0):
    return (datetime.now(timezone.utc).replace(tzinfo=None) + timedelta(minutes=minutes)).isoformat()


@pytest_asyncio.fixture
async def state():
    with tempfile.TemporaryDirectory() as tmp:
        sm = StateManager(os.path.join(tmp, "test.db"))
        await sm.init_db()
        yield sm


# ── phone numbers ──


@pytest.mark.parametrize("raw,expected", [
    ("(11) 91234-5678", "5511912345678"),
    ("+55 11 91234-5678", "5511912345678"),
    ("011 91234 5678", "5511912345678"),
    ("0055 11 91234-5678", "5511912345678"),
    ("11912345678", "5511912345678"),
    ("(11) 8123-4567", "5511981234567"),      # old 8-digit mobile gets its 9
    ("(11) 3456-7890", "551134567890"),       # landline: kept, but not mobile
    ("91234-5678", ""),                        # no area code
    ("", ""),
    ("abc", ""),
])
def test_normalize_phone_brazil(raw, expected):
    assert normalize_phone(raw, "55") == expected


def test_is_mobile():
    assert is_mobile("5511912345678")
    assert not is_mobile("551134567890")      # landline
    assert not is_mobile("")
    assert is_mobile("14155550123")           # non-BR: the gateway decides


# ── gateway client ──


def _env():
    return EnvConfig(wa_akg_url="http://wa.test", wa_akg_api_key="k", wa_akg_session_id="s1")


def _client(handler):
    return WhatsAppClient(_env(), transport=httpx.MockTransport(handler))


@pytest.mark.asyncio
async def test_client_not_configured():
    ok, detail = await WhatsAppClient(EnvConfig()).test_connection()
    assert not ok and "WA_AKG_URL" in detail


@pytest.mark.asyncio
async def test_client_connection_states():
    def make(status):
        def handler(request):
            assert request.headers["x-api-key"] == "k"
            return httpx.Response(200, json={"data": {"status": status, "me": {"id": "5511999990000:1@s.whatsapp.net"}}})
        return handler

    ok, detail = await _client(make("CONNECTED")).test_connection()
    assert ok and "5511999990000" in detail
    ok, detail = await _client(make("STOPPED")).test_connection()
    assert not ok and "STOPPED" in detail
    ok, detail = await _client(lambda r: httpx.Response(401)).test_connection()
    assert not ok and "API key" in detail


@pytest.mark.asyncio
async def test_client_send_text():
    seen = {}

    def handler(request):
        seen["path"] = request.url.path
        seen["body"] = json.loads(request.content)
        return httpx.Response(200, json={"status": True, "data": {"key": {"id": "WAID1"}}})

    result = await _client(handler).send_text("5511912345678", "oi")
    assert result.ok and result.message_id == "WAID1"
    assert seen["path"] == "/api/messages/s1/5511912345678@s.whatsapp.net/send"
    assert seen["body"] == {"message": {"text": "oi"}}


@pytest.mark.asyncio
async def test_client_send_failures_know_if_retry_is_safe():
    r = await _client(lambda q: httpx.Response(503, json={"message": "WhatsApp session is disconnected"})).send_text("5511912345678", "x")
    assert not r.ok and r.retryable
    r = await _client(lambda q: httpx.Response(400, json={"status": False, "message": "bad jid"})).send_text("5511912345678", "x")
    assert not r.ok and not r.retryable

    def unreachable(request):
        raise httpx.ConnectError("refused")
    r = await _client(unreachable).send_text("5511912345678", "x")
    assert not r.ok and r.retryable

    def read_timeout(request):
        raise httpx.ReadTimeout("slow")
    r = await _client(read_timeout).send_text("5511912345678", "x")
    assert not r.ok and not r.retryable      # it may have gone out: never retry


@pytest.mark.asyncio
async def test_client_exists():
    ok = lambda q: httpx.Response(200, json={"data": {"results": [{"number": "x", "exists": True, "jid": "j"}]}})
    no = lambda q: httpx.Response(200, json={"data": {"results": [{"number": "x", "exists": False, "jid": None}]}})
    down = lambda q: httpx.Response(503)
    assert await _client(ok).exists("5511912345678") is True
    assert await _client(no).exists("5511912345678") is False
    assert await _client(down).exists("5511912345678") is None


@pytest.mark.asyncio
async def test_client_get_incoming_filters_and_orders():
    rows = [
        {"keyId": "b", "fromMe": False, "type": "TEXT", "content": "segunda", "timestamp": "2026-10-20T12:05:00.000Z"},
        {"keyId": "mine", "fromMe": True, "type": "TEXT", "content": "oi", "timestamp": "2026-10-20T12:00:00.000Z"},
        {"keyId": "old", "fromMe": False, "type": "TEXT", "content": "antiga", "timestamp": "2026-10-19T09:00:00.000Z"},
        {"keyId": "a", "fromMe": False, "type": "TEXT", "content": "primeira", "timestamp": "2026-10-20T12:01:00.000Z"},
    ]

    def handler(request):
        assert request.url.params["jid"] == "5511912345678@s.whatsapp.net"
        assert request.url.params["fromMe"] == "false"
        return httpx.Response(200, json={"data": rows})

    got = await _client(handler).get_incoming("5511912345678", since="2026-10-20T11:59:00")
    assert [m.id for m in got] == ["a", "b"]


# ── gate ──


def test_whatsapp_gate():
    p = Prospect(phone="5511912345678")
    assert pre_send_check_whatsapp("5511912345678", "Oi, tudo bem? Vi a loja de vocês.", prospect=p)
    bad = pre_send_check_whatsapp("5511912345678", "Clique aqui https://x.co {{company}}", prospect=p)
    assert not bad
    text = " ".join(bad.reasons)
    assert "banned" in text and "merge" in text and "link" in text
    assert not pre_send_check_whatsapp("123", "oi")
    assert not pre_send_check_whatsapp("5511912345678", "oi", prospect=Prospect(phone="5511900000000"))
    assert not pre_send_check_whatsapp("5511912345678", "palavra " * 120)
    assert not pre_send_check_whatsapp("5511912345678", "")


# ── config ──


def test_whatsapp_config_validation():
    assert WhatsAppChannelConfig().enabled is False
    assert WhatsAppChannelConfig(default_country_code="+55").default_country_code == "55"
    with pytest.raises(ValueError):
        WhatsAppChannelConfig(max_daily_sends=-1)
    with pytest.raises(ValueError):
        WhatsAppChannelConfig(min_gap_seconds=90, max_gap_seconds=30)


# ── agent ──


class FakeBrain:
    paused_reason = ""

    def __init__(self, draft="Oi, tudo bem? Vi a Loja da Maria no Maps. Vocês vendem pelo WhatsApp?"):
        self.draft = draft
        self.calls = 0

    def load_skills_for_agent(self, *_):
        return ""

    def load_prompt(self, *_a, **_k):
        return "PROMPT"

    # Later drafts differ: the writer rejects an opener too close to a recent one.
    OTHERS = (
        "Boa tarde! Rafael aqui, da Prospect Boost. O que mais sai na loja de vocês hoje?",
        "Opa, tudo certo? Sou o Rafael. Como os clientes costumam fazer pedido aí: Instagram ou balcão?",
        "Olá! Vi que vocês trabalham com roupa em Votuporanga. Quem cuida das vendas pelo celular?",
        "E aí, tudo bom? Rafael, da Prospect Boost. Muita gente pergunta preço por mensagem pra vocês?",
        "Como vai? Pergunta rápida: quando chega coleção nova, como vocês avisam a clientela?",
    )

    async def think_json(self, prompt, **_k):
        self.calls += 1
        if not self.draft:
            return None
        return {"body": self.draft if self.calls == 1 else self.OTHERS[(self.calls - 2) % len(self.OTHERS)]}

    async def think(self, prompt, **_k):
        return self.draft


class FakeWa:
    """Stands in for the gateway client."""

    name = "fake-wa"

    def __init__(self):
        self.sent = []
        self.online = True
        self.has_whatsapp = True
        self.result = WaSendResult(True, message_id="WA1")
        self.inbound: dict[str, list[WaInbound]] = {}
        self.read: list[tuple[str, list[str]]] = []
        self.typing = False

    def is_configured(self):
        return True

    async def test_connection(self):
        return (self.online, "ok" if self.online else "session STOPPED")

    async def exists(self, phone):
        return self.has_whatsapp

    async def send_text(self, phone, text):
        if self.result.ok:
            self.sent.append((phone, text))
        return self.result

    async def send_jid(self, jid, text):
        if self.result.ok:
            self.sent.append((jid, text))
        return self.result

    async def get_incoming(self, phone, since="", limit=30):
        return self.inbound.get(phone, [])

    async def mark_read(self, phone, message_ids):
        self.read.append((phone, message_ids))
        return True

    async def download_audio(self, message_id):
        return b""

    async def is_typing(self, phone):
        return self.typing

    status = "CONNECTED"
    starts = 0

    async def session_status(self):
        return self.status if not self.online else "CONNECTED"

    async def start_session(self):
        self.starts += 1
        self.online = True
        return True


def make_agent(state, brain=None, **overrides):
    config = load_config()
    config.channels.whatsapp.enabled = True
    config.channels.whatsapp.require_approval = True      # whatever the real config says
    config.channels.whatsapp.opt_out_lines = WhatsAppChannelConfig().opt_out_lines
    config.channels.whatsapp.ramp_start_sends = 0
    config.channels.whatsapp.max_daily_sends = 25
    for key, value in overrides.items():
        setattr(config.channels.whatsapp, key, value)
    agent = WhatsAppAgent(brain or FakeBrain(), state, config, _env(), client=FakeWa())
    agent.send_pacing = False
    return agent


async def seed_company(state, name="Loja da Maria", phone="(11) 91234-5678", domain="", ext="gmaps:1"):
    return await state.add_company(Company(
        name=name, domain=domain, phone=phone, industry="Loja de roupas",
        location="São Paulo", external_id=ext, source="discover:gmaps_scraper",
    ))


@pytest.mark.asyncio
async def test_prepare_creates_prospects_and_sets_aside_bad_numbers(state):
    agent = make_agent(state)
    await seed_company(state, "Loja da Maria", "(11) 91234-5678", ext="gmaps:1")
    await seed_company(state, "Padaria Fixa", "(11) 3456-7890", ext="gmaps:2")
    await seed_company(state, "Filial da Maria", "11 91234-5678", ext="gmaps:3")   # same number
    await seed_company(state, "Sem Telefone", "", ext="gmaps:4")

    assert await agent.prepare() == 1
    new = await state.get_prospects_by_status("new")
    assert [p.company for p in new] == ["Loja da Maria"]
    assert new[0].phone == "5511912345678" and new[0].source == "whatsapp:business"
    lost = {p.company for p in await state.get_prospects_by_status("lost")}
    assert lost == {"Padaria Fixa", "Filial da Maria"}
    # idempotent: a second pass finds nothing new
    assert await agent.prepare() == 0


@pytest.mark.asyncio
async def test_write_stages_a_pending_message_with_opt_out(state):
    agent = make_agent(state)
    await seed_company(state)
    await agent.prepare()
    assert await agent.write() == 1

    items = await state.get_outbox(channel="whatsapp")
    assert len(items) == 1
    item = items[0]
    assert item["status"] == "pending_review" and item["to_email"] == "5511912345678"
    assert any(item["body"].endswith(line) for line in WhatsAppChannelConfig().opt_out_lines)
    assert "SAIR" not in item["body"]
    assert item["channel"] == "whatsapp" and item["kind"] == "sequence"
    assert (await state.get_prospects_by_status("queued"))[0].phone == "5511912345678"
    # nothing leaked into the email queue
    assert await state.get_outbox(channel="email") == []
    # and a second pass doesn't draft twice
    assert await agent.write() == 0


@pytest.mark.asyncio
async def test_write_autopilot_and_no_opt_out_line(state):
    agent = make_agent(state, require_approval=False, opt_out_lines=[])
    await seed_company(state)
    await agent.prepare()
    await agent.write()
    item = (await state.get_outbox(channel="whatsapp"))[0]
    assert item["status"] == "approved"
    assert item["body"] == "Oi, tudo bem? Vi a Loja da Maria no Maps. Vocês vendem pelo WhatsApp?"


@pytest.mark.asyncio
async def test_write_retries_a_draft_the_gate_rejects_then_gives_up(state):
    brain = FakeBrain(draft="Clique aqui para comprar agora")
    brain.OTHERS = (brain.draft,)                 # every retry just as bad
    agent = make_agent(state, brain)
    await seed_company(state)
    await agent.prepare()
    for _ in range(3):
        assert await agent.write() == 0
    assert (await state.get_outbox(channel="whatsapp")) == []
    assert [p.company for p in await state.get_prospects_by_status("lost")] == ["Loja da Maria"]
    calls = brain.calls
    await agent.write()                       # nothing left to draft
    assert brain.calls == calls


async def staged_agent(state, **overrides):
    overrides.setdefault("require_approval", False)
    agent = make_agent(state, **overrides)
    await seed_company(state)
    await agent.prepare()
    await agent.write()
    return agent


@pytest.mark.asyncio
async def test_send_delivers_and_marks_contacted(state):
    agent = await staged_agent(state)
    await agent.send()
    assert agent.client.sent and agent.client.sent[0][0] == "5511912345678"
    item = (await state.get_outbox(channel="whatsapp"))[0]
    assert item["status"] == "sent" and item["message_id"] == "WA1"
    prospect = (await state.get_prospects_by_status("contacted"))[0]
    assert prospect.phone_verified is True
    assert await state.count_outbox_sent_today(channel="whatsapp") == 1
    assert await state.count_outbox_sent_today(channel="email") == 0
    # sending again does nothing
    await agent.send()
    assert len(agent.client.sent) == 1


@pytest.mark.asyncio
async def test_send_waits_for_approval(state):
    agent = await staged_agent(state, require_approval=True)
    await agent.send()
    assert agent.client.sent == []
    await state.approve_outbox()
    await agent.send()
    assert len(agent.client.sent) == 1


@pytest.mark.asyncio
async def test_send_holds_while_session_is_offline(state):
    agent = await staged_agent(state)
    agent.client.online = False
    await agent.send()
    assert agent.client.sent == []
    assert (await state.get_outbox(channel="whatsapp"))[0]["status"] == "approved"


@pytest.mark.asyncio
async def test_send_drops_numbers_without_whatsapp(state):
    agent = await staged_agent(state)
    agent.client.has_whatsapp = False
    await agent.send()
    item = (await state.get_outbox(channel="whatsapp"))[0]
    assert item["status"] == "failed" and "not on WhatsApp" in item["error"]
    assert [p.company for p in await state.get_prospects_by_status("lost")] == ["Loja da Maria"]


@pytest.mark.asyncio
async def test_send_retryable_failure_stays_approved_and_hard_failure_does_not(state):
    agent = await staged_agent(state)
    agent.client.result = WaSendResult(False, error="gateway unreachable", retryable=True)
    await agent.send()
    assert (await state.get_outbox(channel="whatsapp"))[0]["status"] == "approved"
    agent.client.result = WaSendResult(False, error="400: bad jid")
    await agent.send()
    assert (await state.get_outbox(channel="whatsapp"))[0]["status"] == "failed"


@pytest.mark.asyncio
async def test_send_stops_on_reply_and_respects_kill_switch(state):
    agent = await staged_agent(state)
    prospect = (await state.get_prospects_by_status("queued"))[0]
    await state.set_setting("sending_paused", "test")
    await agent.send()
    assert agent.client.sent == []
    await state.set_setting("sending_paused", "")
    await state.update_prospect_status(prospect.id, "replied")
    await agent.send()
    assert agent.client.sent == []
    assert (await state.get_outbox(channel="whatsapp"))[0]["status"] == "cancelled"


@pytest.mark.asyncio
async def test_daily_cap_applies_to_cold_messages_only(state):
    agent = make_agent(state, require_approval=False, max_daily_sends=1)
    for i in range(3):
        await seed_company(state, f"Loja {i}", f"(11) 9123{i}-5678", ext=f"gmaps:{i}")
    await agent.prepare()
    await agent.write()
    await agent.send()
    assert len(agent.client.sent) == 1                       # cap of 1 cold message

    # a reply to someone who wrote back is not held by the cold cap
    contacted = (await state.get_prospects_by_status("contacted"))[0]
    await state.add_outbox_item(
        prospect_id=contacted.id, to_email=contacted.phone, subject="", body="Claro! Posso te mandar um exemplo?",
        send_at=_now_iso(), status="approved", channel="whatsapp", kind="reply", provider="wa-akg",
    )
    await agent.send()
    assert len(agent.client.sent) == 2
    assert agent.client.sent[1][1].startswith("Claro!")


@pytest.mark.asyncio
async def test_a_reply_frees_a_slot_under_the_unanswered_cap(state):
    from harvey.models.conversation import Conversation, Message
    agent = make_agent(state, require_approval=False, max_daily_sends=10, max_daily_unanswered=1)
    for i in range(3):
        await seed_company(state, f"Loja {i}", f"(11) 9123{i}-5678", ext=f"gmaps:{i}")
    await agent.prepare()
    await agent.write()
    await agent.send()
    assert len(agent.client.sent) == 1                       # one unanswered: stop

    first = (await state.get_prospects_by_status("contacted"))[0]
    await state.update_prospect_status(first.id, "opted_out")
    await state.add_conversation(Conversation(id="", prospect_id=first.id, channel="whatsapp",
                                              thread=[Message(sender="prospect", content="SAIR")]))
    await agent.send()
    assert len(agent.client.sent) == 1                       # an opt-out is not an answer

    await state.update_prospect_status(first.id, "replied")
    await agent.send()
    assert len(agent.client.sent) == 2                       # a real answer frees the slot


@pytest.mark.asyncio
async def test_email_sender_ignores_whatsapp_rows(state):
    agent = await staged_agent(state)

    class MailBoom:
        name = "boom"
        def is_configured(self): return True
        async def send_email(self, *a, **k): raise AssertionError("email provider must not send WhatsApp rows")

    from tests.test_outbox_native import Cfg, Env
    sender = Sender(brain=None, state=state, config=Cfg(), env=Env())
    sender.provider = MailBoom()
    sender.send_pacing = False
    await sender._drain_due()
    assert (await state.get_outbox(channel="whatsapp"))[0]["status"] == "approved"


# ── replies ──


class ReplyBrain(FakeBrain):
    def __init__(self, intent="question", reply="Claro! Posso te mostrar um exemplo?"):
        super().__init__()
        self._intent, self._reply = intent, reply

    async def think(self, prompt, session_id=None, agent="", task=""):
        return self._intent if task == "classify_intent" else self._reply


def make_handler(state, intent="question"):
    config = load_config()
    config.channels.whatsapp.enabled = True
    config.channels.whatsapp.require_approval = True
    config.channels.whatsapp.notify_group = ""          # whatever the real config says
    config.channels.whatsapp.notify_phone = ""
    handler = Handler(brain=ReplyBrain(intent), state=state, config=config, env=EnvConfig(
        wa_akg_url="http://wa.test", wa_akg_api_key="k", wa_akg_session_id="s1"))
    handler.wa = FakeWa()
    return handler


async def contacted_prospect(state):
    agent = await staged_agent(state)
    await agent.send()
    return (await state.get_prospects_by_status("contacted"))[0]


def inbound(*texts, start=0):
    return [WaInbound(id=f"M{start + i}", phone="5511912345678", body=t,
                      timestamp=f"2026-10-20T12:0{i}:00Z") for i, t in enumerate(texts)]


@pytest.mark.asyncio
async def test_reply_is_answered_through_the_whatsapp_outbox(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.wa.inbound["5511912345678"] = inbound("Oi!", "Quanto custa?")

    assert await handler.run() is True
    assert (await state.get_prospect(prospect.id)).status == "replied"
    replies = [i for i in await state.get_outbox(channel="whatsapp") if i["kind"] == "reply"]
    assert len(replies) == 1
    assert replies[0]["status"] == "pending_review" and replies[0]["to_email"] == "5511912345678"
    assert await state.get_outbox(channel="email") == []
    convo = (await state.get_conversations_by_status("open"))[0]
    assert convo.channel == "whatsapp"
    assert [m.content for m in convo.thread][0] == "Oi!\nQuanto custa?"   # two messages, one answer
    assert handler.wa.read == [("5511912345678", ["M0", "M1"])]          # blue ticks

    # the same messages are never handled twice
    await handler.run()
    assert len([i for i in await state.get_outbox(channel="whatsapp") if i["kind"] == "reply"]) == 1


@pytest.mark.asyncio
async def test_opt_out_in_portuguese_suppresses_the_number(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="interested")      # the keyword check must win
    handler.wa.inbound["5511912345678"] = inbound("SAIR")
    await handler.run()
    assert (await state.get_prospect(prospect.id)).status == "opted_out"
    assert [i for i in await state.get_outbox(channel="whatsapp") if i["kind"] == "reply"] == []


@pytest.mark.asyncio
async def test_threats_and_media_only_replies_go_to_a_human(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.wa.inbound["5511912345678"] = inbound("Vou chamar meu advogado, isso é spam")
    await handler.run()
    convo = (await state.get_conversations_by_status("needs_human"))[0]
    assert convo.prospect_id == prospect.id


@pytest.mark.asyncio
async def test_media_only_reply_is_escalated(state):
    await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.wa.inbound["5511912345678"] = [
        WaInbound(id="AUD1", phone="5511912345678", body="", type="AUDIO", timestamp="2026-10-20T12:00:00Z")
    ]
    await handler.run()
    assert len(await state.get_conversations_by_status("needs_human")) == 1
    assert [i for i in await state.get_outbox(channel="whatsapp") if i["kind"] == "reply"] == []


@pytest.mark.asyncio
async def test_client_is_typing_reads_fresh_presence_only():
    def make(presence, age=3, status=200):
        def handler(request):
            assert request.method == "GET"
            assert request.url.path == "/api/chat/s1/5511912345678@s.whatsapp.net/presence"
            return httpx.Response(status, json={"status": True, "data": {"presence": presence, "ageSeconds": age}})
        return handler

    assert await _client(make("composing")).is_typing("5511912345678")
    assert await _client(make("recording")).is_typing("5511912345678")
    assert not await _client(make("paused")).is_typing("5511912345678")
    assert not await _client(make("unknown", age=None)).is_typing("5511912345678")
    assert not await _client(make("composing", age=600)).is_typing("5511912345678")   # never cleared
    assert not await _client(make("composing", status=404)).is_typing("5511912345678")  # old gateway


def _at(iso: str, seconds: float) -> str:
    return (_parse_ts(iso) + timedelta(seconds=seconds)).isoformat()


def test_shop_bots_are_told_apart_from_people():
    first = "2026-10-21T17:00:00+00:00"
    greeting = "Havaianas Votuporanga, como podemos ajudar?"
    assert is_auto_message(greeting, _at(first, 4), first)              # fired by our message
    assert not is_auto_message(greeting, _at(first, 3600), first)       # an hour later: a person
    assert is_auto_message("Olá! No momento não estamos disponíveis, retornaremos em breve.",
                           _at(first, 3600), first)                     # away message, any time
    assert not is_auto_message("Boa tarde! Pode me explicar sim", _at(first, 4), first)


def test_demo_alert_ignores_a_yes_to_being_shown():
    assert not DEMO_REQUEST_RE.search("Aqui é a Renata, sócia proprietária da loja, pode me mostrar sim.")
    assert DEMO_REQUEST_RE.search("tem algum vídeo?")
    assert DEMO_REQUEST_RE.search("tem uma loja pronta pra eu ver?")


@pytest.mark.asyncio
async def test_shop_bot_greeting_is_not_answered(state):
    await contacted_prospect(state)
    first = (await state.get_recent_whatsapp_contacts(3))[0]["first_sent_at"]
    handler = make_handler(state, intent="question")
    handler.wa.inbound["5511912345678"] = [WaInbound(
        id="G1", phone="5511912345678", body="Havaianas Votuporanga, como podemos ajudar?",
        timestamp=_at(first, 2))]
    await handler.run()
    assert [i for i in await state.get_outbox(channel="whatsapp") if i["kind"] == "reply"] == []
    assert await state.get_conversations_by_status("open") == []
    assert await state.is_reply_processed("wa:G1")


@pytest.mark.asyncio
async def test_no_answer_while_the_customer_is_still_typing(state):
    await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.wa.inbound["5511912345678"] = inbound("Oi!")
    handler.wa.typing = True
    await handler.run()
    assert [i for i in await state.get_outbox(channel="whatsapp") if i["kind"] == "reply"] == []
    assert not await state.is_reply_processed("wa:M0")              # read again next pass

    handler.wa.inbound["5511912345678"] = inbound("Oi!", "Quanto custa?")
    handler.wa.typing = False
    await handler.run()
    convo = (await state.get_conversations_by_status("open"))[0]
    assert convo.thread[0].content == "Oi!\nQuanto custa?"          # one answer to both


@pytest.mark.asyncio
async def test_a_message_that_just_arrived_waits_for_the_next_one(state):
    await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.wa.inbound["5511912345678"] = [WaInbound(
        id="N1", phone="5511912345678", body="Oi!",
        timestamp=datetime.now(timezone.utc).isoformat())]
    await handler.run()
    assert not await state.is_reply_processed("wa:N1")


@pytest.mark.asyncio
async def test_reply_is_held_while_the_customer_types_or_wrote_again(state):
    agent = await staged_agent(state)
    prospect = (await state.get_prospects_by_status("queued"))[0]
    await state.add_outbox_item(
        prospect_id=prospect.id, to_email=prospect.phone, subject="", body="Claro, te explico.",
        send_at=_now_iso(), status="approved", channel="whatsapp", kind="reply", provider="wa-akg",
    )
    async def not_yet():
        return False
    agent.cold_due = not_yet                                # only the reply is in play
    agent.client.typing = True
    await agent.send(replies_only=True)
    assert agent.client.sent == []

    agent.client.typing = False
    agent.client.inbound[prospect.phone] = [WaInbound(
        id="LATE", phone=prospect.phone, body="ah, e vende roupa infantil?",
        timestamp=datetime.now(timezone.utc).isoformat())]
    await agent.send(replies_only=True)
    assert agent.client.sent == []                                  # the handler redrafts

    await state.mark_reply_processed("wa:LATE")
    await agent.send(replies_only=True)
    assert [t for _, t in agent.client.sent] == ["Claro, te explico."]


def test_contact_cards_give_a_number_and_a_usable_first_name():
    assert parse_contact_cards("BARBIERI JOIAS RENAN AMOR | 5517988887777") == [
        ("BARBIERI JOIAS RENAN AMOR", "5517988887777")]
    assert parse_contact_cards("Ana\nBeto | 5511912345678") == [("Ana", ""), ("Beto", "5511912345678")]
    assert contact_first_name("BARBIERI JOIAS RENAN AMOR", "Barbieri Joias") == "Renan"
    assert contact_first_name("Mãe ❤️", "Loja da Maria") == ""
    assert contact_first_name("Amor", "Loja") == ""


@pytest.mark.asyncio
async def test_a_shared_contact_gets_a_warm_first_message(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="wrong_person")
    handler.wa_cfg.notify_phone = "5517997191017"
    handler.wa.inbound["5511912345678"] = [
        WaInbound(id="C1", phone="5511912345678", body="LOJA DA MARIA RENAN AMOR | 5517988887777",
                  type="CONTACT", timestamp="2026-10-20T12:00:00Z"),
        WaInbound(id="C2", phone="5511912345678", body="Oi chama este contato, por favor",
                  timestamp="2026-10-20T12:00:10Z"),
    ]
    await handler.run()

    renan = await state.get_prospect_by_phone("5517988887777")
    assert renan and renan.first_name == "Renan" and renan.company == prospect.company
    first = [i for i in await state.get_outbox(channel="whatsapp") if i["prospect_id"] == renan.id]
    assert len(first) == 1 and first[0]["subject"] == HANDOFF_SUBJECT and first[0]["kind"] == "sequence"
    assert any("Loja passou outro contato" in t and "+5517988887777" in t
               for p, t in handler.wa.sent if p == "5517997191017")
    convo = (await state.get_conversations_by_status("open"))[0]
    assert "Você vai chamar Renan agora" in convo.thread[0].content and "AMOR" not in convo.thread[0].content

    # the same card again: no second prospect, no second message
    handler.wa.inbound["5511912345678"].append(WaInbound(
        id="C3", phone="5511912345678", body="LOJA DA MARIA RENAN AMOR | 5517988887777",
        type="CONTACT", timestamp="2026-10-20T12:05:00Z"))
    await handler.run()
    assert len([i for i in await state.get_outbox(channel="whatsapp") if i["prospect_id"] == renan.id]) == 1


@pytest.mark.asyncio
async def test_a_card_without_a_number_asks_for_it(state):
    await contacted_prospect(state)
    handler = make_handler(state, intent="wrong_person")
    handler.wa.inbound["5511912345678"] = [WaInbound(
        id="C1", phone="5511912345678", body="Renan", type="CONTACT", timestamp="2026-10-20T12:00:00Z")]
    await handler.run()
    convo = (await state.get_conversations_by_status("open"))[0]
    assert "peça o número" in convo.thread[0].content


@pytest.mark.asyncio
async def test_shared_contact_message_goes_out_first_even_from_the_fast_watcher(state):
    agent = await staged_agent(state)                       # one approved COLD message
    renan = Prospect(first_name="Renan", company="Loja da Maria", phone="5517988887777",
                     source="whatsapp:contato_compartilhado", status="queued")
    renan.id = await state.add_prospect(renan)
    await state.add_outbox_item(
        prospect_id=renan.id, to_email="5517988887777", subject=HANDOFF_SUBJECT,
        body="Oi, Renan! Aqui é o Rafael. Falei com a Loja da Maria e me passaram seu contato.",
        send_at=_now_iso(), status="approved", channel="whatsapp", kind="sequence", provider="wa-akg",
    )
    async def not_yet():
        return False
    agent.cold_due = not_yet
    agent.cfg.cold_paused_until = "2999-01-01T08:00"
    await agent.send(replies_only=True)
    assert agent.client.sent == []                                    # restricted: nobody new
    agent.cfg.cold_paused_until = ""
    await agent.send(replies_only=True)
    assert [p for p, _ in agent.client.sent] == ["5517988887777"]     # cold one still waits


def test_opt_out_matching_is_word_based():
    assert wants_opt_out_pt("sair")
    assert wants_opt_out_pt("não quero receber isso")
    assert wants_opt_out_pt("por favor parem de me mandar mensagem")
    assert not wants_opt_out_pt("a parede da loja é azul")
    assert not wants_opt_out_pt("vou sair para almoçar e te chamo mais tarde")


# ── Google Maps scraper discovery ──


MAPS_CSV = (
    "input_id,link,title,category,address,website,phone,review_count,review_rating,cid,place_id\n"
    "x,https://maps.google.com/?cid=1,Loja da Maria,Loja de roupas,Rua A 1,https://lojadamaria.com.br/,(11) 91234-5678,42,4.7,111,\n"
    "x,https://maps.google.com/?cid=2,Brechó da Ana,Brechó,Rua B 2,https://www.instagram.com/brechoana,(11) 98888-7777,10,4.9,222,\n"
    "x,https://maps.google.com/?cid=3,,Sem nome,,,,,,333,\n"
)


def scraper_transport(statuses=("pending", "working", "ok"), calls=None):
    states = list(statuses)

    def handler(request):
        if calls is not None:
            calls.append((request.method, request.url.path))
        if request.method == "POST" and request.url.path == "/api/v1/jobs":
            body = json.loads(request.content)
            assert body["keywords"] == ["loja de roupas São Paulo"] and body["lang"] == "pt"
            assert body["depth"] >= 1 and body["max_time"] >= 300
            return httpx.Response(201, json={"id": "job-1"})
        if request.method == "GET" and request.url.path == "/api/v1/jobs/job-1":
            return httpx.Response(200, json={"ID": "job-1", "Status": states.pop(0) if len(states) > 1 else states[0]})
        if request.url.path == "/api/v1/jobs/job-1/download":
            return httpx.Response(200, text=MAPS_CSV)
        if request.method == "DELETE":
            return httpx.Response(200)
        return httpx.Response(404)
    return httpx.MockTransport(handler)


@pytest.fixture
def fast_polling(monkeypatch):
    async def no_sleep(_s):
        return None
    monkeypatch.setattr(D.asyncio, "sleep", no_sleep)


@pytest.mark.asyncio
async def test_gmaps_scraper_runs_a_job_and_parses_the_csv(fast_polling):
    calls = []
    provider = D.PROVIDERS["gmaps_scraper"]
    query = D.DiscoveryQuery(term="loja de roupas", location="São Paulo", limit=50)
    async with httpx.AsyncClient(transport=scraper_transport(calls=calls)) as client:
        found = await provider.fetch(client, {"gmaps_scraper_url": "http://scraper.test", "gmaps_scraper_lang": "pt"}, query)

    assert [b.name for b in found] == ["Loja da Maria", "Brechó da Ana"]
    maria, ana = found
    assert maria.domain == "lojadamaria.com.br" and maria.has_website is True
    assert maria.phone == "(11) 91234-5678" and maria.rating == 4.7 and maria.review_count == 42
    assert maria.external_id == "gmaps:111" and maria.provider == "gmaps_scraper"
    # an Instagram page is not the business's own site
    assert ana.domain == "" and ana.website == "" and ana.has_website is False
    assert calls[-1] == ("DELETE", "/api/v1/jobs/job-1")


@pytest.mark.asyncio
async def test_gmaps_scraper_failed_job_raises(fast_polling):
    provider = D.PROVIDERS["gmaps_scraper"]
    query = D.DiscoveryQuery(term="loja de roupas", location="São Paulo")
    async with httpx.AsyncClient(transport=scraper_transport(statuses=("failed",))) as client:
        with pytest.raises(RuntimeError, match="failed"):
            await provider.fetch(client, {"gmaps_scraper_url": "http://scraper.test"}, query)


def test_gmaps_scraper_is_listed_and_free():
    provider = D.PROVIDERS["gmaps_scraper"]
    assert provider.estimate([D.DiscoveryQuery(term="x")] * 10) == 0.0
    assert not provider.configured({})
    assert provider.configured({"gmaps_scraper_url": "http://localhost:8080"})
    assert any(p["key"] == "gmaps_scraper" for p in D.provider_menu({}))


@pytest.mark.asyncio
async def test_discovery_keeps_instagram_only_businesses(state, fast_polling, monkeypatch):
    """The point of the source: shops with no site of their own survive the junk filter."""
    from harvey.signals import SIGNAL_CATALOG, seed_signal_catalog
    await seed_signal_catalog(state)
    for sig in SIGNAL_CATALOG:
        await state.set_signal_status(sig["code"], "confirmed")

    real_client = httpx.AsyncClient

    def client_factory(*a, **k):
        k["transport"] = scraper_transport()
        return real_client(*a, **k)

    monkeypatch.setattr(D.httpx, "AsyncClient", client_factory)
    monkeypatch.setenv("GMAPS_SCRAPER_URL", "http://scraper.test")
    config = load_config()
    report = await D.run_discovery(
        state, config, "gmaps_scraper",
        queries=[D.DiscoveryQuery(term="loja de roupas", location="São Paulo")],
    )
    assert report.errors == [] and report.new_companies == 2 and report.junk == 0
    ana = await state.get_company_by_external_id("gmaps:222")
    assert ana is not None and ana.phone == "(11) 98888-7777" and ana.domain == ""


@pytest.mark.asyncio
async def test_excluded_industries_are_never_messaged(state):
    agent = make_agent(state)
    agent.config.icp.exclude_industries = ["restaurante", "salao", "cabeleireir"]
    await seed_company(state, "Loja da Maria", "(11) 91234-5678", ext="gmaps:1")
    await state.add_company(Company(name="Cantinho Bom", phone="(11) 98888-1111", industry="Restaurante", external_id="gmaps:2"))
    await state.add_company(Company(name="Studio Bela", phone="(11) 97777-2222", industry="Salão de beleza", external_id="gmaps:3"))
    await state.add_company(Company(name="Maria Cabeleireira", phone="(11) 96666-3333", industry="clothes", external_id="gmaps:4"))
    assert await agent.prepare() == 1
    assert [p.company for p in await state.get_prospects_by_status("new")] == ["Loja da Maria"]
    assert {p.company for p in await state.get_prospects_by_status("lost")} == {
        "Cantinho Bom", "Studio Bela", "Maria Cabeleireira"}


@pytest.mark.asyncio
async def test_a_cold_message_waits_for_its_turn_but_a_reply_does_not(state):
    agent = await staged_agent(state)                       # one approved COLD message

    async def not_yet():
        return False
    agent.cold_due = not_yet
    await agent.send(replies_only=True)
    assert agent.client.sent == []
    assert (await state.get_outbox(channel="whatsapp"))[0]["status"] == "approved"

    prospect = (await state.get_prospects_by_status("queued"))[0]
    await state.add_outbox_item(
        prospect_id=prospect.id, to_email=prospect.phone, subject="", body="Claro, te explico.",
        send_at=_now_iso(), status="approved", channel="whatsapp", kind="reply", provider="wa-akg",
    )
    await agent.send(replies_only=True)
    assert [t for _, t in agent.client.sent] == ["Claro, te explico."]


@pytest.mark.asyncio
async def test_cold_schedule_is_random_and_honours_a_pause(state, monkeypatch):
    import harvey.agents.whatsapp as W
    import harvey.main as M
    monkeypatch.setattr(M, "in_quiet_hours", lambda config: False)
    agent = make_agent(state)
    agent.send_pacing = True

    assert not await agent.cold_due()                       # no schedule yet: set one ahead
    ahead = datetime.fromisoformat(await state.get_setting(W.NEXT_COLD_KEY))
    assert 100 < (ahead - W._now()).total_seconds() < 1600
    await state.set_setting(W.NEXT_COLD_KEY, (W._now() - timedelta(seconds=5)).isoformat())
    assert await agent.cold_due()

    agent.cfg.cold_paused_until = "2999-01-01T08:00"
    assert not await agent.cold_due()


@pytest.mark.asyncio
async def test_concurrent_sends_do_not_double_send(state):
    agent = await staged_agent(state)
    await asyncio.gather(agent.send(), agent.send(), agent.send())
    assert len(agent.client.sent) == 1


@pytest.mark.asyncio
async def test_owner_is_alerted_once_when_a_meeting_is_agreed(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="interested")
    handler.wa_cfg.notify_phone = "5517997191017"
    handler.wa.inbound["5511912345678"] = inbound("Pode ser amanhã às 10h então")
    await handler.run()

    alerts = [(p, t) for p, t in handler.wa.sent if p == "5517997191017"]
    assert len(alerts) == 1
    assert "Reunião a combinar" in alerts[0][1] and "Loja da Maria" in alerts[0][1]
    assert (await state.get_prospect(prospect.id)).status == "meeting"

    handler.wa.inbound["5511912345678"] += inbound("Obrigado!", start=5)
    await handler.run()
    assert len([1 for p, _ in handler.wa.sent if p == "5517997191017"]) == 1      # not twice
    assert (await state.get_prospect(prospect.id)).status == "meeting"           # not downgraded


@pytest.mark.asyncio
async def test_owner_is_alerted_when_a_human_is_needed(state):
    await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.wa_cfg.notify_phone = "5517997191017"
    handler.wa.inbound["5511912345678"] = inbound("Vou chamar meu advogado")
    await handler.run()
    assert any("Cliente precisa de você" in t for _, t in handler.wa.sent)


@pytest.mark.asyncio
async def test_no_alert_without_a_notify_number(state):
    await contacted_prospect(state)
    handler = make_handler(state, intent="interested")
    handler.wa_cfg.notify_phone = ""
    handler.wa.inbound["5511912345678"] = inbound("Pode ser amanhã às 10h")
    await handler.run()
    assert handler.wa.sent == []


@pytest.mark.asyncio
async def test_owner_is_alerted_when_harvey_promises_a_designer(state):
    await contacted_prospect(state)
    handler = make_handler(state, intent="interested")
    handler.brain._reply = "Combinado! Vou pedir para um dos nossos designers te mandar um exemplo."
    handler.wa_cfg.notify_phone = "5517997191017"
    handler.wa.inbound["5511912345678"] = inbound("pode mostra sim")     # no demo words
    await handler.run()
    assert any("pediu vídeo ou exemplo" in t for p, t in handler.wa.sent if p == "5517997191017")


@pytest.mark.asyncio
async def test_reply_prompt_includes_the_cold_opener(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.brain = RecordingBrain()
    handler.wa.inbound["5511912345678"] = inbound("ola boa tarde")
    await handler.run()
    opener = await state.get_first_sent_whatsapp(prospect.id)
    assert opener and opener in handler.brain.last


def test_closing_is_not_triggered_by_ordinary_agreement():
    h = make_handler(None)
    stage = lambda text: h._determine_stage("interested", "engaged", text.lower())
    assert stage("oi, pode sim") != "closing"
    assert stage("pode ser, me explica") != "closing"
    assert stage("qual o horário de funcionamento de vocês?") != "closing"
    assert stage("quero testar") == "closing"
    assert stage("pode ser amanhã às 10h") == "closing"
    assert stage("vamos agendar uma reunião") == "closing"
    assert h._determine_stage("interested", "negotiating", "postamos sim") == "negotiating"


class RecordingBrain(ReplyBrain):
    def __init__(self):
        super().__init__()
        self.prompts = []

    def load_prompt(self, name, **kw):
        self.prompts.append((name, kw))
        return f"PROMPT {name}"

    async def think(self, prompt, session_id=None, agent="", task=""):
        self.last = prompt
        return "Claro! A vitrine organiza seus produtos num link só. Quantos produtos você vende hoje?"


@pytest.mark.asyncio
async def test_whatsapp_reply_uses_its_own_prompt_and_counts_team_mentions(state):
    from harvey.models.conversation import Conversation, Message
    handler = make_handler(state)
    handler.brain = RecordingBrain()
    prospect = Prospect(first_name="Erick", last_name="x", title="t", company="Loja", phone="5511912345678")
    convo = Conversation(id="c1", prospect_id="p", channel="whatsapp", thread=[
        Message(sender="harvey", content="Já te confirmo, a equipe fecha o horário."),
        Message(sender="prospect", content="não entendi nada"),
    ])
    out = await handler._generate_whatsapp_response("question", "me explica", prospect, convo)
    name, kw = handler.brain.prompts[0]
    assert name == "whatsapp_reply" and kw["handoff_mentions"] == 1 and kw["trial_recent"] == 0
    assert "Prices you may quote" not in out and out.startswith("Claro!")
    assert "Conversa até agora" in handler.brain.last and "não entendi nada" in handler.brain.last


@pytest.mark.asyncio
async def test_alerts_go_to_the_group_when_one_is_set(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="interested")
    handler.wa_cfg.notify_group = "120363428715949829@g.us"
    handler.wa_cfg.notify_phone = "5517997191017"
    handler.wa.inbound["5511912345678"] = inbound("quero testar")
    await handler.run()
    targets = [t for t, _ in handler.wa.sent]
    assert targets == ["120363428715949829@g.us"]            # the group, not the phone


def test_notify_group_must_be_a_group_jid():
    assert WhatsAppChannelConfig(notify_group="120363428715949829@g.us").notify_group.endswith("@g.us")
    with pytest.raises(ValueError):
        WhatsAppChannelConfig(notify_group="5517997191017@s.whatsapp.net")


@pytest.mark.asyncio
async def test_interest_in_arts_alerts_the_group_once_without_marking_a_meeting(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.wa_cfg.notify_group = "120363428715949829@g.us"
    handler.wa.inbound["5511912345678"] = inbound("As artes são genéricas ou pra minha loja?")
    await handler.run()
    alerts = [t for g, t in handler.wa.sent if g == "120363428715949829@g.us"]
    assert len(alerts) == 1 and "portfólio" in alerts[0]
    assert (await state.get_prospect(prospect.id)).status == "replied"      # not a meeting

    handler.wa.inbound["5511912345678"] += inbound("Quero ver o portfólio", start=5)
    await handler.run()
    assert len([1 for g, _ in handler.wa.sent if g == "120363428715949829@g.us"]) == 1


def test_arts_interest_detection():
    from harvey.agents.handler import ARTS_INTEREST_RE as R
    assert R.search("quero ver as artes") and R.search("tem portfólio?") and R.search("faz logo também?")
    assert not R.search("quanto custa a vitrine?") and not R.search("qual o horário de vocês")
    assert not R.search("vou partir pro teste")


@pytest.mark.asyncio
async def test_whatsapp_prompt_knows_when_the_trial_was_just_offered(state):
    from harvey.models.conversation import Conversation, Message
    handler = make_handler(state)
    handler.brain = RecordingBrain()
    prospect = Prospect(first_name="E", last_name="x", title="t", company="Loja", phone="5511912345678")
    convo = Conversation(id="c1", prospect_id="p", channel="whatsapp", thread=[
        Message(sender="harvey", content="Quer testar 15 dias grátis?"),
        Message(sender="prospect", content="tem arte ou não?"),
        Message(sender="harvey", content="Tem sim. Quer começar o teste?"),
        Message(sender="prospect", content="é genérica?"),
    ])
    await handler._generate_whatsapp_response("question", "é genérica?", prospect, convo)
    assert handler.brain.prompts[0][1]["trial_recent"] == 2


@pytest.mark.asyncio
async def test_whatsapp_prompt_tracks_pro_mentions_and_turns(state):
    from harvey.models.conversation import Conversation, Message
    handler = make_handler(state)
    handler.brain = RecordingBrain()
    prospect = Prospect(first_name="E", last_name="x", title="t", company="Loja", phone="5511912345678")
    convo = Conversation(id="c1", prospect_id="p", channel="whatsapp", thread=[
        Message(sender="harvey", content="A vitrine organiza os pedidos."),
        Message(sender="prospect", content="legal"),
        Message(sender="harvey", content="No plano Pro vêm 2 artes por semana."),
        Message(sender="prospect", content="e o preço?"),
    ])
    await handler._generate_whatsapp_response("question", "e o preço?", prospect, convo)
    kw = handler.brain.prompts[0][1]
    assert kw["pro_mentions"] == 1 and kw["harvey_turns"] == 2 and kw["pro_instruction"] == ""


@pytest.mark.asyncio
async def test_pro_plan_is_due_after_a_few_turns_without_a_mention(state):
    from harvey.models.conversation import Conversation, Message
    handler = make_handler(state)
    handler.brain = RecordingBrain()
    prospect = Prospect(first_name="E", last_name="x", title="t", company="Loja", phone="5511912345678")
    thread = [Message(sender="harvey", content="Posso explicar?")]
    for i in range(2):
        thread += [Message(sender="prospect", content="ok"), Message(sender="harvey", content="A vitrine organiza os pedidos.")]
    thread.append(Message(sender="prospect", content="como mudo preço?"))
    await handler._generate_whatsapp_response("question", "como mudo preço?", prospect,
                                              Conversation(id="c", prospect_id="p", channel="whatsapp", thread=thread))
    assert "AGORA é a hora do Pro" in handler.brain.prompts[0][1]["pro_instruction"]


@pytest.mark.asyncio
async def test_talk_of_posting_brings_up_the_pro(state):
    from harvey.models.conversation import Conversation, Message
    handler = make_handler(state)
    prospect = Prospect(first_name="E", last_name="x", title="t", company="Loja", phone="5511912345678")

    async def instruction(thread, text):
        handler.brain = RecordingBrain()
        await handler._generate_whatsapp_response(
            "interested", text, prospect,
            Conversation(id="c", prospect_id="p", channel="whatsapp",
                         thread=thread + [Message(sender="prospect", content=text)]))
        return handler.brain.prompts[0][1]["pro_instruction"]

    one_turn = [Message(sender="harvey", content="A vitrine organiza os pedidos.")]
    assert "Instagram" in await instruction(one_turn, "Postamos sim")        # first chance, early
    assert await instruction(one_turn, "pode explicar") == ""               # too early otherwise
    pitched = one_turn + [Message(sender="harvey", content="E no Pro vêm 2 artes por semana.")]
    assert "outro ângulo" in await instruction(pitched, "a gente posta no insta")   # one retry
    twice = pitched + [Message(sender="harvey", content="As artes do Pro poupam tempo.")]
    assert await instruction(twice, "a gente posta no insta") == ""         # then let it go


# ── night shift ──


@pytest.mark.asyncio
async def test_night_shift_searches_then_drafts_and_stops_at_the_target(state, monkeypatch):
    from harvey import night
    from harvey.signals import SIGNAL_CATALOG, seed_signal_catalog
    await seed_signal_catalog(state)
    for sig in SIGNAL_CATALOG:
        await state.set_signal_status(sig["code"], "confirmed")

    async def no_geocode(*a, **k):
        return ""
    monkeypatch.setattr(D, "geocode_city", no_geocode)
    monkeypatch.setenv("GMAPS_SCRAPER_URL", "http://scraper.test")

    fetched = []

    async def fake_fetch(client, env, query):
        fetched.append(query.keyword())
        return [D.Business(name=f"Loja {len(fetched)}-{i}", phone=f"(11) 9{len(fetched)}{i}34-5678",
                          category="Roupa", external_id=f"gmaps:{len(fetched)}-{i}", provider="gmaps_scraper")
                for i in range(2)]
    monkeypatch.setattr(D.PROVIDERS["gmaps_scraper"], "fetch", fake_fetch)

    agent = make_agent(state, require_approval=False)
    config = agent.config
    config.discovery.cities = ["Votuporanga, SP"]
    config.icp.industries = ["Roupa", "Calcado"]
    config.discovery.queue_target = 3

    s1 = await night.night_step(state, config, agent)
    assert s1["searched"] == "Roupa / Votuporanga, SP" and s1["new"] == 2 and s1["queue"] == 0

    s2 = await night.night_step(state, config, agent)          # drafts the 2 found, then searches again
    assert s2["drafted"] == 2 and s2["searched"] == "Calcado / Votuporanga, SP"

    s3 = await night.night_step(state, config, agent)          # 4 drafted >= target 3: no more searching
    assert s3["queue"] >= 3 and s3["searched"] == ""
    assert len(fetched) == 2
    # nothing was SENT overnight
    assert agent.client.sent == [] and await state.count_outbox_sent_today(channel="whatsapp") == 0


@pytest.mark.asyncio
async def test_night_shift_without_the_brain_only_searches(state, monkeypatch):
    from harvey import night
    agent = make_agent(state)
    agent.config.discovery.cities = []
    agent.config.icp.geography = []
    step = await night.night_step(state, agent.config, agent, brain_ok=False)
    assert step == {"queue": 0, "searched": "", "new": 0, "drafted": 0}


@pytest.mark.asyncio
async def test_any_shop_that_sells_products_fits_but_services_do_not(state):
    agent = make_agent(state)
    agent.config.icp.exclude_industries = ["churrasc", "cafeteria", "salao"]
    agent.config.icp.include_keywords = ["loja", "shop", "moda", "calcad", "semijoia", "joalheria"]
    rows = [
        ("Penélope Store", "Loja de Roupa"), ("Lê Calçados", "Loja de calçado"),
        ("Célia Barbieri Semijoias", "Joalheria"), ("Nutrial Pet Center", "Pet Shop"),
        ("Loja 360", "Loja de acessórios de informática"),
        ("Claro - Centro", "Empresa de telecomunicação"), ("Taverna da Hidra", "Cafeteria"),
        ("Votuporanga, São Paulo", "Loja"), ("Gaúcho Churrascaria", "Loja de roupa"),
        ("Studio Bela", "Salão de beleza"),
    ]
    for i, (name, cat) in enumerate(rows):
        await state.add_company(Company(name=name, phone=f"(11) 9{i}234-5678", industry=cat, external_id=f"gmaps:{i}"))
    await agent.prepare()
    kept = {p.company for p in await state.get_prospects_by_status("new")}
    assert kept == {"Penélope Store", "Lê Calçados", "Célia Barbieri Semijoias", "Nutrial Pet Center", "Loja 360"}


@pytest.mark.asyncio
async def test_openers_are_split_between_two_variants_and_counted(state):
    from harvey.agents.whatsapp import variant_stats
    agent = make_agent(state, require_approval=False)
    prompts = []
    real = agent.brain.load_prompt
    agent.brain.load_prompt = lambda name, **kw: (prompts.append(name), real(name, **kw))[1]
    for i in range(10):
        await seed_company(state, f"Loja {i}", f"(11) 9{i}234-5678", ext=f"gmaps:{i}")
    await agent.prepare()
    await agent.write()
    assert set(prompts) == {"whatsapp", "whatsapp_b"}
    await agent.send()
    stats = await variant_stats(state)
    assert {r["variant"] for r in stats} <= {"A", "B"} and sum(r["sent"] for r in stats) == len(agent.client.sent)

    agent.config.channels.whatsapp.opener_test = False
    assert agent._variant(Prospect(id="abcdef012345")) == "A"


@pytest.mark.asyncio
async def test_daily_cap_ramps_up_from_the_first_cold_send(state):
    agent = make_agent(state, max_daily_sends=50, ramp_start_sends=40, ramp_step_sends=5)
    assert await agent.daily_cap() == 40                      # nothing sent yet: day 0
    prospect_id = await state.add_prospect(Prospect(first_name="a", last_name="b", title="t", phone="5511900000001"))
    oid = await state.add_outbox_item(
        prospect_id=prospect_id, to_email="5511900000001", subject="", body="oi", send_at=_now_iso(),
        status="sent", channel="whatsapp", provider="wa-akg")
    async with state._connect() as db:
        await db.execute("UPDATE outbox SET sent_at = ? WHERE id = ?", (_now_iso(-2 * 24 * 60), oid))
        await db.commit()
    assert await agent.daily_cap() == 50                      # 40 + 2*5 = 50
    agent.cfg.max_daily_sends = 45
    assert await agent.daily_cap() == 45                      # never above the maximum
    agent.cfg.ramp_start_sends = 0
    agent.cfg.max_daily_sends = 30
    assert await agent.daily_cap() == 30                      # ramp off


def test_cold_gaps_are_random_and_fill_the_day(state, monkeypatch):
    import harvey.agents.whatsapp as W

    class Morning(datetime):
        @classmethod
        def now(cls, tz=None):
            return tz.localize(datetime(2026, 10, 21, 9, 0)) if tz is not None else datetime(2026, 10, 21, 9, 0)

    monkeypatch.setattr(W, "datetime", Morning)
    agent = make_agent(state)
    gaps = [agent.cold_gap_seconds(30) for _ in range(200)]     # 12h left, 30 to go: ~24 min
    assert min(gaps) >= W.MIN_COLD_GAP_SECONDS
    assert len({round(g) for g in gaps}) > 150                  # no fixed rhythm
    assert 15 * 60 < sum(gaps) / len(gaps) < 45 * 60
    assert all(g < 10 * 60 for g in (agent.cold_gap_seconds(10_000) for _ in range(50)))   # floor only


@pytest.mark.asyncio
async def test_an_opener_too_close_to_a_recent_one_is_redrafted(state):
    twin = "Oi, tudo bem? Aqui é o Rafael da Prospect Boost. Vi a {} em Votuporanga. Como vocês vendem hoje?"

    class Drafts(FakeBrain):
        def __init__(self):
            super().__init__()
            self.drafts = [twin.format("Loja da Maria"),
                           "Boa tarde! Rafael aqui. Vocês vendem mais na loja ou no Instagram?"]

        async def think_json(self, prompt, **_k):
            self.calls += 1
            return {"body": self.drafts.pop(0)}

    other = Prospect(company="Loja do Zé", phone="5511988887777", status="contacted")
    other.id = await state.add_prospect(other)
    await state.add_outbox_item(
        prospect_id=other.id, to_email=other.phone, subject="", body=twin.format("Loja do Zé"),
        send_at=_now_iso(), status="sent", channel="whatsapp", kind="sequence", provider="wa-akg",
    )
    brain = Drafts()
    agent = make_agent(state, brain=brain)
    body = await agent._draft(Prospect(company="Loja da Maria", phone="5511912345678"))
    assert body.startswith("Boa tarde!") and brain.calls == 2


@pytest.mark.asyncio
async def test_a_stopped_session_is_started_again_and_sending_resumes(state):
    agent = await staged_agent(state)
    agent.client.online = False
    agent.client.status = "STOPPED"
    await agent.send()
    assert agent.client.starts == 1 and len(agent.client.sent) == 1


@pytest.mark.asyncio
async def test_a_session_that_needs_a_qr_code_is_not_restarted(state):
    agent = await staged_agent(state)
    agent.client.online = False
    agent.client.status = "SCAN_QR"
    await agent.send()
    assert agent.client.starts == 0 and agent.client.sent == []


@pytest.mark.asyncio
async def test_restarts_are_rate_limited(state):
    agent = await staged_agent(state)
    agent.client.online = False
    agent.client.status = "STOPPED"

    async def fails():
        agent.client.starts += 1
        return False
    agent.client.start_session = fails
    await agent.send()
    await agent.send()
    assert agent.client.starts == 1


class BlockedOnceBrain(RecordingBrain):
    def __init__(self, drafts):
        super().__init__()
        self.drafts = list(drafts)

    async def think(self, prompt, session_id=None, agent="", task=""):
        self.last = prompt
        return self.drafts.pop(0)


@pytest.mark.asyncio
async def test_blocked_whatsapp_draft_is_redrafted(state):
    from harvey.models.conversation import Conversation
    handler = make_handler(state)
    handler.brain = BlockedOnceBrain([
        "Bom dia! Sem compromisso nenhum. O que você vende?",
        "Bom dia! A vitrine mostra seus produtos num link. O que você vende?",
    ])
    prospect = Prospect(first_name="L", last_name="x", title="t", company="Loja", phone="5511912345678")
    convo = Conversation(id="c1", prospect_id="p", channel="whatsapp", thread=[])
    out = await handler._generate_whatsapp_response("interested", "como é?", prospect, convo)
    assert out.startswith("Bom dia! A vitrine")
    assert "foi bloqueada" in handler.brain.last and "sem compromisso nenhum" in handler.brain.last
    assert '"sem compromisso nenhum"' in handler.brain.prompts[0][1]["banned_phrases"]


@pytest.mark.asyncio
async def test_always_blocked_whatsapp_draft_goes_to_a_human(state):
    from harvey.models.conversation import Conversation
    handler = make_handler(state)
    handler.brain = BlockedOnceBrain(["Clique aqui, sem compromisso nenhum!"] * 3)
    prospect = Prospect(first_name="L", last_name="x", title="t", company="Loja", phone="5511912345678")
    convo = Conversation(id="c1", prospect_id="p", channel="whatsapp", thread=[])
    assert await handler._generate_whatsapp_response("interested", "oi", prospect, convo) == ""


@pytest.mark.asyncio
async def test_whatsapp_reply_counts_recent_questions(state):
    from harvey.models.conversation import Conversation, Message
    handler = make_handler(state)
    handler.brain = RecordingBrain()
    prospect = Prospect(first_name="L", last_name="x", title="t", company="Loja", phone="5511912345678")
    convo = Conversation(id="c1", prospect_id="p", channel="whatsapp", thread=[
        Message(sender="harvey", content="Oi! Posso te mostrar?"),
        Message(sender="prospect", content="pode"),
        Message(sender="harvey", content="A vitrine é um link. O que você vende?"),
        Message(sender="prospect", content="roupa infantil"),
        Message(sender="harvey", content="Boa! Dá pra separar por idade. Quantas peças?"),
        Message(sender="prospect", content="umas 50"),
    ])
    await handler._generate_whatsapp_response("interested", "umas 50", prospect, convo)
    assert handler.brain.prompts[0][1]["questions_recent"] == 2


async def quiet_conversation(state, prospect, hours_ago, prospect_wrote=True):
    from datetime import datetime, timedelta, timezone
    from harvey.models.conversation import Conversation, Message
    then = datetime.now(timezone.utc).replace(tzinfo=None) - timedelta(hours=hours_ago)
    thread = [Message(sender="harvey", content="Oi! Posso te mostrar?", timestamp=then - timedelta(minutes=5))]
    if prospect_wrote:
        thread.append(Message(sender="prospect", content="roupa infantil", timestamp=then - timedelta(minutes=2)))
    thread.append(Message(sender="harvey", content="Boa! Dá pra separar por idade.", timestamp=then))
    convo = Conversation(id="", prospect_id=prospect.id, channel="whatsapp", thread=thread)
    convo.id = await state.add_conversation(convo)
    return convo


async def followups(state):
    return [i for i in await state.get_outbox(channel="whatsapp") if i["kind"] == "followup"]


@pytest.mark.asyncio
async def test_quiet_customer_gets_a_followup_after_a_day(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state)
    await quiet_conversation(state, prospect, hours_ago=5)
    await handler.run()
    assert await followups(state) == []                      # too soon

    async with state._connect() as db:
        await db.execute("DELETE FROM conversations")
        await db.commit()
    await quiet_conversation(state, prospect, hours_ago=25)
    await handler.run()
    items = await followups(state)
    assert len(items) == 1 and items[0]["conversation_id"]
    await handler.run()
    assert len(await followups(state)) == 1                  # never two at once


@pytest.mark.asyncio
async def test_cold_silence_is_never_followed_up(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state)
    await quiet_conversation(state, prospect, hours_ago=48, prospect_wrote=False)
    await handler.run()
    assert await followups(state) == []


@pytest.mark.asyncio
async def test_after_the_last_followup_the_owner_is_told(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state)
    handler.wa_cfg.notify_group = "120363428715949829@g.us"
    convo = await quiet_conversation(state, prospect, hours_ago=100)
    for _ in range(2):
        await state.add_outbox_item(
            prospect_id=prospect.id, conversation_id=convo.id, kind="followup",
            to_email=prospect.phone, subject="", body="x", status="sent",
            provider="wa-akg", channel="whatsapp", send_at="2026-01-01T00:00:00",
        )
    await handler.run()
    assert len(await followups(state)) == 2                  # no third nudge
    assert [t for t, _ in handler.wa.sent] == ["120363428715949829@g.us"]
    assert "esfriou" in handler.wa.sent[0][1]


@pytest.mark.asyncio
async def test_followup_is_dropped_if_the_customer_wrote_back(state):
    from harvey.models.conversation import Message
    prospect = await contacted_prospect(state)
    convo = await quiet_conversation(state, prospect, hours_ago=25)
    agent = make_agent(state)
    await state.add_outbox_item(
        prospect_id=prospect.id, conversation_id=convo.id, kind="followup",
        to_email=prospect.phone, subject="", body="Lembrei de você!", status="approved",
        provider="wa-akg", channel="whatsapp", send_at="2026-01-01T00:00:00",
    )
    convo.thread.append(Message(sender="prospect", content="voltei"))
    await state.update_conversation(convo.id, thread_json=convo.thread_json())
    await agent.send()
    assert agent.client.sent == []
    assert (await followups(state))[0]["status"] == "cancelled"


@pytest.mark.asyncio
async def test_harvey_stays_out_of_conversations_a_human_has(state):
    from harvey.models.conversation import Conversation, Message
    prospect = await contacted_prospect(state)
    await state.add_conversation(Conversation(
        id="", prospect_id=prospect.id, channel="whatsapp", status="needs_human",
        thread=[Message(sender="prospect", content="manda um vídeo")],
    ))
    handler = make_handler(state, intent="question")
    handler.wa.inbound["5511912345678"] = inbound("e aí?")
    await handler.run()
    assert [i for i in await state.get_outbox(channel="whatsapp") if i["kind"] == "reply"] == []
    assert handler.wa.read == []


@pytest.mark.asyncio
async def test_voice_note_is_transcribed_and_answered(state, monkeypatch):
    import harvey.agents.handler as handler_mod
    async def fake_transcribe(audio, language="pt"):
        return "tem algum vídeo de como funciona?" if audio == b"OggS" else ""
    monkeypatch.setattr(handler_mod, "transcribe", fake_transcribe)
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.wa_cfg.notify_group = "120363428715949829@g.us"
    async def download_audio(message_id):
        return b"OggS"
    handler.wa.download_audio = download_audio
    handler.wa.inbound["5511912345678"] = [WaInbound(
        id="A1", phone="5511912345678", body="", type="AUDIO", timestamp="2026-10-20T12:00:00Z")]
    await handler.run()
    convo = (await state.get_conversations_by_status("open"))[0]
    assert convo.thread[0].content == "(áudio) tem algum vídeo de como funciona?"
    assert len([i for i in await state.get_outbox(channel="whatsapp") if i["kind"] == "reply"]) == 1
    assert any("vídeo ou exemplo" in text for _, text in handler.wa.sent)   # owner alerted


@pytest.mark.asyncio
async def test_unheard_voice_note_next_to_text_goes_to_a_human(state, monkeypatch):
    import harvey.agents.handler as handler_mod
    async def deaf(audio, language="pt"):
        return ""
    monkeypatch.setattr(handler_mod, "transcribe", deaf)
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="not_interested")
    async def download_audio(message_id):
        return b""
    handler.wa.download_audio = download_audio
    handler.wa.inbound["5511912345678"] = inbound("já tenho isso") + [WaInbound(
        id="A1", phone="5511912345678", body="", type="AUDIO", timestamp="2026-10-20T12:05:00Z")]
    await handler.run()
    assert (await state.get_conversations_by_status("needs_human"))[0].prospect_id == prospect.id


@pytest.mark.asyncio
async def test_empty_whatsapp_notice_is_not_a_reply(state):
    prospect = await contacted_prospect(state)
    handler = make_handler(state, intent="question")
    handler.wa.inbound["5511912345678"] = inbound("")       # "ativou mensagens temporárias"
    await handler.run()
    assert await state.get_conversations_by_status("needs_human") == []
    assert await state.get_conversations_by_status("open") == []
    assert (await state.get_prospect(prospect.id)).status == "contacted"

    handler.wa.inbound["5511912345678"] = inbound("", "Oi, como funciona?")
    await handler.run()
    convo = (await state.get_conversations_by_status("open"))[0]
    assert [m.content for m in convo.thread][0] == "Oi, como funciona?"

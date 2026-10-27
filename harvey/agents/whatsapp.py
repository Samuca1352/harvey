"""WhatsApp outreach — businesses with a mobile number become conversations.

The flow mirrors the email one, minus sequences:

  prepare()  every discovered business with a phone becomes a prospect
             (no model call). Landlines and duplicates are set aside.
  write()    one grounded first message per prospect, staged in the outbox
             as ``channel='whatsapp'`` (pending_review, or approved on
             autopilot). One touch only: a cold WhatsApp follow-up is the
             fastest way to get a number reported.
  followups  someone who replied and went quiet gets up to two nudges
             (the Handler drafts them, kind='followup'); cold silence never.
  send()     drains due, approved rows through the WA-AKG gateway with the
             daily cap, human-ish gaps, a "has WhatsApp?" check, the
             deterministic gate, and stop-on-reply.

Replies are read by the Handler, which polls the gateway.
"""

import asyncio
import difflib
import logging
import random
import re
import unicodedata

import pytz
from datetime import datetime, time as dtime, timedelta, timezone

from harvey.brain import Brain
from harvey.config import EnvConfig, HarveyConfig, whatsapp_persona_name
from harvey.gate import pre_send_check_whatsapp
from harvey.integrations.whatsapp import (
    HANDOFF_SUBJECT,
    WhatsAppClient,
    _parse_ts,
    is_mobile,
    normalize_phone,
)
from harvey.models.prospect import Prospect
from harvey.state import REAL_REPLY_EXISTS_SQL, StateManager

logger = logging.getLogger("harvey.whatsapp")

SOURCE = "whatsapp:business"
VARIANT_KEY = "wa_variant:"
REVIVE_KEY = "wa_last_revive"
REVIVE_EVERY_SECONDS = 600
PROVIDER = "wa-akg"
KILL_SWITCH_KEY = "sending_paused"

# Drafts per cycle (one model call each) and sends per cycle: spreads volume
# through the day instead of bursting the daily cap.
WRITE_BATCH = 8
MAX_SENDS_PER_CYCLE = 4
MAX_DRAFT_ATTEMPTS = 3
REPLY_DELAY_SECONDS = (4, 12)
# Cold messages go out one at a time, each after a random gap, from whichever
# pass (fast watcher or heartbeat) finds it due: no clockwork 15-minute rhythm.
NEXT_COLD_KEY = "wa_next_cold_at"
MIN_COLD_GAP_SECONDS = 240
# Opener B asks about one of these, picked per prospect, so the messages sent
# in a day don't read as copies of each other.
QUESTION_ANGLES = (
    "como os clientes costumam fazer pedido hoje (Instagram, WhatsApp, indo à loja)",
    "se muita gente pergunta preço e modelo por mensagem e isso toma o tempo dela",
    "se ela já vende bastante pelo Instagram ou ainda mais pessoalmente na loja",
    "qual produto mais sai e como o cliente costuma descobrir ele",
    "como ela mostra os produtos novos para os clientes hoje",
    "como é para ela atender o cliente na loja e no WhatsApp ao mesmo tempo",
)
# Opener C: a reason to be writing, then a question answered in seconds.
C_MOTIVES = (
    "você está ajudando algumas lojas da região a vender mais pelo WhatsApp",
    "você trabalha com lojas que vendem pelo WhatsApp e está conversando com algumas da cidade",
    "você está montando algo para lojas pequenas que atendem muito por mensagem e quer entender a rotina delas",
    "você conversa com lojistas da região sobre como eles vendem pelo WhatsApp",
)
C_ANGLES = (
    "qual produto ou modelo é o mais pedido por mensagem",
    "se ela manda foto dos produtos um por um para quem pergunta",
    "se o pessoal pergunta mais preço, tamanho/modelo ou se tem em estoque",
    "se quem chama no WhatsApp já sabe o que quer ou pede para ver opções",
    "se as novidades que chegam vão primeiro para o Instagram ou para o WhatsApp",
    "quem responde o WhatsApp da loja: o dono ou alguém da equipe",
)
VARIANT_PROMPTS = {"A": "whatsapp", "B": "whatsapp_b", "C": "whatsapp_c"}
# How a first message opens, one picked at random per draft, plus a random
# length: near-identical messages from one number are what WhatsApp's spam
# filter catches, so no two openers may share a skeleton. No "bom dia": the
# draft is written hours before it goes out.
OPENING_STYLES = (
    "Comece com 'Olá' e diga seu nome e a empresa na mesma frase.",
    "Comece pelo nome da loja, como quem acabou de ver o perfil dela, e só depois diga quem você é.",
    "Comece com 'Oi, tudo bem?' sozinho e se apresente na frase seguinte só com o primeiro nome; cite a empresa no fim.",
    "Apresente-se no formato '{name} aqui, da {company}' e emende com o que viu da loja.",
    "Comece com uma observação curta e verdadeira sobre o tipo de loja e a cidade; depois se apresente.",
    "Comece com 'Oi!', faça logo a pergunta e deixe uma apresentação curtinha para o fim.",
    "Bem curta e casual: 'Opa' ou 'Olá', seu nome e a pergunta, quase sem mais nada.",
    "Diga só o seu nome na primeira frase; a empresa aparece de passagem, no meio ou no fim.",
    "Comece pela pergunta sobre a loja e se apresente logo depois, em meia frase.",
    "Use 'Tudo certo?' ou 'Como vai?' no lugar de 'tudo bem', depois nome e empresa.",
    "Comece reconhecendo algo concreto dos FATOS (o segmento, o tipo de produto), sem elogio exagerado, depois se apresente.",
    "Comece com 'E aí, tudo bom?' e se apresente de um jeito leve, sem formalidade.",
)
OPENER_LENGTHS = ((12, 20), (16, 26), (22, 34), (30, 45))
# Draft rejected when this close (0-1) to one of the recent openers. Measured:
# the old two-template openers sat at ~0.85 from their nearest neighbour,
# varied ones at ~0.55.
MAX_OPENER_SIMILARITY = 0.7
RECENT_OPENERS = 40

# Prospect statuses that mean "stop messaging this person".
STOP_STATUSES = {"replied", "opted_out", "lost", "meeting", "closed"}


def _plain(text: str) -> str:
    """Lowercase without accents, so "Salão" matches "salao"."""
    text = unicodedata.normalize("NFKD", text or "")
    return "".join(c for c in text if not unicodedata.combining(c)).lower()


def _skeleton(text: str, store: str) -> str:
    """An opener with the store's name taken out, to compare structure."""
    plain = _plain(text)
    for word in re.findall(r"\w+", _plain(store)):
        if len(word) > 2:
            plain = re.sub(rf"\b{re.escape(word)}\b", "", plain)
    return re.sub(r"\s+", " ", plain).strip()


def _now() -> datetime:
    return datetime.now(timezone.utc).replace(tzinfo=None)


class WhatsAppAgent:
    def __init__(
        self,
        brain: Brain,
        state: StateManager,
        config: HarveyConfig,
        env: EnvConfig,
        client: WhatsAppClient | None = None,
    ):
        self.brain = brain
        self.state = state
        self.config = config
        self.cfg = config.channels.whatsapp
        self.client = client or WhatsAppClient(env)
        self.skills = ""
        # Heartbeat and the fast watcher both send; one at a time, so an
        # approved row is never picked up twice.
        self._send_lock = asyncio.Lock()
        # The night shift and the heartbeat both stage; never at the same time.
        self._stage_lock = asyncio.Lock()
        # Disabled in tests to skip the gaps between sends.
        self.send_pacing = True

    @property
    def enabled(self) -> bool:
        return self.cfg.enabled

    async def run(self):
        """The cheap half of a cycle: find prospects and draft their messages."""
        if not self.enabled:
            return
        async with self._stage_lock:
            await self.prepare()
            await self.write()

    PLACE_NAME_RE = re.compile(r"^[^,]+,\s*(são paulo|sao paulo|sp|brasil|brazil)$", re.I)

    def segment_skip(self, company) -> str:
        """Why this business is not for us ("" when it fits).

        Services (restaurants, salons, telecom) are out and so are map entries
        that are really a place; any shop that sells products is in.
        """
        icp = self.config.icp
        haystack = _plain(f"{company.industry} {company.name}")
        if self.PLACE_NAME_RE.match((company.name or "").strip()):
            return "não é um negócio (é um lugar)"
        hit = next((x for x in icp.exclude_industries if x.strip() and _plain(x) in haystack), "")
        if hit:
            return f"fora do público ({hit})"
        included = [_plain(x) for x in icp.include_keywords if x.strip()]
        if included and not any(x in haystack for x in included):
            return "não é do segmento"
        return ""

    # ── businesses -> prospects ──

    async def prepare(self) -> int:
        """Turn discovered businesses with a phone into WhatsApp prospects."""
        created = 0
        for company in await self.state.get_companies_needing_whatsapp_prospect(limit=100):
            skip = self.segment_skip(company)
            phone = normalize_phone(company.phone, self.cfg.default_country_code)
            status, note = "new", ""
            if skip:
                status, note = "lost", skip
            elif not is_mobile(phone):
                status, note = "lost", "sem celular válido (fixo ou número incompleto)"
            elif await self.state.get_prospect_by_phone(phone):
                status, note = "lost", "número já está em outro contato"
            await self.state.add_prospect(Prospect(
                company_id=company.id,
                title="Proprietário(a)",
                company=company.name,
                industry=company.industry,
                company_size=company.company_size,
                phone=phone if status == "new" else "",
                source=SOURCE,
                source_url=company.source_url,
                status=status,
                personalization_notes=note,
            ))
            if status == "new":
                created += 1
        if created:
            logger.info(f"WhatsApp: {created} business(es) with a mobile number added as prospects.")
        return created

    # ── drafting ──

    async def write(self) -> int:
        """Draft a first message for new WhatsApp prospects and stage it."""
        self.skills = self.brain.load_skills_for_agent("writer")
        prospects = [
            p for p in await self.state.get_prospects_by_status("new")
            if p.source == SOURCE and p.phone
        ][:WRITE_BATCH]
        if not prospects:
            return 0

        status = "pending_review" if self.cfg.require_approval else "approved"
        drafted = 0
        for prospect in prospects:
            if await self.state.has_outbox_for_prospect(prospect.id, "whatsapp"):
                await self.state.update_prospect_status(prospect.id, "queued")
                continue
            variant = self._variant(prospect)
            try:
                body = await self._draft(prospect, variant)
            except Exception as e:
                logger.warning(f"WhatsApp: draft failed for {prospect.company}: {e}")
                body = ""
            if not body:
                if getattr(self.brain, "paused_reason", ""):
                    logger.error("WhatsApp: brain unavailable; drafting resumes later.")
                    break
                key = f"wa_draft_attempts:{prospect.id}"
                if await self.state.increment_setting(key) >= MAX_DRAFT_ATTEMPTS:
                    await self.state.update_prospect_status(prospect.id, "lost")
                    logger.warning(
                        f"WhatsApp: gave up drafting for {prospect.company} "
                        f"after {MAX_DRAFT_ATTEMPTS} attempts."
                    )
                continue

            closing = self._opt_out_line()
            if closing:
                body = f"{body}\n\n{closing}"
            item_id = await self.state.add_outbox_item(
                prospect_id=prospect.id,
                to_email=prospect.phone,
                subject="",
                body=body,
                send_at=_now().isoformat(),
                status=status,
                provider=PROVIDER,
                channel="whatsapp",
            )
            if item_id:
                drafted += 1
                await self.state.set_setting(f"{VARIANT_KEY}{prospect.id}", variant)
            await self.state.update_prospect_status(prospect.id, "queued")

        if drafted:
            mode = "aguardando sua aprovação" if self.cfg.require_approval else "aprovadas"
            logger.info(f"WhatsApp: {drafted} message(s) staged ({mode}). Review in the Outbox tab.")
            await self.state.log_action(
                action_type="stage_whatsapp", agent="whatsapp",
                details={"staged": drafted, "mode": mode},
            )
        return drafted

    def _variant(self, prospect: Prospect) -> str:
        """One of the active openers, stable per prospect and evenly split (ids are hex)."""
        variants = self.cfg.opener_variants
        if not self.cfg.opener_test:
            return variants[0]
        try:
            return variants[int(prospect.id, 16) % len(variants)]
        except ValueError:
            return variants[0]

    async def _review_facts(self, company_id: str) -> list[str]:
        """The store's Google rating and review count, when known."""
        values = {}
        for code in ("REVIEW_RATING", "REVIEW_COUNT"):
            rows = await self.state.get_observations(company_id=company_id, signal_code=code, limit=1)
            if rows and rows[0].get("value_num") is not None:
                values[code] = rows[0]["value_num"]
        if "REVIEW_RATING" not in values:
            return []
        rating = f"{values['REVIEW_RATING']:.1f}".replace(".", ",")
        count = int(values.get("REVIEW_COUNT") or 0)
        return [f"- Nota no Google: {rating} ({count} avaliações)"]

    def _opt_out_line(self) -> str:
        lines = [x for x in self.cfg.opt_out_lines if x.strip()]
        if not lines and self.cfg.opt_out_line.strip():
            lines = [self.cfg.opt_out_line.strip()]
        return random.choice(lines) if lines else ""

    async def _draft(self, prospect: Prospect, variant: str = "A") -> str:
        facts = [f"- Nome do negócio: {prospect.company}"]
        if prospect.industry:
            facts.append(f"- Segmento: {prospect.industry}")
        company = None
        if prospect.company_id:
            try:
                company = await self.state.get_company(prospect.company_id)
            except Exception:
                company = None
        if company:
            if company.location:
                facts.append(f"- Cidade/região: {company.location}")
            if company.description:
                facts.append(f"- O que o negócio diz sobre si: {company.description}")
            facts.append(
                "- Site próprio: " + (company.website or "não encontramos (só rede social ou nenhum)")
            )
            if company.tech_stack:
                facts.append(f"- Ferramentas detectadas no site: {', '.join(company.tech_stack[:6])}")
            for signal in company.signals[:3]:
                facts.append(f"- Sinal ({signal.get('type', 'sinal')}): {signal.get('detail', '')}")
            if variant == "C":
                facts += await self._review_facts(company.id)
        if prospect.personalization_notes:
            facts.append(f"- Notas: {prospect.personalization_notes}")

        prompt = self.brain.load_prompt(
            VARIANT_PROMPTS.get(variant, "whatsapp"),
            product_name=self.config.product.name,
            product_description=self.config.product.description,
            product_benefits="\n".join(f"- {b}" for b in self.config.product.key_benefits),
            product_pricing=self.config.product.pricing,
            persona_name=whatsapp_persona_name(self.config),
            persona_company=self.config.persona.company,
            persona_role=self.config.persona.role,
            persona_tone=self.config.persona.tone,
            angle=random.choice(C_ANGLES if variant == "C" else QUESTION_ANGLES),
            motive=random.choice(C_MOTIVES),
            opening=self._opening(),
            length="Entre {} e {} palavras.".format(*random.choice(OPENER_LENGTHS)),
        )
        if not prompt:
            logger.error("WhatsApp: the opener prompt (prompts/whatsapp*.md) is missing or unreadable.")
            return ""
        prompt += "\n\nFATOS sobre o negócio (tudo o que você sabe):\n" + "\n".join(facts)

        recent = [
            _skeleton(b, c) for b, c in await self.state.get_recent_whatsapp_openers(RECENT_OPENERS)
        ]
        feedback = ""
        for _ in range(3):  # retries, told what the gate objected to
            result = await self.brain.think_json(
                prompt + feedback, session_id="harvey-writer",
                agent="writer", task="whatsapp_message",
            )
            body = str((result or {}).get("body") or "").strip() if isinstance(result, dict) else ""
            if not body:
                return ""
            gate = pre_send_check_whatsapp(prospect.phone, body, prospect=prospect)
            mine = _skeleton(body, prospect.company)
            twin = max(
                (difflib.SequenceMatcher(None, mine, r).ratio() for r in recent), default=0.0
            )
            if gate and twin <= MAX_OPENER_SIMILARITY:
                return body[:1000]
            reasons = list(gate.reasons)
            if twin > MAX_OPENER_SIMILARITY:
                reasons.append(
                    "ficou parecida demais com uma mensagem já enviada a outra loja; "
                    "mude a abertura, a ordem das frases e as palavras"
                )
            feedback = (
                "\n\nSua versão anterior foi recusada: " + "; ".join(reasons)
                + ". Reescreva corrigindo isso."
            )
        return ""

    def _opening(self) -> str:
        return random.choice(OPENING_STYLES).format(
            name=whatsapp_persona_name(self.config), company=self.config.persona.company,
        )

    async def ensure_online(self) -> bool:
        """Cheap liveness check for the watcher: revive a stopped session even
        when nothing is waiting to be sent, or no replies would arrive."""
        if not self.enabled or not self.client.is_configured():
            return False
        if (await self.client.session_status()) == "CONNECTED":
            return True
        return await self._revive_session()

    async def _revive_session(self) -> bool:
        """The gateway stops a session after a few failed reconnects and never
        retries on its own. Start it again (at most every REVIVE_EVERY), since
        the pairing is kept; a session that needs a new QR code is reported
        instead, because only a person can scan it."""
        status = await self.client.session_status()
        if status not in ("STOPPED", "DISCONNECTED", "CLOSED"):
            if status in ("SCAN_QR", "LOGGED_OUT"):
                logger.error(
                    f"WhatsApp: the session needs a new QR code ({status}). Scan it in "
                    "WA-AKG (Sessões / QR); sending holds until then."
                )
            return False
        last = await self.state.get_setting(REVIVE_KEY)
        now = _now()
        if last:
            try:
                if (now - datetime.fromisoformat(last)).total_seconds() < REVIVE_EVERY_SECONDS:
                    return False
            except ValueError:
                pass
        await self.state.set_setting(REVIVE_KEY, now.isoformat())
        logger.warning(f"WhatsApp: session was {status}; starting it again.")
        if not await self.client.start_session():
            return False
        for _ in range(12):
            await asyncio.sleep(5 if self.send_pacing else 0)
            if (await self.client.session_status()) == "CONNECTED":
                logger.info("WhatsApp: session reconnected.")
                await self.state.log_action(action_type="whatsapp_revived", agent="whatsapp")
                return True
        return False

    # ── daily cap and pacing ──

    async def daily_cap(self) -> int:
        """Cold messages allowed today: the ramp-up toward max_daily_sends."""
        cap = self.cfg.max_daily_sends
        if self.cfg.ramp_start_sends <= 0:
            return cap
        first = await self.state.first_whatsapp_cold_send_date()
        days = 0
        if first:
            days = max(0, (datetime.now(timezone.utc).date() - datetime.fromisoformat(first).date()).days)
        return min(cap, self.cfg.ramp_start_sends + days * self.cfg.ramp_step_sends)

    async def cold_left_today(self) -> int:
        """Cold messages still allowed today: under the daily cap and, when
        set, under the cap on today's messages nobody answered."""
        left = await self.daily_cap() - await self.state.count_outbox_sent_today(
            channel="whatsapp", kind="sequence"
        )
        if self.cfg.max_daily_unanswered > 0:
            left = min(left, self.cfg.max_daily_unanswered
                       - await self.state.count_whatsapp_unanswered_today())
        return left

    def cold_gap_seconds(self, cold_left: int) -> float:
        """Random wait before the next cold message: today's remaining sending
        window shared out over what's left, stretched or squeezed at random,
        with the odd long break, never under MIN_COLD_GAP_SECONDS."""
        qh = self.config.usage.quiet_hours
        now = datetime.now(pytz.timezone(qh.timezone))
        start = dtime.fromisoformat(qh.start)
        end = now.replace(hour=start.hour, minute=start.minute, second=0, microsecond=0)
        window = max(0.0, (end - now).total_seconds())
        gap = window / max(1, cold_left) * random.uniform(0.45, 1.6)
        if random.random() < 0.12:
            gap *= random.uniform(1.8, 3.0)
        return max(MIN_COLD_GAP_SECONDS + random.uniform(0, 120), gap)

    def cold_paused(self) -> bool:
        """Inside cold_paused_until: no new conversations at all, not even a
        contact a shop shared (a restricted number can't start chats)."""
        if not self.cfg.cold_paused_until:
            return False
        tz = pytz.timezone(self.config.usage.quiet_hours.timezone)
        try:
            until = tz.localize(datetime.fromisoformat(self.cfg.cold_paused_until))
        except ValueError:
            logger.warning(f"WhatsApp: cold_paused_until '{self.cfg.cold_paused_until}' isn't a date.")
            return True
        return datetime.now(tz) < until

    async def cold_due(self) -> bool:
        """May a cold message go out right now? Outside quiet hours, past any
        pause, and its random gap is up. A stale or missing schedule (start of
        the day) is set to a random point a little ahead instead of firing at
        the stroke of the hour."""
        if self.cold_paused():
            return False
        if not self.send_pacing:
            return True             # tests: no clocks, no waiting
        from harvey.main import in_quiet_hours
        if in_quiet_hours(self.config):
            return False
        now = _now()
        raw = await self.state.get_setting(NEXT_COLD_KEY)
        try:
            due_at = datetime.fromisoformat(raw) if raw else None
        except ValueError:
            due_at = None
        if due_at is None or (now - due_at).total_seconds() > 6 * 3600:
            later = now + timedelta(seconds=random.uniform(120, 1500))
            await self.state.set_setting(NEXT_COLD_KEY, later.isoformat())
            return False
        return now >= due_at

    # ── sending ──

    async def send(self, replies_only: bool = False):
        """Send due, approved WhatsApp rows through the gateway.

        ``replies_only`` is the fast watcher's mode: it answers people who
        wrote to us (at any hour, after a human-ish pause). Cold messages go
        out in either mode, one at a time, when ``cold_due`` says so.
        """
        async with self._send_lock:
            await self._send(replies_only)

    async def _send(self, replies_only: bool):
        if not self.enabled:
            return
        paused = await self.state.get_setting(KILL_SWITCH_KEY)
        if paused:
            logger.warning(f"WhatsApp: SENDING PAUSED ({paused}).")
            return
        if not self.client.is_configured():
            logger.warning(
                "WhatsApp: gateway not configured — set WA_AKG_URL, WA_AKG_API_KEY and "
                "WA_AKG_SESSION_ID in .env. Outbox is holding."
            )
            return

        now = _now().isoformat()
        # Replies and follow-ups each get their own query: a backlog of cold
        # messages must never push an existing conversation out of the LIMIT.
        due = await self.state.get_outbox(
            status="approved", due_before=now, limit=60, channel="whatsapp", kind="reply"
        )
        if not replies_only:
            due += await self.state.get_outbox(
                status="approved", due_before=now, limit=60, channel="whatsapp",
                kind="followup",
            )
            due += await self.state.get_outbox(
                status="approved", due_before=now, limit=60, channel="whatsapp",
                kind="sequence",
            )
        else:
            # A contact the shop just shared is waiting on us, and a cold
            # message may be due: the watcher is what makes the timing random.
            cold_now = await self.cold_due()
            due += [
                i for i in await self.state.get_outbox(
                    status="approved", due_before=now, limit=200, channel="whatsapp",
                    kind="sequence",
                )
                if cold_now or i.get("subject") == HANDOFF_SUBJECT
            ]
        if not due:
            return

        online, detail = await self.client.test_connection()
        if not online:
            online = await self._revive_session()
        if not online:
            logger.warning(f"WhatsApp: not sending this cycle — {detail}")
            return

        cold_left = await self.cold_left_today()
        cold_open = cold_left > 0 and await self.cold_due()
        sent = 0
        # Existing conversations first, then contacts a shop just shared.
        due.sort(key=lambda i: (
            i["kind"] != "reply", i["kind"] != "followup",
            i.get("subject") != HANDOFF_SUBJECT, i.get("send_at") or ""
        ))
        for item in due:
            if sent >= MAX_SENDS_PER_CYCLE:
                break
            cold = item["kind"] == "sequence"
            # A shop asked us to call this one: no waiting for the gap.
            handoff = cold and item.get("subject") == HANDOFF_SUBJECT and not self.cold_paused()
            if cold and (cold_left <= 0 or not (cold_open or handoff)):
                continue

            prospect = await self.state.get_prospect(item["prospect_id"])
            if prospect is None:
                await self.state.update_outbox_item(item["id"], status="failed", error="prospect missing")
                continue
            if item["kind"] == "followup" and (
                prospect.status in STOP_STATUSES - {"replied"}
                or not await self._still_waiting(item)
            ):
                await self.state.update_outbox_item(
                    item["id"], status="cancelled",
                    error="customer wrote back, conversation closed, or prospect suppressed",
                )
                continue
            if cold and prospect.status in STOP_STATUSES:
                await self.state.update_outbox_item(
                    item["id"], status="cancelled", error=f"prospect status '{prospect.status}'"
                )
                continue


            phone = item["to_email"]
            gate = pre_send_check_whatsapp(phone, item["body"], prospect=prospect, kind=item["kind"])
            if not gate:
                await self.state.update_outbox_item(
                    item["id"], status="failed", error="gate: " + "; ".join(gate.reasons)[:300]
                )
                logger.warning(f"WhatsApp: gate blocked message to {phone}: {gate.reasons}")
                continue

            if cold and not prospect.phone_verified:
                exists = await self.client.exists(phone)
                if exists is False:
                    await self.state.update_outbox_item(
                        item["id"], status="failed", error="number is not on WhatsApp"
                    )
                    await self.state.update_prospect_status(prospect.id, "lost")
                    logger.info(f"WhatsApp: {phone} has no WhatsApp; dropped.")
                    continue
                if exists is None:
                    logger.warning("WhatsApp: couldn't check the number; holding it for the next cycle.")
                    continue
                await self.state.set_prospect_phone(prospect.id, phone, True)

            if replies_only and self.send_pacing:
                # A person types; an instant answer reads like a machine.
                await asyncio.sleep(random.uniform(*REPLY_DELAY_SECONDS))

            if item["kind"] == "reply" and await self._customer_busy(phone, item.get("created_at") or ""):
                logger.info(f"WhatsApp: {prospect.company} is still writing; holding the reply.")
                continue

            result = await self.client.send_text(phone, item["body"])
            if not result.ok:
                if result.retryable:
                    logger.warning(f"WhatsApp: {result.error}; will retry next cycle.")
                    break
                await self.state.update_outbox_item(
                    item["id"], status="failed", error=result.error[:300]
                )
                logger.warning(f"WhatsApp: send to {phone} failed: {result.error}")
                continue

            sent += 1
            if cold:
                cold_left -= 1
                if not handoff:
                    # One cold message, then a fresh random wait.
                    cold_open = False
                    gap = self.cold_gap_seconds(cold_left)
                    await self.state.set_setting(
                        NEXT_COLD_KEY, (_now() + timedelta(seconds=gap)).isoformat()
                    )
                    logger.info(f"WhatsApp: next cold message in ~{gap / 60:.0f} min.")
            await self.state.update_outbox_item(
                item["id"], status="sent", sent_at=_now().isoformat(),
                message_id=result.message_id,
            )
            if prospect.status in ("new", "queued"):
                await self.state.update_prospect_status(prospect.id, "contacted")
            if item["kind"] in ("reply", "followup") and item.get("conversation_id"):
                await self._append_to_thread(item)
            await self.state.log_action(
                action_type="whatsapp_sent", agent="whatsapp",
                details={"to": phone, "kind": item["kind"], "company": prospect.company},
            )
            logger.info(f"WhatsApp: sent {item['kind']} to {prospect.company} ({phone}).")

            if self.send_pacing and sent < MAX_SENDS_PER_CYCLE:
                await asyncio.sleep(random.uniform(self.cfg.min_gap_seconds, self.cfg.max_gap_seconds))

        if sent:
            logger.info(f"WhatsApp: {sent} message(s) sent this cycle.")

    async def _customer_busy(self, phone: str, drafted_at: str) -> bool:
        """Typing, or wrote again since this reply was drafted. The reply waits;
        a new message gets it cancelled (stop-on-reply) and redrafted over
        everything they said."""
        if await self.client.is_typing(phone):
            return True
        # Messages from before our first send are never processed: only look
        # around the time this reply was drafted.
        drafted = _parse_ts(drafted_at)
        if not drafted:
            return False
        try:
            recent = await self.client.get_incoming(
                phone, since=(drafted - timedelta(minutes=2)).isoformat(), limit=5
            )
        except Exception:
            return False
        for m in recent:
            if not await self.state.is_reply_processed(f"wa:{m.id}"):
                return True
        return False

    async def _still_waiting(self, item: dict) -> bool:
        """A nudge only makes sense while our message is still the last word."""
        convo = await self.state.get_conversation(item.get("conversation_id") or "")
        return bool(convo and convo.status == "open" and convo.thread
                    and convo.thread[-1].sender == "harvey")

    async def _append_to_thread(self, item: dict):
        try:
            from harvey.models.conversation import Message
            convo = await self.state.get_conversation(item["conversation_id"])
            if convo:
                convo.thread.append(Message(sender="harvey", content=item["body"]))
                await self.state.update_conversation(convo.id, thread_json=convo.thread_json())
        except Exception as e:
            logger.debug(f"WhatsApp: conversation append failed: {e}")


_VARIANT_SENT_SQL = f"""
    FROM settings s
    JOIN outbox o ON o.prospect_id = substr(s.key, 12)
                 AND o.channel = 'whatsapp' AND o.kind = 'sequence' AND o.status = 'sent'
    JOIN prospects p ON p.id = o.prospect_id
    LEFT JOIN (
        SELECT prospect_id,
               MAX(COALESCE(intent, '') != 'ooo') AS human_replied,
               MAX(intent = 'ooo') AS automatic_replied,
               MAX(intent IN ('interested', 'question', 'objection')) AS engaged,
               MAX(intent = 'interested') AS interested
        FROM conversations
        WHERE channel = 'whatsapp' AND {REAL_REPLY_EXISTS_SQL}
        GROUP BY prospect_id
    ) c ON c.prospect_id = o.prospect_id
    LEFT JOIN (
        SELECT json_extract(details_json, '$.prospect_phone') AS phone,
               MAX(created_at) AS last_auto_at
        FROM actions
        WHERE action_type = 'whatsapp_auto_message' AND json_valid(details_json)
        GROUP BY phone
    ) a ON a.phone = p.phone
    WHERE s.key LIKE 'wa_variant:%'
      AND NOT EXISTS (
          SELECT 1 FROM settings test
          WHERE test.key = 'wa_test_contact:' || p.id AND test.value = '1'
      )"""

_VARIANT_HUMAN_SQL = "COALESCE(c.human_replied, 0) = 1"
_VARIANT_AUTO_SQL = """(COALESCE(c.automatic_replied, 0) = 1
                       OR COALESCE(julianday(a.last_auto_at) >= julianday(o.sent_at), 0))"""


async def variant_stats(state) -> list[dict]:
    """Count contacts, with human responses separate from automatic ones.

    ``replied``/``rate`` refer to human replies, not qualified interest.
    ``engaged`` requires an interested/question/objection classification;
    ``interested`` requires interested specifically. These describe recorded
    conversation intent, not a confirmed trial or sale. Explicit test contacts
    (setting ``wa_test_contact:<id> = 1``) are excluded from every denominator.
    """
    human = _VARIANT_HUMAN_SQL
    auto = _VARIANT_AUTO_SQL
    async with state._connect() as db:
        async with db.execute(
            f"""SELECT s.value,
                      COUNT(DISTINCT o.prospect_id),
                      COUNT(DISTINCT CASE WHEN {human} THEN p.id END),
                      COUNT(DISTINCT CASE WHEN {human}
                            AND p.status IN ('lost', 'opted_out') THEN p.id END),
                      COUNT(DISTINCT CASE WHEN p.status IN ('meeting', 'closed') THEN p.id END),
                      COUNT(DISTINCT CASE WHEN datetime(o.sent_at) >= datetime('now', '-7 days') THEN p.id END),
                      COUNT(DISTINCT CASE WHEN datetime(o.sent_at) >= datetime('now', '-7 days')
                            AND {human} THEN p.id END),
                      MIN(o.sent_at), MAX(o.sent_at),
                      COUNT(DISTINCT CASE WHEN {auto} THEN p.id END),
                      COUNT(DISTINCT CASE WHEN {auto} AND NOT ({human}) THEN p.id END),
                      COUNT(DISTINCT CASE WHEN {human} AND c.engaged = 1
                            AND p.status NOT IN ('lost', 'opted_out') THEN p.id END),
                      COUNT(DISTINCT CASE WHEN {human} AND c.interested = 1
                            AND p.status NOT IN ('lost', 'opted_out') THEN p.id END),
                      COUNT(DISTINCT CASE WHEN datetime(o.sent_at) >= datetime('now', '-7 days')
                            AND {auto} AND NOT ({human}) THEN p.id END)"""
            + _VARIANT_SENT_SQL + " GROUP BY s.value ORDER BY s.value"
        ) as cur:
            rows = await cur.fetchall()
    out = []
    for v, n, r, neg, meet, n7, r7, first, last, auto, auto_only, engaged, interested, auto7 in rows:
        out.append({
            "variant": v, "sent": n, "replied": r, "rate": (r / n if n else 0.0),
            "human_replied": r, "automatic_replied": auto, "automatic_only": auto_only,
            "any_reply": r + auto_only, "interested": interested,
            "refused": neg, "engaged": engaged, "meetings": meet,
            "engaged_rate": (engaged / n if n else 0.0),
            "sent_7d": n7, "replied_7d": r7, "rate_7d": (r7 / n7 if n7 else 0.0),
            "automatic_only_7d": auto7, "any_reply_7d": r7 + auto7,
            "first_sent": first, "last_sent": last,
        })
    return out


async def variant_examples(state, per_variant: int = 8) -> dict[str, list[dict]]:
    """Latest real-contact openers, distinguishing human and automatic replies."""
    async with state._connect() as db:
        async with db.execute(
            f"""SELECT s.value, p.company, o.body, o.sent_at, p.status,
                       {_VARIANT_HUMAN_SQL}, {_VARIANT_AUTO_SQL}"""
            + _VARIANT_SENT_SQL + " GROUP BY o.id ORDER BY o.sent_at DESC"
        ) as cur:
            rows = await cur.fetchall()
    out: dict[str, list[dict]] = {}
    for v, company, body, sent_at, status, replied, automatic in rows:
        bucket = out.setdefault(v, [])
        if len(bucket) < per_variant:
            bucket.append({
                "company": company, "body": body, "sent_at": sent_at,
                "status": status, "replied": bool(replied),
                "human_replied": bool(replied), "automatic_replied": bool(automatic),
                "automatic_only": bool(automatic and not replied),
            })
    return out

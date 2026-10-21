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
import logging
import math
import random
import re
import unicodedata

import pytz
from datetime import datetime, time as dtime, timezone

from harvey.brain import Brain
from harvey.config import EnvConfig, HarveyConfig, whatsapp_persona_name
from harvey.gate import pre_send_check_whatsapp
from harvey.integrations.whatsapp import (
    WhatsAppClient,
    is_mobile,
    normalize_phone,
)
from harvey.models.prospect import Prospect
from harvey.state import StateManager

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
# Prospect statuses that mean "stop messaging this person".
STOP_STATUSES = {"replied", "opted_out", "lost", "meeting", "closed"}


def _plain(text: str) -> str:
    """Lowercase without accents, so "Salão" matches "salao"."""
    text = unicodedata.normalize("NFKD", text or "")
    return "".join(c for c in text if not unicodedata.combining(c)).lower()


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
        """A or B, stable per prospect and evenly split (ids are hex)."""
        if not self.cfg.opener_test:
            return "A"
        try:
            return "AB"[int(prospect.id, 16) % 2]
        except ValueError:
            return "A"

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
        if prospect.personalization_notes:
            facts.append(f"- Notas: {prospect.personalization_notes}")

        prompt = self.brain.load_prompt(
            "whatsapp_b" if variant == "B" else "whatsapp",
            product_name=self.config.product.name,
            product_description=self.config.product.description,
            product_benefits="\n".join(f"- {b}" for b in self.config.product.key_benefits),
            product_pricing=self.config.product.pricing,
            persona_name=whatsapp_persona_name(self.config),
            persona_company=self.config.persona.company,
            persona_role=self.config.persona.role,
            persona_tone=self.config.persona.tone,
            angle=random.choice(QUESTION_ANGLES),
        )
        if not prompt:
            logger.error("WhatsApp: the opener prompt (prompts/whatsapp*.md) is missing or unreadable.")
            return ""
        prompt += "\n\nFATOS sobre o negócio (tudo o que você sabe):\n" + "\n".join(facts)

        feedback = ""
        for _ in range(2):  # one retry, told what the gate objected to
            result = await self.brain.think_json(
                prompt + feedback, session_id="harvey-writer",
                agent="writer", task="whatsapp_message",
            )
            body = str((result or {}).get("body") or "").strip() if isinstance(result, dict) else ""
            if not body:
                return ""
            gate = pre_send_check_whatsapp(prospect.phone, body, prospect=prospect)
            if gate:
                return body[:1000]
            feedback = (
                "\n\nSua versão anterior foi recusada: " + "; ".join(gate.reasons)
                + ". Reescreva corrigindo isso."
            )
        return ""

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

    def cold_per_cycle(self, cold_left: int) -> int:
        """Spread today's remaining cold messages over the rest of the sending
        window, so 50 a day is one every ~15 minutes, not 12 cycles of four."""
        qh = self.config.usage.quiet_hours
        now = datetime.now(pytz.timezone(qh.timezone))
        start = dtime.fromisoformat(qh.start)
        end = now.replace(hour=start.hour, minute=start.minute, second=0, microsecond=0)
        minutes = max(0.0, (end - now).total_seconds() / 60)
        cycles = max(1, int(minutes // max(1, self.config.usage.heartbeat_interval_minutes)))
        return max(1, min(MAX_SENDS_PER_CYCLE, math.ceil(cold_left / cycles)))

    # ── sending ──

    async def send(self, replies_only: bool = False):
        """Send due, approved WhatsApp rows through the gateway.

        ``replies_only`` is the fast watcher's mode: it answers people who
        wrote to us (at any hour) and never starts a new conversation.
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
        # Replies get their own query: a backlog of cold messages must never
        # push them out of the LIMIT.
        due = await self.state.get_outbox(
            status="approved", due_before=now, limit=60, channel="whatsapp", kind="reply"
        )
        if not replies_only:
            due += await self.state.get_outbox(
                status="approved", due_before=now, limit=60, channel="whatsapp",
                exclude_kind="reply",
            )
        if not due:
            return

        online, detail = await self.client.test_connection()
        if not online:
            online = await self._revive_session()
        if not online:
            logger.warning(f"WhatsApp: not sending this cycle — {detail}")
            return

        cold_left = await self.daily_cap() - await self.state.count_outbox_sent_today(
            channel="whatsapp", kind="sequence"
        )
        cold_budget = self.cold_per_cycle(cold_left) if cold_left > 0 else 0
        cold_sent = 0
        sent = 0
        # Replies first: someone is waiting for them.
        due.sort(key=lambda i: (i["kind"] != "reply", i.get("send_at") or ""))
        for item in due:
            if sent >= MAX_SENDS_PER_CYCLE:
                break
            cold = item["kind"] == "sequence"
            if cold and (cold_left <= 0 or cold_sent >= cold_budget):
                continue

            prospect = await self.state.get_prospect(item["prospect_id"])
            if prospect is None:
                await self.state.update_outbox_item(item["id"], status="failed", error="prospect missing")
                continue
            if item["kind"] == "followup" and not await self._still_waiting(item):
                await self.state.update_outbox_item(
                    item["id"], status="cancelled", error="customer wrote back or conversation closed"
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
                cold_sent += 1
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


async def variant_stats(state) -> list[dict]:
    """Reply rate per opener variant: sent, replied, rate."""
    async with state._connect() as db:
        async with db.execute(
            """SELECT s.value AS variant,
                      COUNT(DISTINCT o.prospect_id) AS sent,
                      COUNT(DISTINCT c.prospect_id) AS replied
               FROM settings s
               JOIN outbox o ON o.prospect_id = substr(s.key, 12)
                            AND o.channel = 'whatsapp' AND o.kind = 'sequence'
                            AND o.status = 'sent'
               LEFT JOIN conversations c ON c.prospect_id = o.prospect_id
               WHERE s.key LIKE 'wa_variant:%'
               GROUP BY s.value ORDER BY s.value"""
        ) as cur:
            rows = await cur.fetchall()
    return [
        {"variant": v, "sent": n, "replied": r, "rate": (r / n if n else 0.0)}
        for v, n, r in rows
    ]

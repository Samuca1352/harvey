"""The night shift — find businesses and draft their messages while sleeping.

Quiet hours stop SENDING, not working. From the moment they start until they
end, this loop searches Google Maps one (industry, city) pair at a time,
turns new businesses into WhatsApp prospects and drafts their first
messages, until ``discovery.queue_target`` are waiting. The heartbeat sends
them once quiet hours are over, within the usual daily cap and gaps.
"""

import asyncio
import logging

from harvey.collectors import discover

logger = logging.getLogger("harvey.night")

CURSOR_KEY = "night_cursor"
POLL_SECONDS = 60          # how often to check whether the night has begun
STEP_PAUSE_SECONDS = 20    # breathing room between searches
IDLE_SECONDS = 1800        # nothing left to find: look again in half an hour
MAX_NO_GAIN = 6            # searches in a row that find nothing new


def search_pairs(config) -> list[tuple[str, str]]:
    """Every (industry term, city) the night shift rotates through."""
    cities = list(config.discovery.cities) or list(config.icp.geography)
    terms = list(config.icp.industries)
    return [(t, c) for c in cities for t in terms]


async def queue_size(state) -> int:
    """First messages written and waiting to be sent."""
    waiting = 0
    for status in ("approved", "pending_review"):
        rows = await state.get_outbox(status=status, limit=1000, channel="whatsapp")
        waiting += sum(1 for r in rows if r["kind"] == "sequence")
    return waiting


async def night_step(state, config, agent, *, brain_ok: bool = True) -> dict:
    """One unit of night work. Returns what it did, for logs and tests.

    1. Draft messages for prospects already found (needs the brain).
    2. If the queue is still short, run the next search.
    """
    out = {"queue": 0, "searched": "", "new": 0, "drafted": 0}
    target = config.discovery.queue_target

    if brain_ok:
        before = await queue_size(state)
        await agent.run()
        out["drafted"] = max(0, await queue_size(state) - before)

    out["queue"] = await queue_size(state)
    if out["queue"] >= target:
        return out

    pairs = search_pairs(config)
    if not pairs:
        return out
    cursor = int(await state.get_setting(CURSOR_KEY, "0") or 0) % len(pairs)
    term, city = pairs[cursor]
    await state.set_setting(CURSOR_KEY, str(cursor + 1))

    query = discover.DiscoveryQuery(
        term=term, location=city, limit=config.discovery.results_per_search
    )
    report = await discover.run_discovery(
        state, config, config.discovery.provider, queries=[query], max_spend=0.0
    )
    out["searched"] = f"{term} / {city}"
    out["new"] = report.new_companies
    if report.errors:
        logger.warning(f"Night shift: search '{out['searched']}' had problems: {report.errors[:2]}")
    return out


async def night_shift(state, config, agent, brain, stop_event, in_quiet_hours):
    """Run ``night_step`` for as long as quiet hours last, every night."""
    max_calls = max(int(200 * (config.usage.max_daily_claude_percent / 100)), 1)
    logger.info(
        f"Night shift on: searching {config.discovery.provider} during quiet hours "
        f"until {config.discovery.queue_target} messages are ready."
    )
    no_gain = 0
    while not stop_event.is_set():
        wait = POLL_SECONDS
        try:
            if in_quiet_hours(config):
                brain_ok = not brain.paused_reason and await brain.is_within_budget(
                    max_calls, max_percent=config.usage.max_daily_claude_percent
                )
                step = await night_step(state, config, agent, brain_ok=bool(brain_ok))
                if step["searched"]:
                    logger.info(
                        f"Night shift: searched '{step['searched']}' → {step['new']} new, "
                        f"{step['queue']} message(s) ready."
                    )
                    no_gain = 0 if step["new"] else no_gain + 1
                wait = STEP_PAUSE_SECONDS
                if step["queue"] >= config.discovery.queue_target:
                    logger.info(f"Night shift: {step['queue']} messages ready. Resting.")
                    wait = IDLE_SECONDS
                elif no_gain >= MAX_NO_GAIN:
                    logger.info("Night shift: nothing new in the last searches. Resting.")
                    no_gain = 0
                    wait = IDLE_SECONDS
        except (KeyboardInterrupt, asyncio.CancelledError):
            raise
        except Exception as e:
            logger.error(f"Night shift: {e}", exc_info=True)
            wait = IDLE_SECONDS
        try:
            await asyncio.wait_for(stop_event.wait(), timeout=wait)
            break
        except asyncio.TimeoutError:
            pass

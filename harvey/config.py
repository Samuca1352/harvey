"""Configuration loader for Harvey. Reads harvey.yaml + .env."""

import logging
import os
import re
from datetime import time as _time
from pathlib import Path

import yaml
from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError, field_validator, model_validator

from harvey.paths import PROJECT_ROOT

logger = logging.getLogger("harvey.config")


class ConfigError(Exception):
    """Raised when Harvey's configuration is missing or invalid."""


class ConfigFileNotFoundError(ConfigError, FileNotFoundError):
    """Config file is missing. Subclasses FileNotFoundError for
    backward compatibility with existing callers/tests."""


class PersonaConfig(BaseModel):
    name: str
    company: str
    role: str
    email: str
    linkedin: str
    tone: str


class OfferConfig(BaseModel):
    primary: str = ""
    entry: str = ""
    goal: str = "book_call"  # book_call, start_trial, get_reply
    booking_method: str = "calendar_link"  # calendar_link, suggest_times, ask_preference
    booking_url: str = ""
    meeting_duration: str = "15 minutes"
    meeting_owner: str = ""


class ProductConfig(BaseModel):
    name: str
    description: str
    pricing: str
    key_benefits: list[str]
    objection_responses: dict[str, str]
    offer: OfferConfig = OfferConfig()


class ICPConfig(BaseModel):
    industries: list[str]
    company_size: str
    titles: list[str]
    geography: list[str]
    # Role keywords that indicate a company is in-market right now (a company
    # hiring a "Head of Growth" is buying growth tooling). Empty → falls back
    # to `titles`. Used for careers-page scanning and job-board discovery.
    hiring_signals: list[str] = []
    # Business types to leave alone. A word matching a discovered business's
    # category or name (case-insensitive, accents ignored) keeps it from being
    # messaged on WhatsApp: "restaurante" skips every restaurant.
    exclude_industries: list[str] = []
    # The opposite filter, and the stricter one: when set, a business is only
    # messaged if its category or name contains one of these words. This is what
    # keeps a broad search ("loja") from filling the queue with phone shops,
    # pet shops and cafés. Empty = no filter.
    include_keywords: list[str] = []
    # Discovery needs a radius, not a place name. Maps each entry in
    # `geography` to "lat,lng,radius_km" — e.g.
    #   "Denver, CO": "39.7392,-104.9903,50"
    # Without one, listings providers can only match on the business name.
    geo_coordinates: dict[str, str] = {}


class EmailChannelConfig(BaseModel):
    enabled: bool = True
    # "instantly" (legacy), "gmail" (Gmail/Workspace via API — recommended),
    # "microsoft" (Microsoft 365 / Outlook via Graph), or "smtp" (any
    # SMTP+IMAP mailbox: AgentMail, Fastmail, ...)
    provider: str = "instantly"
    max_daily_sends: int = 50
    # When True, also send to catch-all ("risky") domains, not just verified
    # mailboxes. Off by default — catch-alls accept everything, so a bad
    # guess still bounces.
    send_to_risky: bool = False
    # Copilot mode (native providers): every outgoing email waits in the
    # outbox for your approval (dashboard → Outbox, or `harvey outbox`).
    # Set false for full autopilot once you trust the output.
    require_approval: bool = True
    # Kill switch: pause all sending when bounces exceed this fraction of
    # sent mail (measured over the trailing sends). 0 disables the switch.
    max_bounce_rate: float = 0.05

    @field_validator("max_daily_sends")
    @classmethod
    def _sends_non_negative(cls, v: int) -> int:
        if v < 0:
            raise ValueError("max_daily_sends must be >= 0")
        return v


class LinkedInChannelConfig(BaseModel):
    enabled: bool = True
    max_daily_connections: int = 20
    max_daily_messages: int = 10


DEFAULT_WHATSAPP_OPT_OUTS = [
    "Se não fizer sentido pra você, é só me avisar que eu não te chamo mais.",
    "Se preferir que eu não te chame, é só falar.",
    "Quando não quiser mais receber mensagem minha, me avisa que eu paro.",
    "E se não for o momento, sem problema: me avisa e eu paro por aqui.",
    "Se não tiver interesse, pode me falar que eu não insisto.",
]


class WhatsAppChannelConfig(BaseModel):
    """WhatsApp outreach through a self-hosted WA-AKG gateway.

    Off by default. Connection details live in .env (WA_AKG_URL,
    WA_AKG_API_KEY, WA_AKG_SESSION_ID). Cold WhatsApp is the easiest way to
    lose a number, so the defaults are deliberately slow: a low daily cap,
    one message per business, human-ish gaps, approval on.
    """

    enabled: bool = False
    # Cold first messages per day. Replies to people who wrote back are not
    # counted against this.
    max_daily_sends: int = 25
    # Warm the number up toward max_daily_sends instead of jumping to it: the
    # cap on day N after the first cold message is ramp_start_sends + N *
    # ramp_step_sends, never above max_daily_sends. 0 = no ramp.
    ramp_start_sends: int = 0
    ramp_step_sends: int = 5
    # Same copilot ladder as email: nothing leaves until you approve it
    # (dashboard → Outbox, or `harvey outbox`). Set false once you trust it.
    require_approval: bool = True
    # Prepended to numbers that carry no country code (Google Maps shows
    # "(11) 91234-5678"). 55 = Brazil.
    default_country_code: str = "55"
    # How the assistant introduces itself on WhatsApp. Empty = persona.name.
    persona_name: str = ""
    # Closing line of every cold first message, one picked at random so the
    # messages don't all end the same way. Replies like "não quero" or "pare"
    # are understood either way; empty list = no closing line.
    opt_out_lines: list[str] = DEFAULT_WHATSAPP_OPT_OUTS
    # Legacy single line, used only when opt_out_lines is empty.
    opt_out_line: str = ""
    # Split first messages between two openers (A: the original pitch, B: a
    # short question about their shop) and compare reply rates with
    # `harvey whatsapp stats`. False = always A.
    opener_test: bool = True
    # Seconds to wait between two sends, picked at random in this range.
    min_gap_seconds: int = 30
    max_gap_seconds: int = 90
    # How long after our message a reply is still looked for.
    reply_window_days: int = 14
    # Nudges to someone who replied and then went quiet, in hours after our
    # last message: [24, 72] = one a day later, another three days after that,
    # then an alert to the owner. People who never replied are never nudged
    # (one touch only). Empty = off.
    followup_delays_hours: list[int] = [24, 72]
    # Your own number. When a customer is ready for a meeting (or needs a
    # human), Harvey sends a summary here. Empty disables the alerts.
    notify_phone: str = ""

    # A WhatsApp group (its JID, "...@g.us") that gets the same alerts, so more
    # than one person sees them. Takes precedence over notify_phone.
    notify_group: str = ""

    @field_validator("notify_group", mode="before")
    @classmethod
    def _group_jid(cls, v) -> str:
        v = str(v or "").strip()
        if v and not v.endswith("@g.us"):
            raise ValueError("notify_group must be a group JID ending in @g.us")
        return v

    @field_validator("notify_phone", mode="before")
    @classmethod
    def _notify_digits(cls, v) -> str:
        return re.sub(r"\D", "", str(v or ""))

    @field_validator("max_daily_sends")
    @classmethod
    def _sends_non_negative(cls, v: int) -> int:
        if v < 0:
            raise ValueError("max_daily_sends must be >= 0")
        return v

    @field_validator("default_country_code", mode="before")
    @classmethod
    def _digits_only(cls, v) -> str:
        v = re.sub(r"\D", "", str(v or ""))
        if not v:
            raise ValueError("default_country_code must be digits, e.g. 55")
        return v

    @model_validator(mode="after")
    def _gap_order(self):
        if self.min_gap_seconds < 0 or self.max_gap_seconds < self.min_gap_seconds:
            raise ValueError(
                "whatsapp gaps must satisfy 0 <= min_gap_seconds <= max_gap_seconds"
            )
        return self


def whatsapp_persona_name(config) -> str:
    """The name the assistant uses on WhatsApp."""
    return (config.channels.whatsapp.persona_name or config.persona.name).strip()


class ChannelsConfig(BaseModel):
    email: EmailChannelConfig = EmailChannelConfig()
    linkedin: LinkedInChannelConfig = LinkedInChannelConfig()
    whatsapp: WhatsAppChannelConfig = WhatsAppChannelConfig()


PRECLEARED_ADDRESS_SOURCES = ("published", "bought", "scraped", "given", "unknown")


class PreclearedConfig(BaseModel):
    """Optional per-recipient cold-email check through Precleared.

    Off by default. When on, each new recipient is checked once, before the
    first cold email, against UK PECR, US CAN-SPAM, Canada's CASL, Germany's
    UWG and France's rules. Any verdict other than ok_to_email holds the
    email back with the reason. See harvey/integrations/precleared.py.
    """

    enabled: bool = False
    # Where your business is based: GB or US. Required when enabled.
    sender_country: str = ""
    # Where prospect addresses come from, in Precleared's terms. Harvey
    # builds most addresses from a learned pattern, so the honest default
    # is "unknown"; use "published" only if yours are copied from the
    # businesses' own websites.
    address_source: str = "unknown"

    @field_validator("sender_country", mode="before")
    @classmethod
    def _upper_country(cls, v) -> str:
        return str(v or "").strip().upper()

    @field_validator("address_source", mode="before")
    @classmethod
    def _valid_source(cls, v) -> str:
        v = str(v or "unknown").strip().lower()
        if v not in PRECLEARED_ADDRESS_SOURCES:
            raise ValueError(
                f"'{v}' is not a valid address_source. "
                f"Use one of: {', '.join(PRECLEARED_ADDRESS_SOURCES)}."
            )
        return v

    @model_validator(mode="after")
    def _country_when_enabled(self):
        if self.enabled and self.sender_country not in ("GB", "US"):
            raise ValueError(
                "compliance.precleared.sender_country must be GB or US "
                "when the check is enabled."
            )
        return self


class ComplianceConfig(BaseModel):
    precleared: PreclearedConfig = PreclearedConfig()


class QuietHoursConfig(BaseModel):
    start: str = "22:00"
    end: str = "07:00"
    timezone: str = "America/New_York"

    @field_validator("start", "end")
    @classmethod
    def _valid_time(cls, v: str) -> str:
        try:
            _time.fromisoformat(v)
        except ValueError:
            raise ValueError(
                f"'{v}' is not a valid time. Use 24h HH:MM format, e.g. '22:00'."
            )
        return v

    @field_validator("timezone")
    @classmethod
    def _valid_timezone(cls, v: str) -> str:
        import pytz

        if v not in pytz.all_timezones_set:
            raise ValueError(
                f"'{v}' is not a valid timezone. Use an IANA name like 'America/New_York'."
            )
        return v


class UsageConfig(BaseModel):
    max_daily_claude_percent: float = 80.0
    heartbeat_interval_minutes: int = 15
    quiet_hours: QuietHoursConfig = QuietHoursConfig()

    @field_validator("max_daily_claude_percent")
    @classmethod
    def _valid_percent(cls, v: float) -> float:
        if not 0 < v <= 100:
            raise ValueError("max_daily_claude_percent must be between 0 and 100")
        return v

    @field_validator("heartbeat_interval_minutes")
    @classmethod
    def _valid_interval(cls, v: int) -> int:
        if v < 1:
            raise ValueError("heartbeat_interval_minutes must be at least 1")
        return v


BRAIN_PROVIDERS = ("claude", "codex")
CODEX_REASONING_EFFORTS = ("minimal", "low", "medium", "high", "xhigh")

# Model names are passed to a CLI, so they must look like a model name and
# never like a flag ("-x") or anything a shell would treat specially.
_MODEL_NAME_RE = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._:/\[\]-]{0,127}$")


class BrainConfig(BaseModel):
    """Which subscription Harvey thinks with.

    ``claude`` (default) runs Claude Code headless on your Claude plan.
    ``codex`` runs Codex on your ChatGPT plan. There is never an automatic
    fallback between them, and an explicit ``model`` only affects Harvey —
    your own Claude Code / Codex settings are never read or changed.
    """

    provider: str = "claude"
    model: str = ""  # empty = the provider's own default
    reasoning_effort: str = ""  # codex only; empty = model default

    @field_validator("provider", mode="before")
    @classmethod
    def _valid_provider(cls, v) -> str:
        v = str(v or "claude").strip().lower()
        if v not in BRAIN_PROVIDERS:
            raise ValueError(
                f"'{v}' is not a supported brain provider. "
                f"Use one of: {', '.join(BRAIN_PROVIDERS)}."
            )
        return v

    @field_validator("model", mode="before")
    @classmethod
    def _valid_model(cls, v) -> str:
        v = str(v or "").strip()
        if v and not _MODEL_NAME_RE.match(v):
            raise ValueError(f"'{v}' is not a valid model name.")
        return v

    @field_validator("reasoning_effort", mode="before")
    @classmethod
    def _valid_effort(cls, v) -> str:
        v = str(v or "").strip().lower()
        if v and v not in CODEX_REASONING_EFFORTS:
            raise ValueError(
                f"'{v}' is not a valid reasoning effort. "
                f"Use one of: {', '.join(CODEX_REASONING_EFFORTS)}."
            )
        return v


class DiscoveryConfig(BaseModel):
    """The night shift: finding businesses while nothing may be sent.

    During quiet hours Harvey searches Google Maps city by city, turns what it
    finds into prospects and drafts their first messages, so the morning starts
    with a full queue. Nothing is SENT at night; sending still waits for the
    end of quiet hours.
    """

    night_shift: bool = False
    provider: str = "gmaps_scraper"
    # Cities to search, e.g. ["Votuporanga, SP", "Fernandópolis, SP"]. Empty
    # falls back to icp.geography.
    cities: list[str] = []
    # Stop finding and drafting once this many first messages are waiting.
    queue_target: int = 60
    # Results asked of each search (one search = one industry in one city).
    results_per_search: int = 100


class HarveyConfig(BaseModel):
    persona: PersonaConfig
    product: ProductConfig
    icp: ICPConfig
    channels: ChannelsConfig = ChannelsConfig()
    usage: UsageConfig = UsageConfig()
    brain: BrainConfig = BrainConfig()
    compliance: ComplianceConfig = ComplianceConfig()
    discovery: DiscoveryConfig = DiscoveryConfig()


class EnvConfig(BaseModel):
    instantly_api_key: str = ""
    # Discovery providers
    dataforseo_login: str = ""
    dataforseo_password: str = ""
    dataforseo_sandbox: str = ""   # any truthy value routes to the free sandbox
    linkedin_email: str = ""
    linkedin_password: str = ""
    hunter_api_key: str = ""
    serper_api_key: str = ""
    reoon_api_key: str = ""
    zerobounce_api_key: str = ""
    # Native mail providers (channels.email.provider: gmail | smtp)
    gmail_client_id: str = ""
    gmail_client_secret: str = ""
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_username: str = ""
    smtp_password: str = ""
    imap_host: str = ""
    imap_port: int = 993
    imap_username: str = ""
    imap_password: str = ""
    # Microsoft 365 (channels.email.provider: microsoft)
    m365_client_id: str = ""
    m365_tenant_id: str = ""
    # Optional: only used when compliance.precleared.enabled is true.
    precleared_api_key: str = ""
    # WhatsApp gateway (channels.whatsapp.enabled) — a self-hosted WA-AKG.
    wa_akg_url: str = ""
    wa_akg_api_key: str = ""
    wa_akg_session_id: str = ""
    # Self-hosted gosom/google-maps-scraper (discover --provider gmaps_scraper)
    gmaps_scraper_url: str = ""
    gmaps_scraper_lang: str = "pt"


def _format_validation_error(e: ValidationError) -> str:
    """Turn a pydantic ValidationError into a readable, actionable message."""
    lines = []
    for err in e.errors():
        loc = ".".join(str(p) for p in err["loc"]) or "(root)"
        lines.append(f"  - {loc}: {err['msg']}")
    return "\n".join(lines)


def load_config(config_path: str | None = None) -> HarveyConfig:
    """Load Harvey configuration from YAML file.

    Raises ConfigError with a clear, actionable message on any problem.
    """
    if config_path is None:
        config_path = _find_config_file()

    try:
        with open(config_path) as f:
            data = yaml.safe_load(f)
    except FileNotFoundError:
        raise ConfigFileNotFoundError(
            f"Config file not found: {config_path}. "
            "Create one from harvey.yaml.example or run 'harvey setup'."
        )
    except yaml.YAMLError as e:
        raise ConfigError(f"Invalid YAML in {config_path}:\n  {e}")
    except OSError as e:
        raise ConfigError(f"Could not read {config_path}: {e}")

    if data is None:
        raise ConfigError(f"{config_path} is empty. Run 'harvey setup' to configure Harvey.")
    if not isinstance(data, dict):
        raise ConfigError(
            f"{config_path} must contain a YAML mapping (key: value pairs), "
            f"got {type(data).__name__}."
        )

    try:
        return HarveyConfig(**data)
    except ValidationError as e:
        # Log a friendly, actionable summary, then re-raise the original
        # ValidationError so callers (and tests) keep the pydantic type.
        logger.error(
            f"Invalid configuration in {config_path}:\n{_format_validation_error(e)}\n"
            "Fix the fields above or re-run 'harvey setup'."
        )
        raise


def load_brain_config(config_path: str | None = None) -> BrainConfig:
    """Read just the ``brain:`` section, without validating the rest.

    Training runs before a product is configured (the template harvey.yaml
    still has placeholder values), but it must still think with the
    provider the user chose. A missing file or section means the Claude
    default; an invalid section raises rather than silently switching
    providers.
    """
    if config_path is None:
        try:
            config_path = _find_config_file()
        except ConfigFileNotFoundError:
            return BrainConfig()
    try:
        with open(config_path) as f:
            data = yaml.safe_load(f)
    except FileNotFoundError:
        return BrainConfig()
    except (yaml.YAMLError, OSError) as e:
        raise ConfigError(f"Could not read the brain settings in {config_path}: {e}")
    section = data.get("brain") if isinstance(data, dict) else None
    if section is None:
        return BrainConfig()
    if not isinstance(section, dict):
        raise ConfigError(f"'brain' in {config_path} must be a mapping.")
    try:
        return BrainConfig(**section)
    except ValidationError as e:
        raise ConfigError(
            f"Invalid brain settings in {config_path}:\n{_format_validation_error(e)}"
        )


def load_env() -> EnvConfig:
    """Load environment variables from .env file."""
    load_dotenv()
    env = EnvConfig(
        instantly_api_key=os.getenv("INSTANTLY_API_KEY", "").strip(),
        dataforseo_login=os.getenv("DATAFORSEO_LOGIN", "").strip(),
        dataforseo_password=os.getenv("DATAFORSEO_PASSWORD", "").strip(),
        dataforseo_sandbox=os.getenv("DATAFORSEO_SANDBOX", "").strip(),
        linkedin_email=os.getenv("LINKEDIN_EMAIL", "").strip(),
        linkedin_password=os.getenv("LINKEDIN_PASSWORD", "").strip(),
        hunter_api_key=os.getenv("HUNTER_API_KEY", "").strip(),
        serper_api_key=os.getenv("SERPER_API_KEY", "").strip(),
        reoon_api_key=os.getenv("REOON_API_KEY", "").strip(),
        zerobounce_api_key=os.getenv("ZEROBOUNCE_API_KEY", "").strip(),
        gmail_client_id=os.getenv("GMAIL_CLIENT_ID", "").strip(),
        gmail_client_secret=os.getenv("GMAIL_CLIENT_SECRET", "").strip(),
        smtp_host=os.getenv("SMTP_HOST", "").strip(),
        smtp_port=int(os.getenv("SMTP_PORT", "587").strip() or 587),
        smtp_username=os.getenv("SMTP_USERNAME", "").strip(),
        smtp_password=os.getenv("SMTP_PASSWORD", "").strip(),
        imap_host=os.getenv("IMAP_HOST", "").strip(),
        imap_port=int(os.getenv("IMAP_PORT", "993").strip() or 993),
        imap_username=os.getenv("IMAP_USERNAME", "").strip(),
        imap_password=os.getenv("IMAP_PASSWORD", "").strip(),
        m365_client_id=os.getenv("M365_CLIENT_ID", "").strip(),
        m365_tenant_id=os.getenv("M365_TENANT_ID", "").strip(),
        precleared_api_key=os.getenv("PRECLEARED_API_KEY", "").strip(),
        wa_akg_url=os.getenv("WA_AKG_URL", "").strip().rstrip("/"),
        wa_akg_api_key=os.getenv("WA_AKG_API_KEY", "").strip(),
        wa_akg_session_id=os.getenv("WA_AKG_SESSION_ID", "").strip(),
        gmaps_scraper_url=os.getenv("GMAPS_SCRAPER_URL", "").strip().rstrip("/"),
        gmaps_scraper_lang=os.getenv("GMAPS_SCRAPER_LANG", "pt").strip() or "pt",
    )
    return env


def _find_config_file() -> str:
    """Search for Harvey's config.

    ``harvey.local.yaml`` wins when present. It is gitignored, so a fork can
    carry a real product configuration (trained on an actual company) while
    the tracked ``harvey.yaml`` stays an untrained template — nobody
    publishes their positioning, pricing, and prospect targeting by accident.
    """
    candidates = [
        Path.cwd() / "harvey.local.yaml",
        PROJECT_ROOT / "harvey.local.yaml",
        Path.cwd() / "harvey.yaml",
        Path.cwd().parent / "harvey.yaml",
        PROJECT_ROOT / "harvey.yaml",
    ]
    for path in candidates:
        if path.exists():
            return str(path)
    raise ConfigFileNotFoundError(
        "harvey.yaml not found in "
        + ", ".join(str(p.parent) for p in candidates)
        + ". Create one from harvey.yaml.example or run 'harvey setup'."
    )

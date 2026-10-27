# ProspectBoost Design System

ProspectBoost is a B2B prospecting platform run by AI agents: agents find and qualify accounts, research them, write outbound, watch replies and route leads to SDRs. This system covers the **admin dashboard** — a modern, clean, dense web app that is fully usable on mobile without dropping desktop features.

## Sources

The only inputs were three tall case-study boards (Behance-style) uploaded as images:

- `../references/boards/01-ef5df1256189919.6ab51e1c2acaf.jpg` (2400×18680) — overview, workflow, Home dashboard on desktop + mobile, activity/metric close-ups, "Today task" card, agent list.
- `../references/boards/02-c500e4256189919.6ab51e1c2b3c9.jpg` (2400×20337) — design principles, agent chat canvas, Tasks Kanban, metric tiles, marketing site.
- `../references/boards/03-cbf4e4256189919.6ab51e1c2bace.jpg` (2400×23547) — "Typography and color" spec (Gellix; #A9D4FF #F1E6EC #FFFFFF #FB5668 #0F0816), Home, Agent, Tasks and Artifacts screens.

The boards present a product called **"Foreman"** (an AI agent builder). It is used here strictly as the **visual reference** for ProspectBoost; its name, wordmark, "F" mark and robot mascot are *not* ProspectBoost assets and were not copied. No codebase, Figma file or logo was provided — every value here was measured or sampled from the images (colors sampled from pixels; sizes measured off the near-1:1 dashboard crops).

Paths below are relative to the design-system root unless prefixed with `../`.

## Index

| Path | What |
|---|---|
| `styles.css` | Entry point — `@import`s only. Link this one file. |
| `tokens/` | `fonts.css` (@font-face), `colors.css`, `typography.css`, `spacing.css` (space, radii, layout), `effects.css` (shadows, gradients, motion, z), `base.css` (resets) |
| `components/components.css` | All component classes (`pb-*`) incl. hover/focus/press states |
| `components/core/` | Icon, Button, IconButton, IconChip, Badge (+Count), StatusDot, Kbd, Avatar, Card (+Inset), Eyebrow · `icons.js` (Lucide paths) |
| `components/forms/` | Input, Textarea, Select, Checkbox, Radio, Switch, Composer |
| `components/navigation/` | NavItem, Sidebar, Tabs, FilterTabs |
| `components/data/` | MetricCard (+MiniChart), SegmentBar, ActivityCard, ActionRow, DataTable, TaskCard, KanbanColumn, ProgressCard, ArtifactCard |
| `components/feedback/` | Dialog, Toast, Tooltip, Menu (+MenuTrigger) |
| `../templates/dashboard/` | Click-through admin app (desktop + mobile) — see its README |
| `references/guidelines/` | Foundation specimen cards (Colors, Type, Spacing, Effects, Brand, Iconography) |
| `assets/icons/` | 88 Lucide SVGs (ISC) used by the system |
| `fonts/` | Figtree + Geist Mono woff2 (Google Fonts substitutes) |
| `../references/thumbnail.html` | Homepage tile (tool skill wrapper removed) |

## Components

Each lives in `components/<group>/<Name>.jsx` with `<Name>.d.ts` (props) and `<Name>.prompt.md` (usage). Runtime namespace: `window.ProspectBoostDesignSystem_668922`.

- **Core:** Icon, Button, IconButton, IconChip, Badge, Count, StatusDot, Kbd, Avatar, Card, Inset, Eyebrow
- **Forms:** Input, Textarea, Select, Checkbox, Radio, Switch, Composer
- **Navigation:** NavItem, Sidebar, Tabs, FilterTabs
- **Data:** MetricCard, MiniChart, SegmentBar, ActivityCard, ActionRow, DataTable, TaskCard, KanbanColumn, ProgressCard, ArtifactCard
- **Feedback:** Dialog, Toast, Tooltip, Menu, MenuTrigger

**Seen in the reference** (inventory): Button (black primary, white secondary, gray soft), IconButton, IconChip, Badge/tags, Count pill, StatusDot, Kbd, Avatar, Card/Inset nesting, Eyebrow corners, Input (search), Select-like model picker, Textarea (instructions), Composer, NavItem, Sidebar, Tabs (Board/List, Agent/Settings), FilterTabs, MetricCard, SegmentBar, ActivityCard, ActionRow, DataTable, TaskCard, KanbanColumn, ProgressCard ("Today task"), ArtifactCard, Menu (the "Weight" popover).

**Intentional additions** (no source counterpart; needed for a complete admin, built in the reference's vocabulary): Checkbox, Radio, Switch (settings forms), Dialog (create/confirm flows), Toast (action feedback), Tooltip (icon-only buttons), Icon (wrapper for the Lucide glyph set).

---

## CONTENT FUNDAMENTALS

**Voice:** calm operator. The product reports what agents did, plainly, like a good chief of staff. Confident, never hypey inside the app; marketing gets one punchy line ("Your Tools Don't Work for You. Agents Do").

- **Person:** address the user as *you* ("Here's what your agents have been up to"). The product never says *I/we* in UI chrome; agents may speak in first person inside chat ("On it — I'll pull 50 accounts…").
- **Greeting:** time-of-day + first name — "Good afternoon, Ana".
- **Casing:** Sentence case everywhere — nav ("Help Center" is the only Title-case exception from the source), panel titles ("Recent activity", "Agent performance"), buttons ("New agent", "Add Task" appears in the source; prefer "Add task" for new copy). Marketing headlines use Title Case.
- **Activity sentences:** `[Agent name] [past-tense verb] [concrete object]` — "Account Researcher drafted a brief for Acme Corp", "Reply Watch flagged 3 warm replies needing follow-up". Numbers as digits.
- **Time:** relative and short — "3 min ago", "1 hr ago", "Starts in 2h", "Queued 4m ago"; schedules as "Tomorrow, 9:00 AM", "Mon, 8:00 AM", "Every 15m", "09:00, Mon–Fri".
- **Deltas:** terse, colored, no sentence — "+1 this month", "-08% vs yesterday", "1 needs attention", "credits".
- **Technical strings stay technical:** "Trigger: schedule.daily", "webhook.inbound", IDs like `tsk_9c206`, file names like `ICP.md`.
- **Labels:** nouns, 1–3 words: "Main", "Agent", "Personalize", "Tasks", "Success rate", "Avg duration", "Last 7 days", "View all tasks".
- **Empty/placeholder:** invitational, with an ellipsis — "Search...", "Ask anything...", "Add instructions for the agent...".
- **Emoji:** never. **Exclamation marks:** never in product UI. Unicode used only as typographic marks: `·` separators, `—` in titles ("Weekly pipeline digest — Oct 20"), `•` between metrics on mobile, `⌘` in shortcuts.

## VISUAL FOUNDATIONS

- **Overall vibe:** airy, monochrome-first, Apple-grade calm. White canvas, near-white nested surfaces, black primary actions; color is reserved for *data* (status, agents, deltas). Density is high but never cramped thanks to hairlines and generous inner padding.
- **Color:** brand palette is Sky `#A9D4FF`, Blush `#F1E6EC`, White, Mist `#F3F3F5`, Coral `#FB5668`, Ink `#0F0816`. In-product the brand blue/blush appear almost only in the hero wash and the iridescent "Today task" rim; UI chrome is grayscale. Data hues (sampled): green `#04A943`, red `#F54430`, orange `#FE941A`, blue `#4C8DF6`, pink `#EE3F8A`, azure `#3FA9F5`, purple `#8E5CF5`. Tags = pastel tint + saturated text of the same hue. Each agent owns one hue across badges and meters.
- **Type:** Gellix (geometric grotesk) in Regular/Medium/Semibold — substituted with **Figtree**. Product sizes are small: 11 labels, 12 meta, 13 body/nav, 14 table cells, 15 panel titles & metric values (semibold), 18 page titles (medium). Marketing display ~64px medium with -0.025em tracking. Geist Mono for markdown/artifact previews and IDs. No bold (700) anywhere.
- **Spacing:** 4px base with 2/6/10 half-steps. Cards pad 6–8px around nested insets; insets pad 10–12px. Grid gaps are tight (8px) between sibling cards, 6px between stacked rows. Page padding 16px.
- **Backgrounds:** flat white app. No textures or images in product chrome. Marketing uses a full-bleed vertical **sky→blush gradient** (`--gradient-hero`) behind the hero; case-study tiles sit on light-gray studio backdrops. One recurring micro-pattern: **diagonal hatch** in empty chart slots (`--pattern-hatch`).
- **Nesting > shadows:** the signature motif is the *double bezel* — a gray-50 tile with a 1px `#EEEEF0` hairline containing a second hairline box (white or gray-75). Recent activity cards: white card → icon chip row → gray inset with text. Metric tiles: label strip → inset with value + mini chart.
- **Borders:** 1px hairlines everywhere (`--border-subtle #EEEEF0`; controls `#E6E6E9`). Dashed borders only for drop zones/placeholders. No colored left-border accents.
- **Shadows:** cards are flat. Shadow only on floating things: selected segmented tab (xs), hovered task card (sm), menus/toasts (md: `0 8px 24px rgba(15,8,22,.06)`), dialogs (lg). Shadows are tinted with Ink, never pure black, and very diffuse.
- **Corner radii:** 3 (chart bars, status squares) · 6 (tags, kbd) · 8 (buttons, inputs, nav items, icon chips, table rows) · 10 (insets) · 12 (cards) · 16 (composer, dialogs) · 24 (marketing tiles). Status markers are rounded *squares*, never circles.
- **Cards:** white or gray-50, 1px hairline, 12px radius, 6–8px padding, header row = 15px regular title + 11px tertiary action on the right ("View all tasks", "Last 7 days", "+ Add").
- **Data viz:** mini charts are three hatched slots where one holds a solid colored bar and the others a 1px colored marker line; success rates use **segmented tick meters** (10 ticks, 4×14px, 2px gap); progress uses 40 black ticks.
- **Hover:** one step darker surface (white → gray-50; gray-100 → gray-150), border strengthens one step, icon/text goes from secondary to primary. Primary black → gray-800.
- **Press:** `scale(.98)` on buttons, `.94` on icon buttons, 120ms.
- **Focus:** 3px sky ring `rgba(169,212,255,.65)` + sky-400 border on fields.
- **Selected:** gray-100 fill (nav), white pill with hairline + xs shadow (tabs, filters).
- **Animation:** quiet. Fades and 4px rises on enter (180–280ms, `cubic-bezier(.2,.8,.2,1)`), color transitions 120ms, drawer slides 24px. No bounces, no springs, no looping motion. Honor `prefers-reduced-motion`.
- **Transparency & blur:** only on the iridescent progress card (frosted inner layer) and modal overlay (`rgba(15,8,22,.32)` + 2px blur). Otherwise opaque.
- **Imagery:** device mockups on neutral gray studio sets; lifestyle photos are warm, natural daylight, soft shadows, light backgrounds. The reference's mascot is monochrome line-art (white fill, black 2px outline). ProspectBoost needs its own — placeholders are used.
- **Layout rules:** fixed 248px sidebar, 64px topbar with search left / bell + user right, scrollable content, optional 280px right rail. Mobile: 60px header with wordmark + hamburger (soft 40px button), drawer nav, 2×2 KPIs, horizontally swipeable activity and Kanban, tables become stacked rows, side panels become a segmented Chat/Configure switch. Touch targets ≥ 40px.
- **Eyebrow corners:** short kicker labels framed by four 7px viewfinder brackets — used above section headings and in the hero ("Stop managing tools.").

## ICONOGRAPHY

- **Style in the reference:** thin outline icons (~1.5px stroke, rounded caps/joins, 16px in UI, 20–24px in chips/marketing), monochrome gray, always placed inside a 32px bordered **IconChip** when they lead a row or card. No filled icons, no duotone, no icon font visible.
- **Set used here: [Lucide](https://lucide.dev) — a substitution.** The original icon family couldn't be identified from screenshots (it resembles Iconsax/Huge Icons outline). Lucide is the closest CDN-available match in weight and geometry. 88 SVGs were copied from `lucide-static@0.468.0` into `assets/icons/` and their path data into `components/core/icons.js`; the `Icon` component renders them inline at `strokeWidth={1.5}`. Mapping used for nav: Home `house`, Agents `asterisk`, Artifacts `file-stack`, Tasks `notebook-pen`, agents `sparkles` / `user-search` / `phone-outgoing` / `clock` / `ticket`, Brain `lightbulb`, Skills `zap`, Integrations `plug`.
- **Color:** `currentColor`; secondary gray by default, primary when active/hovered, status colors only for state glyphs (check, alert).
- **Emoji:** never. **Unicode as icons:** only `⌘` in shortcut keycaps; `·`/`•` as separators.
- **Third-party marks** (Salesforce, HubSpot, Gmail, Slack appeared in the reference) are represented with colored letter chips — drop real logos into `assets/` if licensed.
- **Logo:** none supplied. The brand name is set in type (`.pb-wordmark`, Figtree Semibold, -0.03em, Ink). Do not invent a mark.

## Font substitutions (flagged)

- **Gellix → Figtree** (Google Fonts, variable 400–600). Gellix is commercial and wasn't provided; supply the woff2 files and add `@font-face` rules in `tokens/fonts.css` — `--font-sans` already lists "Gellix" as a fallback name.
- **Mono → Geist Mono** (Google Fonts). The reference mono looks like SF Mono / Geist Mono.

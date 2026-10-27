# ProspectBoost Admin — UI kit

Click-through recreation of the ProspectBoost admin dashboard, rebuilt from the uploaded reference case study (an AI-agent workspace). Content is adapted to ProspectBoost's domain (B2B prospecting agents); layout, density and components follow the reference.

Open [the offline app](../../references/ui_kits/dashboard/index.html) or [mobile frame](../../references/ui_kits/dashboard/mobile.html). HTML entrypoints live in `../../references/ui_kits/dashboard/`; JSX, data and CSS live here. Rebuild from the repository root with `npm run build:design-system`.

**Files**
- `index.html` — the responsive app (desktop ≥ 861px, mobile below). Open it and click around.
- `mobile.html` — the same app inside an iPhone frame (402×874).
- `home.html`, `agent.html`, `tasks.html`, `artifacts.html` — Starting Points that open the app on a given screen.
- `Shell.jsx` — sidebar config, topbar, mobile header, drawer, `PageHead`.
- `HomeScreen.jsx` — greeting, 4 KPI tiles, Recent activity grid, Agent performance (table on desktop, stacked rows on mobile), right rail (Quick actions, Upcoming triggers, Integration health).
- `AgentScreen.jsx` — agent canvas (illustration placeholder, name, description, usage meta), fake chat via `Composer`, right config panel (Agent/Settings tabs, model select, instructions, Triggers, Integrations, Today task). Mobile swaps panels with a Chat / Configure segmented control.
- `TasksScreen.jsx` — Board/List toggle, status FilterTabs, 4 Kanban columns, task detail dialog (Run now / Stop), New task dialog.
- `ArtifactsScreen.jsx` — kind filters, filter field, ArtifactCard grid, preview dialog; also `PlaceholderScreen` for nav items not present in the reference (Brain, Skills, Integrations, Settings, Help) — intentionally blank.
- `App.jsx` — routing, toasts, New agent dialog. `data.js` — fake data. `kit.css` — layout + breakpoints only (components style themselves).

**Interactions**: sidebar / drawer navigation; agent rows → agent page; send a message to an agent; switch Board/List; filter by status; open a task and run/stop it; add tasks; open artifacts; create a new agent (appears in the sidebar); toasts for actions.

**Responsive rules**: ≤1180px the right rail drops below the main column; ≤860px sidebar → drawer behind a hamburger, KPIs 2×2, activity and kanban become horizontal snap-scrollers, the performance table becomes stacked rows, the agent config panel moves behind a segmented control. No feature is desktop-only.

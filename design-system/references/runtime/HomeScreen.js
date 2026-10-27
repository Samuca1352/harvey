(() => {
  const { MetricCard, ActivityCard, ActionRow, Card, DataTable, IconChip, SegmentBar, Button } = window.ProspectBoostDesignSystem_668922;
  function greeting() {
    const h = (/* @__PURE__ */ new Date()).getHours();
    return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  }
  function AgentPerfRow({ a, onClick }) {
    return /* @__PURE__ */ React.createElement(
      ActionRow,
      {
        muted: true,
        onClick,
        leading: /* @__PURE__ */ React.createElement(IconChip, { icon: a.icon }),
        title: /* @__PURE__ */ React.createElement("span", { style: { fontSize: 15 } }, a.name),
        subtitle: /* @__PURE__ */ React.createElement("span", null, "Tasks ", /* @__PURE__ */ React.createElement("b", { style: { fontWeight: 500, color: "var(--text-body)" } }, a.tasks), " \xA0\u2022\xA0 Avg ", /* @__PURE__ */ React.createElement("b", { style: { fontWeight: 500, color: "var(--text-body)" } }, a.avg)),
        trailing: /* @__PURE__ */ React.createElement("span", { style: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4, color: "var(--text-body)" } }, /* @__PURE__ */ React.createElement("span", null, a.rate, "%"), /* @__PURE__ */ React.createElement(SegmentBar, { value: a.rate, color: a.color }))
      }
    );
  }
  function HomeScreen({ data, agents, user, onNav, onQuick, onToast }) {
    const cols = [
      { key: "name", label: "Agent", width: "2.2fr", render: (a) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(IconChip, { icon: a.icon }), /* @__PURE__ */ React.createElement("span", { style: { overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, a.name)) },
      { key: "tasks", label: "Tasks" },
      { key: "rate", label: "Success rate", width: "1.4fr", render: (a) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(SegmentBar, { value: a.rate, color: a.color }), /* @__PURE__ */ React.createElement("span", null, a.rate, "%")) },
      { key: "avg", label: "Avg duration" }
    ];
    const activityMenu = [{ label: "Open task", icon: "external-link" }, { label: "Copy link", icon: "link" }, "-", { label: "Hide", icon: "eye" }];
    return /* @__PURE__ */ React.createElement("div", { className: "content" }, /* @__PURE__ */ React.createElement(PageHead, { title: greeting() + ", " + user.name.split(" ")[0], sub: "Here\u2019s what your agents have been up to" }), /* @__PURE__ */ React.createElement("div", { className: "metrics" }, data.metrics.map((m) => /* @__PURE__ */ React.createElement(MetricCard, { key: m.label, ...m }))), /* @__PURE__ */ React.createElement("div", { className: "home-grid" }, /* @__PURE__ */ React.createElement("div", { className: "home-main" }, /* @__PURE__ */ React.createElement(Card, { title: "Recent activity", action: "View all tasks", onAction: () => onNav("tasks") }, /* @__PURE__ */ React.createElement("div", { className: "activity-grid" }, data.activity.map((a) => /* @__PURE__ */ React.createElement(
      ActivityCard,
      {
        key: a.id,
        icon: a.icon,
        title: a.title,
        time: a.time,
        onClick: () => onNav("tasks"),
        onMenu: () => onToast({ tone: "neutral", title: "Activity options", description: activityMenu.filter((x) => x !== "-").map((x) => x.label).join(" \xB7 ") })
      }
    )))), /* @__PURE__ */ React.createElement(Card, { title: "Agent performance", action: "Last 7 days" }, /* @__PURE__ */ React.createElement("div", { className: "perf-table" }, /* @__PURE__ */ React.createElement(DataTable, { columns: cols, rows: agents, onRowClick: (a) => onNav("agent:" + a.id), minWidth: 560 })), /* @__PURE__ */ React.createElement("div", { className: "agent-list" }, agents.map((a) => /* @__PURE__ */ React.createElement(AgentPerfRow, { key: a.id, a, onClick: () => onNav("agent:" + a.id) }))))), /* @__PURE__ */ React.createElement("aside", { className: "rail" }, /* @__PURE__ */ React.createElement(Card, { variant: "tile", title: "Quick actions" }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, data.quickActions.map((q) => /* @__PURE__ */ React.createElement(ActionRow, { key: q.title, icon: q.icon, title: q.title, onClick: () => onQuick(q.action) })))), /* @__PURE__ */ React.createElement(Card, { variant: "tile", title: "Upcoming triggers" }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, data.triggers.map((t) => /* @__PURE__ */ React.createElement(ActionRow, { key: t.title, icon: t.icon, title: t.title, subtitle: t.sub, trailing: null })))), /* @__PURE__ */ React.createElement(Card, { variant: "tile", title: "Integration health" }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, data.integrations.map((i) => /* @__PURE__ */ React.createElement(
      ActionRow,
      {
        key: i.name,
        title: i.name,
        subtitle: i.ok ? "Synced 2 min ago" : "Re-authentication needed",
        leading: /* @__PURE__ */ React.createElement("span", { style: { width: 32, display: "grid", placeItems: "center" } }, /* @__PURE__ */ React.createElement("span", { className: "pb-status", style: { width: 16, height: 16, background: i.ok ? "var(--pb-mint-400)" : "var(--status-warning)" } })),
        trailing: i.ok ? "check" : /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "secondary", onClick: () => onToast({ tone: "success", title: i.name + " reconnected" }) }, "Fix")
      }
    )))))));
  }
  Object.assign(window, { HomeScreen, AgentPerfRow });
})();

(() => {
  const { Composer, Tabs, IconButton, Button, Select, Textarea, Card, ActionRow, IconChip, ProgressCard, Switch, Checkbox, Radio, Avatar, Icon } = window.ProspectBoostDesignSystem_668922;
  const REPLIES = [
    "On it \u2014 I\u2019ll pull 50 accounts that match your ICP and add them to a new list. You\u2019ll find it in Artifacts.",
    "Done. I flagged 12 accounts with recent funding and a VP Sales hire in the last 90 days.",
    "I drafted a 3-step sequence for those accounts. It\u2019s queued in Tasks for your approval."
  ];
  function AgentPanel({ agent, data, onToast }) {
    const [tab, setTab] = React.useState("Agent");
    return /* @__PURE__ */ React.createElement("aside", { className: "agent__panel" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ React.createElement(Tabs, { size: "sm", items: ["Agent", "Settings"], value: tab, onChange: setTab }), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement(IconButton, { icon: "rotate-ccw", variant: "outline", size: "sm", label: "Reset changes" }), /* @__PURE__ */ React.createElement(Button, { size: "sm", onClick: () => onToast({ tone: "success", title: "Agent saved", description: agent.name + " will use the new preferences on its next run." }) }, "Save")), tab === "Agent" ? /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", { style: { padding: "6px 2px 0", font: "var(--type-meta)", color: "var(--text-secondary)" } }, "Agent preferences"), /* @__PURE__ */ React.createElement(Select, { options: ["Smartest (Claude Opus)", "Balanced (Claude Sonnet)", "Fastest (Claude Haiku)"] }), /* @__PURE__ */ React.createElement(Textarea, { placeholder: "Add instructions for the agent...", rows: 3 }), /* @__PURE__ */ React.createElement(Card, { variant: "tile", title: "Triggers", headerRight: /* @__PURE__ */ React.createElement("button", { className: "pb-card__action", onClick: () => onToast({ tone: "info", title: "Add trigger", description: "Schedule, webhook or inbox events." }) }, "+ Add") }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, data.agentTriggers.map((t) => /* @__PURE__ */ React.createElement(ActionRow, { key: t.title, icon: t.icon, title: t.title, subtitle: t.sub, trailing: "menu" })))), /* @__PURE__ */ React.createElement(Card, { variant: "tile", title: "Integrations", headerRight: /* @__PURE__ */ React.createElement("button", { className: "pb-card__action" }, "+ Add") }, /* @__PURE__ */ React.createElement("div", { className: "stack" }, data.integrations.map((i) => /* @__PURE__ */ React.createElement(
      ActionRow,
      {
        key: i.name,
        leading: /* @__PURE__ */ React.createElement(IconChip, { letter: i.letter, color: i.color, size: 20 }),
        title: i.name,
        trailing: /* @__PURE__ */ React.createElement(Icon, { name: i.ok ? "circle-check" : "circle-alert", size: 14, color: i.ok ? "var(--text-tertiary)" : "var(--status-warning)" })
      }
    )))), /* @__PURE__ */ React.createElement(ProgressCard, { title: "Today task", value: 70, onAdd: () => onToast({ tone: "neutral", title: "Task added to today" }) })) : /* @__PURE__ */ React.createElement(Card, { variant: "tile", title: "Run settings" }, /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 14, padding: "4px 6px 8px" } }, /* @__PURE__ */ React.createElement(Switch, { label: "Agent active", defaultChecked: true }), /* @__PURE__ */ React.createElement(Checkbox, { label: "Require approval before sending", defaultChecked: true, description: "Drafts wait in Tasks \u2192 Queued" }), /* @__PURE__ */ React.createElement(Checkbox, { label: "Skip prospects already in CRM", defaultChecked: true }), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } }, /* @__PURE__ */ React.createElement("span", { style: { font: "var(--type-meta)", color: "var(--text-secondary)" } }, "Run cadence"), /* @__PURE__ */ React.createElement(Radio, { name: "cad", label: "Every weekday", defaultChecked: true }), /* @__PURE__ */ React.createElement(Radio, { name: "cad", label: "Weekly (Mondays)" }), /* @__PURE__ */ React.createElement(Radio, { name: "cad", label: "Manual only" })))));
  }
  function AgentScreen({ agent, data, onToast }) {
    const [mode, setMode] = React.useState("chat");
    const [msgs, setMsgs] = React.useState([]);
    const scroller = React.useRef(null);
    React.useEffect(() => {
      setMsgs([]);
    }, [agent.id]);
    React.useEffect(() => {
      if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight;
    }, [msgs]);
    const send = (text) => {
      setMsgs((m) => [...m, { me: true, text }]);
      setTimeout(() => setMsgs((m) => [...m, { me: false, text: REPLIES[Math.floor(m.length / 2) % REPLIES.length] }]), 700);
    };
    return /* @__PURE__ */ React.createElement("div", { className: "agent agent--" + mode }, /* @__PURE__ */ React.createElement("div", { className: "agent__switch" }, /* @__PURE__ */ React.createElement(Tabs, { items: [{ value: "chat", label: "Chat", icon: "message-circle" }, { value: "config", label: "Configure", icon: "sliders-horizontal" }], value: mode, onChange: setMode })), /* @__PURE__ */ React.createElement("div", { className: "agent__canvas" }, /* @__PURE__ */ React.createElement("div", { className: "agent__scroll", ref: scroller }, msgs.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "agent__hero" }, /* @__PURE__ */ React.createElement("div", { className: "agent__illo" }, "Agent illustration", /* @__PURE__ */ React.createElement("br", null), "(mascot not supplied)"), /* @__PURE__ */ React.createElement("div", { style: { alignSelf: "stretch" } }, /* @__PURE__ */ React.createElement("h1", { className: "page-title" }, agent.name), /* @__PURE__ */ React.createElement("p", { className: "page-sub", style: { maxWidth: 360 } }, agent.desc), /* @__PURE__ */ React.createElement("span", { className: "agent__meta" }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex" } }, ["AS", "LP", "MR"].map((n, i) => /* @__PURE__ */ React.createElement(Avatar, { key: n, name: n.split("").join(" "), size: 18, round: true, style: { marginLeft: i ? -5 : 0, border: "1.5px solid #fff", fontSize: 8 } }))), "\xB7 Used by ", agent.teammates, " teammates \xA0 ", agent.monthly, " tasks last month"))) : /* @__PURE__ */ React.createElement("div", { className: "msgs" }, msgs.map((m, i) => /* @__PURE__ */ React.createElement("div", { key: i, className: "msg " + (m.me ? "msg--me" : "msg--agent") }, m.text)))), /* @__PURE__ */ React.createElement("div", { className: "agent__composer" }, /* @__PURE__ */ React.createElement(Composer, { placeholder: "Ask " + agent.name + " anything...", onSend: send }))), /* @__PURE__ */ React.createElement(AgentPanel, { agent, data, onToast }));
  }
  Object.assign(window, { AgentScreen });
})();

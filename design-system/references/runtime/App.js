(() => {
  const { Dialog, Button, Input, Select, Textarea, Toast } = window.ProspectBoostDesignSystem_668922;
  const D = window.PB_DATA;
  const LABELS = { brain: "Brain", skills: "Skills", integrations: "Integrations", settings: "Settings", help: "Help Center" };
  function NewAgentDialog({ open, onClose, onCreate }) {
    const [name, setName] = React.useState("");
    const [tpl, setTpl] = React.useState("prospect-finder");
    if (!open) return null;
    return /* @__PURE__ */ React.createElement(
      Dialog,
      {
        open: true,
        title: "New agent",
        description: "Name it and pick what it should do first.",
        onClose,
        footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: onClose }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { disabled: !name.trim(), onClick: () => {
          onCreate(name, tpl);
          setName("");
        } }, "Create agent"))
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(Input, { label: "Agent name", placeholder: "e.g. Fintech Prospector", value: name, onChange: (e) => setName(e.target.value), autoFocus: true }), /* @__PURE__ */ React.createElement(Select, { label: "Start from", value: tpl, onChange: (e) => setTpl(e.target.value), options: D.agents.map((a) => ({ value: a.id, label: a.name + " template" })) }), /* @__PURE__ */ React.createElement(Textarea, { label: "Instructions", placeholder: "Who should it look for? What should it do with them?", rows: 3 }))
    );
  }
  function App() {
    const [nav, setNav] = React.useState(() => window.PB_START || localStorage.getItem("pb-kit-nav") || "home");
    const [agents, setAgents] = React.useState(D.agents);
    const [drawer, setDrawer] = React.useState(false);
    const [newAgent, setNewAgent] = React.useState(false);
    const [toasts, setToasts] = React.useState([]);
    React.useEffect(() => {
      if (!window.PB_START) localStorage.setItem("pb-kit-nav", nav);
    }, [nav]);
    const toast = (t) => {
      const id = Math.random();
      setToasts((ts) => [...ts.slice(-2), { ...t, id }]);
      setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 4e3);
    };
    const go = (id) => {
      setNav(id === "agents" ? "agent:" + agents[0].id : id);
      setDrawer(false);
    };
    const quick = (a) => {
      if (a === "new-agent") setNewAgent(true);
      else if (a === "integration") go("integrations");
      else if (a === "skills") go("skills");
      else toast({ tone: "success", title: "Invite sent", description: "We emailed a join link to your teammate." });
    };
    const create = (name, tpl) => {
      const base = agents.find((a) => a.id === tpl) || agents[0];
      const id = "custom-" + Date.now();
      setAgents((as) => [...as, { ...base, id, name, icon: "bot", tasks: 0, rate: 0, avg: "\u2014", teammates: 1, monthly: "0" }]);
      setNewAgent(false);
      setNav("agent:" + id);
      toast({ tone: "success", title: "Agent created", description: name + " is ready. Give it instructions to start." });
    };
    let screen;
    if (nav === "home") screen = /* @__PURE__ */ React.createElement(HomeScreen, { data: D, agents, user: D.user, onNav: go, onQuick: quick, onToast: toast });
    else if (nav.startsWith("agent:")) {
      const a = agents.find((x) => "agent:" + x.id === nav) || agents[0];
      screen = /* @__PURE__ */ React.createElement(AgentScreen, { key: a.id, agent: a, data: D, onToast: toast });
    } else if (nav === "tasks") screen = /* @__PURE__ */ React.createElement(TasksScreen, { data: D, agents, onToast: toast });
    else if (nav === "artifacts") screen = /* @__PURE__ */ React.createElement(ArtifactsScreen, { data: D, onToast: toast });
    else screen = /* @__PURE__ */ React.createElement(PlaceholderScreen, { label: LABELS[nav] || nav });
    const sidebar = /* @__PURE__ */ React.createElement(AppSidebar, { agents, activeId: nav, onSelect: go, onNewAgent: () => {
      setDrawer(false);
      setNewAgent(true);
    }, onCollapse: drawer ? () => setDrawer(false) : void 0 });
    return /* @__PURE__ */ React.createElement("div", { className: "app", "data-screen-label": nav }, /* @__PURE__ */ React.createElement("div", { className: "app__side" }, sidebar), /* @__PURE__ */ React.createElement("main", { className: "app__main" }, /* @__PURE__ */ React.createElement(Topbar, { user: D.user, onToast: toast }), /* @__PURE__ */ React.createElement(MobileHeader, { onMenu: () => setDrawer(true) }), screen), /* @__PURE__ */ React.createElement(Drawer, { open: drawer, onClose: () => setDrawer(false) }, sidebar), /* @__PURE__ */ React.createElement(NewAgentDialog, { open: newAgent, onClose: () => setNewAgent(false), onCreate: create }), /* @__PURE__ */ React.createElement("div", { className: "toasts" }, toasts.map((t) => /* @__PURE__ */ React.createElement(Toast, { key: t.id, ...t, onClose: () => setToasts((ts) => ts.filter((x) => x.id !== t.id)) }))));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(App, null));
})();

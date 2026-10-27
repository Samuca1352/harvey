(() => {
  const { Tabs, FilterTabs, KanbanColumn, TaskCard, Button, DataTable, Badge, StatusDot, Dialog, Input, Select } = window.ProspectBoostDesignSystem_668922;
  const STATUSES = [
    { value: "queued", label: "Queued" },
    { value: "running", label: "Running" },
    { value: "success", label: "Success" },
    { value: "failed", label: "Failed" }
  ];
  function TaskDetail({ task, agents, onClose, onMove }) {
    if (!task) return null;
    const agent = agents.find((a) => a.id === task.agent);
    const label = STATUSES.find((s) => s.value === task.status).label;
    return /* @__PURE__ */ React.createElement(
      Dialog,
      {
        open: true,
        title: task.title,
        description: "Trigger: " + task.trigger + " \xB7 " + task.id,
        onClose,
        width: 480,
        footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: onClose }, "Close"), (task.status === "queued" || task.status === "failed") && /* @__PURE__ */ React.createElement(Button, { iconLeft: "play", onClick: () => onMove(task, "running") }, "Run now"), task.status === "running" && /* @__PURE__ */ React.createElement(Button, { variant: "danger", iconLeft: "pause", onClick: () => onMove(task, "queued") }, "Stop"))
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginBottom: 12 } }, /* @__PURE__ */ React.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6, font: "var(--type-body)" } }, /* @__PURE__ */ React.createElement(StatusDot, { status: task.status }), label), task.tags.map((t) => /* @__PURE__ */ React.createElement(Badge, { key: t.label, tone: t.tone }, t.label))),
      /* @__PURE__ */ React.createElement("div", { className: "md" }, "[09:00:02] " + (agent ? agent.name : "Agent") + " started\n[09:00:04] Loaded ICP.md (v12)\n[09:00:09] Queried 3 sources \xB7 1,204 candidates\n[09:00:31] Scored + deduped \xB7 48 qualified\n[09:00:33] " + task.when)
    );
  }
  function NewTask({ open, agents, onClose, onCreate }) {
    const [title, setTitle] = React.useState("");
    const [agent, setAgent] = React.useState(agents[0].id);
    const [trigger, setTrigger] = React.useState("manual");
    if (!open) return null;
    return /* @__PURE__ */ React.createElement(
      Dialog,
      {
        open: true,
        title: "New task",
        description: "Queue a one-off run for any agent.",
        onClose,
        footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", onClick: onClose }, "Cancel"), /* @__PURE__ */ React.createElement(Button, { disabled: !title.trim(), onClick: () => {
          onCreate({ title, agent, trigger });
          setTitle("");
        } }, "Add to queue"))
      },
      /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 12 } }, /* @__PURE__ */ React.createElement(Input, { label: "Task", placeholder: "e.g. Find 50 fintech accounts in Brazil", value: title, onChange: (e) => setTitle(e.target.value), autoFocus: true }), /* @__PURE__ */ React.createElement(Select, { label: "Agent", value: agent, onChange: (e) => setAgent(e.target.value), options: agents.map((a) => ({ value: a.id, label: a.name })) }), /* @__PURE__ */ React.createElement(Select, { label: "Trigger", value: trigger, onChange: (e) => setTrigger(e.target.value), options: ["manual", "schedule.daily", "webhook.inbound"] }))
    );
  }
  function TasksScreen({ data, agents, onToast }) {
    const [view, setView] = React.useState("Board");
    const [filter, setFilter] = React.useState(null);
    const [tasks, setTasks] = React.useState(data.tasks);
    const [open, setOpen] = React.useState(null);
    const [adding, setAdding] = React.useState(false);
    const counts = { ...data.taskCounts };
    const shown = STATUSES.filter((s) => !filter || s.value === filter);
    const move = (t, status) => {
      setTasks((ts) => ts.map((x) => x.id === t.id ? { ...x, status, when: status === "running" ? "Started just now" : "Queued just now" } : x));
      setOpen(null);
      onToast({ tone: status === "running" ? "success" : "warning", title: status === "running" ? "Task started" : "Task stopped", description: t.title });
    };
    const create = ({ title, agent, trigger }) => {
      const a = agents.find((x) => x.id === agent);
      const id = "tsk_" + Math.random().toString(16).slice(2, 7);
      setTasks((ts) => [{ id, status: "queued", trigger, title, agent, tags: [{ label: a.name, tone: a.tone }], when: "Queued just now" }, ...ts]);
      setAdding(false);
      onToast({ tone: "success", title: "Task queued", description: title });
    };
    const listCols = [
      { key: "title", label: "Task", width: "2.2fr", render: (t) => /* @__PURE__ */ React.createElement("span", { style: { color: "var(--text-primary)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, t.title) },
      { key: "status", label: "Status", render: (t) => /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(StatusDot, { status: t.status }), STATUSES.find((s) => s.value === t.status).label) },
      { key: "agent", label: "Agent", width: "1.4fr", render: (t) => /* @__PURE__ */ React.createElement(Badge, { tone: t.tags[0].tone }, (agents.find((a) => a.id === t.agent) || {}).name) },
      { key: "trigger", label: "Trigger", width: "1.2fr", render: (t) => /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--text-secondary)" } }, t.trigger) },
      { key: "id", label: "ID", align: "right", render: (t) => /* @__PURE__ */ React.createElement("span", { style: { fontSize: 12, color: "var(--text-tertiary)" } }, t.id) }
    ];
    return /* @__PURE__ */ React.createElement("div", { className: "content" }, /* @__PURE__ */ React.createElement(PageHead, { title: "Tasks", sub: "1,842 tasks run in the last 7 days" }, /* @__PURE__ */ React.createElement(Button, { variant: "ghost", iconLeft: "download", onClick: () => onToast({ tone: "info", title: "Export started", description: "We\u2019ll email you a CSV." }) }, "Export"), /* @__PURE__ */ React.createElement(Button, { iconLeft: "plus", onClick: () => setAdding(true) }, "New task")), /* @__PURE__ */ React.createElement("div", { className: "filters-strip" }, /* @__PURE__ */ React.createElement(FilterTabs, { value: filter, onChange: setFilter, items: STATUSES.map((s) => ({ ...s, status: s.value, count: counts[s.value] })) }), /* @__PURE__ */ React.createElement(Tabs, { items: ["Board", "List"], value: view, onChange: setView })), view === "Board" ? /* @__PURE__ */ React.createElement("div", { className: "board", style: filter ? { gridTemplateColumns: "minmax(250px,420px)" } : void 0 }, shown.map((s) => {
      const items = tasks.filter((t) => t.status === s.value);
      return /* @__PURE__ */ React.createElement("div", { className: "board__col", key: s.value }, /* @__PURE__ */ React.createElement(KanbanColumn, { status: s.value, title: s.label, count: items.length, onAdd: () => setAdding(true) }, items.map((t) => /* @__PURE__ */ React.createElement(TaskCard, { key: t.id, trigger: t.trigger, title: t.title, tags: t.tags, when: t.when, id: t.id, onClick: () => setOpen(t) }))), /* @__PURE__ */ React.createElement(Button, { variant: "soft", block: true, iconLeft: "plus", onClick: () => setAdding(true) }, "Add Task"));
    })) : /* @__PURE__ */ React.createElement(DataTable, { columns: listCols, rows: tasks.filter((t) => !filter || t.status === filter), onRowClick: setOpen, minWidth: 680 }), /* @__PURE__ */ React.createElement(TaskDetail, { task: open, agents, onClose: () => setOpen(null), onMove: move }), /* @__PURE__ */ React.createElement(NewTask, { open: adding, agents, onClose: () => setAdding(false), onCreate: create }));
  }
  Object.assign(window, { TasksScreen });
})();

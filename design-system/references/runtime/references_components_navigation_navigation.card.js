const NS = window.ProspectBoostDesignSystem_668922;
const { Sidebar, Tabs, FilterTabs } = NS;
function Demo() {
  const [active, setActive] = React.useState("home");
  const [view, setView] = React.useState("Board");
  const [f, setF] = React.useState("queued");
  return /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "248px 1fr", gap: 20, margin: "-20px 0 0 -24px" } }, /* @__PURE__ */ React.createElement("div", { style: { height: 560 } }, /* @__PURE__ */ React.createElement(
    Sidebar,
    {
      activeId: active,
      onSelect: setActive,
      onCollapse: () => {
      },
      sections: [
        { label: "Main", items: [{ id: "home", label: "Home", icon: "house" }, { id: "agents", label: "Agents", icon: "asterisk" }, { id: "artifacts", label: "Artifacts", icon: "file-stack" }, { id: "tasks", label: "Tasks", icon: "notebook-pen" }] },
        { label: "Agent", items: [{ id: "pf", label: "Prospect Finder", icon: "sparkles" }, { id: "ar", label: "Account Researcher", icon: "user-search" }, { id: "ow", label: "Outbound Writer", icon: "phone-outgoing" }] },
        { label: "Personalize", items: [{ id: "brain", label: "Brain", icon: "lightbulb" }, { id: "skills", label: "Skills", icon: "zap" }] }
      ],
      footer: [{ id: "settings", label: "Settings", icon: "settings" }, { id: "help", label: "Help Center", icon: "circle-help" }]
    }
  )), /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 20, display: "flex", flexDirection: "column", gap: 20 } }, /* @__PURE__ */ React.createElement("div", { className: "sec" }, /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "Tabs (segmented)"), /* @__PURE__ */ React.createElement("div", { className: "row" }, /* @__PURE__ */ React.createElement(Tabs, { items: ["Board", "List"], value: view, onChange: setView }), /* @__PURE__ */ React.createElement(Tabs, { size: "sm", items: ["Agent", "Settings"], value: "Agent" }))), /* @__PURE__ */ React.createElement("div", { className: "sec" }, /* @__PURE__ */ React.createElement("span", { className: "lbl" }, "FilterTabs"), /* @__PURE__ */ React.createElement(FilterTabs, { value: f, onChange: setF, items: [{ value: "queued", label: "Queued", status: "queued", count: 4 }, { value: "running", label: "Running", status: "running", count: 3 }, { value: "success", label: "Success", status: "success", count: "1,829" }, { value: "failed", label: "Failed", status: "failed", count: 6 }] }), /* @__PURE__ */ React.createElement(FilterTabs, { value: "doc", items: [{ value: "doc", label: "Docs", status: "doc", count: 2 }, { value: "sheet", label: "Sheets", status: "sheet", count: 3 }, { value: "sequence", label: "Sequences", status: "sequence", count: 2 }] }))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(Demo, null));

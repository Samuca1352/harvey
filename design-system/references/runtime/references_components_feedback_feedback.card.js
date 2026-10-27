const NS = window.ProspectBoostDesignSystem_668922;
const { Dialog, Toast, Tooltip, Menu, Button, IconButton, Input } = NS;
function Demo() {
  return /* @__PURE__ */ React.createElement("div", { style: { background: "var(--bg-canvas)", margin: "-20px -24px", padding: "20px 24px", minHeight: 460, display: "flex", flexDirection: "column", gap: 16 } }, /* @__PURE__ */ React.createElement("div", { style: { display: "grid", gridTemplateColumns: "minmax(0,1.15fr) minmax(0,1fr)", gap: 16, alignItems: "start" } }, /* @__PURE__ */ React.createElement(
    Dialog,
    {
      inline: true,
      title: "New agent",
      description: "Name it and pick what it should do first.",
      onClose: () => {
      },
      footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "secondary" }, "Cancel"), /* @__PURE__ */ React.createElement(Button, null, "Create agent"))
    },
    /* @__PURE__ */ React.createElement(Input, { label: "Agent name", defaultValue: "Prospect Finder" })
  ), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } }, /* @__PURE__ */ React.createElement(Toast, { tone: "success", title: "Agent saved", description: "Prospect Finder runs tomorrow at 9:00 AM.", onClose: () => {
  } }), /* @__PURE__ */ React.createElement(Toast, { tone: "warning", title: "HubSpot needs attention", description: "Re-authenticate to resume syncing.", action: /* @__PURE__ */ React.createElement(Button, { size: "sm", variant: "secondary" }, "Reconnect") }))), /* @__PURE__ */ React.createElement("div", { style: { display: "flex", gap: 16, alignItems: "flex-start" } }, /* @__PURE__ */ React.createElement(Menu, { label: "Weight", items: [{ label: "Regular" }, { label: "Medium", checked: true }, { label: "Semi Bold" }] }), /* @__PURE__ */ React.createElement(Menu, { items: [{ label: "Edit", icon: "pencil" }, { label: "Duplicate", icon: "copy" }, "-", { label: "Delete", icon: "trash-2", danger: true }] }), /* @__PURE__ */ React.createElement("div", { style: { paddingTop: 44, paddingLeft: 40 } }, /* @__PURE__ */ React.createElement(Tooltip, { className: "force", label: "Collapse sidebar" }, /* @__PURE__ */ React.createElement(IconButton, { icon: "panel-left-close", variant: "outline", label: "Collapse" })))));
}
ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(Demo, null));

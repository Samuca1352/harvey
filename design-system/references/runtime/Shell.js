(() => {
  const { Sidebar, Input, IconButton, Avatar, Icon } = window.ProspectBoostDesignSystem_668922;
  function navSections(agents) {
    return [
      { label: "Main", items: [
        { id: "home", label: "Home", icon: "house" },
        { id: "agents", label: "Agents", icon: "asterisk" },
        { id: "artifacts", label: "Artifacts", icon: "file-stack" },
        { id: "tasks", label: "Tasks", icon: "notebook-pen" }
      ] },
      { label: "Agent", items: agents.map((a) => ({ id: "agent:" + a.id, label: a.name, icon: a.icon })) },
      { label: "Personalize", items: [
        { id: "brain", label: "Brain", icon: "lightbulb" },
        { id: "skills", label: "Skills", icon: "zap" },
        { id: "integrations", label: "Integrations", icon: "plug" }
      ] }
    ];
  }
  const NAV_FOOTER = [{ id: "settings", label: "Settings", icon: "settings" }, { id: "help", label: "Help Center", icon: "circle-help" }];
  function AppSidebar({ agents, activeId, onSelect, onNewAgent, onCollapse }) {
    return /* @__PURE__ */ React.createElement(
      Sidebar,
      {
        activeId,
        onSelect,
        onAction: onNewAgent,
        onCollapse,
        sections: navSections(agents),
        footer: NAV_FOOTER
      }
    );
  }
  function Topbar({ user, onToast }) {
    return /* @__PURE__ */ React.createElement("header", { className: "topbar" }, /* @__PURE__ */ React.createElement("div", { className: "topbar__search" }, /* @__PURE__ */ React.createElement(Input, { variant: "filled", iconLeft: "search", placeholder: "Search...", shortcut: ["F", "\u2318"] })), /* @__PURE__ */ React.createElement("span", { style: { flex: 1 } }), /* @__PURE__ */ React.createElement(IconButton, { icon: "bell", variant: "outline", label: "Notifications", onClick: () => onToast({ tone: "info", title: "No new notifications", description: "You\u2019re all caught up." }) }), /* @__PURE__ */ React.createElement("span", { className: "topbar__sep" }), /* @__PURE__ */ React.createElement("button", { type: "button", className: "topbar__user" }, /* @__PURE__ */ React.createElement(Avatar, { name: user.name, size: 36 }), /* @__PURE__ */ React.createElement("span", null, user.handle), /* @__PURE__ */ React.createElement(Icon, { name: "chevron-down", size: 14 })));
  }
  function MobileHeader({ onMenu }) {
    return /* @__PURE__ */ React.createElement("header", { className: "mhead" }, /* @__PURE__ */ React.createElement("span", { className: "pb-wordmark", style: { fontSize: 24 } }, "ProspectBoost"), /* @__PURE__ */ React.createElement(IconButton, { icon: "menu", variant: "soft", size: "lg", label: "Open menu", onClick: onMenu }));
  }
  function Drawer({ open, onClose, children }) {
    if (!open) return null;
    return /* @__PURE__ */ React.createElement("div", { className: "drawer", onClick: onClose }, /* @__PURE__ */ React.createElement("div", { onClick: (e) => e.stopPropagation(), style: { height: "100%" } }, children));
  }
  function PageHead({ title, sub, children }) {
    return /* @__PURE__ */ React.createElement("div", { className: "page-head" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "page-title" }, title), sub && /* @__PURE__ */ React.createElement("p", { className: "page-sub" }, sub)), children && /* @__PURE__ */ React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" } }, children));
  }
  Object.assign(window, { AppSidebar, Topbar, MobileHeader, Drawer, PageHead });
})();

(() => {
  const { FilterTabs, ArtifactCard, Input, Dialog, Button } = window.ProspectBoostDesignSystem_668922;
  const PREVIEW = {
    doc: "# Acme Corp \u2014 account brief\n\n## Snapshot\n- B2B SaaS \xB7 320 employees \xB7 S\xE3o Paulo + Austin\n- Raised Series B (Aug) \xB7 hiring 6 AEs\n\n## Buying committee\n- VP Sales \u2014 Marina Lopes (champion)\n- RevOps Lead \u2014 Diego Faria",
    sheet: "company            employees  score  owner\nAcme Corp          320        92     Ana\nNorthwind Labs     140        88     Leo\nBlue Harbor        610        81     Ana\nPixelForge         75         77     Rui",
    sequence: "Step 1 \xB7 Day 0   Email \u2014 \u201CQuick idea for {{company}}\u201D\nStep 2 \xB7 Day 2   LinkedIn \u2014 connect + note\nStep 3 \xB7 Day 5   Email \u2014 case study follow-up\nStep 4 \xB7 Day 9   Email \u2014 break-up"
  };
  function ArtifactsScreen({ data, onToast }) {
    const [kind, setKind] = React.useState(null);
    const [q, setQ] = React.useState("");
    const [open, setOpen] = React.useState(null);
    const count = (k) => data.artifacts.filter((a) => a.kind === k).length;
    const items = data.artifacts.filter((a) => (!kind || kind === "week" || a.kind === kind) && a.title.toLowerCase().includes(q.toLowerCase()));
    return /* @__PURE__ */ React.createElement("div", { className: "content" }, /* @__PURE__ */ React.createElement(PageHead, { title: "Artifacts", sub: "Documents, sheets, and sequences your agents have produced" }, /* @__PURE__ */ React.createElement("div", { style: { width: 240 } }, /* @__PURE__ */ React.createElement(Input, { variant: "filled", iconLeft: "search", placeholder: "Filter files...", value: q, onChange: (e) => setQ(e.target.value) }))), /* @__PURE__ */ React.createElement("div", { style: { marginBottom: 10 } }, /* @__PURE__ */ React.createElement(FilterTabs, { value: kind, onChange: setKind, items: [
      { value: "doc", label: "Docs", status: "doc", count: count("doc") },
      { value: "sheet", label: "Sheets", status: "sheet", count: count("sheet") },
      { value: "sequence", label: "Sequences", status: "sequence", count: count("sequence") },
      { value: "week", label: "Total this week", status: "other", count: data.artifacts.length }
    ] })), /* @__PURE__ */ React.createElement("div", { className: "art-grid" }, items.map((a) => /* @__PURE__ */ React.createElement(
      ArtifactCard,
      {
        key: a.id,
        kind: a.kind,
        title: a.title,
        meta: a.meta,
        onOpen: () => setOpen(a),
        onMenu: () => onToast({ tone: "neutral", title: a.title, description: "Rename \xB7 Duplicate \xB7 Delete" })
      }
    ))), items.length === 0 && /* @__PURE__ */ React.createElement("p", { className: "page-sub", style: { padding: 24, textAlign: "center" } }, "No files match \u201C", q, "\u201D."), /* @__PURE__ */ React.createElement(
      Dialog,
      {
        open: !!open,
        title: open && open.title,
        description: open && open.meta,
        onClose: () => setOpen(null),
        width: 560,
        footer: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Button, { variant: "secondary", iconLeft: "download", onClick: () => onToast({ tone: "success", title: "Downloaded", description: open.title }) }, "Download"), /* @__PURE__ */ React.createElement(Button, { onClick: () => setOpen(null) }, "Done"))
      },
      open && /* @__PURE__ */ React.createElement("div", { className: "md" }, PREVIEW[open.kind])
    ));
  }
  function PlaceholderScreen({ label }) {
    return /* @__PURE__ */ React.createElement("div", { className: "content" }, /* @__PURE__ */ React.createElement(PageHead, { title: label }), /* @__PURE__ */ React.createElement("div", { style: { display: "grid", placeItems: "center", minHeight: 320, border: "1px dashed var(--border-dashed)", borderRadius: 16, background: "var(--bg-subtle)", textAlign: "center", padding: 24 } }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { style: { font: "var(--type-panel-title)", color: "var(--text-primary)" } }, "Not in the reference designs"), /* @__PURE__ */ React.createElement("p", { className: "page-sub", style: { maxWidth: 360 } }, "This view appears in the navigation but wasn\u2019t shown in the source screens, so it\u2019s intentionally left blank."))));
  }
  Object.assign(window, { ArtifactsScreen, PlaceholderScreen });
})();

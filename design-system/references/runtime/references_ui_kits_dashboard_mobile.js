(() => {
  function Phone({ nav }) {
    return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(IOSDevice, null, /* @__PURE__ */ React.createElement("iframe", { src: "index.html", title: "ProspectBoost mobile " + nav, style: { border: 0, width: "100%", height: "100%", display: "block", paddingTop: 54, boxSizing: "border-box", background: "#fff" } })), /* @__PURE__ */ React.createElement("div", { className: "cap" }, "Live app at 402px \u2014 tap the menu to navigate"));
  }
  ReactDOM.createRoot(document.getElementById("root")).render(/* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Phone, { nav: "home" })));
})();

var ProspectBoostDesignSystem_668922 = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // global:react
  var require_react = __commonJS({
    "global:react"(exports, module) {
      module.exports = window.React;
    }
  });

  // design-system/index.js
  var index_exports = {};
  __export(index_exports, {
    ActionRow: () => ActionRow,
    ActivityCard: () => ActivityCard,
    ArtifactCard: () => ArtifactCard,
    Avatar: () => Avatar,
    Badge: () => Badge,
    Button: () => Button,
    Card: () => Card,
    Checkbox: () => Checkbox,
    Composer: () => Composer,
    Count: () => Count,
    DataTable: () => DataTable,
    Dialog: () => Dialog,
    Eyebrow: () => Eyebrow,
    FilterTabs: () => FilterTabs,
    Icon: () => Icon,
    IconButton: () => IconButton,
    IconChip: () => IconChip,
    Input: () => Input,
    Inset: () => Inset,
    KanbanColumn: () => KanbanColumn,
    Kbd: () => Kbd,
    Menu: () => Menu,
    MenuTrigger: () => MenuTrigger,
    MetricCard: () => MetricCard,
    MiniChart: () => MiniChart,
    NavItem: () => NavItem,
    ProgressCard: () => ProgressCard,
    Radio: () => Radio,
    SegmentBar: () => SegmentBar,
    Select: () => Select,
    Sidebar: () => Sidebar,
    StatusDot: () => StatusDot,
    Switch: () => Switch,
    Tabs: () => Tabs,
    TaskCard: () => TaskCard,
    Textarea: () => Textarea,
    Toast: () => Toast,
    Tooltip: () => Tooltip
  });

  // design-system/components/core/Avatar.jsx
  var import_react = __toESM(require_react(), 1);
  function Avatar({ src, name = "", size = 36, round = false, className = "", style, ...rest }) {
    const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toUpperCase()).join("");
    return /* @__PURE__ */ import_react.default.createElement(
      "span",
      {
        className: ["pb-avatar", round && "pb-avatar--round", className].filter(Boolean).join(" "),
        style: { width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.36)), ...style },
        title: name,
        ...rest
      },
      src ? /* @__PURE__ */ import_react.default.createElement("img", { src, alt: name }) : initials
    );
  }

  // design-system/components/core/Badge.jsx
  var import_react3 = __toESM(require_react(), 1);

  // design-system/components/core/Icon.jsx
  var import_react2 = __toESM(require_react(), 1);

  // design-system/components/core/icons.js
  var ICONS = { "house": '<path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />', "asterisk": '<path d="M12 6v12" /><path d="M17.196 9 6.804 15" /><path d="m6.804 9 10.392 6" />', "sparkles": '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" /><path d="M20 3v4" /><path d="M22 5h-4" /><path d="M4 17v2" /><path d="M5 18H3" />', "user-search": '<circle cx="10" cy="7" r="4" /><path d="M10.3 15H7a4 4 0 0 0-4 4v2" /><circle cx="17" cy="17" r="3" /><path d="m21 21-1.9-1.9" />', "phone-outgoing": '<polyline points="22 8 22 2 16 2" /><line x1="16" x2="22" y1="8" y2="2" /><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />', "clock": '<circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />', "ticket": '<path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" /><path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />', "lightbulb": '<path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" /><path d="M9 18h6" /><path d="M10 22h4" />', "zap": '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />', "plug": '<path d="M12 22v-5" /><path d="M9 8V2" /><path d="M15 8V2" /><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z" />', "blocks": '<rect width="7" height="7" x="14" y="3" rx="1" /><path d="M10 21V8a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1H3" />', "file-stack": '<path d="M21 7h-3a2 2 0 0 1-2-2V2" /><path d="M21 6v6.5c0 .8-.7 1.5-1.5 1.5h-7c-.8 0-1.5-.7-1.5-1.5v-9c0-.8.7-1.5 1.5-1.5H17Z" /><path d="M7 8v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H15" /><path d="M3 12v8.8c0 .3.2.6.4.8.2.2.5.4.8.4H11" />', "notebook-pen": '<path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4" /><path d="M2 6h4" /><path d="M2 10h4" /><path d="M2 14h4" /><path d="M2 18h4" /><path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />', "search": '<circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" />', "bell": '<path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />', "plus": '<path d="M5 12h14" /><path d="M12 5v14" />', "minus": '<path d="M5 12h14" />', "ellipsis-vertical": '<circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" />', "ellipsis": '<circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />', "arrow-up-right": '<path d="M7 7h10v10" /><path d="M7 17 17 7" />', "arrow-right": '<path d="M5 12h14" /><path d="m12 5 7 7-7 7" />', "arrow-left": '<path d="m12 19-7-7 7-7" /><path d="M19 12H5" />', "settings": '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" />', "circle-help": '<circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />', "chevron-down": '<path d="m6 9 6 6 6-6" />', "chevron-up": '<path d="m18 15-6-6-6 6" />', "chevron-right": '<path d="m9 18 6-6-6-6" />', "chevron-left": '<path d="m15 18-6-6 6-6" />', "panel-left-close": '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m16 15-3-3 3-3" />', "panel-left-open": '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="m14 9 3 3-3 3" />', "user-plus": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" />', "user": '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />', "users": '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />', "mic": '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />', "send": '<path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" />', "waypoints": '<circle cx="12" cy="4.5" r="2.5" /><path d="m10.2 6.3-3.9 3.9" /><circle cx="4.5" cy="12" r="2.5" /><path d="M7 12h10" /><circle cx="19.5" cy="12" r="2.5" /><path d="m13.8 17.7 3.9-3.9" /><circle cx="12" cy="19.5" r="2.5" />', "calendar": '<path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" />', "calendar-clock": '<path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5" /><path d="M16 2v4" /><path d="M8 2v4" /><path d="M3 10h5" /><path d="M17.5 17.5 16 16.3V14" /><circle cx="16" cy="16" r="6" />', "rotate-ccw": '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />', "circle-check": '<circle cx="12" cy="12" r="10" /><path d="m9 12 2 2 4-4" />', "circle-x": '<circle cx="12" cy="12" r="10" /><path d="m15 9-6 6" /><path d="m9 9 6 6" />', "circle-alert": '<circle cx="12" cy="12" r="10" /><line x1="12" x2="12" y1="8" y2="12" /><line x1="12" x2="12.01" y1="16" y2="16" />', "triangle-alert": '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" /><path d="M12 9v4" /><path d="M12 17h.01" />', "info": '<circle cx="12" cy="12" r="10" /><path d="M12 16v-4" /><path d="M12 8h.01" />', "check": '<path d="M20 6 9 17l-5-5" />', "x": '<path d="M18 6 6 18" /><path d="m6 6 12 12" />', "message-circle": '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />', "menu": '<line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" />', "filter": '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />', "download": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" x2="12" y1="15" y2="3" />', "upload": '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" x2="12" y1="3" y2="15" />', "list": '<path d="M3 12h.01" /><path d="M3 18h.01" /><path d="M3 6h.01" /><path d="M8 12h13" /><path d="M8 18h13" /><path d="M8 6h13" />', "columns-3": '<rect width="18" height="18" x="3" y="3" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" />', "layout-grid": '<rect width="7" height="7" x="3" y="3" rx="1" /><rect width="7" height="7" x="14" y="3" rx="1" /><rect width="7" height="7" x="14" y="14" rx="1" /><rect width="7" height="7" x="3" y="14" rx="1" />', "mail": '<rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />', "target": '<circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />', "trending-up": '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17" /><polyline points="16 7 22 7 22 13" />', "trending-down": '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7" /><polyline points="16 17 22 17 22 11" />', "building-2": '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" /><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />', "file-text": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M10 9H8" /><path d="M16 13H8" /><path d="M16 17H8" />', "file-spreadsheet": '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" /><path d="M14 2v4a2 2 0 0 0 2 2h4" /><path d="M8 13h2" /><path d="M14 13h2" /><path d="M8 17h2" /><path d="M14 17h2" />', "folder": '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />', "copy": '<rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />', "trash-2": '<path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" />', "pencil": '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" />', "eye": '<path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" /><circle cx="12" cy="12" r="3" />', "sliders-horizontal": '<line x1="21" x2="14" y1="4" y2="4" /><line x1="10" x2="3" y1="4" y2="4" /><line x1="21" x2="12" y1="12" y2="12" /><line x1="8" x2="3" y1="12" y2="12" /><line x1="21" x2="16" y1="20" y2="20" /><line x1="12" x2="3" y1="20" y2="20" /><line x1="14" x2="14" y1="2" y2="6" /><line x1="8" x2="8" y1="10" y2="14" /><line x1="16" x2="16" y1="18" y2="22" />', "play": '<polygon points="6 3 20 12 6 21 6 3" />', "pause": '<rect x="14" y="4" width="4" height="16" rx="1" /><rect x="6" y="4" width="4" height="16" rx="1" />', "inbox": '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12" /><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />', "globe": '<circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" />', "phone": '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />', "star": '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z" />', "log-out": '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" />', "link": '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />', "rocket": '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />', "refresh-cw": '<path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" /><path d="M21 3v5h-5" /><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" /><path d="M8 16H3v5" />', "external-link": '<path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />', "paperclip": '<path d="M13.234 20.252 21 12.3" /><path d="m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486" />', "bot": '<path d="M12 8V4H8" /><rect width="16" height="12" x="4" y="8" rx="2" /><path d="M2 14h2" /><path d="M20 14h2" /><path d="M15 13v2" /><path d="M9 13v2" />', "briefcase": '<path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /><rect width="20" height="14" x="2" y="6" rx="2" />', "chart-column": '<path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="M18 17V9" /><path d="M13 17V5" /><path d="M8 17v-3" />', "layers": '<path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z" /><path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12" /><path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17" />', "list-filter": '<path d="M3 6h18" /><path d="M7 12h10" /><path d="M10 18h4" />', "moon": '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />', "sun": '<circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" />', "square-pen": '<path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />', "share-2": '<circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" x2="15.42" y1="13.51" y2="17.49" /><line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />' };

  // design-system/components/core/Icon.jsx
  function Icon({ name, size = 16, strokeWidth = 1.5, color = "currentColor", className = "", style, title, ...rest }) {
    const inner = ICONS[name] || "";
    return /* @__PURE__ */ import_react2.default.createElement(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: color,
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        className: ("pb-icon " + className).trim(),
        style: { flexShrink: 0, ...style },
        role: title ? "img" : void 0,
        "aria-label": title,
        "aria-hidden": title ? void 0 : true,
        dangerouslySetInnerHTML: { __html: inner },
        ...rest
      }
    );
  }

  // design-system/components/core/Badge.jsx
  function Badge({ tone = "neutral", size = "md", dot = false, icon, className = "", children, ...rest }) {
    const cls = ["pb-badge", "pb-badge--" + tone, size === "sm" && "pb-badge--sm", className].filter(Boolean).join(" ");
    return /* @__PURE__ */ import_react3.default.createElement("span", { className: cls, ...rest }, dot && /* @__PURE__ */ import_react3.default.createElement("span", { className: "pb-badge__dot" }), icon && /* @__PURE__ */ import_react3.default.createElement(Icon, { name: icon, size: 12 }), children);
  }
  function Count({ className = "", children, ...rest }) {
    return /* @__PURE__ */ import_react3.default.createElement("span", { className: ("pb-badge pb-badge--count " + className).trim(), ...rest }, children);
  }

  // design-system/components/core/Button.jsx
  var import_react4 = __toESM(require_react(), 1);
  function Button({ variant = "primary", size = "md", iconLeft, iconRight, block = false, as, href, className = "", children, type = "button", ...rest }) {
    const cls = ["pb-btn", "pb-btn--" + variant, size !== "md" && "pb-btn--" + size, block && "pb-btn--block", className].filter(Boolean).join(" ");
    const is = size === "sm" ? 14 : size === "lg" ? 18 : 16;
    const content = /* @__PURE__ */ import_react4.default.createElement(import_react4.default.Fragment, null, iconLeft && /* @__PURE__ */ import_react4.default.createElement(Icon, { name: iconLeft, size: is }), children, iconRight && /* @__PURE__ */ import_react4.default.createElement(Icon, { name: iconRight, size: is }));
    if (href || as === "a") return /* @__PURE__ */ import_react4.default.createElement("a", { className: cls, href, ...rest }, content);
    return /* @__PURE__ */ import_react4.default.createElement("button", { type, className: cls, ...rest }, content);
  }

  // design-system/components/core/Card.jsx
  var import_react5 = __toESM(require_react(), 1);
  function Card({ variant = "outline", title, subtitle, action, onAction, headerRight, padding, className = "", style, children, ...rest }) {
    const cls = ["pb-card", variant !== "outline" && "pb-card--" + variant, className].filter(Boolean).join(" ");
    const hasHead = title || action || headerRight;
    return /* @__PURE__ */ import_react5.default.createElement("section", { className: cls, style: { padding, ...style }, ...rest }, hasHead && /* @__PURE__ */ import_react5.default.createElement("header", { className: "pb-card__head" }, /* @__PURE__ */ import_react5.default.createElement("div", { style: { minWidth: 0 } }, title && /* @__PURE__ */ import_react5.default.createElement("h3", { className: "pb-card__title" }, title), subtitle && /* @__PURE__ */ import_react5.default.createElement("p", { className: "pb-card__sub" }, subtitle)), headerRight || action && /* @__PURE__ */ import_react5.default.createElement("button", { type: "button", className: "pb-card__action", onClick: onAction }, action)), children);
  }
  function Inset({ className = "", children, ...rest }) {
    return /* @__PURE__ */ import_react5.default.createElement("div", { className: ("pb-inset " + className).trim(), ...rest }, children);
  }

  // design-system/components/core/Eyebrow.jsx
  var import_react6 = __toESM(require_react(), 1);
  function Eyebrow({ className = "", children, ...rest }) {
    return /* @__PURE__ */ import_react6.default.createElement("span", { className: ("pb-eyebrow " + className).trim(), ...rest }, /* @__PURE__ */ import_react6.default.createElement("i", null), /* @__PURE__ */ import_react6.default.createElement("i", null), /* @__PURE__ */ import_react6.default.createElement("i", null), /* @__PURE__ */ import_react6.default.createElement("i", null), children);
  }

  // design-system/components/core/IconButton.jsx
  var import_react7 = __toESM(require_react(), 1);
  function IconButton({ icon, label, variant = "ghost", size = "md", iconSize, className = "", type = "button", children, ...rest }) {
    const cls = ["pb-iconbtn", "pb-iconbtn--" + variant, size !== "md" && "pb-iconbtn--" + size, className].filter(Boolean).join(" ");
    const is = iconSize || (size === "sm" ? 14 : size === "lg" ? 18 : 16);
    return /* @__PURE__ */ import_react7.default.createElement("button", { type, className: cls, "aria-label": label, title: label, ...rest }, icon ? /* @__PURE__ */ import_react7.default.createElement(Icon, { name: icon, size: is }) : children);
  }

  // design-system/components/core/IconChip.jsx
  var import_react8 = __toESM(require_react(), 1);
  function IconChip({ icon, letter, color, size = 32, iconSize, className = "", style, ...rest }) {
    if (letter) {
      const s = size === 32 ? 18 : size;
      return /* @__PURE__ */ import_react8.default.createElement(
        "span",
        {
          className: ("pb-chip pb-chip--letter " + className).trim(),
          style: { width: s, height: s, background: color || "var(--pb-gray-700)", ...style },
          ...rest
        },
        letter
      );
    }
    return /* @__PURE__ */ import_react8.default.createElement("span", { className: ("pb-chip " + className).trim(), style: { width: size, height: size, color, ...style }, ...rest }, /* @__PURE__ */ import_react8.default.createElement(Icon, { name: icon, size: iconSize || Math.round(size / 2) }));
  }

  // design-system/components/core/Kbd.jsx
  var import_react9 = __toESM(require_react(), 1);
  function Kbd({ keys = [], className = "", children, ...rest }) {
    return /* @__PURE__ */ import_react9.default.createElement("kbd", { className: ("pb-kbd " + className).trim(), ...rest }, children || keys.map((k, i) => /* @__PURE__ */ import_react9.default.createElement("span", { key: i }, k)));
  }

  // design-system/components/core/StatusDot.jsx
  var import_react10 = __toESM(require_react(), 1);
  var STATUS_COLORS = {
    queued: "var(--status-queued)",
    running: "var(--status-running)",
    success: "var(--status-done)",
    failed: "var(--status-failed)",
    doc: "var(--status-queued)",
    sheet: "var(--status-done)",
    sequence: "var(--status-running)",
    other: "var(--pb-purple-500)"
  };
  function StatusDot({ status = "queued", color, size = 12, className = "", style, ...rest }) {
    return /* @__PURE__ */ import_react10.default.createElement(
      "span",
      {
        className: ("pb-status " + className).trim(),
        "aria-hidden": "true",
        style: { width: size, height: size, background: color || STATUS_COLORS[status] || status, ...style },
        ...rest
      }
    );
  }

  // design-system/components/data/ActionRow.jsx
  var import_react11 = __toESM(require_react(), 1);
  function ActionRow({ icon, leading, title, subtitle, trailing = "arrow", muted = false, onClick, href, className = "", ...rest }) {
    const cls = ["pb-row", muted && "pb-row--muted", className].filter(Boolean).join(" ");
    const trail = trailing === "arrow" ? /* @__PURE__ */ import_react11.default.createElement(Icon, { name: "arrow-up-right", size: 16 }) : trailing === "menu" ? /* @__PURE__ */ import_react11.default.createElement(Icon, { name: "ellipsis-vertical", size: 16 }) : trailing === "check" ? /* @__PURE__ */ import_react11.default.createElement(Icon, { name: "circle-check", size: 14 }) : trailing === "chevron" ? /* @__PURE__ */ import_react11.default.createElement(Icon, { name: "chevron-right", size: 16 }) : trailing;
    const inner = /* @__PURE__ */ import_react11.default.createElement(import_react11.default.Fragment, null, leading || icon && /* @__PURE__ */ import_react11.default.createElement(IconChip, { icon }), /* @__PURE__ */ import_react11.default.createElement("span", { className: "pb-row__text" }, /* @__PURE__ */ import_react11.default.createElement("span", { className: "pb-row__title" }, title), subtitle && /* @__PURE__ */ import_react11.default.createElement("span", { className: "pb-row__sub" }, subtitle)), trail && /* @__PURE__ */ import_react11.default.createElement("span", { className: "pb-row__trail" }, trail));
    if (href) return /* @__PURE__ */ import_react11.default.createElement("a", { className: cls, href, ...rest }, inner);
    if (onClick) return /* @__PURE__ */ import_react11.default.createElement("button", { type: "button", className: cls, onClick, ...rest }, inner);
    return /* @__PURE__ */ import_react11.default.createElement("div", { className: cls, ...rest }, inner);
  }

  // design-system/components/data/ActivityCard.jsx
  var import_react12 = __toESM(require_react(), 1);
  function ActivityCard({ icon = "sparkles", title, time, onMenu, onClick, className = "", ...rest }) {
    return /* @__PURE__ */ import_react12.default.createElement("article", { className: ("pb-activity " + className).trim(), onClick, style: onClick ? { cursor: "pointer" } : void 0, ...rest }, /* @__PURE__ */ import_react12.default.createElement("div", { className: "pb-activity__top" }, /* @__PURE__ */ import_react12.default.createElement(IconChip, { icon }), /* @__PURE__ */ import_react12.default.createElement(IconButton, { icon: "ellipsis-vertical", size: "sm", label: "More", onClick: (e) => {
      e.stopPropagation();
      onMenu && onMenu(e);
    } })), /* @__PURE__ */ import_react12.default.createElement("div", { className: "pb-activity__body" }, /* @__PURE__ */ import_react12.default.createElement("p", { className: "pb-activity__title" }, title), time && /* @__PURE__ */ import_react12.default.createElement("div", { className: "pb-activity__time" }, time)));
  }

  // design-system/components/data/ArtifactCard.jsx
  var import_react13 = __toESM(require_react(), 1);
  var KIND = {
    doc: { label: "Doc", color: "var(--pb-azure-500)", icon: "file-text" },
    sheet: { label: "Sheet", color: "var(--pb-green-600)", icon: "file-spreadsheet" },
    sequence: { label: "Sequence", color: "var(--pb-orange-600)", icon: "mail" },
    list: { label: "List", color: "var(--pb-purple-600)", icon: "users" }
  };
  function ArtifactCard({ kind = "doc", title, meta, onOpen, onMenu, className = "", ...rest }) {
    const k = KIND[kind] || KIND.doc;
    return /* @__PURE__ */ import_react13.default.createElement("article", { className: ("pb-artifact " + className).trim(), ...rest }, /* @__PURE__ */ import_react13.default.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "2px 2px 0 4px" } }, /* @__PURE__ */ import_react13.default.createElement("span", { className: "pb-artifact__type", style: { color: k.color } }, k.label), /* @__PURE__ */ import_react13.default.createElement(IconButton, { icon: "ellipsis-vertical", size: "sm", label: "More", onClick: onMenu })), /* @__PURE__ */ import_react13.default.createElement("div", { className: "pb-artifact__file" }, /* @__PURE__ */ import_react13.default.createElement(IconChip, { icon: k.icon }), /* @__PURE__ */ import_react13.default.createElement("div", { style: { minWidth: 0 } }, /* @__PURE__ */ import_react13.default.createElement("div", { style: { font: "var(--type-body)", color: "var(--text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, title), meta && /* @__PURE__ */ import_react13.default.createElement("div", { style: { font: "var(--type-label)", color: "var(--text-tertiary)", marginTop: 2 } }, meta))), /* @__PURE__ */ import_react13.default.createElement(Button, { variant: "soft", block: true, onClick: onOpen }, "Open"));
  }

  // design-system/components/data/DataTable.jsx
  var import_react14 = __toESM(require_react(), 1);
  function DataTable({ columns = [], rows = [], rowKey = "id", onRowClick, minWidth = 520, className = "", ...rest }) {
    const cols = columns.map((c) => c.width || "minmax(0,1fr)").join(" ");
    const align = (a) => a === "right" ? "flex-end" : a === "center" ? "center" : "flex-start";
    return /* @__PURE__ */ import_react14.default.createElement("div", { className: ("pb-table " + className).trim(), ...rest }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "pb-table__grid", style: { "--cols": cols, minWidth }, role: "table" }, /* @__PURE__ */ import_react14.default.createElement("div", { className: "pb-table__head", role: "row" }, columns.map((c) => /* @__PURE__ */ import_react14.default.createElement("div", { key: c.key, role: "columnheader", style: { textAlign: c.align || "left" } }, c.label))), rows.map((r, i) => /* @__PURE__ */ import_react14.default.createElement(
      "div",
      {
        key: r[rowKey] != null ? r[rowKey] : i,
        role: "row",
        className: "pb-table__row" + (onRowClick ? " pb-table__row--click" : ""),
        onClick: onRowClick ? () => onRowClick(r) : void 0
      },
      columns.map((c) => /* @__PURE__ */ import_react14.default.createElement("div", { key: c.key, role: "cell", className: "pb-table__cell", style: { justifyContent: align(c.align) } }, c.render ? c.render(r) : r[c.key]))
    ))));
  }

  // design-system/components/data/KanbanColumn.jsx
  var import_react15 = __toESM(require_react(), 1);
  function KanbanColumn({ status = "queued", title, count, onAdd, className = "", children, ...rest }) {
    return /* @__PURE__ */ import_react15.default.createElement("section", { className: ("pb-kcol " + className).trim(), ...rest }, /* @__PURE__ */ import_react15.default.createElement("header", { className: "pb-kcol__head" }, /* @__PURE__ */ import_react15.default.createElement(StatusDot, { status, size: 14 }), /* @__PURE__ */ import_react15.default.createElement("span", null, title), count != null && /* @__PURE__ */ import_react15.default.createElement(Count, null, count), /* @__PURE__ */ import_react15.default.createElement("span", { style: { flex: 1 } }), /* @__PURE__ */ import_react15.default.createElement(IconButton, { icon: "plus", size: "sm", label: "Add to " + title, onClick: onAdd })), children);
  }

  // design-system/components/data/MetricCard.jsx
  var import_react16 = __toESM(require_react(), 1);
  var TONES = { green: "var(--status-success)", red: "var(--status-danger)", orange: "var(--status-warning)", blue: "var(--status-info)", neutral: "var(--text-secondary)" };
  var TEXT = { green: "var(--status-success-text)", red: "var(--status-danger)", orange: "var(--status-warning)", blue: "var(--status-success-text)", neutral: "var(--text-tertiary)" };
  function MiniChart({ levels = [0.45, 1, 0.5], highlight = 1, tone = "blue", color }) {
    const c = color || TONES[tone] || tone;
    return /* @__PURE__ */ import_react16.default.createElement("div", { className: "pb-minichart", "aria-hidden": "true" }, levels.map((lv, i) => /* @__PURE__ */ import_react16.default.createElement("div", { className: "pb-minichart__slot", key: i }, i === highlight ? /* @__PURE__ */ import_react16.default.createElement("div", { className: "pb-minichart__bar", style: { height: Math.round(lv * 100) + "%", background: c } }) : /* @__PURE__ */ import_react16.default.createElement("div", { className: "pb-minichart__line", style: { bottom: Math.round(lv * 100) + "%", background: c } }))));
  }
  function MetricCard({ label, value, delta, tone = "green", deltaTone, chart = {}, className = "", ...rest }) {
    return /* @__PURE__ */ import_react16.default.createElement("div", { className: ("pb-metric " + className).trim(), ...rest }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "pb-metric__label" }, label), /* @__PURE__ */ import_react16.default.createElement("div", { className: "pb-metric__body" }, /* @__PURE__ */ import_react16.default.createElement("div", { style: { display: "flex", flexDirection: "column", justifyContent: "space-between", minWidth: 0 } }, /* @__PURE__ */ import_react16.default.createElement("div", { className: "pb-metric__value" }, value), delta && /* @__PURE__ */ import_react16.default.createElement("div", { className: "pb-metric__delta", style: { color: TEXT[deltaTone || tone] } }, delta)), /* @__PURE__ */ import_react16.default.createElement(MiniChart, { tone, ...chart })));
  }

  // design-system/components/data/ProgressCard.jsx
  var import_react18 = __toESM(require_react(), 1);

  // design-system/components/data/SegmentBar.jsx
  var import_react17 = __toESM(require_react(), 1);
  function SegmentBar({ value = 0, segments = 10, color = "var(--chart-1)", track = "var(--chart-track)", height = 14, width = 4, gap = 2, radius = 1, fluid = false, className = "", style, ...rest }) {
    const filled = Math.round(Math.max(0, Math.min(100, value)) / 100 * segments);
    return /* @__PURE__ */ import_react17.default.createElement("span", { className: ("pb-seg " + className).trim(), style: { gap, ...fluid ? { display: "flex", width: "100%" } : null, ...style }, role: "meter", "aria-valuenow": value, "aria-valuemin": 0, "aria-valuemax": 100, ...rest }, Array.from({ length: segments }, (_, i) => /* @__PURE__ */ import_react17.default.createElement("span", { key: i, style: { width: fluid ? void 0 : width, flex: fluid ? "1 1 0" : void 0, minWidth: fluid ? 2 : void 0, height, borderRadius: radius, background: i < filled ? color : track } })));
  }

  // design-system/components/data/ProgressCard.jsx
  function ProgressCard({ title = "Today task", label = "Progress", value = 70, segments = 40, onAdd, className = "", ...rest }) {
    return /* @__PURE__ */ import_react18.default.createElement("div", { className: ("pb-progress " + className).trim(), ...rest }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "pb-progress__rim" }, /* @__PURE__ */ import_react18.default.createElement("div", { className: "pb-progress__inner" }, /* @__PURE__ */ import_react18.default.createElement("div", { style: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 } }, /* @__PURE__ */ import_react18.default.createElement("h3", { className: "pb-progress__title" }, title), /* @__PURE__ */ import_react18.default.createElement(IconButton, { icon: "plus", variant: "outline", label: "Add task", onClick: onAdd })), /* @__PURE__ */ import_react18.default.createElement("div", { style: { display: "flex", justifyContent: "space-between", marginTop: 24, font: "var(--type-meta)", color: "var(--text-secondary)" } }, /* @__PURE__ */ import_react18.default.createElement("span", null, label), /* @__PURE__ */ import_react18.default.createElement("span", null, value, "%")), /* @__PURE__ */ import_react18.default.createElement("div", { style: { marginTop: 8 } }, /* @__PURE__ */ import_react18.default.createElement(SegmentBar, { fluid: true, value, segments, color: "var(--pb-gray-900)", track: "rgba(255,255,255,.75)", height: 24, gap: 3 })))));
  }

  // design-system/components/data/TaskCard.jsx
  var import_react19 = __toESM(require_react(), 1);
  function TaskCard({ trigger, title, tags = [], when, id, onClick, className = "", ...rest }) {
    return /* @__PURE__ */ import_react19.default.createElement("article", { className: ["pb-task", onClick && "pb-task--click", className].filter(Boolean).join(" "), onClick, ...rest }, trigger && /* @__PURE__ */ import_react19.default.createElement("div", { className: "pb-task__trigger" }, "Trigger: ", trigger), /* @__PURE__ */ import_react19.default.createElement("h4", { className: "pb-task__title" }, title), tags.length > 0 && /* @__PURE__ */ import_react19.default.createElement("div", { className: "pb-task__tags" }, tags.map((t, i) => {
      const tg = typeof t === "string" ? { label: t } : t;
      return /* @__PURE__ */ import_react19.default.createElement(Badge, { key: i, tone: tg.tone || "neutral" }, tg.label);
    })), (when || id) && /* @__PURE__ */ import_react19.default.createElement("div", { className: "pb-task__foot" }, /* @__PURE__ */ import_react19.default.createElement("span", { style: { display: "inline-flex", alignItems: "center", gap: 6 } }, /* @__PURE__ */ import_react19.default.createElement(Icon, { name: "clock", size: 14 }), when), id && /* @__PURE__ */ import_react19.default.createElement("span", { className: "pb-task__id" }, id)));
  }

  // design-system/components/feedback/Dialog.jsx
  var import_react20 = __toESM(require_react(), 1);
  function Dialog({ open = true, title, description, onClose, footer, width = 440, inline = false, className = "", children, ...rest }) {
    import_react20.default.useEffect(() => {
      if (!open || !onClose) return;
      const k = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", k);
      return () => window.removeEventListener("keydown", k);
    }, [open, onClose]);
    if (!open) return null;
    const panel = /* @__PURE__ */ import_react20.default.createElement(
      "div",
      {
        role: "dialog",
        "aria-modal": !inline,
        "aria-label": title,
        className: ("pb-dialog " + className).trim(),
        style: { maxWidth: width },
        onClick: (e) => e.stopPropagation(),
        ...rest
      },
      /* @__PURE__ */ import_react20.default.createElement("div", { className: "pb-dialog__head" }, /* @__PURE__ */ import_react20.default.createElement("div", null, title && /* @__PURE__ */ import_react20.default.createElement("h2", { className: "pb-dialog__title" }, title), description && /* @__PURE__ */ import_react20.default.createElement("p", { className: "pb-dialog__desc" }, description)), onClose && /* @__PURE__ */ import_react20.default.createElement(IconButton, { icon: "x", size: "sm", label: "Close", onClick: onClose })),
      children && /* @__PURE__ */ import_react20.default.createElement("div", { className: "pb-dialog__body" }, children),
      footer && /* @__PURE__ */ import_react20.default.createElement("div", { className: "pb-dialog__foot" }, footer)
    );
    if (inline) return panel;
    return /* @__PURE__ */ import_react20.default.createElement("div", { className: "pb-overlay", onClick: onClose }, panel);
  }

  // design-system/components/feedback/Menu.jsx
  var import_react21 = __toESM(require_react(), 1);
  function Menu({ label, items = [], onSelect, className = "", style, ...rest }) {
    return /* @__PURE__ */ import_react21.default.createElement("div", { role: "menu", className: ("pb-menu " + className).trim(), style, ...rest }, label && /* @__PURE__ */ import_react21.default.createElement("div", { className: "pb-menu__label" }, label), items.map((it, i) => it === "-" || it.separator ? /* @__PURE__ */ import_react21.default.createElement("div", { key: i, className: "pb-menu__sep", role: "separator" }) : /* @__PURE__ */ import_react21.default.createElement(
      "button",
      {
        key: it.value || it.label,
        type: "button",
        role: "menuitem",
        className: "pb-menu__item" + (it.danger ? " pb-menu__item--danger" : ""),
        onClick: () => {
          it.onClick && it.onClick();
          onSelect && onSelect(it.value || it.label);
        }
      },
      it.icon && /* @__PURE__ */ import_react21.default.createElement(Icon, { name: it.icon, size: 16 }),
      /* @__PURE__ */ import_react21.default.createElement("span", { style: { flex: 1 } }, it.label),
      it.checked && /* @__PURE__ */ import_react21.default.createElement(Icon, { name: "check", size: 14 })
    )));
  }
  function MenuTrigger({ trigger, items, label, align = "right", onSelect, children }) {
    const [open, setOpen] = import_react21.default.useState(false);
    const ref = import_react21.default.useRef(null);
    import_react21.default.useEffect(() => {
      if (!open) return;
      const h = (e) => {
        if (ref.current && !ref.current.contains(e.target)) setOpen(false);
      };
      document.addEventListener("mousedown", h);
      return () => document.removeEventListener("mousedown", h);
    }, [open]);
    return /* @__PURE__ */ import_react21.default.createElement("span", { className: "pb-menu__wrap", ref }, /* @__PURE__ */ import_react21.default.createElement("span", { onClick: () => setOpen((o) => !o) }, trigger || children), open && /* @__PURE__ */ import_react21.default.createElement("span", { className: "pb-menu__pop", style: align === "right" ? { right: 0 } : { left: 0 } }, /* @__PURE__ */ import_react21.default.createElement(Menu, { label, items, onSelect: (v) => {
      setOpen(false);
      onSelect && onSelect(v);
    } })));
  }

  // design-system/components/feedback/Toast.jsx
  var import_react22 = __toESM(require_react(), 1);
  var TONE = {
    success: { icon: "circle-check", color: "var(--status-success)" },
    danger: { icon: "circle-x", color: "var(--status-danger)" },
    warning: { icon: "triangle-alert", color: "var(--status-warning)" },
    info: { icon: "info", color: "var(--status-info)" },
    neutral: { icon: "sparkles", color: "var(--text-secondary)" }
  };
  function Toast({ tone = "success", title, description, action, onClose, className = "", ...rest }) {
    const t = TONE[tone] || TONE.neutral;
    return /* @__PURE__ */ import_react22.default.createElement("div", { role: "status", className: ("pb-toast " + className).trim(), ...rest }, /* @__PURE__ */ import_react22.default.createElement(Icon, { name: t.icon, size: 18, color: t.color, style: { marginTop: 1 } }), /* @__PURE__ */ import_react22.default.createElement("div", { className: "pb-toast__text" }, /* @__PURE__ */ import_react22.default.createElement("p", { className: "pb-toast__title" }, title), description && /* @__PURE__ */ import_react22.default.createElement("p", { className: "pb-toast__desc" }, description), action && /* @__PURE__ */ import_react22.default.createElement("div", { style: { marginTop: 8 } }, action)), onClose && /* @__PURE__ */ import_react22.default.createElement(IconButton, { icon: "x", size: "sm", label: "Dismiss", onClick: onClose, style: { margin: "-4px -4px 0 0" } }));
  }

  // design-system/components/feedback/Tooltip.jsx
  var import_react23 = __toESM(require_react(), 1);
  function Tooltip({ label, placement = "top", className = "", children, ...rest }) {
    return /* @__PURE__ */ import_react23.default.createElement("span", { className: ["pb-tip", placement === "bottom" && "pb-tip--bottom", className].filter(Boolean).join(" "), ...rest }, children, /* @__PURE__ */ import_react23.default.createElement("span", { role: "tooltip", className: "pb-tip__bubble" }, label));
  }

  // design-system/components/forms/Checkbox.jsx
  var import_react24 = __toESM(require_react(), 1);
  function Checkbox({ label, description, disabled, className = "", ...rest }) {
    return /* @__PURE__ */ import_react24.default.createElement("label", { className: ["pb-check", disabled && "pb-check--disabled", className].filter(Boolean).join(" ") }, /* @__PURE__ */ import_react24.default.createElement("input", { type: "checkbox", disabled, ...rest }), /* @__PURE__ */ import_react24.default.createElement("span", { className: "pb-check__box" }, /* @__PURE__ */ import_react24.default.createElement(Icon, { name: "check", size: 12, strokeWidth: 2.5 })), (label || description) && /* @__PURE__ */ import_react24.default.createElement("span", null, label, description && /* @__PURE__ */ import_react24.default.createElement("span", { className: "pb-check__desc" }, description)));
  }

  // design-system/components/forms/Composer.jsx
  var import_react25 = __toESM(require_react(), 1);
  function Composer({ placeholder = "Ask anything\u2026", value, onChange, onSend, contexts = [{ icon: "file-text", label: "Project" }, { icon: "folder", label: "App" }], className = "", ...rest }) {
    const [inner, setInner] = import_react25.default.useState("");
    const v = value !== void 0 ? value : inner;
    const set = (e) => {
      if (onChange) onChange(e.target.value);
      if (value === void 0) setInner(e.target.value);
    };
    const send = () => {
      if (!v.trim()) return;
      if (onSend) onSend(v);
      if (value === void 0) setInner("");
    };
    return /* @__PURE__ */ import_react25.default.createElement("div", { className: ("pb-composer " + className).trim(), ...rest }, /* @__PURE__ */ import_react25.default.createElement("div", { className: "pb-composer__box" }, /* @__PURE__ */ import_react25.default.createElement(
      "textarea",
      {
        rows: 1,
        placeholder,
        value: v,
        onChange: set,
        onKeyDown: (e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            send();
          }
        }
      }
    ), /* @__PURE__ */ import_react25.default.createElement("div", { className: "pb-composer__bar" }, /* @__PURE__ */ import_react25.default.createElement(IconButton, { icon: "plus", variant: "outline", label: "Attach" }), /* @__PURE__ */ import_react25.default.createElement(IconButton, { icon: "waypoints", variant: "outline", label: "Workflows" }), /* @__PURE__ */ import_react25.default.createElement("span", { style: { flex: 1 } }), /* @__PURE__ */ import_react25.default.createElement(IconButton, { icon: "mic", label: "Dictate" }), /* @__PURE__ */ import_react25.default.createElement(IconButton, { icon: "send", variant: "primary", label: "Send", onClick: send }))), contexts.length > 0 && /* @__PURE__ */ import_react25.default.createElement("div", { className: "pb-composer__ctx" }, contexts.map((c) => /* @__PURE__ */ import_react25.default.createElement("button", { type: "button", key: c.label }, /* @__PURE__ */ import_react25.default.createElement(Icon, { name: c.icon, size: 14 }), c.label))));
  }

  // design-system/components/forms/Input.jsx
  var import_react26 = __toESM(require_react(), 1);
  function Input({ label, hint, error, iconLeft, iconRight, shortcut, variant = "outline", size = "md", disabled, className = "", style, id, ...rest }) {
    const autoId = import_react26.default.useId ? import_react26.default.useId() : void 0;
    const fid = id || autoId;
    const box = ["pb-input", variant === "filled" && "pb-input--filled", size !== "md" && "pb-input--" + size, error && "pb-input--error", disabled && "pb-input--disabled"].filter(Boolean).join(" ");
    const control = /* @__PURE__ */ import_react26.default.createElement("div", { className: box, style: label || hint || error ? void 0 : style }, iconLeft && /* @__PURE__ */ import_react26.default.createElement(Icon, { name: iconLeft, size: 16 }), /* @__PURE__ */ import_react26.default.createElement("input", { id: fid, disabled, "aria-invalid": !!error, ...rest }), shortcut && /* @__PURE__ */ import_react26.default.createElement(Kbd, { keys: shortcut }), iconRight && /* @__PURE__ */ import_react26.default.createElement(Icon, { name: iconRight, size: 16 }));
    if (!label && !hint && !error) return /* @__PURE__ */ import_react26.default.createElement("div", { className, style: { minWidth: 0 } }, control);
    return /* @__PURE__ */ import_react26.default.createElement("div", { className: ("pb-field " + className).trim(), style }, label && /* @__PURE__ */ import_react26.default.createElement("label", { className: "pb-field__label", htmlFor: fid }, label), control, (error || hint) && /* @__PURE__ */ import_react26.default.createElement("span", { className: "pb-field__hint" + (error ? " pb-field__hint--error" : "") }, error || hint));
  }

  // design-system/components/forms/Radio.jsx
  var import_react27 = __toESM(require_react(), 1);
  function Radio({ label, description, disabled, className = "", ...rest }) {
    return /* @__PURE__ */ import_react27.default.createElement("label", { className: ["pb-check", "pb-check--radio", disabled && "pb-check--disabled", className].filter(Boolean).join(" ") }, /* @__PURE__ */ import_react27.default.createElement("input", { type: "radio", disabled, ...rest }), /* @__PURE__ */ import_react27.default.createElement("span", { className: "pb-check__box" }), (label || description) && /* @__PURE__ */ import_react27.default.createElement("span", null, label, description && /* @__PURE__ */ import_react27.default.createElement("span", { className: "pb-check__desc" }, description)));
  }

  // design-system/components/forms/Select.jsx
  var import_react28 = __toESM(require_react(), 1);
  function Select({ label, hint, options = [], iconLeft, size = "md", variant = "outline", className = "", style, id, ...rest }) {
    const autoId = import_react28.default.useId ? import_react28.default.useId() : void 0;
    const fid = id || autoId;
    const box = ["pb-input", variant === "filled" && "pb-input--filled", size !== "md" && "pb-input--" + size].filter(Boolean).join(" ");
    return /* @__PURE__ */ import_react28.default.createElement("div", { className: ("pb-field " + className).trim(), style }, label && /* @__PURE__ */ import_react28.default.createElement("label", { className: "pb-field__label", htmlFor: fid }, label), /* @__PURE__ */ import_react28.default.createElement("div", { className: box }, iconLeft && /* @__PURE__ */ import_react28.default.createElement(Icon, { name: iconLeft, size: 16 }), /* @__PURE__ */ import_react28.default.createElement("select", { id: fid, ...rest }, options.map((o) => {
      const opt = typeof o === "string" ? { value: o, label: o } : o;
      return /* @__PURE__ */ import_react28.default.createElement("option", { key: opt.value, value: opt.value }, opt.label);
    })), /* @__PURE__ */ import_react28.default.createElement(Icon, { name: "chevron-down", size: 16 })), hint && /* @__PURE__ */ import_react28.default.createElement("span", { className: "pb-field__hint" }, hint));
  }

  // design-system/components/forms/Switch.jsx
  var import_react29 = __toESM(require_react(), 1);
  function Switch({ label, disabled, className = "", ...rest }) {
    return /* @__PURE__ */ import_react29.default.createElement("label", { className: ["pb-switch", disabled && "pb-switch--disabled", className].filter(Boolean).join(" ") }, /* @__PURE__ */ import_react29.default.createElement("input", { type: "checkbox", role: "switch", disabled, ...rest }), /* @__PURE__ */ import_react29.default.createElement("span", { className: "pb-switch__track" }), label && /* @__PURE__ */ import_react29.default.createElement("span", null, label));
  }

  // design-system/components/forms/Textarea.jsx
  var import_react30 = __toESM(require_react(), 1);
  function Textarea({ label, hint, rows = 3, className = "", style, id, ...rest }) {
    const autoId = import_react30.default.useId ? import_react30.default.useId() : void 0;
    const fid = id || autoId;
    return /* @__PURE__ */ import_react30.default.createElement("div", { className: ("pb-field " + className).trim(), style }, label && /* @__PURE__ */ import_react30.default.createElement("label", { className: "pb-field__label", htmlFor: fid }, label), /* @__PURE__ */ import_react30.default.createElement("div", { className: "pb-textarea" }, /* @__PURE__ */ import_react30.default.createElement("textarea", { id: fid, rows, ...rest })), hint && /* @__PURE__ */ import_react30.default.createElement("span", { className: "pb-field__hint" }, hint));
  }

  // design-system/components/navigation/FilterTabs.jsx
  var import_react31 = __toESM(require_react(), 1);
  function FilterTabs({ items = [], value, onChange, className = "", ...rest }) {
    return /* @__PURE__ */ import_react31.default.createElement("div", { role: "tablist", className: ("pb-filters " + className).trim(), ...rest }, items.map((it) => {
      const on = it.value === value;
      return /* @__PURE__ */ import_react31.default.createElement(
        "button",
        {
          key: it.value,
          type: "button",
          role: "tab",
          "aria-selected": on,
          className: "pb-filter" + (on ? " pb-filter--active" : ""),
          onClick: () => onChange && onChange(on && it.value !== "all" ? null : it.value)
        },
        (it.status || it.color) && /* @__PURE__ */ import_react31.default.createElement(StatusDot, { status: it.status, color: it.color, size: 14 }),
        it.label,
        it.count != null && /* @__PURE__ */ import_react31.default.createElement(Count, null, it.count)
      );
    }));
  }

  // design-system/components/navigation/NavItem.jsx
  var import_react32 = __toESM(require_react(), 1);
  function NavItem({ icon, letter, letterColor, label, active = false, count, trailing, href, className = "", ...rest }) {
    const cls = ["pb-nav-item", active && "pb-nav-item--active", className].filter(Boolean).join(" ");
    const inner = /* @__PURE__ */ import_react32.default.createElement(import_react32.default.Fragment, null, letter ? /* @__PURE__ */ import_react32.default.createElement(IconChip, { letter, color: letterColor }) : icon && /* @__PURE__ */ import_react32.default.createElement(Icon, { name: icon, size: 16 }), /* @__PURE__ */ import_react32.default.createElement("span", { className: "pb-nav-item__label" }, label), count != null && /* @__PURE__ */ import_react32.default.createElement(Count, null, count), trailing === "chevron" ? /* @__PURE__ */ import_react32.default.createElement(Icon, { name: "chevron-down", size: 14, style: { color: "var(--text-tertiary)" } }) : trailing);
    if (href) return /* @__PURE__ */ import_react32.default.createElement("a", { className: cls, href, "aria-current": active ? "page" : void 0, ...rest }, inner);
    return /* @__PURE__ */ import_react32.default.createElement("button", { type: "button", className: cls, "aria-current": active ? "page" : void 0, ...rest }, inner);
  }

  // design-system/components/navigation/Sidebar.jsx
  var import_react33 = __toESM(require_react(), 1);
  function Sidebar({ brand = "ProspectBoost", action = { label: "New agent", icon: "plus" }, onAction, sections = [], footer = [], activeId, onSelect, onCollapse, className = "", style, ...rest }) {
    return /* @__PURE__ */ import_react33.default.createElement("aside", { className: ("pb-sidebar " + className).trim(), style, ...rest }, /* @__PURE__ */ import_react33.default.createElement("div", { className: "pb-sidebar__brand" }, typeof brand === "string" ? /* @__PURE__ */ import_react33.default.createElement("span", { className: "pb-wordmark" }, brand) : brand, onCollapse && /* @__PURE__ */ import_react33.default.createElement(IconButton, { icon: "panel-left-close", size: "sm", label: "Collapse sidebar", onClick: onCollapse })), action && /* @__PURE__ */ import_react33.default.createElement(Button, { block: true, iconLeft: action.icon, onClick: onAction, style: { marginBottom: 12 } }, action.label), sections.map((s, i) => /* @__PURE__ */ import_react33.default.createElement("nav", { className: "pb-sidebar__section", key: s.label || i, "aria-label": s.label }, s.label && /* @__PURE__ */ import_react33.default.createElement("div", { className: "pb-sidebar__label" }, s.label), s.items.map((it) => /* @__PURE__ */ import_react33.default.createElement(
      NavItem,
      {
        key: it.id,
        icon: it.icon,
        letter: it.letter,
        letterColor: it.letterColor,
        label: it.label,
        count: it.count,
        active: activeId === it.id,
        onClick: () => onSelect && onSelect(it.id)
      }
    )))), footer.length > 0 && /* @__PURE__ */ import_react33.default.createElement("div", { className: "pb-sidebar__footer" }, footer.map((it) => /* @__PURE__ */ import_react33.default.createElement(
      NavItem,
      {
        key: it.id,
        icon: it.icon,
        label: it.label,
        trailing: it.trailing || "chevron",
        active: activeId === it.id,
        onClick: () => onSelect && onSelect(it.id)
      }
    ))));
  }

  // design-system/components/navigation/Tabs.jsx
  var import_react34 = __toESM(require_react(), 1);
  function Tabs({ items = [], value, onChange, size = "md", className = "", ...rest }) {
    return /* @__PURE__ */ import_react34.default.createElement("div", { role: "tablist", className: ["pb-tabs", size === "sm" && "pb-tabs--sm", className].filter(Boolean).join(" "), ...rest }, items.map((it) => {
      const t = typeof it === "string" ? { value: it, label: it } : it;
      const on = t.value === value;
      return /* @__PURE__ */ import_react34.default.createElement(
        "button",
        {
          key: t.value,
          type: "button",
          role: "tab",
          "aria-selected": on,
          className: "pb-tab" + (on ? " pb-tab--active" : ""),
          onClick: () => onChange && onChange(t.value)
        },
        t.icon && /* @__PURE__ */ import_react34.default.createElement(Icon, { name: t.icon, size: 14 }),
        t.label
      );
    }));
  }
  return __toCommonJS(index_exports);
})();

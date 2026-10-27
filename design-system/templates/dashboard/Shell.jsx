(() => {
const { Sidebar, Input, IconButton, Avatar, Icon } = window.ProspectBoostDesignSystem_668922;

function navSections(agents) {
  return [
    { label: 'Main', items: [
      { id: 'home', label: 'Home', icon: 'house' },
      { id: 'agents', label: 'Agents', icon: 'asterisk' },
      { id: 'artifacts', label: 'Artifacts', icon: 'file-stack' },
      { id: 'tasks', label: 'Tasks', icon: 'notebook-pen' },
    ] },
    { label: 'Agent', items: agents.map(a => ({ id: 'agent:' + a.id, label: a.name, icon: a.icon })) },
    { label: 'Personalize', items: [
      { id: 'brain', label: 'Brain', icon: 'lightbulb' },
      { id: 'skills', label: 'Skills', icon: 'zap' },
      { id: 'integrations', label: 'Integrations', icon: 'plug' },
    ] },
  ];
}
const NAV_FOOTER = [{ id: 'settings', label: 'Settings', icon: 'settings' }, { id: 'help', label: 'Help Center', icon: 'circle-help' }];

function AppSidebar({ agents, activeId, onSelect, onNewAgent, onCollapse }) {
  return (
    <Sidebar activeId={activeId} onSelect={onSelect} onAction={onNewAgent} onCollapse={onCollapse}
      sections={navSections(agents)} footer={NAV_FOOTER} />
  );
}

function Topbar({ user, onToast }) {
  return (
    <header className="topbar">
      <div className="topbar__search"><Input variant="filled" iconLeft="search" placeholder="Search..." shortcut={['F', '⌘']} /></div>
      <span style={{ flex: 1 }} />
      <IconButton icon="bell" variant="outline" label="Notifications" onClick={() => onToast({ tone: 'info', title: 'No new notifications', description: 'You’re all caught up.' })} />
      <span className="topbar__sep" />
      <button type="button" className="topbar__user">
        <Avatar name={user.name} size={36} />
        <span>{user.handle}</span>
        <Icon name="chevron-down" size={14} />
      </button>
    </header>
  );
}

function MobileHeader({ onMenu }) {
  return (
    <header className="mhead">
      <span className="pb-wordmark" style={{ fontSize: 24 }}>ProspectBoost</span>
      <IconButton icon="menu" variant="soft" size="lg" label="Open menu" onClick={onMenu} />
    </header>
  );
}

function Drawer({ open, onClose, children }) {
  if (!open) return null;
  return (
    <div className="drawer" onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ height: '100%' }}>{children}</div>
    </div>
  );
}

function PageHead({ title, sub, children }) {
  return (
    <div className="page-head">
      <div><h1 className="page-title">{title}</h1>{sub && <p className="page-sub">{sub}</p>}</div>
      {children && <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>{children}</div>}
    </div>
  );
}

Object.assign(window, { AppSidebar, Topbar, MobileHeader, Drawer, PageHead });
})();

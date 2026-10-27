(() => {
const { Dialog, Button, Input, Select, Textarea, Toast } = window.ProspectBoostDesignSystem_668922;
const D = window.PB_DATA;
const LABELS = { brain: 'Brain', skills: 'Skills', integrations: 'Integrations', settings: 'Settings', help: 'Help Center' };

function NewAgentDialog({ open, onClose, onCreate }) {
  const [name, setName] = React.useState('');
  const [tpl, setTpl] = React.useState('prospect-finder');
  if (!open) return null;
  return (
    <Dialog open title="New agent" description="Name it and pick what it should do first." onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button disabled={!name.trim()} onClick={() => { onCreate(name, tpl); setName(''); }}>Create agent</Button></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input label="Agent name" placeholder="e.g. Fintech Prospector" value={name} onChange={e => setName(e.target.value)} autoFocus />
        <Select label="Start from" value={tpl} onChange={e => setTpl(e.target.value)} options={D.agents.map(a => ({ value: a.id, label: a.name + ' template' }))} />
        <Textarea label="Instructions" placeholder="Who should it look for? What should it do with them?" rows={3} />
      </div>
    </Dialog>
  );
}

function App() {
  const [nav, setNav] = React.useState(() => window.PB_START || localStorage.getItem('pb-kit-nav') || 'home');
  const [agents, setAgents] = React.useState(D.agents);
  const [drawer, setDrawer] = React.useState(false);
  const [newAgent, setNewAgent] = React.useState(false);
  const [toasts, setToasts] = React.useState([]);
  React.useEffect(() => { if (!window.PB_START) localStorage.setItem('pb-kit-nav', nav); }, [nav]);

  const toast = t => {
    const id = Math.random();
    setToasts(ts => [...ts.slice(-2), { ...t, id }]);
    setTimeout(() => setToasts(ts => ts.filter(x => x.id !== id)), 4000);
  };
  const go = id => { setNav(id === 'agents' ? 'agent:' + agents[0].id : id); setDrawer(false); };
  const quick = a => {
    if (a === 'new-agent') setNewAgent(true);
    else if (a === 'integration') go('integrations');
    else if (a === 'skills') go('skills');
    else toast({ tone: 'success', title: 'Invite sent', description: 'We emailed a join link to your teammate.' });
  };
  const create = (name, tpl) => {
    const base = agents.find(a => a.id === tpl) || agents[0];
    const id = 'custom-' + Date.now();
    setAgents(as => [...as, { ...base, id, name, icon: 'bot', tasks: 0, rate: 0, avg: '—', teammates: 1, monthly: '0' }]);
    setNewAgent(false);
    setNav('agent:' + id);
    toast({ tone: 'success', title: 'Agent created', description: name + ' is ready. Give it instructions to start.' });
  };

  let screen;
  if (nav === 'home') screen = <HomeScreen data={D} agents={agents} user={D.user} onNav={go} onQuick={quick} onToast={toast} />;
  else if (nav.startsWith('agent:')) {
    const a = agents.find(x => 'agent:' + x.id === nav) || agents[0];
    screen = <AgentScreen key={a.id} agent={a} data={D} onToast={toast} />;
  } else if (nav === 'tasks') screen = <TasksScreen data={D} agents={agents} onToast={toast} />;
  else if (nav === 'artifacts') screen = <ArtifactsScreen data={D} onToast={toast} />;
  else screen = <PlaceholderScreen label={LABELS[nav] || nav} />;

  const sidebar = <AppSidebar agents={agents} activeId={nav} onSelect={go} onNewAgent={() => { setDrawer(false); setNewAgent(true); }} onCollapse={drawer ? () => setDrawer(false) : undefined} />;
  return (
    <div className="app" data-screen-label={nav}>
      <div className="app__side">{sidebar}</div>
      <main className="app__main">
        <Topbar user={D.user} onToast={toast} />
        <MobileHeader onMenu={() => setDrawer(true)} />
        {screen}
      </main>
      <Drawer open={drawer} onClose={() => setDrawer(false)}>{sidebar}</Drawer>
      <NewAgentDialog open={newAgent} onClose={() => setNewAgent(false)} onCreate={create} />
      <div className="toasts">{toasts.map(t => <Toast key={t.id} {...t} onClose={() => setToasts(ts => ts.filter(x => x.id !== t.id))} />)}</div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
})();

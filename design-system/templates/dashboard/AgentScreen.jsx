(() => {
const { Composer, Tabs, IconButton, Button, Select, Textarea, Card, ActionRow, IconChip, ProgressCard, Switch, Checkbox, Radio, Avatar, Icon } = window.ProspectBoostDesignSystem_668922;

const REPLIES = [
  'On it — I’ll pull 50 accounts that match your ICP and add them to a new list. You’ll find it in Artifacts.',
  'Done. I flagged 12 accounts with recent funding and a VP Sales hire in the last 90 days.',
  'I drafted a 3-step sequence for those accounts. It’s queued in Tasks for your approval.',
];

function AgentPanel({ agent, data, onToast }) {
  const [tab, setTab] = React.useState('Agent');
  return (
    <aside className="agent__panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <Tabs size="sm" items={['Agent', 'Settings']} value={tab} onChange={setTab} />
        <span style={{ flex: 1 }} />
        <IconButton icon="rotate-ccw" variant="outline" size="sm" label="Reset changes" />
        <Button size="sm" onClick={() => onToast({ tone: 'success', title: 'Agent saved', description: agent.name + ' will use the new preferences on its next run.' })}>Save</Button>
      </div>
      {tab === 'Agent' ? (
        <>
          <div style={{ padding: '6px 2px 0', font: 'var(--type-meta)', color: 'var(--text-secondary)' }}>Agent preferences</div>
          <Select options={['Smartest (Claude Opus)', 'Balanced (Claude Sonnet)', 'Fastest (Claude Haiku)']} />
          <Textarea placeholder="Add instructions for the agent..." rows={3} />
          <Card variant="tile" title="Triggers" headerRight={<button className="pb-card__action" onClick={() => onToast({ tone: 'info', title: 'Add trigger', description: 'Schedule, webhook or inbox events.' })}>+ Add</button>}>
            <div className="stack">{data.agentTriggers.map(t => <ActionRow key={t.title} icon={t.icon} title={t.title} subtitle={t.sub} trailing="menu" />)}</div>
          </Card>
          <Card variant="tile" title="Integrations" headerRight={<button className="pb-card__action">+ Add</button>}>
            <div className="stack">{data.integrations.map(i => <ActionRow key={i.name} leading={<IconChip letter={i.letter} color={i.color} size={20} />} title={i.name}
              trailing={<Icon name={i.ok ? 'circle-check' : 'circle-alert'} size={14} color={i.ok ? 'var(--text-tertiary)' : 'var(--status-warning)'} />} />)}</div>
          </Card>
          <ProgressCard title="Today task" value={70} onAdd={() => onToast({ tone: 'neutral', title: 'Task added to today' })} />
        </>
      ) : (
        <Card variant="tile" title="Run settings">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '4px 6px 8px' }}>
            <Switch label="Agent active" defaultChecked />
            <Checkbox label="Require approval before sending" defaultChecked description="Drafts wait in Tasks → Queued" />
            <Checkbox label="Skip prospects already in CRM" defaultChecked />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ font: 'var(--type-meta)', color: 'var(--text-secondary)' }}>Run cadence</span>
              <Radio name="cad" label="Every weekday" defaultChecked /><Radio name="cad" label="Weekly (Mondays)" /><Radio name="cad" label="Manual only" />
            </div>
          </div>
        </Card>
      )}
    </aside>
  );
}

function AgentScreen({ agent, data, onToast }) {
  const [mode, setMode] = React.useState('chat');
  const [msgs, setMsgs] = React.useState([]);
  const scroller = React.useRef(null);
  React.useEffect(() => { setMsgs([]); }, [agent.id]);
  React.useEffect(() => { if (scroller.current) scroller.current.scrollTop = scroller.current.scrollHeight; }, [msgs]);
  const send = text => {
    setMsgs(m => [...m, { me: true, text }]);
    setTimeout(() => setMsgs(m => [...m, { me: false, text: REPLIES[Math.floor(m.length / 2) % REPLIES.length] }]), 700);
  };
  return (
    <div className={'agent agent--' + mode}>
      <div className="agent__switch"><Tabs items={[{ value: 'chat', label: 'Chat', icon: 'message-circle' }, { value: 'config', label: 'Configure', icon: 'sliders-horizontal' }]} value={mode} onChange={setMode} /></div>
      <div className="agent__canvas">
        <div className="agent__scroll" ref={scroller}>
          {msgs.length === 0 ? (
            <div className="agent__hero">
              <div className="agent__illo">Agent illustration<br />(mascot not supplied)</div>
              <div style={{ alignSelf: 'stretch' }}>
                <h1 className="page-title">{agent.name}</h1>
                <p className="page-sub" style={{ maxWidth: 360 }}>{agent.desc}</p>
                <span className="agent__meta">
                  <span style={{ display: 'inline-flex' }}>{['AS', 'LP', 'MR'].map((n, i) => <Avatar key={n} name={n.split('').join(' ')} size={18} round style={{ marginLeft: i ? -5 : 0, border: '1.5px solid #fff', fontSize: 8 }} />)}</span>
                  · Used by {agent.teammates} teammates &nbsp; {agent.monthly} tasks last month
                </span>
              </div>
            </div>
          ) : (
            <div className="msgs">
              {msgs.map((m, i) => <div key={i} className={'msg ' + (m.me ? 'msg--me' : 'msg--agent')}>{m.text}</div>)}
            </div>
          )}
        </div>
        <div className="agent__composer">
          <Composer placeholder={'Ask ' + agent.name + ' anything...'} onSend={send} />
        </div>
      </div>
      <AgentPanel agent={agent} data={data} onToast={onToast} />
    </div>
  );
}

Object.assign(window, { AgentScreen });
})();

(() => {
const { Tabs, FilterTabs, KanbanColumn, TaskCard, Button, DataTable, Badge, StatusDot, Dialog, Input, Select } = window.ProspectBoostDesignSystem_668922;

const STATUSES = [
  { value: 'queued', label: 'Queued' },
  { value: 'running', label: 'Running' },
  { value: 'success', label: 'Success' },
  { value: 'failed', label: 'Failed' },
];

function TaskDetail({ task, agents, onClose, onMove }) {
  if (!task) return null;
  const agent = agents.find(a => a.id === task.agent);
  const label = STATUSES.find(s => s.value === task.status).label;
  return (
    <Dialog open title={task.title} description={'Trigger: ' + task.trigger + ' · ' + task.id} onClose={onClose} width={480}
      footer={<>
        <Button variant="secondary" onClick={onClose}>Close</Button>
        {(task.status === 'queued' || task.status === 'failed') && <Button iconLeft="play" onClick={() => onMove(task, 'running')}>Run now</Button>}
        {task.status === 'running' && <Button variant="danger" iconLeft="pause" onClick={() => onMove(task, 'queued')}>Stop</Button>}
      </>}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, font: 'var(--type-body)' }}><StatusDot status={task.status} />{label}</span>
        {task.tags.map(t => <Badge key={t.label} tone={t.tone}>{t.label}</Badge>)}
      </div>
      <div className="md">{'[09:00:02] ' + (agent ? agent.name : 'Agent') + ' started\n[09:00:04] Loaded ICP.md (v12)\n[09:00:09] Queried 3 sources · 1,204 candidates\n[09:00:31] Scored + deduped · 48 qualified\n[09:00:33] ' + task.when}</div>
    </Dialog>
  );
}

function NewTask({ open, agents, onClose, onCreate }) {
  const [title, setTitle] = React.useState('');
  const [agent, setAgent] = React.useState(agents[0].id);
  const [trigger, setTrigger] = React.useState('manual');
  if (!open) return null;
  return (
    <Dialog open title="New task" description="Queue a one-off run for any agent." onClose={onClose}
      footer={<><Button variant="secondary" onClick={onClose}>Cancel</Button><Button disabled={!title.trim()} onClick={() => { onCreate({ title, agent, trigger }); setTitle(''); }}>Add to queue</Button></>}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Input label="Task" placeholder="e.g. Find 50 fintech accounts in Brazil" value={title} onChange={e => setTitle(e.target.value)} autoFocus />
        <Select label="Agent" value={agent} onChange={e => setAgent(e.target.value)} options={agents.map(a => ({ value: a.id, label: a.name }))} />
        <Select label="Trigger" value={trigger} onChange={e => setTrigger(e.target.value)} options={['manual', 'schedule.daily', 'webhook.inbound']} />
      </div>
    </Dialog>
  );
}

function TasksScreen({ data, agents, onToast }) {
  const [view, setView] = React.useState('Board');
  const [filter, setFilter] = React.useState(null);
  const [tasks, setTasks] = React.useState(data.tasks);
  const [open, setOpen] = React.useState(null);
  const [adding, setAdding] = React.useState(false);
  const counts = { ...data.taskCounts };
  const shown = STATUSES.filter(s => !filter || s.value === filter);
  const move = (t, status) => {
    setTasks(ts => ts.map(x => x.id === t.id ? { ...x, status, when: status === 'running' ? 'Started just now' : 'Queued just now' } : x));
    setOpen(null);
    onToast({ tone: status === 'running' ? 'success' : 'warning', title: status === 'running' ? 'Task started' : 'Task stopped', description: t.title });
  };
  const create = ({ title, agent, trigger }) => {
    const a = agents.find(x => x.id === agent);
    const id = 'tsk_' + Math.random().toString(16).slice(2, 7);
    setTasks(ts => [{ id, status: 'queued', trigger, title, agent, tags: [{ label: a.name, tone: a.tone }], when: 'Queued just now' }, ...ts]);
    setAdding(false);
    onToast({ tone: 'success', title: 'Task queued', description: title });
  };
  const listCols = [
    { key: 'title', label: 'Task', width: '2.2fr', render: t => <span style={{ color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.title}</span> },
    { key: 'status', label: 'Status', render: t => <><StatusDot status={t.status} />{STATUSES.find(s => s.value === t.status).label}</> },
    { key: 'agent', label: 'Agent', width: '1.4fr', render: t => <Badge tone={t.tags[0].tone}>{(agents.find(a => a.id === t.agent) || {}).name}</Badge> },
    { key: 'trigger', label: 'Trigger', width: '1.2fr', render: t => <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{t.trigger}</span> },
    { key: 'id', label: 'ID', align: 'right', render: t => <span style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{t.id}</span> },
  ];
  return (
    <div className="content">
      <PageHead title="Tasks" sub="1,842 tasks run in the last 7 days">
        <Button variant="ghost" iconLeft="download" onClick={() => onToast({ tone: 'info', title: 'Export started', description: 'We’ll email you a CSV.' })}>Export</Button>
        <Button iconLeft="plus" onClick={() => setAdding(true)}>New task</Button>
      </PageHead>
      <div className="filters-strip">
        <FilterTabs value={filter} onChange={setFilter} items={STATUSES.map(s => ({ ...s, status: s.value, count: counts[s.value] }))} />
        <Tabs items={['Board', 'List']} value={view} onChange={setView} />
      </div>
      {view === 'Board' ? (
        <div className="board" style={filter ? { gridTemplateColumns: 'minmax(250px,420px)' } : undefined}>
          {shown.map(s => {
            const items = tasks.filter(t => t.status === s.value);
            return (
              <div className="board__col" key={s.value}>
                <KanbanColumn status={s.value} title={s.label} count={items.length} onAdd={() => setAdding(true)}>
                  {items.map(t => <TaskCard key={t.id} trigger={t.trigger} title={t.title} tags={t.tags} when={t.when} id={t.id} onClick={() => setOpen(t)} />)}
                </KanbanColumn>
                <Button variant="soft" block iconLeft="plus" onClick={() => setAdding(true)}>Add Task</Button>
              </div>
            );
          })}
        </div>
      ) : (
        <DataTable columns={listCols} rows={tasks.filter(t => !filter || t.status === filter)} onRowClick={setOpen} minWidth={680} />
      )}
      <TaskDetail task={open} agents={agents} onClose={() => setOpen(null)} onMove={move} />
      <NewTask open={adding} agents={agents} onClose={() => setAdding(false)} onCreate={create} />
    </div>
  );
}

Object.assign(window, { TasksScreen });
})();

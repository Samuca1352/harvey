(() => {
const { MetricCard, ActivityCard, ActionRow, Card, DataTable, IconChip, SegmentBar, Button } = window.ProspectBoostDesignSystem_668922;

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening';
}

function AgentPerfRow({ a, onClick }) {
  return (
    <ActionRow muted onClick={onClick} leading={<IconChip icon={a.icon} />}
      title={<span style={{ fontSize: 15 }}>{a.name}</span>}
      subtitle={<span>Tasks <b style={{ fontWeight: 500, color: 'var(--text-body)' }}>{a.tasks}</b> &nbsp;•&nbsp; Avg <b style={{ fontWeight: 500, color: 'var(--text-body)' }}>{a.avg}</b></span>}
      trailing={<span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, color: 'var(--text-body)' }}><span>{a.rate}%</span><SegmentBar value={a.rate} color={a.color} /></span>} />
  );
}

function HomeScreen({ data, agents, user, onNav, onQuick, onToast }) {
  const cols = [
    { key: 'name', label: 'Agent', width: '2.2fr', render: a => <><IconChip icon={a.icon} /><span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{a.name}</span></> },
    { key: 'tasks', label: 'Tasks' },
    { key: 'rate', label: 'Success rate', width: '1.4fr', render: a => <><SegmentBar value={a.rate} color={a.color} /><span>{a.rate}%</span></> },
    { key: 'avg', label: 'Avg duration' },
  ];
  const activityMenu = [{ label: 'Open task', icon: 'external-link' }, { label: 'Copy link', icon: 'link' }, '-', { label: 'Hide', icon: 'eye' }];
  return (
    <div className="content">
      <PageHead title={greeting() + ', ' + user.name.split(' ')[0]} sub="Here’s what your agents have been up to" />
      <div className="metrics">
        {data.metrics.map(m => <MetricCard key={m.label} {...m} />)}
      </div>
      <div className="home-grid">
        <div className="home-main">
          <Card title="Recent activity" action="View all tasks" onAction={() => onNav('tasks')}>
            <div className="activity-grid">
              {data.activity.map(a => <ActivityCard key={a.id} icon={a.icon} title={a.title} time={a.time} onClick={() => onNav('tasks')}
                onMenu={() => onToast({ tone: 'neutral', title: 'Activity options', description: activityMenu.filter(x => x !== '-').map(x => x.label).join(' · ') })} />)}
            </div>
          </Card>
          <Card title="Agent performance" action="Last 7 days">
            <div className="perf-table">
              <DataTable columns={cols} rows={agents} onRowClick={a => onNav('agent:' + a.id)} minWidth={560} />
            </div>
            <div className="agent-list">
              {agents.map(a => <AgentPerfRow key={a.id} a={a} onClick={() => onNav('agent:' + a.id)} />)}
            </div>
          </Card>
        </div>
        <aside className="rail">
          <Card variant="tile" title="Quick actions">
            <div className="stack">{data.quickActions.map(q => <ActionRow key={q.title} icon={q.icon} title={q.title} onClick={() => onQuick(q.action)} />)}</div>
          </Card>
          <Card variant="tile" title="Upcoming triggers">
            <div className="stack">{data.triggers.map(t => <ActionRow key={t.title} icon={t.icon} title={t.title} subtitle={t.sub} trailing={null} />)}</div>
          </Card>
          <Card variant="tile" title="Integration health">
            <div className="stack">
              {data.integrations.map(i => (
                <ActionRow key={i.name} title={i.name} subtitle={i.ok ? 'Synced 2 min ago' : 'Re-authentication needed'}
                  leading={<span style={{ width: 32, display: 'grid', placeItems: 'center' }}><span className="pb-status" style={{ width: 16, height: 16, background: i.ok ? 'var(--pb-mint-400)' : 'var(--status-warning)' }} /></span>}
                  trailing={i.ok ? 'check' : <Button size="sm" variant="secondary" onClick={() => onToast({ tone: 'success', title: i.name + ' reconnected' })}>Fix</Button>} />
              ))}
            </div>
          </Card>
        </aside>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, AgentPerfRow });
})();

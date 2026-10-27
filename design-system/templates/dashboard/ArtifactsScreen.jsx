(() => {
const { FilterTabs, ArtifactCard, Input, Dialog, Button } = window.ProspectBoostDesignSystem_668922;

const PREVIEW = {
  doc: '# Acme Corp — account brief\n\n## Snapshot\n- B2B SaaS · 320 employees · São Paulo + Austin\n- Raised Series B (Aug) · hiring 6 AEs\n\n## Buying committee\n- VP Sales — Marina Lopes (champion)\n- RevOps Lead — Diego Faria',
  sheet: 'company            employees  score  owner\nAcme Corp          320        92     Ana\nNorthwind Labs     140        88     Leo\nBlue Harbor        610        81     Ana\nPixelForge         75         77     Rui',
  sequence: 'Step 1 · Day 0   Email — “Quick idea for {{company}}”\nStep 2 · Day 2   LinkedIn — connect + note\nStep 3 · Day 5   Email — case study follow-up\nStep 4 · Day 9   Email — break-up',
};

function ArtifactsScreen({ data, onToast }) {
  const [kind, setKind] = React.useState(null);
  const [q, setQ] = React.useState('');
  const [open, setOpen] = React.useState(null);
  const count = k => data.artifacts.filter(a => a.kind === k).length;
  const items = data.artifacts.filter(a => (!kind || kind === 'week' || a.kind === kind) && a.title.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="content">
      <PageHead title="Artifacts" sub="Documents, sheets, and sequences your agents have produced">
        <div style={{ width: 240 }}><Input variant="filled" iconLeft="search" placeholder="Filter files..." value={q} onChange={e => setQ(e.target.value)} /></div>
      </PageHead>
      <div style={{ marginBottom: 10 }}>
        <FilterTabs value={kind} onChange={setKind} items={[
          { value: 'doc', label: 'Docs', status: 'doc', count: count('doc') },
          { value: 'sheet', label: 'Sheets', status: 'sheet', count: count('sheet') },
          { value: 'sequence', label: 'Sequences', status: 'sequence', count: count('sequence') },
          { value: 'week', label: 'Total this week', status: 'other', count: data.artifacts.length },
        ]} />
      </div>
      <div className="art-grid">
        {items.map(a => <ArtifactCard key={a.id} kind={a.kind} title={a.title} meta={a.meta} onOpen={() => setOpen(a)}
          onMenu={() => onToast({ tone: 'neutral', title: a.title, description: 'Rename · Duplicate · Delete' })} />)}
      </div>
      {items.length === 0 && <p className="page-sub" style={{ padding: 24, textAlign: 'center' }}>No files match “{q}”.</p>}
      <Dialog open={!!open} title={open && open.title} description={open && open.meta} onClose={() => setOpen(null)} width={560}
        footer={<><Button variant="secondary" iconLeft="download" onClick={() => onToast({ tone: 'success', title: 'Downloaded', description: open.title })}>Download</Button><Button onClick={() => setOpen(null)}>Done</Button></>}>
        {open && <div className="md">{PREVIEW[open.kind]}</div>}
      </Dialog>
    </div>
  );
}

function PlaceholderScreen({ label }) {
  return (
    <div className="content">
      <PageHead title={label} />
      <div style={{ display: 'grid', placeItems: 'center', minHeight: 320, border: '1px dashed var(--border-dashed)', borderRadius: 16, background: 'var(--bg-subtle)', textAlign: 'center', padding: 24 }}>
        <div>
          <div style={{ font: 'var(--type-panel-title)', color: 'var(--text-primary)' }}>Not in the reference designs</div>
          <p className="page-sub" style={{ maxWidth: 360 }}>This view appears in the navigation but wasn’t shown in the source screens, so it’s intentionally left blank.</p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ArtifactsScreen, PlaceholderScreen });
})();

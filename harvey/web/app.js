let currentTab = 'today';
let companyDrill = false;      // true while viewing a single company's contacts
let _companies = [], _prospects = [], _campaigns = [];
let _signals = null;           // last /api/signals payload, for the cohort builder
let _desk = { items: [], i: 0 };

// ── Appearance ──
//
// Three states, not two: "auto" follows the OS and is the default, so the
// dashboard matches the rest of your machine until you deliberately override
// it. Stored per-browser; nothing is sent anywhere.

const THEMES = ['light', 'dark'];

function applyTheme(mode) {
  const m = mode === 'dark' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', m);

  const lightBtn = document.getElementById('theme-light-btn');
  const darkBtn = document.getElementById('theme-dark-btn');
  if (lightBtn && darkBtn) {
    lightBtn.classList.toggle('active', m === 'light');
    darkBtn.classList.toggle('active', m === 'dark');
  }
  const legacyBtn = document.getElementById('theme-btn');
  if (legacyBtn) legacyBtn.textContent = m;
}

function setTheme(mode) {
  const m = mode === 'dark' ? 'dark' : 'light';
  try { localStorage.setItem('harvey-theme', m); } catch { /* private mode */ }
  applyTheme(m);
}

function cycleTheme() {
  const now = localStorage.getItem('harvey-theme') || 'light';
  const next = now === 'light' ? 'dark' : 'light';
  setTheme(next);
}

(function initTheme() {
  let saved = 'light';
  try { saved = localStorage.getItem('harvey-theme') || 'light'; } catch { /* ignore */ }
  applyTheme(saved === 'dark' ? 'dark' : 'light');
})();

// ── Utilities ──

function escHtml(s) {
  if (s === null || s === undefined || s === '') return '';
  return String(s).replace(/[&<>"']/g, ch => (
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]
  ));
}

// ── One status vocabulary ──
//
// Harvey's tables each carry their own words for state: a prospect is `new`,
// a campaign is `draft`, an email is `pending_review`, a signal is `proposed`.
// Five of those mean "waiting on you" and the old dashboard styled every one
// differently. Everything now resolves through this map, so a status reads the
// same way no matter which table it came out of.
//
// tone: waiting (needs a human) | active (in flight) | good | bad | idle
const STATUS = {
  // prospects
  new:            ['New', 'active'],
  contacted:      ['Contacted', 'active'],
  replied:        ['Replied', 'good'],
  interested:     ['Interested', 'good'],
  meeting:        ['Meeting booked', 'note'],
  not_interested: ['Not interested', 'bad'],
  bounced:        ['Bounced', 'bad'],
  // campaigns
  draft:          ['Draft', 'waiting'],
  active:         ['Active', 'good'],
  completed:      ['Completed', 'idle'],
  paused:         ['Paused', 'bad'],
  // conversations
  open:           ['Open', 'active'],
  closed:         ['Closed', 'idle'],
  closed_won:     ['Won', 'good'],
  closed_lost:    ['Lost', 'bad'],
  objection:      ['Objection', 'waiting'],
  // outbox
  pending_review: ['Waiting on you', 'waiting'],
  approved:       ['Approved', 'good'],
  scheduled:      ['Scheduled', 'active'],
  sent:           ['Sent', 'good'],
  failed:         ['Failed', 'bad'],
  rejected:       ['Rejected', 'idle'],
  cancelled:      ['Cancelled', 'idle'],
  // signals
  proposed:       ['Waiting on you', 'waiting'],
  confirmed:      ['Confirmed', 'good'],
  // email deliverability
  verified:       ['Verified', 'good'],
  risky:          ['Catch-all', 'waiting'],
  guess:          ['Unverified', 'idle'],
  invalid:        ['Invalid', 'bad'],
  // runs
  running:        ['Running', 'active'],
  stale:          ['Stale', 'bad'],
};

function statusMeta(status) {
  const key = String(status || '').toLowerCase().replace(/[^a-z0-9]+/g, '_');
  const hit = STATUS[key];
  if (hit) return { label: hit[0], tone: hit[1] };
  const label = String(status || 'unknown').replace(/_/g, ' ');
  return { label: label.charAt(0).toUpperCase() + label.slice(1), tone: 'idle' };
}

function badge(status) {
  const m = statusMeta(status);
  return '<span class="badge t-' + m.tone + '">' + escHtml(m.label) + '</span>';
}

function formatDate(d) {
  if (!d) return '';
  try {
    const dt = new Date(d);
    if (isNaN(dt)) return escHtml(d);
    return dt.toLocaleString('en-US', {month:'short',day:'numeric',hour:'numeric',minute:'2-digit'});
  } catch { return escHtml(d); }
}

function emptyState(glyph, title, copy) {
  return '<div class="empty"><div class="glyph">' + glyph + '</div>' +
    '<div class="title">' + title + '</div>' +
    '<div class="copy">' + copy + '</div></div>';
}

function offlineState() {
  return emptyState('&#9888;', 'Dashboard can\'t reach the server',
    'The dashboard process may have stopped. Restart it with <b>harvey dashboard</b> and refresh this page.');
}

async function api(path, opts) {
  try {
    const r = await fetch(path, opts);
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

function showToast(msg, type) {
  const t = document.createElement('div');
  t.className = 'toast ' + type;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2600);
}

function toggleVisibility(inputId) {
  const el = document.getElementById(inputId);
  el.type = el.type === 'password' ? 'text' : 'password';
}

// ── Tabs ──

function showTab(id, btn) {
  toggleNavigation(false);
  currentTab = id;
  if (id === 'companies') companyDrill = false;
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  if (btn) btn.classList.add('active');
  document.querySelectorAll('nav button').forEach(b => {
    if (b.classList.contains('active')) b.setAttribute('aria-current', 'page');
    else b.removeAttribute('aria-current');
  });
  loadCurrentTab();
}

function loadCurrentTab() {
  switch (currentTab) {
    case 'today': loadToday(); loadSetupStatus(); loadRuns(); loadTodayActivity(); loadOutreach(); break;
    case 'signals': loadSignals(); break;
    case 'discover': loadDiscoverProviders(); break;
    case 'companies': if (!companyDrill) loadCompanies(); break;
    case 'prospects': loadProspects(); break;
    case 'campaigns': loadCampaigns(); break;
    case 'outbox': loadOutbox(); break;
    case 'conversations': loadConversations(); break;
    case 'activity': loadActivity(); break;
    case 'openers': loadOpeners(); break;
    case 'usage': loadUsage(); break;
    case 'settings': loadSettings(); break;
    case 'controls': loadHarveyStatus(); loadLogs(); break;
  }
}

// ── ProspectBoost Design System Data Viz Helpers ──

function renderMiniChart(levels, highlight, tone, color) {
  levels = levels || [0.45, 1, 0.5];
  highlight = highlight !== undefined ? highlight : 1;
  tone = tone || 'blue';
  const TONES = {
    green: 'var(--status-success)',
    red: 'var(--status-danger)',
    orange: 'var(--status-warning)',
    blue: 'var(--status-info)',
    azure: 'var(--status-queued)',
    pink: 'var(--chart-2)',
    purple: 'var(--chart-4)',
    neutral: 'var(--text-tertiary)'
  };
  const c = color || TONES[tone] || 'var(--chart-1)';
  return '<div class="pb-minichart" aria-hidden="true">' +
    levels.map((lv, i) =>
      '<div class="pb-minichart__slot">' +
        (i === highlight
          ? '<div class="pb-minichart__bar" style="height:' + Math.round(lv * 100) + '%;background:' + c + '"></div>'
          : '<div class="pb-minichart__line" style="bottom:' + Math.round(lv * 100) + '%;background:' + c + '"></div>') +
      '</div>'
    ).join('') +
  '</div>';
}

function renderMetricCard(m) {
  const deltaStyle = m.deltaTone || m.tone
    ? 'color:var(--status-' + (m.deltaTone || m.tone) + '-text, var(--text-secondary))'
    : 'color:var(--text-secondary)';
  return '<div class="pb-metric">' +
    '<div class="pb-metric__label">' + escHtml(m.label) + '</div>' +
    '<div class="pb-metric__body">' +
      '<div style="display:flex;flex-direction:column;justify-content:space-between;min-width:0">' +
        '<div class="pb-metric__value">' + escHtml(m.value) + '</div>' +
        (m.delta ? '<div class="pb-metric__delta" style="' + deltaStyle + '">' + escHtml(m.delta) + '</div>' : '') +
      '</div>' +
      renderMiniChart(m.levels || [0.45, 1, 0.5], m.highlight !== undefined ? m.highlight : 1, m.tone || 'blue', m.color) +
    '</div>' +
  '</div>';
}

function renderSegmentBar(value, segments, color, track, height, width) {
  value = value || 0;
  segments = segments || 10;
  color = color || 'var(--chart-1)';
  track = track || 'var(--chart-track)';
  height = height || 14;
  width = width || 4;
  const filled = Math.round((Math.max(0, Math.min(100, value)) / 100) * segments);
  return '<span class="pb-seg" role="meter" aria-valuenow="' + value + '" aria-valuemin="0" aria-valuemax="100">' +
    Array.from({ length: segments }, (_, i) =>
      '<span style="width:' + width + 'px;height:' + height + 'px;background:' + (i < filled ? color : track) + '"></span>'
    ).join('') +
  '</span>';
}

function renderTodayMetrics(stats, items) {
  const barEl = document.getElementById('today-metrics-bar');
  if (!barEl) return;
  const companies = stats.companies || 0;
  const contacts = stats.prospects || 0;
  const signals = stats.signals_confirmed || 0;
  const pending = (items || []).filter(i => i.tone !== 'good').length;
  const outbox = stats.outbox_pending || 0;
  const convos = stats.open_conversations || 0;

  const metrics = [
    { label: 'Active Companies', value: companies, delta: stats.unprofiled ? stats.unprofiled + ' need reading' : 'All profiled', tone: 'blue', color: 'var(--chart-1)', levels: [0.4, 0.7, 1], highlight: 2 },
    { label: 'Total Contacts', value: contacts, delta: 'Verified leads', tone: 'pink', color: 'var(--chart-2)', levels: [0.55, 1, 0.7], highlight: 1 },
    { label: 'Signals Confirmed', value: signals, delta: 'Active filters', tone: 'azure', color: 'var(--chart-3)', levels: [1, 0.6, 0.3], highlight: 0 },
    { label: 'Decisions Needed', value: pending, delta: pending ? pending + ' awaiting human' : 'Queue clear', tone: pending ? 'orange' : 'green', deltaTone: pending ? 'orange' : 'green', color: pending ? 'var(--chart-6)' : 'var(--chart-5)', levels: [0.3, 1, 0.5], highlight: 1 },
    { label: 'Outbox Pending', value: outbox, delta: (stats.outbox_approved || 0) + ' scheduled', tone: outbox ? 'orange' : 'green', deltaTone: outbox ? 'orange' : 'green', color: outbox ? 'var(--chart-6)' : 'var(--chart-5)', levels: [0.5, 0.8, 1], highlight: 2 },
    { label: 'Live Conversations', value: convos, delta: 'WhatsApp & Email', tone: 'purple', color: 'var(--chart-4)', levels: [0.65, 0.45, 1], highlight: 2 },
  ];

  barEl.innerHTML = metrics.map(renderMetricCard).join('');
}

// ── Today: what needs a human ──

async function loadToday() {
  const data = await api('/api/today');
  const el = document.getElementById('today-queue');
  if (!data) { el.innerHTML = offlineState(); return; }

  navCount('nav-today', (data.items || []).filter(i => i.tone !== 'good').length);
  navCount('nav-outbox', (data.stats || {}).outbox_pending || 0);

  renderTodayMetrics(data.stats || {}, data.items || []);
  renderFigures(data.stats || {});

  const items = data.items || [];
  if (!items.length) {
    el.innerHTML = '<div class="queue-clear">' +
      '<div class="glyph">&#10003;</div><div>' +
      '<div class="qtitle">Nothing needs you</div>' +
      '<div class="qdetail">Harvey has everything it needs. Anything that requires a ' +
      'decision — an email to approve, a signal to confirm — shows up here.</div>' +
      '</div></div>';
    return;
  }

  el.innerHTML = '<div class="queue">' + items.map(it => {
    const isWarn = it.tone === 'warn';
    const isBad = it.tone === 'bad';
    const statusColor = isBad ? 'var(--status-danger)' : isWarn ? 'var(--status-warning)' : 'var(--status-success)';
    return (
      '<div class="queue-item ' + escHtml(it.tone || 'warn') + '">' +
        '<div style="display:flex;align-items:flex-start;gap:12px;flex:1;min-width:0">' +
          '<span class="pb-chip" style="margin-top:2px;width:28px;height:28px">' +
            '<span class="pb-status" style="width:10px;height:10px;background:' + statusColor + '"></span>' +
          '</span>' +
          '<div class="qtext">' +
            '<div class="qtitle">' + escHtml(it.title) + '</div>' +
            '<div class="qdetail">' + escHtml(it.detail) + '</div>' +
          '</div>' +
        '</div>' +
        '<button class="btn btn-primary btn-sm" onclick="goTab(\'' + escHtml(it.tab) + '\')">' +
          escHtml(it.action) + '</button>' +
      '</div>'
    );
  }).join('') + '</div>';
}

function renderFigures(stats) {
  const el = document.getElementById('today-figures');
  if (!el) return;
  const row = (label, value, color, pct) =>
    '<div class="figure">' +
      '<div style="display:flex;align-items:center;justify-content:space-between;width:100%">' +
        '<span class="k" style="display:inline-flex;align-items:center;gap:6px">' +
          '<span class="pb-status" style="width:8px;height:8px;background:' + color + '"></span>' +
          label +
        '</span>' +
        '<span class="v' + (value ? '' : ' zero') + '">' + value + '</span>' +
      '</div>' +
      (pct !== undefined ? '<div style="margin-top:3px">' + renderSegmentBar(pct, 10, color, 'var(--chart-track)', 8, 3) + '</div>' : '') +
    '</div>';

  const comp = stats.companies || 0;
  const pros = stats.prospects || 0;
  const sigs = stats.signals_confirmed || 0;
  const unprof = stats.unprofiled || 0;
  const pend = stats.outbox_pending || 0;
  const apprv = stats.outbox_approved || 0;
  const conv = stats.open_conversations || 0;

  el.innerHTML = '<div class="figures">' +
    row('Companies', comp, 'var(--chart-1)', comp > 0 ? 80 : 0) +
    row('Contacts', pros, 'var(--chart-2)', pros > 0 ? 90 : 0) +
    row('Signals on', sigs, 'var(--chart-3)', sigs > 0 ? 60 : 0) +
    row('Not yet read', unprof, 'var(--chart-6)', unprof > 0 ? 40 : 0) +
    row('Awaiting approval', pend, 'var(--chart-6)', pend > 0 ? 50 : 0) +
    row('Scheduled', apprv, 'var(--chart-5)', apprv > 0 ? 70 : 0) +
    row('Conversations', conv, 'var(--chart-4)', conv > 0 ? 85 : 0) +
  '</div>';
}

// ── Cold outreach: how many were messaged, how many answered, and why it
// stopped. The counters alone leave "it went quiet" unexplained, so the
// reason the sender is idle is rendered with them, not inferred from a gap.

async function loadOutreach() {
  const el = document.getElementById('today-outreach');
  if (!el) return;
  const data = await api('/api/outreach');
  if (!data || data.error) {
    el.innerHTML = data && data.error
      ? '<div class="card"><p class="muted">Métricas de prospecção indisponíveis: ' + escHtml(data.error) + '</p></div>'
      : '';
    return;
  }
  const s = data.stats || {}, cap = data.cap || {}, q = data.queue || {}, st = data.status || {};
  const pct = x => Math.round((x || 0) * 100) + '%';
  const TONE = { bad: 'var(--status-danger)', warn: 'var(--status-warning)',
                 good: 'var(--status-success)', idle: 'var(--text-tertiary)' };
  const capLabel = cap.cap ? cap.sent_today + ' de ' + cap.cap : (cap.sent_today || 0);

  const cards = [
    { label: 'Hoje', value: (s.contacted_today || 0) + ' frias · ' + (s.replied_today || 0) + ' respostas',
      delta: capLabel + ' do limite do dia · ' + (cap.left || 0) + ' ainda cabem',
      tone: (cap.left ? 'blue' : 'orange'), color: cap.left ? 'var(--chart-3)' : 'var(--chart-6)' },
    { label: 'Contatos frios (total)', value: s.contacted || 0,
      delta: (s.contacted_7d || 0) + ' nos últimos 7 dias',
      tone: 'blue', color: 'var(--chart-1)' },
    { label: 'Responderam (total)', value: s.replied || 0,
      delta: pct(s.rate) + ' de resposta · ' + (s.engaged || 0) + ' com interesse',
      tone: 'green', color: 'var(--chart-5)' },
    { label: 'Sem resposta', value: s.awaiting || 0,
      delta: (s.meetings || 0) + ' reuniões · ' + (s.refused || 0) + ' recusaram',
      tone: 'pink', color: 'var(--chart-2)' },
  ];

  // The whole history, one column per day: a bar for cold messages and a
  // thinner one for the answers they got back, so a quiet stretch and a dead
  // stretch look different at a glance.
  const days = data.by_day || [];
  const max = Math.max(...days.map(d => Math.max(d.sent || 0, d.replied || 0)), 1);
  const bar = (n, color) => '<div style="flex:1;min-width:2px;border-radius:2px;height:' +
    Math.max(Math.round((n || 0) / max * 100), 2) + '%;background:' +
    (n ? color : 'var(--chart-track)') + '"></div>';
  const bars = days.map(d =>
    '<div title="' + escHtml(d.day) + ': ' + (d.sent || 0) + ' frias, ' + (d.replied || 0) + ' respostas" ' +
      'style="flex:1;min-width:4px;height:46px;display:flex;align-items:flex-end;gap:1px">' +
      bar(d.sent, 'var(--chart-1)') + bar(d.replied, 'var(--chart-5)') +
    '</div>').join('');
  const legend = (color, text) =>
    '<span style="display:inline-flex;align-items:center;gap:4px">' +
      '<span style="width:8px;height:8px;border-radius:2px;background:' + color + '"></span>' + text + '</span>';

  el.innerHTML = '<div class="card" style="margin-bottom:20px">' +
    '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;flex-wrap:wrap">' +
      '<div><h2 style="margin:0">Prospecção fria' +
        (data.enabled ? '' : ' <span class="badge t-idle">WhatsApp desligado</span>') + '</h2>' +
        '<p class="muted" style="margin:4px 0 0;font-size:12.5px">Quantas lojas o Harvey abordou, ' +
        'quantas responderam e por que o envio está parado ou andando.</p></div>' +
      '<div style="display:flex;align-items:center;gap:8px;min-width:0">' +
        '<span class="pb-status" style="width:10px;height:10px;flex-shrink:0;background:' +
          (TONE[st.tone] || TONE.idle) + '"></span>' +
        '<div style="min-width:0"><div style="font-size:13px;font-weight:600">' + escHtml(st.title || '') + '</div>' +
        '<div class="muted" style="font-size:12px">' + escHtml(st.detail || '') + '</div></div>' +
      '</div>' +
    '</div>' +
    '<div class="metrics" style="margin-top:16px">' + cards.map(renderMetricCard).join('') + '</div>' +
    (days.length ? '<div style="margin-top:16px">' +
      '<div class="muted" style="font-size:11.5px;margin-bottom:6px;display:flex;gap:12px;flex-wrap:wrap">' +
        '<span>Por dia desde ' + escHtml(days[0].day) + ' (' + days.length + ' dias)</span>' +
        legend('var(--chart-1)', 'frias') + legend('var(--chart-5)', 'respostas') +
        '<span>último envio: ' + escHtml(s.last_sent ? formatDate(s.last_sent) : 'nenhum') + '</span>' +
      '</div>' +
      '<div style="display:flex;gap:3px;align-items:flex-end">' + bars + '</div></div>' : '') +
  '</div>';
}

async function loadTodayActivity() {
  const el = document.getElementById('today-activity');
  if (!el) return;
  const data = await api('/api/activity');
  if (!Array.isArray(data) || !data.length) {
    el.innerHTML = '<p class="muted" style="font-size:12.5px;padding:8px 6px">' +
      'Nothing yet. Every action Harvey takes shows up here.</p>';
    return;
  }
  el.innerHTML = '<div class="activity-feed">' + data.slice(0, 12).map(a =>
    '<div class="activity-item">' +
      '<span class="time">' + formatDate(a.created_at) + '</span>' +
      '<span class="badge t-active">' + escHtml(a.agent) + '</span>' +
      '<span class="action">' + escHtml(String(a.action_type).replace(/_/g, ' ')) + '</span>' +
    '</div>').join('') + '</div>';
}

function navCount(id, n) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = n > 0 ? n : '';
  el.className = 'nav-count' + (n > 0 ? ' on' : '');
}

// Jump to a tab from a link that isn't itself a nav button.
function goTab(id) {
  const btns = [...document.querySelectorAll('nav button')];
  const btn = btns.find(b => (b.getAttribute('onclick') || '').includes("'" + id + "'"));
  showTab(id, btn);
}

async function loadRuns() {
  const el = document.getElementById('today-runs');
  const block = document.getElementById('today-runs-block');
  if (!el) return;
  const runs = await api('/api/runs');
  if (!Array.isArray(runs) || !runs.length) {
    if (block) block.style.display = 'none';
    el.innerHTML = '';
    return;
  }
  if (block) block.style.display = '';

  // A rail is 300px wide — a seven-column table does not belong here.
  el.innerHTML = '<div class="figures">' + runs.slice(0, 6).map(r =>
    '<div class="figure" style="align-items:flex-start">' +
      '<span class="k">' + escHtml(r.stage) +
        '<br><span class="muted" style="font-size:11px">' +
        formatDate(r.started_at) + '</span></span>' +
      '<span style="text-align:right;flex:none">' + badge(r.status) +
        '<br><span class="muted" style="font-family:var(--mono);font-size:11px">' +
        (r.records || 0) + ' rec &middot; ' +
        (r.cost_usd ? '$' + Number(r.cost_usd).toFixed(4) : 'free') + '</span></span>' +
    '</div>').join('') + '</div>';
}

// ── Setup checklist (lives on Today, and disappears once it's done) ──

async function loadSetupStatus() {
  const el = document.getElementById('today-setup');
  if (!el) return;
  const data = await api('/api/setup-status');
  if (!data || !data.checks) { el.innerHTML = ''; return; }

  const pct = data.percent || 0;
  // Finished setup disappears completely rather than greeting you forever.
  if (pct === 100) { el.innerHTML = ''; return; }

  const renderCheck = (c, optional) =>
    '<div class="check-item">' +
      (c.done ? '<span class="check-icon done">&#10003;</span>'
              : '<span class="check-icon pending"></span>') +
      '<div class="check-info">' +
        '<div class="check-label ' + (c.done ? 'done' : '') + '">' + escHtml(c.label) +
          (optional ? '<span class="optional-tag">optional</span>' : '') + '</div>' +
        (!c.done ? '<div class="check-help">' + escHtml(c.help) + '</div>' : '') +
      '</div></div>';

  const required = data.checks.filter(c => c.required);
  const optional = data.checks.filter(c => !c.required);

  el.innerHTML =
    '<div class="rail-block">' +
      '<div class="subhead">Setup &mdash; ' + pct + '%</div>' +
      '<div class="progress-bar" style="margin-bottom:14px">' +
        '<div class="progress-fill yellow" style="width:' + pct + '%"></div></div>' +
      required.map(c => renderCheck(c, false)).join('') +
      (optional.length
        ? '<details style="margin-top:10px"><summary class="muted" ' +
          'style="font-size:12px">' + optional.length + ' optional</summary>' +
          '<div style="margin-top:6px">' +
          optional.map(c => renderCheck(c, true)).join('') + '</div></details>'
        : '') +
    '</div>';
}

// ── Signals: Harvey proposes, you confirm ──

async function loadSignals() {
  const data = await api('/api/signals');
  const sumEl = document.getElementById('signals-summary');
  const grpEl = document.getElementById('signals-groups');
  if (!data || data.error) { grpEl.innerHTML = offlineState(); sumEl.innerHTML = ''; return; }
  _signals = data;

  const s = data.summary || {};
  navCount('nav-signals', s.proposed || 0);
  const confCount = s.confirmed || 0;
  const propCount = s.proposed || 0;
  const rejCount = s.rejected || 0;

  sumEl.innerHTML = '<div class="metrics" style="margin-bottom:20px">' +
    renderMetricCard({
      label: 'Confirmed Signals',
      value: confCount,
      delta: confCount ? 'Actively collected' : 'None active yet',
      tone: 'green',
      deltaTone: 'green',
      color: 'var(--chart-5)',
      levels: [0.4, 0.7, 1],
      highlight: 2
    }) +
    renderMetricCard({
      label: 'Awaiting Your Decision',
      value: propCount,
      delta: propCount ? 'Requires confirmation' : 'All reviewed',
      tone: propCount ? 'orange' : 'neutral',
      deltaTone: propCount ? 'orange' : 'neutral',
      color: propCount ? 'var(--chart-6)' : 'var(--chart-track)',
      levels: [0.3, 1, 0.6],
      highlight: 1
    }) +
    renderMetricCard({
      label: 'Skipped / Inactive',
      value: rejCount,
      delta: 'Excluded from runs',
      tone: 'red',
      deltaTone: 'neutral',
      color: 'var(--status-danger)',
      levels: [1, 0.4, 0.2],
      highlight: 0
    }) +
  '</div>';

  grpEl.innerHTML = (data.groups || []).map(g => {
    const codes = g.signals.map(x => x.code);
    const undecided = g.signals.filter(x => x.status === 'proposed').length;
    return '<div class="sig-group">' +
      '<div class="sig-group-head"><div>' +
        '<h3>' + escHtml(g.label) + '</h3><p>' + escHtml(g.blurb) + '</p>' +
      '</div>' +
      (undecided
        ? '<div style="display:flex;gap:6px;flex-shrink:0">' +
            '<button class="btn btn-primary btn-sm" onclick=\'setSignals(' +
              JSON.stringify(codes) + ", \"confirmed\")'>Confirm all " + undecided + '</button>' +
            '<button class="btn btn-secondary btn-sm" onclick=\'setSignals(' +
              JSON.stringify(codes) + ", \"rejected\")'>Skip all</button>" +
          '</div>'
        : '') +
      '</div>' +
      '<div class="card" style="padding:4px 0">' + g.signals.map(sigRow).join('') + '</div>' +
    '</div>';
  }).join('');

  renderCohortBuilder();
}

function sigRow(sig) {
  const free = /free|included/i.test(sig.cost_note || '');
  const costCls = free ? 'free' : (/\$/.test(sig.cost_note || '') ? 'paid' : '');
  const seen = sig.companies
    ? '<span class="cost-chip">seen on ' + sig.companies +
      (sig.companies === 1 ? ' company' : ' companies') + '</span>' : '';
  const floor = sig.confidence_floor > 0
    ? '<span class="cost-chip">&ge; ' +
      Math.round(sig.confidence_floor * 100) + '% confidence</span>' : '';

  const isConfirmed = sig.status === 'confirmed';
  const isRejected = sig.status === 'rejected';
  const statusColor = isConfirmed ? 'var(--status-success)' : isRejected ? 'var(--border-strong)' : 'var(--status-warning)';

  const decide = isConfirmed
    ? '<button class="btn btn-secondary btn-sm" onclick="setSignals([\'' + sig.code +
        '\'],\'rejected\')">Turn off</button>'
    : isRejected
      ? '<button class="btn btn-secondary btn-sm" onclick="setSignals([\'' + sig.code +
          '\'],\'confirmed\')">Turn on</button>'
      : '<button class="btn btn-primary btn-sm" onclick="setSignals([\'' + sig.code +
          '\'],\'confirmed\')">Confirm</button>' +
        '<button class="btn btn-secondary btn-sm" onclick="setSignals([\'' + sig.code +
          '\'],\'rejected\')">Skip</button>';

  return '<div class="sig-row ' + (isRejected ? 'rejected' : '') + '">' +
    '<div style="display:flex;align-items:center;padding-top:4px">' +
      '<span class="pb-status" style="width:10px;height:10px;background:' + statusColor + '"></span>' +
    '</div>' +
    '<div class="sig-main">' +
      '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">' +
        '<span class="sig-label">' + escHtml(sig.label || sig.code) + '</span>' +
        '<span class="badge t-idle" style="font-family:var(--font-mono);font-size:10px">' + escHtml(sig.code) + '</span>' +
      '</div>' +
      '<div class="sig-desc">' + escHtml(sig.description) + '</div>' +
      '<div class="sig-meta">' +
        '<span class="cost-chip ' + costCls + '">' + escHtml(sig.cost_note || 'cost unknown') + '</span>' +
        floor + seen + badge(sig.status) +
      '</div>' +
    '</div>' +
    '<div class="sig-decide">' + decide + '</div>' +
  '</div>';
}

async function setSignals(codes, status) {
  const data = await api('/api/signals/status', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({codes: codes, status: status}),
  });
  if (data && data.success) {
    showToast(
      status === 'confirmed'
        ? 'Confirmed ' + data.changed + ' signal' + (data.changed === 1 ? '' : 's') +
          ' — Harvey will collect ' + (data.changed === 1 ? 'it' : 'them') + ' from now on.'
        : data.changed + ' signal' + (data.changed === 1 ? '' : 's') + ' turned off.',
      'success');
  } else {
    showToast('Could not update that signal.', 'error');
  }
  loadSignals();
}

// ── Discover: pick a source, price it, then run it ──

let _provider = null;
let _discoverPoll = null;

async function loadDiscoverProviders() {
  const el = document.getElementById('discover-providers');
  const data = await api('/api/discover/providers');
  if (!data || !data.providers) { el.innerHTML = offlineState(); return; }

  _provider = _provider || data.selected || data.default;
  el.innerHTML = '<div class="prov-grid">' + data.providers.map(p => {
    const ready = p.configured
      ? '<span class="badge t-good">ready</span>'
      : '<span class="badge t-waiting">needs a key</span>';
    return '<div class="prov-card ' + (p.key === _provider ? 'selected' : '') +
      '" onclick="pickProvider(\'' + p.key + '\')">' +
      '<div class="prov-head"><h3>' + escHtml(p.label) + '</h3>' + ready + '</div>' +
      '<div class="blurb">' + escHtml(p.blurb) + '</div>' +
      '<div class="row"><span class="k">Cost</span><span class="v">' +
        escHtml(p.cost_note) + '</span></div>' +
      '<div class="row"><span class="k">Free</span><span class="v">' +
        escHtml(p.free_tier) + '</span></div>' +
      (p.needs_key
        ? '<div class="row"><span class="k">Setup</span><span class="v">' +
          escHtml(p.env_keys.join(', ')) + ' in .env &middot; ' +
          '<a href="' + escHtml(p.signup_url) + '" target="_blank" rel="noopener">get a key</a>' +
          '</span></div>'
        : '') +
      (p.caveat ? '<div class="caveat">' + escHtml(p.caveat) + '</div>' : '') +
    '</div>';
  }).join('') + '</div>';

  const running = data.running;
  document.getElementById('disc-stop').style.display = running ? '' : 'none';
  if (running && !_discoverPoll) {
    _discoverPoll = setInterval(loadDiscoverProviders, 4000);
  } else if (!running && _discoverPoll) {
    clearInterval(_discoverPoll);
    _discoverPoll = null;
    // A finished run leaves the button stuck on "Running…" otherwise.
    const btn = document.getElementById('disc-run');
    btn.disabled = true;
    btn.textContent = 'Estimate first';
    showToast('Discovery finished.', 'success');
  }
  renderDiscoverResult(data.last_report, running);
}

function pickProvider(key) {
  _provider = key;
  document.getElementById('disc-run').disabled = true;
  document.getElementById('disc-run').textContent = 'Estimate first';
  document.getElementById('discover-estimate').innerHTML = '';
  loadDiscoverProviders();
}

function discoverBody() {
  const raw = document.getElementById('disc-cities').value.trim();
  return {
    provider: _provider,
    // Semicolons or newlines, never commas: "Denver, CO" is one city.
    cities: raw ? raw.split(/[;\n]/).map(c => c.trim()).filter(Boolean) : [],
    depth: Number(document.getElementById('disc-depth').value) || 30,
    limit: Number(document.getElementById('disc-limit').value) || 100,
    max_spend: Number(document.getElementById('disc-cap').value) || 1,
  };
}

async function estimateDiscovery() {
  const el = document.getElementById('discover-estimate');
  el.innerHTML = '<p class="muted" style="font-size:13px">Pricing it…</p>';
  const data = await api('/api/discover/estimate', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(discoverBody()),
  });
  if (!data || data.error) {
    el.innerHTML = '<div class="test-result error">' +
      escHtml((data && data.error) || 'Could not estimate.') + '</div>';
    return;
  }

  const cap = discoverBody().max_spend;
  const over = data.estimated_cost > cap;
  el.innerHTML = '<div class="estimate-box">' +
    '<div class="amount ' + (data.free ? 'free' : 'paid') + '">' +
      (data.free ? 'Free' : '$' + data.estimated_cost.toFixed(4)) + '</div>' +
    '<div class="muted" style="font-size:13px;margin-top:2px">' +
      data.query_count + ' quer' + (data.query_count === 1 ? 'y' : 'ies') +
      (data.free ? '' : ' &middot; cap is $' + cap.toFixed(2)) + '</div>' +
    (over ? '<div class="test-result error" style="margin-top:12px">' +
      'Over your cap. Raise the cap or narrow the search.</div>' : '') +
    '<div class="query-list">' +
      data.queries.slice(0, 40).map(escHtml).join('<br>') +
      (data.queries.length > 40 ? '<br>… and ' + (data.queries.length - 40) + ' more' : '') +
    '</div></div>';

  const btn = document.getElementById('disc-run');
  btn.disabled = over;
  btn.textContent = over ? 'Over cap'
    : (data.free ? 'Run — free' : 'Run — spend up to $' + data.estimated_cost.toFixed(2));
}

async function runDiscovery() {
  const btn = document.getElementById('disc-run');
  btn.disabled = true;
  btn.textContent = 'Running…';
  const data = await api('/api/discover/run', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(discoverBody()),
  });
  if (data && data.success) {
    showToast('Discovery started — ' + data.queries + ' queries.', 'success');
  } else {
    showToast((data && data.message) || 'Could not start.', 'error');
    btn.disabled = false;
  }
  loadDiscoverProviders();
}

async function stopDiscovery() {
  const data = await api('/api/discover/stop', {method: 'POST'});
  showToast(data && data.success ? 'Stopping after the current query.'
                                 : 'Could not stop.', data ? 'success' : 'error');
  loadDiscoverProviders();
}

function renderDiscoverResult(report, running) {
  const el = document.getElementById('discover-result');
  if (running) {
    el.innerHTML = '<div class="card"><h2>Running…</h2>' +
      '<p class="muted" style="font-size:13px">Harvey is working through the ' +
      'queries. Results land in Companies, and the run log is on Today.</p></div>';
    return;
  }
  if (!report) { el.innerHTML = ''; return; }

  const stat = (label, value, tone) =>
    '<div class="stat-card"><div class="label">' + label + '</div>' +
    '<div class="value"' + (tone ? ' style="color:var(--' + tone + ')"' : '') + '>' +
    value + '</div></div>';

  el.innerHTML = '<div class="subhead">Last run</div>' +
    '<div class="stats-grid">' +
      stat('New companies', report.new_companies || 0, 'accent') +
      stat('Already known', report.known_companies || 0) +
      stat('Observations', report.observations || 0) +
      stat('Filtered as junk', report.junk || 0) +
      stat('Actual cost', report.actual_cost ? '$' + report.actual_cost.toFixed(4) : 'free') +
    '</div>' +
    (report.stopped ? '<div class="test-result error" style="margin-top:14px">' +
      'Stopped early: ' + escHtml(report.stopped) + '</div>' : '') +
    ((report.errors || []).length
      ? '<div class="card" style="margin-top:14px"><h2>Problems</h2>' +
        (report.errors || []).slice(0, 8).map(e =>
          '<div class="check-help">' + escHtml(e) + '</div>').join('') + '</div>'
      : '');
}

// ── Cohort builder: a prospect list is a query ──

let _cohort = { require: new Set(), exclude: new Set() };

function renderCohortBuilder() {
  const el = document.getElementById('cohort-builder');
  if (!el || !_signals) return;

  const confirmed = (_signals.groups || [])
    .flatMap(g => g.signals)
    .filter(s => s.status === 'confirmed');

  if (!confirmed.length) {
    el.innerHTML = '<p class="muted" style="font-size:13px">' +
      'Confirm some signals above and they become the building blocks here.</p>';
    document.getElementById('cohort-result').innerHTML = '';
    return;
  }

  const col = (title, key, hint) =>
    '<div><div class="subhead" style="margin-top:0">' + title +
      ' <span class="muted" style="font-weight:400;text-transform:none;letter-spacing:0">' +
      hint + '</span></div><div class="cohort-grid">' +
    confirmed.map(s =>
      '<label class="cohort-pick"><input type="checkbox" ' +
        (_cohort[key].has(s.code) ? 'checked ' : '') +
        'onchange="toggleCohort(\'' + key + '\',\'' + s.code + '\',this.checked)">' +
        '<span>' + escHtml(s.label || s.code) + '</span>' +
        '<span class="n">' + (s.companies || 0) + '</span></label>'
    ).join('') + '</div></div>';

  el.innerHTML = col('Must have', 'require', '&mdash; every company in the cohort carries all of these') +
    '<div style="height:18px"></div>' +
    col('Must not have', 'exclude', '&mdash; disqualifiers');
}

function toggleCohort(key, code, on) {
  if (on) _cohort[key].add(code); else _cohort[key].delete(code);
  // A company can't be both required and excluded on the same signal.
  const other = key === 'require' ? 'exclude' : 'require';
  if (on) _cohort[other].delete(code);
  runCohort();
  renderCohortBuilder();
}

async function runCohort() {
  const el = document.getElementById('cohort-result');
  if (!el) return;
  const require = [..._cohort.require], exclude = [..._cohort.exclude];
  if (!require.length) { el.innerHTML = ''; return; }

  const data = await api('/api/cohort', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({require: require, exclude: exclude}),
  });
  if (!data) { el.innerHTML = ''; return; }

  let html = '<div style="border-top:1px solid var(--border);margin-top:20px;padding-top:20px">' +
    '<div class="cohort-size">' + data.size + '</div>' +
    '<div class="muted" style="font-size:13px;margin-top:2px">compan' +
      (data.size === 1 ? 'y matches' : 'ies match') + ' this cohort right now</div>';

  if (data.companies && data.companies.length) {
    html += '<div class="table-card" style="margin-top:16px"><table><thead><tr>' +
      '<th>Company</th><th>Domain</th><th>Industry</th><th>Location</th>' +
      '</tr></thead><tbody>' +
      data.companies.slice(0, 50).map(c =>
        '<tr><td>' + escHtml(c.name) + '</td><td class="muted">' + escHtml(c.domain) + '</td>' +
        '<td class="muted">' + escHtml(c.industry) + '</td>' +
        '<td class="muted">' + escHtml(c.location) + '</td></tr>'
      ).join('') + '</tbody></table></div>';
    if (data.size > 50) {
      html += '<p class="muted" style="font-size:12px;margin-top:10px">Showing the first 50.</p>';
    }
  } else if (data.size === 0) {
    html += '<p class="muted" style="font-size:13px;margin-top:12px">' +
      'No company carries all of those yet. Either loosen the cohort, or run ' +
      'prospecting to collect more.</p>';
  }
  el.innerHTML = html + '</div>';
}

// ── Settings ──

async function loadSettings() {
  const data = await api('/api/settings');
  if (!data) return;

  // Active provider indicator
  const prov = data.provider || 'instantly';
  const provEl = document.getElementById('active-provider');
  if (provEl) provEl.textContent = prov;

  // Secret fields never echo a value — show a "saved" placeholder instead.
  const savedPh = (id, isSet, base) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.value = '';
    el.placeholder = isSet ? 'Saved — enter new value to change' : base;
  };
  const tag = (id, ok, okLabel) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.className = 'email-tag ' + (ok ? 'verified' : 'guess');
    el.textContent = ok ? okLabel : 'not set';
  };

  // Non-secret values repopulate
  document.getElementById('gmail-id').value = data.gmail_client_id || '';
  document.getElementById('smtp-host').value = data.smtp_host || '';
  document.getElementById('smtp-port').value = data.smtp_port || '';
  document.getElementById('smtp-user').value = data.smtp_username || '';
  document.getElementById('linkedin-email').value = data.linkedin_email || '';
  document.getElementById('cf-account-id').value = data.cloudflare_account_id || '';

  savedPh('gmail-secret', data.gmail_client_secret_set, 'Enter client secret');
  savedPh('smtp-pass', data.smtp_password_set, 'Enter password / app password');
  savedPh('instantly-key', data.instantly_api_key_set, 'Enter your Instantly API key');
  savedPh('reoon-key', data.reoon_api_key_set, '600 free/mo — reoon.com/email-verifier');
  savedPh('zerobounce-key', data.zerobounce_api_key_set, '100 free/mo — best for M365/Workspace catch-alls');
  savedPh('hunter-key', data.hunter_api_key_set, '50 free/mo + email-pattern lookup');
  savedPh('linkedin-password', data.linkedin_password_set, 'Enter password');
  savedPh('cf-api-token', data.cloudflare_api_token_set, 'Your Cloudflare API Token');

  // Gmail auth status chip
  const g = document.getElementById('gmail-status');
  if (g) {
    if (data.gmail_authorized) { g.className = 'email-tag verified'; g.textContent = 'authorized'; }
    else if (data.gmail_client_secret_set) { g.className = 'email-tag risky'; g.textContent = 'run: harvey gmail auth'; }
    else { g.className = 'email-tag guess'; g.textContent = 'not set up'; }
  }
  tag('reoon-status', data.reoon_api_key_set, 'set');
  tag('zerobounce-status', data.zerobounce_api_key_set, 'set');
  tag('hunter-status', data.hunter_api_key_set, 'set');
}

function saveGmail() {
  const payload = {GMAIL_CLIENT_ID: document.getElementById('gmail-id').value.trim()};
  const sec = document.getElementById('gmail-secret').value;
  if (sec) payload.GMAIL_CLIENT_SECRET = sec;
  saveEnv(payload, 'Gmail OAuth saved. Now run "harvey gmail auth" in your terminal.').then(loadSettings);
}

function saveSmtp() {
  const payload = {
    SMTP_HOST: document.getElementById('smtp-host').value.trim(),
    SMTP_PORT: document.getElementById('smtp-port').value.trim(),
    SMTP_USERNAME: document.getElementById('smtp-user').value.trim(),
  };
  const pass = document.getElementById('smtp-pass').value;
  if (pass) payload.SMTP_PASSWORD = pass;
  saveEnv(payload, 'SMTP settings saved.').then(loadSettings);
}

function saveVerifiers() {
  const payload = {};
  const r = document.getElementById('reoon-key').value;
  const z = document.getElementById('zerobounce-key').value;
  const h = document.getElementById('hunter-key').value;
  if (r) payload.REOON_API_KEY = r;
  if (z) payload.ZEROBOUNCE_API_KEY = z;
  if (h) payload.HUNTER_API_KEY = h;
  if (!Object.keys(payload).length) { showToast('Enter at least one key first.', 'error'); return; }
  saveEnv(payload, 'Verification keys saved.').then(loadSettings);
}

async function saveEnv(payload, okMsg) {
  const data = await api('/api/settings/env', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(payload)
  });
  if (data && data.success) showToast(okMsg, 'success');
  else showToast((data && data.message) || 'Save failed — is the dashboard still running?', 'error');
}

function saveInstantly() {
  saveEnv({INSTANTLY_API_KEY: document.getElementById('instantly-key').value.trim()}, 'Instantly API key saved.');
}

function saveLinkedIn() {
  const payload = {LINKEDIN_EMAIL: document.getElementById('linkedin-email').value.trim()};
  const pass = document.getElementById('linkedin-password').value;
  if (pass) payload.LINKEDIN_PASSWORD = pass;
  saveEnv(payload, 'LinkedIn credentials saved.');
}

function saveCloudflare() {
  saveEnv({
    CLOUDFLARE_ACCOUNT_ID: document.getElementById('cf-account-id').value.trim(),
    CLOUDFLARE_API_TOKEN: document.getElementById('cf-api-token').value.trim()
  }, 'Cloudflare credentials saved.');
}

async function testInstantly() {
  const key = document.getElementById('instantly-key').value.trim();
  const el = document.getElementById('instantly-test-result');
  el.innerHTML = '<div class="test-result pending">Testing&hellip;</div>';
  const data = await api('/api/settings/test-instantly', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({api_key: key})
  });
  if (!data) {
    el.innerHTML = '<div class="test-result error">Could not reach the dashboard server.</div>';
    return;
  }
  el.innerHTML = '<div class="test-result ' + (data.success ? 'success' : 'error') + '">' + escHtml(data.message) + '</div>';
}

// ── Controls ──

async function loadHarveyStatus() {
  const data = await api('/api/harvey/status');
  const headerDot = document.getElementById('header-dot');
  const headerText = document.getElementById('header-status-text');

  if (!data) {
    headerDot.className = 'status-dot offline';
    headerText.textContent = 'Offline';
    return;
  }
  const running = !!data.running;

  headerDot.className = 'status-dot ' + (running ? 'running' : 'stopped');
  headerText.textContent = running ? 'Harvey is running' : 'Harvey is stopped';
  document.getElementById('control-dot').className = 'dot ' + (running ? 'running' : 'stopped');
  const label = document.getElementById('control-label');
  label.className = 'label ' + (running ? 'running' : 'stopped');
  label.textContent = running ? 'Running' : 'Stopped';

  const meta = document.getElementById('control-meta');
  if (running && data.pid) {
    let info = 'PID ' + escHtml(String(data.pid));
    if (data.started_at) info += ' &middot; started ' + formatDate(data.started_at);
    meta.innerHTML = info;
  } else {
    meta.innerHTML = 'Harvey wakes every few minutes, does what needs doing, and sleeps.';
  }

  document.getElementById('btn-start').style.display = running ? 'none' : '';
  document.getElementById('btn-stop').style.display = running ? '' : 'none';
}

async function startHarvey() {
  const btn = document.getElementById('btn-start');
  btn.disabled = true;
  const data = await api('/api/harvey/start', {method: 'POST'});
  if (data && data.success) showToast('Harvey started.', 'success');
  else showToast((data && data.message) || 'Failed to start.', 'error');
  btn.disabled = false;
  loadHarveyStatus();
}

async function stopHarvey() {
  const btn = document.getElementById('btn-stop');
  btn.disabled = true;
  const data = await api('/api/harvey/stop', {method: 'POST'});
  if (data && data.success) showToast('Harvey stopped.', 'success');
  else showToast((data && data.message) || 'Failed to stop.', 'error');
  btn.disabled = false;
  loadHarveyStatus();
}

async function loadLogs() {
  const data = await api('/api/harvey/logs');
  const el = document.getElementById('log-viewer');
  if (data && data.lines && data.lines.length) {
    const stick = el.scrollTop + el.clientHeight >= el.scrollHeight - 30;
    el.textContent = data.lines.join('\n');
    if (stick) el.scrollTop = el.scrollHeight;
  } else {
    el.textContent = 'No logs yet. Start Harvey to see activity.';
  }
}

// ── Pipeline data ──

async function loadStats() {
  const grid = document.getElementById('stats-grid');
  const data = await api('/api/stats');
  if (!data) { grid.innerHTML = offlineState(); return; }
  if (data.error) {
    grid.innerHTML = emptyState('&#9670;', 'No pipeline data yet',
      'Start Harvey from the <b>Controls</b> tab and it will begin prospecting, writing, and sending on its own.');
    return;
  }
  const p = data.prospects || {}, c = data.campaigns || {}, v = data.conversations || {};
  const chips = (map) => {
    const entries = Object.entries(map || {});
    if (!entries.length) return '<span class="chip muted">none yet</span>';
    return entries.map(([k, n]) =>
      '<span class="chip">' + escHtml(k) + ' <b>' + escHtml(String(n)) + '</b></span>'
    ).join('');
  };
  const card = (label, value, breakdown) =>
    '<div class="stat-card"><div class="label">' + label + '</div>' +
    '<div class="value">' + value + '</div>' +
    '<div class="breakdown">' + breakdown + '</div></div>';

  grid.innerHTML =
    card('Prospects', p.total || 0, chips(p.by_status)) +
    card('Campaigns', c.total || 0, chips(c.by_status)) +
    card('Conversations', v.total || 0, chips(v.by_status)) +
    card('Actions Logged', data.actions_total || 0, brainCallChips(data));
}

// Calls today per subscription — each labelled with the provider it ran on.
function brainCallChips(data) {
  const chip = (label, n) => '<span class="chip">' + label + ' calls today <b>' + escHtml(String(n || 0)) + '</b></span>';
  const codex = data.codex_calls_today || 0;
  const st = data.brain_status || {};
  // A paused brain must not look healthy: say so, and why.
  const paused = st.status === 'paused'
    ? '<span class="chip" title="' + escHtml(st.reason || '') + '">' +
      escHtml(st.provider === 'codex' ? 'Codex' : 'Brain') + ' <b>paused</b>: ' +
      escHtml((st.reason || '').slice(0, 120)) + '</span>'
    : '';
  if (data.brain_provider === 'codex') {
    return paused + chip('Codex', codex) + (data.claude_calls_today ? chip('Claude', data.claude_calls_today) : '');
  }
  return paused + chip('Claude', data.claude_calls_today) + (codex ? chip('Codex', codex) : '');
}

function fmtTokens(n) {
  n = n || 0;
  if (n >= 1e9) return (n / 1e9).toFixed(1) + 'B';
  if (n >= 1e6) return (n / 1e6).toFixed(1) + 'M';
  if (n >= 1e3) return (n / 1e3).toFixed(1) + 'k';
  return String(n);
}


function emailTag(p) {
  if (!p.email) return '';
  // Fall back to the legacy boolean for rows predating email_status.
  const status = p.email_status || (p.email_verified ? 'verified' : 'guess');
  if (!STATUS[status]) return '';
  const m = statusMeta(status);
  return ' <span class="badge t-' + m.tone + '" style="margin-left:6px">' + escHtml(m.label) + '</span>';
}

// Quota gauges for the ACTIVE provider only: Claude's are the numbers
// `/usage` shows in Claude Code; Codex's are the ChatGPT plan's limits.
// When they can't be read, say so rather than hiding the card.
function quotaCardHtml(data) {
  const provider = data && data.quota_provider;
  if (!provider) return '';
  const title = provider === 'codex' ? 'Codex (ChatGPT plan) Quota' : 'Claude Subscription Quota';
  let html = '<h2>' + escHtml(title) + '</h2>';
  if (!data.quota || !Object.keys(data.quota).length) {
    const why = provider === 'codex'
      ? "Quota unavailable: Harvey couldn't read your ChatGPT plan's limits (check codex login, the Codex CLI version, and network)."
      : "Quota unavailable: Harvey couldn't read your Claude subscription's limits (check claude login and network).";
    return html + '<p class="muted">' + escHtml(why) + ' Until it can, budgets count Harvey\'s own calls.</p>';
  }
  const labels = {five_hour: '5-hour window', seven_day: 'Weekly', primary: 'Primary window',
                  secondary: 'Secondary window', limit_reached: 'Usage limit reached'};
  for (const [key, w] of Object.entries(data.quota)) {
    const pct = Math.min(100, Math.max(0, w.utilization || 0));
    const color = pct >= 80 ? 'yellow' : 'green';
    const resets = w.resets_at ? 'resets ' + formatDate(w.resets_at) : '';
    html += '<div class="progress-wrap">' +
      '<div class="progress-label">' +
        '<span class="text">' + escHtml(labels[key] || key) + (resets ? ' &middot; ' + escHtml(resets) : '') + '</span>' +
        '<span class="pct">' + pct.toFixed(0) + '%</span>' +
      '</div>' +
      '<div class="progress-bar"><div class="progress-fill ' + color + '" style="width:' + pct + '%"></div></div>' +
    '</div>';
  }
  return html;
}

// ── Openers: WhatsApp first-message A/B/C test ──

const OPENER_NAMES = { A: 'Original', B: 'Pergunta curta', C: 'Motivo + pergunta rápida' };
const OPENER_MIN_SAMPLE = 40;

async function loadOpeners() {
  const data = await api('/api/openers');
  const statsEl = document.getElementById('openers-stats');
  const tableEl = document.getElementById('openers-table');
  const exEl = document.getElementById('openers-examples');
  if (!data) { statsEl.innerHTML = offlineState(); return; }
  if (data.error) { statsEl.innerHTML = emptyState('&#9888;', 'Erro ao carregar', escHtml(data.error)); return; }

  const stats = data.stats || [];
  const active = new Set(data.active || []);
  if (!stats.length) {
    statsEl.innerHTML = emptyState('&#9993;', 'Nenhuma abertura enviada ainda',
      'Assim que o Harvey mandar as primeiras mensagens frias, a comparação aparece aqui.');
    tableEl.style.display = 'none'; exEl.innerHTML = '';
    return;
  }
  const pct = x => Math.round((x || 0) * 100) + '%';
  const best = Math.max(...stats.filter(s => s.sent >= OPENER_MIN_SAMPLE).map(s => s.rate), -1);
  const openerColors = ['var(--chart-1)', 'var(--chart-2)', 'var(--chart-4)'];

  statsEl.innerHTML = '<div class="metrics" style="margin-bottom:20px">' + stats.map((s, idx) => {
    const isBest = s.sent >= OPENER_MIN_SAMPLE && s.rate === best;
    const color = openerColors[idx % openerColors.length];
    const rateVal = Math.round((s.rate || 0) * 100);
    const tag = active.has(s.variant) ? '<span class="badge t-good" style="font-size:10px">ativa</span>' : '<span class="badge t-idle" style="font-size:10px">aposentada</span>';
    const lead = isBest ? ' <span class="badge t-note" style="font-size:10px">melhor</span>' : '';
    const small = s.sent < OPENER_MIN_SAMPLE ? ' <span class="cost-chip" style="font-size:10px">amostra pequena</span>' : '';

    return '<div class="pb-metric">' +
      '<div class="pb-metric__label" style="display:flex;justify-content:space-between;align-items:center">' +
        '<span>Variante ' + escHtml(s.variant) + ' · ' + escHtml(OPENER_NAMES[s.variant] || '') + '</span>' +
        '<span>' + tag + lead + '</span>' +
      '</div>' +
      '<div class="pb-metric__body">' +
        '<div style="display:flex;flex-direction:column;justify-content:space-between;min-width:0">' +
          '<div class="pb-metric__value">' + pct(s.rate) + '</div>' +
          '<div style="margin-top:4px">' + renderSegmentBar(rateVal, 10, color, 'var(--chart-track)', 10, 3) + '</div>' +
          '<div class="pb-metric__delta" style="color:var(--text-secondary);font-size:11px;margin-top:6px">' +
            s.replied + ' humanas de ' + s.sent + ' envios' + small +
          '</div>' +
        '</div>' +
        renderMiniChart([0.35, Math.min(1, Math.max(0.2, (s.rate || 0) * 2)), 0.65], 1, 'blue', color) +
      '</div>' +
    '</div>';
  }).join('') + '</div>';

  let h = '<h2>Comparação</h2><div class="table-card"><table><thead><tr>' +
    '<th>Variante</th><th>Enviadas</th><th>Humanas</th><th>Taxa humana</th><th>Só automáticas</th><th>Interesse registrado</th>' +
    '<th>Recusaram</th><th>Reuniões</th><th>Últimos 7 dias</th><th>Período</th></tr></thead><tbody>';
  for (const s of stats) {
    h += '<tr><td><b>' + escHtml(s.variant) + '</b> <span class="muted">' + escHtml(OPENER_NAMES[s.variant] || '') + '</span></td>' +
      '<td>' + s.sent + '</td><td>' + s.replied + '</td><td><b>' + pct(s.rate) + '</b></td>' +
      '<td>' + (s.automatic_only || 0) + '</td><td>' + (s.interested || 0) + '</td>' +
      '<td>' + s.refused + '</td><td>' + s.meetings + '</td>' +
      '<td>' + s.replied_7d + '/' + s.sent_7d + ' <span class="muted">(' + pct(s.rate_7d) + ')</span></td>' +
      '<td class="muted">' + formatDate(s.first_sent) + ' → ' + formatDate(s.last_sent) + '</td></tr>';
  }
  tableEl.innerHTML = h + '</tbody></table></div>' +
    '<p class="muted" style="margin-top:10px">Contatos marcados como teste ficam fora da comparação. Resposta humana inclui saudações e recusas. Interesse é a classificação registrada, não uma ativação ou venda confirmada.</p>';
  tableEl.style.display = 'block';

  const examples = data.examples || {};
  exEl.innerHTML = Object.keys(examples).sort().map(v => {
    const rows = examples[v].map(e =>
      '<div style="padding:10px 0;border-top:1px solid var(--border)">' +
        '<div style="display:flex;justify-content:space-between;gap:8px;font-size:12px;margin-bottom:4px">' +
          '<b>' + escHtml(e.company) + '</b>' +
          '<span>' + (e.replied ? badge('replied') : e.automatic_only ? '<span class="badge t-idle">resposta automática</span>' : '<span class="badge t-idle">sem resposta</span>') +
          ' <span class="muted">' + formatDate(e.sent_at) + '</span></span>' +
        '</div>' +
        '<div style="white-space:pre-wrap;font-size:13px">' + escHtml(e.body) + '</div>' +
      '</div>').join('');
    return '<div class="card"><h2>Últimas da ' + escHtml(v) + ' · ' + escHtml(OPENER_NAMES[v] || '') + '</h2>' + rows + '</div>';
  }).join('');
}

async function loadUsage() {
  const data = await api('/api/usage');
  const statsEl = document.getElementById('usage-stats');
  if (!data) { statsEl.innerHTML = offlineState(); return; }

  const quotaEl = document.getElementById('usage-quota');
  const qHtml = quotaCardHtml(data);
  quotaEl.innerHTML = qHtml;
  quotaEl.style.display = qHtml ? 'block' : 'none';

  // Totals cards — usage-first (calls is the headline; tokens as chips).
  // No dollars: on a subscription plan usage isn't billed per token.
  const t = data.totals || {};
  const card = (label, p, tone, color, levels, highlight) => {
    p = p || {};
    const outT = fmtTokens(p.output_tokens);
    const inT = fmtTokens(p.input_tokens);
    const cacheT = fmtTokens(p.cache_read_tokens);

    return renderMetricCard({
      label: label,
      value: (p.calls || 0).toLocaleString() + ' calls',
      delta: 'out ' + outT + ' · in ' + inT + ' · cached ' + cacheT,
      tone: tone || 'blue',
      color: color || 'var(--chart-1)',
      levels: levels || [0.4, 0.8, 1],
      highlight: highlight !== undefined ? highlight : 2
    });
  };

  statsEl.innerHTML = '<div class="metrics" style="margin-bottom:20px">' +
    card('Today', t.today, 'blue', 'var(--chart-1)', [0.4, 1, 0.6], 1) +
    card('Last 7 Days', t.week, 'pink', 'var(--chart-2)', [0.6, 0.8, 1], 2) +
    card('Last 30 Days', t.month, 'azure', 'var(--chart-3)', [0.7, 1, 0.85], 1) +
  '</div>';

  // Daily bars — output tokens per day (the work done)
  const dailyEl = document.getElementById('usage-daily');
  const days = data.by_day || [];
  if (days.length) {
    const maxOut = Math.max(...days.map(d => d.output_tokens || 0), 1);
    let dHtml = '<h2>Daily Output Tokens (30 days)</h2>';
    for (const d of days.slice(-30)) {
      const pct = Math.max(2, (d.output_tokens || 0) / maxOut * 100);
      dHtml += '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;font-size:12px">' +
        '<span class="muted" style="width:78px;flex-shrink:0;font-family:var(--mono)">' + escHtml(d.day || '') + '</span>' +
        '<div style="flex:1;background:rgba(255,255,255,0.05);border-radius:99px;height:10px;overflow:hidden">' +
          '<div style="width:' + pct + '%;height:100%;border-radius:99px;background:linear-gradient(90deg,var(--accent-deep),var(--accent))"></div>' +
        '</div>' +
        '<span style="width:130px;text-align:right;font-variant-numeric:tabular-nums">' + fmtTokens(d.output_tokens) + ' out' +
          ' <span class="muted">&middot; ' + (d.calls || 0) + ' calls</span></span>' +
      '</div>';
    }
    dailyEl.innerHTML = dHtml;
    dailyEl.style.display = 'block';
  } else {
    dailyEl.style.display = 'none';
  }

  // Breakdown tables — calls + tokens, no cost column
  const tablesEl = document.getElementById('usage-tables');
  const table = (title, rows, keyName) => {
    if (!rows || !rows.length) return '';
    let h = '<div class="card"><h2>' + title + '</h2><div class="table-card"><table><thead><tr>' +
      '<th>' + keyName + '</th><th>Calls</th><th>Input</th><th>Output</th><th>Cache read</th>' +
      '</tr></thead><tbody>';
    for (const r of rows) {
      h += '<tr><td>' + escHtml(String(r[keyName.toLowerCase()] || '')) + '</td>' +
        '<td>' + (r.calls || 0) + '</td>' +
        '<td class="muted">' + fmtTokens(r.input_tokens) + '</td>' +
        '<td>' + fmtTokens(r.output_tokens) + '</td>' +
        '<td class="muted">' + fmtTokens(r.cache_read_tokens) + '</td></tr>';
    }
    return h + '</tbody></table></div></div>';
  };

  const anyRows = (data.by_agent || []).length || (data.by_task || []).length;
  if (!anyRows) {
    tablesEl.innerHTML = emptyState('&#9680;', 'No usage recorded yet',
      'Once Harvey starts making model calls (Claude or Codex), every one is logged here with exact calls and tokens by provider, agent and task.');
  } else {
    const providers = data.by_provider || [];
    const showProviders = providers.length > 1 || (providers.length === 1 && providers[0].provider !== 'claude');
    tablesEl.innerHTML =
      (showProviders ? table('By Provider (30 days)', providers, 'Provider') : '') +
      table('By Agent (30 days)', data.by_agent, 'Agent') +
      table('By Task (30 days)', data.by_task, 'Task') +
      table('By Model (30 days)', data.by_model, 'Model');
  }
}

// ── Outbox: a decisions desk, not a wall of drafts ──
//
// Approving mail is a queue of one-at-a-time judgements. Showing all of them
// stacked invites a single "approve all" reflex, which is exactly the review
// the approval ladder exists to prevent. One email fills the pane; the rest
// wait in the rail.

async function loadOutbox() {
  const data = await api('/api/outbox');
  const banner = document.getElementById('outbox-banner');
  const desk = document.getElementById('outbox-desk');
  const list = document.getElementById('outbox-list');
  const actions = document.getElementById('outbox-actions');
  if (!data) { desk.innerHTML = offlineState(); list.innerHTML = ''; return; }

  const pending = data.pending || [];
  _desk.items = pending;
  if (_desk.i >= pending.length) _desk.i = Math.max(0, pending.length - 1);
  navCount('nav-outbox', pending.length);

  actions.innerHTML =
    (pending.length && !data.paused
      ? '<button class="btn btn-primary btn-sm" onclick="outboxApproveAll()">Approve all ' +
        pending.length + '</button>' : '') +
    (data.paused
      ? '<button class="btn btn-secondary btn-sm" onclick="sendingToggle(\'resume\')">' +
        'Resume sending</button>'
      : '<button class="btn btn-secondary btn-sm" onclick="sendingToggle(\'pause\')">' +
        'Pause all sending</button>');

  // The kill switch gets a banner only when it's actually on — a permanent
  // bar for a thing that isn't happening is just noise.
  banner.innerHTML = data.paused
    ? '<div class="card" style="border-color:var(--red);margin-bottom:16px">' +
        '<h2 style="color:var(--red)">&#9888; Sending is paused</h2>' +
        '<p style="color:var(--text-2);font-size:13px">' + escHtml(data.paused) +
        '. Approved mail stays queued until you resume.</p></div>'
    : '';

  desk.innerHTML = pending.length ? renderDesk(pending, _desk.i) :
    '<div class="card">' + emptyState('&#10003;', 'Nothing to review',
      'Every draft Harvey writes lands here first. Approve one and it sends on schedule.') +
    '</div>';

  const table = (title, rows, cols) => {
    if (!rows || !rows.length) return '';
    let h = '<div class="card"><h2>' + title + '</h2><div class="table-card"><table><thead><tr>' +
      cols.map(c => '<th>' + c[0] + '</th>').join('') + '</tr></thead><tbody>';
    for (const r of rows) {
      h += '<tr>' + cols.map(c => '<td' + (c[2] ? ' class="muted"' : '') + '>' +
        (c[3] ? c[1](r) : escHtml(String(c[1](r) ?? ''))) + '</td>').join('') + '</tr>';
    }
    return h + '</tbody></table></div></div>';
  };

  list.innerHTML =
    table('Approved &amp; scheduled', data.approved, [
      ['To', r => r.to_email], ['Step', r => r.step], ['Subject', r => r.subject],
      ['Sends', r => formatDate(r.send_at), true],
    ]) +
    table('Recently sent', data.sent, [
      ['To', r => r.to_email], ['Step', r => r.step], ['Subject', r => r.subject],
      ['Sent', r => formatDate(r.sent_at), true],
    ]) +
    table('Didn\'t send', data.failed, [
      ['To', r => r.to_email], ['Status', r => badge(r.status), false, true],
      ['Reason', r => r.error, true], ['Updated', r => formatDate(r.updated_at), true],
    ]);
}

function renderDesk(items, i) {
  const cur = items[i];
  const rail = items.map((it, n) =>
    '<div class="desk-item ' + (n === i ? 'active' : '') + '" onclick="deskGo(' + n + ')">' +
      '<div class="to">' + escHtml(it.to_email) + '</div>' +
      '<div class="sub">' + escHtml(it.subject || '(no subject)') + '</div>' +
    '</div>').join('');

  return '<div class="desk">' +
    '<div class="desk-list">' + rail + '</div>' +
    '<div class="desk-pane">' +
      '<div class="to-line">To <b>' + escHtml(cur.to_email) + '</b> &middot; step ' +
        cur.step + ' (' + escHtml(cur.kind) + ') &middot; sends ' +
        formatDate(cur.send_at) + '</div>' +
      '<div class="subject">' + escHtml(cur.subject || '(no subject)') + '</div>' +
      '<div class="body">' + escHtml(cur.body) + '</div>' +
      '<div class="desk-actions">' +
        '<button class="btn btn-primary" onclick="outboxAct(\'' + cur.id + '\',\'approve\')">' +
          'Approve <kbd>A</kbd></button>' +
        '<button class="btn btn-secondary" onclick="outboxAct(\'' + cur.id + '\',\'reject\')">' +
          'Reject <kbd>R</kbd></button>' +
        '<span class="muted" style="font-size:12px;margin-left:auto">' +
          (i + 1) + ' of ' + items.length + '</span>' +
      '</div>' +
    '</div></div>';
}

function deskGo(n) {
  if (n < 0 || n >= _desk.items.length) return;
  _desk.i = n;
  document.getElementById('outbox-desk').innerHTML = renderDesk(_desk.items, n);
}

// Keyboard review. Ignored while typing into a field, so Settings still works.
document.addEventListener('keydown', e => {
  if (document.body.classList.contains('nav-open') || currentTab !== 'outbox' || e.metaKey || e.ctrlKey || e.altKey) return;
  const tag = (e.target.tagName || '').toLowerCase();
  if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
  const cur = _desk.items[_desk.i];
  const k = e.key.toLowerCase();
  if (k === 'j') { e.preventDefault(); deskGo(_desk.i + 1); }
  else if (k === 'k') { e.preventDefault(); deskGo(_desk.i - 1); }
  else if (k === 'a' && cur) { e.preventDefault(); outboxAct(cur.id, 'approve'); }
  else if (k === 'r' && cur) { e.preventDefault(); outboxAct(cur.id, 'reject'); }
});

async function outboxAct(id, action) {
  const data = await api('/api/outbox/' + encodeURIComponent(id) + '/' + action, {method: 'POST'});
  if (data && data.success) showToast(action === 'approve' ? 'Approved — will send on schedule.' : 'Rejected.', 'success');
  else showToast('Action failed.', 'error');
  loadOutbox();
}

async function outboxApproveAll() {
  const data = await api('/api/outbox/approve-all', {method: 'POST'});
  if (data && data.success) showToast('Approved ' + data.approved + ' email(s).', 'success');
  else showToast('Approve-all failed.', 'error');
  loadOutbox();
}

async function sendingToggle(action) {
  const data = await api('/api/sending/' + action, {method: 'POST'});
  if (data && data.success) showToast(action === 'pause' ? 'Sending paused.' : 'Sending resumed.', 'success');
  else showToast('Failed.', 'error');
  loadOutbox();
}

async function loadCompanies() {
  companyDrill = false;
  const el = document.getElementById('companies-list');
  const data = await api('/api/companies');
  if (!data) { el.innerHTML = offlineState(); return; }
  _companies = data;
  if (!data.length) {
    el.innerHTML = emptyState('&#9906;', 'No companies yet',
      'Harvey\'s Scout agent hasn\'t researched any companies. Finish <b>Setup</b>, then start Harvey from the <b>Controls</b> tab.');
    return;
  }
  let html = '<div class="table-card"><table><thead><tr><th>Company</th><th>Domain</th><th>Industry</th><th>Size</th><th>Location</th><th>Contacts</th><th>Source</th><th>Added</th></tr></thead><tbody>';
  data.forEach((c, i) => {
    const website = c.website || (c.domain ? 'https://' + c.domain : '');
    const nameLink = website
      ? '<a href="' + escHtml(website) + '" target="_blank" rel="noopener" onclick="event.stopPropagation()">' + escHtml(c.name) + '</a>'
      : escHtml(c.name);
    html += '<tr style="cursor:pointer" onclick="showCompanyContacts(' + i + ')">' +
      '<td>' + nameLink + '</td><td class="muted">' + escHtml(c.domain) + '</td><td>' + escHtml(c.industry) + '</td>' +
      '<td>' + escHtml(c.company_size) + '</td><td>' + escHtml(c.location) + '</td>' +
      '<td>' + (c.contact_count || 0) + '</td><td class="muted">' + escHtml(c.source) + '</td>' +
      '<td class="muted">' + formatDate(c.created_at) + '</td></tr>';
  });
  el.innerHTML = html + '</tbody></table></div>';
}

async function showCompanyContacts(index) {
  const company = _companies[index];
  if (!company) return;
  companyDrill = true;
  const el = document.getElementById('companies-list');
  const data = await api('/api/companies/' + encodeURIComponent(company.id) + '/contacts');
  let html = '<div class="card"><h2>' + escHtml(company.name) + ' — Contacts</h2>' +
    '<button class="btn btn-secondary btn-sm" onclick="loadCompanies()" style="margin-bottom:16px">&larr; Back to Companies</button>';
  if (!data || !data.length) {
    html += '<p style="color:var(--text-3);font-size:13px">No contacts found at this company yet.</p></div>';
  } else {
    html += '<div class="table-card"><table><thead><tr><th>Name</th><th>Title</th><th>Email</th><th>Phone</th><th>LinkedIn</th><th>Status</th><th>Source</th></tr></thead><tbody>';
    for (const p of data) {
      const emailIcon = emailTag(p);
      const phoneIcon = p.phone_verified ? ' <span class="verified">&#10003;</span>' : '';
      html += '<tr><td>' + escHtml(p.first_name) + ' ' + escHtml(p.last_name) + '</td>' +
        '<td>' + escHtml(p.title) + '</td><td>' + escHtml(p.email) + emailIcon + '</td>' +
        '<td>' + escHtml(p.phone) + phoneIcon + '</td>' +
        '<td>' + (p.linkedin_url ? '<a href="' + escHtml(p.linkedin_url) + '" target="_blank" rel="noopener">Profile</a>' : '') + '</td>' +
        '<td>' + badge(p.status) + '</td><td class="muted">' + escHtml(p.source) + '</td></tr>';
    }
    html += '</tbody></table></div></div>';
  }
  el.innerHTML = html;
}

async function submitFeedback(entityType, entityId, promptText) {
  const comment = prompt(promptText || 'Add your feedback:');
  if (!comment) return;
  const data = await api('/api/feedback', {
    method: 'POST', headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({entity_type: entityType, entity_id: entityId, comment: comment})
  });
  if (data && data.success) showToast('Feedback saved. Harvey will take it into account.', 'success');
  else showToast((data && data.message) || 'Could not save feedback.', 'error');
}

function fbProspect(i) {
  const p = _prospects[i];
  if (p) submitFeedback('contact', p.id, 'Feedback on this contact:');
}

function fbCampaign(i) {
  const c = _campaigns[i];
  if (c) submitFeedback('campaign', c.id, 'Leave feedback on this campaign:');
}

async function loadProspects() {
  const el = document.getElementById('prospects-table');
  const data = await api('/api/prospects');
  if (!data) { el.innerHTML = offlineState(); return; }
  _prospects = data;
  if (!data.length) {
    el.innerHTML = emptyState('&#9673;', 'No contacts yet',
      'Harvey hasn\'t found any prospects. Once it\'s running, the Scout agent searches the web for people matching your ideal customer profile in <b>harvey.yaml</b>.');
    return;
  }
  let html = '<div class="table-card"><table><thead><tr><th>Name</th><th>Title</th><th>Company</th><th>Email</th><th>Phone</th><th>Status</th><th>Source</th><th>Added</th><th></th></tr></thead><tbody>';
  data.forEach((p, i) => {
    const emailV = p.email ? (escHtml(p.email) + emailTag(p)) : '';
    const phoneV = p.phone ? (escHtml(p.phone) + (p.phone_verified ? ' <span class="verified">&#10003;</span>' : '')) : '';
    html += '<tr><td>' + escHtml(p.first_name) + ' ' + escHtml(p.last_name) + '</td>' +
      '<td>' + escHtml(p.title) + '</td><td>' + escHtml(p.company) + '</td>' +
      '<td>' + emailV + '</td><td>' + phoneV + '</td><td>' + badge(p.status) + '</td>' +
      '<td class="muted">' + escHtml(p.source) + '</td><td class="muted">' + formatDate(p.created_at) + '</td>' +
      '<td><button class="btn btn-secondary btn-sm" onclick="fbProspect(' + i + ')">Feedback</button></td></tr>';
  });
  el.innerHTML = html + '</tbody></table></div>';
}

async function loadCampaigns() {
  const el = document.getElementById('campaigns-list');
  const data = await api('/api/campaigns');
  if (!data) { el.innerHTML = offlineState(); return; }
  _campaigns = data;
  if (!data.length) {
    el.innerHTML = emptyState('&#9993;', 'No campaigns yet',
      'The Writer agent hasn\'t drafted any sequences. It kicks in automatically once Harvey has scored prospects to write for.');
    return;
  }
  let html = '';
  data.forEach((c, i) => {
    let stepsHtml = '';
    for (const step of (c.sequence || [])) {
      stepsHtml += '<div class="email-step"><div class="step-num">Email ' + escHtml(String(step.step || '?')) +
        (step.delay_days ? ' &middot; send after ' + escHtml(String(step.delay_days)) + ' days' : '') + '</div>' +
        '<div class="subject">' + escHtml(step.subject) + '</div>' +
        '<div class="body">' + escHtml(step.body) + '</div></div>';
    }
    const pc = (c.prospect_ids || []).length;
    html += '<div class="campaign-card"><h3>' + escHtml(c.name || 'Untitled Campaign') + '</h3>' +
      '<div class="meta">' + badge(c.status) + '<span>' + escHtml(c.channel || 'email') + '</span>' +
      '<span>' + pc + ' prospect' + (pc !== 1 ? 's' : '') + '</span><span>' + formatDate(c.created_at) + '</span>' +
      '<button class="btn btn-secondary btn-sm" onclick="fbCampaign(' + i + ')">Feedback</button></div>' +
      (stepsHtml || '<p style="color:var(--text-3);font-size:13px">No email steps in this campaign.</p>') + '</div>';
  });
  el.innerHTML = html;
}

async function loadConversations() {
  const el = document.getElementById('conversations-list');
  const data = await api('/api/conversations');
  if (!data) { el.innerHTML = offlineState(); return; }
  if (!data.length) {
    el.innerHTML = emptyState('&#9737;', 'No conversations yet',
      'No prospects have replied so far. When they do, the Handler agent classifies each reply and responds — every thread shows up here.');
    return;
  }
  let html = '';
  for (const c of data) {
    let threadHtml = '';
    for (const msg of (c.thread || [])) {
      const cls = msg.sender === 'harvey' ? 'sent' : 'received';
      const senderLabel = msg.sender === 'harvey' ? 'Harvey' : (c.first_name || 'Prospect');
      threadHtml += '<div class="thread-msg ' + cls + '">' +
        '<div class="sender"><span>' + escHtml(senderLabel) + '</span><time>' + formatDate(msg.timestamp) + '</time></div>' +
        '<div class="msg-content">' + escHtml(msg.content) + '</div></div>';
    }
    const name = [c.first_name, c.last_name].filter(Boolean).join(' ') || 'Unknown';
    const initials = (name === 'Unknown' && c.company ? c.company : name)
      .split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase() || 'P';
    const isWhatsApp = (c.channel || '').toLowerCase() === 'whatsapp';
    const channelBadge = isWhatsApp
      ? '<span class="badge" style="background:var(--pb-green-50);color:var(--pb-green-600);border-color:rgba(4,169,67,0.25)">WhatsApp</span>'
      : '<span class="badge" style="background:var(--pb-blue-50);color:var(--pb-blue-600);border-color:rgba(76,141,246,0.25)">Email</span>';

    html += '<div class="convo-card">' +
      '<div class="convo-head">' +
        '<div class="convo-avatar ' + (isWhatsApp ? 'wa' : 'mail') + '">' + escHtml(initials) + '</div>' +
        '<div class="convo-info">' +
          '<div class="convo-title">' +
            '<h3>' + escHtml(name) + '</h3>' +
            (c.company ? '<span class="convo-company">' + escHtml(c.company) + '</span>' : '') +
          '</div>' +
          '<div class="meta">' +
            channelBadge +
            badge(c.status) +
            (c.intent ? badge(c.intent) : '') +
            (c.stage ? '<span class="badge t-idle">' + escHtml(c.stage) + '</span>' : '') +
            (c.prospect_email ? '<span class="muted">' + escHtml(c.prospect_email) + '</span>' : '') +
            '<span class="muted"><time>' + formatDate(c.updated_at) + '</time></span>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="convo-thread">' +
        (threadHtml || '<p style="color:var(--text-tertiary);font-size:13px;padding:12px">No messages in this thread yet.</p>') +
      '</div>' +
    '</div>';
  }
  el.innerHTML = html;
}

async function loadActivity() {
  const el = document.getElementById('activity-list');
  const data = await api('/api/activity');
  if (!data) { el.innerHTML = offlineState(); return; }
  if (!data.length) {
    el.innerHTML = emptyState('&#9202;', 'No activity yet',
      'Harvey hasn\'t taken any actions. Every prospect found, email written, and reply handled will appear here the moment it happens.');
    return;
  }
  let html = '<div class="activity-feed">';
  for (const a of data) {
    html += '<div class="activity-item"><span class="time">' + formatDate(a.created_at) + '</span>' +
      '<span class="agent">' + escHtml(a.agent) + '</span>' +
      '<span class="action">' + escHtml(a.action_type) + '</span></div>';
  }
  el.innerHTML = html + '</div>';
}

// ── Init & live refresh ──

loadToday();
loadSetupStatus();
loadRuns();
loadTodayActivity();
loadOutreach();
loadHarveyStatus();

// Agent status: quick poll
setInterval(loadHarveyStatus, 8000);

// Nav counts stay live wherever you are, so "something needs me" is visible
// from any tab without polling that tab's contents.
setInterval(async () => {
  if (document.hidden || currentTab === 'today') return;
  const data = await api('/api/today');
  if (!data) return;
  navCount('nav-today', (data.items || []).filter(i => i.tone !== 'good').length);
  navCount('nav-outbox', (data.stats || {}).outbox_pending || 0);
}, 20000);

// Data tabs: auto-refresh live views without clobbering anything in progress.
// Outbox, settings and help are deliberately excluded — re-rendering the desk
// under someone mid-decision loses their place, and settings may be mid-edit.
setInterval(() => {
  if (document.hidden) return;
  switch (currentTab) {
    case 'today': loadToday(); loadRuns(); loadTodayActivity(); loadOutreach(); break;
    case 'companies': if (!companyDrill) loadCompanies(); break;
    case 'prospects': loadProspects(); break;
    case 'campaigns': loadCampaigns(); break;
    case 'conversations': loadConversations(); break;
    case 'activity': loadActivity(); break;
    case 'openers': loadOpeners(); break;
    case 'usage': loadUsage(); break;
    case 'controls': loadLogs(); break;
  }
}, 15000);

// Responsive navigation keeps every operational screen available on small devices.
function toggleNavigation(open = !document.body.classList.contains('nav-open')) {
  document.body.classList.toggle('nav-open', open);
  const toggle = document.getElementById('menu-toggle');
  if (toggle) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  }
  const activeBtn = document.querySelector('nav button.active');
  if (open && activeBtn) activeBtn.focus();
  else if (document.activeElement && document.activeElement.closest && document.activeElement.closest('nav') && toggle) toggle.focus();
}
document.addEventListener('keydown', event => {
  if (!document.body.classList.contains('nav-open')) return;
  if (event.key === 'Escape') toggleNavigation(false);
  if (event.key === 'Tab') {
    const toggle = document.getElementById('menu-toggle');
    const items = [toggle, ...document.querySelectorAll('nav button')].filter(Boolean);
    if (!items.length) return;
    event.preventDefault();
    const index = items.indexOf(document.activeElement);
    items[(index + (event.shiftKey ? -1 : 1) + items.length) % items.length].focus();
  }
});
window.matchMedia('(min-width: 861px)').addEventListener('change', () => toggleNavigation(false));
const initialActive = document.querySelector('nav button.active');
if (initialActive) initialActive.setAttribute('aria-current', 'page');

import React from 'react';

const TONES = { green: 'var(--status-success)', red: 'var(--status-danger)', orange: 'var(--status-warning)', blue: 'var(--status-info)', neutral: 'var(--text-secondary)' };
const TEXT = { green: 'var(--status-success-text)', red: 'var(--status-danger)', orange: 'var(--status-warning)', blue: 'var(--status-success-text)', neutral: 'var(--text-tertiary)' };

export function MiniChart({ levels = [0.45, 1, 0.5], highlight = 1, tone = 'blue', color }) {
  const c = color || TONES[tone] || tone;
  return (
    <div className="pb-minichart" aria-hidden="true">
      {levels.map((lv, i) => (
        <div className="pb-minichart__slot" key={i}>
          {i === highlight
            ? <div className="pb-minichart__bar" style={{ height: Math.round(lv * 100) + '%', background: c }} />
            : <div className="pb-minichart__line" style={{ bottom: Math.round(lv * 100) + '%', background: c }} />}
        </div>
      ))}
    </div>
  );
}

export function MetricCard({ label, value, delta, tone = 'green', deltaTone, chart = {}, className = '', ...rest }) {
  return (
    <div className={('pb-metric ' + className).trim()} {...rest}>
      <div className="pb-metric__label">{label}</div>
      <div className="pb-metric__body">
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minWidth: 0 }}>
          <div className="pb-metric__value">{value}</div>
          {delta && <div className="pb-metric__delta" style={{ color: TEXT[deltaTone || tone] }}>{delta}</div>}
        </div>
        <MiniChart tone={tone} {...chart} />
      </div>
    </div>
  );
}

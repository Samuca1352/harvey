import React from 'react';

const STATUS_COLORS = {
  queued: 'var(--status-queued)',
  running: 'var(--status-running)',
  success: 'var(--status-done)',
  failed: 'var(--status-failed)',
  doc: 'var(--status-queued)',
  sheet: 'var(--status-done)',
  sequence: 'var(--status-running)',
  other: 'var(--pb-purple-500)',
};

export function StatusDot({ status = 'queued', color, size = 12, className = '', style, ...rest }) {
  return (
    <span className={('pb-status ' + className).trim()} aria-hidden="true"
      style={{ width: size, height: size, background: color || STATUS_COLORS[status] || status, ...style }} {...rest} />
  );
}

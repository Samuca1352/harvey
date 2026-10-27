import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../core/IconButton.jsx';

const TONE = {
  success: { icon: 'circle-check', color: 'var(--status-success)' },
  danger: { icon: 'circle-x', color: 'var(--status-danger)' },
  warning: { icon: 'triangle-alert', color: 'var(--status-warning)' },
  info: { icon: 'info', color: 'var(--status-info)' },
  neutral: { icon: 'sparkles', color: 'var(--text-secondary)' },
};

export function Toast({ tone = 'success', title, description, action, onClose, className = '', ...rest }) {
  const t = TONE[tone] || TONE.neutral;
  return (
    <div role="status" className={('pb-toast ' + className).trim()} {...rest}>
      <Icon name={t.icon} size={18} color={t.color} style={{ marginTop: 1 }} />
      <div className="pb-toast__text">
        <p className="pb-toast__title">{title}</p>
        {description && <p className="pb-toast__desc">{description}</p>}
        {action && <div style={{ marginTop: 8 }}>{action}</div>}
      </div>
      {onClose && <IconButton icon="x" size="sm" label="Dismiss" onClick={onClose} style={{ margin: '-4px -4px 0 0' }} />}
    </div>
  );
}

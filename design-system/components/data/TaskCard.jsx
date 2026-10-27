import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Badge } from '../core/Badge.jsx';

export function TaskCard({ trigger, title, tags = [], when, id, onClick, className = '', ...rest }) {
  return (
    <article className={['pb-task', onClick && 'pb-task--click', className].filter(Boolean).join(' ')} onClick={onClick} {...rest}>
      {trigger && <div className="pb-task__trigger">Trigger: {trigger}</div>}
      <h4 className="pb-task__title">{title}</h4>
      {tags.length > 0 && (
        <div className="pb-task__tags">
          {tags.map((t, i) => { const tg = typeof t === 'string' ? { label: t } : t; return <Badge key={i} tone={tg.tone || 'neutral'}>{tg.label}</Badge>; })}
        </div>
      )}
      {(when || id) && (
        <div className="pb-task__foot">
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon name="clock" size={14} />{when}</span>
          {id && <span className="pb-task__id">{id}</span>}
        </div>
      )}
    </article>
  );
}

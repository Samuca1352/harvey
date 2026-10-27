import React from 'react';
import { StatusDot } from '../core/StatusDot.jsx';
import { Count } from '../core/Badge.jsx';
import { IconButton } from '../core/IconButton.jsx';

export function KanbanColumn({ status = 'queued', title, count, onAdd, className = '', children, ...rest }) {
  return (
    <section className={('pb-kcol ' + className).trim()} {...rest}>
      <header className="pb-kcol__head">
        <StatusDot status={status} size={14} />
        <span>{title}</span>
        {count != null && <Count>{count}</Count>}
        <span style={{ flex: 1 }} />
        <IconButton icon="plus" size="sm" label={'Add to ' + title} onClick={onAdd} />
      </header>
      {children}
    </section>
  );
}

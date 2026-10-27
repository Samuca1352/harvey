import React from 'react';
import { StatusDot } from '../core/StatusDot.jsx';
import { Count } from '../core/Badge.jsx';

export function FilterTabs({ items = [], value, onChange, className = '', ...rest }) {
  return (
    <div role="tablist" className={('pb-filters ' + className).trim()} {...rest}>
      {items.map(it => {
        const on = it.value === value;
        return (
          <button key={it.value} type="button" role="tab" aria-selected={on} className={'pb-filter' + (on ? ' pb-filter--active' : '')}
            onClick={() => onChange && onChange(on && it.value !== 'all' ? null : it.value)}>
            {(it.status || it.color) && <StatusDot status={it.status} color={it.color} size={14} />}
            {it.label}
            {it.count != null && <Count>{it.count}</Count>}
          </button>
        );
      })}
    </div>
  );
}

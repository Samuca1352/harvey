import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Tabs({ items = [], value, onChange, size = 'md', className = '', ...rest }) {
  return (
    <div role="tablist" className={['pb-tabs', size === 'sm' && 'pb-tabs--sm', className].filter(Boolean).join(' ')} {...rest}>
      {items.map(it => {
        const t = typeof it === 'string' ? { value: it, label: it } : it;
        const on = t.value === value;
        return (
          <button key={t.value} type="button" role="tab" aria-selected={on} className={'pb-tab' + (on ? ' pb-tab--active' : '')}
            onClick={() => onChange && onChange(t.value)}>
            {t.icon && <Icon name={t.icon} size={14} />}{t.label}
          </button>
        );
      })}
    </div>
  );
}

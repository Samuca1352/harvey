import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Checkbox({ label, description, disabled, className = '', ...rest }) {
  return (
    <label className={['pb-check', disabled && 'pb-check--disabled', className].filter(Boolean).join(' ')}>
      <input type="checkbox" disabled={disabled} {...rest} />
      <span className="pb-check__box"><Icon name="check" size={12} strokeWidth={2.5} /></span>
      {(label || description) && <span>{label}{description && <span className="pb-check__desc">{description}</span>}</span>}
    </label>
  );
}

import React from 'react';

export function Radio({ label, description, disabled, className = '', ...rest }) {
  return (
    <label className={['pb-check', 'pb-check--radio', disabled && 'pb-check--disabled', className].filter(Boolean).join(' ')}>
      <input type="radio" disabled={disabled} {...rest} />
      <span className="pb-check__box" />
      {(label || description) && <span>{label}{description && <span className="pb-check__desc">{description}</span>}</span>}
    </label>
  );
}

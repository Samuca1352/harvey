import React from 'react';

export function Switch({ label, disabled, className = '', ...rest }) {
  return (
    <label className={['pb-switch', disabled && 'pb-switch--disabled', className].filter(Boolean).join(' ')}>
      <input type="checkbox" role="switch" disabled={disabled} {...rest} />
      <span className="pb-switch__track" />
      {label && <span>{label}</span>}
    </label>
  );
}

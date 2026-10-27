import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { Kbd } from '../core/Kbd.jsx';

export function Input({ label, hint, error, iconLeft, iconRight, shortcut, variant = 'outline', size = 'md', disabled, className = '', style, id, ...rest }) {
  const autoId = React.useId ? React.useId() : undefined;
  const fid = id || autoId;
  const box = ['pb-input', variant === 'filled' && 'pb-input--filled', size !== 'md' && 'pb-input--' + size, error && 'pb-input--error', disabled && 'pb-input--disabled'].filter(Boolean).join(' ');
  const control = (
    <div className={box} style={label || hint || error ? undefined : style}>
      {iconLeft && <Icon name={iconLeft} size={16} />}
      <input id={fid} disabled={disabled} aria-invalid={!!error} {...rest} />
      {shortcut && <Kbd keys={shortcut} />}
      {iconRight && <Icon name={iconRight} size={16} />}
    </div>
  );
  if (!label && !hint && !error) return <div className={className} style={{ minWidth: 0 }}>{control}</div>;
  return (
    <div className={('pb-field ' + className).trim()} style={style}>
      {label && <label className="pb-field__label" htmlFor={fid}>{label}</label>}
      {control}
      {(error || hint) && <span className={'pb-field__hint' + (error ? ' pb-field__hint--error' : '')}>{error || hint}</span>}
    </div>
  );
}

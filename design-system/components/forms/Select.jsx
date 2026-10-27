import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Select({ label, hint, options = [], iconLeft, size = 'md', variant = 'outline', className = '', style, id, ...rest }) {
  const autoId = React.useId ? React.useId() : undefined;
  const fid = id || autoId;
  const box = ['pb-input', variant === 'filled' && 'pb-input--filled', size !== 'md' && 'pb-input--' + size].filter(Boolean).join(' ');
  return (
    <div className={('pb-field ' + className).trim()} style={style}>
      {label && <label className="pb-field__label" htmlFor={fid}>{label}</label>}
      <div className={box}>
        {iconLeft && <Icon name={iconLeft} size={16} />}
        <select id={fid} {...rest}>
          {options.map(o => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <Icon name="chevron-down" size={16} />
      </div>
      {hint && <span className="pb-field__hint">{hint}</span>}
    </div>
  );
}

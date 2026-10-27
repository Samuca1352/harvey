import React from 'react';

export function Avatar({ src, name = '', size = 36, round = false, className = '', style, ...rest }) {
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('');
  return (
    <span className={['pb-avatar', round && 'pb-avatar--round', className].filter(Boolean).join(' ')}
      style={{ width: size, height: size, fontSize: Math.max(10, Math.round(size * 0.36)), ...style }} title={name} {...rest}>
      {src ? <img src={src} alt={name} /> : initials}
    </span>
  );
}

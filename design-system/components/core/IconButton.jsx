import React from 'react';
import { Icon } from './Icon.jsx';

export function IconButton({ icon, label, variant = 'ghost', size = 'md', iconSize, className = '', type = 'button', children, ...rest }) {
  const cls = ['pb-iconbtn', 'pb-iconbtn--' + variant, size !== 'md' && 'pb-iconbtn--' + size, className].filter(Boolean).join(' ');
  const is = iconSize || (size === 'sm' ? 14 : size === 'lg' ? 18 : 16);
  return (
    <button type={type} className={cls} aria-label={label} title={label} {...rest}>
      {icon ? <Icon name={icon} size={is} /> : children}
    </button>
  );
}

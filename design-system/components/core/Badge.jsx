import React from 'react';
import { Icon } from './Icon.jsx';

export function Badge({ tone = 'neutral', size = 'md', dot = false, icon, className = '', children, ...rest }) {
  const cls = ['pb-badge', 'pb-badge--' + tone, size === 'sm' && 'pb-badge--sm', className].filter(Boolean).join(' ');
  return (
    <span className={cls} {...rest}>
      {dot && <span className="pb-badge__dot" />}
      {icon && <Icon name={icon} size={12} />}
      {children}
    </span>
  );
}

export function Count({ className = '', children, ...rest }) {
  return <span className={('pb-badge pb-badge--count ' + className).trim()} {...rest}>{children}</span>;
}

import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconChip } from '../core/IconChip.jsx';
import { Count } from '../core/Badge.jsx';

export function NavItem({ icon, letter, letterColor, label, active = false, count, trailing, href, className = '', ...rest }) {
  const cls = ['pb-nav-item', active && 'pb-nav-item--active', className].filter(Boolean).join(' ');
  const inner = (
    <>
      {letter ? <IconChip letter={letter} color={letterColor} /> : icon && <Icon name={icon} size={16} />}
      <span className="pb-nav-item__label">{label}</span>
      {count != null && <Count>{count}</Count>}
      {trailing === 'chevron' ? <Icon name="chevron-down" size={14} style={{ color: 'var(--text-tertiary)' }} /> : trailing}
    </>
  );
  if (href) return <a className={cls} href={href} aria-current={active ? 'page' : undefined} {...rest}>{inner}</a>;
  return <button type="button" className={cls} aria-current={active ? 'page' : undefined} {...rest}>{inner}</button>;
}

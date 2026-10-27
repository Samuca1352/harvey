import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconChip } from '../core/IconChip.jsx';

export function ActionRow({ icon, leading, title, subtitle, trailing = 'arrow', muted = false, onClick, href, className = '', ...rest }) {
  const cls = ['pb-row', muted && 'pb-row--muted', className].filter(Boolean).join(' ');
  const trail = trailing === 'arrow' ? <Icon name="arrow-up-right" size={16} />
    : trailing === 'menu' ? <Icon name="ellipsis-vertical" size={16} />
    : trailing === 'check' ? <Icon name="circle-check" size={14} />
    : trailing === 'chevron' ? <Icon name="chevron-right" size={16} />
    : trailing;
  const inner = (
    <>
      {leading || (icon && <IconChip icon={icon} />)}
      <span className="pb-row__text">
        <span className="pb-row__title">{title}</span>
        {subtitle && <span className="pb-row__sub">{subtitle}</span>}
      </span>
      {trail && <span className="pb-row__trail">{trail}</span>}
    </>
  );
  if (href) return <a className={cls} href={href} {...rest}>{inner}</a>;
  if (onClick) return <button type="button" className={cls} onClick={onClick} {...rest}>{inner}</button>;
  return <div className={cls} {...rest}>{inner}</div>;
}

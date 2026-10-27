import React from 'react';
import { NavItem } from './NavItem.jsx';
import { Button } from '../core/Button.jsx';
import { IconButton } from '../core/IconButton.jsx';

export function Sidebar({ brand = 'ProspectBoost', action = { label: 'New agent', icon: 'plus' }, onAction, sections = [], footer = [], activeId, onSelect, onCollapse, className = '', style, ...rest }) {
  return (
    <aside className={('pb-sidebar ' + className).trim()} style={style} {...rest}>
      <div className="pb-sidebar__brand">
        {typeof brand === 'string' ? <span className="pb-wordmark">{brand}</span> : brand}
        {onCollapse && <IconButton icon="panel-left-close" size="sm" label="Collapse sidebar" onClick={onCollapse} />}
      </div>
      {action && <Button block iconLeft={action.icon} onClick={onAction} style={{ marginBottom: 12 }}>{action.label}</Button>}
      {sections.map((s, i) => (
        <nav className="pb-sidebar__section" key={s.label || i} aria-label={s.label}>
          {s.label && <div className="pb-sidebar__label">{s.label}</div>}
          {s.items.map(it => (
            <NavItem key={it.id} icon={it.icon} letter={it.letter} letterColor={it.letterColor} label={it.label} count={it.count}
              active={activeId === it.id} onClick={() => onSelect && onSelect(it.id)} />
          ))}
        </nav>
      ))}
      {footer.length > 0 && (
        <div className="pb-sidebar__footer">
          {footer.map(it => (
            <NavItem key={it.id} icon={it.icon} label={it.label} trailing={it.trailing || 'chevron'}
              active={activeId === it.id} onClick={() => onSelect && onSelect(it.id)} />
          ))}
        </div>
      )}
    </aside>
  );
}

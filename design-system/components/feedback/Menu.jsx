import React from 'react';
import { Icon } from '../core/Icon.jsx';

export function Menu({ label, items = [], onSelect, className = '', style, ...rest }) {
  return (
    <div role="menu" className={('pb-menu ' + className).trim()} style={style} {...rest}>
      {label && <div className="pb-menu__label">{label}</div>}
      {items.map((it, i) => it === '-' || it.separator
        ? <div key={i} className="pb-menu__sep" role="separator" />
        : (
          <button key={it.value || it.label} type="button" role="menuitem" className={'pb-menu__item' + (it.danger ? ' pb-menu__item--danger' : '')}
            onClick={() => { it.onClick && it.onClick(); onSelect && onSelect(it.value || it.label); }}>
            {it.icon && <Icon name={it.icon} size={16} />}
            <span style={{ flex: 1 }}>{it.label}</span>
            {it.checked && <Icon name="check" size={14} />}
          </button>
        ))}
    </div>
  );
}

export function MenuTrigger({ trigger, items, label, align = 'right', onSelect, children }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (!open) return;
    const h = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);
  return (
    <span className="pb-menu__wrap" ref={ref}>
      <span onClick={() => setOpen(o => !o)}>{trigger || children}</span>
      {open && (
        <span className="pb-menu__pop" style={align === 'right' ? { right: 0 } : { left: 0 }}>
          <Menu label={label} items={items} onSelect={v => { setOpen(false); onSelect && onSelect(v); }} />
        </span>
      )}
    </span>
  );
}

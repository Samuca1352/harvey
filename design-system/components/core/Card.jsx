import React from 'react';

export function Card({ variant = 'outline', title, subtitle, action, onAction, headerRight, padding, className = '', style, children, ...rest }) {
  const cls = ['pb-card', variant !== 'outline' && 'pb-card--' + variant, className].filter(Boolean).join(' ');
  const hasHead = title || action || headerRight;
  return (
    <section className={cls} style={{ padding, ...style }} {...rest}>
      {hasHead && (
        <header className="pb-card__head">
          <div style={{ minWidth: 0 }}>
            {title && <h3 className="pb-card__title">{title}</h3>}
            {subtitle && <p className="pb-card__sub">{subtitle}</p>}
          </div>
          {headerRight || (action && <button type="button" className="pb-card__action" onClick={onAction}>{action}</button>)}
        </header>
      )}
      {children}
    </section>
  );
}

export function Inset({ className = '', children, ...rest }) {
  return <div className={('pb-inset ' + className).trim()} {...rest}>{children}</div>;
}

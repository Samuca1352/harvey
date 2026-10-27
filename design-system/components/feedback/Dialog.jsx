import React from 'react';
import { IconButton } from '../core/IconButton.jsx';

export function Dialog({ open = true, title, description, onClose, footer, width = 440, inline = false, className = '', children, ...rest }) {
  React.useEffect(() => {
    if (!open || !onClose) return;
    const k = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', k);
    return () => window.removeEventListener('keydown', k);
  }, [open, onClose]);
  if (!open) return null;
  const panel = (
    <div role="dialog" aria-modal={!inline} aria-label={title} className={('pb-dialog ' + className).trim()} style={{ maxWidth: width }}
      onClick={e => e.stopPropagation()} {...rest}>
      <div className="pb-dialog__head">
        <div>
          {title && <h2 className="pb-dialog__title">{title}</h2>}
          {description && <p className="pb-dialog__desc">{description}</p>}
        </div>
        {onClose && <IconButton icon="x" size="sm" label="Close" onClick={onClose} />}
      </div>
      {children && <div className="pb-dialog__body">{children}</div>}
      {footer && <div className="pb-dialog__foot">{footer}</div>}
    </div>
  );
  if (inline) return panel;
  return <div className="pb-overlay" onClick={onClose}>{panel}</div>;
}

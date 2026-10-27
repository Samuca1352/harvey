import React from 'react';

export function Tooltip({ label, placement = 'top', className = '', children, ...rest }) {
  return (
    <span className={['pb-tip', placement === 'bottom' && 'pb-tip--bottom', className].filter(Boolean).join(' ')} {...rest}>
      {children}
      <span role="tooltip" className="pb-tip__bubble">{label}</span>
    </span>
  );
}

import React from 'react';

export function Kbd({ keys = [], className = '', children, ...rest }) {
  return (
    <kbd className={('pb-kbd ' + className).trim()} {...rest}>
      {children || keys.map((k, i) => <span key={i}>{k}</span>)}
    </kbd>
  );
}

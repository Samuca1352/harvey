import React from 'react';

export function Eyebrow({ className = '', children, ...rest }) {
  return (
    <span className={('pb-eyebrow ' + className).trim()} {...rest}>
      <i /><i /><i /><i />
      {children}
    </span>
  );
}

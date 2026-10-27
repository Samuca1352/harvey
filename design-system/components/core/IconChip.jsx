import React from 'react';
import { Icon } from './Icon.jsx';

export function IconChip({ icon, letter, color, size = 32, iconSize, className = '', style, ...rest }) {
  if (letter) {
    const s = size === 32 ? 18 : size;
    return (
      <span className={('pb-chip pb-chip--letter ' + className).trim()}
        style={{ width: s, height: s, background: color || 'var(--pb-gray-700)', ...style }} {...rest}>{letter}</span>
    );
  }
  return (
    <span className={('pb-chip ' + className).trim()} style={{ width: size, height: size, color, ...style }} {...rest}>
      <Icon name={icon} size={iconSize || Math.round(size / 2)} />
    </span>
  );
}

import React from 'react';
import { ICONS } from './icons.js';

export function Icon({ name, size = 16, strokeWidth = 1.5, color = 'currentColor', className = '', style, title, ...rest }) {
  const inner = ICONS[name] || '';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth}
      strokeLinecap="round" strokeLinejoin="round" className={('pb-icon ' + className).trim()}
      style={{ flexShrink: 0, ...style }} role={title ? 'img' : undefined} aria-label={title} aria-hidden={title ? undefined : true}
      dangerouslySetInnerHTML={{ __html: inner }} {...rest} />
  );
}

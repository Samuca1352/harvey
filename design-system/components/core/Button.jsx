import React from 'react';
import { Icon } from './Icon.jsx';

export function Button({ variant = 'primary', size = 'md', iconLeft, iconRight, block = false, as, href, className = '', children, type = 'button', ...rest }) {
  const cls = ['pb-btn', 'pb-btn--' + variant, size !== 'md' && 'pb-btn--' + size, block && 'pb-btn--block', className].filter(Boolean).join(' ');
  const is = size === 'sm' ? 14 : size === 'lg' ? 18 : 16;
  const content = (
    <>
      {iconLeft && <Icon name={iconLeft} size={is} />}
      {children}
      {iconRight && <Icon name={iconRight} size={is} />}
    </>
  );
  if (href || as === 'a') return <a className={cls} href={href} {...rest}>{content}</a>;
  return <button type={type} className={cls} {...rest}>{content}</button>;
}

import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'soft' | 'ghost' | 'danger';
  /** sm 28px · md 36px · lg 44px */
  size?: 'sm' | 'md' | 'lg';
  /** Lucide icon name placed before the label */
  iconLeft?: string;
  iconRight?: string;
  /** Stretch to container width */
  block?: boolean;
  href?: string;
  as?: 'a' | 'button';
  children?: React.ReactNode;
}
export function Button(props: ButtonProps): JSX.Element;

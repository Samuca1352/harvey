import * as React from 'react';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: string;
  iconLeft?: string;
  iconRight?: string;
  /** Keycap(s) rendered at the right, e.g. ['F','⌘'] */
  shortcut?: string[];
  /** filled = gray search field (topbar); outline = forms */
  variant?: 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
}
export function Input(props: InputProps): JSX.Element;

import * as React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Lucide icon name */
  icon?: string;
  /** Required accessible label (also used as title) */
  label: string;
  variant?: 'ghost' | 'outline' | 'soft' | 'primary';
  /** sm 28 · md 36 · lg 40 */
  size?: 'sm' | 'md' | 'lg';
  iconSize?: number;
}
export function IconButton(props: IconButtonProps): JSX.Element;

import * as React from 'react';

export interface ActionRowProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  icon?: string;
  /** Custom leading node (overrides icon) */
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  trailing?: 'arrow' | 'menu' | 'check' | 'chevron' | React.ReactNode | null;
  /** gray-50 fill instead of white */
  muted?: boolean;
  onClick?: () => void;
  href?: string;
}
export function ActionRow(props: ActionRowProps): JSX.Element;

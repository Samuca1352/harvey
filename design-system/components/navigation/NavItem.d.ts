import * as React from 'react';

export interface NavItemProps extends React.HTMLAttributes<HTMLElement> {
  icon?: string;
  letter?: string;
  letterColor?: string;
  label: string;
  active?: boolean;
  count?: number | string;
  /** 'chevron' for expandable footer items, or any node */
  trailing?: 'chevron' | React.ReactNode;
  href?: string;
}
export function NavItem(props: NavItemProps): JSX.Element;

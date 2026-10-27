import * as React from 'react';

export interface MenuItem { label: string; value?: string; icon?: string; danger?: boolean; checked?: boolean; onClick?: () => void; separator?: boolean; }
export interface MenuProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Optional heading inside the menu */
  label?: string;
  items: Array<MenuItem | '-'>;
  onSelect?: (value: string) => void;
}
export function Menu(props: MenuProps): JSX.Element;
export interface MenuTriggerProps { trigger?: React.ReactNode; items: Array<MenuItem | '-'>; label?: string; align?: 'left' | 'right'; onSelect?: (value: string) => void; children?: React.ReactNode; }
export function MenuTrigger(props: MenuTriggerProps): JSX.Element;

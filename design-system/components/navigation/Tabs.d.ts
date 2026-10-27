import * as React from 'react';

export interface TabItem { value: string; label: string; icon?: string; }
export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: Array<string | TabItem>;
  value: string;
  onChange?: (value: string) => void;
  size?: 'sm' | 'md';
}
export function Tabs(props: TabsProps): JSX.Element;

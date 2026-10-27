import * as React from 'react';

export interface FilterItem { value: string; label: string; status?: string; color?: string; count?: number | string; }
export interface FilterTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  items: FilterItem[];
  value?: string | null;
  onChange?: (value: string | null) => void;
}
export function FilterTabs(props: FilterTabsProps): JSX.Element;

import * as React from 'react';

export interface DataColumn<T = any> { key: string; label: React.ReactNode; width?: string; align?: 'left' | 'center' | 'right'; render?: (row: T) => React.ReactNode; }
export interface DataTableProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataColumn<T>[];
  rows: T[];
  rowKey?: string;
  onRowClick?: (row: T) => void;
  /** Horizontal scroll kicks in below this width. Default 520 */
  minWidth?: number;
}
export function DataTable(props: DataTableProps): JSX.Element;

import * as React from 'react';

export interface KanbanColumnProps extends React.HTMLAttributes<HTMLElement> {
  status?: 'queued' | 'running' | 'success' | 'failed';
  title: string;
  count?: number | string;
  onAdd?: () => void;
  children?: React.ReactNode;
}
export function KanbanColumn(props: KanbanColumnProps): JSX.Element;

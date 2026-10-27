import * as React from 'react';

export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  status?: 'queued' | 'running' | 'success' | 'failed' | 'doc' | 'sheet' | 'sequence' | 'other';
  /** Override color */
  color?: string;
  /** Default 12; 14 in column headers / filters */
  size?: number;
}
export function StatusDot(props: StatusDotProps): JSX.Element;

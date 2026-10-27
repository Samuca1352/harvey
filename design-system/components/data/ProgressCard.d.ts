import * as React from 'react';

export interface ProgressCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  label?: string;
  /** 0–100 */
  value?: number;
  segments?: number;
  onAdd?: () => void;
}
export function ProgressCard(props: ProgressCardProps): JSX.Element;

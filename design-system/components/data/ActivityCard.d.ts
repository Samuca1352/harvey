import * as React from 'react';

export interface ActivityCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  icon?: string;
  title: React.ReactNode;
  /** Relative time, e.g. "3 min ago" */
  time?: string;
  onMenu?: (e: React.MouseEvent) => void;
}
export function ActivityCard(props: ActivityCardProps): JSX.Element;

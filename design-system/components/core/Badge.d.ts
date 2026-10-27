import * as React from 'react';

export type BadgeTone = 'neutral' | 'green' | 'red' | 'orange' | 'blue' | 'azure' | 'pink' | 'purple' | 'outline';
export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  size?: 'sm' | 'md';
  /** Leading 6px dot in currentColor */
  dot?: boolean;
  icon?: string;
  children?: React.ReactNode;
}
export function Badge(props: BadgeProps): JSX.Element;
export function Count(props: React.HTMLAttributes<HTMLSpanElement>): JSX.Element;

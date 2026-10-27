import * as React from 'react';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** outline = white + hairline (main panels); tile = gray-50 fill (rails, metric tiles); flat = gray, no border */
  variant?: 'outline' | 'tile' | 'flat';
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Small tertiary text button at the right of the header, e.g. "View all" */
  action?: string;
  onAction?: () => void;
  headerRight?: React.ReactNode;
  padding?: number | string;
  children?: React.ReactNode;
}
export function Card(props: CardProps): JSX.Element;
export function Inset(props: React.HTMLAttributes<HTMLDivElement>): JSX.Element;

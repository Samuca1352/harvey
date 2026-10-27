import * as React from 'react';

export interface TooltipProps extends React.HTMLAttributes<HTMLSpanElement> {
  label: React.ReactNode;
  placement?: 'top' | 'bottom';
  children: React.ReactNode;
}
export function Tooltip(props: TooltipProps): JSX.Element;

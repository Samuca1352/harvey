import * as React from 'react';

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  keys?: string[];
  children?: React.ReactNode;
}
export function Kbd(props: KbdProps): JSX.Element;

import * as React from 'react';

export interface IconChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  icon?: string;
  /** Renders a solid colored letter square instead of an icon (agent/workspace avatars in nav) */
  letter?: string;
  /** Icon color, or background color for letter chips */
  color?: string;
  /** Default 32 (18 for letter chips) */
  size?: number;
  iconSize?: number;
}
export function IconChip(props: IconChipProps): JSX.Element;

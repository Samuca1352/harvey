import * as React from 'react';

export interface SegmentBarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 0–100 */
  value: number;
  /** Default 10 */
  segments?: number;
  color?: string;
  track?: string;
  height?: number;
  width?: number;
  gap?: number;
  radius?: number;
  /** Stretch ticks to fill the container width (width prop ignored) */
  fluid?: boolean;
}
export function SegmentBar(props: SegmentBarProps): JSX.Element;

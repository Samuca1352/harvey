import * as React from 'react';

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  /** Lucide icon name, e.g. "sparkles", "user-search". See assets/icons/ for the full shipped set. */
  name: string;
  /** Pixel size. Product default 16; 14 in dense meta rows; 18 in toasts. */
  size?: number;
  /** Stroke width. Brand default 1.5 — never go above 2. */
  strokeWidth?: number;
  color?: string;
  /** Accessible label. Omit for decorative icons. */
  title?: string;
}
export function Icon(props: IconProps): JSX.Element;

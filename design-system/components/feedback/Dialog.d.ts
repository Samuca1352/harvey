import * as React from 'react';

export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  title?: string;
  description?: React.ReactNode;
  onClose?: () => void;
  footer?: React.ReactNode;
  width?: number;
  /** Render without the overlay (for docs/previews) */
  inline?: boolean;
  children?: React.ReactNode;
}
export function Dialog(props: DialogProps): JSX.Element | null;

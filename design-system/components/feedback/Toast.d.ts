import * as React from 'react';

export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  title: string;
  description?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}
export function Toast(props: ToastProps): JSX.Element;

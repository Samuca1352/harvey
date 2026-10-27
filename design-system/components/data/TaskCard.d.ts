import * as React from 'react';

export interface TaskTag { label: string; tone?: import('../core/Badge').BadgeTone; }
export interface TaskCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Rendered as "Trigger: {trigger}" */
  trigger?: string;
  title: React.ReactNode;
  tags?: Array<string | TaskTag>;
  /** e.g. "Starts in 2h", "Queued 4m ago" */
  when?: string;
  /** e.g. "tsk_9c206" */
  id?: string;
  onClick?: () => void;
}
export function TaskCard(props: TaskCardProps): JSX.Element;

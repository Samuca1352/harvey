import * as React from 'react';

/**
 * @startingPoint section="Navigation" subtitle="Admin sidebar with sections" viewport="700x560"
 */
export interface SidebarProps extends Omit<React.HTMLAttributes<HTMLElement>, 'onSelect'> {
  /** Wordmark text or a custom node. Default "ProspectBoost" set in type (no logo supplied). */
  brand?: React.ReactNode;
  action?: { label: string; icon?: string } | null;
  onAction?: () => void;
  sections: SidebarSection[];
  footer?: SidebarItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  /** Shows the collapse button when provided */
  onCollapse?: () => void;
}
export function Sidebar(props: SidebarProps): JSX.Element;
export interface SidebarItem { id: string; label: string; icon?: string; letter?: string; letterColor?: string; count?: number | string; trailing?: React.ReactNode; }
export interface SidebarSection { label?: string; items: SidebarItem[]; }

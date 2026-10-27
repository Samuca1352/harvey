import * as React from 'react';

/**
 * @startingPoint section="Forms" subtitle="Ask-the-agent chat composer" viewport="700x260"
 */
export interface ComposerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  placeholder?: string;
  /** Controlled value (omit for uncontrolled) */
  value?: string;
  onChange?: (value: string) => void;
  /** Fired on Enter (without Shift) or the send button */
  onSend?: (value: string) => void;
  contexts?: ComposerContext[];
}
export function Composer(props: ComposerProps): JSX.Element;
export interface ComposerContext { icon: string; label: string; }

import * as React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  rows?: number;
}
export function Textarea(props: TextareaProps): JSX.Element;

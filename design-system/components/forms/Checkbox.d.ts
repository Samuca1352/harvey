import * as React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  description?: React.ReactNode;
}
export function Checkbox(props: CheckboxProps): JSX.Element;

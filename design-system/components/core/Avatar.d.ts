import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  src?: string;
  name?: string;
  /** Default 36 */
  size?: number;
  round?: boolean;
}
export function Avatar(props: AvatarProps): JSX.Element;

import * as React from 'react';

export interface ArtifactCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  kind?: 'doc' | 'sheet' | 'sequence' | 'list';
  title: string;
  /** e.g. "Created by Account Researcher · Doc" */
  meta?: string;
  onOpen?: () => void;
  onMenu?: () => void;
}
export function ArtifactCard(props: ArtifactCardProps): JSX.Element;

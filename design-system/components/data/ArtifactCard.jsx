import React from 'react';
import { IconChip } from '../core/IconChip.jsx';
import { IconButton } from '../core/IconButton.jsx';
import { Button } from '../core/Button.jsx';

const KIND = {
  doc: { label: 'Doc', color: 'var(--pb-azure-500)', icon: 'file-text' },
  sheet: { label: 'Sheet', color: 'var(--pb-green-600)', icon: 'file-spreadsheet' },
  sequence: { label: 'Sequence', color: 'var(--pb-orange-600)', icon: 'mail' },
  list: { label: 'List', color: 'var(--pb-purple-600)', icon: 'users' },
};

export function ArtifactCard({ kind = 'doc', title, meta, onOpen, onMenu, className = '', ...rest }) {
  const k = KIND[kind] || KIND.doc;
  return (
    <article className={('pb-artifact ' + className).trim()} {...rest}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '2px 2px 0 4px' }}>
        <span className="pb-artifact__type" style={{ color: k.color }}>{k.label}</span>
        <IconButton icon="ellipsis-vertical" size="sm" label="More" onClick={onMenu} />
      </div>
      <div className="pb-artifact__file">
        <IconChip icon={k.icon} />
        <div style={{ minWidth: 0 }}>
          <div style={{ font: 'var(--type-body)', color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
          {meta && <div style={{ font: 'var(--type-label)', color: 'var(--text-tertiary)', marginTop: 2 }}>{meta}</div>}
        </div>
      </div>
      <Button variant="soft" block onClick={onOpen}>Open</Button>
    </article>
  );
}

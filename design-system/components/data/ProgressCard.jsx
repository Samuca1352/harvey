import React from 'react';
import { IconButton } from '../core/IconButton.jsx';
import { SegmentBar } from './SegmentBar.jsx';

export function ProgressCard({ title = 'Today task', label = 'Progress', value = 70, segments = 40, onAdd, className = '', ...rest }) {
  return (
    <div className={('pb-progress ' + className).trim()} {...rest}>
      <div className="pb-progress__rim">
        <div className="pb-progress__inner">
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <h3 className="pb-progress__title">{title}</h3>
            <IconButton icon="plus" variant="outline" label="Add task" onClick={onAdd} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, font: 'var(--type-meta)', color: 'var(--text-secondary)' }}>
            <span>{label}</span><span>{value}%</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <SegmentBar fluid value={value} segments={segments} color="var(--pb-gray-900)" track="rgba(255,255,255,.75)" height={24} gap={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

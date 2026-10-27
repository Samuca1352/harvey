import React from 'react';
import { IconChip } from '../core/IconChip.jsx';
import { IconButton } from '../core/IconButton.jsx';

export function ActivityCard({ icon = 'sparkles', title, time, onMenu, onClick, className = '', ...rest }) {
  return (
    <article className={('pb-activity ' + className).trim()} onClick={onClick} style={onClick ? { cursor: 'pointer' } : undefined} {...rest}>
      <div className="pb-activity__top">
        <IconChip icon={icon} />
        <IconButton icon="ellipsis-vertical" size="sm" label="More" onClick={e => { e.stopPropagation(); onMenu && onMenu(e); }} />
      </div>
      <div className="pb-activity__body">
        <p className="pb-activity__title">{title}</p>
        {time && <div className="pb-activity__time">{time}</div>}
      </div>
    </article>
  );
}

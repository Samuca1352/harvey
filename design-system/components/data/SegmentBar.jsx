import React from 'react';

export function SegmentBar({ value = 0, segments = 10, color = 'var(--chart-1)', track = 'var(--chart-track)', height = 14, width = 4, gap = 2, radius = 1, fluid = false, className = '', style, ...rest }) {
  const filled = Math.round((Math.max(0, Math.min(100, value)) / 100) * segments);
  return (
    <span className={('pb-seg ' + className).trim()} style={{ gap, ...(fluid ? { display: 'flex', width: '100%' } : null), ...style }} role="meter" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} {...rest}>
      {Array.from({ length: segments }, (_, i) => (
        <span key={i} style={{ width: fluid ? undefined : width, flex: fluid ? '1 1 0' : undefined, minWidth: fluid ? 2 : undefined, height, borderRadius: radius, background: i < filled ? color : track }} />
      ))}
    </span>
  );
}

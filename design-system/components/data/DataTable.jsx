import React from 'react';

export function DataTable({ columns = [], rows = [], rowKey = 'id', onRowClick, minWidth = 520, className = '', ...rest }) {
  const cols = columns.map(c => c.width || 'minmax(0,1fr)').join(' ');
  const align = a => (a === 'right' ? 'flex-end' : a === 'center' ? 'center' : 'flex-start');
  return (
    <div className={('pb-table ' + className).trim()} {...rest}>
      <div className="pb-table__grid" style={{ '--cols': cols, minWidth }} role="table">
        <div className="pb-table__head" role="row">
          {columns.map(c => <div key={c.key} role="columnheader" style={{ textAlign: c.align || 'left' }}>{c.label}</div>)}
        </div>
        {rows.map((r, i) => (
          <div key={r[rowKey] != null ? r[rowKey] : i} role="row" className={'pb-table__row' + (onRowClick ? ' pb-table__row--click' : '')}
            onClick={onRowClick ? () => onRowClick(r) : undefined}>
            {columns.map(c => (
              <div key={c.key} role="cell" className="pb-table__cell" style={{ justifyContent: align(c.align) }}>
                {c.render ? c.render(r) : r[c.key]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

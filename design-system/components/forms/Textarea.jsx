import React from 'react';

export function Textarea({ label, hint, rows = 3, className = '', style, id, ...rest }) {
  const autoId = React.useId ? React.useId() : undefined;
  const fid = id || autoId;
  return (
    <div className={('pb-field ' + className).trim()} style={style}>
      {label && <label className="pb-field__label" htmlFor={fid}>{label}</label>}
      <div className="pb-textarea"><textarea id={fid} rows={rows} {...rest} /></div>
      {hint && <span className="pb-field__hint">{hint}</span>}
    </div>
  );
}

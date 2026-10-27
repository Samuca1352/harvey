import React from 'react';
import { Icon } from '../core/Icon.jsx';
import { IconButton } from '../core/IconButton.jsx';

export function Composer({ placeholder = 'Ask anything…', value, onChange, onSend, contexts = [{ icon: 'file-text', label: 'Project' }, { icon: 'folder', label: 'App' }], className = '', ...rest }) {
  const [inner, setInner] = React.useState('');
  const v = value !== undefined ? value : inner;
  const set = e => { if (onChange) onChange(e.target.value); if (value === undefined) setInner(e.target.value); };
  const send = () => { if (!v.trim()) return; if (onSend) onSend(v); if (value === undefined) setInner(''); };
  return (
    <div className={('pb-composer ' + className).trim()} {...rest}>
      <div className="pb-composer__box">
        <textarea rows={1} placeholder={placeholder} value={v} onChange={set}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); } }} />
        <div className="pb-composer__bar">
          <IconButton icon="plus" variant="outline" label="Attach" />
          <IconButton icon="waypoints" variant="outline" label="Workflows" />
          <span style={{ flex: 1 }} />
          <IconButton icon="mic" label="Dictate" />
          <IconButton icon="send" variant="primary" label="Send" onClick={send} />
        </div>
      </div>
      {contexts.length > 0 && (
        <div className="pb-composer__ctx">
          {contexts.map(c => <button type="button" key={c.label}><Icon name={c.icon} size={14} />{c.label}</button>)}
        </div>
      )}
    </div>
  );
}

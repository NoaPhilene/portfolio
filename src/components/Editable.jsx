import { useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

// Drop-in replacement for `{value}` text interpolation. Logged out, this
// renders nothing but the plain value — zero DOM/visual difference from the
// static site. Logged in, hovering shows a dashed outline; clicking turns it
// into an input pre-filled with the current value (never blank).
export default function Editable({ value, onSave, multiline = false, style }) {
  const { loggedIn } = useAuth();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? '');
  const [saving, setSaving] = useState(false);

  if (!loggedIn) return value;

  if (!editing) {
    return (
      <span
        onClick={(e) => { e.stopPropagation(); setDraft(value ?? ''); setEditing(true); }}
        title="Klik om te bewerken"
        style={{
          cursor: 'pointer',
          outline: '1px dashed rgba(199,171,125,.55)',
          outlineOffset: 2,
          borderRadius: 2,
          ...style,
        }}
      >
        {value}
      </span>
    );
  }

  const commit = async () => {
    if (saving) return;
    setSaving(true);
    try {
      await onSave(draft);
      setEditing(false);
    } finally {
      setSaving(false);
    }
  };

  const InputTag = multiline ? 'textarea' : 'input';

  return (
    <span
      onClick={(e) => e.stopPropagation()}
      style={{
        display: 'inline-flex',
        flexDirection: multiline ? 'column' : 'row',
        gap: 6,
        alignItems: multiline ? 'stretch' : 'center',
        maxWidth: '100%',
      }}
    >
      <InputTag
        autoFocus
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          e.stopPropagation();
          if (!multiline && e.key === 'Enter') commit();
          if (e.key === 'Escape') setEditing(false);
        }}
        rows={multiline ? 5 : undefined}
        style={{
          font: 'inherit',
          color: 'inherit',
          background: 'rgba(255,255,255,.95)',
          border: '1px solid #c7ab7d',
          borderRadius: 4,
          padding: '3px 7px',
          minWidth: 80,
          width: multiline ? '100%' : undefined,
          ...style,
        }}
      />
      <span style={{ display: 'flex', gap: 4, flex: 'none' }}>
        <button
          onClick={commit}
          disabled={saving}
          style={{ border: 'none', borderRadius: 4, background: '#17314a', color: '#fff', fontSize: 11, padding: '3px 8px', cursor: 'pointer' }}
        >
          Opslaan
        </button>
        <button
          onClick={() => setEditing(false)}
          style={{ border: '1px solid rgba(0,0,0,.2)', borderRadius: 4, background: 'transparent', fontSize: 11, padding: '3px 8px', cursor: 'pointer' }}
        >
          Annuleren
        </button>
      </span>
    </span>
  );
}

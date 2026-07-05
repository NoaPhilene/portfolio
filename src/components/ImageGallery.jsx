import { useEffect, useRef, useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';
import { api } from '../data/api.js';

const editBtnStyle = {
  border: 'none',
  borderRadius: '50%',
  width: 26,
  height: 26,
  background: 'rgba(23,49,74,.82)',
  color: '#fff',
  fontSize: 15,
  lineHeight: '26px',
  padding: 0,
  cursor: 'pointer',
};

// Same placeholder look as ImageSlot, but cycles through multiple photos
// when `images` has more than one entry. When logged in, `onAdd`/`onRemove`
// let the owner manage the project's photos right where they're shown.
export default function ImageGallery({
  images = [],
  alt = '',
  shape = 'rounded',
  radius = 12,
  placeholder = 'Image',
  tone = 'dark',
  style,
  interval = 3200,
  onAdd,
  onRemove,
}) {
  const { loggedIn } = useAuth();
  const [i, setI] = useState(0);
  const fileRef = useRef(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (i >= images.length) setI(0);
  }, [images.length, i]);

  useEffect(() => {
    if (images.length < 2) return;
    const id = setInterval(() => setI((n) => (n + 1) % images.length), interval);
    return () => clearInterval(id);
  }, [images.length, interval]);

  const borderRadius = shape === 'circle' ? '50%' : shape === 'rect' ? 0 : radius;
  const base = { position: 'relative', overflow: 'hidden', borderRadius, ...style };
  const canEdit = loggedIn && (onAdd || onRemove);

  const handleAdd = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file || !onAdd) return;
    setBusy(true);
    try {
      const { url } = await api.upload(file);
      await onAdd(url);
    } catch (err) {
      alert(err.message || 'Upload mislukt');
    } finally {
      setBusy(false);
    }
  };

  const handleRemove = async () => {
    if (!onRemove || !images[i]) return;
    if (!confirm('Deze foto verwijderen?')) return;
    setBusy(true);
    try {
      await onRemove(images[i]);
    } finally {
      setBusy(false);
    }
  };

  const fileInput = canEdit && onAdd ? (
    <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleAdd} style={{ display: 'none' }} />
  ) : null;

  if (!images.length) {
    const light = tone === 'light';
    return (
      <div
        style={{
          ...base,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: light ? 'rgba(31,29,26,.05)' : 'rgba(241,235,223,.06)',
          border: `1px dashed ${light ? 'rgba(31,29,26,.22)' : 'rgba(241,235,223,.28)'}`,
        }}
      >
        <span
          style={{
            fontFamily: "'Archivo',sans-serif",
            fontSize: 11,
            letterSpacing: '.18em',
            textTransform: 'uppercase',
            color: light ? 'rgba(31,29,26,.4)' : 'rgba(241,235,223,.45)',
          }}
        >
          {placeholder}
        </span>
        {canEdit && onAdd && (
          <>
            {fileInput}
            <button
              onClick={() => fileRef.current?.click()}
              disabled={busy}
              style={{ position: 'absolute', bottom: 10, ...editBtnStyle, width: 'auto', borderRadius: 20, padding: '6px 14px', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase' }}
            >
              + Foto
            </button>
          </>
        )}
      </div>
    );
  }

  return (
    <div style={base}>
      {images.map((src, idx) => (
        <img
          key={src}
          src={src}
          alt={alt}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: idx === i ? 1 : 0,
            transition: 'opacity .6s ease',
          }}
        />
      ))}
      {images.length > 1 && (
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 10, display: 'flex', justifyContent: 'center', gap: 6, zIndex: 2 }}>
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setI(idx);
              }}
              style={{
                width: idx === i ? 16 : 6,
                height: 6,
                borderRadius: 4,
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                background: idx === i ? '#fff' : 'rgba(255,255,255,.5)',
                boxShadow: '0 1px 3px rgba(0,0,0,.4)',
                transition: 'width .25s ease',
              }}
            />
          ))}
        </div>
      )}
      {canEdit && (
        <div style={{ position: 'absolute', top: 10, right: 10, display: 'flex', gap: 6, zIndex: 3 }}>
          {onRemove && (
            <button onClick={handleRemove} disabled={busy} title="Verwijder deze foto" style={editBtnStyle}>
              ×
            </button>
          )}
          {onAdd && (
            <>
              {fileInput}
              <button onClick={() => fileRef.current?.click()} disabled={busy} title="Foto toevoegen" style={editBtnStyle}>
                +
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

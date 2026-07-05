import { useRef, useState } from 'react';
import ImageSlot from './ImageSlot.jsx';
import { useAuth } from '../auth/AuthContext.jsx';
import { api } from '../data/api.js';

// Wraps ImageSlot: logged in, overlays a small upload button. The current
// photo (if any) stays fully visible underneath — you always see what's
// set before choosing a replacement.
export default function EditableImage({ src, alt, shape, radius, placeholder, tone, style, onSave }) {
  const { loggedIn } = useAuth();
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);

  if (!loggedIn) {
    return <ImageSlot src={src} alt={alt} shape={shape} radius={radius} placeholder={placeholder} tone={tone} style={style} />;
  }

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploading(true);
    try {
      const { url } = await api.upload(file);
      await onSave(url);
    } catch (err) {
      alert(err.message || 'Upload mislukt');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ position: 'relative', ...style }}>
      <ImageSlot src={src} alt={alt} shape={shape} radius={radius} placeholder={placeholder} tone={tone} style={{ width: '100%', height: '100%' }} />
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={handleFile} style={{ display: 'none' }} />
      <button
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(23,49,74,.88)',
          color: '#fff',
          border: 'none',
          borderRadius: 20,
          padding: '6px 14px',
          fontSize: 11,
          letterSpacing: '.08em',
          textTransform: 'uppercase',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        {uploading ? '…' : src ? 'Vervang foto' : 'Upload foto'}
      </button>
    </div>
  );
}

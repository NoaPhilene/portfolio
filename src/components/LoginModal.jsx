import { useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

const inputStyle = {
  font: 'inherit',
  fontSize: 14,
  padding: '9px 12px',
  border: '1px solid rgba(31,29,26,.22)',
  borderRadius: 8,
};

export default function LoginModal({ onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(username, password);
      onClose();
    } catch (err) {
      setError(err.message || 'Inloggen mislukt');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 200, background: 'rgba(15,25,40,.55)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onClick={onClose}
    >
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        style={{ background: '#fff', borderRadius: 12, padding: 28, width: 280, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,.35)' }}
      >
        <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 18, color: '#17314a' }}>Inloggen</div>
        <input autoFocus placeholder="Gebruikersnaam" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        {error && <div style={{ color: '#b3261e', fontSize: 12 }}>{error}</div>}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 4 }}>
          <button
            type="button"
            onClick={onClose}
            style={{ border: '1px solid rgba(0,0,0,.18)', background: 'transparent', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer' }}
          >
            Annuleren
          </button>
          <button
            type="submit"
            disabled={busy}
            style={{ border: 'none', background: '#17314a', color: '#fff', borderRadius: 8, padding: '8px 14px', fontSize: 13, cursor: 'pointer' }}
          >
            {busy ? '…' : 'Inloggen'}
          </button>
        </div>
      </form>
    </div>
  );
}

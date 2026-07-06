import { useState } from 'react';
import { useAuth } from '../auth/AuthContext.jsx';

const inputStyle = {
  font: 'inherit',
  fontSize: 14,
  padding: '9px 12px',
  border: '1px solid rgba(31,29,26,.22)',
  borderRadius: 8,
};

// Full-page login screen, reached via the /admin path — there's no visible
// "log in" affordance on the public site, by design.
export default function AdminLoginPage({ onLoggedIn }) {
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
      onLoggedIn();
    } catch (err) {
      setError(err.message || 'Inloggen mislukt');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'radial-gradient(circle at 50% 38%, #d8d5cf 0%, #bcb8b0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Archivo',sans-serif",
      }}
    >
      <form
        onSubmit={submit}
        style={{ background: '#fff', borderRadius: 12, padding: 32, width: 300, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 20px 60px rgba(0,0,0,.25)' }}
      >
        <div style={{ fontFamily: "'Archivo Black',sans-serif", fontSize: 20, color: '#17314a' }}>Inloggen</div>
        <input autoFocus placeholder="Gebruikersnaam" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />
        <input type="password" placeholder="Wachtwoord" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
        {error && <div style={{ color: '#b3261e', fontSize: 12 }}>{error}</div>}
        <button
          type="submit"
          disabled={busy}
          style={{ border: 'none', background: '#17314a', color: '#fff', borderRadius: 8, padding: '10px 14px', fontSize: 13, cursor: 'pointer', marginTop: 4 }}
        >
          {busy ? '…' : 'Inloggen'}
        </button>
        <a href="/" style={{ textAlign: 'center', fontSize: 12, color: '#8a7f6a', marginTop: 6 }}>
          ← Terug naar de site
        </a>
      </form>
    </div>
  );
}

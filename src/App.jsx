import { useEffect, useState } from 'react';
import DesktopMagazine from './desktop/DesktopMagazine.jsx';
import MobileMagazine from './mobile/MobileMagazine.jsx';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';
import { useContent } from './data/useContent.js';
import LoginModal from './components/LoginModal.jsx';

const BREAKPOINT = '(max-width: 760px)';

function AccountControl() {
  const { loggedIn, checking, logout } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

  if (checking) return null;

  return (
    <>
      <button
        onClick={() => (loggedIn ? logout() : setModalOpen(true))}
        style={{
          position: 'fixed',
          left: 14,
          bottom: 14,
          zIndex: 90,
          border: 'none',
          background: 'rgba(23,49,74,.12)',
          color: '#17314a',
          borderRadius: 20,
          padding: '6px 14px',
          fontFamily: "'Archivo',sans-serif",
          fontSize: 11,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}
      >
        {loggedIn ? 'Uitloggen' : 'Log in'}
      </button>
      {modalOpen && <LoginModal onClose={() => setModalOpen(false)} />}
    </>
  );
}

function Magazine() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(BREAKPOINT).matches);
  const content = useContent();

  useEffect(() => {
    const mql = window.matchMedia(BREAKPOINT);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  if (content.loading) return null;

  return isMobile ? <MobileMagazine content={content} /> : <DesktopMagazine content={content} />;
}

export default function App() {
  return (
    <AuthProvider>
      <Magazine />
      <AccountControl />
    </AuthProvider>
  );
}

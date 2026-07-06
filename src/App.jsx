import { useEffect, useState } from 'react';
import DesktopMagazine from './desktop/DesktopMagazine.jsx';
import MobileMagazine from './mobile/MobileMagazine.jsx';
import { AuthProvider, useAuth } from './auth/AuthContext.jsx';
import { useContent } from './data/useContent.js';
import AdminLoginPage from './components/AdminLoginPage.jsx';

const BREAKPOINT = '(max-width: 760px)';

function isAdminPath(path) {
  return /\/admin\/?$/.test(path);
}

function siteRoot(path) {
  return path.replace(/\/admin\/?$/, '/') || '/';
}

function useRoute() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);
  const navigate = (to) => {
    window.history.pushState({}, '', to);
    setPath(to);
  };
  return [path, navigate];
}

function LogoutButton() {
  const { logout } = useAuth();
  return (
    <button
      onClick={logout}
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
      Uitloggen
    </button>
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
      <Root />
    </AuthProvider>
  );
}

function Root() {
  const [path, navigate] = useRoute();
  const { loggedIn, checking } = useAuth();

  if (isAdminPath(path)) {
    if (checking) return null;
    if (loggedIn) {
      navigate(siteRoot(path));
      return null;
    }
    return <AdminLoginPage onLoggedIn={() => navigate(siteRoot(path))} />;
  }

  return (
    <>
      <Magazine />
      {loggedIn && <LogoutButton />}
    </>
  );
}

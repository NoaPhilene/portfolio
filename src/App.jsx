import { useEffect, useState } from 'react';
import DesktopMagazine from './desktop/DesktopMagazine.jsx';
import MobileMagazine from './mobile/MobileMagazine.jsx';

const BREAKPOINT = '(max-width: 760px)';

export default function App() {
  const [isMobile, setIsMobile] = useState(() => window.matchMedia(BREAKPOINT).matches);

  useEffect(() => {
    const mql = window.matchMedia(BREAKPOINT);
    const onChange = (e) => setIsMobile(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return isMobile ? <MobileMagazine /> : <DesktopMagazine />;
}

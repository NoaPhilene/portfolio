import { useEffect, useRef, useState } from 'react';
import './mobile.css';
import { MobilePage } from './Pages.jsx';
import { pageKickers } from '../data/strings.js';
import { ArrowLeftIcon, ArrowRightIcon } from '../components/icons.jsx';
import { PAGE_BG, PAGE_FG, PAGE_ACCENT, PAGE_ALIGN } from '../data/theme.js';
import { useAuth } from '../auth/AuthContext.jsx';
import Editable from '../components/Editable.jsx';

const KICKER_KEYS = ['coverKicker', 'ctKicker', 'abKicker', 'skKicker', 'wkKicker', 'coKicker'];

const archivo = "'Archivo',sans-serif";

const N = 6;
const TURN_MS = 550;

const langBtnStyle = (active) => ({
  padding: '5px 12px',
  border: 'none',
  borderRadius: 24,
  cursor: 'pointer',
  fontFamily: archivo,
  fontSize: 12,
  fontWeight: 700,
  letterSpacing: '.08em',
  background: active ? '#17314a' : 'transparent',
  color: active ? '#fff' : '#8a7f6a',
  transition: 'all .2s ease',
});

export default function MobileMagazine({ content }) {
  const {
    STRINGS, PROJECTS, shared, siteImages,
    updateString, updateShared, updateSiteImage,
    createProject, updateProject, deleteProject, addProjectImage, removeProjectImage,
  } = content;
  const { loggedIn } = useAuth();
  const [i, setI] = useState(0);
  const [lang, setLang] = useState('en');
  const [proj, setProj] = useState(0);
  const [dir, setDir] = useState('next');
  const [animKey, setAnimKey] = useState(0);

  const t = STRINGS[lang];

  const goTo = (n) => {
    n = Math.min(Math.max(n, 0), N - 1);
    if (n === i) return;
    setDir(n > i ? 'next' : 'prev');
    setI(n);
    setAnimKey((k) => k + 1);
  };
  const next = () => goTo(i + 1);
  const prev = () => goTo(i - 1);
  const selectProject = (idx) => {
    setProj(idx);
    setAnimKey((k) => k + 1);
  };

  const nextRef = useRef(next);
  const prevRef = useRef(prev);
  nextRef.current = next;
  prevRef.current = prev;

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') nextRef.current();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevRef.current();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const curProj = PROJECTS[Math.min(proj, PROJECTS.length - 1)];
  const hasLink = !!(curProj.url && curProj.url.trim());
  const cleanUrl = hasLink ? curProj.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
  const sel = {
    id: curProj.id,
    name: curProj.name,
    year: curProj.year,
    cat: curProj.cat[lang],
    desc: curProj.desc[lang],
    tags: curProj.tags,
    images: curProj.images || [],
    hasLink,
    noLink: !hasLink,
    url: cleanUrl,
    linkHref: hasLink ? 'https://' + cleanUrl : '#',
    offline: t.wkOffline,
  };
  const projList = PROJECTS.map((p, idx) => ({
    id: p.id,
    onClick: () => selectProject(idx),
    num: String(idx + 1).padStart(2, '0'),
    active: idx === proj,
  }));

  const handleAddProject = async () => {
    await createProject();
    selectProject(PROJECTS.length);
  };

  const ctx = {
    t,
    lang,
    sel,
    projList,
    shared,
    siteImages,
    loggedIn,
    updateString,
    updateShared,
    updateSiteImage,
    updateProject,
    deleteProject,
    addProjectImage,
    removeProjectImage,
    onAddProject: handleAddProject,
    go: goTo,
  };

  const page = {
    bg: PAGE_BG[i],
    fg: PAGE_FG[i],
    accent: PAGE_ACCENT[i],
    align: PAGE_ALIGN[i],
    kicker: pageKickers(t)[i],
  };

  const pageWrapStyle =
    animKey === 0
      ? { position: 'absolute', inset: 0, transformOrigin: '100% 50%', backfaceVisibility: 'hidden' }
      : dir === 'next'
      ? { position: 'absolute', inset: 0, transformOrigin: '100% 50%', backfaceVisibility: 'hidden', animation: `turnPrev ${TURN_MS}ms cubic-bezier(.45,.05,.35,1) forwards` }
      : { position: 'absolute', inset: 0, transformOrigin: '0% 50%', backfaceVisibility: 'hidden', animation: `turnBack ${TURN_MS}ms cubic-bezier(.45,.05,.35,1) forwards` };

  const pageLabel = String(i + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');

  return (
    <div
      className="magazine-mobile"
      style={{ position: 'fixed', inset: 0, height: '100dvh', overflow: 'hidden', background: page.bg, fontFamily: archivo, perspective: 1500 }}
    >
      <div style={{ position: 'fixed', top: 'max(12px, env(safe-area-inset-top))', right: 'max(16px, env(safe-area-inset-right))', zIndex: 70, display: 'flex', gap: 4, background: '#fff', borderRadius: 30, padding: 4, boxShadow: '0 6px 18px rgba(0,0,0,.14)' }}>
        <button onClick={() => setLang('en')} style={langBtnStyle(lang === 'en')}>EN</button>
        <button onClick={() => setLang('nl')} style={langBtnStyle(lang === 'nl')}>NL</button>
      </div>

      <div style={{ position: 'absolute', inset: 0, transform: 'rotateY(-2.5deg)', transformOrigin: '100% 50%', transformStyle: 'preserve-3d' }}>
        <div key={i + '-' + animKey} style={pageWrapStyle}>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              padding: 'calc(env(safe-area-inset-top) + 56px) max(20px, env(safe-area-inset-right) + 20px) calc(env(safe-area-inset-bottom) + 68px) max(20px, env(safe-area-inset-left) + 20px)',
              display: 'flex',
              flexDirection: 'column',
              color: page.fg,
            }}
          >
            <div style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.26em', textTransform: 'uppercase', fontWeight: 700, color: page.accent }}>
              <Editable value={page.kicker} onSave={(v) => updateString(KICKER_KEYS[i], lang, v)} />
            </div>

            <MobilePage index={i} ctx={ctx} />

            <div style={{ textAlign: page.align, fontFamily: archivo, fontSize: 11, letterSpacing: '.22em', color: page.accent, paddingTop: 14 }}>{pageLabel}</div>
          </div>
        </div>
      </div>

      {/* fold spine: the rest of the magazine folds away behind the right edge */}
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 46, pointerEvents: 'none', zIndex: 9, background: 'linear-gradient(to left, rgba(0,0,0,.4) 0%, rgba(0,0,0,.16) 40%, rgba(0,0,0,0) 100%)', mixBlendMode: 'multiply' }} />
      <div style={{ position: 'absolute', right: 9, top: 0, bottom: 0, width: 5, pointerEvents: 'none', zIndex: 10, background: 'linear-gradient(to right, rgba(255,255,255,.35), rgba(0,0,0,.3))', boxShadow: '-2px 0 5px rgba(0,0,0,.25)' }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 9, pointerEvents: 'none', zIndex: 9, background: 'repeating-linear-gradient(to bottom, rgba(0,0,0,.35) 0px, rgba(0,0,0,.1) 2px, rgba(0,0,0,.3) 4px)', opacity: 0.55 }} />
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 10, pointerEvents: 'none', zIndex: 9, background: 'linear-gradient(to right, rgba(0,0,0,.12), rgba(0,0,0,0))' }} />

      {/* tap zones */}
      <div onClick={prev} style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '30%', zIndex: 20, cursor: 'pointer' }} />
      <div onClick={next} style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '30%', zIndex: 20, cursor: 'pointer' }} />

      {/* Arrows live in the bottom bar (not floating mid-screen) — the design
          tool's arrows sat in dead canvas space around a mocked-up phone
          frame, which doesn't exist once this fills a real device viewport,
          so mid-screen placement would overlap page content instead. */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 'calc(env(safe-area-inset-bottom) + 46px)', paddingBottom: 'env(safe-area-inset-bottom)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, zIndex: 60 }}>
        <button
          onClick={prev}
          style={{ width: 34, height: 34, borderRadius: '50%', border: 'none', background: '#fff', color: '#17314a', boxShadow: '0 4px 14px rgba(0,0,0,.16)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: i === 0 ? 0.28 : 1, flex: 'none' }}
        >
          <ArrowLeftIcon size={14} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {Array.from({ length: N }, (_, d) => (
            <button
              key={d}
              onClick={() => goTo(d)}
              style={{ width: d === i ? 24 : 8, height: 6, borderRadius: 4, background: d === i ? '#17314a' : 'rgba(31,29,26,.28)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all .25s ease' }}
            />
          ))}
        </div>
        <button
          onClick={next}
          style={{ width: 34, height: 34, borderRadius: '50%', border: 'none', background: '#fff', color: '#17314a', boxShadow: '0 4px 14px rgba(0,0,0,.16)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: i === N - 1 ? 0.28 : 1, flex: 'none' }}
        >
          <ArrowRightIcon size={14} />
        </button>
      </div>
    </div>
  );
}

import { useCallback, useEffect, useRef, useState } from 'react';
import './desktop.css';
import { SpreadRow, LEFT_BG, RIGHT_BG } from './Spreads.jsx';
import { WaveField } from '../components/WaveBackdrop.jsx';
import { ArrowLeftIcon, ArrowRightIcon, CloseIcon } from '../components/icons.jsx';
import { GOLD } from '../data/theme.js';
import { useAuth } from '../auth/AuthContext.jsx';
import Editable from '../components/Editable.jsx';

const archivo = "'Archivo',sans-serif";
const archivoBlack = "'Archivo Black',sans-serif";
const spectral = "'Spectral',serif";

const N = 6;
const FLIP_MS = 1180;
const FLIP_EASE = 'cubic-bezier(.62,.02,.34,1)';

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

export default function DesktopMagazine({ content }) {
  const {
    STRINGS, PROJECTS, shared, siteImages,
    updateString, updateShared, updateSiteImage,
    createProject, updateProject, moveProject, deleteProject, addProjectImage, removeProjectImage,
  } = content;
  const { loggedIn } = useAuth();
  const [i, setI] = useState(0);
  const [lang, setLang] = useState('en');
  const [proj, setProj] = useState(0);
  const pendingSelectId = useRef(null);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [flip, setFlip] = useState(null); // { dir: 'next'|'prev', from, to }
  const stageRef = useRef(null);
  const flipTimeout = useRef(null);

  const t = STRINGS[lang];

  useEffect(() => {
    function fit() {
      const el = stageRef.current;
      if (!el) return;
      const s = Math.min((window.innerWidth - 40) / 1320, (window.innerHeight - 120) / 880);
      el.style.transform = `translate(-50%,-50%) scale(${Math.max(s, 0.1)})`;
    }
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);

  const startFlip = useCallback((dir, from, to) => {
    setFlip({ dir, from, to });
    clearTimeout(flipTimeout.current);
    flipTimeout.current = setTimeout(() => {
      setI(to);
      setFlip(null);
    }, FLIP_MS);
  }, []);

  // refs (rather than useCallback) so arrow/keyboard/dot handlers always see
  // the latest `i`/`flip` without re-subscribing the keydown listener
  const nextRef = useRef();
  const prevRef = useRef();
  const goToRef = useRef();
  nextRef.current = () => {
    if (flip) return;
    const to = i + 1;
    if (to >= N) return;
    startFlip('next', i, to);
  };
  prevRef.current = () => {
    if (flip) return;
    const to = i - 1;
    if (to < 0) return;
    startFlip('prev', i, to);
  };
  goToRef.current = (n) => {
    if (flip) return;
    setI(Math.min(Math.max(n, 0), N - 1));
  };

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') nextRef.current();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prevRef.current();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => () => clearTimeout(flipTimeout.current), []);

  // ── selected work ──
  const curProj = PROJECTS[Math.min(proj, PROJECTS.length - 1)];
  const hasLink = !!(curProj.url && curProj.url.trim());
  const cleanUrl = hasLink ? curProj.url.replace(/^https?:\/\//, '').replace(/\/$/, '') : '';
  const sel = {
    id: curProj.id,
    name: curProj.name,
    year: curProj.year,
    cat: curProj.cat[lang],
    desc: curProj.desc[lang],
    numName: 'No_' + String(proj + 1).padStart(2, '0'),
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
    onClick: () => setProj(idx),
    num: String(idx + 1).padStart(2, '0'),
    name: p.name,
    cat: p.cat[lang],
    year: p.year,
    active: idx === proj,
    isFirst: idx === 0,
    isLast: idx === PROJECTS.length - 1,
  }));
  const gridList = PROJECTS.map((p, idx) => ({
    id: p.id,
    onClick: () => {
      setProj(idx);
      setPickerOpen(false);
    },
    num: String(idx + 1).padStart(2, '0'),
    name: p.name,
    cat: p.cat[lang],
    year: p.year,
    active: idx === proj,
  }));

  const handleAddProject = async () => {
    await createProject();
    setProj(PROJECTS.length);
  };

  const handleMoveProject = (id, direction) => {
    pendingSelectId.current = id;
    moveProject(id, direction);
  };

  useEffect(() => {
    if (pendingSelectId.current == null) return;
    const idx = PROJECTS.findIndex((p) => p.id === pendingSelectId.current);
    if (idx !== -1) setProj(idx);
    pendingSelectId.current = null;
  }, [PROJECTS]);

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
    onMoveProject: handleMoveProject,
    openPicker: () => setPickerOpen(true),
    go: (n) => goToRef.current(n),
  };

  const shownIndices = flip ? [...new Set([flip.from, flip.to])] : [i];
  const L = String(2 * i + 1).padStart(2, '0');
  const R = String(2 * i + 2).padStart(2, '0');

  // ── page-turn leaf ──
  let leaf = null;
  if (flip) {
    const isNext = flip.dir === 'next';
    const frontHalf = isNext ? 'right' : 'left';
    const backHalf = isNext ? 'left' : 'right';
    const frontBg = isNext ? RIGHT_BG[flip.from] : LEFT_BG[flip.from];
    const backBg = isNext ? LEFT_BG[flip.to] : RIGHT_BG[flip.to];
    const frontSheen = isNext
      ? 'linear-gradient(to right, rgba(0,0,0,.26) 0%, rgba(0,0,0,0) 26%, rgba(255,255,255,.10) 72%, rgba(0,0,0,.18) 100%)'
      : 'linear-gradient(to left, rgba(0,0,0,.26) 0%, rgba(0,0,0,0) 26%, rgba(255,255,255,.10) 72%, rgba(0,0,0,.18) 100%)';
    const backSheen = isNext
      ? 'linear-gradient(to left, rgba(0,0,0,.26) 0%, rgba(0,0,0,0) 26%, rgba(255,255,255,.10) 72%, rgba(0,0,0,.18) 100%)'
      : 'linear-gradient(to right, rgba(0,0,0,.26) 0%, rgba(0,0,0,0) 26%, rgba(255,255,255,.10) 72%, rgba(0,0,0,.18) 100%)';
    const faceBase = {
      position: 'absolute',
      inset: 0,
      backfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden',
      boxShadow: 'inset 0 0 90px rgba(0,0,0,.20)',
      borderRadius: 2,
      overflow: 'hidden',
    };
    const leafStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '50%',
      left: isNext ? '50%' : '0',
      transformOrigin: isNext ? 'left center' : 'right center',
      transformStyle: 'preserve-3d',
      WebkitTransformStyle: 'preserve-3d',
      zIndex: 20,
      willChange: 'transform',
      animation: `${isNext ? 'leafNext' : 'leafPrev'} ${FLIP_MS}ms ${FLIP_EASE} forwards, leafLift ${FLIP_MS}ms ease-in-out forwards`,
    };
    const leafFrontStyle = { ...faceBase, backgroundColor: frontBg, backgroundImage: frontSheen };
    const leafBackStyle = { ...faceBase, backgroundColor: backBg, backgroundImage: backSheen, transform: 'rotateY(180deg)' };
    const leafGlossStyle = {
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      backgroundImage: 'linear-gradient(105deg, rgba(255,255,255,0) 42%, rgba(255,255,255,.4) 50%, rgba(255,255,255,0) 58%)',
      backgroundSize: '260% 100%',
      opacity: 0,
      animation: `leafGloss ${FLIP_MS}ms ease forwards`,
    };
    const leafShadeStyle = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '50%',
      left: isNext ? '0' : '50%',
      background: isNext
        ? 'linear-gradient(to right, rgba(6,14,24,.5), rgba(6,14,24,0) 82%)'
        : 'linear-gradient(to left, rgba(6,14,24,.5), rgba(6,14,24,0) 82%)',
      zIndex: 19,
      pointerEvents: 'none',
      opacity: 0,
      animation: `${isNext ? 'leafShadeL' : 'leafShadeR'} ${FLIP_MS}ms ease forwards`,
    };
    const cropStyle = (half) => ({ position: 'absolute', top: 0, left: half === 'right' ? -660 : 0, width: 1320, height: 880, display: 'flex', pointerEvents: 'none' });

    leaf = (
      <>
        <div style={leafShadeStyle} />
        <div style={leafStyle}>
          <div style={leafFrontStyle}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <div style={cropStyle(frontHalf)}>
                <SpreadRow index={flip.from} ctx={ctx} />
              </div>
            </div>
            <div style={leafGlossStyle} />
          </div>
          <div style={leafBackStyle}>
            <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
              <div style={cropStyle(backHalf)}>
                <SpreadRow index={flip.to} ctx={ctx} />
              </div>
            </div>
            <div style={leafGlossStyle} />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="magazine-desktop" style={{ position: 'fixed', inset: 0, overflow: 'hidden', background: 'radial-gradient(circle at 50% 38%, #d8d5cf 0%, #bcb8b0 100%)', fontFamily: archivo }}>
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: 46, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: archivo, fontSize: 11, letterSpacing: '.34em', textTransform: 'uppercase', color: '#7c7468', zIndex: 50 }}>
        Noa Philène van Mil — Portfolio Magazine · Vol. 01
      </div>

      <div style={{ position: 'fixed', top: 12, right: 24, zIndex: 70, display: 'flex', gap: 4, background: '#fff', borderRadius: 30, padding: 4, boxShadow: '0 6px 18px rgba(0,0,0,.14)' }}>
        <button onClick={() => setLang('en')} style={langBtnStyle(lang === 'en')}>EN</button>
        <button onClick={() => setLang('nl')} style={langBtnStyle(lang === 'nl')}>NL</button>
      </div>

      <div ref={stageRef} style={{ position: 'absolute', left: '50%', top: '50%', width: 1320, height: 880, transform: 'translate(-50%,-50%)', transformOrigin: 'center center' }}>
        <div style={{ position: 'absolute', inset: 0, transform: 'translate(11px,13px)', background: '#e3dccd', borderRadius: 2, boxShadow: '0 34px 76px rgba(15,25,40,.42)', zIndex: 0 }} />
        <div style={{ position: 'absolute', inset: 0, transform: 'translate(5px,6px)', background: '#eee7d9', borderRadius: 2, zIndex: 1 }} />

        <div style={{ position: 'absolute', inset: 0, zIndex: 2, overflow: 'hidden', borderRadius: 2, boxShadow: '0 30px 70px rgba(15,25,40,.4)', perspective: 2600 }}>
          {shownIndices.map((idx) => {
            let zIndex, clipPath;
            if (flip) {
              if (idx === flip.to) {
                zIndex = 1;
                clipPath = 'none';
              } else {
                zIndex = 2;
                clipPath = flip.dir === 'next' ? 'inset(0 50% 0 0)' : 'inset(0 0 0 50%)';
              }
            } else {
              zIndex = 'auto';
              clipPath = 'none';
            }
            return (
              <div key={idx} style={{ position: 'absolute', inset: 0, display: 'flex', zIndex, clipPath }}>
                <SpreadRow index={idx} ctx={ctx} />
              </div>
            );
          })}

          {leaf}

          {pickerOpen && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 40, background: '#16304a', padding: '64px 72px', display: 'flex', flexDirection: 'column', animation: 'spreadFade .35s ease' }}>
              <WaveField w={1320} h={880} variant="picker" colorA="#244e74" opacityA={0.5} colorB="#0f2236" />
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, color: GOLD }}>
                    <Editable value={t.wkKicker} onSave={(v) => updateString('wkKicker', lang, v)} />
                  </div>
                  <div style={{ marginTop: 12, fontFamily: archivoBlack, fontSize: 64, lineHeight: 0.9, color: '#f1ebdf' }}>
                    <Editable value={t.wkPickTitle} onSave={(v) => updateString('wkPickTitle', lang, v)} />
                  </div>
                </div>
                <button
                  onClick={() => setPickerOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'rgba(255,255,255,.06)', border: '1px solid rgba(236,229,214,.24)', color: '#f1ebdf', borderRadius: 40, padding: '12px 22px', cursor: 'pointer', fontFamily: archivo, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', fontWeight: 600 }}
                >
                  <Editable value={t.wkPickClose} onSave={(v) => updateString('wkPickClose', lang, v)} />
                  <CloseIcon />
                </button>
              </div>
              <div style={{ marginTop: 44, flex: 1, minHeight: 0, overflowY: 'auto', display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 18, alignContent: 'start', paddingRight: 6 }}>
                {gridList.map((g) => (
                  <div key={g.num} onClick={g.onClick} style={{ cursor: 'pointer', display: 'flex' }}>
                    <div
                      style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 7,
                        padding: 24,
                        borderRadius: 12,
                        minHeight: 168,
                        background: g.active ? '#2f5a86' : 'rgba(255,255,255,.04)',
                        border: g.active ? '1px solid #c7ab7d' : '1px solid rgba(236,229,214,.18)',
                      }}
                    >
                      <div style={{ fontFamily: archivoBlack, fontSize: 24, lineHeight: 1, color: GOLD }}>{g.num}</div>
                      <div style={{ fontFamily: archivoBlack, fontSize: 23, color: '#f1ebdf' }}>{g.name}</div>
                      <div style={{ fontFamily: spectral, fontSize: 14, color: g.active ? 'rgba(236,229,214,.9)' : 'rgba(236,229,214,.7)' }}>{g.cat}</div>
                      <div style={{ marginTop: 'auto', fontFamily: archivo, fontSize: 12, letterSpacing: '.2em', color: GOLD }}>{g.year}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 96, transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 8, background: 'linear-gradient(to right, rgba(0,0,0,0) 0%, rgba(0,0,0,.10) 38%, rgba(0,0,0,.26) 50%, rgba(0,0,0,.10) 62%, rgba(0,0,0,0) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: 2, transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 9, background: 'rgba(0,0,0,.32)' }} />
        </div>
      </div>

      <button
        onClick={() => prevRef.current()}
        style={{ position: 'fixed', left: 28, top: '50%', transform: 'translateY(-50%)', width: 58, height: 58, borderRadius: '50%', border: 'none', background: '#fff', color: '#17314a', boxShadow: '0 8px 24px rgba(0,0,0,.18)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, opacity: i === 0 ? 0.28 : 1, transition: 'background .2s,color .2s' }}
      >
        <ArrowLeftIcon />
      </button>
      <button
        onClick={() => nextRef.current()}
        style={{ position: 'fixed', right: 28, top: '50%', transform: 'translateY(-50%)', width: 58, height: 58, borderRadius: '50%', border: 'none', background: '#fff', color: '#17314a', boxShadow: '0 8px 24px rgba(0,0,0,.18)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60, opacity: i === N - 1 ? 0.28 : 1, transition: 'background .2s,color .2s' }}
      >
        <ArrowRightIcon />
      </button>

      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 58, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 42px', zIndex: 60 }}>
        <span style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', color: '#5f5849' }}>
          P. {L}–{R} · <Editable value={t.titles[i]} onSave={(v) => updateString(`titles.${i}`, lang, v)} />
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {Array.from({ length: N }, (_, d) => (
            <button
              key={d}
              onClick={() => goToRef.current(d)}
              style={{ width: d === i ? 26 : 10, height: 6, borderRadius: 4, background: d === i ? '#17314a' : 'rgba(31,29,26,.24)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all .25s ease' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import ImageSlot from '../components/ImageSlot.jsx';
import { GOLD, SKILL_CIRCLES, SPECIALTIES_COMPACT } from '../data/theme.js';

const archivo = "'Archivo',sans-serif";
const archivoBlack = "'Archivo Black',sans-serif";
const spectral = "'Spectral',serif";

// ───────────────────────── Page 0 · Cover ─────────────────────────
function CoverPage({ t }) {
  return (
    <>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <div style={{ width: 158, height: 158, position: 'relative' }}>
          <ImageSlot placeholder="Jouw foto" shape="circle" style={{ width: 158, height: 158 }} />
          <div style={{ position: 'absolute', inset: -8, border: '1px solid rgba(199,171,125,.5)', borderRadius: '50%', pointerEvents: 'none' }} />
        </div>
        <div style={{ textAlign: 'center', lineHeight: 0.86 }}>
          <div style={{ fontFamily: archivoBlack, color: '#f1ebdf', fontSize: 44, letterSpacing: '-.01em' }}>NOA</div>
          <div style={{ fontFamily: archivoBlack, fontSize: 44, color: 'transparent', WebkitTextStroke: '1.2px #c7ab7d' }}>PHILÈNE</div>
          <div style={{ fontFamily: archivoBlack, color: '#f1ebdf', fontSize: 44 }}>VAN MIL</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 22, height: 2, background: GOLD, display: 'inline-block' }} />
          <span style={{ fontFamily: archivo, color: '#ece5d6', fontSize: 13, letterSpacing: '.05em' }}>{t.cvName}</span>
          <span style={{ width: 22, height: 2, background: GOLD, display: 'inline-block' }} />
        </div>
      </div>
      <div style={{ marginTop: 'auto', textAlign: 'center', fontFamily: archivo, fontSize: 12, letterSpacing: '.22em', color: GOLD, paddingTop: 20 }}>noaphilene.dev</div>
    </>
  );
}

// ───────────────────────── Page 1 · Contents ─────────────────────────
function TocRow({ n, title, desc, onClick, last }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
        padding: '14px 0',
        borderTop: '1px solid rgba(31,29,26,.16)',
        borderBottom: last ? '1px solid rgba(31,29,26,.16)' : 'none',
        cursor: 'pointer',
      }}
    >
      <div style={{ fontFamily: archivoBlack, fontSize: 26, lineHeight: 0.9, color: GOLD, minWidth: 38 }}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: archivoBlack, fontSize: 16, color: '#1f1d1a' }}>{title}</div>
        <div style={{ fontFamily: spectral, fontSize: 12.5, lineHeight: 1.4, color: '#6b6457', marginTop: 2 }}>{desc}</div>
      </div>
    </div>
  );
}

function ContentsPage({ t, go }) {
  return (
    <>
      <div style={{ marginTop: 16, fontFamily: archivoBlack, fontSize: 52, lineHeight: 0.86, color: '#1f1d1a' }}>{t.ctBig1}</div>
      <div style={{ fontFamily: archivoBlack, fontSize: 52, lineHeight: 0.94, color: 'transparent', WebkitTextStroke: '1.2px #1f1d1a' }}>{t.ctBig2}</div>
      <div style={{ marginTop: 14, fontFamily: spectral, fontSize: 14, lineHeight: 1.55, color: '#544e43' }}>{t.ctIntro}</div>
      <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column' }}>
        <TocRow n="01" title={t.i1t} desc={t.i1d} onClick={() => go(2)} />
        <TocRow n="02" title={t.i2t} desc={t.i2d} onClick={() => go(3)} />
        <TocRow n="03" title={t.i3t} desc={t.i3d} onClick={() => go(4)} />
        <TocRow n="04" title={t.i5t} desc={t.i5d} onClick={() => go(5)} last />
      </div>
    </>
  );
}

// ───────────────────────── Page 2 · About ─────────────────────────
function AboutPage({ t }) {
  return (
    <>
      <div style={{ marginTop: 14, fontFamily: archivoBlack, fontSize: 40, lineHeight: 0.86, color: '#f1ebdf' }}>{t.abBig1}</div>
      <div style={{ fontFamily: archivoBlack, fontSize: 40, lineHeight: 0.94, color: 'transparent', WebkitTextStroke: '1.2px #c7ab7d' }}>{t.abBig2}</div>
      <div style={{ marginTop: 18 }}>
        <ImageSlot placeholder="Portretfoto" shape="rounded" radius={2} style={{ width: '100%', height: 230 }} />
        <div
          style={{
            marginTop: 18,
            fontFamily: spectral,
            fontSize: 14,
            lineHeight: 1.6,
            color: '#ece5d6',
            overflow: 'hidden',
            maxHeight: 14 * 1.6 * 7,
          }}
        >
          {t.abBio}
        </div>
      </div>
      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid rgba(236,229,214,.2)' }}>
          <span style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>{t.abL1}</span>
          <span style={{ fontFamily: archivoBlack, fontSize: 15, color: '#f1ebdf' }}>{t.abV1}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid rgba(236,229,214,.2)', borderBottom: '1px solid rgba(236,229,214,.2)' }}>
          <span style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>{t.abL2}</span>
          <span style={{ fontFamily: archivoBlack, fontSize: 15, color: '#f1ebdf' }}>{t.abV2}</span>
        </div>
      </div>
    </>
  );
}

// ───────────────────────── Page 3 · Skills & Process ─────────────────────────
function SkillsPage({ t }) {
  return (
    <>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontFamily: archivoBlack, fontSize: 38, lineHeight: 0.88, color: '#1f1d1a' }}>
          TOOLS &amp;
          <br />
          STACK
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
          {SKILL_CIRCLES.map((s) => (
            <div
              key={s.code}
              style={{ width: 56, height: 56, borderRadius: '50%', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: archivoBlack, fontSize: 15, color: '#1f1d1a', background: '#fff' }}
            >
              {s.code}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SPECIALTIES_COMPACT.map((s) => (
            <span key={s} style={{ padding: '7px 14px', border: '1px solid rgba(31,29,26,.28)', borderRadius: 40, fontFamily: archivo, fontSize: 12.5, color: '#1f1d1a' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <div style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 700, color: '#8a7f6a', marginBottom: 18 }}>{t.skProcess}</div>
        {t.stepsCompact.map((s, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: 28 }}>
            <div style={{ flex: 'none', width: 32, height: 32, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: archivoBlack, fontSize: 12.5, color: '#17314a' }}>
              {String(idx + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: archivo, fontSize: 14.5, lineHeight: 1.45, color: '#1f1d1a', paddingTop: 6 }}>{s}</div>
          </div>
        ))}
      </div>
    </>
  );
}

// ───────────────────────── Page 4 · Selected Work ─────────────────────────
function WorkPage({ t, sel, projList }) {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: 14 }}>
      <div>
        <ImageSlot placeholder="Project beeld" shape="rect" radius={2} style={{ width: '100%', height: 170 }} />
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: archivoBlack, fontSize: 30, lineHeight: 0.95, color: '#f1ebdf' }}>{sel.name}</div>
          <div style={{ fontFamily: archivo, fontSize: 11, letterSpacing: '.18em', color: 'rgba(236,229,214,.62)' }}>{sel.year}</div>
        </div>
        <div style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD, marginTop: 4 }}>{sel.cat}</div>
        <div
          style={{
            marginTop: 10,
            fontFamily: spectral,
            fontSize: 13,
            lineHeight: 1.5,
            color: 'rgba(236,229,214,.86)',
            overflow: 'hidden',
            maxHeight: 13 * 1.5 * 4,
          }}
        >
          {sel.desc}
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sel.tags.map((tg) => (
            <span key={tg} style={{ padding: '5px 12px', border: '1px solid rgba(236,229,214,.34)', borderRadius: 40, fontFamily: archivo, fontSize: 11, color: '#f1ebdf' }}>
              {tg}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '10px 0' }}>
          {projList.map((p) => (
            <div
              key={p.num}
              onClick={p.onClick}
              style={{
                flex: 'none',
                width: 38,
                height: 38,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontFamily: archivoBlack,
                fontSize: 13,
                background: p.active ? '#2f5a86' : '#fff',
                color: p.active ? '#f1ebdf' : '#1f1d1a',
                border: p.active ? '1px solid #2f5a86' : '1px solid rgba(31,29,26,.2)',
              }}
            >
              {p.num}
            </div>
          ))}
        </div>
        {sel.hasLink ? (
          <a
            href={sel.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: archivo, fontSize: 11.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#f1ebdf', fontWeight: 700, textDecoration: 'none', borderBottom: `1.5px solid ${GOLD}`, paddingBottom: 2 }}
          >
            {sel.url} ↗
          </a>
        ) : (
          <span style={{ fontFamily: archivo, fontSize: 11.5, color: 'rgba(236,229,214,.5)' }}>{sel.offline}</span>
        )}
      </div>
    </div>
  );
}

// ───────────────────────── Page 5 · Contact ─────────────────────────
function ContactPage({ t }) {
  return (
    <>
      <div style={{ marginTop: 14, fontFamily: archivoBlack, fontSize: 52, lineHeight: 0.86, color: '#f1ebdf' }}>{t.coBig1}</div>
      <div style={{ fontFamily: archivoBlack, fontSize: 52, lineHeight: 0.94, color: 'transparent', WebkitTextStroke: '1.2px #c7ab7d' }}>{t.coBig2}</div>
      <div style={{ marginTop: 12, fontFamily: spectral, fontStyle: 'italic', fontSize: 15, lineHeight: 1.45, color: '#ece5d6' }}>{t.coSub}</div>
      <div style={{ width: 180, height: 180, alignSelf: 'center', margin: '26px auto 0', position: 'relative' }}>
        <ImageSlot placeholder="Foto" shape="circle" style={{ width: 180, height: 180 }} />
      </div>
      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid rgba(236,229,214,.2)' }}>
          <span style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>{t.coL1}</span>
          <span style={{ fontFamily: archivoBlack, fontSize: 14, color: '#f1ebdf' }}>Noavanmil@gmail.com</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid rgba(236,229,214,.2)' }}>
          <span style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>{t.coL2}</span>
          <a href="https://www.linkedin.com/in/noaphilene" target="_blank" rel="noopener noreferrer" style={{ fontFamily: archivoBlack, fontSize: 14, color: '#f1ebdf', textDecoration: 'none', borderBottom: `1.5px solid ${GOLD}` }}>
            in/noaphilene
          </a>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid rgba(236,229,214,.2)', borderBottom: '1px solid rgba(236,229,214,.2)' }}>
          <span style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>{t.coL3}</span>
          <span style={{ fontFamily: archivoBlack, fontSize: 14, color: '#f1ebdf' }}>Gorinchem</span>
        </div>
      </div>
    </>
  );
}

const PAGES = [CoverPage, ContentsPage, AboutPage, SkillsPage, WorkPage, ContactPage];

export function MobilePage({ index, ctx }) {
  const Cmp = PAGES[index];
  return <Cmp {...ctx} />;
}

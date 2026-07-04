import ImageSlot from '../components/ImageSlot.jsx';
import { WaveField, WaveAccent } from '../components/WaveBackdrop.jsx';
import { ExternalLinkIcon } from '../components/icons.jsx';
import { LEFT_BG, RIGHT_BG, SKILL_CIRCLES, SPECIALTIES, GOLD } from '../data/theme.js';

const archivo = "'Archivo',sans-serif";
const archivoBlack = "'Archivo Black',sans-serif";
const spectral = "'Spectral',serif";

function Page({ bg, children, style, wave, padding = '62px 56px' }) {
  return (
    <div
      style={{
        width: 660,
        height: 880,
        background: bg,
        position: 'relative',
        overflow: 'hidden',
        padding,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {wave}
      {children}
    </div>
  );
}

function PageNum({ n, side }) {
  const text = side === 'left' ? `— ${n}` : `${n} —`;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 22,
        [side]: 48,
        fontFamily: archivo,
        fontSize: 12,
        letterSpacing: '.22em',
        color: 'inherit',
        zIndex: 5,
      }}
    >
      {text}
    </div>
  );
}

function Kicker({ children, color }) {
  return (
    <div style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, color }}>
      {children}
    </div>
  );
}

function Row({ label, value, first, last, color = '#8a7f6a', valueColor = '#1f1d1a', border = 'rgba(31,29,26,.16)' }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '18px 0',
        borderTop: `1px solid ${border}`,
        borderBottom: last ? `1px solid ${border}` : 'none',
      }}
    >
      <span style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color }}>{label}</span>
      <span style={{ fontFamily: archivoBlack, fontSize: 20, color: valueColor }}>{value}</span>
    </div>
  );
}

// ───────────────────────── Spread 0 · Cover ─────────────────────────
function CoverSpread({ t }) {
  return (
    <>
      <Page bg="#1f3c5c" style={{ justifyContent: 'center', gap: 54, color: '#f1ebdf' }} wave={<WaveField colorA="#2c5580" colorB="#16304a" />}>
        <div style={{ lineHeight: 0.82, position: 'relative' }}>
          <div style={{ fontFamily: archivoBlack, color: '#f1ebdf', fontSize: 90, letterSpacing: '.02em' }}>PORT</div>
          <div style={{ fontFamily: archivoBlack, color: 'transparent', WebkitTextStroke: '1.5px #c7ab7d', fontSize: 70, letterSpacing: '.02em' }}>FOLIO</div>
        </div>
        <div>
          <div style={{ fontFamily: archivoBlack, color: '#f1ebdf', fontSize: 96, lineHeight: 0.86, letterSpacing: '-.02em' }}>NOA</div>
          <div style={{ fontFamily: archivoBlack, fontSize: 96, lineHeight: 0.92, letterSpacing: '-.02em', color: 'transparent', WebkitTextStroke: '2px #c7ab7d' }}>PHILÈNE</div>
          <div style={{ fontFamily: archivoBlack, color: '#f1ebdf', fontSize: 96, lineHeight: 0.92, letterSpacing: '-.02em' }}>VAN MIL</div>
          <div style={{ marginTop: 28, display: 'flex', alignItems: 'center', gap: 14 }}>
            <span style={{ width: 30, height: 2, background: GOLD, display: 'inline-block' }} />
            <span style={{ fontFamily: archivo, color: '#ece5d6', fontSize: 15, letterSpacing: '.05em' }}>{t.cvName}</span>
          </div>
        </div>
        <PageNum n="01" side="left" />
      </Page>
      <Page bg="#16304a" padding="0" style={{ color: '#f1ebdf' }}>
        <WaveField colorA="#24486c" colorB="#0f2236" />
        <WaveAccent colorA="#17314a" colorB="#1d3a57" opacityB={0.75} />
        <div style={{ position: 'absolute', top: 70, right: 44, fontFamily: archivoBlack, fontSize: 116, lineHeight: 0.8, color: 'transparent', WebkitTextStroke: '1.5px rgba(236,229,214,.26)', writingMode: 'vertical-rl', letterSpacing: '-.03em' }}>2026</div>
        <div style={{ position: 'absolute', top: 98, left: 66, width: 300, height: 300 }}>
          <ImageSlot placeholder="Jouw foto" shape="circle" style={{ width: 300, height: 300 }} />
          <div style={{ position: 'absolute', inset: -11, border: '1px solid rgba(199,171,125,.5)', borderRadius: '50%', pointerEvents: 'none' }} />
        </div>
        <div style={{ position: 'absolute', left: 66, bottom: 148 }}>
          <div style={{ fontFamily: archivoBlack, color: GOLD, fontSize: 46, lineHeight: 0.96 }}>WEB</div>
          <div style={{ fontFamily: archivoBlack, color: '#f1ebdf', fontSize: 46, lineHeight: 0.96 }}>{t.cvRole2}</div>
        </div>
        <div style={{ position: 'absolute', left: 66, bottom: 74, fontFamily: archivo, color: '#ece5d6', fontSize: 14, letterSpacing: '.22em', textTransform: 'uppercase' }}>noaphilene.dev</div>
        <PageNum n="02" side="right" />
      </Page>
    </>
  );
}

// ───────────────────────── Spread 1 · Contents ─────────────────────────
function TocRow({ n, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', gap: 22, alignItems: 'flex-start', padding: '24px 14px', margin: '0 -14px', borderTop: '1px solid rgba(31,29,26,.16)', cursor: 'pointer', borderRadius: 3 }}
    >
      <div style={{ fontFamily: archivoBlack, fontSize: 44, lineHeight: 0.9, color: GOLD, minWidth: 72 }}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: archivoBlack, fontSize: 22, color: '#1f1d1a' }}>{title}</div>
        <div style={{ fontFamily: spectral, fontSize: 14, lineHeight: 1.5, color: '#6b6457', marginTop: 4 }}>{desc}</div>
      </div>
      <div style={{ fontFamily: archivo, fontSize: 13, color: '#8a7f6a', alignSelf: 'center' }}>→</div>
    </div>
  );
}

function ContentsSpread({ t, go }) {
  const lightWave = <WaveField variant="light" />;
  return (
    <>
      <Page bg="#eef1f5" wave={lightWave}>
        <Kicker color="#8a7f6a">{t.ctKicker}</Kicker>
        <div style={{ marginTop: 30 }}>
          <div style={{ fontFamily: archivoBlack, fontSize: 116, lineHeight: 0.82, color: '#1f1d1a' }}>{t.ctBig1}</div>
          <div style={{ fontFamily: archivoBlack, fontSize: 116, lineHeight: 0.92, color: 'transparent', WebkitTextStroke: '2px #1f1d1a' }}>{t.ctBig2}</div>
        </div>
        <div style={{ marginTop: 30, fontFamily: spectral, fontSize: 16, lineHeight: 1.65, color: '#544e43', maxWidth: 430 }}>{t.ctIntro}</div>
        <div style={{ marginTop: 'auto', width: '100%', height: 200 }}>
          <ImageSlot placeholder="Sfeerbeeld" shape="rect" tone="light" style={{ width: '100%', height: 200 }} />
        </div>
        <PageNum n="03" side="left" />
      </Page>
      <Page bg="#eef1f5" wave={lightWave}>
        <div style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, color: '#8a7f6a', marginBottom: 6 }}>{t.ctPages}</div>
        <TocRow n="01" title={t.i1t} desc={t.i1d} onClick={() => go(2)} />
        <TocRow n="02" title={t.i2t} desc={t.i2d} onClick={() => go(3)} />
        <TocRow n="03" title={t.i3t} desc={t.i3d} onClick={() => go(4)} />
        <div style={{ borderBottom: '1px solid rgba(31,29,26,.16)' }}>
          <TocRow n="04" title={t.i5t} desc={t.i5d} onClick={() => go(5)} />
        </div>
        <PageNum n="04" side="right" />
      </Page>
    </>
  );
}

// ───────────────────────── Spread 2 · About ─────────────────────────
function AboutSpread({ t }) {
  return (
    <>
      <Page bg="#1f3c5c" style={{ justifyContent: 'space-between', color: '#f1ebdf' }} wave={<WaveField colorA="#2c5580" colorB="#16304a" />}>
        <Kicker color={GOLD}>{t.abKicker}</Kicker>
        <div>
          <div style={{ fontFamily: archivoBlack, fontSize: 66, lineHeight: 0.86, color: '#f1ebdf' }}>{t.abBig1}</div>
          <div style={{ fontFamily: archivoBlack, fontSize: 66, lineHeight: 0.94, color: 'transparent', WebkitTextStroke: '2px #c7ab7d' }}>{t.abBig2}</div>
        </div>
        <div style={{ fontFamily: spectral, fontSize: 19, lineHeight: 1.6, color: '#ece5d6', maxWidth: 500 }}>{t.abBio}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 30, height: 2, background: GOLD, display: 'inline-block' }} />
          <span style={{ fontFamily: spectral, fontStyle: 'italic', color: GOLD, fontSize: 20 }}>Noa Philène</span>
        </div>
        <PageNum n="05" side="left" />
      </Page>
      <Page bg="#eef1f5" wave={<WaveField variant="light" />}>
        <ImageSlot placeholder="Portretfoto" shape="rect" tone="light" style={{ width: '100%', height: 430 }} />
        <div style={{ marginTop: 26, fontFamily: archivo, fontSize: 12, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, color: '#8a7f6a' }}>{t.abAbout}</div>
        <div style={{ marginTop: 'auto' }}>
          <Row label={t.abL1} value={t.abV1} />
          <Row label={t.abL2} value={t.abV2} />
          <Row label={t.abL3} value={t.abV3} last />
        </div>
        <PageNum n="06" side="right" />
      </Page>
    </>
  );
}

// ───────────────────────── Spread 3 · Skills & Process ─────────────────────────
function SkillsSpread({ t }) {
  return (
    <>
      <Page bg="#eef1f5" wave={<WaveField variant="light" />}>
        <Kicker color="#8a7f6a">{t.skKicker}</Kicker>
        <div style={{ marginTop: 24, fontFamily: archivoBlack, fontSize: 76, lineHeight: 0.86, color: '#1f1d1a' }}>
          TOOLS &amp;<br />STACK
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 26 }}>
          {SKILL_CIRCLES.map((s) => (
            <div key={s.code} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 94, height: 94, borderRadius: '50%', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: archivoBlack, fontSize: 25, color: '#1f1d1a', background: '#fff' }}>
                {s.code}
              </div>
              <div style={{ fontFamily: archivo, fontSize: 12, color: '#6b6457' }}>{s.labelKey ? t[s.labelKey] : s.label}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, color: '#8a7f6a', marginBottom: 16 }}>{t.skSpec}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {SPECIALTIES.map((s) => (
              <span key={s} style={{ padding: '10px 20px', border: '1px solid rgba(31,29,26,.28)', borderRadius: 40, fontFamily: archivo, fontSize: 14, color: '#1f1d1a' }}>
                {s}
              </span>
            ))}
          </div>
        </div>
        <PageNum n="07" side="left" />
      </Page>
      <Page bg="#1f3c5c" style={{ color: '#f1ebdf' }} wave={<WaveField colorA="#2c5580" colorB="#16304a" />}>
        <div style={{ position: 'absolute', top: 54, right: 48, fontFamily: archivoBlack, fontSize: 230, lineHeight: 0.7, color: 'transparent', WebkitTextStroke: '1.5px rgba(199,171,125,.16)', pointerEvents: 'none' }}>04</div>
        <Kicker color={GOLD}>{t.skProcess}</Kicker>
        <div style={{ marginTop: 22, fontFamily: archivoBlack, fontSize: 68, lineHeight: 0.88, color: '#f1ebdf', position: 'relative', zIndex: 2 }}>
          {t.skPw1}
          <br />
          <span style={{ color: 'transparent', WebkitTextStroke: `2px ${GOLD}` }}>{t.skPw2}</span>
        </div>
        <div style={{ marginTop: 54, position: 'relative', zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 27, top: 14, bottom: 14, width: 2, background: `linear-gradient(${GOLD}, rgba(199,171,125,.25))` }} />
          {t.steps.map((st, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 28, alignItems: 'flex-start', paddingBottom: idx < t.steps.length - 1 ? 34 : 0 }}>
              <div
                style={{
                  flex: 'none',
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: idx === 0 ? GOLD : '#1f3c5c',
                  border: idx === 0 ? 'none' : `2px solid ${GOLD}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: archivoBlack,
                  fontSize: 22,
                  color: idx === 0 ? '#16304a' : GOLD,
                  boxShadow: '0 0 0 7px #1f3c5c',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div style={{ paddingTop: 6 }}>
                <div style={{ fontFamily: archivoBlack, fontSize: 22, color: '#f1ebdf' }}>{st.t}</div>
                <div style={{ fontFamily: spectral, fontSize: 15, lineHeight: 1.55, color: 'rgba(236,229,214,.82)', marginTop: 4, maxWidth: 400 }}>{st.d}</div>
              </div>
            </div>
          ))}
        </div>
        <PageNum n="08" side="right" />
      </Page>
    </>
  );
}

// ───────────────────────── Spread 4 · Selected Work ─────────────────────────
function WorkSpread({ t, sel, projList, openPicker }) {
  return (
    <>
      <div style={{ width: 660, height: 880, position: 'relative', overflow: 'hidden', background: '#2f5a86' }}>
        <WaveField colorA="#5a86b5" opacityA={0.45} colorB="#244e74" />
        <ImageSlot placeholder="Project beeld" shape="rect" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 320, background: 'linear-gradient(to top, rgba(31,60,92,.9), rgba(31,60,92,0))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', top: 54, left: 56, background: '#17314a', color: GOLD, padding: '10px 20px', fontFamily: archivoBlack, fontSize: 14, letterSpacing: '.05em', pointerEvents: 'none' }}>{sel.numName}</div>
        <div style={{ position: 'absolute', left: 56, bottom: 80, pointerEvents: 'none' }}>
          <div style={{ fontFamily: archivoBlack, fontSize: 62, lineHeight: 0.9, color: '#f1ebdf' }}>{sel.name}</div>
          <div style={{ marginTop: 10, fontFamily: archivo, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD }}>
            {sel.cat} · {sel.year}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: 22, left: 48, fontFamily: archivo, fontSize: 12, letterSpacing: '.22em', color: '#cdd6e2', zIndex: 5, pointerEvents: 'none' }}>— 09</div>
      </div>
      <Page bg="#eef1f5" padding="62px 56px 0" wave={<WaveField variant="light" />}>
        <Kicker color="#8a7f6a">{t.wkKicker}</Kicker>
        <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', paddingTop: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 16 }}>
            <div style={{ fontFamily: archivoBlack, fontSize: 40, lineHeight: 0.96, color: '#1f1d1a' }}>{sel.name}</div>
            <div style={{ fontFamily: archivo, fontSize: 13, letterSpacing: '.2em', color: '#8a7f6a', whiteSpace: 'nowrap' }}>{sel.year}</div>
          </div>
          <div style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD, marginTop: 8 }}>{sel.cat}</div>
          <div style={{ marginTop: 20, fontFamily: spectral, fontSize: 17, lineHeight: 1.66, color: '#544e43', maxWidth: 480 }}>{sel.desc}</div>
          <div style={{ marginTop: 22, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {sel.tags.map((tg) => (
              <span key={tg} style={{ padding: '8px 18px', border: '1px solid rgba(31,29,26,.26)', borderRadius: 40, fontFamily: archivo, fontSize: 13, color: '#1f1d1a' }}>
                {tg}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: archivo, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#8a7f6a', borderTop: '1px solid rgba(31,29,26,.14)', padding: '16px 0' }}>
            <span>{t.wkWebsite}</span>
            {sel.hasLink ? (
              <a href={sel.linkHref} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontFamily: archivo, fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: '#17314a', fontWeight: 600, textDecoration: 'none', borderBottom: `1.5px solid ${GOLD}`, paddingBottom: 2 }}>
                <ExternalLinkIcon />
                {sel.url}
              </a>
            ) : (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: '#a39a89' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c2bbac', display: 'inline-block' }} />
                {sel.offline}
              </span>
            )}
          </div>
        </div>
        <div style={{ flex: 'none', borderTop: '1px solid rgba(31,29,26,.16)', padding: '16px 0 50px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontFamily: archivo, fontSize: 11, letterSpacing: '.26em', textTransform: 'uppercase', fontWeight: 600, color: '#8a7f6a' }}>{t.wkBarLabel}</span>
            <span onClick={openPicker} style={{ fontFamily: archivo, fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', fontWeight: 600, color: '#2f5a86', cursor: 'pointer', borderBottom: `1.5px solid ${GOLD}`, paddingBottom: 2 }}>
              {t.wkHint}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 12, overflowX: 'auto', paddingBottom: 6 }}>
            {projList.map((p) => (
              <div key={p.num} onClick={p.onClick} style={{ flex: 'none', width: 168, cursor: 'pointer' }}>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 3,
                    padding: '13px 16px',
                    borderRadius: 8,
                    background: p.active ? '#2f5a86' : '#ffffff',
                    border: p.active ? '1px solid #2f5a86' : '1px solid rgba(31,29,26,.16)',
                  }}
                >
                  <div style={{ fontFamily: archivoBlack, fontSize: 17, lineHeight: 1, color: GOLD }}>{p.num}</div>
                  <div style={{ fontFamily: archivoBlack, fontSize: 16, color: p.active ? '#f1ebdf' : '#1f1d1a' }}>{p.name}</div>
                  <div style={{ fontFamily: spectral, fontSize: 12, lineHeight: 1.3, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', color: p.active ? 'rgba(236,229,214,.82)' : '#6b6457' }}>{p.cat}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PageNum n="10" side="right" />
      </Page>
    </>
  );
}

// ───────────────────────── Spread 5 · Contact ─────────────────────────
function ContactSpread({ t }) {
  return (
    <>
      <Page bg="#1f3c5c" style={{ justifyContent: 'space-between', color: '#f1ebdf' }} wave={<WaveField colorA="#2c5580" colorB="#16304a" />}>
        <Kicker color={GOLD}>{t.coKicker}</Kicker>
        <div>
          <div style={{ fontFamily: archivoBlack, fontSize: 118, lineHeight: 0.84, color: '#f1ebdf' }}>{t.coBig1}</div>
          <div style={{ fontFamily: archivoBlack, fontSize: 118, lineHeight: 0.92, color: 'transparent', WebkitTextStroke: '2px #c7ab7d' }}>{t.coBig2}</div>
        </div>
        <div style={{ fontFamily: spectral, fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: '#ece5d6', maxWidth: 420 }}>{t.coSub}</div>
        <div style={{ fontFamily: archivo, fontSize: 14, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD }}>noaphilene.dev</div>
        <PageNum n="11" side="left" />
      </Page>
      <Page bg="#16304a" style={{ color: '#f1ebdf' }}>
        <WaveAccent colorA="#17314a" colorB="#1d3a57" opacityB={0.7} flip />
        <div style={{ position: 'relative', width: 200, height: 200, alignSelf: 'flex-end', marginBottom: 8 }}>
          <ImageSlot placeholder="Foto" shape="circle" style={{ width: 200, height: 200 }} />
          <div style={{ position: 'absolute', inset: -9, border: '1px solid rgba(199,171,125,.5)', borderRadius: '50%', pointerEvents: 'none' }} />
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Row label={t.coL1} value="Noavanmil@gmail.com" color={GOLD} valueColor="#f1ebdf" border="rgba(236,229,214,.2)" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '17px 0', borderTop: '1px solid rgba(236,229,214,.2)' }}>
            <span style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD }}>{t.coL2}</span>
            <a href="https://www.linkedin.com/in/noaphilene" target="_blank" rel="noopener noreferrer" style={{ fontFamily: archivoBlack, fontSize: 17, color: '#f1ebdf', textDecoration: 'none', borderBottom: `1.5px solid ${GOLD}`, paddingBottom: 2 }}>
              linkedin.com/in/noaphilene
            </a>
          </div>
          <Row label={t.coL3} value="Gorinchem" color={GOLD} valueColor="#f1ebdf" border="rgba(236,229,214,.2)" last />
        </div>
        <PageNum n="12" side="right" />
      </Page>
    </>
  );
}

const SPREADS = [CoverSpread, ContentsSpread, AboutSpread, SkillsSpread, WorkSpread, ContactSpread];

// Full two-page spread for a given index — used both for the normally
// mounted spread and (shifted/cropped) inside the page-turn leaf faces, so
// the turning page always shows real, live content rather than a flat color.
export function SpreadRow({ index, ctx }) {
  const Cmp = SPREADS[index];
  return <Cmp {...ctx} />;
}

export { LEFT_BG, RIGHT_BG };

import ImageSlot from '../../components/ImageSlot.jsx';
import { WaveField } from '../../components/WaveBackdrop.jsx';
import { ExternalLinkIcon } from '../../components/icons.jsx';
import { GOLD } from '../../data/theme.js';
import { Page, PageNum, Kicker, archivo, archivoBlack, spectral } from './shared.jsx';

export default function WorkSpread({ t, sel, projList, openPicker }) {
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

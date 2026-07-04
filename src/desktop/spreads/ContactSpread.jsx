import ImageSlot from '../../components/ImageSlot.jsx';
import { WaveField, WaveAccent } from '../../components/WaveBackdrop.jsx';
import { GOLD } from '../../data/theme.js';
import { Page, PageNum, Kicker, Row, archivo, archivoBlack, spectral } from './shared.jsx';

export default function ContactSpread({ t }) {
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

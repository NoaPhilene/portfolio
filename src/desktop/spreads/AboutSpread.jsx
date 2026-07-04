import ImageSlot from '../../components/ImageSlot.jsx';
import { WaveField } from '../../components/WaveBackdrop.jsx';
import { GOLD } from '../../data/theme.js';
import { Page, PageNum, Kicker, Row, archivo, archivoBlack, spectral } from './shared.jsx';

export default function AboutSpread({ t }) {
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

import ImageSlot from '../../components/ImageSlot.jsx';
import { WaveField } from '../../components/WaveBackdrop.jsx';
import { GOLD } from '../../data/theme.js';
import { Page, PageNum, Kicker, archivo, archivoBlack, spectral } from './shared.jsx';

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

export default function ContentsSpread({ t, go }) {
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

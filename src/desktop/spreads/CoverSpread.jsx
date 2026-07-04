import ImageSlot from '../../components/ImageSlot.jsx';
import { WaveField, WaveAccent } from '../../components/WaveBackdrop.jsx';
import { GOLD } from '../../data/theme.js';
import { Page, PageNum, archivo, archivoBlack } from './shared.jsx';

export default function CoverSpread({ t }) {
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

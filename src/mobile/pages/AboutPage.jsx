import ImageSlot from '../../components/ImageSlot.jsx';
import { GOLD } from '../../data/theme.js';
import { archivo, archivoBlack, spectral } from './shared.jsx';

export default function AboutPage({ t }) {
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

import ImageSlot from '../../components/ImageSlot.jsx';
import { GOLD } from '../../data/theme.js';
import { archivo, archivoBlack, spectral } from './shared.jsx';

export default function ContactPage({ t }) {
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

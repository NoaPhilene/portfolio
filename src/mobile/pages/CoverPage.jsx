import ImageSlot from '../../components/ImageSlot.jsx';
import { GOLD } from '../../data/theme.js';
import { archivo, archivoBlack } from './shared.jsx';

export default function CoverPage({ t }) {
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

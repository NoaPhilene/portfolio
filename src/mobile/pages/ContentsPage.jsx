import { GOLD } from '../../data/theme.js';
import { archivoBlack, spectral } from './shared.jsx';

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

export default function ContentsPage({ t, go }) {
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

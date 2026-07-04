import ImageSlot from '../../components/ImageSlot.jsx';
import { GOLD } from '../../data/theme.js';
import { archivo, archivoBlack, spectral } from './shared.jsx';

export default function WorkPage({ t, sel, projList }) {
  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: 14 }}>
      <div>
        <ImageSlot placeholder="Project beeld" shape="rect" radius={2} style={{ width: '100%', height: 170 }} />
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: archivoBlack, fontSize: 30, lineHeight: 0.95, color: '#f1ebdf' }}>{sel.name}</div>
          <div style={{ fontFamily: archivo, fontSize: 11, letterSpacing: '.18em', color: 'rgba(236,229,214,.62)' }}>{sel.year}</div>
        </div>
        <div style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD, marginTop: 4 }}>{sel.cat}</div>
        <div
          style={{
            marginTop: 10,
            fontFamily: spectral,
            fontSize: 13,
            lineHeight: 1.5,
            color: 'rgba(236,229,214,.86)',
            overflow: 'hidden',
            maxHeight: 13 * 1.5 * 4,
          }}
        >
          {sel.desc}
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sel.tags.map((tg) => (
            <span key={tg} style={{ padding: '5px 12px', border: '1px solid rgba(236,229,214,.34)', borderRadius: 40, fontFamily: archivo, fontSize: 11, color: '#f1ebdf' }}>
              {tg}
            </span>
          ))}
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '10px 0' }}>
          {projList.map((p) => (
            <div
              key={p.num}
              onClick={p.onClick}
              style={{
                flex: 'none',
                width: 38,
                height: 38,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontFamily: archivoBlack,
                fontSize: 13,
                background: p.active ? '#2f5a86' : '#fff',
                color: p.active ? '#f1ebdf' : '#1f1d1a',
                border: p.active ? '1px solid #2f5a86' : '1px solid rgba(31,29,26,.2)',
              }}
            >
              {p.num}
            </div>
          ))}
        </div>
        {sel.hasLink ? (
          <a
            href={sel.linkHref}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: archivo, fontSize: 11.5, letterSpacing: '.14em', textTransform: 'uppercase', color: '#f1ebdf', fontWeight: 700, textDecoration: 'none', borderBottom: `1.5px solid ${GOLD}`, paddingBottom: 2 }}
          >
            {sel.url} ↗
          </a>
        ) : (
          <span style={{ fontFamily: archivo, fontSize: 11.5, color: 'rgba(236,229,214,.5)' }}>{sel.offline}</span>
        )}
      </div>
    </div>
  );
}

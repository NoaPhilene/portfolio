import { GOLD, SKILL_CIRCLES, SPECIALTIES_COMPACT } from '../../data/theme.js';
import { archivo, archivoBlack } from './shared.jsx';

export default function SkillsPage({ t }) {
  return (
    <>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontFamily: archivoBlack, fontSize: 38, lineHeight: 0.88, color: '#1f1d1a' }}>
          TOOLS &amp;
          <br />
          STACK
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 12 }}>
          {SKILL_CIRCLES.map((s) => (
            <div
              key={s.code}
              style={{ width: 56, height: 56, borderRadius: '50%', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: archivoBlack, fontSize: 15, color: '#1f1d1a', background: '#fff' }}
            >
              {s.code}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {SPECIALTIES_COMPACT.map((s) => (
            <span key={s} style={{ padding: '7px 14px', border: '1px solid rgba(31,29,26,.28)', borderRadius: 40, fontFamily: archivo, fontSize: 12.5, color: '#1f1d1a' }}>
              {s}
            </span>
          ))}
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <div style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 700, color: '#8a7f6a', marginBottom: 18 }}>{t.skProcess}</div>
        {t.stepsCompact.map((s, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: 28 }}>
            <div style={{ flex: 'none', width: 32, height: 32, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: archivoBlack, fontSize: 12.5, color: '#17314a' }}>
              {String(idx + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: archivo, fontSize: 14.5, lineHeight: 1.45, color: '#1f1d1a', paddingTop: 6 }}>{s}</div>
          </div>
        ))}
      </div>
    </>
  );
}

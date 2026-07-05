import { GOLD } from '../../data/theme.js';
import Editable from '../../components/Editable.jsx';
import { archivo, archivoBlack } from './shared.jsx';

const removeBtnStyle = {
  position: 'absolute',
  top: -6,
  right: -6,
  width: 16,
  height: 16,
  borderRadius: '50%',
  border: 'none',
  background: '#17314a',
  color: '#fff',
  fontSize: 10,
  lineHeight: '16px',
  padding: 0,
  cursor: 'pointer',
};

export default function SkillsPage({ t, lang, shared, loggedIn, updateString, updateShared }) {
  const edit = (key) => (v) => updateString(key, lang, v);
  const skillCircles = shared.skillCircles || [];
  const specialtiesCompact = shared.specialtiesCompact || [];

  const updateCircle = (idx, field, value) =>
    updateShared('skillCircles', skillCircles.map((c, i) => (i === idx ? { ...c, [field]: value } : c)));
  const removeCircle = (idx) => updateShared('skillCircles', skillCircles.filter((_, i) => i !== idx));
  const addCircle = () => updateShared('skillCircles', [...skillCircles, { code: 'XX', label: 'Nieuw' }]);

  const updateSpecialty = (idx, value) => updateShared('specialtiesCompact', specialtiesCompact.map((s, i) => (i === idx ? value : s)));
  const removeSpecialty = (idx) => updateShared('specialtiesCompact', specialtiesCompact.filter((_, i) => i !== idx));
  const addSpecialty = () => updateShared('specialtiesCompact', [...specialtiesCompact, 'Nieuw']);

  return (
    <>
      <div style={{ marginTop: 14 }}>
        <div style={{ fontFamily: archivoBlack, fontSize: 38, lineHeight: 0.88, color: '#1f1d1a' }}>
          TOOLS &amp;
          <br />
          STACK
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {skillCircles.map((s, idx) => (
            <div key={idx} style={{ position: 'relative' }}>
              {loggedIn && (
                <button onClick={() => removeCircle(idx)} title="Verwijderen" style={removeBtnStyle}>×</button>
              )}
              <div
                style={{ width: 56, height: 56, borderRadius: '50%', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: archivoBlack, fontSize: 15, color: '#1f1d1a', background: '#fff' }}
              >
                <Editable value={s.code} onSave={(v) => updateCircle(idx, 'code', v)} style={{ width: 32, textAlign: 'center' }} />
              </div>
            </div>
          ))}
          {loggedIn && (
            <button onClick={addCircle} style={{ width: 56, height: 56, borderRadius: '50%', border: `1.5px dashed ${GOLD}`, background: 'transparent', color: GOLD, fontSize: 20, cursor: 'pointer' }}>
              +
            </button>
          )}
        </div>
        <div style={{ marginTop: 18, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {specialtiesCompact.map((s, idx) => (
            <span key={idx} style={{ position: 'relative', padding: '7px 14px', border: '1px solid rgba(31,29,26,.28)', borderRadius: 40, fontFamily: archivo, fontSize: 12.5, color: '#1f1d1a' }}>
              <Editable value={s} onSave={(v) => updateSpecialty(idx, v)} />
              {loggedIn && (
                <button onClick={() => removeSpecialty(idx)} title="Verwijderen" style={removeBtnStyle}>×</button>
              )}
            </span>
          ))}
          {loggedIn && (
            <button onClick={addSpecialty} style={{ padding: '7px 14px', border: `1px dashed ${GOLD}`, borderRadius: 40, background: 'transparent', fontFamily: archivo, fontSize: 12.5, color: GOLD, cursor: 'pointer' }}>
              + Skill
            </button>
          )}
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <div style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 700, color: '#8a7f6a', marginBottom: 18 }}>
          <Editable value={t.skProcess} onSave={edit('skProcess')} />
        </div>
        {t.stepsCompact.map((s, idx) => (
          <div key={idx} style={{ display: 'flex', gap: 14, alignItems: 'flex-start', paddingBottom: 28 }}>
            <div style={{ flex: 'none', width: 32, height: 32, borderRadius: '50%', background: GOLD, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: archivoBlack, fontSize: 12.5, color: '#17314a' }}>
              {String(idx + 1).padStart(2, '0')}
            </div>
            <div style={{ fontFamily: archivo, fontSize: 14.5, lineHeight: 1.45, color: '#1f1d1a', paddingTop: 6 }}>
              <Editable value={s} onSave={edit(`stepsCompact.${idx}`)} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

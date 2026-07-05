import { WaveField } from '../../components/WaveBackdrop.jsx';
import { GOLD } from '../../data/theme.js';
import Editable from '../../components/Editable.jsx';
import { Page, PageNum, Kicker, archivo, archivoBlack, spectral } from './shared.jsx';

const removeBtnStyle = {
  position: 'absolute',
  top: -6,
  right: -6,
  width: 18,
  height: 18,
  borderRadius: '50%',
  border: 'none',
  background: '#17314a',
  color: '#fff',
  fontSize: 11,
  lineHeight: '18px',
  padding: 0,
  cursor: 'pointer',
};

export default function SkillsSpread({ t, lang, shared, loggedIn, updateString, updateShared }) {
  const edit = (key) => (v) => updateString(key, lang, v);
  const skillCircles = shared.skillCircles || [];
  const specialties = shared.specialties || [];

  const updateCircle = (idx, field, value) =>
    updateShared('skillCircles', skillCircles.map((c, i) => (i === idx ? { ...c, [field]: value } : c)));
  const removeCircle = (idx) => updateShared('skillCircles', skillCircles.filter((_, i) => i !== idx));
  const addCircle = () => updateShared('skillCircles', [...skillCircles, { code: 'XX', label: 'Nieuw' }]);

  const updateSpecialty = (idx, value) => updateShared('specialties', specialties.map((s, i) => (i === idx ? value : s)));
  const removeSpecialty = (idx) => updateShared('specialties', specialties.filter((_, i) => i !== idx));
  const addSpecialty = () => updateShared('specialties', [...specialties, 'Nieuw']);

  return (
    <>
      <Page bg="#eef1f5" wave={<WaveField variant="light" />}>
        <Kicker color="#8a7f6a">
          <Editable value={t.skKicker} onSave={edit('skKicker')} />
        </Kicker>
        <div style={{ marginTop: 24, fontFamily: archivoBlack, fontSize: 76, lineHeight: 0.86, color: '#1f1d1a' }}>
          TOOLS &amp;<br />STACK
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 26, flexWrap: 'wrap' }}>
          {skillCircles.map((s, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, position: 'relative' }}>
              {loggedIn && (
                <button onClick={() => removeCircle(idx)} title="Verwijderen" style={removeBtnStyle}>×</button>
              )}
              <div style={{ width: 94, height: 94, borderRadius: '50%', border: `1.5px solid ${GOLD}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: archivoBlack, fontSize: 25, color: '#1f1d1a', background: '#fff' }}>
                <Editable value={s.code} onSave={(v) => updateCircle(idx, 'code', v)} style={{ width: 46, textAlign: 'center' }} />
              </div>
              <div style={{ fontFamily: archivo, fontSize: 12, color: '#6b6457' }}>
                <Editable value={s.label} onSave={(v) => updateCircle(idx, 'label', v)} />
              </div>
            </div>
          ))}
          {loggedIn && (
            <button
              onClick={addCircle}
              style={{ width: 94, height: 94, borderRadius: '50%', border: `1.5px dashed ${GOLD}`, background: 'transparent', color: GOLD, fontSize: 28, cursor: 'pointer' }}
            >
              +
            </button>
          )}
        </div>
        <div style={{ marginTop: 'auto' }}>
          <div style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, color: '#8a7f6a', marginBottom: 16 }}>
            <Editable value={t.skSpec} onSave={edit('skSpec')} />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {specialties.map((s, idx) => (
              <span key={idx} style={{ position: 'relative', padding: '10px 20px', border: '1px solid rgba(31,29,26,.28)', borderRadius: 40, fontFamily: archivo, fontSize: 14, color: '#1f1d1a' }}>
                <Editable value={s} onSave={(v) => updateSpecialty(idx, v)} />
                {loggedIn && (
                  <button onClick={() => removeSpecialty(idx)} title="Verwijderen" style={removeBtnStyle}>×</button>
                )}
              </span>
            ))}
            {loggedIn && (
              <button
                onClick={addSpecialty}
                style={{ padding: '10px 20px', border: `1px dashed ${GOLD}`, borderRadius: 40, background: 'transparent', fontFamily: archivo, fontSize: 14, color: GOLD, cursor: 'pointer' }}
              >
                + Skill
              </button>
            )}
          </div>
        </div>
        <PageNum n="07" side="left" />
      </Page>
      <Page bg="#1f3c5c" style={{ color: '#f1ebdf' }} wave={<WaveField colorA="#2c5580" colorB="#16304a" />}>
        <div style={{ position: 'absolute', top: 54, right: 48, fontFamily: archivoBlack, fontSize: 230, lineHeight: 0.7, color: 'transparent', WebkitTextStroke: '1.5px rgba(199,171,125,.16)', pointerEvents: 'none' }}>04</div>
        <Kicker color={GOLD}>
          <Editable value={t.skProcess} onSave={edit('skProcess')} />
        </Kicker>
        <div style={{ marginTop: 22, fontFamily: archivoBlack, fontSize: 68, lineHeight: 0.88, color: '#f1ebdf', position: 'relative', zIndex: 2 }}>
          <Editable value={t.skPw1} onSave={edit('skPw1')} />
          <br />
          <span style={{ color: 'transparent', WebkitTextStroke: `2px ${GOLD}` }}>
            <Editable value={t.skPw2} onSave={edit('skPw2')} />
          </span>
        </div>
        <div style={{ marginTop: 54, position: 'relative', zIndex: 2 }}>
          <div style={{ position: 'absolute', left: 27, top: 14, bottom: 14, width: 2, background: `linear-gradient(${GOLD}, rgba(199,171,125,.25))` }} />
          {t.steps.map((st, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 28, alignItems: 'flex-start', paddingBottom: idx < t.steps.length - 1 ? 34 : 0 }}>
              <div
                style={{
                  flex: 'none',
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  background: idx === 0 ? GOLD : '#1f3c5c',
                  border: idx === 0 ? 'none' : `2px solid ${GOLD}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: archivoBlack,
                  fontSize: 22,
                  color: idx === 0 ? '#16304a' : GOLD,
                  boxShadow: '0 0 0 7px #1f3c5c',
                }}
              >
                {String(idx + 1).padStart(2, '0')}
              </div>
              <div style={{ paddingTop: 6 }}>
                <div style={{ fontFamily: archivoBlack, fontSize: 22, color: '#f1ebdf' }}>
                  <Editable value={st.t} onSave={edit(`steps.${idx}.t`)} />
                </div>
                <div style={{ fontFamily: spectral, fontSize: 15, lineHeight: 1.55, color: 'rgba(236,229,214,.82)', marginTop: 4, maxWidth: 400 }}>
                  <Editable value={st.d} onSave={edit(`steps.${idx}.d`)} multiline />
                </div>
              </div>
            </div>
          ))}
        </div>
        <PageNum n="08" side="right" />
      </Page>
    </>
  );
}

import ImageGallery from '../../components/ImageGallery.jsx';
import Editable from '../../components/Editable.jsx';
import { GOLD } from '../../data/theme.js';
import { archivo, archivoBlack, spectral } from './shared.jsx';

export default function WorkPage({ t, lang, sel, projList, loggedIn, updateProject, deleteProject, addProjectImage, removeProjectImage, onAddProject, onMoveProject }) {
  const updateTag = (idx, value) => updateProject(sel.id, { tags: sel.tags.map((tg, i) => (i === idx ? value : tg)) });
  const removeTag = (idx) => updateProject(sel.id, { tags: sel.tags.filter((_, i) => i !== idx) });
  const addTag = () => updateProject(sel.id, { tags: [...sel.tags, 'Nieuw'] });

  const handleDeleteProject = (e, id) => {
    e.stopPropagation();
    if (confirm('Dit project verwijderen?')) deleteProject(id);
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginTop: 14 }}>
      <div>
        <ImageGallery
          images={sel.images}
          alt={sel.name}
          placeholder="Project beeld"
          shape="rect"
          radius={2}
          style={{ width: '100%', height: 170 }}
          onAdd={(url) => addProjectImage(sel.id, url)}
          onRemove={(url) => removeProjectImage(sel.id, url)}
        />
        <div style={{ marginTop: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{ fontFamily: archivoBlack, fontSize: 30, lineHeight: 0.95, color: '#f1ebdf' }}>
            <Editable value={sel.name} onSave={(v) => updateProject(sel.id, { name: v })} />
          </div>
          <div style={{ fontFamily: archivo, fontSize: 11, letterSpacing: '.18em', color: 'rgba(236,229,214,.62)' }}>
            <Editable value={sel.year} onSave={(v) => updateProject(sel.id, { year: v })} />
          </div>
        </div>
        <div style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD, marginTop: 4 }}>
          <Editable value={sel.cat} onSave={(v) => updateProject(sel.id, { cat: { [lang]: v } })} />
        </div>
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
          <Editable value={sel.desc} onSave={(v) => updateProject(sel.id, { desc: { [lang]: v } })} multiline />
        </div>
        <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {sel.tags.map((tg, idx) => (
            <span key={idx} style={{ position: 'relative', padding: '5px 12px', border: '1px solid rgba(236,229,214,.34)', borderRadius: 40, fontFamily: archivo, fontSize: 11, color: '#f1ebdf' }}>
              <Editable value={tg} onSave={(v) => updateTag(idx, v)} />
              {loggedIn && (
                <button
                  onClick={() => removeTag(idx)}
                  title="Verwijderen"
                  style={{ position: 'absolute', top: -6, right: -6, width: 14, height: 14, borderRadius: '50%', border: 'none', background: '#17314a', color: '#fff', fontSize: 9, lineHeight: '14px', padding: 0, cursor: 'pointer' }}
                >
                  ×
                </button>
              )}
            </span>
          ))}
          {loggedIn && (
            <button
              onClick={addTag}
              style={{ padding: '5px 12px', border: `1px dashed ${GOLD}`, borderRadius: 40, background: 'transparent', fontFamily: archivo, fontSize: 11, color: GOLD, cursor: 'pointer' }}
            >
              + Tag
            </button>
          )}
        </div>
      </div>
      <div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '10px 0' }}>
          {projList.map((p) => (
            <div key={p.num} style={{ position: 'relative', flex: 'none' }}>
              {loggedIn && (
                <button
                  onClick={(e) => handleDeleteProject(e, p.id)}
                  title="Project verwijderen"
                  style={{ position: 'absolute', top: -4, right: -4, zIndex: 2, width: 16, height: 16, borderRadius: '50%', border: 'none', background: '#17314a', color: '#fff', fontSize: 9, lineHeight: '16px', padding: 0, cursor: 'pointer' }}
                >
                  ×
                </button>
              )}
              <div
                onClick={p.onClick}
                style={{
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
              {loggedIn && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                  <button
                    onClick={(e) => { e.stopPropagation(); onMoveProject(p.id, 'left'); }}
                    disabled={p.isFirst}
                    title="Naar links"
                    style={{ border: 'none', background: 'transparent', color: p.isFirst ? 'rgba(31,29,26,.2)' : '#8a7f6a', fontSize: 11, cursor: p.isFirst ? 'default' : 'pointer', padding: 0 }}
                  >
                    ‹
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); onMoveProject(p.id, 'right'); }}
                    disabled={p.isLast}
                    title="Naar rechts"
                    style={{ border: 'none', background: 'transparent', color: p.isLast ? 'rgba(31,29,26,.2)' : '#8a7f6a', fontSize: 11, cursor: p.isLast ? 'default' : 'pointer', padding: 0 }}
                  >
                    ›
                  </button>
                </div>
              )}
            </div>
          ))}
          {loggedIn && (
            <div
              onClick={onAddProject}
              style={{ flex: 'none', width: 38, height: 38, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', border: `1px dashed ${GOLD}`, color: GOLD, fontSize: 16 }}
            >
              +
            </div>
          )}
        </div>
        {loggedIn ? (
          <Editable value={sel.url} onSave={(v) => updateProject(sel.id, { url: v })} style={{ fontFamily: archivo, fontSize: 11.5, color: '#f1ebdf' }} />
        ) : sel.hasLink ? (
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

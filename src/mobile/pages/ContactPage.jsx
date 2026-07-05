import EditableImage from '../../components/EditableImage.jsx';
import Editable from '../../components/Editable.jsx';
import { GOLD } from '../../data/theme.js';
import { archivo, archivoBlack, spectral } from './shared.jsx';

export default function ContactPage({ t, lang, shared, siteImages, loggedIn, updateString, updateShared, updateSiteImage }) {
  const edit = (key) => (v) => updateString(key, lang, v);
  const editShared = (key) => (v) => updateShared(key, v);

  return (
    <>
      <div style={{ marginTop: 14, fontFamily: archivoBlack, fontSize: 52, lineHeight: 0.86, color: '#f1ebdf' }}>
        <Editable value={t.coBig1} onSave={edit('coBig1')} />
      </div>
      <div style={{ fontFamily: archivoBlack, fontSize: 52, lineHeight: 0.94, color: 'transparent', WebkitTextStroke: '1.2px #c7ab7d' }}>
        <Editable value={t.coBig2} onSave={edit('coBig2')} />
      </div>
      <div style={{ marginTop: 12, fontFamily: spectral, fontStyle: 'italic', fontSize: 15, lineHeight: 1.45, color: '#ece5d6' }}>
        <Editable value={t.coSub} onSave={edit('coSub')} multiline />
      </div>
      <div style={{ width: 180, height: 180, alignSelf: 'center', margin: '26px auto 0', position: 'relative' }}>
        <EditableImage
          src={siteImages.contactPhoto}
          placeholder="Foto"
          shape="circle"
          style={{ width: 180, height: 180 }}
          onSave={(url) => updateSiteImage('contactPhoto', url)}
        />
      </div>
      <div style={{ marginTop: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid rgba(236,229,214,.2)' }}>
          <span style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>
            <Editable value={t.coL1} onSave={edit('coL1')} />
          </span>
          <span style={{ fontFamily: archivoBlack, fontSize: 14, color: '#f1ebdf' }}>
            <Editable value={shared.personEmail} onSave={editShared('personEmail')} />
          </span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid rgba(236,229,214,.2)' }}>
          <span style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>
            <Editable value={t.coL2} onSave={edit('coL2')} />
          </span>
          {loggedIn ? (
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
              <Editable value={shared.personLinkedinLabel} onSave={editShared('personLinkedinLabel')} style={{ fontFamily: archivoBlack, fontSize: 14 }} />
              <Editable value={shared.personLinkedinUrl} onSave={editShared('personLinkedinUrl')} style={{ fontSize: 10, opacity: 0.7 }} />
            </span>
          ) : (
            <a href={shared.personLinkedinUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: archivoBlack, fontSize: 14, color: '#f1ebdf', textDecoration: 'none', borderBottom: `1.5px solid ${GOLD}` }}>
              {shared.personLinkedinLabel}
            </a>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '12px 0', borderTop: '1px solid rgba(236,229,214,.2)', borderBottom: '1px solid rgba(236,229,214,.2)' }}>
          <span style={{ fontFamily: archivo, fontSize: 10.5, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLD }}>
            <Editable value={t.coL3} onSave={edit('coL3')} />
          </span>
          <span style={{ fontFamily: archivoBlack, fontSize: 14, color: '#f1ebdf' }}>
            <Editable value={shared.personLocation} onSave={editShared('personLocation')} />
          </span>
        </div>
      </div>
    </>
  );
}

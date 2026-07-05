import EditableImage from '../../components/EditableImage.jsx';
import Editable from '../../components/Editable.jsx';
import { GOLD } from '../../data/theme.js';
import { archivo, archivoBlack } from './shared.jsx';

export default function CoverPage({ t, lang, shared, siteImages, updateString, updateShared, updateSiteImage }) {
  return (
    <>
      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
        <div style={{ width: 158, height: 158, position: 'relative' }}>
          <EditableImage
            src={siteImages.coverPhoto}
            placeholder="Jouw foto"
            shape="circle"
            style={{ width: 158, height: 158 }}
            onSave={(url) => updateSiteImage('coverPhoto', url)}
          />
          <div style={{ position: 'absolute', inset: -8, border: '1px solid rgba(199,171,125,.5)', borderRadius: '50%', pointerEvents: 'none' }} />
        </div>
        <div style={{ textAlign: 'center', lineHeight: 0.86 }}>
          <div style={{ fontFamily: archivoBlack, color: '#f1ebdf', fontSize: 44, letterSpacing: '-.01em' }}>
            <Editable value={shared.personNameLine1} onSave={(v) => updateShared('personNameLine1', v)} />
          </div>
          <div style={{ fontFamily: archivoBlack, fontSize: 44, color: 'transparent', WebkitTextStroke: '1.2px #c7ab7d' }}>
            <Editable value={shared.personNameLine2} onSave={(v) => updateShared('personNameLine2', v)} />
          </div>
          <div style={{ fontFamily: archivoBlack, color: '#f1ebdf', fontSize: 44 }}>
            <Editable value={shared.personNameLine3} onSave={(v) => updateShared('personNameLine3', v)} />
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 22, height: 2, background: GOLD, display: 'inline-block' }} />
          <span style={{ fontFamily: archivo, color: '#ece5d6', fontSize: 13, letterSpacing: '.05em' }}>
            <Editable value={t.cvName} onSave={(v) => updateString('cvName', lang, v)} />
          </span>
          <span style={{ width: 22, height: 2, background: GOLD, display: 'inline-block' }} />
        </div>
      </div>
      <div style={{ marginTop: 'auto', textAlign: 'center', fontFamily: archivo, fontSize: 12, letterSpacing: '.22em', color: GOLD, paddingTop: 20 }}>
        <Editable value={shared.personDomain} onSave={(v) => updateShared('personDomain', v)} />
      </div>
    </>
  );
}

import EditableImage from '../../components/EditableImage.jsx';
import Editable from '../../components/Editable.jsx';
import { WaveField, WaveAccent } from '../../components/WaveBackdrop.jsx';
import { GOLD } from '../../data/theme.js';
import { Page, PageNum, Kicker, Row, archivo, archivoBlack, spectral } from './shared.jsx';

export default function ContactSpread({ t, lang, shared, siteImages, loggedIn, updateString, updateShared, updateSiteImage }) {
  const edit = (key) => (v) => updateString(key, lang, v);
  const editShared = (key) => (v) => updateShared(key, v);

  return (
    <>
      <Page bg="#1f3c5c" style={{ justifyContent: 'space-between', color: '#f1ebdf' }} wave={<WaveField colorA="#2c5580" colorB="#16304a" />}>
        <Kicker color={GOLD}>
          <Editable value={t.coKicker} onSave={edit('coKicker')} />
        </Kicker>
        <div>
          <div style={{ fontFamily: archivoBlack, fontSize: 118, lineHeight: 0.84, color: '#f1ebdf' }}>
            <Editable value={t.coBig1} onSave={edit('coBig1')} />
          </div>
          <div style={{ fontFamily: archivoBlack, fontSize: 118, lineHeight: 0.92, color: 'transparent', WebkitTextStroke: '2px #c7ab7d' }}>
            <Editable value={t.coBig2} onSave={edit('coBig2')} />
          </div>
        </div>
        <div style={{ fontFamily: spectral, fontStyle: 'italic', fontSize: 22, lineHeight: 1.45, color: '#ece5d6', maxWidth: 420 }}>
          <Editable value={t.coSub} onSave={edit('coSub')} multiline />
        </div>
        <div style={{ fontFamily: archivo, fontSize: 14, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD }}>
          <Editable value={shared.personDomain} onSave={editShared('personDomain')} />
        </div>
        <PageNum n="11" side="left" />
      </Page>
      <Page bg="#16304a" style={{ color: '#f1ebdf' }}>
        <WaveAccent colorA="#17314a" colorB="#1d3a57" opacityB={0.7} flip />
        <div style={{ position: 'relative', width: 200, height: 200, alignSelf: 'flex-end', marginBottom: 8 }}>
          <EditableImage
            src={siteImages.contactPhoto}
            placeholder="Foto"
            shape="circle"
            style={{ width: 200, height: 200 }}
            onSave={(url) => updateSiteImage('contactPhoto', url)}
          />
          <div style={{ position: 'absolute', inset: -9, border: '1px solid rgba(199,171,125,.5)', borderRadius: '50%', pointerEvents: 'none' }} />
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Row
            label={<Editable value={t.coL1} onSave={edit('coL1')} />}
            value={<Editable value={shared.personEmail} onSave={editShared('personEmail')} />}
            color={GOLD}
            valueColor="#f1ebdf"
            border="rgba(236,229,214,.2)"
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '17px 0', borderTop: '1px solid rgba(236,229,214,.2)' }}>
            <span style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLD }}>
              <Editable value={t.coL2} onSave={edit('coL2')} />
            </span>
            {loggedIn ? (
              <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                <Editable value={shared.personLinkedinLabel} onSave={editShared('personLinkedinLabel')} style={{ fontFamily: archivoBlack, fontSize: 17 }} />
                <Editable value={shared.personLinkedinUrl} onSave={editShared('personLinkedinUrl')} style={{ fontSize: 11, opacity: 0.7 }} />
              </span>
            ) : (
              <a href={shared.personLinkedinUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: archivoBlack, fontSize: 17, color: '#f1ebdf', textDecoration: 'none', borderBottom: `1.5px solid ${GOLD}`, paddingBottom: 2 }}>
                {shared.personLinkedinLabel}
              </a>
            )}
          </div>
          <Row
            label={<Editable value={t.coL3} onSave={edit('coL3')} />}
            value={<Editable value={shared.personLocation} onSave={editShared('personLocation')} />}
            color={GOLD}
            valueColor="#f1ebdf"
            border="rgba(236,229,214,.2)"
            last
          />
        </div>
        <PageNum n="12" side="right" />
      </Page>
    </>
  );
}

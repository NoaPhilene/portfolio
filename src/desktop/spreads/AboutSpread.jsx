import EditableImage from '../../components/EditableImage.jsx';
import Editable from '../../components/Editable.jsx';
import { WaveField } from '../../components/WaveBackdrop.jsx';
import { GOLD } from '../../data/theme.js';
import { Page, PageNum, Kicker, Row, archivo, archivoBlack, spectral } from './shared.jsx';

export default function AboutSpread({ t, lang, shared, siteImages, updateString, updateShared, updateSiteImage }) {
  const edit = (key) => (v) => updateString(key, lang, v);
  return (
    <>
      <Page bg="#1f3c5c" style={{ justifyContent: 'space-between', color: '#f1ebdf' }} wave={<WaveField colorA="#2c5580" colorB="#16304a" />}>
        <Kicker color={GOLD}>
          <Editable value={t.abKicker} onSave={edit('abKicker')} />
        </Kicker>
        <div>
          <div style={{ fontFamily: archivoBlack, fontSize: 66, lineHeight: 0.86, color: '#f1ebdf' }}>
            <Editable value={t.abBig1} onSave={edit('abBig1')} />
          </div>
          <div style={{ fontFamily: archivoBlack, fontSize: 66, lineHeight: 0.94, color: 'transparent', WebkitTextStroke: '2px #c7ab7d' }}>
            <Editable value={t.abBig2} onSave={edit('abBig2')} />
          </div>
        </div>
        <div style={{ fontFamily: spectral, fontSize: 19, lineHeight: 1.6, color: '#ece5d6', maxWidth: 500 }}>
          <Editable value={t.abBio} onSave={edit('abBio')} multiline />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 30, height: 2, background: GOLD, display: 'inline-block' }} />
          <span style={{ fontFamily: spectral, fontStyle: 'italic', color: GOLD, fontSize: 20 }}>
            <Editable value={shared.personSignature} onSave={(v) => updateShared('personSignature', v)} />
          </span>
        </div>
        <PageNum n="05" side="left" />
      </Page>
      <Page bg="#eef1f5" wave={<WaveField variant="light" />}>
        <EditableImage
          src={siteImages.aboutPhoto}
          placeholder="Portretfoto"
          shape="rect"
          tone="light"
          style={{ width: '100%', height: 430 }}
          onSave={(url) => updateSiteImage('aboutPhoto', url)}
        />
        <div style={{ marginTop: 26, fontFamily: archivo, fontSize: 12, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, color: '#8a7f6a' }}>
          <Editable value={t.abAbout} onSave={edit('abAbout')} />
        </div>
        <div style={{ marginTop: 'auto' }}>
          <Row label={<Editable value={t.abL1} onSave={edit('abL1')} />} value={<Editable value={t.abV1} onSave={edit('abV1')} />} />
          <Row label={<Editable value={t.abL2} onSave={edit('abL2')} />} value={<Editable value={t.abV2} onSave={edit('abV2')} />} />
          <Row label={<Editable value={t.abL3} onSave={edit('abL3')} />} value={<Editable value={t.abV3} onSave={edit('abV3')} />} last />
        </div>
        <PageNum n="06" side="right" />
      </Page>
    </>
  );
}

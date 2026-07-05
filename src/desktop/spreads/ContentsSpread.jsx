import EditableImage from '../../components/EditableImage.jsx';
import Editable from '../../components/Editable.jsx';
import { WaveField } from '../../components/WaveBackdrop.jsx';
import { GOLD } from '../../data/theme.js';
import { Page, PageNum, Kicker, archivo, archivoBlack, spectral } from './shared.jsx';

function TocRow({ n, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{ display: 'flex', gap: 22, alignItems: 'flex-start', padding: '24px 14px', margin: '0 -14px', borderTop: '1px solid rgba(31,29,26,.16)', cursor: 'pointer', borderRadius: 3 }}
    >
      <div style={{ fontFamily: archivoBlack, fontSize: 44, lineHeight: 0.9, color: GOLD, minWidth: 72 }}>{n}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: archivoBlack, fontSize: 22, color: '#1f1d1a' }}>{title}</div>
        <div style={{ fontFamily: spectral, fontSize: 14, lineHeight: 1.5, color: '#6b6457', marginTop: 4 }}>{desc}</div>
      </div>
      <div style={{ fontFamily: archivo, fontSize: 13, color: '#8a7f6a', alignSelf: 'center' }}>→</div>
    </div>
  );
}

export default function ContentsSpread({ t, lang, siteImages, updateString, updateSiteImage, go }) {
  const lightWave = <WaveField variant="light" />;
  const edit = (key) => (v) => updateString(key, lang, v);
  return (
    <>
      <Page bg="#eef1f5" wave={lightWave}>
        <Kicker color="#8a7f6a">
          <Editable value={t.ctKicker} onSave={edit('ctKicker')} />
        </Kicker>
        <div style={{ marginTop: 30 }}>
          <div style={{ fontFamily: archivoBlack, fontSize: 116, lineHeight: 0.82, color: '#1f1d1a' }}>
            <Editable value={t.ctBig1} onSave={edit('ctBig1')} />
          </div>
          <div style={{ fontFamily: archivoBlack, fontSize: 116, lineHeight: 0.92, color: 'transparent', WebkitTextStroke: '2px #1f1d1a' }}>
            <Editable value={t.ctBig2} onSave={edit('ctBig2')} />
          </div>
        </div>
        <div style={{ marginTop: 30, fontFamily: spectral, fontSize: 16, lineHeight: 1.65, color: '#544e43', maxWidth: 430 }}>
          <Editable value={t.ctIntro} onSave={edit('ctIntro')} multiline />
        </div>
        <div style={{ marginTop: 'auto', width: '100%', height: 200 }}>
          <EditableImage
            src={siteImages.contentsMood}
            placeholder="Sfeerbeeld"
            shape="rect"
            tone="light"
            style={{ width: '100%', height: 200 }}
            onSave={(url) => updateSiteImage('contentsMood', url)}
          />
        </div>
        <PageNum n="03" side="left" />
      </Page>
      <Page bg="#eef1f5" wave={lightWave}>
        <div style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, color: '#8a7f6a', marginBottom: 6 }}>
          <Editable value={t.ctPages} onSave={edit('ctPages')} />
        </div>
        <TocRow n="01" title={<Editable value={t.i1t} onSave={edit('i1t')} />} desc={<Editable value={t.i1d} onSave={edit('i1d')} />} onClick={() => go(2)} />
        <TocRow n="02" title={<Editable value={t.i2t} onSave={edit('i2t')} />} desc={<Editable value={t.i2d} onSave={edit('i2d')} />} onClick={() => go(3)} />
        <TocRow n="03" title={<Editable value={t.i3t} onSave={edit('i3t')} />} desc={<Editable value={t.i3d} onSave={edit('i3d')} />} onClick={() => go(4)} />
        <div style={{ borderBottom: '1px solid rgba(31,29,26,.16)' }}>
          <TocRow n="04" title={<Editable value={t.i5t} onSave={edit('i5t')} />} desc={<Editable value={t.i5d} onSave={edit('i5d')} />} onClick={() => go(5)} />
        </div>
        <PageNum n="04" side="right" />
      </Page>
    </>
  );
}

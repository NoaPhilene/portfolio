export const archivo = "'Archivo',sans-serif";
export const archivoBlack = "'Archivo Black',sans-serif";
export const spectral = "'Spectral',serif";

export function Page({ bg, children, style, wave, padding = '62px 56px' }) {
  return (
    <div
      style={{
        width: 660,
        height: 880,
        background: bg,
        position: 'relative',
        overflow: 'hidden',
        padding,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {wave}
      {children}
    </div>
  );
}

export function PageNum({ n, side }) {
  const text = side === 'left' ? `— ${n}` : `${n} —`;
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 22,
        [side]: 48,
        fontFamily: archivo,
        fontSize: 12,
        letterSpacing: '.22em',
        color: 'inherit',
        zIndex: 5,
      }}
    >
      {text}
    </div>
  );
}

export function Kicker({ children, color }) {
  return (
    <div style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.28em', textTransform: 'uppercase', fontWeight: 600, color }}>
      {children}
    </div>
  );
}

export function Row({ label, value, first, last, color = '#8a7f6a', valueColor = '#1f1d1a', border = 'rgba(31,29,26,.16)' }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '18px 0',
        borderTop: `1px solid ${border}`,
        borderBottom: last ? `1px solid ${border}` : 'none',
      }}
    >
      <span style={{ fontFamily: archivo, fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color }}>{label}</span>
      <span style={{ fontFamily: archivoBlack, fontSize: 20, color: valueColor }}>{value}</span>
    </div>
  );
}

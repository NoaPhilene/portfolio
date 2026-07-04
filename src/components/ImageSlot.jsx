// Stand-in for the design tool's drag-and-drop <image-slot> custom element.
// That element's persistence/upload UI only exists inside the Claude Design
// canvas — here it's just a styled placeholder. Pass `src` once real photos
// are ready and it renders the image instead.
export default function ImageSlot({
  src,
  alt = '',
  shape = 'rounded',
  radius = 12,
  placeholder = 'Image',
  tone = 'dark',
  style,
}) {
  const borderRadius = shape === 'circle' ? '50%' : shape === 'rect' ? 0 : radius;
  const base = {
    position: 'relative',
    overflow: 'hidden',
    borderRadius,
    ...style,
  };

  if (src) {
    return (
      <div style={base}>
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </div>
    );
  }

  const light = tone === 'light';
  return (
    <div
      style={{
        ...base,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: light ? 'rgba(31,29,26,.05)' : 'rgba(241,235,223,.06)',
        border: `1px dashed ${light ? 'rgba(31,29,26,.22)' : 'rgba(241,235,223,.28)'}`,
      }}
    >
      <span
        style={{
          fontFamily: "'Archivo',sans-serif",
          fontSize: 11,
          letterSpacing: '.18em',
          textTransform: 'uppercase',
          color: light ? 'rgba(31,29,26,.4)' : 'rgba(241,235,223,.45)',
        }}
      >
        {placeholder}
      </span>
    </div>
  );
}

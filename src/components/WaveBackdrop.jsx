import { WAVE_DEEP_PATHS, WAVE_LIGHT_PATHS, WAVE_PICKER_PATHS, WAVE_ACCENT_PATHS } from '../data/theme.js';

// Full-bleed two-tone wave, used as a page's base backdrop (desktop only —
// the mobile pages use flat colors). `variant` picks the curve shape/opacity
// recipe; colors are supplied by the caller so the same recipe can be reused
// across the navy pages, the steel-blue Work page, and the picker overlay.
export function WaveField({ w = 660, h = 880, variant = 'deep', colorA, opacityA, colorB, style }) {
  const paths = variant === 'light' ? WAVE_LIGHT_PATHS : variant === 'picker' ? WAVE_PICKER_PATHS : WAVE_DEEP_PATHS;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', zIndex: -1, ...style }}
    >
      <path d={paths[0]} fill={colorA} opacity={opacityA ?? (variant === 'light' ? 1 : 0.5)} />
      <path d={paths[1]} fill={colorB} />
    </svg>
  );
}

// The extra pronounced curve overlay near the bottom of the Cover-right and
// Contact-right pages (mirrored to the top via `flip`).
export function WaveAccent({ colorA = '#17314a', colorB = '#1d3a57', opacityB = 0.75, flip = false, style }) {
  return (
    <svg
      viewBox="0 0 660 320"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        left: 0,
        width: '100%',
        height: 320,
        zIndex: -1,
        ...(flip ? { top: 0, transform: 'scaleY(-1)' } : { bottom: 0 }),
        ...style,
      }}
    >
      <path d={WAVE_ACCENT_PATHS[0]} fill={colorA} />
      <path d={WAVE_ACCENT_PATHS[1]} fill={colorB} opacity={opacityB} />
    </svg>
  );
}

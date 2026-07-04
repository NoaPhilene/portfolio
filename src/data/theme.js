// Shared visual constants — colors, per-page theme, and skills content —
// used by both the desktop spreads and the mobile pages.

export const GOLD = '#c7ab7d';
export const CREAM = '#f1ebdf';
export const INK = '#1f1d1a';
export const NAVY = '#16304a';

// index-aligned with the 6 pages: Cover, Contents, About, Skills, Work, Contact
export const PAGE_BG = ['#16304a', '#eef1f5', '#1f3c5c', '#eef1f5', '#233c58', '#16304a'];
export const PAGE_FG = ['#f1ebdf', '#1f1d1a', '#f1ebdf', '#1f1d1a', '#f1ebdf', '#f1ebdf'];
export const PAGE_DARK = [true, false, true, false, true, true];
export const PAGE_ACCENT = ['#c7ab7d', '#8a7f6a', '#c7ab7d', '#8a7f6a', '#c7ab7d', '#c7ab7d'];
export const PAGE_ALIGN = ['center', 'right', 'left', 'left', 'left', 'right'];

// desktop spreads render two pages at once; these are the individual
// left/right backgrounds (also used as the page-turn leaf face colors)
export const LEFT_BG = ['#17314a', '#eef1f5', '#1f3c5c', '#eef1f5', '#2f5a86', '#1f3c5c'];
export const RIGHT_BG = ['#102338', '#eef1f5', '#eef1f5', '#1f3c5c', '#eef1f5', '#16304a'];

export const SKILL_CIRCLES = [
  { code: 'JS', label: 'JavaScript' },
  { code: 'TS', label: 'TypeScript' },
  { code: 'Re', label: 'React' },
  { code: 'P5', labelKey: 'skAnim' },
];

export const SPECIALTIES = ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'HTML', 'CSS', 'SCSS', 'SQL', 'PHP', 'p5.js'];

// mobile skills page shows a shorter specialty list to fit one screen
export const SPECIALTIES_COMPACT = ['React', 'Next.js', 'TypeScript', 'Node.js', 'SCSS'];

// ── wave backdrops ──────────────────────────────────────────────────────
// Exact curve geometry lifted from the Claude Design prototype so the
// desktop spreads keep the same flowing two-tone waves.
export const WAVE_DEEP_PATHS = [
  'M0 722C175 648 352 796 527 708 616 663 660 692 660 692V880H0Z',
  'M0 754C175 688 357 808 530 732 618 694 660 722 660 722V880H0Z',
];
export const WAVE_LIGHT_PATHS = [
  'M0 745C175 675 355 808 528 728 616 688 660 715 660 715V880H0Z',
  'M0 780C175 720 360 822 532 758 620 723 660 748 660 748V880H0Z',
];
export const WAVE_PICKER_PATHS = [
  'M0 720C350 630 700 800 1050 700 1230 648 1320 690 1320 690V880H0Z',
  'M0 760C350 680 720 812 1060 730 1240 690 1320 724 1320 724V880H0Z',
];
export const WAVE_ACCENT_PATHS = [
  'M0,170 C150,90 330,250 510,160 C600,118 660,150 660,150 L660,320 L0,320 Z',
  'M0,215 C150,150 350,270 520,200 C610,165 660,200 660,200 L660,320 L0,320 Z',
];

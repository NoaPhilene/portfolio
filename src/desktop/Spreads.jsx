import CoverSpread from './spreads/CoverSpread.jsx';
import ContentsSpread from './spreads/ContentsSpread.jsx';
import AboutSpread from './spreads/AboutSpread.jsx';
import SkillsSpread from './spreads/SkillsSpread.jsx';
import WorkSpread from './spreads/WorkSpread.jsx';
import ContactSpread from './spreads/ContactSpread.jsx';
import { LEFT_BG, RIGHT_BG } from '../data/theme.js';

const SPREADS = [CoverSpread, ContentsSpread, AboutSpread, SkillsSpread, WorkSpread, ContactSpread];

// Full two-page spread for a given index — used both for the normally
// mounted spread and (shifted/cropped) inside the page-turn leaf faces, so
// the turning page always shows real, live content rather than a flat color.
export function SpreadRow({ index, ctx }) {
  const Cmp = SPREADS[index];
  return <Cmp {...ctx} />;
}

export { LEFT_BG, RIGHT_BG };

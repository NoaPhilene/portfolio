import CoverPage from './pages/CoverPage.jsx';
import ContentsPage from './pages/ContentsPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import SkillsPage from './pages/SkillsPage.jsx';
import WorkPage from './pages/WorkPage.jsx';
import ContactPage from './pages/ContactPage.jsx';

const PAGES = [CoverPage, ContentsPage, AboutPage, SkillsPage, WorkPage, ContactPage];

export function MobilePage({ index, ctx }) {
  const Cmp = PAGES[index];
  return <Cmp {...ctx} />;
}

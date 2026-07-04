// Example projects — swap these for real work whenever it's ready. Each item
// just needs an id, name, year, optional url ('' shows "not public yet"),
// a category/description/role in both languages, and a tags list.
export const PROJECTS = [
  {
    id: 'aurora',
    name: 'Aurora',
    year: '2025',
    url: 'aurora.shop',
    cat: { en: 'E-commerce Platform', nl: 'E-commerceplatform' },
    role: { en: 'Design & Front-end', nl: 'Ontwerp & Front-end' },
    desc: {
      en: 'A headless storefront with a custom design system, built for speed. Sub-second navigation, fluid product pages and a checkout flow that genuinely converts.',
      nl: "Een headless webshop met een eigen design system, gebouwd voor snelheid. Navigatie binnen een seconde, vloeiende productpagina's en een checkout die echt converteert.",
    },
    tags: ['Next.js', 'TypeScript', 'Stripe'],
  },
  {
    id: 'lumen',
    name: 'Lumen',
    year: '2024',
    url: '',
    cat: { en: 'Dashboard & Design System', nl: 'Dashboard & Design System' },
    role: { en: 'Front-end & UI', nl: 'Front-end & UI' },
    desc: {
      en: 'A data-heavy analytics dashboard and the reusable component library behind it. Dark-mode first, fully typed, and documented in Storybook so the team can move fast.',
      nl: 'Een datarijk analytics-dashboard en de herbruikbare componentenbibliotheek erachter. Dark-mode first, volledig getypeerd en gedocumenteerd in Storybook zodat het team snel werkt.',
    },
    tags: ['React', 'Storybook', 'D3'],
  },
  {
    id: 'atlas',
    name: 'Atlas',
    year: '2024',
    url: 'atlasstudio.nl',
    cat: { en: 'Marketing Website', nl: 'Marketingwebsite' },
    role: { en: 'Design & Build', nl: 'Ontwerp & Bouw' },
    desc: {
      en: 'A bold, animation-rich marketing site with a CMS the client actually enjoys using. Smooth scroll, lazy-loaded media and a near-perfect Lighthouse score.',
      nl: 'Een gedurfde, animatierijke marketingsite met een CMS waar de klant echt graag mee werkt. Smooth scroll, lazy-loaded media en een bijna perfecte Lighthouse-score.',
    },
    tags: ['Astro', 'GSAP', 'Sanity'],
  },
  {
    id: 'pulse',
    name: 'Pulse',
    year: '2023',
    url: '',
    cat: { en: 'Mobile App', nl: 'Mobiele app' },
    role: { en: 'Front-end', nl: 'Front-end' },
    desc: {
      en: 'A fitness companion app with offline sync and a playful, tactile interface. Real-time charts, haptics and a design language that keeps people coming back.',
      nl: 'Een fitness-app met offline sync en een speelse, tactiele interface. Realtime grafieken, haptics en een ontwerptaal die mensen terug laat komen.',
    },
    tags: ['React Native', 'Expo', 'SQLite'],
  },
];

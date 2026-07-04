// Copy shared by the desktop spreads and the mobile pages. Trimmed to the
// keys actually rendered in the final Claude Design prototypes — a couple of
// strings from earlier design iterations (an "About Me" spread that got
// folded back into the bio page) were never referenced and are dropped here.
export const STRINGS = {
  en: {
    titles: ['Cover', 'Contents', 'About', 'Skills & Process', 'Selected Work', 'Contact'],

    cvName: 'Web Developer',
    cvRole2: 'DEVELOPER',
    coverKicker: 'Portfolio · Vol. 01',

    ctKicker: 'Inside this issue',
    ctPages: 'Pages',
    ctBig1: 'CON—',
    ctBig2: 'TENTS',
    ctIntro:
      'A short magazine about the things I build for the web — selected projects, the tools I reach for, and the way I like to work.',
    i1t: 'About', i1d: 'Who I am and what I care about.',
    i2t: 'Skills & Process', i2d: 'The stack I use and how I work.',
    i3t: 'Selected Work', i3d: 'Browse my projects — switch between them on the page.',
    i5t: 'Contact', i5d: "Let's build something together.",

    abKicker: 'About · 01',
    abBig1: 'ABOUT', abBig2: 'ME',
    abBio:
      "I'm Noa van Mil and I was born in 2008 in Gorinchem. It's also where I grew up and where I still love to live. I enjoy doing activities with friends, but my biggest interest lies in the digital world. I like gaming, but also helping people become digitally skilled. To turn my hobby into my job, I chose the Creative Software Development programme. I'm currently following this study with pleasure and interest and I'm still learning a lot. In the future I hope to develop myself further in this and eventually make it my profession.",
    abAbout: 'A bit about me',
    abL1: 'Based', abL2: 'Focus', abL3: 'Since',
    abV1: 'Gorinchem', abV2: 'Front & back-end', abV3: '2024',

    skKicker: 'Skills · 02',
    skAnim: 'p5.js',
    skSpec: 'Specialities',
    skProcess: 'Process',
    skPw1: 'HOW IT', skPw2: 'WORKS',
    steps: [
      { t: 'Discovery', d: "We map the goals, scope and the people you're building for." },
      { t: 'Design', d: 'Wireframes and designs, refined until it clicks.' },
      { t: 'Build', d: 'Accessible code — built to last and easy to maintain.' },
      { t: 'Launch', d: 'Carefully launched and supported well after going live.' },
    ],
    // compact single-line phrasing for the mobile timeline
    stepsCompact: [
      'Discovery — mapping goals & scope',
      'Design — wireframes, refined',
      'Build — accessible, lasting code',
      'Launch — shipped and supported',
    ],

    wkKicker: 'Selected Work · 03',
    wkBarLabel: 'All projects',
    wkHint: 'View all projects',
    wkOffline: 'Not public yet',
    wkPickTitle: 'Select a project',
    wkPickClose: 'Close',
    wkWebsite: 'Live link',

    coKicker: 'Get in touch · 05',
    coBig1: "LET'S", coBig2: 'TALK',
    coSub: 'Always up for a good project, a chat, or learning something new together.',
    coL1: 'Email', coL2: 'LinkedIn', coL3: 'Location',
  },
  nl: {
    titles: ['Cover', 'Inhoud', 'Over mij', 'Skills & werkwijze', 'Geselecteerd werk', 'Contact'],

    cvName: 'Webontwikkelaar',
    cvRole2: 'ONTWIKKELAAR',
    coverKicker: 'Portfolio · Vol. 01',

    ctKicker: 'In deze editie',
    ctPages: "Pagina's",
    ctBig1: 'IN—',
    ctBig2: 'HOUD',
    ctIntro: 'Een klein magazine over wat ik voor het web bouw — geselecteerde projecten, de tools die ik gebruik en hoe ik werk.',
    i1t: 'Over mij', i1d: 'Wie ik ben en wat ik belangrijk vind.',
    i2t: 'Skills & werkwijze', i2d: 'Mijn stack en hoe ik werk.',
    i3t: 'Geselecteerd werk', i3d: 'Blader door mijn projecten — wissel ze op de pagina.',
    i5t: 'Contact', i5d: 'Laten we samen iets bouwen.',

    abKicker: 'Over · 01',
    abBig1: 'OVER', abBig2: 'MIJ',
    abBio:
      'Ik ben Noa van Mil en ik ben in 2008 in Gorinchem geboren. Dit is ook waar ik ben opgegroeid en waar ik nog steeds graag woon. Ik vind het leuk om met vrienden activiteiten te ondernemen, maar mijn grootste interesse ligt toch in de digitale wereld. Ik vind het leuk om te gamen, maar ook om mensen te helpen digitaal vaardig te zijn. Om van mijn hobby dan ook mijn baan te maken heb ik voor de opleiding Creative Software Development gekozen. Op dit moment volg ik met plezier en interesse deze opleiding en ben ik nog veel aan het leren. In de toekomst hoop ik mij hier verder in te ontwikkelen en uiteindelijk mijn beroep van te maken.',
    abAbout: 'Even voorstellen',
    abL1: 'Woonplaats', abL2: 'Focus', abL3: 'Sinds',
    abV1: 'Gorinchem', abV2: 'Front- & back-end', abV3: '2024',

    skKicker: 'Skills · 02',
    skAnim: 'p5.js',
    skSpec: 'Specialiteiten',
    skProcess: 'Werkwijze',
    skPw1: 'ZO', skPw2: 'WERK IK',
    steps: [
      { t: 'Ontdekken', d: 'We brengen de doelen, scope en je gebruikers in kaart.' },
      { t: 'Ontwerp', d: 'Wireframes en designs, verfijnd tot het klopt.' },
      { t: 'Bouwen', d: 'Toegankelijke code — gebouwd om te blijven en makkelijk te onderhouden.' },
      { t: 'Lancering', d: 'Zorgvuldig live gezet en ook daarna goed onderhouden.' },
    ],
    stepsCompact: [
      'Ontdekken — doelen & scope in kaart',
      'Ontwerp — wireframes, verfijnd',
      'Bouwen — toegankelijke, blijvende code',
      'Lancering — live gezet en onderhouden',
    ],

    wkKicker: 'Geselecteerd werk · 03',
    wkBarLabel: 'Alle projecten',
    wkHint: 'Bekijk alle projecten',
    wkOffline: 'Nog niet online',
    wkPickTitle: 'Kies een project',
    wkPickClose: 'Sluiten',
    wkWebsite: 'Live link',

    coKicker: 'Contact · 05',
    coBig1: 'ZEG', coBig2: 'HALLO',
    coSub: 'Altijd in voor een mooi project, een gesprek of samen iets nieuws leren.',
    coL1: 'E-mail', coL2: 'LinkedIn', coL3: 'Locatie',
  },
};

// Per-page kicker line, index-aligned with PAGE_* theme arrays
// (Cover, Contents, About, Skills, Work, Contact) — used by the mobile
// single-page layout, which shows one kicker at the top of every page.
export function pageKickers(t) {
  return [t.coverKicker, t.ctKicker, t.abKicker, t.skKicker, t.wkKicker, t.coKicker];
}

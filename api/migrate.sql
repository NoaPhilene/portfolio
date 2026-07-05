-- Portfolio CRUD schema + seed data (generated from the current static
-- src/data/*.js content so nothing is lost when switching to the DB).
-- Run once against a fresh `portfolio` database (create it first, e.g. via
-- phpMyAdmin: CREATE DATABASE `portfolio` CHARACTER SET utf8mb4;).

CREATE TABLE IF NOT EXISTS admin_user (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS content (
  id INT AUTO_INCREMENT PRIMARY KEY,
  key_name VARCHAR(64) NOT NULL,
  lang VARCHAR(2) NOT NULL DEFAULT '',
  value LONGTEXT NOT NULL,
  UNIQUE KEY key_lang (key_name, lang)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  slug VARCHAR(64) NOT NULL UNIQUE,
  name VARCHAR(120) NOT NULL DEFAULT '',
  year VARCHAR(8) NOT NULL DEFAULT '',
  url VARCHAR(255) NOT NULL DEFAULT '',
  cat_en VARCHAR(160) NOT NULL DEFAULT '',
  cat_nl VARCHAR(160) NOT NULL DEFAULT '',
  role_en VARCHAR(160) NOT NULL DEFAULT '',
  role_nl VARCHAR(160) NOT NULL DEFAULT '',
  desc_en TEXT NOT NULL,
  desc_nl TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '[]',
  sort_order INT NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS project_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT NOT NULL,
  url VARCHAR(255) NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS site_images (
  key_name VARCHAR(64) NOT NULL PRIMARY KEY,
  url VARCHAR(255) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ── admin account ────────────────────────────────────────────────────────
INSERT INTO admin_user (username, password_hash) VALUES
  ('noa', '$2y$10$L4xc3Z0Zfu4H044Xd0ltHuiM7VNvVcibLjWxpYgVrXx6Y1qypdXJa')
ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash);

-- ── site image slots (empty until the owner uploads a photo) ────────────
INSERT INTO site_images (key_name, url) VALUES
  ('coverPhoto', NULL),
  ('aboutPhoto', NULL),
  ('contactPhoto', NULL),
  ('contentsMood', NULL)
ON DUPLICATE KEY UPDATE url = VALUES(url);

-- ── content: per-language strings ───────────────────────────────────────
INSERT INTO content (key_name, lang, value) VALUES
  ('titles.0', 'en', 'Cover'),
  ('titles.1', 'en', 'Contents'),
  ('titles.2', 'en', 'About'),
  ('titles.3', 'en', 'Skills & Process'),
  ('titles.4', 'en', 'Selected Work'),
  ('titles.5', 'en', 'Contact'),
  ('cvName', 'en', 'Web Developer'),
  ('cvRole1', 'en', 'WEB'),
  ('cvRole2', 'en', 'DEVELOPER'),
  ('coverKicker', 'en', 'Portfolio · Vol. 01'),
  ('ctKicker', 'en', 'Inside this issue'),
  ('ctPages', 'en', 'Pages'),
  ('ctBig1', 'en', 'CON—'),
  ('ctBig2', 'en', 'TENTS'),
  ('ctIntro', 'en', 'A short magazine about the things I build for the web — selected projects, the tools I reach for, and the way I like to work.'),
  ('i1t', 'en', 'About'),
  ('i1d', 'en', 'Who I am and what I care about.'),
  ('i2t', 'en', 'Skills & Process'),
  ('i2d', 'en', 'The stack I use and how I work.'),
  ('i3t', 'en', 'Selected Work'),
  ('i3d', 'en', 'Browse my projects — switch between them on the page.'),
  ('i5t', 'en', 'Contact'),
  ('i5d', 'en', 'Let''s build something together.'),
  ('abKicker', 'en', 'About · 01'),
  ('abBig1', 'en', 'ABOUT'),
  ('abBig2', 'en', 'ME'),
  ('abBio', 'en', 'I''m Noa van Mil and I was born in 2008 in Gorinchem. It''s also where I grew up and where I still love to live. I enjoy doing activities with friends, but my biggest interest lies in the digital world. I like gaming, but also helping people become digitally skilled. To turn my hobby into my job, I chose the Creative Software Development programme. I''m currently following this study with pleasure and interest and I''m still learning a lot. In the future I hope to develop myself further in this and eventually make it my profession.'),
  ('abAbout', 'en', 'A bit about me'),
  ('abL1', 'en', 'Based'),
  ('abL2', 'en', 'Focus'),
  ('abL3', 'en', 'Since'),
  ('abV1', 'en', 'Gorinchem'),
  ('abV2', 'en', 'Front & back-end'),
  ('abV3', 'en', '2024'),
  ('skKicker', 'en', 'Skills · 02'),
  ('skAnim', 'en', 'p5.js'),
  ('skSpec', 'en', 'Specialities'),
  ('skProcess', 'en', 'Process'),
  ('skPw1', 'en', 'HOW IT'),
  ('skPw2', 'en', 'WORKS'),
  ('steps.0.t', 'en', 'Discovery'),
  ('steps.0.d', 'en', 'We map the goals, scope and the people you''re building for.'),
  ('steps.1.t', 'en', 'Design'),
  ('steps.1.d', 'en', 'Wireframes and designs, refined until it clicks.'),
  ('steps.2.t', 'en', 'Build'),
  ('steps.2.d', 'en', 'Accessible code — built to last and easy to maintain.'),
  ('steps.3.t', 'en', 'Launch'),
  ('steps.3.d', 'en', 'Carefully launched and supported well after going live.'),
  ('stepsCompact.0', 'en', 'Discovery — mapping goals & scope'),
  ('stepsCompact.1', 'en', 'Design — wireframes, refined'),
  ('stepsCompact.2', 'en', 'Build — accessible, lasting code'),
  ('stepsCompact.3', 'en', 'Launch — shipped and supported'),
  ('wkKicker', 'en', 'Selected Work · 03'),
  ('wkBarLabel', 'en', 'All projects'),
  ('wkHint', 'en', 'View all projects'),
  ('wkOffline', 'en', 'Not public yet'),
  ('wkPickTitle', 'en', 'Select a project'),
  ('wkPickClose', 'en', 'Close'),
  ('wkWebsite', 'en', 'Live link'),
  ('coKicker', 'en', 'Get in touch · 05'),
  ('coBig1', 'en', 'LET''S'),
  ('coBig2', 'en', 'TALK'),
  ('coSub', 'en', 'Always up for a good project, a chat, or learning something new together.'),
  ('coL1', 'en', 'Email'),
  ('coL2', 'en', 'LinkedIn'),
  ('coL3', 'en', 'Location'),
  ('titles.0', 'nl', 'Cover'),
  ('titles.1', 'nl', 'Inhoud'),
  ('titles.2', 'nl', 'Over mij'),
  ('titles.3', 'nl', 'Skills & werkwijze'),
  ('titles.4', 'nl', 'Geselecteerd werk'),
  ('titles.5', 'nl', 'Contact'),
  ('cvName', 'nl', 'Webontwikkelaar'),
  ('cvRole1', 'nl', 'WEB'),
  ('cvRole2', 'nl', 'ONTWIKKELAAR'),
  ('coverKicker', 'nl', 'Portfolio · Vol. 01'),
  ('ctKicker', 'nl', 'In deze editie'),
  ('ctPages', 'nl', 'Pagina''s'),
  ('ctBig1', 'nl', 'IN—'),
  ('ctBig2', 'nl', 'HOUD'),
  ('ctIntro', 'nl', 'Een klein magazine over wat ik voor het web bouw — geselecteerde projecten, de tools die ik gebruik en hoe ik werk.'),
  ('i1t', 'nl', 'Over mij'),
  ('i1d', 'nl', 'Wie ik ben en wat ik belangrijk vind.'),
  ('i2t', 'nl', 'Skills & werkwijze'),
  ('i2d', 'nl', 'Mijn stack en hoe ik werk.'),
  ('i3t', 'nl', 'Geselecteerd werk'),
  ('i3d', 'nl', 'Blader door mijn projecten — wissel ze op de pagina.'),
  ('i5t', 'nl', 'Contact'),
  ('i5d', 'nl', 'Laten we samen iets bouwen.'),
  ('abKicker', 'nl', 'Over · 01'),
  ('abBig1', 'nl', 'OVER'),
  ('abBig2', 'nl', 'MIJ'),
  ('abBio', 'nl', 'Ik ben Noa van Mil en ik ben in 2008 in Gorinchem geboren. Dit is ook waar ik ben opgegroeid en waar ik nog steeds graag woon. Ik vind het leuk om met vrienden activiteiten te ondernemen, maar mijn grootste interesse ligt toch in de digitale wereld. Ik vind het leuk om te gamen, maar ook om mensen te helpen digitaal vaardig te zijn. Om van mijn hobby dan ook mijn baan te maken heb ik voor de opleiding Creative Software Development gekozen. Op dit moment volg ik met plezier en interesse deze opleiding en ben ik nog veel aan het leren. In de toekomst hoop ik mij hier verder in te ontwikkelen en uiteindelijk mijn beroep van te maken.'),
  ('abAbout', 'nl', 'Even voorstellen'),
  ('abL1', 'nl', 'Woonplaats'),
  ('abL2', 'nl', 'Focus'),
  ('abL3', 'nl', 'Sinds'),
  ('abV1', 'nl', 'Gorinchem'),
  ('abV2', 'nl', 'Front- & back-end'),
  ('abV3', 'nl', '2024'),
  ('skKicker', 'nl', 'Skills · 02'),
  ('skAnim', 'nl', 'p5.js'),
  ('skSpec', 'nl', 'Specialiteiten'),
  ('skProcess', 'nl', 'Werkwijze'),
  ('skPw1', 'nl', 'ZO'),
  ('skPw2', 'nl', 'WERK IK'),
  ('steps.0.t', 'nl', 'Ontdekken'),
  ('steps.0.d', 'nl', 'We brengen de doelen, scope en je gebruikers in kaart.'),
  ('steps.1.t', 'nl', 'Ontwerp'),
  ('steps.1.d', 'nl', 'Wireframes en designs, verfijnd tot het klopt.'),
  ('steps.2.t', 'nl', 'Bouwen'),
  ('steps.2.d', 'nl', 'Toegankelijke code — gebouwd om te blijven en makkelijk te onderhouden.'),
  ('steps.3.t', 'nl', 'Lancering'),
  ('steps.3.d', 'nl', 'Zorgvuldig live gezet en ook daarna goed onderhouden.'),
  ('stepsCompact.0', 'nl', 'Ontdekken — doelen & scope in kaart'),
  ('stepsCompact.1', 'nl', 'Ontwerp — wireframes, verfijnd'),
  ('stepsCompact.2', 'nl', 'Bouwen — toegankelijke, blijvende code'),
  ('stepsCompact.3', 'nl', 'Lancering — live gezet en onderhouden'),
  ('wkKicker', 'nl', 'Geselecteerd werk · 03'),
  ('wkBarLabel', 'nl', 'Alle projecten'),
  ('wkHint', 'nl', 'Bekijk alle projecten'),
  ('wkOffline', 'nl', 'Nog niet online'),
  ('wkPickTitle', 'nl', 'Kies een project'),
  ('wkPickClose', 'nl', 'Sluiten'),
  ('wkWebsite', 'nl', 'Live link'),
  ('coKicker', 'nl', 'Contact · 05'),
  ('coBig1', 'nl', 'ZEG'),
  ('coBig2', 'nl', 'HALLO'),
  ('coSub', 'nl', 'Altijd in voor een mooi project, een gesprek of samen iets nieuws leren.'),
  ('coL1', 'nl', 'E-mail'),
  ('coL2', 'nl', 'LinkedIn'),
  ('coL3', 'nl', 'Locatie'),
  ('personNameLine1', '', 'Noa'),
  ('personNameLine2', '', 'Philène'),
  ('personNameLine3', '', 'Van Mil'),
  ('personSignature', '', 'Noa Philène'),
  ('personEmail', '', 'Noavanmil@gmail.com'),
  ('personLinkedinLabel', '', 'linkedin.com/in/noaphilene'),
  ('personLinkedinUrl', '', 'https://www.linkedin.com/in/noaphilene'),
  ('personLocation', '', 'Gorinchem'),
  ('personDomain', '', 'noaphilene.dev'),
  ('coverYear', '', '2026'),
  ('specialties', '', '["React","Next.js","TypeScript","Tailwind CSS","Node.js","HTML","CSS","SCSS","SQL","PHP","p5.js"]'),
  ('specialtiesCompact', '', '["React","Next.js","TypeScript","Node.js","SCSS"]'),
  ('skillCircles', '', '[{"code":"JS","label":"JavaScript"},{"code":"TS","label":"TypeScript"},{"code":"Re","label":"React"},{"code":"P5","label":"p5.js"}]')
ON DUPLICATE KEY UPDATE value = VALUES(value);

-- ── projects + their images ──────────────────────────────────────────────
INSERT INTO projects (slug, name, year, url, cat_en, cat_nl, role_en, role_nl, desc_en, desc_nl, tags, sort_order) VALUES
  ('happy-herbivore', 'Happy Herbivore', '2026', 'u240073.gluwebsite.nl/kiosk', 'Self-Service Kiosk', 'Self-service kiosk', 'Front-end Development', 'Front-end-ontwikkeling', 'A fully working self-service kiosk prototype for the restaurant Happy Herbivore. The kiosk guides customers independently through the entire ordering process — from picking products to a simulated payment — styled to match the restaurant''s brand.', 'Een volledig werkend prototype van een self-service kiosk voor restaurant Happy Herbivore. De kiosk begeleidt klanten zelfstandig door het hele bestelproces — van het kiezen van producten tot een gesimuleerde betaling — in de huisstijl van het restaurant.', '["React"]', 0)
ON DUPLICATE KEY UPDATE name=VALUES(name), year=VALUES(year), url=VALUES(url), cat_en=VALUES(cat_en), cat_nl=VALUES(cat_nl), role_en=VALUES(role_en), role_nl=VALUES(role_nl), desc_en=VALUES(desc_en), desc_nl=VALUES(desc_nl), tags=VALUES(tags), sort_order=VALUES(sort_order);

INSERT INTO project_images (project_id, url, sort_order)
  SELECT id, '/projects/happy-herbivore/breakfast-menu.png', 0 FROM projects WHERE slug='happy-herbivore'
  AND NOT EXISTS (SELECT 1 FROM project_images pi JOIN projects pr ON pr.id=pi.project_id WHERE pr.slug='happy-herbivore' AND pi.url='/projects/happy-herbivore/breakfast-menu.png');
INSERT INTO project_images (project_id, url, sort_order)
  SELECT id, '/projects/happy-herbivore/full-menu.png', 1 FROM projects WHERE slug='happy-herbivore'
  AND NOT EXISTS (SELECT 1 FROM project_images pi JOIN projects pr ON pr.id=pi.project_id WHERE pr.slug='happy-herbivore' AND pi.url='/projects/happy-herbivore/full-menu.png');
INSERT INTO project_images (project_id, url, sort_order)
  SELECT id, '/projects/happy-herbivore/item-detail.png', 2 FROM projects WHERE slug='happy-herbivore'
  AND NOT EXISTS (SELECT 1 FROM project_images pi JOIN projects pr ON pr.id=pi.project_id WHERE pr.slug='happy-herbivore' AND pi.url='/projects/happy-herbivore/item-detail.png');

INSERT INTO projects (slug, name, year, url, cat_en, cat_nl, role_en, role_nl, desc_en, desc_nl, tags, sort_order) VALUES
  ('lumen', 'Lumen', '2024', '', 'Dashboard & Design System', 'Dashboard & Design System', 'Front-end & UI', 'Front-end & UI', 'A data-heavy analytics dashboard and the reusable component library behind it. Dark-mode first, fully typed, and documented in Storybook so the team can move fast.', 'Een datarijk analytics-dashboard en de herbruikbare componentenbibliotheek erachter. Dark-mode first, volledig getypeerd en gedocumenteerd in Storybook zodat het team snel werkt.', '["React","Storybook","D3"]', 1)
ON DUPLICATE KEY UPDATE name=VALUES(name), year=VALUES(year), url=VALUES(url), cat_en=VALUES(cat_en), cat_nl=VALUES(cat_nl), role_en=VALUES(role_en), role_nl=VALUES(role_nl), desc_en=VALUES(desc_en), desc_nl=VALUES(desc_nl), tags=VALUES(tags), sort_order=VALUES(sort_order);


INSERT INTO projects (slug, name, year, url, cat_en, cat_nl, role_en, role_nl, desc_en, desc_nl, tags, sort_order) VALUES
  ('atlas', 'Atlas', '2024', 'atlasstudio.nl', 'Marketing Website', 'Marketingwebsite', 'Design & Build', 'Ontwerp & Bouw', 'A bold, animation-rich marketing site with a CMS the client actually enjoys using. Smooth scroll, lazy-loaded media and a near-perfect Lighthouse score.', 'Een gedurfde, animatierijke marketingsite met een CMS waar de klant echt graag mee werkt. Smooth scroll, lazy-loaded media en een bijna perfecte Lighthouse-score.', '["Astro","GSAP","Sanity"]', 2)
ON DUPLICATE KEY UPDATE name=VALUES(name), year=VALUES(year), url=VALUES(url), cat_en=VALUES(cat_en), cat_nl=VALUES(cat_nl), role_en=VALUES(role_en), role_nl=VALUES(role_nl), desc_en=VALUES(desc_en), desc_nl=VALUES(desc_nl), tags=VALUES(tags), sort_order=VALUES(sort_order);


INSERT INTO projects (slug, name, year, url, cat_en, cat_nl, role_en, role_nl, desc_en, desc_nl, tags, sort_order) VALUES
  ('pulse', 'Pulse', '2023', '', 'Mobile App', 'Mobiele app', 'Front-end', 'Front-end', 'A fitness companion app with offline sync and a playful, tactile interface. Real-time charts, haptics and a design language that keeps people coming back.', 'Een fitness-app met offline sync en een speelse, tactiele interface. Realtime grafieken, haptics en een ontwerptaal die mensen terug laat komen.', '["React Native","Expo","SQLite"]', 3)
ON DUPLICATE KEY UPDATE name=VALUES(name), year=VALUES(year), url=VALUES(url), cat_en=VALUES(cat_en), cat_nl=VALUES(cat_nl), role_en=VALUES(role_en), role_nl=VALUES(role_nl), desc_en=VALUES(desc_en), desc_nl=VALUES(desc_nl), tags=VALUES(tags), sort_order=VALUES(sort_order);



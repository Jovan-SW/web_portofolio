/**
 * SEO & Keywords Configuration
 * Single source of truth untuk metadata, structured data (JSON-LD), sitemap, dan optimasi mesin pencari Google.
 */

export const SEO_CONFIG = {
  siteUrl: 'https://jovansw.is-a.dev',
  domain: 'jovansw.is-a.dev',
  name: 'Jovan Sebastian William',
  alternateNames: [
    'Jovan',
    'jovansw',
    'Jovan Sebastian',
    'Jovan William',
    'Jovan S. W.',
  ],
  role: 'Full Stack Developer',
  location: 'Indonesia',
  locationDetails: {
    country: 'Indonesia',
    countryCode: 'ID',
    timeZone: 'Asia/Jakarta (WIB, UTC+7)',
  },
  email: 'jovsebwil723@gmail.com',
  social: {
    github: 'https://github.com/Jovan-SW',
    linkedin: 'https://www.linkedin.com/in/jovansebastian',
    website: 'https://jovansw.is-a.dev',
  },
  defaultTitle: 'Jovan Sebastian William | Portofolio Full Stack Developer Indonesia',
  titleTemplate: '%s | Jovan Sebastian William',
  defaultDescription:
    'Portofolio resmi Jovan Sebastian William — Full Stack Developer Indonesia yang berfokus pada arsitektur web modern, Next.js, React, TypeScript, dan PostgreSQL berkinerja tinggi.',
  ogImage: '/img/inimahgw.png',

  // Master Keywords List untuk Ranking Tertinggi Google
  keywords: [
    // 1. Target Utama (Exact Match Nama & Brand)
    'Jovan Sebastian William',
    'Portofolio Jovan Sebastian William',
    'Jovan Sebastian',
    'Jovan William',
    'Jovan',
    'jovansw',
    'jovansw.is-a.dev',
    'Jovan Sebastian William Portfolio',
    'Jovan Sebastian William Web Developer',
    'Jovan Sebastian William Full Stack Developer',

    // 2. Role & Geografis (Indonesia & Global Remote)
    'Full Stack Developer Indonesia',
    'Full Stack Web Developer Indonesia',
    'Software Engineer Indonesia',
    'Web Developer Indonesia',
    'Web Developer Jakarta',
    'Frontend Developer Indonesia',
    'Backend Developer Indonesia',
    'Indonesian Software Engineer',

    // 3. Tech Stack & Keahlian Teknis
    'Next.js Developer Indonesia',
    'React Developer Indonesia',
    'TypeScript Developer',
    'Node.js Developer Indonesia',
    'PostgreSQL Specialist',
    'Tailwind CSS',
    'Modern Web Architecture',
    'Web Performance & Core Web Vitals',

    // 4. Intent Pencarian & Long-Tail
    'portofolio jovan sebastian william',
    'portofolio web developer jovan',
    'hire full stack developer indonesia',
    'jasa pembuatan website modern',
    'portfolio next js full stack indonesia',
    'jovan sebastian github',
    'jovan sebastian linkedin',
  ],

  // Structured Knowledge Topics untuk Schema.org Person "knowsAbout"
  knowsAbout: [
    'Full Stack Web Development',
    'Software Engineering',
    'Next.js App Router',
    'React.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'PostgreSQL',
    'REST APIs',
    'Tailwind CSS',
    'Web Performance Optimization',
    'Search Engine Optimization (SEO)',
    'Responsive Web Design',
    'Database Architecture',
  ],
};


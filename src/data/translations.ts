export type Language = 'id' | 'en';

export interface TranslationRecord {
  id: string;
  en: string;
}

export const translations = {
  // --- Navbar ---
  'nav.home': {
    id: 'Beranda',
    en: 'Home',
  },
  'nav.about': {
    id: 'Tentang',
    en: 'About',
  },
  'nav.projects': {
    id: 'Proyek',
    en: 'Projects',
  },
  'nav.contact': {
    id: 'Kontak',
    en: 'Contact',
  },
  'nav.langSwitch': {
    id: 'Bahasa',
    en: 'Language',
  },

  // --- Hero Section ---
  'hero.name': {
    id: 'Jovan Sebastian William',
    en: 'Jovan Sebastian William',
  },
  'hero.typewriter1': {
    id: 'Full-Stack Web Developer',
    en: 'Full-Stack Web Developer',
  },
  'hero.typewriter2': {
    id: 'Software Engineer',
    en: 'Software Engineer',
  },
  'hero.typewriter3': {
    id: 'Spesialis Next.js & TypeScript',
    en: 'Next.js & TypeScript Specialist',
  },
  'hero.typewriter4': {
    id: 'Full-Stack System Architect',
    en: 'Full-Stack System Architect',
  },
  'hero.pitch': {
    id: 'Saya adalah seorang Full-Stack Engineer yang berfokus membangun aplikasi web tangguh dan berkinerja tinggi dari antarmuka hingga basis data. Menggunakan Next.js, TypeScript, dan PostgreSQL, saya mengatasi tantangan fragmentasi sistem, latensi transmisi data, serta kerentanan akses—memastikan setiap komponen aplikasi beroperasi selaras, aman, dan siap diskalakan.',
    en: 'I am a Full-Stack Engineer dedicated to building resilient, high-performance web applications from interface to database. Leveraging Next.js, TypeScript, and PostgreSQL, I solve system fragmentation, data transmission latency, and access vulnerability challenges—ensuring every application component operates seamlessly, securely, and ready to scale.',
  },
  'hero.ctaProjects': {
    id: 'Jelajahi Proyek',
    en: 'Explore Projects',
  },
  'hero.ctaContact': {
    id: 'Hubungi Saya',
    en: 'Get in Touch',
  },

  // --- About Section ---
  'about.eyebrow': {
    id: 'Evolusi & Perjalanan',
    en: 'Evolution & Journey',
  },
  'about.title': {
    id: 'Technical Journey',
    en: 'Technical Journey',
  },
  'about.description': {
    id: 'Perjalanan rekayasa perangkat lunak saya bermula dari pemahaman mendasar mengenai arsitektur jaringan dan komunikasi peladen, yang kemudian berkembang menjadi spesialisasi dalam pengembangan sistem web full-stack. Berangkat dari perancangan sistem interaktif berbasis konsumsi data hingga pembangunan platform niaga elektronik dengan alur transaksi terintegrasi, fokus rekayasa saya terpusat pada ekosistem Next.js, TypeScript, dan PostgreSQL. Pendekatan kerja saya menitikberatkan pada struktur arsitektur yang modular, kepatuhan pengetikan kode yang ketat, serta penjaminan keamanan data tingkat lanjut demi menghadirkan solusi digital yang andal dan berkinerja tinggi.',
    en: 'My software engineering journey began with foundational insights into network architecture and server communication, which evolved into a specialization in full-stack web engineering. From architecting data-driven interactive systems to building e-commerce platforms with integrated transaction workflows, my engineering focus centers on Next.js, TypeScript, and PostgreSQL. My methodology emphasizes modular architectural patterns, strict static type enforcement, and robust data security to deliver dependable, high-performance digital solutions.',
  },
  'about.photoAlt': {
    id: 'Jovan - Technical Journey',
    en: 'Jovan - Technical Journey',
  },
  'about.workflowEyebrow': {
    id: 'Alur Kerja & Kolaborasi',
    en: 'Workflow & Collaboration',
  },
  'about.workflowTitle': {
    id: 'Cara Kerja',
    en: 'How I Work',
  },
  'about.pillar1Title': {
    id: 'Komunikasi Tertulis yang Jelas',
    en: 'Clear Written Communication',
  },
  'about.pillar1Desc': {
    id: 'Saya selalu membiasakan menulis deskripsi Pull Request yang informatif, riwayat commit yang bermakna, dan dokumentasi yang terstruktur. Komunikasi asinkron yang jelas membuat kolaborasi tim tetap berjalan lancar tanpa harus bergantung pada rapat berulang.',
    en: 'I make it a principle to write informative Pull Request descriptions, meaningful Git commit histories, and structured documentation. Clear asynchronous communication keeps team velocity high without reliance on excessive meetings.',
  },
  'about.pillar2Title': {
    id: 'Standar Kode yang Ketat',
    en: 'Rigorous Code Standards',
  },
  'about.pillar2Desc': {
    id: 'Bagi saya, kode tidak cukup sekadar "berfungsi". Saya menerapkan pengetikan statis yang ketat (type safety) di TypeScript, struktur branch Git yang teratur, dan validasi kode sebelum digabungkan ke main branch agar sistem di production tetap stabil.',
    en: 'To me, code is not complete just because it runs. I enforce strict static typing in TypeScript, disciplined Git branching workflows, and pre-merge validations to guarantee production reliability.',
  },
  'about.pillar3Title': {
    id: 'Terbuka terhadap Masukan',
    en: 'Open to Feedback',
  },
  'about.pillar3Desc': {
    id: 'Saya memandang code review sebagai sarana terbaik untuk belajar dan menyelaraskan visi rekayasa. Setiap kritik konstruktif dan diskusi arsitektur saya terima dengan tangan terbuka demi menghasilkan solusi perangkat lunak yang lebih kokoh dan mudah dirawat.',
    en: 'I consider code reviews the prime opportunity to learn and align engineering vision. I welcome constructive feedback and architectural dialogue to build sturdier, highly maintainable software solutions.',
  },

  // --- Project Section ---
  'projects.sectionTitle': {
    id: 'Studi Kasus & Portofolio',
    en: 'Case Studies & Portfolio',
  },
  'projects.sectionSubtitle': {
    id: 'Jelajahi karya produksi pilihan yang dibangun dengan perhatian mendalam terhadap arsitektur web modern, kinerja maksimal, dan pengalaman pengguna presisi.',
    en: 'Explore curated production projects built with meticulous attention to modern web architecture, peak performance, and precision user experience.',
  },
  'projects.viewCaseStudy': {
    id: 'Buka Halaman Studi Kasus Lengkap',
    en: 'View Full Case Study',
  },
  'projects.viewCaseStudyShort': {
    id: 'Lihat Studi Kasus',
    en: 'View Case Study',
  },
  'projects.completed': {
    id: 'Selesai',
    en: 'Completed',
  },
  'projects.duration': {
    id: 'Durasi',
    en: 'Duration',
  },
  'projects.architectureTitle': {
    id: 'Arsitektur Rekayasa:',
    en: 'Engineering Architecture:',
  },
  'projects.metricsHeader': {
    id: 'Metrik Utama Proyek',
    en: 'Key Project Metrics',
  },
  'projects.liveDemo': {
    id: 'Live Demo',
    en: 'Live Demo',
  },
  'projects.github': {
    id: 'GitHub',
    en: 'GitHub',
  },

  // --- Contact Section ---
  'contact.eyebrow': {
    id: 'Hubungi Saya',
    en: 'Get In Touch',
  },
  'contact.title': {
    id: 'Contact Me',
    en: 'Contact Me',
  },
  'contact.heading1': {
    id: 'Butuh informasi lebih lanjut?',
    en: 'Need further information?',
  },
  'contact.heading2': {
    id: 'Mari terhubung dan berdiskusi dengan kami',
    en: "Let's connect and discuss your vision",
  },
  'contact.subheading': {
    id: 'Rangkaian layanan rekayasa perangkat lunak full-stack dan pengembangan produk modern yang dirancang untuk mewujudkan strategi serta ide Anda menjadi solusi berskala besar.',
    en: 'A comprehensive suite of full-stack software engineering and modern product development services designed to transform your strategy and ideas into scalable solutions.',
  },
  'contact.officialEmail': {
    id: 'Email Resmi',
    en: 'Official Email',
  },
  'contact.copyEmail': {
    id: 'Salin Email',
    en: 'Copy Email',
  },
  'contact.emailCopied': {
    id: 'Email Tersalin!',
    en: 'Email Copied!',
  },
  'contact.openMailto': {
    id: 'Buka Mailto',
    en: 'Open Mailto',
  },
  'contact.availability': {
    id: 'Ketersediaan (Availability)',
    en: 'Availability',
  },
  'contact.availStatus': {
    id: 'Tersedia untuk Kontrak & Freelance',
    en: 'Available for Contract & Freelance',
  },
  'contact.availResponse': {
    id: 'Respons cepat < 24 jam kerja',
    en: 'Fast response < 24 business hours',
  },
  'contact.timezone': {
    id: 'Zona Waktu & Remote',
    en: 'Time Zone & Remote',
  },
  'contact.timezoneDetail': {
    id: 'Indonesia (UTC+7 / WIB)',
    en: 'Indonesia (UTC+7 / WIB)',
  },
  'contact.timezoneRemote': {
    id: 'Worldwide Remote',
    en: 'Worldwide Remote',
  },
  'contact.wibLabel': {
    id: 'Waktu lokal:',
    en: 'Local time:',
  },
  'contact.wibRemoteReady': {
    id: 'Siap Kerja Remote Seluruh Dunia',
    en: 'Remote Worldwide Ready',
  },
  'contact.linkedin': {
    id: 'LinkedIn Profil',
    en: 'LinkedIn Profile',
  },
  'contact.linkedinDesc': {
    id: 'Koneksi profesional & riwayat karir',
    en: 'Professional network & career history',
  },
  'contact.github': {
    id: 'GitHub Profil',
    en: 'GitHub Profile',
  },
  'contact.githubDesc': {
    id: 'Repositori kode, arsitektur, & proyek open source',
    en: 'Code repositories, architecture, & open source projects',
  },
  'contact.formTitle': {
    id: 'Kirim Pesan Langsung',
    en: 'Send a Direct Message',
  },
  'contact.formSubtitle': {
    id: 'Kirimkan detail ide, kolaborasi, atau tawaran proyek Anda. Pesan akan langsung diteruskan ke inbox email saya.',
    en: 'Share your project ideas, collaboration, or inquiries. Messages are delivered straight to my personal inbox.',
  },
  'contact.nameLabel': {
    id: 'Nama Lengkap',
    en: 'Full Name',
  },
  'contact.namePlaceholder': {
    id: 'cth. Jovan Sebastian',
    en: 'e.g. Jovan Sebastian',
  },
  'contact.emailLabel': {
    id: 'Alamat Email',
    en: 'Email Address',
  },
  'contact.emailPlaceholder': {
    id: 'nama@domain.com',
    en: 'name@domain.com',
  },
  'contact.whatsappLabel': {
    id: 'WhatsApp / Telepon (Opsional)',
    en: 'WhatsApp / Phone (Optional)',
  },
  'contact.whatsappPlaceholder': {
    id: '+62 812 3456 7890',
    en: '+62 812 3456 7890',
  },
  'contact.messageLabel': {
    id: 'Isi Pesan',
    en: 'Message Details',
  },
  'contact.messagePlaceholder': {
    id: 'Ceritakan detail proyek, arsitektur yang diinginkan, atau pertanyaan Anda...',
    en: 'Tell me about your project scope, architecture, or inquiry...',
  },
  'contact.submitBtn': {
    id: 'Kirim Pesan Sekarang',
    en: 'Send Message Now',
  },
  'contact.sendingBtn': {
    id: 'Mengirimkan Pesan...',
    en: 'Sending Message...',
  },
  'contact.successTitle': {
    id: 'Pesan Berhasil Terkirim!',
    en: 'Message Sent Successfully!',
  },
  'contact.successDesc': {
    id: 'Terima kasih telah menghubungi saya. Saya akan segera merespons ke email Anda dalam waktu kurang dari 24 jam.',
    en: 'Thank you for reaching out. I will get back to your email within 24 hours.',
  },
  'contact.sendAnother': {
    id: 'Kirim Pesan Lainnya',
    en: 'Send Another Message',
  },

  // --- Footer ---
  'footer.tagline': {
    id: 'Rekayasa Web Full-Stack & Pengembangan Produk Modern.',
    en: 'Full-Stack Web Engineering & Modern Product Development.',
  },
  'footer.copyright': {
    id: 'Seluruh hak cipta dilindungi.',
    en: 'All rights reserved.',
  },

  // --- Project Detail Page ---
  'detail.back': {
    id: 'Kembali ke Portofolio',
    en: 'Back to Portfolio',
  },
  'detail.sourceCode': {
    id: 'Source Code',
    en: 'Source Code',
  },
  'detail.liveDemo': {
    id: 'Live Demo',
    en: 'Live Demo',
  },
  'detail.role': {
    id: 'Peran Rekayasa',
    en: 'Engineering Role',
  },
  'detail.team': {
    id: 'Struktur Tim',
    en: 'Team Structure',
  },
  'detail.timeline': {
    id: 'Linimasa Waktu',
    en: 'Project Timeline',
  },
  'detail.access': {
    id: 'Akses Langsung',
    en: 'Direct Access',
  },
  'detail.visitDemo': {
    id: 'Kunjungi Demo',
    en: 'Visit Demo',
  },
  'detail.metricsTitle': {
    id: 'Metrik & Tolok Ukur Kunci',
    en: 'Key Metrics & Benchmarks',
  },
  'detail.galleryTitle': {
    id: 'Galeri Tangkapan Layar & Antarmuka',
    en: 'Screenshot & Interface Gallery',
  },
  'detail.gallerySubtitle': {
    id: 'Eksplorasi seluruh komponen visual, tata letak responsif, dan alur pengalaman pengguna aplikasi.',
    en: 'Explore all visual components, responsive layouts, and user experience flows.',
  },
  'detail.overviewTitle': {
    id: 'Ringkasan Proyek',
    en: 'Project Overview',
  },
  'detail.responsibilities': {
    id: 'Tanggung Jawab Teknis:',
    en: 'Technical Responsibilities:',
  },
  'detail.archBadge': {
    id: 'Arsitektur Sistem',
    en: 'System Architecture',
  },
  'detail.archTitle': {
    id: 'Fondasi & Pendekatan Rekayasa',
    en: 'Foundation & Engineering Approach',
  },
  'detail.archFooter': {
    id: 'Dirancang untuk performa & skalabilitas',
    en: 'Engineered for performance & scalability',
  },
  'detail.caseStudyTitle': {
    id: 'Studi Kasus Rekayasa',
    en: 'Engineering Case Study',
  },
  'detail.problemSolutionTitle': {
    id: 'Identifikasi Masalah & Solusi Arsitektural',
    en: 'Problem Identification & Architectural Solutions',
  },
  'detail.frictionTitle': {
    id: 'Tantangan & Titik Friksi Masalah',
    en: 'Challenges & Problem Friction Points',
  },
  'detail.solutionApproachTitle': {
    id: 'Pendekatan & Solusi Rekayasa',
    en: 'Engineering Solutions & Methodology',
  },
  'detail.challengesEyebrow': {
    id: 'Hambatan Teknis Nyata',
    en: 'Real Engineering Hurdles',
  },
  'detail.challengesTitle': {
    id: 'Tantangan Algoritma & Rekayasa Solusi',
    en: 'Algorithmic Challenges & Solution Engineering',
  },
  'detail.obstacleLabel': {
    id: 'Kendala / Masalah:',
    en: 'Obstacle / Problem:',
  },
  'detail.solutionLabel': {
    id: 'Solusi Implementasi:',
    en: 'Implementation Solution:',
  },
  'detail.resultLabel': {
    id: 'Hasil Terverifikasi:',
    en: 'Verified Outcome:',
  },
  'detail.featuresEyebrow': {
    id: 'Fitur & Kapabilitas',
    en: 'Features & Capabilities',
  },
  'detail.featuresTitle': {
    id: 'Fitur Utama yang Diimplementasikan',
    en: 'Core Implemented Features',
  },
  'detail.techEyebrow': {
    id: 'Tech Stack & Dependency',
    en: 'Tech Stack & Dependencies',
  },
  'detail.techTitle': {
    id: 'Teknologi yang Digunakan & Alasan Pemilihan',
    en: 'Technologies Used & Architectural Rationale',
  },
  'detail.keywords': {
    id: 'Kata Kunci:',
    en: 'Keywords:',
  },
  'detail.learningsTitle': {
    id: 'Pelajaran Teknis Utama (Engineering Takeaways)',
    en: 'Key Engineering Takeaways',
  },
  'detail.exploreOther': {
    id: 'Eksplorasi Proyek Lainnya',
    en: 'Explore Other Projects',
  },
  'detail.allProjects': {
    id: 'Semua Proyek',
    en: 'All Projects',
  },
  'detail.notFound': {
    id: 'Proyek Tidak Ditemukan',
    en: 'Project Not Found',
  },
} as const;

export type TranslationKey = keyof typeof translations;

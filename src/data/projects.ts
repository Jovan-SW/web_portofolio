import { Project } from '@/types';

export const PROJECTS_DATA: Project[] = [
  // ----------------------------------------------------------------------------
  // PROYEK 1: JOVIQUE (E-COMMERCE NEXT.JS)
  // ----------------------------------------------------------------------------
  {
    id: 'proj-jovique-official',
    title: 'Jovique Official Store',
    slug: 'jovique-official-store',
    tagline: 'Platform e-commerce D2C busana kontemporer dengan performa cepat, katalog dinamis, dan checkout terpadu.',
    category: 'Full-Stack',
    subCategories: ['Frontend', 'UI/UX Design'],
    status: 'completed',
    featured: true,
    order: 1,

    timeline: {
      startDate: '2026-09-07',
      endDate: '2026-09-20',
      duration: '2 minggu (14 hari)',
    },
    publishedAt: '2026-09-20T00:00:00Z',
    updatedAt: '2026-09-20T00:00:00Z',

    summary:
      'Platform e-commerce single-brand Direct-to-Consumer (D2C) untuk lini fashion modern yang menghadirkan pengalaman belanja langsung terkurasi, cepat, intuitif, serta mengeliminasi hambatan dalam alur transaksi digital.',
    description:
      'Jovique adalah platform e-commerce single-brand yang dirancang khusus untuk lini fashion modern. Platform ini menghadirkan pengalaman belanja langsung D2C yang terkurasi, cepat, dan intuitif, sekaligus mengeliminasi hambatan dalam alur transaksi digital konvensional.',

    architectureOverview:
      'Arsitektur web modern berbasis Next.js App Router yang mengintegrasikan Server Components untuk render katalog cepat dan optimasi SEO, dipadukan dengan Client Components interaktif untuk pengelolaan keranjang belanja, filter kategori produk, dan pencarian cepat.',
    problemStatement:
      '1. Ketergantungan pada Marketplace Pihak Ketiga: Brand independen sering kehilangan identitas visual eksklusif serta terbebani biaya komisi platform yang memotong margin keuntungan.\n2. Proses Transaksi Manual yang Tidak Efisien: Pembelian konvensional via chat rentan memicu salah pencatatan order, waktu respon lambat, dan verifikasi transfer manual yang memakan waktu.\n3. Tingkat Drop-off Pelanggan yang Tinggi: Alur navigasi yang lambat dan katalog yang membingungkan sering kali membuat calon pembeli batal menyelesaikan checkout.',
    solution:
      '1. Ekosistem Brand Mandiri: Menyajikan antarmuka modern dan minimalis untuk memperkuat posisi brand di mata konsumen tanpa distraksi produk kompetitor.\n2. Otomatisasi Alur Transaksi: Mengintegrasikan alur pemesanan dan checkout terpadu untuk memvalidasi transaksi secara langsung dan memangkas proses rekap manual.\n3. Optimasi Navigasi & Checkout: Menerapkan sistem keranjang belanja interaktif dan katalog dinamis demi mempermudah konversi transaksi dalam hitungan detik.',

    keyLearnings: [
      'Implementasi Next.js App Router dan Server/Client components separation secara optimal.',
      'Pengelolaan keranjang belanja (cart) dan daftar keinginan (wishlist) interaktif pada sisi klien.',
      'Penyusunan arsitektur katalog produk dinamis berbasis filter kategori pakaian dan sistem navigasi responsif.',
    ],

    challenges: [
      {
        title: 'Membangun alur katalog dan keranjang belanja yang cepat dan intuitif',
        problem:
          'Katalog e-commerce sering kali lambat dan membingungkan ketika memuat banyak item pakaian dengan variasi ukuran dan kategori berbeda.',
        solution:
          'Menyusun struktur data produk terstruktur dengan filter kategori dinamis dan komponen mini-cart responsif tanpa interupsi navigasi.',
        result: 'Pengalaman browsing katalog dan penambahan barang ke keranjang berjalan mulus dan instan.',
      },
    ],

    features: [
      {
        title: 'Katalog Produk & Filter Kategori Dinamis',
        description: 'Penyaringan koleksi busana (T-Shirts & Polos, Shirts & Flannels, Jackets, Pants & Denim, Footwear).',
        icon: 'SlidersHorizontal',
      },
      {
        title: 'Pencarian Produk Instan',
        description: 'Pencarian cepat koleksi busana dengan antarmuka input intuitif dan shortcut pencarian.',
        icon: 'Search',
      },
      {
        title: 'Keranjang Belanja (Cart) & Wishlist Interaktif',
        description: 'Sistem keranjang belanja langsung dengan kalkulasi total item dan akses cepat checkout.',
        icon: 'ShoppingBag',
      },
      {
        title: 'Desain Editorial Fashion Modern',
        description: 'Tata letak responsif bertema dark/navy elegan yang menonjolkan visual produk fashion berkelas.',
        icon: 'Sparkles',
      },
    ],

    techStack: [
      {
        name: 'Next.js',
        category: 'frontend',
        icon: 'SiNextdotjs',
        version: '15.x',
        purpose: 'App Router, Server Components & Routing Web Aplikasi',
        isPrimary: true,
      },
      {
        name: 'React',
        category: 'frontend',
        icon: 'SiReact',
        version: '19.x',
        purpose: 'Library antarmuka UI komponen deklaratif dan interaktif',
        isPrimary: true,
      },
      {
        name: 'TypeScript',
        category: 'frontend',
        icon: 'SiTypescript',
        purpose: 'Type safety ketat pada model data produk dan keranjang belanja',
        isPrimary: true,
      },
      {
        name: 'Tailwind CSS',
        category: 'styling',
        icon: 'SiTailwindcss',
        purpose: 'Utility styling modern dengan desain responsif mobile-first',
        isPrimary: true,
      },
      {
        name: 'Supabase',
        category: 'database',
        icon: 'SiSupabase',
        purpose: 'Backend database, manajemen data produk/katalog, dan persistensi data',
        isPrimary: true,
      },
      {
        name: 'Vercel',
        category: 'cloud',
        icon: 'SiVercel',
        purpose: 'Platform deployment dan hosting cloud',
      },
    ],
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'E-Commerce', 'D2C', 'Vercel'],

    links: {
      demo: 'https://jovique-official.vercel.app',
      repository: {
        url: 'https://github.com/Jovan-SW/web_ecomerce',
        provider: 'github',
        isPrivate: false,
      },
      caseStudy: '/projects/jovique-official-store',
    },

    media: {
      thumbnail: {
        url: '/projects/jovique/thumbnail.png',
        alt: 'Jovique Official Store - Halaman Utama & Hero Banner Fashion Editorial',
      },
      banner: {
        url: '/projects/jovique/thumbnail.png',
        alt: 'Jovique Official Store Showcase Banner',
      },
      gallery: [
        {
          id: 'jovique-thumb',
          type: 'image',
          url: '/projects/jovique/thumbnail.png',
          alt: 'Halaman Beranda Utama Jovique Official Store',
          caption: 'Tampilan beranda utama dengan estetika editorial fashion modern.',
        },
        {
          id: 'jovique-product-page',
          type: 'image',
          url: '/projects/jovique/product-page.png',
          alt: 'Halaman Katalog Koleksi Produk Jovique',
          caption: 'Katalog busana terkurasi lengkap dengan filter kategori dinamis.',
        },
        {
          id: 'jovique-product-detail',
          type: 'image',
          url: '/projects/jovique/product-detail.png',
          alt: 'Halaman Detail Produk Busana Lengkap',
          caption: 'Detail spesifikasi material, pemilihan ukuran, dan opsi pembelian.',
        },
        {
          id: 'jovique-payment-gateway',
          type: 'image',
          url: '/projects/jovique/payment-gateway.png',
          alt: 'Alur Pembayaran dan Checkout Terpadu',
          caption: 'Integrasi sistem checkout instan untuk memvalidasi transaksi digital.',
        },
        {
          id: 'jovique-success-payment',
          type: 'image',
          url: '/projects/jovique/success-payment.png',
          alt: 'Konfirmasi Transaksi Pembayaran Berhasil',
          caption: 'Notifikasi konfirmasi pesanan dan detail invoice pembelian.',
        },
      ],
    },

    role: 'Solo Full-Stack Engineer',
    responsibilities: [
      'Merancang dan membangun seluruh antarmuka web e-commerce D2C dari awal menggunakan Next.js',
      'Mengembangkan sistem keranjang belanja interaktif, katalog kategori produk, dan alur checkout',
      'Menyusun struktur styling responsif yang optimal untuk perangkat mobile maupun desktop',
      'Mengelola deployment aplikasi di Vercel',
    ],
    teamSize: 'Solo Creator',

    metrics: [
      {
        label: 'Durasi Pengembangan',
        value: '14 Hari',
        description: 'Dikerjakan intensif dari 7 September hingga 20 September 2026',
        trend: 'neutral',
      },
      {
        label: 'Arsitektur Platform',
        value: 'Next.js App Router',
        description: 'Render cepat dengan pemisahan Server & Client Components',
        trend: 'up',
      },
      {
        label: 'Model Bisnis',
        value: 'D2C Mandiri',
        description: 'Eliminasi biaya komisi pihak ketiga dengan toko online independen',
        trend: 'up',
      },
    ],

    seo: {
      metaTitle: 'Jovique Official Store | Case Study E-Commerce Next.js',
      metaDescription:
        'Studi kasus pembuatan platform e-commerce busana D2C berbasis Next.js dan Tailwind CSS oleh Jovan Sebastian William.',
      keywords: ['Next.js E-Commerce', 'Jovique', 'D2C Fashion Store', 'TypeScript', 'Tailwind CSS'],
    },
  },

  // ----------------------------------------------------------------------------
  // PROYEK 2: REVLUME (MOVIE EXPLORER REACT + TMDB)
  // ----------------------------------------------------------------------------
  {
    id: 'proj-revlume-movies',
    title: 'RevLume - Interactive Movie Discovery',
    slug: 'revlume-movie-explorer',
    tagline: 'Platform web penjelajah film interaktif berbasis React dengan integrasi real-time TMDB API.',
    category: 'Fullstack',
    subCategories: ['Frontend', 'UI/UX Design'],
    status: 'completed',
    featured: true,
    order: 2,

    timeline: {
      startDate: '2026-08-24',
      endDate: '2026-09-06',
      duration: '2 minggu (14 hari)',
    },
    publishedAt: '2026-09-06T00:00:00Z',
    updatedAt: '2026-09-06T00:00:00Z',

    summary:
      'Platform web penjelajah film interaktif berbasis React yang dirancang untuk mempermudah pencarian dan kurasi tontonan melalui integrasi arsitektur TMDB API, navigasi ribuan judul film global, tren terbaru, dan antarmuka responsif.',
    description:
      'Revlume adalah platform web penjelajah film interaktif berbasis React yang dirancang untuk mempermudah pencarian dan kurasi tontonan. Terintegrasi dengan arsitektur TMDB API, platform ini memungkinkan pengguna menavigasi ribuan judul film global, memantau tren rilis terbaru, serta melakukan pencarian terarah melalui antarmuka yang cepat, modern, dan responsif.',

    architectureOverview:
      'Aplikasi Single Page Application (SPA) berbasis React yang berkomunikasi langsung dengan TMDB API untuk mengambil metadata film secara real-time, didukung manajemen state reaktif untuk pencarian dan filter tanpa reload halaman.',
    problemStatement:
      '1. Fenomena Decision Fatigue: Melimpahnya judul film di berbagai layanan streaming sering membuat pengguna bingung menentukan tontonan tanpa adanya referensi informasi yang terpusat dan terstruktur.\n2. Pencarian dan Filter yang Kaku: Banyak portal informasi film memiliki mekanisme penyaringan yang lambat, memicu reload halaman berulang, dan menyulitkan eksplorasi lintas parameter.\n3. Fragmentasi Informasi Film: Pengguna kerap harus berpindah antar situs hanya untuk membaca sinopsis, memeriksa rating kritikus, mengecek jajaran pemeran, dan melihat kategori genre.',
    solution:
      '1. Sistem Pencarian & Filter Dinamis: Mengimplementasikan pencarian cepat dan filter multi-kriteria (berdasarkan genre, popularitas, tahun rilis, dan rating) secara mulus tanpa interupsi alur navigasi.\n2. Integrasi Real-Time TMDB: Menghubungkan aplikasi langsung ke database TMDB untuk menyajikan metadata ribuan film terkini, daftar film populer, serta tren yang selalu diperbarui.\n3. Desain Berstandar Platform Hiburan Modern: Menghadirkan antarmuka visual yang mengutamakan kenyamanan eksplorasi (visual hierarchy jelas, tata letak poster adaptif, dan konsumsi informasi ringkas di desktop maupun mobile).',

    keyLearnings: [
      'Integrasi REST API pihak ketiga (TMDB API) dengan penanganan asinkron yang efisien.',
      'Pengelolaan state dinamis pada filter multi-parameter film (genre, rating, tahun, popularitas).',
      'Implementasi tema tampilan adaptif (Dark/Light mode) dengan persistensi browser storage.',
    ],

    challenges: [
      {
        title: 'Menyajikan ribuan metadata film tanpa membebani navigasi pengguna',
        problem:
          'Mengambil dan menampilkan banyak data poster dan informasi film berpotensi menimbulkan lag jika render komponen tidak efisien.',
        solution:
          'Menerapkan struktur komponen modular React dengan alur pengambilan data yang teroptimasi dan layout grid poster responsif.',
        result: 'Eksplorasi ribuan judul film berjalan cepat dan nyaman di semua resolusi layar.',
      },
    ],

    features: [
      {
        title: 'Integrasi Real-Time TMDB API',
        description: 'Sinkronisasi langsung dengan ribuan database film global untuk menyajikan judul terbaru dan terpopuler.',
        icon: 'Film',
      },
      {
        title: 'Sistem Pencarian & Filter Cepat',
        description: 'Pencarian langsung dan penyaringan berdasarkan genre, popularitas, dan rating tanpa jeda.',
        icon: 'Search',
      },
      {
        title: 'Theme Switcher (Dark & Light Mode)',
        description: 'Dukungan mode gelap yang nyaman untuk eksplorasi malam hari dan mode terang yang jernih.',
        icon: 'Moon',
      },
      {
        title: 'Detail Informasi Film Lengkap',
        description: 'Menyajikan sinopsis, rating, poster resolusi tinggi, dan informasi rilis dalam kartu yang rapi.',
        icon: 'Sparkles',
      },
    ],

    techStack: [
      {
        name: 'React',
        category: 'frontend',
        icon: 'SiReact',
        version: '18.x',
        purpose: 'Library utama antarmuka pengguna berbasis komponen SPA',
        isPrimary: true,
      },
      {
        name: 'TMDB API',
        category: 'backend',
        icon: 'SiThemoviedatabase',
        purpose: 'Integrasi database film, rating, sinopsis, dan poster film',
        isPrimary: true,
      },
      {
        name: 'JavaScript / ES6+',
        category: 'frontend',
        icon: 'SiJavascript',
        purpose: 'Logika data fetching, filtering, dan manipulasi state',
        isPrimary: true,
      },
      {
        name: 'CSS3 Modern',
        category: 'styling',
        icon: 'SiCss3',
        purpose: 'Styling tata letak responsif dan variabel warna tema dark/light',
        isPrimary: true,
      },
      {
        name: 'Supabase',
        category: 'database',
        icon: 'SiSupabase',
        purpose: 'Backend database untuk penyimpanan watchlist film dan preferensi pengguna',
        isPrimary: true,
      },
      {
        name: 'Vercel',
        category: 'cloud',
        icon: 'SiVercel',
        purpose: 'Platform deployment dan hosting',
      },
    ],
    tags: ['React', 'Supabase', 'TMDB API', 'JavaScript', 'Movie Explorer', 'SPA', 'Vercel'],

    links: {
      demo: 'https://revlume.vercel.app',
      repository: {
        url: 'https://github.com/Jovan-SW/movieApp-api',
        provider: 'github',
        isPrivate: false,
      },
      caseStudy: '/projects/revlume-movie-explorer',
    },

    media: {
      thumbnail: {
        url: '/projects/revlume/thumbnail.png',
        alt: 'RevLume - Halaman Beranda Penjelajah Film Interaktif',
      },
      banner: {
        url: '/projects/revlume/thumbnail.png',
        alt: 'RevLume Cinematic Banner',
      },
      gallery: [
        {
          id: 'revlume-thumb',
          type: 'image',
          url: '/projects/revlume/thumbnail.png',
          alt: 'Halaman Utama RevLume Movie Explorer',
          caption: 'Beranda sinematik menampilkan kurasi film populer dan tren bioskop.',
        },
        {
          id: 'revlume-explore',
          type: 'image',
          url: '/projects/revlume/movies-explore.png',
          alt: 'Eksplorasi dan Filter Film Multi-Parameter',
          caption: 'Pencarian cepat dan filter film berdasarkan genre, rating, dan popularitas.',
        },
        {
          id: 'revlume-detail',
          type: 'image',
          url: '/projects/revlume/movie-detail.png',
          alt: 'Detail Informasi Film Lengkap',
          caption: 'Sinopsis mendalam, rating kritikus, durasi, dan daftar pemeran film.',
        },
        {
          id: 'revlume-watchlist',
          type: 'image',
          url: '/projects/revlume/watchlist.png',
          alt: 'Daftar Tontonan (Watchlist) Tersimpan',
          caption: 'Koleksi film tersimpan yang terhubung dengan database Supabase.',
        },
      ],
    },

    role: 'Solo Full-Stack Engineer',
    responsibilities: [
      'Membangun seluruh antarmuka aplikasi Single Page App (SPA) dari nol menggunakan React',
      'Mengintegrasikan API publik TMDB untuk mengambil data trending, pencarian, dan genre',
      'Mengimplementasikan fitur filter multi-parameter serta sistem tema gelap/terang',
      'Melakukan deployment dan continuous delivery ke Vercel',
    ],
    teamSize: 'Solo Creator',

    metrics: [
      {
        label: 'Durasi Pengembangan',
        value: '14 Hari',
        description: 'Dikerjakan intensif dari 24 Agustus hingga 6 September 2026',
        trend: 'neutral',
      },
      {
        label: 'Integrasi Data',
        value: 'TMDB API Real-Time',
        description: 'Akses langsung ke ribuan judul film dan metadata global',
        trend: 'up',
      },
      {
        label: 'Mode Tampilan',
        value: 'Dark & Light Mode',
        description: 'Dukungan tema adaptif dengan persistensi preferensi pengguna',
        trend: 'up',
      },
    ],

    seo: {
      metaTitle: 'RevLume - Movie Discovery Platform | Portfolio Case Study',
      metaDescription:
        'Studi kasus pembuatan aplikasi penjelajah film interaktif berbasis React dan TMDB API oleh Jovan Sebastian William.',
      keywords: ['RevLume', 'React Movie App', 'TMDB API', 'Full-Stack Portfolio', 'JavaScript'],
    },
  },

  // ----------------------------------------------------------------------------
  // PROYEK 3: BARBER'O (BARBERSHOP CATALOG & RESERVATION)
  // ----------------------------------------------------------------------------
  {
    id: 'proj-barber-o',
    title: "Barber'O - Modern Barbershop & Reservation",
    slug: 'barber-o-barbershop-platform',
    tagline: 'Platform katalog layanan dan reservasi barbershop modern dengan arsitektur web murni berkecepatan tinggi.',
    category: 'Frontend',
    subCategories: ['Full-Stack', 'UI/UX Design'],
    status: 'completed',
    featured: true,
    order: 3,

    timeline: {
      startDate: '2026-07-12',
      endDate: '2026-07-19',
      duration: '1 minggu (7 hari)',
    },
    publishedAt: '2026-07-19T00:00:00Z',
    updatedAt: '2026-07-19T00:00:00Z',

    summary:
      'Platform web katalog layanan dan reservasi barbershop modern yang dibangun menggunakan fondasi web standar (HTML5, CSS3, dan Vanilla JavaScript) untuk mendigitalkan operasional barbershop konvensional.',
    description:
      "Barber O adalah platform web katalog layanan dan reservasi barbershop modern yang dibangun menggunakan fondasi web standar (HTML5, CSS3, dan Vanilla JavaScript). Platform ini dirancang untuk mendigitalkan operasional barbershop konvensional melalui penyediaan etalase gaya rambut terkurasi, profil kapster profesional, serta formulir reservasi jadwal terpadu yang cepat dan mudah diakses pelanggan.",

    architectureOverview:
      'Arsitektur web murni tanpa dependency eksternal berat (Vanilla Web Standard Architecture). Menggunakan manipulasi DOM berbasis JavaScript ES6+ untuk validasi form reservasi di sisi klien, dipadukan dengan layout CSS Flexbox/Grid responsif.',
    problemStatement:
      '1. Ketidakpastian Waktu Antre (Walk-in Queuing): Sistem antrean konvensional sering menimbulkan penumpukan pelanggan di lokasi tanpa kejelasan estimasi giliran pangkas.\n2. Miskomunikasi Model Potongan Rambut: Pelanggan kerap kesulitan mendeskripsikan preferensi potongan secara presisi, sementara barbershop belum memiliki katalog visual yang terstruktur.\n3. Ketiadaan Pilihan Barber Spesifik: Pelanggan kesulitan memastikan apakah kapster langganan mereka sedang bertugas, berisiko mendapatkan hasil potongan yang kurang konsisten.\n4. Pencatatan Jadwal Manual yang Rawan Bentrok: Mengatur janji temu lewat pesan instan sering memicu jadwal tumpang tindih (double booking) dan menyita waktu operasional staf.',
    solution:
      '1. Formulir Reservasi Interaktif & Tervalidasi: Menyediakan sistem pemesanan berbasis JavaScript DOM dengan validasi data langsung untuk pemilihan tanggal, jam kunjungan, dan paket servis secara akurat.\n2. Katalog Gaya Rambut & Transparansi Layanan: Menghadirkan galeri model potongan rambut terkini lengkap dengan rincian tarif transparan guna memudahkan pelanggan menentukan gaya sebelum datang.\n3. Profil dan Portofolio Kapster: Menampilkan daftar staf kapster beserta spesialisasi masing-masing sehingga pelanggan leluasa memilih penata rambut sesuai preferensi.\n4. Performa Ringan Tanpa Overhead Framework: Dibangun dengan arsitektur web murni tanpa dependency eksternal yang berat, memastikan waktu muat halaman instan di semua jenis perangkat dan peramban.',

    keyLearnings: [
      'Pemanfaatan Web Standards murni (HTML5, CSS3, Vanilla JS) untuk performa loading instan.',
      'Membangun sistem validasi formulir interaktif di sisi klien menggunakan JavaScript DOM API.',
      'Penyusunan struktur tata letak CSS modular yang bersih, terstruktur, dan responsif.',
    ],

    challenges: [
      {
        title: 'Membangun alur booking jadwal yang tervalidasi langsung tanpa bantuan library',
        problem:
          'Pengisian form reservasi yang tidak lengkap atau format salah dapat menimbulkan bentrok jadwal pemesanan antar pelanggan.',
        solution:
          'Menerapkan skrip validasi JavaScript murni yang mengecek kelengkapan nama, nomor telepon, tanggal, dan paket servis sebelum menampilkan konfirmasi pemesanan.',
        result: 'Data pemesanan tersaring akurat dengan feedback langsung ke pengguna.',
      },
    ],

    features: [
      {
        title: 'Formulir Reservasi Jadwal Interaktif',
        description: 'Sistem pemesanan tanggal, jam kunjungan, dan paket servis yang tervalidasi langsung.',
        icon: 'CalendarCheck',
      },
      {
        title: 'Katalog Layanan & Transparansi Tarif',
        description: 'Etalase paket potongan rambut (Classic Cut, Junior Cut, Scalp Treatment, dll) dengan harga transparan.',
        icon: 'Scissors',
      },
      {
        title: 'Profil & Portofolio Kapster',
        description: 'Daftar penata rambut profesional beserta keahlian spesialisasi masing-masing.',
        icon: 'Users',
      },
      {
        title: 'Performa Ringan Tanpa Framework Overhead',
        description: 'Waktu muat halaman seketika berkat arsitektur web standar tanpa library eksternal yang berat.',
        icon: 'Zap',
      },
    ],

    techStack: [
      {
        name: 'HTML5',
        category: 'frontend',
        icon: 'SiHtml5',
        purpose: 'Struktur semantik dokumen web dan formulir booking',
        isPrimary: true,
      },
      {
        name: 'CSS3',
        category: 'styling',
        icon: 'SiCss3',
        purpose: 'Tata letak responsif dengan Flexbox/Grid, tipografi, dan styling estetis',
        isPrimary: true,
      },
      {
        name: 'Vanilla JavaScript',
        category: 'frontend',
        icon: 'SiJavascript',
        version: 'ES6+',
        purpose: 'Validasi form reservasi, manipulasi DOM, dan modal interaktif',
        isPrimary: true,
      },
      {
        name: 'Vercel',
        category: 'cloud',
        icon: 'SiVercel',
        purpose: 'Platform deployment dan hosting web',
      },
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Vanilla JS', 'Barbershop', 'Reservation', 'Vercel'],

    links: {
      demo: 'https://barber-o.vercel.app',
      repository: {
        url: 'https://github.com/Jovan-SW/website_barbershop',
        provider: 'github',
        isPrivate: false,
      },
      caseStudy: '/projects/barber-o-barbershop-platform',
    },

    media: {
      thumbnail: {
        url: '/projects/barber-o/thumbnail.png',
        alt: "Barber'O - Halaman Utama dan Etalase Layanan Barbershop",
      },
      banner: {
        url: '/projects/barber-o/thumbnail.png',
        alt: "Barber'O Showcase Banner",
      },
      gallery: [
        {
          id: 'barbero-thumb',
          type: 'image',
          url: '/projects/barber-o/thumbnail.png',
          alt: "Halaman Utama Barber'O Groomed to Perfection",
          caption: 'Beranda berkonsep vintage modern dengan etalase layanan premium.',
        },
        {
          id: 'barbero-booking',
          type: 'image',
          url: '/projects/barber-o/booking-form.png',
          alt: 'Formulir Reservasi Jadwal Interaktif',
          caption: 'Formulir booking jadwal pangkas dengan validasi tanggal dan jam kunjungan.',
        },
        {
          id: 'barbero-login',
          type: 'image',
          url: '/projects/barber-o/login.png',
          alt: 'Halaman Login Pengguna & Staf',
          caption: 'Antarmuka masuk untuk mengelola riwayat janji temu dan operasional.',
        },
        {
          id: 'barbero-success',
          type: 'image',
          url: '/projects/barber-o/success.png',
          alt: 'Modal Konfirmasi Reservasi Sukses',
          caption: 'Pop-up konfirmasi langsung bahwa reservasi telah berhasil tercatat.',
        },
      ],
    },

    role: 'Solo Full-Stack Engineer',
    responsibilities: [
      'Merancang arsitektur web murni menggunakan HTML5, CSS3, dan Vanilla JavaScript',
      'Mengembangkan formulir reservasi online terpadu dengan validasi data di sisi klien',
      'Mendesain tata letak etalase layanan, profil kapster, dan responsivitas mobile',
      'Mengonfigurasi deployment dan hosting di Vercel',
    ],
    teamSize: 'Solo Creator',

    metrics: [
      {
        label: 'Durasi Pengembangan',
        value: '7 Hari',
        description: 'Dikerjakan intensif dari 12 Juli hingga 19 Juli 2026',
        trend: 'neutral',
      },
      {
        label: 'Arsitektur Web',
        value: 'Vanilla Web Standard',
        description: 'Dibangun murni dengan HTML5, CSS3, dan JavaScript tanpa framework berat',
        trend: 'up',
      },
      {
        label: 'Kecepatan Muat',
        value: 'Loading Instan',
        description: 'Zero runtime overhead untuk kenyamanan akses di semua perangkat',
        trend: 'up',
      },
    ],

    seo: {
      metaTitle: "Barber'O - Modern Barbershop & Reservation Platform | Case Study",
      metaDescription:
        "Studi kasus implementasi platform reservasi barbershop modern berarsitektur web standar oleh Jovan Sebastian William.",
      keywords: ["Barber'O", 'Vanilla JavaScript', 'HTML5 CSS3', 'Barbershop Reservation', 'Web Portfolio'],
    },
  },
];

/**
 * Helper function: Ambil semua proyek yang di-featured untuk landing page
 */
export function getFeaturedProjects(): Project[] {
  return PROJECTS_DATA.filter((project) => project.featured).sort(
    (a, b) => (a.order ?? 99) - (b.order ?? 99)
  );
}

/**
 * Helper function: Ambil proyek berdasarkan slug URL
 */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS_DATA.find((project) => project.slug === slug);
}

/**
 * Helper function: Ambil daftar seluruh kategori yang ada
 */
export function getAllProjectCategories(): string[] {
  const categories = new Set(PROJECTS_DATA.map((p) => p.category));
  return ['All', ...Array.from(categories)];
}

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

// ----------------------------------------------------------------------------
// ENGLISH TRANSLATIONS & OVERRIDES FOR ALL PROJECTS
// ----------------------------------------------------------------------------
export const PROJECTS_DATA_EN: Record<string, Partial<Project>> = {
  'proj-jovique-official': {
    tagline: 'Contemporary D2C fashion e-commerce platform with fast performance, dynamic catalog, and unified checkout.',
    category: 'Full-Stack',
    summary: 'Direct-to-Consumer (D2C) single-brand fashion e-commerce platform delivering a curated, fast, intuitive shopping experience while eliminating digital checkout friction.',
    description: 'Jovique is a single-brand e-commerce platform engineered specifically for modern fashion labels. It delivers an intuitive, fast D2C shopping experience, eliminating friction in conventional digital transaction workflows.',
    architectureOverview: 'Modern web architecture powered by Next.js App Router integrating Server Components for rapid catalog rendering and SEO optimization, coupled with interactive Client Components for cart state, category filtering, and instant search.',
    problemStatement: '1. Dependency on Third-Party Marketplaces: Independent brands often forfeit exclusive visual identity and pay heavy platform commissions that erode profit margins.\n2. Inefficient Manual Transactions: Traditional chat-based orders lead to recording errors, sluggish response times, and tedious manual payment verification.\n3. High Cart Abandonment Rates: Slow navigation and cluttered catalogs frequently cause prospective buyers to drop out before completing checkout.',
    solution: '1. Autonomous Brand Ecosystem: Delivers a sleek, minimalist interface to elevate brand prestige without competitor distractions.\n2. Automated Transaction Pipeline: Implements unified ordering and checkout to validate purchases instantly and eliminate manual reconciliation.\n3. Streamlined Navigation & Checkout: Deploys an interactive shopping cart and dynamic catalog to complete purchase conversions within seconds.',
    responsibilities: [
      'Architecting full-stack Next.js App Router with Server & Client components separation.',
      'Designing high-performance product catalog with dynamic multi-attribute filtering.',
      'Developing interactive client-side cart and wishlist state management.',
      'Optimizing Core Web Vitals and image delivery pipelines.',
    ],
    keyLearnings: [
      'Optimal implementation of Next.js App Router with Server/Client component separation.',
      'Interactive client-side shopping cart and wishlist state management.',
      'Dynamic product catalog architecture with clothing category filters and responsive navigation.',
    ],
    challenges: [
      {
        title: 'Building an instant, intuitive catalog and checkout workflow',
        problem: 'E-commerce catalogs often lag and confuse users when loading numerous apparel items with varying sizes and categories.',
        solution: 'Structured product schema with dynamic category filters and responsive mini-cart component without navigation interruptions.',
        result: 'Seamless, instantaneous catalog browsing and cart additions.',
      },
    ],
    features: [
      {
        title: 'Dynamic Product Catalog & Category Filters',
        description: 'Filtering apparel collections (T-Shirts & Polos, Shirts & Flannels, Jackets, Pants & Denim, Footwear).',
        icon: 'SlidersHorizontal',
      },
      {
        title: 'Instant Product Search',
        description: 'Rapid search across fashion collections with an intuitive keyboard shortcut input.',
        icon: 'Search',
      },
      {
        title: 'Interactive Cart & Wishlist',
        description: 'Real-time cart management with item count tallying and streamlined checkout access.',
        icon: 'ShoppingBag',
      },
      {
        title: 'Modern Editorial Fashion Layout',
        description: 'Responsive dark/navy aesthetic accentuating luxury fashion imagery.',
        icon: 'Sparkles',
      },
    ],
    metrics: [
      {
        label: 'Development Time',
        value: '14 Days',
        description: 'Engineering sprint completed within two weeks',
        trend: 'neutral',
      },
      {
        label: 'Architecture Format',
        value: 'D2C Storefront',
        description: 'Single-brand direct sales model without marketplace intermediaries',
        trend: 'up',
      },
      {
        label: 'Core Components',
        value: '15+ UI Modules',
        description: 'Modular reusable UI component system',
        trend: 'up',
      },
    ],
    timeline: {
      startDate: '2026-09-07',
      endDate: '2026-09-20',
      duration: '2 weeks (14 days)',
    },
    techStack: [
      {
        name: 'Next.js',
        category: 'frontend',
        icon: 'SiNextdotjs',
        version: '15.x',
        purpose: 'App Router, Server Components & Web Application Routing',
        isPrimary: true,
      },
      {
        name: 'React',
        category: 'frontend',
        icon: 'SiReact',
        version: '19.x',
        purpose: 'Declarative component-driven user interface library',
        isPrimary: true,
      },
      {
        name: 'TypeScript',
        category: 'frontend',
        icon: 'SiTypescript',
        purpose: 'Strict static type safety across product models and cart state',
        isPrimary: true,
      },
      {
        name: 'Tailwind CSS',
        category: 'styling',
        icon: 'SiTailwindcss',
        purpose: 'Custom utility-first dark editorial theme styling',
        isPrimary: true,
      },
      {
        name: 'Lucide Icons',
        category: 'frontend',
        purpose: 'Consistent, modern UI iconography across navigation and carts',
        isPrimary: false,
      },
    ],
  },

  'proj-revlume-movies': {
    tagline: 'Interactive movie discovery web application with TMDB API integration, instant search, and real-time movie curation.',
    category: 'Frontend',
    role: 'Solo Frontend / API Engineer',
    summary: 'Interactive movie discovery platform built with React, connecting directly to TMDB API to explore thousands of global titles, trending releases, and detailed cinematic metadata.',
    description: 'RevLume is an interactive movie discovery platform engineered with React, designed to streamline film browsing and curation. Integrated with TMDB API, the platform enables users to navigate thousands of international titles, monitor recent release trends, and conduct targeted queries through a fast, modern, and responsive UI.',
    architectureOverview: 'React Single Page Application (SPA) communicating directly with TMDB API to fetch real-time film metadata, supported by reactive state management for instant filtering without page reloads.',
    problemStatement: '1. Fragmented Cinematic Information: Film enthusiasts struggle to find comprehensive metadata, trailers, and ratings across scattered websites.\n2. Sluggish Discovery Interfaces: Many movie sites suffer from heavy page reloads that interrupt discovery.\n3. Cluttered Browsing Experience: Lack of curated trending categories makes discovering new releases tedious.',
    solution: '1. Unified Metadata Hub: Aggregates global movie database, cast details, release dates, and ratings into a cohesive interface.\n2. Reactive Instant Search: Implements debounce filtering for instantaneous search results without reload delays.\n3. Modern Curated Feeds: Features categorized rails for trending, top-rated, and now-playing cinema.',
    responsibilities: [
      'Architecting React client architecture with TMDB REST API integration.',
      'Developing responsive search input with debounced query optimization.',
      'Building responsive modal viewports for movie trailers and detailed synopsis.',
      'Configuring reactive category toggles and smooth carousel rails.',
    ],
    keyLearnings: [
      'Efficient third-party REST API consumption with TMDB metadata structures.',
      'Asynchronous state management and query debouncing for instant search.',
      'Interactive modal routing and media embed handling in React.',
    ],
    challenges: [
      {
        title: 'Handling API rate limits and seamless search debouncing',
        problem: 'Rapid user keystrokes in the search bar can trigger excessive API calls and UI stutter.',
        solution: 'Implemented debounced query hooks to batch keystrokes and cache recurring results.',
        result: 'Fluid real-time search with zero UI lag and minimal network overhead.',
      },
    ],
    features: [
      {
        title: 'Dynamic TMDB Integration',
        description: 'Direct live connection to TMDB API for thousands of movie titles, synopses, and ratings.',
        icon: 'Film',
      },
      {
        title: 'Instant Live Search',
        description: 'Fast movie lookup with debounced search query and immediate suggestion view.',
        icon: 'Search',
      },
      {
        title: 'Curated Categorical Rails',
        description: 'Organized rails for Now Playing, Top Rated, and Trending Releases.',
        icon: 'Bookmark',
      },
      {
        title: 'Detailed Cinematic Modal',
        description: 'In-depth views featuring high-res backdrops, release timelines, and genre tags.',
        icon: 'Sparkles',
      },
    ],
    metrics: [
      {
        label: 'Development Time',
        value: '14 Days',
        description: 'Rapid iterative development lifecycle',
        trend: 'neutral',
      },
      {
        label: 'Data Integration',
        value: 'Real TMDB API',
        description: 'Direct REST API integration with real-time cinema endpoints',
        trend: 'up',
      },
      {
        label: 'Catalog Coverage',
        value: 'Thousands of Titles',
        description: 'Broad international cinematic database coverage',
        trend: 'up',
      },
    ],
    timeline: {
      startDate: '2026-08-01',
      endDate: '2026-08-15',
      duration: '2 weeks (14 days)',
    },
    techStack: [
      {
        name: 'React',
        category: 'frontend',
        icon: 'SiReact',
        version: '18.x',
        purpose: 'SPA component architecture and reactive UI lifecycle',
        isPrimary: true,
      },
      {
        name: 'TMDB API',
        category: 'backend',
        purpose: 'Third-party REST API source for real-time global movie metadata',
        isPrimary: true,
      },
      {
        name: 'JavaScript (ES6+)',
        category: 'frontend',
        icon: 'SiJavascript',
        purpose: 'Asynchronous fetch pipelines, promises, and dynamic array transforms',
        isPrimary: true,
      },
      {
        name: 'Tailwind CSS',
        category: 'styling',
        icon: 'SiTailwindcss',
        purpose: 'Fluid dark cinematic user interface design',
        isPrimary: true,
      },
    ],
  },

  'proj-barber-o': {
    tagline: 'Premium barbershop digital reservation platform with service selection, barber master booking, and time slot scheduling.',
    category: 'Frontend',
    role: 'Solo Frontend Engineer',
    summary: 'Exclusive digital booking platform for luxury barbershops offering personalized haircut selections, master barber booking, and automated reservation management.',
    description: 'Barber-O is a dedicated digital booking platform designed for luxury modern barbershops. It simplifies appointment reservations with intuitive service selection, master barber availability schedules, and direct booking confirmation.',
    architectureOverview: 'Modern frontend web application featuring responsive service catalogs, interactive schedule selection, and structured client-side booking confirmation state.',
    problemStatement: '1. Booking Friction & Overlapping Appointments: Manual phone and chat bookings frequently cause scheduling conflicts and missed appointments.\n2. Lack of Service Clarity: Customers cannot easily browse haircut tiers, add-on treatments, and pricing upfront.\n3. Barber Selection Inconvenience: Difficulty booking specific master barbers based on their exact daily shift availability.',
    solution: '1. Automated Time-Slot Scheduling: Displays real-time available time slots to completely prevent double-booking.\n2. Transparent Service Menu: Comprehensive catalog detailing grooming packages, treatment duration, and transparent pricing.\n3. Master Barber Profiles: Allows clients to select their preferred barber and verify schedule availability instantly.',
    responsibilities: [
      'Developing interactive reservation interface with service and barber selection logic.',
      'Designing high-contrast luxury dark-gold visual design system.',
      'Implementing client-side validation for booking forms and contact details.',
      'Creating responsive mobile-first booking steps with instant confirmation.',
    ],
    keyLearnings: [
      'Designing multi-step reservation flows with persistent form state.',
      'Managing complex scheduling constraints and appointment slot validation.',
      'Crafting luxury-themed dark aesthetics with high-contrast accessibility.',
    ],
    challenges: [
      {
        title: 'Preventing time slot booking collisions and maintaining state',
        problem: 'Managing dynamic slot availability across different barbers without confusing the user.',
        solution: 'Built reactive slot generator that filters occupied hours based on selected barber and service duration.',
        result: 'Frictionless booking experience completed in under 60 seconds.',
      },
    ],
    features: [
      {
        title: 'Barber Selection & Profile',
        description: 'Choose specific master barbers with transparent portfolio and specialty details.',
        icon: 'Scissors',
      },
      {
        title: 'Interactive Schedule Picker',
        description: 'Intuitive date and hourly time slot selector with real-time availability indicator.',
        icon: 'CalendarCheck',
      },
      {
        title: 'Tiered Grooming Services',
        description: 'Detailed service packages including classic cuts, beard grooming, and hot towel treatments.',
        icon: 'Users',
      },
      {
        title: 'Automated Confirmation Slip',
        description: 'Instant digital reservation receipt with booking reference and schedule summary.',
        icon: 'Sparkles',
      },
    ],
    metrics: [
      {
        label: 'Booking Duration',
        value: '< 1 Minute',
        description: 'Booking completed in under 60 seconds',
        trend: 'down',
      },
      {
        label: 'Schedule Efficiency',
        value: '100% Conflict-Free',
        description: 'Prevents double-booking conflicts',
        trend: 'up',
      },
      {
        label: 'User Satisfaction',
        value: 'High',
        description: 'Intuitive and elegant interface reviews',
        trend: 'up',
      },
    ],
    timeline: {
      startDate: '2026-07-10',
      endDate: '2026-07-24',
      duration: '2 weeks (14 days)',
    },
    techStack: [
      {
        name: 'Vanilla JavaScript',
        category: 'frontend',
        icon: 'SiJavascript',
        purpose: 'Event-driven DOM interactions, form validations, and booking calculations',
        isPrimary: true,
      },
      {
        name: 'HTML5 Semantic',
        category: 'frontend',
        icon: 'SiHtml5',
        purpose: 'Accessible semantic structure and booking form fields',
        isPrimary: true,
      },
      {
        name: 'CSS3 Custom Properties',
        category: 'styling',
        icon: 'SiCss3',
        purpose: 'Luxury dark-gold theme tokens, glassmorphic panels, and responsive grid layouts',
        isPrimary: true,
      },
    ],
  },
};

/**
 * Helper function: Ambil proyek dengan teks yang sudah dilokalisasi (ID / EN)
 */
export function getLocalizedProject(project: Project, lang: 'id' | 'en'): Project {
  if (lang === 'id') return project;
  const enOverride = PROJECTS_DATA_EN[project.id];
  if (!enOverride) return project;
  return {
    ...project,
    ...enOverride,
    timeline: {
      ...project.timeline,
      ...(enOverride.timeline || {}),
    },
    metrics: enOverride.metrics || project.metrics,
    features: enOverride.features || project.features,
    challenges: enOverride.challenges || project.challenges,
    keyLearnings: enOverride.keyLearnings || project.keyLearnings,
    responsibilities: enOverride.responsibilities || project.responsibilities,
    techStack: enOverride.techStack || project.techStack,
  };
}

/**
 * Helper function: Ambil seluruh daftar proyek sesuai bahasa yang dipilih
 */
export function getLocalizedProjects(lang: 'id' | 'en'): Project[] {
  return PROJECTS_DATA.map((p) => getLocalizedProject(p, lang));
}

/**
 * Helper function: Ambil detail proyek berdasarkan slug dan bahasa
 */
export function getLocalizedProjectBySlug(slug: string, lang: 'id' | 'en'): Project | undefined {
  const p = getProjectBySlug(slug);
  return p ? getLocalizedProject(p, lang) : undefined;
}


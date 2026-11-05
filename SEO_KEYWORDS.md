# Strategi & Master Kata Kunci SEO — Jovan Sebastian William
> **Domain**: `https://jovansw.is-a.dev`  
> **Target Nama**: **Jovan Sebastian William**  
> **Role Utama**: **Full Stack Developer**  
> **Lokasi**: **Indonesia** (Remote Worldwide)  
> **Tujuan**: Menduduki peringkat #1 di Google Search untuk pencarian nama *"Jovan Sebastian William"*, *"Portofolio Jovan Sebastian William"*, dan pencarian terkait Full Stack Developer di Indonesia.

---

## 1. Daftar Kata Kunci (Keyword Matrix)

### A. Tier 1: Primary Target (Personal Brand & Exact Match)
Kata kunci ini adalah prioritas nomor satu. Website harus mendominasi halaman pertama (peringkat 1-3) Google ketika siapa pun mencari kombinasi ini:

| Kata Kunci | Target Intent | Tingkat Persaingan | Prioritas |
| :--- | :--- | :--- | :--- |
| **Jovan Sebastian William** | Navigational / Informational | Rendah - Sedang | **Tertinggi (P1)** |
| **Portofolio Jovan Sebastian William** | Navigational | Rendah | **Tertinggi (P1)** |
| **Jovan Sebastian William Portfolio** | Navigational | Rendah | **Tertinggi (P1)** |
| **Jovan Sebastian William Web Developer** | Informational | Rendah | **Tinggi (P1)** |
| **Jovan Sebastian William Full Stack Developer** | Informational | Rendah | **Tinggi (P1)** |
| **jovansw** | Branded / Username | Rendah | **Tinggi (P1)** |
| **jovansw.is-a.dev** | Direct Brand | Rendah | **Tinggi (P1)** |
| **Jovan Sebastian** | Variasi Nama | Sedang | **Tinggi (P2)** |
| **Jovan William** | Variasi Nama | Sedang | **Tinggi (P2)** |

### B. Tier 2: Role, Industri & Geografis (Indonesia & Global)
Kata kunci untuk menjaring rekruter, klien freelance, atau kolaborator yang mencari engineer di Indonesia:

| Kata Kunci | Target Intent | Tingkat Persaingan | Prioritas |
| :--- | :--- | :--- | :--- |
| **Full Stack Developer Indonesia** | Commercial / Informational | Tinggi | **Tinggi (P2)** |
| **Full Stack Web Developer Indonesia** | Commercial | Sedang | **Tinggi (P2)** |
| **Software Engineer Indonesia** | Commercial | Tinggi | **Sedang (P3)** |
| **Web Developer Indonesia** | Commercial | Tinggi | **Sedang (P3)** |
| **Web Developer Jakarta** | Local SEO | Sedang | **Sedang (P3)** |
| **Frontend Developer Indonesia** | Commercial | Tinggi | **Sedang (P3)** |
| **Backend Developer Indonesia** | Commercial | Sedang | **Sedang (P3)** |
| **Indonesian Software Engineer** | Global / Remote Recruiter | Sedang | **Sedang (P3)** |

### C. Tier 3: Keahlian Teknologi (Tech Stack Keywords)
Menargetkan pencarian spesifik seputar keahlian teknis modern:

| Kata Kunci | Target Intent | Penempatan di Web |
| :--- | :--- | :--- |
| **Next.js Developer Indonesia** | Commercial / Tech | Hero Section, About, Metadata |
| **React Developer Indonesia** | Commercial / Tech | Project Case Studies, Skills |
| **TypeScript Developer Indonesia** | Commercial / Tech | About Section, Project Detail |
| **PostgreSQL Specialist** | Technical | Project Architecture |
| **Modern Web Architect** | Technical | Hero Typewriter, Meta Description |
| **Next.js App Router Portfolio** | Technical / Showcase | Case Study & Metadata |

### D. Tier 4: Long-Tail & Conversion Keywords (High Intent)
Frasa pencarian panjang dengan niat rekrutmen atau bisnis yang sangat tinggi:

- `portofolio jovan sebastian william full stack developer`
- `portofolio web developer jovan sebastian`
- `hire full stack developer indonesia`
- `freelance full stack developer indonesia nextjs`
- `rekayasa perangkat lunak web jovan sebastian william`
- `studi kasus web nextjs typescript indonesia`
- `jovan sebastian william github`
- `jovan sebastian william linkedin`

---

## 2. Implementasi File Teknis di Codebase

Untuk memastikan Googlebot dan search engine lainnya mengindeks website secara sempurna, codebase telah dilengkapi dengan arsitektur SEO native Next.js App Router:

1. **`src/data/seo-keywords.ts`**
   - Menjadi *single source of truth* untuk seluruh kata kunci, identitas personal, link sosial media, dan konfigurasi metadata.
2. **`src/app/robots.ts`** (Menghasilkan `/robots.txt`)
   - Memberi izin penuh kepada semua crawler (`User-Agent: *`, `Allow: /`) untuk merayapi halaman utama dan proyek.
   - Menghubungkan Googlebot langsung ke file sitemap XML (`https://jovansw.is-a.dev/sitemap.xml`).
3. **`src/app/sitemap.ts`** (Menghasilkan `/sitemap.xml`)
   - Mendaftarkan URL beranda (`priority: 1.0`, `changeFrequency: 'weekly'`).
   - Mendaftarkan seluruh halaman studi kasus proyek dinamis (`priority: 0.8`, `changeFrequency: 'monthly'`).
4. **`src/app/manifest.ts`** (Menghasilkan `/manifest.webmanifest`)
   - Menyediakan spesifikasi PWA (Progressive Web App) dengan nama lengkap, tema warna, dan ikon untuk indeks mobile Google.
5. **`src/components/seo/JsonLd.tsx`** (Schema.org Structured Data)
   - Menyuntikkan format data terstruktur `@graph` standar Google:
     - `Person`: Menghubungkan nama "Jovan Sebastian William", alternateName ("jovansw", "Jovan"), role ("Full Stack Developer"), lokasi ("Indonesia"), email, serta referensi identitas resmi (`sameAs` ke GitHub & LinkedIn).
     - `WebSite`: Mendefinisikan website portofolio resmi dengan author entitas Person.
     - `ProfilePage`: Halaman profil terverifikasi dari entitas Person.
6. **`src/app/layout.tsx`**
   - Mengatur `metadataBase: new URL('https://jovansw.is-a.dev')`.
   - Menggunakan format title dinamis: `%s | Jovan Sebastian William`.
   - Menetapkan canonical URL, meta description kaya kata kunci, OpenGraph, dan Twitter Card.
7. **`src/app/opengraph-image.tsx`**
   - Menghasilkan dynamic social preview card 1200x630 pixel secara otomatis yang menampilkan nama Jovan Sebastian William, role Full Stack Developer, dan tech stack saat link dibagikan di media sosial.

---

## 3. Panduan Langkah Praktis Agar Cepat Peringkat #1 di Google

Memasang kode SEO di website adalah langkah **On-Page**. Agar domain baru seperti `jovansw.is-a.dev` bisa langsung diverifikasi Google dan memuncaki peringkat untuk nama Anda, lakukan 4 langkah **Off-Page & Indexing** berikut:

### Langkah 1: Daftarkan Website ke Google Search Console (Wajib & Mendesak)
1. Buka [Google Search Console](https://search.google.com/search-console/).
2. Masukkan URL Prefix: `https://jovansw.is-a.dev`.
3. Verifikasi kepemilikan:
   - Pilih metode **HTML tag** (salin kode `<meta name="google-site-verification" content="..." />`).
   - Tempel kode verifikasi tersebut ke `verification.google` di file `src/app/layout.tsx`.
4. Setelah terverifikasi, buka menu **Sitemaps** di bilah sisi kiri Google Search Console:
   - Masukkan: `sitemap.xml`
   - Klik **Submit**.
5. Buka fitur **URL Inspection** di bagian atas Search Console:
   - Masukkan `https://jovansw.is-a.dev/`
   - Klik **Request Indexing**. Ini akan memerintahkan Googlebot untuk mengindeks website Anda dalam waktu 24–48 jam.

---

### Langkah 2: Hubungkan Entity Graph (Google Knowledge Graph)
Google memvalidasi bahwa "Jovan Sebastian William" adalah pemilik sah `https://jovansw.is-a.dev` melalui sinyal silang (cross-linking):

1. **GitHub Profile (`https://github.com/Jovan-SW`)**:
   - Di profil GitHub Anda, pastikan field **Name** adalah `Jovan Sebastian William`.
   - Masukkan **Website**: `https://jovansw.is-a.dev`.
   - Masukkan **Location**: `Indonesia`.
   - Di README profile (`Jovan-SW/Jovan-SW`), cantumkan link ke website portofolio dengan anchor text: `[Portofolio Jovan Sebastian William](https://jovansw.is-a.dev)`.
2. **LinkedIn Profile (`https://www.linkedin.com/in/jovansebastian`)**:
   - Cantumkan link website portofolio `https://jovansw.is-a.dev` di bagian Contact Info dan Featured Links.
   - Gunakan nama lengkap: `Jovan Sebastian William`.
   - Tulis headline: `Full Stack Developer | Next.js, React, TypeScript, PostgreSQL`.
3. **Akun Media Sosial / Developer Lainnya**:
   - Jika Anda memiliki akun di Twitter/X, Dev.to, Medium, Daily.dev, atau Instagram, letakkan tautan `https://jovansw.is-a.dev` di bio.

---

### Langkah 3: Daftarkan ke Bing Webmaster Tools
1. Buka [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Login dan pilih opsi **Import from Google Search Console** (hanya 1 klik, otomatis sinkron).
3. Bing juga menggerakkan mesin pencari alternatif seperti Yahoo, DuckDuckGo, dan Ecosia.

---

### Langkah 4: Rutinitas Pemeliharaan (Maintenance)
- Jika Anda menambah proyek baru di `src/data/projects.ts`, file `sitemap.xml` akan otomatis menyertakan URL baru tersebut tanpa perlu konfigurasi ulang.
- Cek tab **Performance** di Google Search Console setiap 2-4 minggu untuk melihat query apa yang paling banyak membawa pengunjung ke portofolio Anda.


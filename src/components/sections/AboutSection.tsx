'use client';

import { BentoCard } from '@/components/ui/bento';

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Section"
      className="py-20 sm:py-28 relative border-t border-zinc-900 bg-zinc-950 overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] bg-gradient-to-br from-amber-600/5 via-yellow-600/3 to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] bg-gradient-to-tl from-zinc-800/10 via-zinc-900/5 to-transparent rounded-full blur-[140px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout Bento: Jarak Lega & Bernapas, Mudah Dibaca (1 -> 2x2 -> 1) */}
        <div className="flex flex-col gap-6 sm:gap-8">
          {/* =========================================================================
              BAGIAN 1: Technical Journey (1 Kotak Penuh di Tengah)
              ========================================================================= */}
          <BentoCard
            eyebrow="Evolution & Journey"
            title="Technical Journey"
            description="Perjalanan rekayasa perangkat lunak saya bermula dari pemahaman mendasar mengenai arsitektur jaringan dan komunikasi peladen, yang kemudian berkembang menjadi spesialisasi dalam pengembangan sistem web full-stack. Berangkat dari perancangan sistem interaktif berbasis konsumsi data hingga pembangunan platform niaga elektronik dengan alur transaksi terintegrasi, fokus rekayasa saya terpusat pada ekosistem Next.js, TypeScript, dan PostgreSQL. Pendekatan kerja saya menitikberatkan pada struktur arsitektur yang modular, kepatuhan pengetikan kode yang ketat, serta penjaminan keamanan data tingkat lanjut demi menghadirkan solusi digital yang andal dan berkinerja tinggi."
            className="w-full rounded-2xl sm:rounded-3xl p-2 sm:p-4"
          />

          {/* =========================================================================
              BAGIAN 2: Pilar Rekayasa (Format 2x2: 2 Kotak Atas & 2 Kotak Bawah)
              ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Kotak 2: Keamanan Berlapis pada Tingkat Basis Data */}
            <BentoCard
              eyebrow="Database Security"
              title="Keamanan Berlapis pada Tingkat Basis Data"
              description="Validasi data tidak boleh hanya bergantung pada logika antarmuka pengguna. Saya menerapkan isolasi data dan kebijakan kontrol akses berbasis baris (Row-Level Security) langsung pada lapisan basis data untuk memastikan setiap entitas data terlindungi secara absolut dari akses yang tidak terotorisasi."
              className="rounded-2xl p-2 sm:p-3"
            />

            {/* Kotak 3: Kepastian Tipe Data Menyeluruh */}
            <BentoCard
              eyebrow="Type Safety"
              title="Kepastian Tipe Data Menyeluruh (End-to-End Type Safety)"
              description="Saya mengeliminasi potensi kegagalan sistem saat aplikasi berjalan (runtime error) melalui sinkronisasi tipe data statis yang terhubung tanpa putus, mulai dari skema basis data, protokol transmisi data, hingga komponen visual. Konsistensi ini menjamin stabilitas kode dan kemudahan pemeliharaan jangka panjang."
              className="rounded-2xl p-2 sm:p-3"
            />

            {/* Kotak 4: Arsitektur Berorientasi Latensi Rendah */}
            <BentoCard
              eyebrow="Latency & Performance"
              title="Arsitektur Berorientasi Latensi Rendah"
              description="Efisiensi sistem dicapai melalui pemilahan beban komputasi yang terukur antara pemrosesan peladen (server-side) dan interaksi peramban (client-side). Fokus rekayasa saya diarahkan pada efisiensi kueri data, minimalisasi ukuran paket berkas, dan percepatan waktu muat halaman demi menjaga keandalan pengalaman pengguna."
              className="rounded-2xl p-2 sm:p-3"
            />

            {/* Kotak 5: Integritas Transaksi dan Ketahanan Sistem */}
            <BentoCard
              eyebrow="Resilience & Integrity"
              title="Integritas Transaksi dan Ketahanan Sistem"
              description="Setiap alur pertukaran data kritis—terutama integrasi layanan pihak ketiga dan pencatatan transaksi—dirancang dengan antisipasi kegagalan jaringan serta penanganan kondisi batas (edge cases). Konsistensi status data dan pencegahan anomali duplikasi merupakan prioritas mutlak dalam perancangan logika bisnis."
              className="rounded-2xl p-2 sm:p-3"
            />
          </div>

          {/* =========================================================================
              BAGIAN 3: Cara Kerja (1 Kotak Utuh Agak Besar di Bawah)
              ========================================================================= */}
          <div className="w-full rounded-2xl sm:rounded-3xl bg-zinc-950/80 border border-zinc-800/80 hover:border-amber-400/50 p-7 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.06)] transition-all duration-300">
            <div className="mb-6 sm:mb-8">
              <span className="text-[11px] font-mono tracking-widest text-amber-400 font-semibold uppercase">
                Workflow &amp; Collaboration
              </span>
              <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                Cara Kerja
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-zinc-800/60">
              {/* Point 1: Komunikasi Tertulis yang Jelas */}
              <div className="space-y-2.5">
                <h4 className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight">
                  Komunikasi Tertulis yang Jelas
                </h4>
                <p className="font-serif-contemporary text-[15px] sm:text-[16px] leading-[1.8] text-zinc-300/95 font-normal tracking-wide">
                  Saya selalu membiasakan menulis deskripsi Pull Request yang informatif, riwayat commit yang bermakna, dan dokumentasi yang terstruktur. Komunikasi asinkron yang jelas membuat kolaborasi tim tetap berjalan lancar tanpa harus bergantung pada rapat berulang.
                </p>
              </div>

              {/* Point 2: Standar Kode yang Ketat */}
              <div className="space-y-2.5">
                <h4 className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight">
                  Standar Kode yang Ketat
                </h4>
                <p className="font-serif-contemporary text-[15px] sm:text-[16px] leading-[1.8] text-zinc-300/95 font-normal tracking-wide">
                  Bagi saya, kode tidak cukup sekadar &quot;berfungsi&quot;. Saya menerapkan pengetikan statis yang ketat (type safety) di TypeScript, struktur branch Git yang teratur, dan validasi kode sebelum digabungkan ke main branch agar sistem di production tetap stabil.
                </p>
              </div>

              {/* Point 3: Terbuka terhadap Masukan */}
              <div className="space-y-2.5">
                <h4 className="text-base sm:text-lg font-bold text-zinc-100 tracking-tight">
                  Terbuka terhadap Masukan
                </h4>
                <p className="font-serif-contemporary text-[15px] sm:text-[16px] leading-[1.8] text-zinc-300/95 font-normal tracking-wide">
                  Saya memandang code review sebagai sarana menjaga kualitas sistem bersama tim, bukan ajang mencari kesalahan. Masukan teknis yang kritis selalu saya manfaatkan untuk memperkuat arsitektur kode.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

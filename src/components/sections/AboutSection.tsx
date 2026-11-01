'use client';

import { motion } from 'framer-motion';
import { BentoCard, caveCardVariants, subPanelPopVariants } from '@/components/ui/bento';
import { InteractiveTiltCard } from '@/components/ui/tilt-card';

export default function AboutSection() {
  return (
    <section
      id="about"
      aria-label="About Section"
      className="py-20 sm:py-28 relative border-t border-white/10 bg-transparent overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-7 sm:gap-10">
          {/* =========================================================================
              BAGIAN 1: Technical Journey & Portrait
              Urutan Pop-In Murni dari Dalam Goa: Card 1 -> Card 2
              Clean & Transparan 3D Glass Cards (Interactive Tilt & Glare Photo)
              ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-stretch">
            {/* Card 1: Technical Journey Text (Pop-In dari Dalam Goa 1) */}
            <BentoCard
              eyebrow="Evolution & Journey"
              title="Technical Journey"
              description="Perjalanan rekayasa perangkat lunak saya bermula dari pemahaman mendasar mengenai arsitektur jaringan dan komunikasi peladen, yang kemudian berkembang menjadi spesialisasi dalam pengembangan sistem web full-stack. Berangkat dari perancangan sistem interaktif berbasis konsumsi data hingga pembangunan platform niaga elektronik dengan alur transaksi terintegrasi, fokus rekayasa saya terpusat pada ekosistem Next.js, TypeScript, dan PostgreSQL. Pendekatan kerja saya menitikberatkan pada struktur arsitektur yang modular, kepatuhan pengetikan kode yang ketat, serta penjaminan keamanan data tingkat lanjut demi menghadirkan solusi digital yang andal dan berkinerja tinggi."
              delay={0.04}
              className="md:col-span-7 lg:col-span-8 h-full"
            />

            {/* Card 2: Foto Jovan (Pop-In dari Dalam Goa 2) - Interactive 3D Tilt Card dengan Glare Effect */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
              variants={caveCardVariants}
              custom={0.16}
              className="group relative md:col-span-5 lg:col-span-4 rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-white/35 via-white/10 to-transparent hover:from-amber-400/80 hover:via-amber-400/30 hover:to-transparent transition-colors duration-300 min-h-[360px] sm:min-h-[400px] md:min-h-full flex flex-col"
            >
              {/* Inner 3D Clean Transparent Glass Card Body */}
              <div className="relative flex-1 rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] overflow-hidden bg-black/15 hover:bg-black/25 transition-colors duration-300 card-3d-glass border border-white/10 hover:border-amber-400/50 border-b-2 border-b-black/50 flex flex-col">
                {/* Specular Top Rim Glint Hairline */}
                <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30 group-hover:via-amber-300 transition-colors duration-300" />

                {/* 3D Cyber Hardware Corner Accents & Rivets */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400/70 rounded-tl-sm pointer-events-none group-hover:border-amber-400 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400/70 rounded-br-sm pointer-events-none group-hover:border-amber-400 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-amber-400/70 group-hover:bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)] pointer-events-none transition-colors duration-300 z-30" />
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-amber-400/70 group-hover:bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)] pointer-events-none transition-colors duration-300 z-30" />

                {/* Interactive 3D Tilt Card dengan Glare Cursor Tracking */}
                <div className="relative w-full h-full min-h-[360px] sm:min-h-[400px] md:min-h-full overflow-hidden">
                  <InteractiveTiltCard
                    image={{
                      src: '/inimahgw.png',
                      alt: 'Jovan - Technical Journey',
                    }}
                    tiltFactor={14}
                    perspective={1000}
                    borderRadius={0}
                    backgroundColor="transparent"
                    hoverScale={1.03}
                    glareEffect={true}
                    glareIntensity={0.35}
                    glareSize={75}
                    transitionDuration={0.25}
                    className="w-full h-full min-h-[360px] sm:min-h-[400px] md:min-h-full"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-2xl sm:rounded-3xl pointer-events-none z-20" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* =========================================================================
              BAGIAN 2: Keamanan & Pilar Rekayasa (Format 2x2: 2 Kotak Atas & 2 Kotak Bawah)
              Urutan Pop-In Murni dari Dalam Goa: Card 3 -> Card 4 -> Card 5 -> Card 6
              Tanpa Bubble / Tag Badges
              ========================================================================= */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Card 3: Keamanan Berlapis pada Tingkat Basis Data (Pop-In dari Dalam Goa 3) */}
            <BentoCard
              eyebrow="Database Security"
              title="Keamanan Berlapis pada Tingkat Basis Data"
              description="Validasi data tidak boleh hanya bergantung pada logika antarmuka pengguna. Saya menerapkan isolasi data dan kebijakan kontrol akses berbasis baris (Row-Level Security) langsung pada lapisan basis data untuk memastikan setiap entitas data terlindungi secara absolut dari akses yang tidak terotorisasi."
              delay={0.28}
            />

            {/* Card 4: Kepastian Tipe Data Menyeluruh (Pop-In dari Dalam Goa 4) */}
            <BentoCard
              eyebrow="Type Safety"
              title="Kepastian Tipe Data Menyeluruh (End-to-End Type Safety)"
              description="Saya mengeliminasi potensi kegagalan sistem saat aplikasi berjalan (runtime error) melalui sinkronisasi tipe data statis yang terhubung tanpa putus, mulai dari skema basis data, protokol transmisi data, hingga komponen visual. Konsistensi ini menjamin stabilitas kode dan kemudahan pemeliharaan jangka panjang."
              delay={0.40}
            />

            {/* Card 5: Arsitektur Berorientasi Latensi Rendah (Pop-In dari Dalam Goa 5) */}
            <BentoCard
              eyebrow="Latency & Performance"
              title="Arsitektur Berorientasi Latensi Rendah"
              description="Efisiensi sistem dicapai melalui pemilahan beban komputasi yang terukur antara pemrosesan peladen (server-side) dan interaksi peramban (client-side). Fokus rekayasa saya diarahkan pada efisiensi kueri data, minimalisasi ukuran paket berkas, dan percepatan waktu muat halaman demi menjaga keandalan pengalaman pengguna."
              delay={0.52}
            />

            {/* Card 6: Integritas Transaksi dan Ketahanan Sistem (Pop-In dari Dalam Goa 6) */}
            <BentoCard
              eyebrow="Resilience & Integrity"
              title="Integritas Transaksi dan Ketahanan Sistem"
              description="Setiap alur pertukaran data kritis—terutama integrasi layanan pihak ketiga dan pencatatan transaksi—dirancang dengan antisipasi kegagalan jaringan serta penanganan kondisi batas (edge cases). Konsistensi status data dan pencegahan anomali duplikasi merupakan prioritas mutlak dalam perancangan logika bisnis."
              delay={0.64}
            />
          </div>

          {/* =========================================================================
              BAGIAN 3: Cara Kerja (1 Kotak Utuh Agak Besar di Bawah)
              Urutan Pop-In Murni dari Dalam Goa: Card 7 -> Sub-Panel 1 -> 2 -> 3
              Tanpa Bubble / Tag Badges
              ========================================================================= */}
          <div className="w-full">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
              variants={caveCardVariants}
              custom={0.76}
              whileHover={{ scale: 1.015 }}
              className="group relative w-full rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-white/35 via-white/10 to-transparent hover:from-amber-400/80 hover:via-amber-400/30 hover:to-transparent transition-colors duration-300"
            >
              {/* 3D Clean Transparent Glass Panel Body */}
              <div className="relative rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] overflow-hidden bg-black/15 hover:bg-black/25 transition-colors duration-300 card-3d-glass border border-white/10 hover:border-amber-400/50 border-b-2 border-b-black/50 p-7 sm:p-10">
                {/* Specular Top Rim Glint Hairline */}
                <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30 group-hover:via-amber-300 transition-colors duration-300" />

                {/* 3D Cyber Hardware Corner Accents & Rivets */}
                <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-400/70 rounded-tl-sm pointer-events-none group-hover:border-amber-400 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-400/70 rounded-br-sm pointer-events-none group-hover:border-amber-400 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(251,191,36,0.5)]" />
                <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-amber-400/70 group-hover:bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)] pointer-events-none transition-colors duration-300 z-30" />
                <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-amber-400/70 group-hover:bg-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)] pointer-events-none transition-colors duration-300 z-30" />

                {/* Header Area */}
                <div className="mb-6 sm:mb-8">
                  <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    Workflow &amp; Collaboration
                  </span>
                  <h3 className="mt-2 text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-amber-100 transition-colors">
                    Cara Kerja
                  </h3>
                </div>

                {/* 3 Pillars Sub-Panels with clean transparent glass & mini center-out pop-ins (Tanpa bubble tag) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-6 border-t border-white/15">
                  {/* Point 1: Komunikasi Tertulis yang Jelas (Pop-In 7.1) */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    variants={subPanelPopVariants}
                    custom={0.86}
                    className="relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-black/25 hover:bg-black/40 border border-white/15 hover:border-amber-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                        Komunikasi Tertulis yang Jelas
                      </h4>
                      <p className="font-serif-contemporary text-[15px] sm:text-[16px] leading-[1.8] text-zinc-100 font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        Saya selalu membiasakan menulis deskripsi Pull Request yang informatif, riwayat commit yang bermakna, dan dokumentasi yang terstruktur. Komunikasi asinkron yang jelas membuat kolaborasi tim tetap berjalan lancar tanpa harus bergantung pada rapat berulang.
                      </p>
                    </div>
                  </motion.div>

                  {/* Point 2: Standar Kode yang Ketat (Pop-In 7.2) */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    variants={subPanelPopVariants}
                    custom={0.96}
                    className="relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-black/25 hover:bg-black/40 border border-white/15 hover:border-amber-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                        Standar Kode yang Ketat
                      </h4>
                      <p className="font-serif-contemporary text-[15px] sm:text-[16px] leading-[1.8] text-zinc-100 font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        Bagi saya, kode tidak cukup sekadar &quot;berfungsi&quot;. Saya menerapkan pengetikan statis yang ketat (type safety) di TypeScript, struktur branch Git yang teratur, dan validasi kode sebelum digabungkan ke main branch agar sistem di production tetap stabil.
                      </p>
                    </div>
                  </motion.div>

                  {/* Point 3: Terbuka terhadap Masukan (Pop-In 7.3) */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    variants={subPanelPopVariants}
                    custom={1.06}
                    className="relative p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-black/25 hover:bg-black/40 border border-white/15 hover:border-amber-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_4px_16px_rgba(0,0,0,0.25)] transition-all duration-300 flex flex-col justify-between"
                  >
                    <div className="space-y-2.5">
                      <h4 className="text-base sm:text-lg font-bold text-white tracking-tight drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                        Terbuka terhadap Masukan
                      </h4>
                      <p className="font-serif-contemporary text-[15px] sm:text-[16px] leading-[1.8] text-zinc-100 font-normal tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                        Saya memandang code review sebagai sarana menjaga kualitas sistem bersama tim, bukan ajang mencari kesalahan. Masukan teknis yang kritis selalu saya manfaatkan untuk memperkuat arsitektur kode.
                      </p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

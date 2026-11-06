'use client';

import { motion } from 'framer-motion';
import { BentoCard, caveCardVariants } from '@/components/ui/bento';
import { useLanguage } from '@/context/LanguageContext';
import CaveFireflyCanvas from '@/components/ui/CaveFireflyCanvas';
import IceMistCanvas from '@/components/ui/IceMistCanvas';

export default function EngineeringPrinciplesSection() {
  const { lang } = useLanguage();

  return (
    <section
      id="principles"
      aria-label={lang === 'en' ? 'Engineering Principles Section' : 'Bagian Prinsip Rekayasa'}
      className="py-12 sm:py-20 md:py-28 relative border-t border-white/10 bg-transparent overflow-hidden"
    >
      {/* 3D Glacial Ice Fog Mist Effect on Scroll */}
      <IceMistCanvas />
      {/* Ambient Cave Fireflies Effect */}
      <CaveFireflyCanvas />

      {/* Anchor alias */}
      <div id="engineering-principles" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
          variants={caveCardVariants}
          custom={0.1}
          className="flex flex-col items-center text-center mb-6 sm:mb-10 md:mb-12"
        >
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
            style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
          >
            {lang === 'en' ? 'Engineering Principles' : 'Prinsip Rekayasa'}
          </h2>
        </motion.div>

        {/* Format 2x2: 2 Kotak Atas & 2 Kotak Bawah */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-6 md:gap-8 items-stretch">
          {/* Card 3: Keamanan Berlapis pada Tingkat Basis Data */}
          <BentoCard
            eyebrow="Database Security"
            title={lang === 'en' ? 'Multi-Layered Database-Level Security' : 'Keamanan Berlapis pada Tingkat Basis Data'}
            description={
              lang === 'en'
                ? 'Data validation must never rely solely on user interface logic. I implement data isolation and row-level access control policies (Row-Level Security) directly at the database layer to ensure every data entity is absolutely protected from unauthorized access.'
                : 'Validasi data tidak boleh hanya bergantung pada logika antarmuka pengguna. Saya menerapkan isolasi data dan kebijakan kontrol akses berbasis baris (Row-Level Security) langsung pada lapisan basis data untuk memastikan setiap entitas data terlindungi secara absolut dari akses yang tidak terotorisasi.'
            }
            delay={0.28}
            className="h-full flex flex-col justify-between"
          />

          {/* Card 4: Kepastian Tipe Data Menyeluruh */}
          <BentoCard
            eyebrow="Type Safety"
            title={lang === 'en' ? 'End-to-End Type Safety' : 'Kepastian Tipe Data Menyeluruh (End-to-End Type Safety)'}
            description={
              lang === 'en'
                ? 'I eliminate potential system failures during runtime (runtime errors) through seamless static type synchronization spanning database schemas, data transmission protocols, to visual components. This consistency guarantees code stability and long-term maintainability.'
                : 'Saya mengeliminasi potensi kegagalan sistem saat aplikasi berjalan (runtime error) melalui sinkronisasi tipe data statis yang terhubung tanpa putus, mulai dari skema basis data, protokol transmisi data, hingga komponen visual. Konsistensi ini menjamin stabilitas kode dan kemudahan pemeliharaan jangka panjang.'
            }
            delay={0.40}
            className="h-full flex flex-col justify-between"
          />

          {/* Card 5: Arsitektur Berorientasi Latensi Rendah */}
          <BentoCard
            eyebrow="Latency & Performance"
            title={lang === 'en' ? 'Low-Latency Oriented Architecture' : 'Arsitektur Berorientasi Latensi Rendah'}
            description={
              lang === 'en'
                ? 'System efficiency is achieved through the calculated distribution of computational load between server-side processing and client-side browser interaction. My engineering focus is directed toward data query efficiency, minimizing bundle file sizes, and accelerating page load times to maintain the reliability of the user experience.'
                : 'Efisiensi sistem dicapai melalui pemilahan beban komputasi yang terukur antara pemrosesan peladen (server-side) dan interaksi peramban (client-side). Fokus rekayasa saya diarahkan pada efisiensi kueri data, minimalisasi ukuran paket berkas, dan percepatan waktu muat halaman demi menjaga keandalan pengalaman pengguna.'
            }
            delay={0.52}
            className="h-full flex flex-col justify-between"
          />

          {/* Card 6: Integritas Transaksi dan Ketahanan Sistem */}
          <BentoCard
            eyebrow="Resilience & Integrity"
            title={lang === 'en' ? 'Transaction Integrity & System Resilience' : 'Integritas Transaksi dan Ketahanan Sistem'}
            description={
              lang === 'en'
                ? 'Every critical data exchange workflow—especially third-party service integrations and transaction recordings—is designed with anticipation of network failures and edge-case handling. Data state consistency and the prevention of duplication anomalies are absolute priorities in business logic design.'
                : 'Setiap alur pertukaran data kritis—terutama integrasi layanan pihak ketiga dan pencatatan transaksi—dirancang dengan antisipasi kegagalan jaringan serta penanganan kondisi batas (edge cases). Konsistensi status data dan pencegahan anomali duplikasi merupakan prioritas mutlak dalam perancangan logika bisnis.'
            }
            delay={0.64}
            className="h-full flex flex-col justify-between"
          />
        </div>
      </div>
    </section>
  );
}


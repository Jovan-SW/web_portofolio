'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { caveCardVariants, subPanelPopVariants } from '@/components/ui/bento';
import {
  Mail,
  Check,
  Copy,
  Globe,
  Clock,
  CalendarCheck,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import CaveFireflyCanvas from '@/components/ui/CaveFireflyCanvas';

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [wibTime, setWibTime] = useState<string>('');

  const emailAddress = 'jovanwill139@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/jovansebastian';
  const githubUrl = 'https://github.com/Jovan-SW';

  // Jam lokal real-time WIB (UTC+7) untuk pengunjung internasional dan remote
  useEffect(() => {
    const updateWibTime = () => {
      try {
        const now = new Date();
        const formatted = new Intl.DateTimeFormat(lang === 'en' ? 'en-US' : 'id-ID', {
          timeZone: 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setWibTime(`${formatted} WIB`);
      } catch {
        setWibTime('UTC+7 WIB');
      }
    };

    updateWibTime();
    const timer = setInterval(updateWibTime, 1000);
    return () => clearInterval(timer);
  }, [lang]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = emailAddress;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-20 sm:py-28 relative border-t border-white/10 bg-transparent overflow-hidden"
    >
      {/* Ambient Cave Fireflies Effect */}
      <CaveFireflyCanvas />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main 3D Transparent Glass Card with Cara Kerja Pop-In Animation & Dark Grey Hover */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
          variants={caveCardVariants}
          custom={0.2}
          whileHover={{ scale: 1.012 }}
          className="group relative w-full rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-white/35 via-white/10 to-transparent hover:from-zinc-500/70 hover:via-zinc-700/40 hover:to-transparent transition-colors duration-300"
        >
          {/* 3D Clean Transparent Glass Panel Body */}
          <div className="relative rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] overflow-hidden bg-black/35 hover:bg-zinc-950/85 transition-all duration-300 card-3d-glass-darkgrey border border-white/10 hover:border-zinc-500/60 border-b-2 border-b-black/60">
            {/* Specular Top Rim Glint Hairline */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30 group-hover:via-zinc-300 transition-colors duration-300" />

            {/* 3D Cyber Hardware Corner Accents & Rivets in Dark Grey */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-zinc-500/70 rounded-tl-sm pointer-events-none group-hover:border-zinc-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(113,113,122,0.4)]" />
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-zinc-500/70 rounded-br-sm pointer-events-none group-hover:border-zinc-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(113,113,122,0.4)]" />
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-zinc-500/70 group-hover:bg-zinc-300 shadow-[0_0_8px_rgba(113,113,122,0.6)] pointer-events-none transition-colors duration-300 z-30" />
            <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-zinc-500/70 group-hover:bg-zinc-300 shadow-[0_0_8px_rgba(113,113,122,0.6)] pointer-events-none transition-colors duration-300 z-30" />

            {/* Top Hero Banner: Massive "Contact Me" Title */}
            <div className="px-6 sm:px-12 pt-10 sm:pt-14 pb-8 sm:pb-10 border-b border-white/10 bg-black/20">
              <span className="text-xs font-mono tracking-widest text-zinc-400 group-hover:text-zinc-300 font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] block mb-2 transition-colors">
                {t('contact.eyebrow')}
              </span>
              <h2
                className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-none drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:text-zinc-100 transition-colors"
                style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
              >
                {t('contact.title')}
              </h2>
            </div>

            {/* Content Area: Headline Ajakan & Grid Saluran Kontak */}
            <div className="px-6 sm:px-12 py-10 sm:py-14 space-y-8 sm:space-y-10">
              {/* Headline Ajakan */}
              <div className="max-w-3xl">
                <h3
                  className="text-2xl sm:text-4xl font-black text-white leading-tight tracking-tight mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                  style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
                >
                  {t('contact.heading1')}
                  <br />
                  <span className="text-zinc-300 group-hover:text-zinc-200 transition-colors">
                    {t('contact.heading2')}
                  </span>
                </h3>
                <p className="text-sm sm:text-base text-zinc-200 leading-relaxed max-w-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {t('contact.subheading')}
                </p>
              </div>

              {/* Grid Kartu Informasi & Aksi Kontak (Pop-in murni dari dalam goa layaknya sub-panel Cara Kerja) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 pt-2">
                {/* Item 1: Email (Salin Email & mailto) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  variants={subPanelPopVariants}
                  custom={0.3}
                  className="md:col-span-2 p-5 sm:p-6 rounded-2xl bg-black/35 hover:bg-zinc-900/80 border border-white/10 hover:border-zinc-500/60 card-3d-glass-darkgrey transition-all duration-300 group/email flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover/email:border-zinc-400 group-hover/email:text-white transition-all flex-shrink-0 shadow-sm">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-zinc-400 group-hover/email:text-zinc-300 uppercase tracking-wider block transition-colors">
                        {t('contact.officialEmail')}
                      </span>
                      <a
                        href={`mailto:${emailAddress}`}
                        className="text-base sm:text-lg font-bold text-white group-hover/email:text-zinc-100 transition-colors break-all"
                      >
                        {emailAddress}
                      </a>
                    </div>
                  </div>

                  {/* Tombol Aksi: Salin Email & Buka Mailto */}
                  <div className="flex items-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/10">
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white border border-zinc-600/50 transition-all cursor-pointer active:scale-95 shadow-sm"
                      title={lang === 'en' ? 'Copy email address to clipboard' : 'Salin alamat email ke clipboard'}
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">{t('contact.emailCopied')}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{t('contact.copyEmail')}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={`mailto:${emailAddress}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-zinc-200 hover:bg-white text-zinc-950 transition-all shadow-md shadow-black/40 active:scale-95"
                      title={lang === 'en' ? 'Send a message directly via your email client' : 'Kirim pesan langsung via aplikasi email Anda'}
                    >
                      <span>{t('contact.openMailto')}</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>

                {/* Item 2: Ketersediaan (Availability) */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  variants={subPanelPopVariants}
                  custom={0.38}
                  className="p-5 sm:p-6 rounded-2xl bg-black/35 hover:bg-zinc-900/80 border border-white/10 hover:border-zinc-500/60 card-3d-glass-darkgrey transition-all duration-300 group/avail shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center text-emerald-400 group-hover/avail:border-zinc-400 transition-all flex-shrink-0 shadow-sm">
                      <CalendarCheck className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-zinc-400 group-hover/avail:text-zinc-300 uppercase tracking-wider transition-colors">
                          {t('contact.availability')}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white group-hover/avail:text-zinc-100 transition-colors">
                        {t('contact.availStatus')}
                      </p>
                      <p className="text-xs text-zinc-300 mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" />
                        {t('contact.availResponse')}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Item 3: Zona Waktu & Remote */}
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  variants={subPanelPopVariants}
                  custom={0.46}
                  className="p-5 sm:p-6 rounded-2xl bg-black/35 hover:bg-zinc-900/80 border border-white/10 hover:border-zinc-500/60 card-3d-glass-darkgrey transition-all duration-300 group/zone shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover/zone:border-zinc-400 group-hover/zone:text-white transition-all flex-shrink-0 shadow-sm">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-zinc-400 group-hover/zone:text-zinc-300 uppercase tracking-wider transition-colors">
                          {t('contact.timezone')}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-zinc-800 text-zinc-200 border border-zinc-600/50">
                          <Sparkles className="w-2.5 h-2.5 text-zinc-300" />
                          {t('contact.timezoneRemote')}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-white group-hover/zone:text-zinc-100 transition-colors">
                        {t('contact.timezoneDetail')}
                      </p>
                      <p className="text-xs text-zinc-300 mt-1 font-mono">
                        {wibTime ? `${t('contact.wibLabel')} ${wibTime}` : 'Indonesia Standard Time'} • {t('contact.wibRemoteReady')}
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Item 4: LinkedIn Profile Link */}
                <motion.a
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  variants={subPanelPopVariants}
                  custom={0.54}
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 sm:p-6 rounded-2xl bg-black/35 hover:bg-zinc-900/80 border border-white/10 hover:border-zinc-500/60 card-3d-glass-darkgrey transition-all duration-300 group/li block shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover/li:border-[#0077B5]/80 group-hover/li:text-[#0077B5] transition-all flex-shrink-0 shadow-sm">
                      <LinkedinIcon className="w-5 h-5 fill-current" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-400 group-hover/li:text-zinc-300 uppercase tracking-wider transition-colors">
                          {t('contact.linkedin')}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover/li:text-white group-hover/li:translate-x-0.5 group-hover/li:-translate-y-0.5 transition-transform" />
                      </div>
                      <p className="text-sm font-semibold text-white group-hover/li:text-zinc-100 transition-colors mt-0.5">
                        www.linkedin.com/in/jovansebastian
                      </p>
                      <p className="text-xs text-zinc-300 mt-1">
                        {t('contact.linkedinDesc')}
                      </p>
                    </div>
                  </div>
                </motion.a>

                {/* Item 5: GitHub Profile Link */}
                <motion.a
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.15 }}
                  variants={subPanelPopVariants}
                  custom={0.62}
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 sm:p-6 rounded-2xl bg-black/35 hover:bg-zinc-900/80 border border-white/10 hover:border-zinc-500/60 card-3d-glass-darkgrey transition-all duration-300 group/gh block shadow-[0_4px_16px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-zinc-900/90 border border-zinc-700/60 flex items-center justify-center text-zinc-300 group-hover/gh:border-zinc-400 group-hover/gh:text-white transition-all flex-shrink-0 shadow-sm">
                      <GithubIcon className="w-5 h-5 fill-current" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-zinc-400 group-hover/gh:text-zinc-300 uppercase tracking-wider transition-colors">
                          {t('contact.github')}
                        </span>
                        <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover/gh:text-white group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5 transition-transform" />
                      </div>
                      <p className="text-sm font-semibold text-white group-hover/gh:text-zinc-100 transition-colors mt-0.5">
                        https://github.com/Jovan-SW
                      </p>
                      <p className="text-xs text-zinc-300 mt-1">
                        {t('contact.githubDesc')}
                      </p>
                    </div>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


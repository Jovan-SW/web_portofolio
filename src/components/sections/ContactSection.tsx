'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { caveCardVariants, subPanelPopVariants } from '@/components/ui/bento';
import { sendContactEmail } from '@/app/actions/send-email';
import {
  Mail,
  Check,
  Copy,
  Globe,
  Clock,
  CalendarCheck,
  ArrowUpRight,
  Sparkles,
  Send,
  User,
  MessageSquare,
  Phone,
  AlertCircle,
  CheckCircle2,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import CaveFireflyCanvas from '@/components/ui/CaveFireflyCanvas';
import IceMistCanvas from '@/components/ui/IceMistCanvas';

export default function ContactSection() {
  const { lang, t } = useLanguage();
  const [copied, setCopied] = useState(false);
  const [wibTime, setWibTime] = useState<string>('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    message: '',
    hp_website: '',
    company_fax: '',
  });
  const [formTimestamp, setFormTimestamp] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    success: boolean;
    message: string;
    fieldErrors?: Record<string, string>;
  } | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const emailAddress = 'jovsebwil723@gmail.com';
  const linkedinUrl = 'https://www.linkedin.com/in/jovansebastian';
  const githubUrl = 'https://github.com/Jovan-SW';

  // Inisialisasi timestamp saat komponen dimuat di browser
  useEffect(() => {
    setFormTimestamp(Date.now());
  }, []);

  // Live real-time WIB (UTC+7) clock
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear inline error on change
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    const trimmedName = formData.name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      errors.name =
        lang === 'en'
          ? 'Name must be at least 2 characters.'
          : 'Nama wajib diisi minimal 2 karakter.';
    } else if (trimmedName.length > 80) {
      errors.name =
        lang === 'en'
          ? 'Name cannot exceed 80 characters.'
          : 'Nama tidak boleh melebihi 80 karakter.';
    }

    const trimmedEmail = formData.email.trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
    const emailParts = trimmedEmail.split('@');
    const hasValidTld =
      emailParts.length === 2 &&
      emailParts[1].includes('.') &&
      /^[a-zA-Z]{2,24}$/.test(emailParts[1].split('.').pop() || '');

    if (!trimmedEmail || !emailRegex.test(trimmedEmail) || !hasValidTld) {
      errors.email =
        lang === 'en'
          ? 'Please enter a valid email address.'
          : 'Format alamat email tidak valid.';
    }

    if (formData.whatsapp.trim()) {
      const phoneRegex = /^[0-9+\-\s()]{8,25}$/;
      const digits = formData.whatsapp.replace(/\D/g, '');
      if (!phoneRegex.test(formData.whatsapp.trim()) || digits.length < 8 || digits.length > 16) {
        errors.whatsapp =
          lang === 'en'
            ? 'Phone number must be between 8 and 16 digits.'
            : 'Nomor WhatsApp tidak valid (masukkan 8-16 digit angka).';
      }
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage || trimmedMessage.length < 10) {
      errors.message =
        lang === 'en'
          ? 'Message must be at least 10 characters.'
          : 'Isi pesan terlalu singkat (minimal 10 karakter).';
    } else if (trimmedMessage.length > 3000) {
      errors.message =
        lang === 'en'
          ? 'Message cannot exceed 3000 characters.'
          : 'Isi pesan tidak boleh melebihi 3000 karakter.';
    }

    // Client-side malware format heuristic
    const dangerousExtensions = /\.(exe|bat|cmd|sh|ps1|vbs|scr|pif|msi|dll|apk|iso|vhd|jar|hta|wsf|cpl|com|gadget|reg|bin|dmg|pkg)\b/i;
    if (dangerousExtensions.test(trimmedMessage) || dangerousExtensions.test(trimmedName)) {
      errors.message =
        lang === 'en'
          ? 'Message contains prohibited file formats or scripts for security reasons.'
          : 'Pesan mengandung format berkas atau skrip yang dilarang demi alasan keamanan.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const payload = new FormData();
      payload.append('name', formData.name);
      payload.append('email', formData.email);
      payload.append('whatsapp', formData.whatsapp);
      payload.append('message', formData.message);
      payload.append('hp_website', formData.hp_website);
      payload.append('company_fax', formData.company_fax);
      payload.append('client_timestamp', formTimestamp.toString());
      payload.append('lang', lang);

      const res = await sendContactEmail(payload);
      setSubmitStatus(res);

      if (res.success) {
        setFormData({
          name: '',
          email: '',
          whatsapp: '',
          message: '',
          hp_website: '',
          company_fax: '',
        });
        setFieldErrors({});
      } else if (res.fieldErrors) {
        setFieldErrors(res.fieldErrors);
      }
    } catch {
      setSubmitStatus({
        success: false,
        message:
          lang === 'en'
            ? 'Failed to send message. Please try again or email directly.'
            : 'Gagal mengirim pesan. Silakan coba lagi beberapa saat lagi.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetFormState = () => {
    setSubmitStatus(null);
    setFieldErrors({});
    setFormTimestamp(Date.now());
  };

  return (
    <section
      id="contact"
      aria-label="Contact Section"
      className="py-16 sm:py-24 md:py-32 relative border-t border-white/10 bg-transparent overflow-hidden"
    >
      {/* 3D Glacial Ice Fog Mist Effect on Scroll */}
      <IceMistCanvas />
      {/* Ambient Cave Fireflies Effect */}
      <CaveFireflyCanvas />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Section Header Banner */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.15, margin: '-20px 0px -20px 0px' }}
          variants={caveCardVariants}
          custom={0.1}
          className="mb-8 sm:mb-12"
        >
          <span className="text-xs font-mono tracking-widest text-sky-400 font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)] block mb-2">
            {t('contact.eyebrow')}
          </span>
          <h2
            className="text-4xl sm:text-6xl font-black text-3d-silver tracking-tight leading-none"
            style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
          >
            {t('contact.title')}
          </h2>
        </motion.div>

        {/* 2-Column Responsive Layout: Left Info & Channels / Right Direct Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* =========================================================================
              LEFT COLUMN: Info, Value Proposition & Direct Channels (5 cols on lg)
              ========================================================================= */}
          <div className="lg:col-span-5 space-y-4 sm:space-y-6">
            {/* Headline Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={subPanelPopVariants}
              custom={0.2}
              className="p-6 sm:p-7 rounded-2xl bg-[#0b0f19] border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
            >
              <h3
                className="text-2xl sm:text-3xl font-black text-white leading-tight tracking-tight mb-3 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
                style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
              >
                {t('contact.heading1')}
                <br />
                <span className="bg-gradient-to-r from-sky-300 via-cyan-200 to-slate-200 bg-clip-text text-transparent">
                  {t('contact.heading2')}
                </span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-serif-contemporary">
                {t('contact.subheading')}
              </p>
            </motion.div>

            {/* Direct Email Card */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.15 }}
              variants={subPanelPopVariants}
              custom={0.26}
              className="p-5 sm:p-6 rounded-2xl bg-[#0b0f19] border border-white/10 hover:border-sky-400/50 transition-all duration-300 group/email shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
            >
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-12 h-12 rounded-xl bg-[#111726] border border-sky-400/40 flex items-center justify-center text-sky-300 group-hover/email:text-cyan-200 group-hover/email:border-sky-400 transition-colors shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-sky-400 tracking-wider uppercase block">
                    {t('contact.officialEmail')}
                  </span>
                  <a
                    href={`mailto:${emailAddress}`}
                    className="text-sm sm:text-base font-bold text-white group-hover/email:text-sky-200 transition-colors break-all"
                  >
                    {emailAddress}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-[#131b2e] hover:bg-[#1a253e] text-slate-200 hover:text-white border border-white/10 hover:border-sky-400/40 transition-all cursor-pointer active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">{t('contact.emailCopied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-400" />
                      <span>{t('contact.copyEmail')}</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${emailAddress}`}
                  className="inline-flex items-center gap-1 px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#0369a1]/25 hover:bg-[#0284c7]/40 text-sky-300 hover:text-white border border-sky-400/40 transition-all active:scale-95"
                >
                  <span>{t('contact.openMailto')}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Enlarged Professional Channels: LinkedIn & GitHub (Directly beneath Email) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {/* LinkedIn Enlarged Card */}
              <motion.a
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={subPanelPopVariants}
                custom={0.32}
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0b0f19] border border-white/10 hover:border-[#0A66C2]/60 hover:shadow-[0_0_25px_rgba(10,102,194,0.25)] transition-all duration-300 group/li flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-[#0A66C2]/15 border border-[#0A66C2]/40 flex items-center justify-center text-[#0A66C2] group-hover/li:scale-105 transition-transform shadow-[0_0_15px_rgba(10,102,194,0.2)]">
                      <LinkedinIcon className="w-4 h-4 sm:w-6 sm:h-6 fill-current" />
                    </div>
                    <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[8.5px] sm:text-[10px] font-mono font-bold text-sky-400 tracking-wider uppercase bg-sky-950/50 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-sky-400/30">
                      <span>CONNECT</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 group-hover/li:translate-x-0.5 group-hover/li:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-lg font-bold text-white group-hover/li:text-sky-200 transition-colors">
                    {t('contact.linkedin')}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1 line-clamp-2 font-serif-contemporary">
                    {t('contact.linkedinDesc')}
                  </p>
                </div>
                <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 group-hover/li:text-slate-300 transition-colors truncate">
                    in/jovansebastian
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-[#0A66C2] uppercase bg-[#0A66C2]/10 px-1.5 sm:px-2 py-0.5 rounded-md border border-[#0A66C2]/20">
                    Network
                  </span>
                </div>
              </motion.a>

              {/* GitHub Enlarged Card */}
              <motion.a
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={subPanelPopVariants}
                custom={0.38}
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-[#0b0f19] border border-white/10 hover:border-slate-300/60 hover:shadow-[0_0_25px_rgba(255,255,255,0.15)] transition-all duration-300 group/gh flex flex-col justify-between shadow-[0_12px_36px_rgba(0,0,0,0.6)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5 sm:mb-3.5">
                    <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white group-hover/gh:scale-105 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                      <GithubIcon className="w-4 h-4 sm:w-6 sm:h-6 fill-current" />
                    </div>
                    <span className="inline-flex items-center gap-0.5 sm:gap-1 text-[8.5px] sm:text-[10px] font-mono font-bold text-slate-300 group-hover/gh:text-white tracking-wider uppercase bg-zinc-900 px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-md border border-white/15">
                      <span>CODEBASE</span>
                      <ArrowUpRight className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 group-hover/gh:translate-x-0.5 group-hover/gh:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-lg font-bold text-white group-hover/gh:text-sky-200 transition-colors">
                    {t('contact.github')}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-slate-300 mt-1 line-clamp-2 font-serif-contemporary">
                    {t('contact.githubDesc')}
                  </p>
                </div>
                <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 group-hover/gh:text-slate-300 transition-colors truncate">
                    github.com/Jovan-SW
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono font-semibold text-slate-300 uppercase bg-white/10 px-1.5 sm:px-2 py-0.5 rounded-md border border-white/15">
                    Repos
                  </span>
                </div>
              </motion.a>
            </div>

            {/* Availability & Timezone Grid (Below LinkedIn & GitHub) */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-3.5">
              {/* Availability */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={subPanelPopVariants}
                custom={0.44}
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0b0f19] border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <CalendarCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider truncate">
                      {t('contact.availability')}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-sm font-bold text-white leading-snug">
                    {t('contact.availStatus')}
                  </p>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-400 mt-1.5 flex items-center gap-1 sm:gap-1.5">
                  <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400/80 shrink-0" />
                  <span className="truncate">{t('contact.availResponse')}</span>
                </p>
              </motion.div>

              {/* Timezone / Live Clock */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.15 }}
                variants={subPanelPopVariants}
                custom={0.5}
                className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#0b0f19] border border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.6)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                    <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400 shrink-0" />
                    <span className="text-[9px] sm:text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider truncate">
                      {t('contact.timezone')}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-sm font-bold text-white leading-snug">
                    {t('contact.timezoneDetail')}
                  </p>
                </div>
                <p className="text-[10px] sm:text-[11px] text-sky-300/90 font-mono mt-1.5 truncate">
                  {wibTime || 'UTC+7 WIB'}
                </p>
              </motion.div>
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: The 3D Glass Contact Form (7 cols on lg)
              ========================================================================= */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.15 }}
            variants={caveCardVariants}
            custom={0.25}
            className="lg:col-span-7 group relative w-full rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-white/35 via-white/10 to-transparent hover:from-sky-400/80 hover:via-cyan-400/30 transition-colors duration-500"
          >
            {/* Solid Non-Transparent 3D Form Card Body */}
            <div className="relative rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] overflow-hidden bg-[#0b0f19] border border-white/10 hover:border-sky-400/50 border-b-2 border-b-black/80 p-6 sm:p-9 md:p-10 shadow-[0_15px_45px_rgba(0,0,0,0.7)]">
              {/* Specular Top Rim Glint Hairline */}
              <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/60 to-transparent pointer-events-none z-30 group-hover:via-cyan-200 transition-colors duration-300" />

              {/* 3D Cyber Hardware Corner Accents & Rivets */}
              <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-sky-400/70 rounded-tl-sm pointer-events-none group-hover:border-cyan-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-sky-400/70 rounded-br-sm pointer-events-none group-hover:border-cyan-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(56,189,248,0.5)]" />
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-sky-400/70 group-hover:bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)] pointer-events-none transition-colors duration-300 z-30" />
              <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-sky-400/70 group-hover:bg-cyan-300 shadow-[0_0_8px_rgba(56,189,248,0.8)] pointer-events-none transition-colors duration-300 z-30" />

              {/* Form Header */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span className="text-[11px] font-mono tracking-widest text-sky-400 font-bold uppercase drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                    DIRECT INQUIRY
                  </span>
                </div>
                <h3
                  className="text-2xl sm:text-3xl font-black text-white tracking-tight"
                  style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
                >
                  {t('contact.formTitle')}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 font-serif-contemporary">
                  {t('contact.formSubtitle')}
                </p>
              </div>

              {/* Form Content / Success State */}
              <AnimatePresence mode="wait">
                {submitStatus?.success ? (
                  <motion.div
                    key="success-banner"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3 }}
                    className="py-10 sm:py-14 text-center flex flex-col items-center justify-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/15 border-2 border-emerald-400/60 flex items-center justify-center text-emerald-400 shadow-[0_0_25px_rgba(52,211,153,0.3)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>

                    <div className="space-y-1.5 max-w-md">
                      <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {t('contact.successTitle')}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 font-serif-contemporary leading-relaxed">
                        {submitStatus.message || t('contact.successDesc')}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={resetFormState}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-[#131b2e] hover:bg-[#1a253e] text-white border border-white/15 hover:border-sky-400/50 transition-all cursor-pointer shadow-md mt-4 active:scale-95"
                    >
                      <RefreshCw className="w-3.5 h-3.5 text-sky-400" />
                      <span>{t('contact.sendAnother')}</span>
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-4 sm:space-y-5"
                    noValidate
                  >
                    {/* Dual Honeypot Anti-Bot Traps */}
                    <input
                      type="text"
                      name="hp_website"
                      value={formData.hp_website}
                      onChange={handleInputChange}
                      tabIndex={-1}
                      autoComplete="off"
                      style={{ display: 'none' }}
                      aria-hidden="true"
                    />
                    <div
                      className="absolute -left-[9999px] opacity-0 pointer-events-none -z-50 select-none"
                      aria-hidden="true"
                      tabIndex={-1}
                    >
                      <label htmlFor="company_fax">Leave this field blank</label>
                      <input
                        type="text"
                        id="company_fax"
                        name="company_fax"
                        value={formData.company_fax}
                        onChange={handleInputChange}
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    {/* Row 1: Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                        >
                          {t('contact.nameLabel')} <span className="text-sky-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <User className="w-4 h-4" />
                          </div>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleInputChange}
                            placeholder={t('contact.namePlaceholder')}
                            className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#111726] border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                              fieldErrors.name
                                ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                                : 'border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 hover:border-white/25'
                            }`}
                          />
                        </div>
                        {fieldErrors.name && (
                          <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                        >
                          {t('contact.emailLabel')} <span className="text-sky-400">*</span>
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                            <Mail className="w-4 h-4" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder={t('contact.emailPlaceholder')}
                            className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#111726] border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                              fieldErrors.email
                                ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                                : 'border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 hover:border-white/25'
                            }`}
                          />
                        </div>
                        {fieldErrors.email && (
                          <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Row 2: WhatsApp / Phone (Optional) */}
                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="block text-xs font-mono font-bold text-slate-300 mb-1.5 uppercase tracking-wider"
                      >
                        {t('contact.whatsappLabel')}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          id="whatsapp"
                          name="whatsapp"
                          value={formData.whatsapp}
                          onChange={handleInputChange}
                          placeholder={t('contact.whatsappPlaceholder')}
                          className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#111726] border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all ${
                            fieldErrors.whatsapp
                              ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                              : 'border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 hover:border-white/25'
                          }`}
                        />
                      </div>
                      {fieldErrors.whatsapp && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {fieldErrors.whatsapp}
                        </p>
                      )}
                    </div>

                    {/* Row 3: Message Textarea */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label
                          htmlFor="message"
                          className="block text-xs font-mono font-bold text-slate-300 uppercase tracking-wider"
                        >
                          {t('contact.messageLabel')} <span className="text-sky-400">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {formData.message.length}/3000
                        </span>
                      </div>
                      <div className="relative">
                        <div className="absolute top-3.5 left-3.5 pointer-events-none text-slate-400">
                          <MessageSquare className="w-4 h-4" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          maxLength={3000}
                          placeholder={t('contact.messagePlaceholder')}
                          className={`w-full pl-10 pr-3.5 py-3 rounded-xl bg-[#111726] border text-sm text-white placeholder-zinc-500 focus:outline-none transition-all resize-y ${
                            fieldErrors.message
                              ? 'border-rose-500/80 focus:border-rose-400 focus:ring-1 focus:ring-rose-500/40'
                              : 'border-white/15 focus:border-sky-400 focus:ring-1 focus:ring-sky-400/40 hover:border-white/25'
                          }`}
                        />
                      </div>
                      {fieldErrors.message && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {fieldErrors.message}
                        </p>
                      )}
                    </div>

                    {/* Error Banner if API returned error */}
                    {submitStatus?.success === false && (
                      <div className="p-3.5 rounded-xl bg-[#200e17] border border-rose-500/50 text-rose-200 text-xs flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                        <span>{submitStatus.message}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-sky-500 via-cyan-500 to-blue-600 hover:from-sky-400 hover:via-cyan-400 hover:to-blue-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300 shadow-[0_0_24px_rgba(56,189,248,0.35)] hover:shadow-[0_0_32px_rgba(56,189,248,0.55)] cursor-pointer active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                          <span>{t('contact.sendingBtn')}</span>
                        </>
                      ) : (
                        <>
                          <span>{t('contact.submitBtn')}</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

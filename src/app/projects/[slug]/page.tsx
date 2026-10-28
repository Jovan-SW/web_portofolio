import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PROJECTS_DATA, getProjectBySlug } from '@/data/projects';
import ProjectGallery from '@/components/projects/ProjectGallery';
import { GithubIcon } from '@/components/ui/Icons';
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  CheckCircle2,
  Calendar,
  Clock,
  Code2,
  SlidersHorizontal,
  Search,
  ShoppingBag,
  Film,
  Bookmark,
  Scissors,
  Users,
  Zap,
  Star,
  Check,
  AlertCircle,
  Lightbulb,
} from 'lucide-react';
import Footer from '@/components/layout/Footer';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Proyek Tidak Ditemukan | Jovan Portfolio',
    };
  }

  return {
    title: project.seo?.metaTitle || `${project.title} | Studi Kasus Rekayasa Perangkat Lunak`,
    description: project.seo?.metaDescription || project.summary,
    keywords: project.seo?.keywords || [project.title, project.category, 'Full-Stack Developer'],
    openGraph: {
      title: project.title,
      description: project.summary,
      type: 'article',
      images: project.media?.thumbnail?.url ? [{ url: project.media.thumbnail.url }] : undefined,
    },
  };
}

// Helper to safely get repository URL
const getRepoUrl = (repo: any): string | null => {
  if (!repo) return null;
  if (typeof repo === 'string') return repo;
  if (typeof repo === 'object' && repo.url) return repo.url;
  return null;
};

// Helper for rendering feature icon
const renderFeatureIcon = (name: string) => {
  switch (name) {
    case 'SlidersHorizontal':
      return <SlidersHorizontal className="w-5 h-5" />;
    case 'Search':
      return <Search className="w-5 h-5" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-5 h-5" />;
    case 'Film':
      return <Film className="w-5 h-5" />;
    case 'Bookmark':
      return <Bookmark className="w-5 h-5" />;
    case 'Scissors':
      return <Scissors className="w-5 h-5" />;
    case 'Users':
      return <Users className="w-5 h-5" />;
    case 'Zap':
      return <Zap className="w-5 h-5" />;
    case 'CalendarCheck':
      return <Calendar className="w-5 h-5" />;
    case 'Star':
      return <Star className="w-5 h-5" />;
    default:
      return <Sparkles className="w-5 h-5" />;
  }
};

const parseNumberedPoints = (text?: string) => {
  if (!text) return [];
  return text
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const cleaned = line.replace(/^\d+\.\s*/, '');
      const colonIndex = cleaned.indexOf(':');
      if (colonIndex !== -1) {
        return {
          title: cleaned.slice(0, colonIndex).trim(),
          detail: cleaned.slice(colonIndex + 1).trim(),
        };
      }
      return {
        title: '',
        detail: cleaned,
      };
    });
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const repoUrl = getRepoUrl(project.links?.repository);
  const problemPoints = parseNumberedPoints(project.problemStatement);
  const solutionPoints = parseNumberedPoints(project.solution);

  // Other projects for next/prev navigation
  const otherProjects = PROJECTS_DATA.filter((p) => p.slug !== project.slug);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Top Sticky Navigation Bar */}
      <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Kembali ke Portofolio</span>
          </Link>

          <div className="flex items-center gap-3">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-medium transition-all"
                title="Buka Kode Sumber di GitHub"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Source Code</span>
              </a>
            )}
            {project.links?.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
                title="Kunjungi Live Demo Aplikasi"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* Project Header */}
        <section className="flex flex-col gap-6">
          {/* Badges / Pill Meta */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              {project.category}
            </span>
            {project.subCategories?.map((sub) => (
              <span
                key={sub}
                className="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-900 text-zinc-400 border border-zinc-800"
              >
                {sub}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{project.status === 'completed' ? 'Selesai & Produksi' : 'Dalam Pengembangan'}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-zinc-900 text-zinc-400 border border-zinc-800">
              <Clock className="w-3 h-3 text-zinc-500" />
              <span>{project.timeline.duration || '2 Minggu'}</span>
            </span>
          </div>

          {/* Title */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight"
            style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
          >
            {project.title}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="font-serif-contemporary text-lg sm:text-2xl text-zinc-300 leading-relaxed max-w-4xl">
            {project.tagline}
          </p>

          {/* Metadata Grid Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 sm:p-6 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 text-xs sm:text-sm">
            <div>
              <span className="text-zinc-500 block mb-1">Peran Rekayasa</span>
              <strong className="text-white font-medium block">{project.role}</strong>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">Struktur Tim</span>
              <strong className="text-white font-medium block">{project.teamSize || 'Solo Creator'}</strong>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">Linimasa Waktu</span>
              <strong className="text-white font-medium block">
                {project.timeline.startDate} — {project.timeline.endDate || 'Selesai'}
              </strong>
            </div>
            <div>
              <span className="text-zinc-500 block mb-1">Akses Langsung</span>
              <div className="flex items-center gap-3 pt-0.5">
                {project.links.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
                  >
                    <span>Kunjungi Demo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {repoUrl && (
                  <a
                    href={repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-400 hover:text-zinc-200 font-medium inline-flex items-center gap-1"
                  >
                    <span>GitHub</span>
                    <GithubIcon className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quantifiable Impact Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Metrik & Tolok Ukur Kunci</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((metric, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between"
                >
                  <div className="text-2xl sm:text-3xl font-black text-white font-mono mb-2 text-indigo-300">
                    {metric.value}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-200 mb-1">{metric.label}</h3>
                    {metric.description && (
                      <p className="text-xs text-zinc-400 leading-relaxed">{metric.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Visual Showcase (Interactive Gallery) */}
        {project.media?.gallery && project.media.gallery.length > 0 && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
              <div>
                <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Galeri Tangkapan Layar & Antarmuka</span>
                </h2>
                <p className="text-xs text-zinc-400 mt-1">
                  Eksplorasi seluruh komponen visual, tata letak responsif, dan alur pengalaman pengguna aplikasi.
                </p>
              </div>
            </div>

            <ProjectGallery gallery={project.media.gallery} title={project.title} />
          </section>
        )}

        {/* Project Overview & Architecture */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
                Ringkasan Proyek
              </h2>
              <div className="font-serif-contemporary text-zinc-300 text-base sm:text-lg leading-[1.8] space-y-4">
                <p>{project.description || project.summary}</p>
              </div>
            </div>

            {/* Responsibilities */}
            {project.responsibilities && project.responsibilities.length > 0 && (
              <div className="pt-4 border-t border-zinc-900">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Tanggung Jawab Teknis:
                </h3>
                <ul className="space-y-2 text-sm text-zinc-400">
                  {project.responsibilities.map((resp, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Architecture Callout Card */}
          {project.architectureOverview && (
            <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-4">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Arsitektur Sistem</span>
                </div>
                <h3 className="text-base font-bold text-white mb-3">
                  Fondasi & Pendekatan Rekayasa
                </h3>
                <p className="font-serif-contemporary text-zinc-400 text-sm leading-[1.8]">
                  {project.architectureOverview}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center gap-2 text-xs text-zinc-500">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Dirancang untuk performa & skalabilitas</span>
              </div>
            </div>
          )}
        </section>

        {/* Problem & Solution Breakdown */}
        {(problemPoints.length > 0 || solutionPoints.length > 0) && (
          <section className="space-y-8">
            <div>
              <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                Studi Kasus Rekayasa
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Identifikasi Masalah & Solusi Arsitektural
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Problem Column */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-rose-500/20 relative overflow-hidden">
                <div className="flex items-center gap-2.5 text-rose-400 font-semibold text-sm mb-6 pb-4 border-b border-rose-500/10">
                  <AlertCircle className="w-4 h-4" />
                  <span>Tantangan & Titik Friksi Masalah</span>
                </div>

                <div className="space-y-5">
                  {problemPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-6 h-6 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        {point.title && (
                          <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                            {point.title}
                          </h4>
                        )}
                        <p className="font-serif-contemporary text-zinc-400 text-sm leading-relaxed">
                          {point.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Solution Column */}
              <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-emerald-500/20 relative overflow-hidden">
                <div className="flex items-center gap-2.5 text-emerald-400 font-semibold text-sm mb-6 pb-4 border-b border-emerald-500/10">
                  <Lightbulb className="w-4 h-4" />
                  <span>Pendekatan & Solusi Rekayasa</span>
                </div>

                <div className="space-y-5">
                  {solutionPoints.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-3.5">
                      <span className="w-6 h-6 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center text-xs font-mono font-bold flex-shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <div>
                        {point.title && (
                          <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                            {point.title}
                          </h4>
                        )}
                        <p className="font-serif-contemporary text-zinc-400 text-sm leading-relaxed">
                          {point.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Engineering Challenges Conquered */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                Hambatan Teknis Nyata
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Tantangan Algoritma & Rekayasa Solusi
              </h3>
            </div>

            <div className="space-y-4">
              {project.challenges.map((challenge, cIdx) => (
                <div
                  key={cIdx}
                  className="p-6 sm:p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 space-y-4"
                >
                  <h4 className="text-lg font-bold text-white">{challenge.title}</h4>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-zinc-950/60 border border-rose-500/20">
                      <span className="text-xs font-mono font-semibold text-rose-400 block mb-1">
                        Kendala / Masalah:
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-serif-contemporary">
                        {challenge.problem}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-zinc-950/60 border border-indigo-500/20">
                      <span className="text-xs font-mono font-semibold text-indigo-400 block mb-1">
                        Solusi Implementasi:
                      </span>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-serif-contemporary">
                        {challenge.solution}
                      </p>
                    </div>

                    {challenge.result && (
                      <div className="p-4 rounded-xl bg-zinc-950/60 border border-emerald-500/20">
                        <span className="text-xs font-mono font-semibold text-emerald-400 block mb-1">
                          Hasil Terverifikasi:
                        </span>
                        <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-serif-contemporary">
                          {challenge.result}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Key Features Grid */}
        {project.features && project.features.length > 0 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                Fitur & Kapabilitas
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Fitur Utama yang Diimplementasikan
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.features.map((feat, fIdx) => (
                <div
                  key={fIdx}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                      {renderFeatureIcon(feat.icon || '')}
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
                    <p className="font-serif-contemporary text-zinc-400 text-xs sm:text-sm leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Tech Stack & Architectural Rationale */}
        {project.techStack && project.techStack.length > 0 && (
          <section className="space-y-6">
            <div>
              <h2 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                Tech Stack & Dependency
              </h2>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Teknologi yang Digunakan & Alasan Pemilihan
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.techStack.map((tech, tIdx) => (
                <div
                  key={tIdx}
                  className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/80 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-bold text-zinc-200 text-sm font-mono flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                      {tech.name}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-zinc-800 text-zinc-400">
                      {tech.category}
                    </span>
                  </div>
                  {tech.purpose && (
                    <p className="text-xs text-zinc-400 leading-relaxed">{tech.purpose}</p>
                  )}
                </div>
              ))}
            </div>

            {/* Tags Strip */}
            {project.tags && project.tags.length > 0 && (
              <div className="pt-4 flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500 mr-2">Kata Kunci:</span>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-zinc-900 text-zinc-400 border border-zinc-800"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Key Engineering Learnings */}
        {project.keyLearnings && project.keyLearnings.length > 0 && (
          <section className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>Pelajaran Teknis Utama (Engineering Takeaways)</span>
            </h3>
            <ul className="space-y-2.5 text-zinc-300 font-serif-contemporary text-sm sm:text-base leading-relaxed">
              {project.keyLearnings.map((learning, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-indigo-400 font-mono font-bold mt-0.5">•</span>
                  <span>{learning}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Switcher: Explore Other Projects */}
        <section className="pt-8 border-t border-zinc-900 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white tracking-tight">
              Eksplorasi Proyek Lainnya
            </h3>
            <Link
              href="/#projects"
              className="text-xs sm:text-sm text-indigo-400 hover:text-indigo-300 font-medium inline-flex items-center gap-1"
            >
              <span>Semua Proyek</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {otherProjects.map((other) => (
              <Link
                key={other.id}
                href={`/projects/${other.slug}`}
                className="group p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 hover:border-zinc-700 transition-all flex items-center gap-4 hover:shadow-xl"
              >
                {other.media?.thumbnail?.url && (
                  <div className="relative w-24 h-20 rounded-xl overflow-hidden bg-zinc-950 flex-shrink-0">
                    <Image
                      src={other.media.thumbnail.url}
                      alt={other.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-mono text-indigo-400 block mb-1">
                    {other.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-indigo-300 transition-colors truncate">
                    {other.title}
                  </h4>
                  <p className="text-xs text-zinc-400 line-clamp-1 mt-1 font-serif-contemporary">
                    {other.tagline}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-zinc-500 group-hover:text-white group-hover:translate-x-1 transition-all flex-shrink-0" />
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

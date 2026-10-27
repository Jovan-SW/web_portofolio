'use client';

import { useState } from 'react';
import Image from 'next/image';
import { PROJECTS_DATA } from '@/data/projects';
import { Project } from '@/types';
import {
  ExternalLink,
  Layers,
  Sparkles,
  X,
  CheckCircle2,
  Calendar,
  Clock,
  ArrowRight,
  Code,
  SlidersHorizontal,
  Search,
  ShoppingBag,
  Film,
  Bookmark,
  Scissors,
  MapPin,
  Star,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

const CATEGORIES = ['Semua', 'Full-Stack', 'Frontend', 'UI/UX Design'];

// Helper to render icons based on icon string name
const renderFeatureIcon = (name: string) => {
  switch (name) {
    case 'SlidersHorizontal':
      return <SlidersHorizontal className="w-3.5 h-3.5" />;
    case 'Search':
      return <Search className="w-3.5 h-3.5" />;
    case 'ShoppingBag':
      return <ShoppingBag className="w-3.5 h-3.5" />;
    case 'Film':
      return <Film className="w-3.5 h-3.5" />;
    case 'Bookmark':
      return <Bookmark className="w-3.5 h-3.5" />;
    case 'Scissors':
      return <Scissors className="w-3.5 h-3.5" />;
    case 'MapPin':
      return <MapPin className="w-3.5 h-3.5" />;
    case 'Star':
      return <Star className="w-3.5 h-3.5" />;
    default:
      return <Sparkles className="w-3.5 h-3.5" />;
  }
};

// Helper to safely get repository URL
const getRepoUrl = (repo: any): string | null => {
  if (!repo) return null;
  if (typeof repo === 'string') return repo;
  if (typeof repo === 'object' && repo.url) return repo.url;
  return null;
};

export default function ProjectSection() {
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (selectedCategory === 'Semua') return true;
    if (project.category === selectedCategory) return true;
    return project.subCategories?.includes(selectedCategory as any);
  });

  return (
    <section
      id="project"
      aria-label="Project Section"
      className="py-24 relative border-t border-zinc-900"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4">
            Studi Kasus & Portofolio Proyek
          </h2>
          <p className="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed">
            Kumpulan aplikasi web produksi yang dirancang dengan perhatian mendalam terhadap arsitektur teknis, keandalan fungsional, dan estetika antarmuka.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-semibold'
                    : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const thumbnailUrl = project.media?.thumbnail?.url;
            const thumbnailAlt = project.media?.thumbnail?.alt || project.title;
            const repoUrl = getRepoUrl(project.links?.repository);

            return (
              <article
                key={project.id}
                className="group flex flex-col rounded-3xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-zinc-700 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300"
              >
                {/* Media / Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950">
                  {thumbnailUrl ? (
                    <Image
                      src={thumbnailUrl}
                      alt={thumbnailAlt}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-950 text-zinc-600">
                      <Code className="w-12 h-12" />
                    </div>
                  )}

                  {/* Badges Overlay */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-medium font-mono bg-zinc-950/80 backdrop-blur-md text-indigo-300 border border-white/10">
                      {project.category}
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-950/80 backdrop-blur-md text-emerald-400 border border-white/10">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      {project.status === 'completed' ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors mb-2">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm line-clamp-2 mb-4 leading-relaxed">
                    {project.tagline || project.summary}
                  </p>

                  {/* Feature preview */}
                  {project.features && project.features.length > 0 && (
                    <div className="mb-5 space-y-1.5">
                      {project.features.slice(0, 2).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-400">
                          <span className="text-indigo-400 flex-shrink-0">
                            {renderFeatureIcon(feat.icon || '')}
                          </span>
                          <span className="truncate">{feat.title}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mt-auto mb-6">
                    {project.techStack?.slice(0, 4).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="px-2 py-0.5 rounded text-[11px] font-mono bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                      >
                        {tech.name}
                      </span>
                    ))}
                    {(project.techStack?.length || 0) > 4 && (
                      <span className="px-1.5 py-0.5 rounded text-[11px] font-mono bg-zinc-800/40 text-zinc-500">
                        +{(project.techStack?.length || 0) - 4}
                      </span>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveModalProject(project)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      <span>Lihat Detail</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center gap-2">
                      {repoUrl && (
                        <a
                          href={repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
                          aria-label="GitHub Repository"
                          title="Lihat Kode di GitHub"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {project.links?.demo && (
                        <a
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white border border-indigo-500/30 transition-colors"
                          aria-label="Live Demo"
                          title="Buka Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeModalProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in"
        >
          <div className="relative w-full max-w-3xl my-8 rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-zinc-800 flex items-start justify-between gap-4 sticky top-0 bg-zinc-900/95 backdrop-blur-sm z-10">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    {activeModalProject.category}
                  </span>
                  <span className="text-xs text-zinc-500">•</span>
                  <span className="text-xs text-zinc-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    {activeModalProject.timeline?.duration || 'Completed'}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white">{activeModalProject.title}</h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup Dialog"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-zinc-300 text-sm leading-relaxed">
              {/* Tagline & Summary */}
              <div>
                <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                  Ringkasan Proyek
                </h4>
                <p className="text-base text-zinc-200 mb-2 font-medium">
                  {activeModalProject.tagline}
                </p>
                <p className="text-zinc-400 leading-relaxed">
                  {activeModalProject.summary || activeModalProject.description}
                </p>
              </div>

              {/* Architecture Overview */}
              {activeModalProject.architectureOverview && (
                <div className="p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80">
                  <h4 className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" />
                    Arsitektur & Pendekatan Teknis
                  </h4>
                  <p className="text-zinc-400">{activeModalProject.architectureOverview}</p>
                </div>
              )}

              {/* Challenges & Solution */}
              {activeModalProject.challenges && activeModalProject.challenges.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-3">
                    Tantangan & Solusi Rekayasa
                  </h4>
                  <div className="space-y-3">
                    {activeModalProject.challenges.map((c, i) => (
                      <div key={i} className="p-4 rounded-xl bg-zinc-800/40 border border-zinc-800">
                        <div className="font-semibold text-white mb-1">{c.title}</div>
                        <div className="text-xs text-zinc-400 mb-2">
                          <strong className="text-rose-400">Masalah:</strong> {c.problem}
                        </div>
                        <div className="text-xs text-zinc-300 mb-1">
                          <strong className="text-emerald-400">Solusi:</strong> {c.solution}
                        </div>
                        {c.result && (
                          <div className="text-xs text-zinc-400">
                            <strong className="text-indigo-400">Hasil:</strong> {c.result}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack List */}
              {activeModalProject.techStack && (
                <div>
                  <h4 className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-2">
                    Teknologi yang Digunakan
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {activeModalProject.techStack.map((tech, i) => (
                      <div
                        key={i}
                        className="p-2.5 rounded-lg bg-zinc-800/50 border border-zinc-800 flex flex-col"
                      >
                        <span className="font-semibold text-zinc-200 text-xs">{tech.name}</span>
                        <span className="text-[10px] text-zinc-400 truncate">{tech.purpose}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-6 border-t border-zinc-800 bg-zinc-900/90 flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="px-4 py-2 rounded-lg text-sm text-zinc-400 hover:text-white transition-colors"
              >
                Tutup
              </button>

              <div className="flex items-center gap-3">
                {getRepoUrl(activeModalProject.links?.repository) && (
                  <a
                    href={getRepoUrl(activeModalProject.links?.repository)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Repository</span>
                  </a>
                )}
                {activeModalProject.links?.demo && (
                  <a
                    href={activeModalProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-md shadow-indigo-600/30"
                  >
                    <span>Buka Demo</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

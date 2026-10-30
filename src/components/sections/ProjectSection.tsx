'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PROJECTS_DATA } from '@/data/projects';
import { Project } from '@/types';
import { CardStack, CardStackItem } from '@/components/ui/card-stack';
import {
  ExternalLink,
  Sparkles,
  ArrowRight,
  Clock,
  Code2,
  CheckCircle2,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import { GithubIcon } from '@/components/ui/Icons';

type PortfolioCardItem = CardStackItem & {
  project: Project;
};

// Helper to safely get repository URL
const getRepoUrl = (repo: any): string | null => {
  if (!repo) return null;
  if (typeof repo === 'string') return repo;
  if (typeof repo === 'object' && repo.url) return repo.url;
  return null;
};

export default function ProjectSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Map the featured projects to CardStackItem format with updated categories
  const cardItems: PortfolioCardItem[] = PROJECTS_DATA.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.tagline || project.summary,
    imageSrc: project.media?.thumbnail?.url || '/projects/jovique/thumbnail.png',
    href: `/projects/${project.slug}`,
    tag: project.category,
    project,
  }));

  const activeProject = cardItems[activeIndex]?.project || PROJECTS_DATA[0];
  const activeRepoUrl = getRepoUrl(activeProject.links?.repository);

  return (
    <section
      id="projects"
      aria-label="Project Section"
      className="py-24 relative border-t border-zinc-900 overflow-hidden"
    >
      {/* Anchor alias for backwards compatibility */}
      <div id="project" className="absolute -top-24 pointer-events-none" />

      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/10 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10 sm:mb-14">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4"
            style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
          >
            Studi Kasus & Portofolio
          </h2>

          <p className="max-w-2xl text-zinc-400 text-base sm:text-lg leading-relaxed font-serif-contemporary">
            Jelajahi karya produksi pilihan yang dibangun dengan perhatian mendalam terhadap arsitektur web modern, kinerja maksimal, dan pengalaman pengguna presisi.
          </p>
        </div>

        {/* 3D Card Stack Component */}
        <div className="w-full mb-12">
          <CardStack<PortfolioCardItem>
            items={cardItems}
            initialIndex={0}
            cardWidth={560}
            cardHeight={350}
            overlap={0.46}
            spreadDeg={34}
            perspectivePx={1200}
            depthPx={130}
            tiltXDeg={10}
            activeLiftPx={22}
            activeScale={1.03}
            inactiveScale={0.93}
            springStiffness={280}
            springDamping={28}
            loop={true}
            autoAdvance={false}
            showDots={true}
            onChangeIndex={(index) => setActiveIndex(index)}
            renderCard={(item, { active }) => {
              const { project } = item;
              const repoUrl = getRepoUrl(project.links?.repository);
              const projectUrl = `/projects/${project.slug}`;

              return (
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-zinc-950 flex flex-col justify-between p-5 sm:p-6 border border-zinc-700/60 shadow-2xl">
                  {/* Background Screenshot Image */}
                  <div className="absolute inset-0 z-0">
                    {project.media?.thumbnail?.url ? (
                      <Image
                        src={project.media.thumbnail.url}
                        alt={project.title}
                        fill
                        className="object-cover object-top filter brightness-[0.7] contrast-[1.05]"
                        sizes="560px"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-900" />
                    )}
                    {/* Deep gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-zinc-950/30" />
                  </div>

                  {/* Top Header inside Card */}
                  <div className="relative z-10 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium bg-zinc-950/80 backdrop-blur-md text-indigo-300 border border-white/10">
                        {project.category}
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-950/80 backdrop-blur-md text-emerald-400 border border-white/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>Completed</span>
                      </span>
                    </div>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-mono bg-zinc-950/80 backdrop-blur-md text-zinc-400 border border-white/10">
                      <Clock className="w-3 h-3 text-zinc-500" />
                      <span>{project.timeline.duration || '2 Minggu'}</span>
                    </span>
                  </div>

                  {/* Bottom Content inside Card */}
                  <div className="relative z-10 flex flex-col pt-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1.5 group-hover:text-indigo-300 transition-colors">
                      {project.title}
                    </h3>

                    <p className="font-serif-contemporary text-zinc-300 text-xs sm:text-sm line-clamp-2 mb-3.5 leading-relaxed">
                      {project.tagline || project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.techStack?.slice(0, 3).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-900/90 text-zinc-300 border border-zinc-700/60 backdrop-blur-sm"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {(project.techStack?.length || 0) > 3 && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-zinc-900/60 text-zinc-500">
                          +{(project.techStack?.length || 0) - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-3">
                      <Link
                        href={projectUrl}
                        className="group/btn inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                        onClick={(e) => {
                          // Allow natural navigation without stopping event propagation if active
                          if (!active) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <span>Lihat Studi Kasus</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>

                      <div className="flex items-center gap-2">
                        {repoUrl && (
                          <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 transition-colors"
                            aria-label="GitHub Repository"
                            title="Buka Repositori GitHub"
                          >
                            <GithubIcon className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {project.links?.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-700/60 transition-colors"
                            aria-label="Live Demo"
                            title="Buka Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }}
          />
        </div>

        {/* Synchronized Active Project Detail & Metrics Bar */}
        <div className="mt-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 p-6 sm:p-8 backdrop-blur-md relative overflow-hidden shadow-2xl">
          {/* Subtle top indicator line */}
          <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Left 2 Cols: Architectural Highlight & Project Info */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {activeProject.category}
                </span>
                <span className="text-xs text-zinc-500">•</span>
                <span className="text-xs text-zinc-400 font-medium">{activeProject.role}</span>
              </div>

              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                  {activeProject.title}
                </h3>
                <p className="font-serif-contemporary text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {activeProject.description || activeProject.summary}
                </p>
              </div>

              {/* Architecture callout */}
              {activeProject.architectureOverview && (
                <div className="p-4 rounded-xl bg-zinc-950/60 border border-zinc-800/80 flex items-start gap-3">
                  <Code2 className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    <strong className="text-zinc-200">Arsitektur Rekayasa:</strong>{' '}
                    {activeProject.architectureOverview}
                  </p>
                </div>
              )}

              {/* Action row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href={`/projects/${activeProject.slug}`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <span>Buka Halaman Studi Kasus Lengkap</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {activeProject.links?.demo && (
                  <a
                    href={activeProject.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-sm font-medium border border-zinc-700/60 transition-all"
                  >
                    <span>Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {activeRepoUrl && (
                  <a
                    href={activeRepoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white text-sm font-medium border border-zinc-700/60 transition-all"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right 1 Col: Quantifiable Metrics Highlight */}
            <div className="space-y-3 lg:border-l lg:border-zinc-800/80 lg:pl-8">
              <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider block mb-2">
                Metrik Utama Proyek
              </span>

              {activeProject.metrics?.map((metric, mIdx) => (
                <div
                  key={mIdx}
                  className="p-3.5 rounded-xl bg-zinc-950/50 border border-zinc-800/60 flex items-center justify-between"
                >
                  <div>
                    <span className="text-xs text-zinc-400 block">{metric.label}</span>
                    <strong className="text-sm font-bold text-white font-mono">
                      {metric.value}
                    </strong>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

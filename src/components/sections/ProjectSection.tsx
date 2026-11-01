'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getLocalizedProjects } from '@/data/projects';
import { useLanguage } from '@/context/LanguageContext';
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
import CaveFireflyCanvas from '@/components/ui/CaveFireflyCanvas';

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
  const { lang, t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const localizedProjects = getLocalizedProjects(lang);

  // Map the featured projects to CardStackItem format with updated categories
  const cardItems: PortfolioCardItem[] = localizedProjects.map((project) => ({
    id: project.id,
    title: project.title,
    description: project.tagline || project.summary,
    imageSrc: project.media?.thumbnail?.url || '/projects/jovique/thumbnail.png',
    href: `/projects/${project.slug}`,
    tag: project.category,
    project,
  }));

  const activeProject = cardItems[activeIndex]?.project || localizedProjects[0];
  const activeRepoUrl = getRepoUrl(activeProject.links?.repository);

  return (
    <section
      id="projects"
      aria-label="Project Section"
      className="py-14 sm:py-24 relative overflow-hidden"
    >
      {/* Ambient Cave Fireflies Effect */}
      <CaveFireflyCanvas />

      {/* Anchor alias for backwards compatibility */}
      <div id="project" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6 sm:mb-14">
          <h2
            className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2 sm:mb-4"
            style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
          >
            {t('projects.sectionTitle')}
          </h2>

          <p className="max-w-2xl text-xs sm:text-lg text-white font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] [text-shadow:0_1px_3px_rgba(0,0,0,1),0_2px_14px_rgba(0,0,0,0.9)] font-serif-contemporary">
            {t('projects.sectionSubtitle')}
          </p>
        </div>

        {/* 3D Card Stack Component - Compact & Smooth Swiping on Mobile */}
        <div className="w-full mb-8 sm:mb-12">
          <CardStack<PortfolioCardItem>
            items={cardItems}
            initialIndex={0}
            cardWidth={isMobile ? 305 : 560}
            cardHeight={isMobile ? 230 : 350}
            overlap={isMobile ? 0.38 : 0.46}
            spreadDeg={isMobile ? 20 : 34}
            perspectivePx={isMobile ? 850 : 1200}
            depthPx={isMobile ? 70 : 130}
            tiltXDeg={isMobile ? 8 : 10}
            activeLiftPx={isMobile ? 12 : 22}
            activeScale={isMobile ? 1.02 : 1.03}
            inactiveScale={isMobile ? 0.92 : 0.93}
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
                <div className="relative h-full w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-b from-zinc-700/95 via-zinc-800/95 to-zinc-800/95 flex flex-col justify-between p-2.5 sm:p-4 border-2 border-zinc-400/60 shadow-2xl">
                  {/* Background Screenshot Image */}
                  <div className="absolute inset-0 z-0">
                    {project.media?.thumbnail?.url ? (
                      <Image
                        src={project.media.thumbnail.url}
                        alt={project.title}
                        fill
                        className="object-cover object-top filter brightness-[0.72] contrast-[1.1]"
                        sizes="(max-width: 768px) 310px, 560px"
                      />
                    ) : (
                      <div className="w-full h-full bg-zinc-700" />
                    )}
                    {/* Refined grey gradient overlay with bottom contrast scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-800/50 to-zinc-700/30" />
                  </div>

                  {/* Top Header inside Card */}
                  <div className="relative z-10 flex items-center justify-between gap-1.5 sm:gap-2">
                    <span className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-zinc-950/85 backdrop-blur-md text-white border border-white/20 shadow-md">
                      {project.category}
                    </span>

                    <span className="inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-mono font-bold bg-zinc-950/85 backdrop-blur-md text-white border border-white/20 shadow-md">
                      <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-zinc-300" />
                      <span>{project.timeline.duration || (lang === 'en' ? '2 Weeks' : '2 Minggu')}</span>
                    </span>
                  </div>

                  {/* Bottom Content inside Card with High-Contrast Frosted Glass Container */}
                  <div className="relative z-10 flex flex-col p-2.5 sm:p-4 rounded-lg sm:rounded-xl bg-zinc-950/85 backdrop-blur-md border border-white/15 shadow-xl">
                    <h3 className="text-sm sm:text-2xl font-black text-white tracking-tight mb-0.5 sm:mb-1 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] [text-shadow:0_1px_3px_rgba(0,0,0,1)] group-hover:text-zinc-100 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-zinc-100 text-[10.5px] sm:text-sm line-clamp-1 sm:line-clamp-2 mb-2 sm:mb-3 leading-relaxed font-normal drop-shadow-[0_1px_2px_rgba(0,0,0,0.85)]">
                      {project.tagline || project.summary}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-2 sm:mb-3">
                      {project.techStack?.slice(0, 3).map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-1.5 sm:px-2.5 py-0.5 rounded text-[9.5px] sm:text-[11px] font-mono font-semibold bg-zinc-800 text-white border border-white/20 backdrop-blur-sm shadow-sm"
                        >
                          {tech.name}
                        </span>
                      ))}
                      {(project.techStack?.length || 0) > 3 && (
                        <span className="px-1 sm:px-1.5 py-0.5 rounded text-[9.5px] sm:text-[11px] font-mono font-medium bg-zinc-800/80 text-zinc-300 border border-white/10">
                          +{(project.techStack?.length || 0) - 3}
                        </span>
                      )}
                    </div>

                    {/* Action Bar */}
                    <div className="pt-2 sm:pt-2.5 border-t border-white/15 flex items-center justify-between gap-2 sm:gap-3">
                      <Link
                        href={projectUrl}
                        className="group/btn inline-flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-md sm:rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] sm:text-xs font-bold shadow-md shadow-indigo-600/30 transition-all cursor-pointer"
                        onClick={(e) => {
                          // Allow natural navigation without stopping event propagation if active
                          if (!active) {
                            e.preventDefault();
                          }
                        }}
                      >
                        <span>{t('projects.viewCaseStudyShort')}</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>

                      <div className="flex items-center gap-1.5 sm:gap-2">
                        {repoUrl && (
                          <a
                            href={repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white border border-white/20 transition-colors shadow-sm"
                            aria-label="GitHub Repository"
                            title={lang === 'en' ? 'Open GitHub Repository' : 'Buka Repositori GitHub'}
                          >
                            <GithubIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                          </a>
                        )}
                        {project.links?.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 sm:p-1.5 rounded-md sm:rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 hover:text-white border border-white/20 transition-colors shadow-sm"
                            aria-label="Live Demo"
                            title={lang === 'en' ? 'Open Live Demo' : 'Buka Live Demo'}
                          >
                            <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
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

        {/* Synchronized Active Project Detail & Metrics Bar (Hover in Dark Grey / Abu-abu Tua) */}
        <div className="mt-8 group relative w-full rounded-2xl sm:rounded-3xl p-[1px] bg-gradient-to-b from-white/20 via-white/10 to-transparent hover:from-zinc-500/70 hover:via-zinc-700/40 hover:to-transparent transition-colors duration-300">
          <div className="relative rounded-[calc(1rem-1px)] sm:rounded-[calc(1.5rem-1px)] overflow-hidden bg-black/35 hover:bg-zinc-950/85 transition-all duration-300 card-3d-glass-darkgrey border border-white/10 hover:border-zinc-500/60 border-b-2 border-b-black/60 p-6 sm:p-8">
            {/* Specular Top Rim Glint Hairline */}
            <div className="absolute top-0 inset-x-8 h-[1px] bg-gradient-to-r from-transparent via-white/35 to-transparent pointer-events-none z-30 group-hover:via-zinc-300 transition-colors duration-300" />

            {/* 3D Cyber Hardware Corner Accents & Rivets in Dark Grey */}
            <div className="absolute top-3 left-3 w-2.5 h-2.5 border-t-2 border-l-2 border-zinc-500/70 rounded-tl-sm pointer-events-none group-hover:border-zinc-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(113,113,122,0.4)]" />
            <div className="absolute bottom-3 right-3 w-2.5 h-2.5 border-b-2 border-r-2 border-zinc-500/70 rounded-br-sm pointer-events-none group-hover:border-zinc-300 transition-colors duration-300 z-30 shadow-[0_0_8px_rgba(113,113,122,0.4)]" />
            <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-zinc-500/70 group-hover:bg-zinc-300 shadow-[0_0_8px_rgba(113,113,122,0.6)] pointer-events-none transition-colors duration-300 z-30" />
            <div className="absolute bottom-3 left-3 w-1.5 h-1.5 rounded-full bg-zinc-500/70 group-hover:bg-zinc-300 shadow-[0_0_8px_rgba(113,113,122,0.6)] pointer-events-none transition-colors duration-300 z-30" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
              {/* Left 2 Cols: Architectural Highlight & Project Info */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-2.5">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-black/45 text-zinc-300 border border-zinc-600/40 shadow-sm group-hover:border-zinc-400/60 group-hover:text-zinc-100 transition-colors">
                    {activeProject.category}
                  </span>
                  <span className="text-xs text-zinc-500">•</span>
                  <span className="text-xs text-zinc-300 font-medium group-hover:text-zinc-100 transition-colors">{activeProject.role}</span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2 drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)] group-hover:text-white transition-colors duration-300">
                    {activeProject.title}
                  </h3>
                  <p className="font-serif-contemporary text-zinc-200 group-hover:text-zinc-100 text-sm sm:text-base leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] transition-colors duration-300">
                    {activeProject.description || activeProject.summary}
                  </p>
                </div>

                {/* Architecture callout with interactive dark grey hover */}
                {activeProject.architectureOverview && (
                  <div className="group/arch p-4 rounded-xl bg-black/35 hover:bg-zinc-900/80 border border-white/10 hover:border-zinc-500/60 card-3d-glass-darkgrey flex items-start gap-3 transition-all duration-300 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                    <Code2 className="w-4 h-4 text-zinc-400 group-hover/arch:text-zinc-200 group-hover/arch:scale-110 flex-shrink-0 mt-0.5 transition-all duration-300" />
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                      <strong className="text-zinc-100 group-hover/arch:text-white font-semibold transition-colors">{t('projects.architectureTitle')}</strong>{' '}
                      <span className="group-hover/arch:text-zinc-200 transition-colors">{activeProject.architectureOverview}</span>
                    </p>
                  </div>
                )}

                {/* Action row */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={`/projects/${activeProject.slug}`}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-200 hover:bg-white text-zinc-950 text-sm font-semibold shadow-lg shadow-black/40 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    <span>{t('projects.viewCaseStudy')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {activeProject.links?.demo && (
                    <a
                      href={activeProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black/40 hover:bg-zinc-800 text-zinc-200 hover:text-white text-sm font-medium border border-white/15 hover:border-zinc-500/60 transition-all shadow-md hover:shadow-[0_0_15px_rgba(113,113,122,0.4)]"
                    >
                      <span>{t('projects.liveDemo')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {activeRepoUrl && (
                    <a
                      href={activeRepoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-black/40 hover:bg-zinc-800 text-zinc-200 hover:text-white text-sm font-medium border border-white/15 hover:border-zinc-500/60 transition-all shadow-md hover:shadow-[0_0_15px_rgba(113,113,122,0.4)]"
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>{t('projects.github')}</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right 1 Col: Quantifiable Metrics Highlight in Dark Grey */}
              <div className="space-y-3 lg:border-l lg:border-white/10 lg:pl-8">
                <span className="text-xs font-semibold text-zinc-400 group-hover:text-zinc-300 uppercase tracking-wider block mb-2 font-mono transition-colors">
                  {t('projects.metricsHeader')}
                </span>

                {activeProject.metrics?.map((metric, mIdx) => (
                  <div
                    key={mIdx}
                    className="group/metric p-3.5 rounded-xl bg-black/35 hover:bg-zinc-900/80 border border-white/10 hover:border-zinc-500/60 card-3d-glass-darkgrey flex items-center justify-between transition-all duration-300 hover:scale-[1.02] shadow-[0_4px_16px_rgba(0,0,0,0.3)] cursor-default"
                  >
                    <div>
                      <span className="text-xs text-zinc-400 group-hover/metric:text-zinc-300 font-medium block transition-colors">
                        {metric.label}
                      </span>
                      <strong className="text-sm font-bold text-white group-hover/metric:text-zinc-100 font-mono drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] transition-colors">
                        {metric.value}
                      </strong>
                    </div>
                    <span className="w-2 h-2 rounded-full bg-zinc-400 group-hover/metric:bg-zinc-200 shadow-[0_0_8px_rgba(161,161,170,0.7)] group-hover/metric:shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-300" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

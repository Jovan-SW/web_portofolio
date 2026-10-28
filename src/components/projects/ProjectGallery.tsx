'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryItem } from '@/types';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Layers,
} from 'lucide-react';

interface ProjectGalleryProps {
  gallery: GalleryItem[];
  title: string;
}

export default function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const activeItem = gallery[selectedIndex] || gallery[0];

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setSelectedIndex((prev) => (prev === gallery.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setLightboxOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gallery.length]);

  if (!gallery || gallery.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-5">
      {/* Main Active Screenshot Showcase */}
      <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden border border-zinc-800/80 bg-zinc-950/70 shadow-2xl">
        {/* Subtle top crystal line */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent z-10 pointer-events-none" />

        {/* Main Image Display */}
        <div
          className="relative w-full aspect-[16/10] sm:aspect-[16/9] cursor-zoom-in overflow-hidden bg-zinc-950 flex items-center justify-center"
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setLightboxOpen(true)}
          aria-label={`Perbesar gambar ${selectedIndex + 1}: ${activeItem.alt}`}
        >
          <Image
            src={activeItem.url}
            alt={activeItem.alt || `${title} screenshot ${selectedIndex + 1}`}
            fill
            priority={selectedIndex === 0}
            className="object-contain sm:object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
          />

          {/* Gradient Overlay for Controls */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Top Bar inside Preview */}
          <div className="absolute top-3 sm:top-4 inset-x-3 sm:inset-x-4 flex items-center justify-between z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-zinc-950/80 backdrop-blur-md text-zinc-300 border border-white/10 shadow-lg">
              {selectedIndex + 1} / {gallery.length}
            </span>

            <span className="pointer-events-auto p-2 rounded-full bg-zinc-950/80 backdrop-blur-md text-zinc-300 hover:text-white border border-white/10 shadow-lg transition-transform hover:scale-105">
              <Maximize2 className="w-4 h-4" />
            </span>
          </div>

          {/* Left / Right Arrow Controls */}
          {gallery.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-950/80 backdrop-blur-md text-zinc-300 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-20 cursor-pointer shadow-lg"
                aria-label="Tangkapan layar sebelumnya"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-zinc-950/80 backdrop-blur-md text-zinc-300 hover:text-white border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110 z-20 cursor-pointer shadow-lg"
                aria-label="Tangkapan layar berikutnya"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
        </div>

        {/* Caption Bar underneath */}
        {activeItem.caption && (
          <div className="px-5 py-3.5 bg-zinc-900/60 border-t border-zinc-800/80 flex items-center justify-between gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2 text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
              <span className="font-medium text-zinc-200">{activeItem.alt}</span>
              <span className="text-zinc-500 hidden sm:inline">—</span>
              <span className="text-zinc-400 hidden sm:inline">{activeItem.caption}</span>
            </div>
            <span className="text-[11px] font-mono text-zinc-500 flex-shrink-0">
              Klik gambar untuk memperbesar
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {gallery.length > 1 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>Semua Tangkapan Layar ({gallery.length} Layar)</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {gallery.map((item, idx) => {
              const isActive = selectedIndex === idx;
              return (
                <button
                  key={item.id || idx}
                  type="button"
                  onClick={() => setSelectedIndex(idx)}
                  className={`group relative aspect-[16/10] rounded-xl overflow-hidden border text-left transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'border-indigo-500 ring-2 ring-indigo-500/30 scale-[1.02] shadow-lg shadow-indigo-500/10'
                      : 'border-zinc-800/80 hover:border-zinc-700 bg-zinc-950 opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`Pilih tangkapan layar ${idx + 1}: ${item.alt}`}
                >
                  <Image
                    src={item.url}
                    alt={item.alt}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 50vw, 20vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-1.5 left-2 right-2">
                    <span className="text-[10px] font-mono text-white/90 line-clamp-1">
                      {idx + 1}. {item.alt.split('-')[0].trim()}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Lightbox Fullscreen Modal */}
      {lightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-6xl max-h-[92vh] flex flex-col items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header */}
            <div className="w-full flex items-center justify-between pb-3 text-zinc-400">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-zinc-800 text-zinc-300">
                  {selectedIndex + 1} / {gallery.length}
                </span>
                <span className="text-sm font-semibold text-white">{activeItem.alt}</span>
              </div>

              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Tutup pratinjau"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Lightbox Main Image */}
            <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] max-h-[75vh] rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950 flex items-center justify-center">
              <Image
                src={activeItem.url}
                alt={activeItem.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />

              {gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePrev();
                    }}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 border border-zinc-700 transition-transform hover:scale-110 cursor-pointer shadow-xl"
                    aria-label="Sebelumnya"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNext();
                    }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 border border-zinc-700 transition-transform hover:scale-110 cursor-pointer shadow-xl"
                    aria-label="Berikutnya"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Lightbox Caption */}
            {activeItem.caption && (
              <p className="mt-3 text-sm text-zinc-400 text-center max-w-3xl">
                {activeItem.caption}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

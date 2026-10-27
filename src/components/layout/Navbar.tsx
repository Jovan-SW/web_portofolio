'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'hero', label: 'Hero', href: '#hero' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

/**
 * Hanging Cave Flora & Stalactites SVG
 * Natural subterranean rock stalactites and dangling green moss tendrils beneath the island.
 */
function HangingCaveFlora() {
  return (
    <div className="absolute -bottom-3.5 left-5 right-5 h-4 pointer-events-none flex items-start justify-between px-3 overflow-visible opacity-85">
      <svg className="w-full h-4 overflow-visible" preserveAspectRatio="none" viewBox="0 0 600 16" fill="none">
        {/* Stalactite 1 with moss tip */}
        <polygon points="40,0 43,12 46,0" fill="#1c1917" stroke="#15803d" strokeWidth="0.6" />
        <circle cx="43" cy="12.5" r="1" fill="#4ade80" />

        {/* Moss vine root 1 */}
        <path d="M95,0 Q97,8 99,14" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" />
        <path d="M99,14 Q101,10 102,12" stroke="#22c55e" strokeWidth="0.8" strokeLinecap="round" />

        {/* Stalactite 2 (Deep basalt stone) */}
        <polygon points="160,0 164,15 168,0" fill="#0c0a09" stroke="#166534" strokeWidth="0.6" />
        <circle cx="164" cy="15.5" r="1.1" fill="#86efac" />

        {/* Center moss droplet / root */}
        <path d="M298,0 Q301,7 303,13" stroke="#22c55e" strokeWidth="1.2" strokeLinecap="round" />
        <polygon points="302,12 305,15 301,15" fill="#4ade80" />

        {/* Stalactite 3 with green lichen */}
        <polygon points="430,0 433,11 436,0" fill="#1c1917" stroke="#15803d" strokeWidth="0.6" />
        <circle cx="433" cy="11.5" r="1" fill="#4ade80" />

        {/* Moss root 2 */}
        <path d="M510,0 Q513,9 516,14" stroke="#16a34a" strokeWidth="1" strokeLinecap="round" />
      </svg>
    </div>
  );
}

/**
 * Floating Cave Satellite Rock Shard with Moss Accent
 */
function OrbitingCaveShard({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      className={`hidden xl:flex absolute top-1/2 -translate-y-1/2 pointer-events-none items-center justify-center ${
        side === 'left' ? '-left-8 animate-shard-1' : '-right-8 animate-shard-2'
      }`}
    >
      <div className="relative w-6 h-6">
        <div className="absolute inset-0 bg-emerald-900/20 blur-sm rounded-full" />
        <svg viewBox="0 0 24 24" fill="none" className="w-full h-full drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
          <polygon
            points={side === 'left' ? "12,2 21,7 19,19 8,22 3,14 5,5" : "10,2 22,8 18,21 6,19 2,12 6,4"}
            fill="#1c1917"
            stroke="#292524"
            strokeWidth="1.2"
          />
          {/* Moss streak on shard */}
          <path
            d={side === 'left' ? "M6,7 Q12,10 18,8" : "M5,6 Q11,8 17,7"}
            stroke="#22c55e"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <circle cx={side === 'left' ? "12" : "11"} cy="13" r="1.2" fill="#86efac" />
        </svg>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to sync active section indicator
    const sectionIds = ['hero', 'about', 'projects', 'contact'];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cleanId = entry.target.id === 'project' ? 'projects' : entry.target.id;
          setActiveSection(cleanId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-30% 0px -60% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const legacyProject = document.getElementById('project');
    if (legacyProject) observer.observe(legacyProject);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    let element = document.getElementById(targetId);
    if (!element && targetId === 'projects') {
      element = document.getElementById('project');
    }
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
      setMobileOpen(false);
    }
  };

  return (
    <div className="fixed top-4 sm:top-5 inset-x-0 mx-auto z-50 max-w-5xl px-3 sm:px-4 pointer-events-none">
      {/* Floating Levitation Island Physics Wrapper */}
      <div className="relative w-full animate-island-levitate">
        {/* Companion Orbiting Miniature Rocks on flanks */}
        <OrbitingCaveShard side="left" />
        <OrbitingCaveShard side="right" />

        {/* Main Floating Mossy Cave Rock Island */}
        <nav
          aria-label="Floating Mossy Cave Rock Island Navigation"
          className={`pointer-events-auto relative w-full transition-all duration-500 ${
            isScrolled
              ? 'py-2 px-3.5 sm:px-5'
              : 'py-2.5 sm:py-3 px-4 sm:px-6'
          }`}
          style={{
            /* Natural chiseled jagged stone outline */
            clipPath:
              'polygon(0.6% 18%, 2.2% 7%, 6% 2.5%, 16% 0.8%, 32% 2%, 50% 0.5%, 68% 2.2%, 84% 0.8%, 94% 3.2%, 97.8% 9%, 99.4% 22%, 99.2% 78%, 97.5% 89%, 92.5% 97%, 82% 99%, 64% 97.5%, 48% 99.5%, 32% 97.8%, 18% 99.2%, 7.5% 96.5%, 2.4% 88%, 0.6% 76%)',
          }}
        >
          {/* Layer 1: Earthy Subterranean Abyss Shadow */}
          <div className="absolute inset-0 -z-30 bg-black/90 rounded-2xl shadow-[0_22px_45px_rgba(0,0,0,0.98),inset_0_0_24px_rgba(0,0,0,0.9)]" />

          {/* Layer 2: Real Wet Basalt Cave Rock & Lush Green Moss Texture */}
          <div
            className="absolute inset-0 -z-20 bg-gradient-to-b from-stone-900/95 via-stone-950/98 to-[#090a0d] opacity-95"
            style={{
              backgroundImage: 'url("/mossy-cave-rock.jpg")',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundBlendMode: 'overlay',
            }}
          />

          {/* Layer 3: Natural Moss Ridge Overgrowth & Relief Rim */}
          <div className="absolute inset-0 -z-10 pointer-events-none">
            {/* Top stone ledge with organic moss overgrown line */}
            <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-emerald-500/85 to-transparent" />
            {/* Bottom cavern rim shadow */}
            <div className="absolute bottom-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-stone-950 to-transparent" />
          </div>

          {/* Content Flex Container */}
          <div className="relative z-10 flex items-center justify-between gap-3 sm:gap-6">
            {/* Sisi Kiri (Branding): Jovan Sebastian William (Tanpa Logo, Font Kontras Tinggi) */}
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 rounded-lg py-1 px-1.5 transition-transform active:translate-y-0.5"
              aria-label="Jovan Sebastian William - Beranda"
            >
              <div className="flex flex-col">
                <span className="font-mono text-sm sm:text-base font-extrabold tracking-[0.16em] uppercase text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2 drop-shadow-[0_2px_5px_rgba(0,0,0,0.95)]">
                  <span className="hidden sm:inline">Jovan Sebastian William</span>
                  <span className="sm:hidden">Jovan S. W.</span>
                </span>
                <span className="text-[10px] font-mono tracking-widest text-emerald-300/90 font-bold uppercase hidden lg:flex items-center gap-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                  <span className="text-stone-500">[</span>
                  <span>Cave Monolith</span>
                  <span className="text-stone-500">]</span>
                </span>
              </div>
            </a>

            {/* Sisi Kanan / Navigasi: Chiseled Stone Runes dengan Efek Tactile Click / Press (Bukan Glow) */}
            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-1.5 p-1 rounded-xl bg-stone-950/90 border border-stone-800/80 shadow-[inset_0_2px_5px_rgba(0,0,0,0.9)]">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  const isHovered = hoveredTab === item.id;
                  const isHighlighted = hoveredTab !== null ? isHovered : isActive;

                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      onMouseEnter={() => setHoveredTab(item.id)}
                      onMouseLeave={() => setHoveredTab(null)}
                      className={`relative px-4 py-1.5 rounded-lg text-xs font-mono font-bold tracking-wider uppercase transition-all duration-150 active:translate-y-0.5 active:scale-[0.98] cursor-pointer select-none ${
                        isActive
                          ? 'text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]'
                          : 'text-stone-200 hover:text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                      }`}
                    >
                      {/* Tactile Stone Indentation Pill (Physical Inset Carving, No Neon Glow) */}
                      {isHighlighted && mounted && (
                        <motion.div
                          layoutId="tactile-stone-press"
                          className="absolute inset-0 rounded-lg bg-stone-900 border border-stone-600/80 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9),0_1px_0_rgba(255,255,255,0.06)]"
                          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10 flex items-center gap-1.5">
                        <span>{item.label}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 border border-emerald-900 shadow-sm" />
                        )}
                      </span>
                    </a>
                  );
                })}
              </div>

              {/* Mobile Menu Toggle Button (Tactile Press) */}
              <button
                type="button"
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg border border-stone-700/80 bg-stone-900/90 text-stone-100 hover:text-white hover:bg-stone-800 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8)] active:translate-y-0.5 transition-all focus:outline-none cursor-pointer"
                aria-label={mobileOpen ? 'Tutup Navigasi' : 'Buka Navigasi'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? <X className="w-4 h-4 text-emerald-400" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Dangling Subterranean Stalactites & Moss Tendrils hanging beneath the rock */}
          <HangingCaveFlora />
        </nav>

        {/* Mobile Dropdown Sheet (Mossy Cavern Stone Tablet) */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 mt-3 p-3.5 rounded-2xl bg-stone-950/98 backdrop-blur-2xl border border-stone-800 shadow-[0_20px_40px_rgba(0,0,0,0.95)] flex flex-col gap-2"
              style={{
                backgroundImage: 'url("/mossy-cave-rock.jpg")',
                backgroundSize: 'cover',
                backgroundBlendMode: 'overlay',
              }}
            >
              <div className="flex flex-col gap-1.5">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider transition-all active:translate-y-0.5 ${
                        isActive
                          ? 'bg-stone-900 text-white border border-stone-600 shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]'
                          : 'text-stone-100 hover:text-white hover:bg-stone-900/90 border border-stone-800/60 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm" />}
                    </a>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

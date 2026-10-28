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
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to sync active section indicator
    const sectionIds = ['home', 'about', 'projects', 'contact'];
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let cleanId = entry.target.id;
          if (cleanId === 'project') cleanId = 'projects';
          if (cleanId === 'hero') cleanId = 'home';
          setActiveSection(cleanId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '-25% 0px -55% 0px',
      threshold: 0,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const legacyProject = document.getElementById('project');
    if (legacyProject) observer.observe(legacyProject);

    const legacyHero = document.getElementById('hero');
    if (legacyHero) observer.observe(legacyHero);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    let element = document.getElementById(targetId);
    if (!element && targetId === 'home') {
      element = document.getElementById('hero');
    }
    if (!element && targetId === 'projects') {
      element = document.getElementById('project');
    }
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(targetId);
      setMobileOpen(false);
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <header className="fixed top-4 sm:top-6 inset-x-0 mx-auto z-50 max-w-6xl px-4 sm:px-8 pointer-events-none transition-all duration-300">
      <nav
        aria-label="Main Navigation"
        className={`pointer-events-auto relative w-full flex items-center justify-between px-5 sm:px-8 py-3 sm:py-3.5 rounded-xl transition-all duration-300 ease-out border-[1.5px] ${
          isScrolled
            ? 'bg-zinc-950/45 backdrop-blur-xl border-white/[0.22] shadow-[0_10px_35px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.1)]'
            : 'bg-white/[0.03] backdrop-blur-md border-white/[0.18] shadow-[0_4px_24px_rgba(0,0,0,0.12)]'
        }`}
      >
        {/* Subtle top crystal glare highlight line */}
        <div className="absolute top-0 inset-x-6 sm:inset-x-10 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none" />

        {/* Left: Brand Identity with Satoshi Font (Tegas & Bold) */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-lg py-1 px-1 transition-transform active:scale-[0.98] cursor-pointer"
          aria-label="Jovan Sebastian William - Home"
        >
          <span
            className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-zinc-200 transition-colors"
            style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
          >
            <span className="hidden sm:inline">JOVAN SEBASTIAN WILLIAM</span>
            <span className="sm:hidden font-mono">JOVAN S.W</span>
          </span>
        </a>

        {/* Right: Desktop Navigation Links (Mengambang Bebas Tanpa Border Kotak) */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                onMouseEnter={() => setHoveredTab(item.id)}
                onMouseLeave={() => setHoveredTab(null)}
                style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
                className={`relative px-4 sm:px-5 py-2 rounded-lg text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer select-none ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {/* Floating Soft Aura Indicator on Hover (Tanpa Border Kotak) */}
                {hoveredTab === item.id && mounted && (
                  <motion.span
                    layoutId="navbar-hover-glow"
                    className="absolute inset-0 rounded-lg bg-white/[0.08] backdrop-blur-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                {/* Subtle Clean Active Indicator (Mengambang Halus Tanpa Border Kotak) */}
                {isActive && !hoveredTab && mounted && (
                  <motion.span
                    layoutId="navbar-active-box"
                    className="absolute inset-0 rounded-lg bg-white/[0.04]"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}

                <span className="relative z-10">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg border-[1.5px] border-white/20 bg-white/[0.05] hover:bg-white/[0.12] text-zinc-200 hover:text-white transition-all active:scale-95 focus:outline-none cursor-pointer"
          aria-label={mobileOpen ? 'Tutup Menu' : 'Buka Menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5 text-white" />}
        </button>
      </nav>

      {/* Mobile Dropdown Sheet - Clean Rectangular Crystal Box */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden pointer-events-auto mt-2 p-3 rounded-xl bg-zinc-950/80 backdrop-blur-2xl border-[1.5px] border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.1)] flex flex-col gap-1.5"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  style={{ fontFamily: 'var(--font-satoshi), Satoshi, sans-serif' }}
                  className={`flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all active:scale-[0.98] ${
                    isActive
                      ? 'bg-white/[0.08] text-white'
                      : 'text-zinc-300 hover:text-white hover:bg-white/[0.03]'
                  }`}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

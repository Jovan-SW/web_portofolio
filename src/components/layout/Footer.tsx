'use client';

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = `/${href}`;
    }
  };

  return (
    <footer className="border-t border-zinc-900 bg-zinc-950 text-zinc-400 py-12 text-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-zinc-900">
          {/* Logo & Tagline */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="text-white font-bold text-lg font-mono">
              <span>jovansw<span className="text-indigo-400">.dev</span></span>
            </div>
            <p className="text-xs text-zinc-500 mt-1">
              Full-Stack Web Engineering &amp; Modern Product Development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex items-center gap-6 text-xs sm:text-sm font-medium">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, '#home')}
              className="hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="hover:text-white transition-colors"
            >
              About
            </a>
            <a
              href="#project"
              onClick={(e) => handleNavClick(e, '#project')}
              className="hover:text-white transition-colors"
            >
              Project
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; 2026 Jovan Sebastian William. Seluruh hak cipta dilindungi.
          </div>
        </div>
      </div>
    </footer>
  );
}

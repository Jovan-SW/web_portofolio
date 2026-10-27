import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ProjectSection from '@/components/sections/ProjectSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-600 selection:text-white">
      {/* Fixed / Sticky Navigation */}
      <Navbar />

      {/* Main Single Page Content with 4 Sections */}
      <main className="flex-1 w-full flex flex-col">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: About */}
        <AboutSection />

        {/* Section 3: Project */}
        <ProjectSection />

        {/* Section 4: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import EngineeringPrinciplesSection from '@/components/sections/EngineeringPrinciplesSection';
import HowIWorkSection from '@/components/sections/HowIWorkSection';
import ProjectSection from '@/components/sections/ProjectSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/layout/Footer';
import FullPageSceneBackground from '@/components/3d/FullPageSceneBackground';

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col selection:bg-indigo-600 selection:text-white relative">
      {/* Persistent Full-Page 3D Background */}
      <FullPageSceneBackground />

      {/* Fixed / Sticky Navigation */}
      <Navbar />

      {/* Main Single Page Content with Sections */}
      <main className="flex-1 w-full flex flex-col relative z-10">
        {/* Section 1: Hero */}
        <HeroSection />

        {/* Section 2: About */}
        <AboutSection />

        {/* Section 3: Engineering Principles */}
        <EngineeringPrinciplesSection />

        {/* Section 4: How I Work */}
        <HowIWorkSection />

        {/* Section 5: Project */}
        <ProjectSection />

        {/* Section 6: Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

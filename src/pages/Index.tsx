import { Header } from '@/components/portfolio/Header';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Experience } from '@/components/portfolio/Experience';
import { Projects } from '@/components/portfolio/Projects';
import { Skills } from '@/components/portfolio/Skills';
import { Achievements } from '@/components/portfolio/Achievements';
import { Education } from '@/components/portfolio/Education';
import { Footer } from '@/components/portfolio/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Achievements />
        <Education />
        <Footer />
      </main>
    </div>
  );
};

export default Index;

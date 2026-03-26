import { Header } from '@/components/portfolio/Header';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Experience } from '@/components/portfolio/Experience';
import { Projects } from '@/components/portfolio/Projects';
import { Skills } from '@/components/portfolio/Skills';
import { Achievements } from '@/components/portfolio/Achievements';
import { Education } from '@/components/portfolio/Education';
import { Footer } from '@/components/portfolio/Footer';
import { ScrollShowcase } from '@/components/portfolio/DevPipelineShowcase';
import portfolioData from '@/data/portfolio-data.json';

const Index = () => {
  return (
    <div className="relative min-h-screen bg-background overflow-clip">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-subtle" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.06]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="relative z-10">
        <Header 
          navLinks={portfolioData.header.navLinks}
          ctaButtons={portfolioData.hero.ctaButtons}
        />
        <main>
        <Hero
          statusBadge={portfolioData.hero.statusBadge}
          headline={portfolioData.hero.headline}
          subheadline={portfolioData.hero.subheadline}
          ctaButtons={portfolioData.hero.ctaButtons}
          stats={portfolioData.hero.stats}
        />
        <ScrollShowcase />
        <About
          sectionLabel={portfolioData.about.sectionLabel}
          title={portfolioData.about.title}
          paragraphs={portfolioData.about.paragraphs}
          highlights={portfolioData.about.highlights}
        />
        <Experience
          sectionLabel={portfolioData.experience.sectionLabel}
          title={portfolioData.experience.title}
          items={portfolioData.experience.items}
          strategyChips={portfolioData.experience.strategyChips}
          githubData={portfolioData.githubData}
        />
        <Achievements
          sectionLabel={portfolioData.achievements.sectionLabel}
          title={portfolioData.achievements.title}
          items={portfolioData.achievements.items}
        />
        <Projects
          sectionLabel={portfolioData.projects.sectionLabel}
          title={portfolioData.projects.title}
          description={portfolioData.projects.description}
          items={portfolioData.projects.items}
        />
        <Skills
          sectionLabel={portfolioData.skills.sectionLabel}
          title={portfolioData.skills.title}
          groups={portfolioData.skills.groups}
        />
        <Education
          sectionLabel={portfolioData.education.sectionLabel}
          title={portfolioData.education.title}
          items={portfolioData.education.items}
        />
        <Footer
          sectionLabel={portfolioData.footer.sectionLabel}
          title={portfolioData.footer.title}
          description={portfolioData.footer.description}
          socialLinks={portfolioData.footer.socialLinks}
          copyright={portfolioData.footer.copyright}
        />
        </main>
      </div>
    </div>
  );
};

export default Index;

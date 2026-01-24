import { Header } from '@/components/portfolio/Header';
import { Hero } from '@/components/portfolio/Hero';
import { About } from '@/components/portfolio/About';
import { Experience } from '@/components/portfolio/Experience';
import { Projects } from '@/components/portfolio/Projects';
import { Skills } from '@/components/portfolio/Skills';
import { Achievements } from '@/components/portfolio/Achievements';
import { Education } from '@/components/portfolio/Education';
import { Footer } from '@/components/portfolio/Footer';
import portfolioData from '@/data/portfolio-data.json';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header navLinks={portfolioData.header.navLinks} />
      <main>
        <Hero
          statusBadge={portfolioData.hero.statusBadge}
          headline={portfolioData.hero.headline}
          subheadline={portfolioData.hero.subheadline}
          ctaButtons={portfolioData.hero.ctaButtons}
          stats={portfolioData.hero.stats}
        />
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
        <Achievements
          sectionLabel={portfolioData.achievements.sectionLabel}
          title={portfolioData.achievements.title}
          items={portfolioData.achievements.items}
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
  );
};

export default Index;

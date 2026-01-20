import { Code2, Gauge, Users, Layers } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const highlights = [
  {
    icon: Gauge,
    title: 'Performance Engineering',
    description: 'Obsessed with Core Web Vitals, JS execution optimization, and delivering sub-second experiences.',
  },
  {
    icon: Layers,
    title: 'Architecture Decisions',
    description: 'SSR vs SSG vs ISR—choosing the right rendering strategy for each use case.',
  },
  {
    icon: Code2,
    title: 'End-to-End Ownership',
    description: 'From technical specs to production deployment, owning the complete development lifecycle.',
  },
  {
    icon: Users,
    title: 'Cross-Team Collaboration',
    description: 'Working with backend, design, and product teams to ship cohesive solutions.',
  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="mb-16">
              <span className="text-primary font-mono text-sm tracking-wider uppercase">About</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Engineering-First Mindset
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column - Text */}
            <div className="space-y-6">
              <ScrollReveal delay={0.1}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm a frontend engineer who thinks in systems, not just screens. At{' '}
                  <span className="text-foreground font-medium">Zolvit (formerly Vakilsearch)</span>, 
                  I build and maintain high-traffic Next.js applications where every millisecond 
                  of performance translates to real business impact.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  My approach is rooted in understanding the "why" behind technical decisions. 
                  Whether it's choosing between server-side rendering for SEO-critical pages or 
                  implementing incremental static regeneration for frequently updated content, 
                  I prioritize solutions that scale.
                </p>
              </ScrollReveal>
              <ScrollReveal delay={0.3}>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I don't just write code—I build systems that empower non-engineers through 
                  CMS-driven architectures, reduce operational overhead, and improve search 
                  visibility through technical SEO implementations.
                </p>
              </ScrollReveal>
            </div>

            {/* Right Column - Highlights */}
            <StaggerContainer className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, index) => (
                <StaggerItem key={index}>
                  <div className="p-6 rounded-lg bg-card border border-border shadow-card hover:shadow-elevated transition-shadow duration-300 h-full">
                    <item.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

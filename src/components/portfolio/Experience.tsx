import { Building2, Calendar, ChevronRight } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const experiences = [
  {
    company: 'Zolvit',
    previousName: 'formerly Vakilsearch',
    role: 'Associate Software Engineer',
    period: 'Apr 2025 – Present',
    type: 'Full-time',
    highlights: [
      'Own development of high-traffic Next.js applications serving legal services platform',
      'Lead Core Web Vitals optimization initiatives—JS execution, caching strategies, asset delivery',
      'Architected CMS-driven layouts enabling marketing team to ship pages without engineering',
      'Reduced 3,000+ underperforming pages to zero in Google Search Console through technical SEO fixes',
      'Increased search impressions by 8% within 10 days through structured data and meta optimizations',
    ],
  },
  {
    company: 'Zolvit',
    previousName: 'formerly Vakilsearch',
    role: 'Frontend Developer Intern',
    period: 'Apr 2024 – Mar 2025',
    type: 'Internship',
    highlights: [
      'Built production React & Next.js components for high-traffic legal services pages',
      'Implemented accessibility standards (WCAG) and established shared component library',
      'Integrated RESTful APIs with proper error handling and loading states',
      'Documented components in Storybook, improving developer experience and design handoff',
      'Collaborated with backend and design teams to improve cross-functional workflows',
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="mb-16">
              <span className="text-primary font-mono text-sm tracking-wider uppercase">Experience</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Impact, Not Job Descriptions
              </h2>
            </div>
          </ScrollReveal>

          {/* Timeline */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <ScrollReveal key={index} delay={index * 0.15}>
                <div className="relative pl-8 border-l-2 border-border hover:border-primary transition-colors duration-300">
                  {/* Timeline dot */}
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                  {/* Content */}
                  <div className="pb-2">
                    {/* Company & Role */}
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold text-foreground">{exp.company}</span>
                      {exp.previousName && (
                        <span className="text-sm text-muted-foreground">({exp.previousName})</span>
                      )}
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                      {exp.role}
                    </h3>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {exp.period}
                      </span>
                      <span className="px-2 py-1 rounded-full bg-secondary text-xs font-medium">
                        {exp.type}
                      </span>
                    </div>

                    {/* Highlights */}
                    <StaggerContainer className="space-y-3">
                      {exp.highlights.map((highlight, hIndex) => (
                        <StaggerItem key={hIndex}>
                          <div className="flex items-start gap-3 text-muted-foreground">
                            <ChevronRight className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            <span className="leading-relaxed">{highlight}</span>
                          </div>
                        </StaggerItem>
                      ))}
                    </StaggerContainer>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

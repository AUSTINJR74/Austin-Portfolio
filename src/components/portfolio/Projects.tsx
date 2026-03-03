import { Badge } from '@/components/ui/badge';
import { iconMap } from '@/lib/icon-map';
import { SectionHeader } from '@/components/portfolio/SectionHeader';

interface ProjectsProps {
  sectionLabel: string;
  title: string;
  description: string;
  items: Array<{
    icon: string;
    title: string;
    problem: string;
    decisions: string[];
    impact: string;
    stack: string[];
  }>;
}

export const Projects = ({ sectionLabel, title, description, items }: ProjectsProps) => {
  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-80" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.12]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label={sectionLabel} title={title} description={description} />

          {/* Projects Grid */}
          <div className="grid gap-8">
            {items.map((project, index) => {
              const Icon = iconMap[project.icon as keyof typeof iconMap];
              return (
                <article
                  key={index}
                  className="group p-6 md:p-8 rounded-xl solais-glass hover:shadow-elevated transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left - Icon & Title */}
                    <div className="lg:w-1/3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        {Icon && <Icon className="w-6 h-6 text-primary" />}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="font-mono text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Right - Details */}
                    <div className="lg:w-2/3 space-y-6">
                      {/* Problem */}
                      <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                          Problem
                        </h4>
                        <p className="text-muted-foreground">{project.problem}</p>
                      </div>

                      {/* Technical Decisions */}
                      <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                          Technical Decisions
                        </h4>
                        <ul className="space-y-2">
                          {project.decisions.map((decision, dIndex) => (
                            <li key={dIndex} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-primary mt-1.5">→</span>
                              <span>{decision}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact */}
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                          Impact
                        </h4>
                        <p className="text-foreground font-medium">{project.impact}</p>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

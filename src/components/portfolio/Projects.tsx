import { useState, useRef, useEffect } from 'react';
import { iconMap } from '@/lib/icon-map';
import { SectionHeader } from '@/components/portfolio/SectionHeader';

interface ProjectsProps {
  sectionLabel: string;
  title: string;
  description: string;
  items: Array<{
    slug: string;
    gradient: string[];
    icon: string;
    title: string;
    problem: string;
    decisions: string[];
    impact: string;
    stack: string[];
  }>;
}

export const Projects = ({ sectionLabel, title, description, items }: ProjectsProps) => {
  const [expandedCard, setExpandedCard] = useState<string | null>(items[0]?.slug);
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleCardExpand = (projectSlug: string) => {
    const isExpanding = expandedCard !== projectSlug;
    setExpandedCard(isExpanding ? projectSlug : null);
    
    // Smooth scroll to card after a short delay to allow for layout changes
    if (isExpanding) {
      setTimeout(() => {
        const cardElement = cardRefs.current[projectSlug];
        if (cardElement) {
          cardElement.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
            inline: 'nearest'
          });
        }
      }, 100);
    }
  };

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32">
      {/* <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-80" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.12]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" /> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label={sectionLabel} title={title} description={description} />

          <div className={`grid gap-5 md:gap-6 mt-16 transition-all duration-500 ${
              expandedCard ? 'md:grid-cols-3' : 'md:grid-cols-3'
            }`}>
            {items.map((project, index) => {
              const Icon = iconMap[project.icon as keyof typeof iconMap];
              const g0 = project.gradient[0];
              const g1 = project.gradient[1] || project.gradient[0];
              const isExpanded = expandedCard === project.slug;

              return (
                <div
                  key={index}
                  ref={(el) => cardRefs.current[project.slug] = el}
                  className={`group relative flex flex-col text-left cursor-pointer rounded-2xl overflow-hidden border bg-black/[0.02] border-black/[0.08] dark:bg-white/[0.03] dark:border-white/[0.07] transition-all duration-[350ms] ${
                    isExpanded 
                      ? 'md:col-span-3 md:row-span-1 hover:-translate-y-1 hover:border-black/[0.15] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:border-white/[0.14] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]'
                      : 'hover:-translate-y-1 hover:border-black/[0.15] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:border-white/[0.14] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]'
                  }`}
                  onClick={() => !isExpanded && handleCardExpand(project.slug)}
                >
                  {/* ── Visual area ── */}
                  <div 
                    className="relative h-[200px] md:h-[220px] overflow-hidden transition-all duration-500"
                    style={{ 
                      background: isExpanded 
                        ? `linear-gradient(135deg, ${g0}, ${g1})` 
                        : 'transparent'
                    }}
                  >
                    {/* Icon badge */}
                    <div className={`absolute top-4 left-4 z-[3] w-9 h-9 rounded-[10px] flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                      isExpanded 
                        ? 'bg-white/10 border border-white/20' 
                        : 'bg-black/[0.04] border border-black/10 dark:bg-white/[0.06] dark:border-white/10'
                    }`}>
                      <Icon className={`w-4 h-4 transition-colors duration-300 ${
                        isExpanded 
                          ? 'text-white' 
                          : 'text-black/50 dark:text-white/70'
                      }`} />
                    </div>

                    {/* Abstract 3D geometric shapes - only when not expanded */}
                    {!isExpanded && (
                      <div
                        aria-hidden
                        className="absolute -top-[10%] -right-[10%] w-4/5 h-[120%] -rotate-[20deg] transition-transform duration-500 group-hover:-rotate-[8deg] group-hover:scale-105"
                      >
                        <div
                          className="absolute w-[60%] h-[70%] top-[10%] right-[5%] rounded-md opacity-70"
                          style={{ background: `linear-gradient(135deg, ${g0}, ${g1})`, transform: 'skewY(-8deg) rotateZ(6deg)' }}
                        />
                        <div
                          className="absolute w-1/2 h-[55%] top-1/4 right-[20%] rounded opacity-50"
                          style={{ background: `linear-gradient(225deg, ${g1}, ${g0})`, transform: 'skewY(12deg) rotateZ(-4deg)' }}
                        />
                        <div
                          className="absolute w-[35%] h-[45%] top-[5%] right-[35%] rounded-sm opacity-[0.35]"
                          style={{ background: `linear-gradient(180deg, ${g0}cc, ${g1}88)`, transform: 'skewY(-15deg) rotateZ(10deg)' }}
                        />
                        <div
                          className="absolute w-2/5 h-[60%] top-[15%] right-[10%] z-[2]"
                          style={{ background: 'linear-gradient(160deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)', transform: 'skewY(-8deg)' }}
                        />
                      </div>
                    )}
                  </div>

                  {/* ── Content ── */}
                  <div className={`p-5 md:p-6 flex flex-col flex-1 transition-all duration-500 ${
                    isExpanded ? 'md:flex-row md:gap-12' : ''
                  }`}>
                    {/* Basic Info */}
                    <div className={`${isExpanded ? 'md:w-1/2' : ''}`}>
                      <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug mb-2">
                        {project.title}
                      </h3>

                      <p className={`text-xs md:text-sm text-muted-foreground leading-relaxed mb-6 ${
                        isExpanded ? '' : 'line-clamp-3'
                      }`}>
                        {project.impact}
                      </p>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.stack.map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium text-foreground/80 bg-primary/10 border border-primary/20 rounded-full"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded Content */}
                    {isExpanded && (
                      <div className="md:w-1/2 space-y-6">
                        {/* Problem */}
                        <div className="transform transition-all duration-700 ease-out"
                             style={{ 
                               opacity: isExpanded ? 1 : 0, 
                               transform: isExpanded ? 'translateY(0)' : 'translateY(20px)',
                               transitionDelay: '200ms'
                             }}>
                          <h4 className="text-lg font-semibold text-foreground mb-3">The Problem</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{project.problem}</p>
                        </div>

                        {/* Decisions */}
                        <div className="transform transition-all duration-700 ease-out"
                             style={{ 
                               opacity: isExpanded ? 1 : 0, 
                               transform: isExpanded ? 'translateY(0)' : 'translateY(20px)',
                               transitionDelay: '400ms'
                             }}>
                          <h4 className="text-lg font-semibold text-foreground mb-3">Key Decisions</h4>
                          <ul className="space-y-2">
                            {project.decisions.map((decision, index) => (
                              <li key={index} className="flex items-start gap-3 transform transition-all duration-500 ease-out"
                                  style={{ 
                                    opacity: isExpanded ? 1 : 0, 
                                    transform: isExpanded ? 'translateX(0)' : 'translateX(-20px)',
                                    transitionDelay: `${600 + index * 100}ms`
                                  }}>
                                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                                <p className="text-sm text-muted-foreground leading-relaxed">{decision}</p>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action */}
                        {/* <div className="pt-4 border-t border-border transform transition-all duration-700 ease-out"
                             style={{ 
                               opacity: isExpanded ? 1 : 0, 
                               transform: isExpanded ? 'translateY(0)' : 'translateY(20px)',
                               transitionDelay: '800ms'
                             }}>
                          <button className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 transform hover:scale-105">
                            View Live Project
                          </button>
                        </div> */}
                      </div>
                    )}

                    {/* Toggle Button */}
                    {/* <span className="inline-flex items-center self-start mt-auto text-[13px] font-medium py-2 px-5 rounded-3xl text-foreground border border-black/[0.15] dark:border-white/[0.15] transition-all duration-[250ms] group-hover:border-black/30 dark:group-hover:border-white/[0.35]">
                      {isExpanded ? 'Show Less' : 'View More'}
                    </span> */}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

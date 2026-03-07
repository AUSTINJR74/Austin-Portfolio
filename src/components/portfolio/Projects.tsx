import { useState, useRef, useEffect } from 'react';
import { iconMap } from '@/lib/icon-map';
import { SectionHeader } from '@/components/portfolio/SectionHeader';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectsProps {
  sectionLabel: string;
  title: string;
  description: string;
  items: Array<{
    slug: string;
    gradient: string[];
    gallery?: string[];
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
  const [lightbox, setLightbox] = useState<{ project: string; index: number } | null>(null);
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
    <section id="projects" className="relative overflow-hidden py-20 md:py-32">
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
              const images = project.gallery ?? [];

              return (
                <div
                  key={index}
                  ref={(el) => (cardRefs.current[project.slug] = el)}
                  className={`group relative cursor-pointer rounded-2xl overflow-hidden border-2 border-white/10 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.03] transition-all duration-[350ms] ${
                    isExpanded
                      ? 'md:col-span-3 md:row-span-1 hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_20px_60px_rgba(0,0,0,0.25)]'
                      : 'hover:-translate-y-1 hover:border-white/40 hover:shadow-[0_18px_55px_rgba(0,0,0,0.2)]'
                  }`}
                  onClick={() => !isExpanded && handleCardExpand(project.slug)}
                  style={{ boxShadow: '0 12px 40px rgba(15,23,42,0.05)' }}
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none "
                    style={{ background: `radial-gradient(ellipse at 70% 35%, hsl(var(--primary) / 0.11), transparent 60%)` }}
                  />
                  <div className="relative z-[1] flex flex-col h-full">
                    {/* ── Visual area ── */}
                    <div
                      className="relative h-[200px] md:h-[220px] overflow-hidden transition-all duration-500"
                      onClick={(e) => {
                        if (!images.length) return;
                        e.stopPropagation();
                        setLightbox({ project: project.slug, index: 0 });
                      }}
                    >
                      {images.length ? (
                        <div className="absolute inset-0">
                          <img
                            src={images[0]}
                            alt={project.title}
                            className={`h-full w-full object-cover transition-transform duration-700 ${
                              isExpanded ? 'scale-105' : 'scale-100'
                            }`}
                          />
                          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />

                          {images.length > 1 && (
                            <div className="absolute bottom-3 right-3 flex gap-2 rounded-xl bg-black/60 backdrop-blur p-[6px]">
                              {images.slice(0, 3).map((thumb, thumbIndex) => (
                                <button
                                  key={thumb}
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setLightbox({ project: project.slug, index: thumbIndex });
                                  }}
                                  className="w-11 h-11 rounded-lg border border-white/30 overflow-hidden hover:border-white transition"
                                >
                                  <img src={thumb} alt="Preview thumbnail" className="w-full h-full object-cover" />
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div
                          className="absolute inset-0"
                          style={{ background: `linear-gradient(135deg, ${g0}, ${g1})` }}
                        />
                      )}
                      <span className="absolute bottom-3 left-3 text-white/30 font-bold text-4xl md:text-5xl">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {/* Icon badge */}
                      <div
                        className={`absolute top-4 left-4 z-[3] w-9 h-9 rounded-[10px] flex items-center justify-center backdrop-blur-sm transition-all duration-300 ${
                          isExpanded
                            ? 'bg-white/10 border border-white/20'
                            : 'bg-black/[0.04] border border-black/10 dark:bg-white/[0.06] dark:border-white/10'
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 transition-colors duration-300 ${
                            isExpanded ? 'text-white' : 'text-black/50 dark:text-white/70'
                          }`}
                        />
                      </div>

                      {/* Abstract 3D geometric shapes - only when not expanded */}
                      {!isExpanded && !images.length && (
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
                    <div
                      className={`p-5 md:p-6 flex flex-col flex-1 transition-all duration-500 ${
                        isExpanded ? 'md:flex-row gap-6 md:gap-12' : ''
                      }`}
                    >
                      {/* Basic Info */}
                      <div className={`${isExpanded ? 'md:w-1/2' : ''}`}>
                        <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug mb-2">{project.title}</h3>

                        <p
                          className={`text-xs md:text-sm text-muted-foreground leading-relaxed mb-6 ${
                            isExpanded ? '' : 'line-clamp-3'
                          }`}
                        >
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
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardExpand(project.slug);
                      }}
                      className="inline-flex items-center gap-2 self-start mt-auto px-4 py-2 rounded-full border border-white/10 text-xs font-semibold tracking-[0.2em] uppercase text-white/80 transition hover:border-white/40 hover:text-white"
                    >
                      {isExpanded ? 'Less' : 'More'}
                      <ChevronRight className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {lightbox && (() => {
        const project = items.find((item) => item.slug === lightbox.project);
        if (!project || !project.gallery?.length) return null;
        const images = project.gallery;
        const total = images.length;
        const currentIndex = ((lightbox.index % total) + total) % total;
        const currentImage = images[currentIndex];

        const goTo = (nextIndex: number) => {
          setLightbox({ project: project.slug, index: ((nextIndex % total) + total) % total });
        };

        return (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                className="absolute -top-10 right-0 text-white/70 hover:text-white p-2"
                onClick={() => setLightbox(null)}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative">
                <img
                  src={currentImage}
                  alt={`${project.title} preview`}
                  className="w-full rounded-2xl border border-white/20 shadow-[0_30px_120px_rgba(0,0,0,0.6)] object-contain max-h-[75vh]"
                />
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="hidden md:flex absolute -left-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(currentIndex - 1);
                      }}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      className="hidden md:flex absolute -right-16 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/25 items-center justify-center"
                      onClick={(e) => {
                        e.stopPropagation();
                        goTo(currentIndex + 1);
                      }}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="mt-6 space-y-3">
                  <div className="flex md:hidden w-full justify-center gap-4">
                    <button
                      type="button"
                      className="w-6 h-6 md:w-12 md:h-12 rounded-full bg-white/15 text-white flex items-center justify-center"
                      onClick={() => goTo(currentIndex - 1)}
                    >
                      <ChevronLeft className="w-3 h-3 md:w-5 md:h-5" />
                    </button>
                    <button
                      type="button"
                      className="w-6 h-6 md:w-12 md:h-12 rounded-full bg-white/15 text-white flex items-center justify-center"
                      onClick={() => goTo(currentIndex + 1)}
                    >
                      <ChevronRight className="w-3 h-3 md:w-5 md:h-5" />
                    </button>
                  </div>

                  <div className="flex justify-center gap-2">
                    {images.map((img, idx) => (
                      <button
                        type="button"
                        key={img}
                        onClick={(e) => {
                          e.stopPropagation();
                          goTo(idx);
                        }}
                        className={`w-1 h-1 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/30'}`}
                      />
                    ))}
                  </div>

                  {/* <p className="text-center text-xs text-white/70 tracking-[0.35em]">
                    {currentIndex + 1} / {total}
                  </p> */}
                </div>
              )}
            </div>
          </div>
        );
      })()}
    </section>
  );
};

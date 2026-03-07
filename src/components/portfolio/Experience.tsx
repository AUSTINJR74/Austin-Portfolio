import { useEffect, useRef, useState } from 'react';
import { SectionHeader } from '@/components/portfolio/SectionHeader';
import { iconMap } from '@/lib/icon-map';
import { GithubProof } from '@/components/portfolio/GithubProof';

interface ExperienceProps {
  sectionLabel: string;
  title: string;
  strategyChips?: string[];
  items: Array<{
    company: string;
    previousName?: string;
    role: string;
    period: string;
    type: string;
    highlights: string[];
  }>;
  githubData?: {
    total: Record<string, number>;
    contributions: {
      date: string;
      count: number;
      level?: number;
    }[];
  };
}

export const Experience = ({ sectionLabel, title, strategyChips = [], items, githubData }: ExperienceProps) => {
  const Building2Icon = iconMap.Building2;
  const CalendarIcon = iconMap.Calendar;
  const ChevronRightIcon = iconMap.ChevronRight;

  const [activeCard, setActiveCard] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  const sectionRef = useRef<HTMLElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const total = rect.height + windowHeight;
      const progress = (windowHeight - rect.top) / total;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.isIntersecting) {
  //           const idx = Number(entry.target.getAttribute('data-index') || '0');
  //           setActiveCard(idx);
  //         }
  //       });
  //     },
  //     {
  //       threshold: [0.35, 0.55, 0.75],
  //       rootMargin: '-10% 0px -10% 0px',
  //     }
  //   );

  //   cardRefs.current.forEach((card) => card && observer.observe(card));
  //   return () => observer.disconnect();
  // }, [items.length]);

  const scrollToCard = (index: number) => {
    const target = cardRefs.current[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const username = 'AUSTINJOSE7';

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-28 md:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.12]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-6xl mx-auto space-y-16">
          <div className="">
            <GithubProof
              username={username}
              data={githubData}
              onViewWork={() => scrollToCard(activeCard)}
            />
          </div>

          <div className="relative">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1.25fr)]">
              {/* Left rail */}
              <div className="lg:pr-12">
                <div className="flex flex-col lg:sticky lg:top-[180px]">
                  <div>
                    <SectionHeader label={sectionLabel} title={title} />
                  <p className="md:mt-6 text-base text-muted-foreground leading-relaxed">
                      Not a list of responsibilities. A record of systems built, performance
                      improved, and products shipped to real users.
                    </p>
                    <div className="mt-10 flex flex-wrap gap-3">
                      {strategyChips.map((chip) => (
                        <span
                          key={chip}
                          className="inline-flex rounded-full p-[1px] bg-gradient-to-br from-cyan-400/70 via-fuchsia-500/60 to-amber-300/30"
                        >
                          <span className=" rounded-full bg-slate-950/70 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.35em] text-slate-200">
                            {chip}
                          </span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Center divider */}
              <div className="hidden lg:flex justify-center">
                <div className="sticky top-40 h-[calc(100vh-8rem)] flex items-center">
                  <div className="relative h-full w-px">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0" />
                    <div
                      className="absolute -left-1.5 w-3 h-3 rounded-full bg-primary shadow-[0_0_20px_rgba(249,115,22,0.8)] transition-transform duration-300"
                      style={{ top: `calc(${scrollProgress * 100}% - 6px)` }}
                    >
                      <div className="absolute inset-0 rounded-full bg-primary/40 animate-ping" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Experience cards */}
              <div className="space-y-12 lg:pl-12">
                {items.map((exp, index) => {
                  const isActive = index === activeCard;
                  return (
                    <div
                      key={`${exp.company}-${index}`}
                      data-index={index}
                      ref={(el) => {
                        cardRefs.current[index] = el;
                      }}
                      className={`relative rounded-2xl border p-6 sm:p-8 transition-all duration-500 scroll-mt-24 ${
                        isActive
                          ? 'border-primary/30 bg-gradient-to-b from-primary/5 to-card shadow-[0_20px_45px_rgba(0,0,0,0.35)]'
                          : 'border-border/90 bg-card/40 backdrop-blur'
                      }`}
                    >
                      <div className="flex max-md:flex-col gap-4 md:items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          {Building2Icon && <Building2Icon className="w-6 h-6 text-primary" />}
                          <div>
                            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                              {exp.company}
                            </h3>
                            {exp.previousName && (
                            <p className="text-xs text-muted-foreground">{exp.previousName}</p>
                            )}
                          </div>
                        </div>
                        <div className="md:text-right">
                          <p className="text-sm text-muted-foreground flex items-center gap-2 md:justify-end">
                            {CalendarIcon && <CalendarIcon className="w-4 h-4" />}
                            {exp.period}
                          </p>
                          <p className="mt-2 inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                            {exp.type}
                          </p>
                        </div>
                      </div>

                      <h4 className="text-xl md:text-3xl font-bold text-primary mb-4">
                        {exp.role}
                      </h4>

                      <div className="space-y-3">
                        {exp.highlights.map((highlight, hIndex) => (
                          <div key={hIndex} className="flex items-start gap-3 text-muted-foreground">
                            {ChevronRightIcon && (
                              <ChevronRightIcon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />
                            )}
                            <p className="text-sm sm:text-base leading-relaxed">{highlight}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

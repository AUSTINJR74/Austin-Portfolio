import { SectionHeader } from '@/components/portfolio/SectionHeader';
import { useEffect, useState } from 'react';

interface AchievementsProps {
  sectionLabel: string;
  title: string;
  items: Array<{
    icon: string;
    metric: string;
    label: string;
    description: string;
  }>;
}

export const Achievements = ({ sectionLabel, title, items }: AchievementsProps) => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(0);

  useEffect(() => {
    setHoveredCard(0);
  }, []);
  
  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.12]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label={sectionLabel} title={title} />

          {/* Achievements Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {items.map((achievement, index) => {
              const step = String(index + 1).padStart(2, '0');
              return (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(0)}
                  className={`group relative overflow-hidden rounded-2xl border bg-card/40 backdrop-blur shadow-card p-7 md:p-9 transition-all duration-300 ${
                    hoveredCard === index 
                      ? 'border-primary/60 shadow-2xl -translate-y-2' 
                      : 'border-border/60 hover:shadow-elevated hover:-translate-y-1 hover:border-primary/40'
                  }`}
                >
                  <div
                    aria-hidden
                    className={`pointer-events-none absolute inset-0 transition-opacity duration-300 ${
                      hoveredCard === index ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    style={{ background: 'radial-gradient(900px circle at 70% 35%, hsl(var(--primary) / 0.22), transparent 60%)' }}
                  />

                  <div className="relative">
                    <div className="text-md md:text-lg font-semibold tracking-[0.22em] uppercase text-primary/80">
                      {achievement.metric}
                    </div>

                    <div
                      aria-hidden
                      className={`absolute right-0 top-0 -translate-y-6 text-[96px] md:text-[120px] font-extrabold tracking-tight transition-opacity duration-300 ${
                        hoveredCard === index ? 'text-foreground/15' : 'text-foreground/5 group-hover:text-foreground/10'
                      }`}
                    >
                      {step}
                    </div>

                    <h3 className="mt-4 text-2xl md:text-3xl font-semibold text-foreground">
                      {achievement.label}
                    </h3>

                    <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed max-w-[54ch]">
                      {achievement.description}
                    </p>

                    <div className="mt-6 h-px w-10 bg-primary/70" />
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

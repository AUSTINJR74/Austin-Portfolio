import { iconMap } from '@/lib/icon-map';
import { SectionHeader } from '@/components/portfolio/SectionHeader';

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
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.12]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label={sectionLabel} title={title} />

          {/* Achievements Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((achievement, index) => {
              const Icon = iconMap[achievement.icon as keyof typeof iconMap];
              return (
                <div
                  key={index}
                  className="group p-6 rounded-xl solais-glass hover:shadow-elevated hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    {Icon && <Icon className="w-5 h-5 text-primary" />}
                  </div>
                  <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                    {achievement.metric}
                  </div>
                  <h3 className="text-base font-semibold text-foreground mb-2">
                    {achievement.label}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {achievement.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

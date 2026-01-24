import { iconMap } from '@/lib/icon-map';

interface ExperienceProps {
  sectionLabel: string;
  title: string;
  items: Array<{
    company: string;
    previousName?: string;
    role: string;
    period: string;
    type: string;
    highlights: string[];
  }>;
}

export const Experience = ({ sectionLabel, title, items }: ExperienceProps) => {
  const Building2Icon = iconMap.Building2;
  const CalendarIcon = iconMap.Calendar;
  const ChevronRightIcon = iconMap.ChevronRight;

  return (
    <section id="experience" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">{sectionLabel}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              {title}
            </h2>
          </div>

          {/* Timeline */}
          <div className="space-y-12">
            {items.map((exp, index) => (
              <div
                key={index}
                className="relative pl-8 border-l-2 border-border hover:border-primary transition-colors duration-300"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />

                {/* Content */}
                <div className="pb-2">
                  {/* Company & Role */}
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {Building2Icon && <Building2Icon className="w-4 h-4 text-muted-foreground" />}
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
                      {CalendarIcon && <CalendarIcon className="w-4 h-4" />}
                      {exp.period}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-secondary text-xs font-medium">
                      {exp.type}
                    </span>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-3">
                    {exp.highlights.map((highlight, hIndex) => (
                      <li key={hIndex} className="flex items-start gap-3 text-muted-foreground">
                        {ChevronRightIcon && <ChevronRightIcon className="w-4 h-4 text-primary mt-1 flex-shrink-0" />}
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

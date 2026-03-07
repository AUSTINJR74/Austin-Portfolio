import { iconMap } from '@/lib/icon-map';
import { SectionHeader } from '@/components/portfolio/SectionHeader';

interface EducationProps {
  sectionLabel: string;
  title: string;
  items: Array<{
    degree: string;
    institution: string;
    period: string;
    grade: string;
  }>;
}

export const Education = ({ sectionLabel, title, items }: EducationProps) => {
  const GraduationCapIcon = iconMap.GraduationCap;
  const AwardIcon = iconMap.Award;

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.14]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeader label={sectionLabel} title={title} />

          {/* Education List */}
          <div className="space-y-6">
            {items.map((edu, index) => (
              <div
                key={index}
                className="flex max-md:flex-col items-start gap-4 p-6 rounded-xl solais-glass"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  {GraduationCapIcon && <GraduationCapIcon className="w-5 h-5 text-primary" />}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-1">
                    <h3 className="text-lg font-semibold text-foreground">
                      {edu.degree}
                    </h3>
                    <span className="text-sm text-muted-foreground">{edu.period}</span>
                  </div>
                  <p className="text-muted-foreground mb-2">{edu.institution}</p>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium">
                    {AwardIcon && <AwardIcon className="w-4 h-4" />}
                    {edu.grade}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

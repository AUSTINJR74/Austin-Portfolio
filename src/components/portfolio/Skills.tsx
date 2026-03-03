import { SectionHeader } from '@/components/portfolio/SectionHeader';

interface SkillsProps {
  sectionLabel: string;
  title: string;
  groups: Array<{
    category: string;
    skills: string[];
  }>;
}

export const Skills = ({ sectionLabel, title, groups }: SkillsProps) => {
  return (
    <section id="skills" className="relative overflow-hidden py-24 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.14]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeader label={sectionLabel} title={title} />

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {groups.map((group, index) => (
              <div
                key={index}
                className="p-6 rounded-xl solais-glass"
              >
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md border border-border hover:border-primary/50 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

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
    <section id="skills" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">{sectionLabel}</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              {title}
            </h2>
          </div>

          {/* Skills Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {groups.map((group, index) => (
              <div
                key={index}
                className="p-6 rounded-xl bg-card border border-border shadow-card"
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

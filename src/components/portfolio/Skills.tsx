import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';

const skillGroups = [
  {
    category: 'Frontend',
    skills: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'Hapi.js', 'REST APIs', 'JWT Auth', 'Elasticsearch'],
  },
  {
    category: 'DevOps & Tools',
    skills: ['Docker', 'Jenkins', 'NGINX', 'Git', 'Grafana', 'Linux'],
  },
  {
    category: 'Analytics & Growth',
    skills: ['Mixpanel', 'GrowthBook', 'Google Search Console', 'Core Web Vitals'],
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="mb-16">
              <span className="text-primary font-mono text-sm tracking-wider uppercase">Skills</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Technical Toolkit
              </h2>
            </div>
          </ScrollReveal>

          {/* Skills Grid */}
          <StaggerContainer className="grid md:grid-cols-2 gap-8">
            {skillGroups.map((group, index) => (
              <StaggerItem key={index}>
                <div className="p-6 rounded-xl bg-card border border-border shadow-card h-full">
                  <h3 className="text-lg font-semibold text-foreground mb-4">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        className="px-3 py-1.5 text-sm font-medium bg-secondary text-secondary-foreground rounded-md border border-border hover:border-primary/50 transition-colors cursor-default"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.15 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

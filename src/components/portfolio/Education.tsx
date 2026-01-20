import { GraduationCap, Award } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const education = [
  {
    degree: 'Bachelor of Engineering - EEE',
    institution: 'Sri Eshwar College of Engineering',
    period: '2020 – 2024',
    grade: 'CGPA: 8.67',
  },
  {
    degree: 'Higher Secondary Certificate (HSC)',
    institution: "St. Peter's Matriculation Higher Secondary School",
    period: '2019 – 2020',
    grade: '71.5%',
  },
  {
    degree: 'Secondary School Leaving Certificate (SSLC)',
    institution: "St. Peter's Matriculation Higher Secondary School",
    period: '2017 – 2018',
    grade: '91.4%',
  },
];

export const Education = () => {
  return (
    <section className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="mb-16">
              <span className="text-primary font-mono text-sm tracking-wider uppercase">Education</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Academic Background
              </h2>
            </div>
          </ScrollReveal>

          {/* Education List */}
          <StaggerContainer className="space-y-6">
            {education.map((edu, index) => (
              <StaggerItem key={index}>
                <div className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-shadow duration-300">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-5 h-5 text-primary" />
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
                      <Award className="w-4 h-4" />
                      {edu.grade}
                    </div>
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

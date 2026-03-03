import { iconMap } from '@/lib/icon-map';
import austinImg from '@/assets/austin.jpeg';

interface AboutProps {
  sectionLabel: string;
  title: string;
  paragraphs: string[];
  highlights: Array<{
    icon: string;
    title: string;
    description: string;
  }>;
}

export const About = ({ sectionLabel, title, paragraphs, highlights }: AboutProps) => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[minmax(0,_0.9fr)_minmax(0,_1.1fr)] gap-8 items-start">
            {/* Left Column - Photo */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-xs md:max-w-sm">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/40 via-primary/10 to-transparent blur-xl" />
                <img
                  src={austinImg}
                  alt="Profile placeholder"
                  className="relative w-full rounded-3xl object-cover border border-border shadow-elevated"
                />
              </div>
            </div>

            {/* Right Column - About Text and Highlights */}
            <div className="space-y-10">

               {/* Section Header */}
              <div className="mb-4">
                <span className="text-primary font-mono text-sm tracking-wider uppercase">{sectionLabel}</span>
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                  {title}
                </h2>
              </div>

              <div className="space-y-6">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg text-muted-foreground leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>

            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-10 md:mt-[100px]">
                {highlights.map((item, index) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <div
                      key={index}
                      className="p-6 rounded-lg bg-card border border-border shadow-card hover:shadow-elevated transition-shadow duration-300"
                    >
                      {Icon && <Icon className="w-8 h-8 text-primary mb-4" />}
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
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

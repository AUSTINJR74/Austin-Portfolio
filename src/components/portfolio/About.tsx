import { iconMap } from '@/lib/icon-map';
import austinImg from '@/assets/austin_dp___.png';
import { SectionHeader } from '@/components/portfolio/SectionHeader';

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
    <section id="about" className="relative overflow-hidden py-20 md:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.10]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[minmax(0,_0.9fr)_minmax(0,_1.1fr)] gap-20 items-start">
            {/* Left Column - Photo */}
            <div className="flex justify-center md:justify-start">
              <div className="relative w-full max-w-xs md:max-w-sm">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-primary/40 via-primary/10 to-transparent blur-xl" />
                <img
                  src={austinImg}
                  alt="Profile placeholder"
                  className="relative w-full rounded-3xl object-cover border border-border shadow-elevated"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                />
              </div>
            </div>

            {/* Right Column - About Text and Highlights */}
            <div className="space-y-10">
              {/* Custom Section Header */}
            <div className="mb-4 md:mb-10">
              <div className="flex items-center gap-3">
                <span className="text-primary font-mono text-xs tracking-[0.22em] uppercase">
                  {sectionLabel}
                </span>
                <span className="text-muted-foreground/70 font-mono text-xs tracking-[0.22em]">
                  ||
                </span>
                <div className="h-px w-10 bg-border" />
              </div>

              <h2 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
                <span className="text-muted-foreground">Meet</span>
                <span className="text-gradient ml-3">Austin Jose</span>
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

          {/* <div className="grid sm:grid-cols-2 gap-6 mt-10 md:mt-[100px]">
                {highlights.map((item, index) => {
                  const Icon = iconMap[item.icon as keyof typeof iconMap];
                  return (
                    <div
                      key={index}
                      className="p-6 rounded-lg solais-glass hover:shadow-elevated transition-shadow duration-300"
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
              </div> */}
        </div>
      </div>
    </section>
  );
};

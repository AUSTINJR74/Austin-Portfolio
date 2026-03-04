import { useNavigate } from 'react-router-dom';
import { iconMap } from '@/lib/icon-map';
import { SectionHeader } from '@/components/portfolio/SectionHeader';

interface ProjectsProps {
  sectionLabel: string;
  title: string;
  description: string;
  items: Array<{
    slug: string;
    gradient: string[];
    icon: string;
    title: string;
    problem: string;
    decisions: string[];
    impact: string;
    stack: string[];
  }>;
}

export const Projects = ({ sectionLabel, title, description, items }: ProjectsProps) => {
  const navigate = useNavigate();

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32">
      {/* <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-80" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.12]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" /> */}

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label={sectionLabel} title={title} description={description} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 mt-16">
            {items.map((project, index) => {
              const Icon = iconMap[project.icon as keyof typeof iconMap];
              const g0 = project.gradient[0];
              const g1 = project.gradient[1] || project.gradient[0];

              return (
                <button
                  key={index}
                  onClick={() => navigate(`/project/${project.slug}`)}
                  className="group relative flex flex-col text-left cursor-pointer rounded-2xl overflow-hidden border bg-black/[0.02] border-black/[0.08] dark:bg-white/[0.03] dark:border-white/[0.07] transition-all duration-[350ms] hover:-translate-y-1 hover:border-black/[0.15] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] dark:hover:border-white/[0.14] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                >
                  {/* ── Visual area ── */}
                  <div className="relative h-[200px] md:h-[220px] overflow-hidden">
                    {/* Icon badge */}
                    <div className="absolute top-4 left-4 z-[3] w-9 h-9 rounded-[10px] flex items-center justify-center bg-black/[0.04] border border-black/10 dark:bg-white/[0.06] dark:border-white/10 backdrop-blur-sm">
                      {Icon && <Icon className="w-4 h-4 text-black/50 dark:text-white/70" />}
                    </div>

                    {/* Abstract 3D geometric shapes */}
                    <div
                      aria-hidden
                      className="absolute -top-[10%] -right-[10%] w-4/5 h-[120%] -rotate-[20deg] transition-transform duration-500 group-hover:-rotate-[8deg] group-hover:scale-105"
                    >
                      <div
                        className="absolute w-[60%] h-[70%] top-[10%] right-[5%] rounded-md opacity-70"
                        style={{ background: `linear-gradient(135deg, ${g0}, ${g1})`, transform: 'skewY(-8deg) rotateZ(6deg)' }}
                      />
                      <div
                        className="absolute w-1/2 h-[55%] top-1/4 right-[20%] rounded opacity-50"
                        style={{ background: `linear-gradient(225deg, ${g1}, ${g0})`, transform: 'skewY(12deg) rotateZ(-4deg)' }}
                      />
                      <div
                        className="absolute w-[35%] h-[45%] top-[5%] right-[35%] rounded-sm opacity-[0.35]"
                        style={{ background: `linear-gradient(180deg, ${g0}cc, ${g1}88)`, transform: 'skewY(-15deg) rotateZ(10deg)' }}
                      />
                      <div
                        className="absolute w-2/5 h-[60%] top-[15%] right-[10%] z-[2]"
                        style={{ background: 'linear-gradient(160deg, transparent 30%, rgba(255,255,255,0.2) 50%, transparent 70%)', transform: 'skewY(-8deg)' }}
                      />
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className="p-5 md:p-6 flex flex-col flex-1">
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                      {project.impact}
                    </p>

                    <span className="inline-flex items-center self-start mt-auto text-[13px] font-medium py-2 px-5 rounded-3xl text-foreground border border-black/[0.15] dark:border-white/[0.15] transition-all duration-[250ms] group-hover:border-black/30 dark:group-hover:border-white/[0.35]">
                      View More
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

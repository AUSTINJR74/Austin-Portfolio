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

          <div className="proj-grid mt-16">
            {items.map((project, index) => {
              const Icon = iconMap[project.icon as keyof typeof iconMap];
              const g0 = project.gradient[0];
              const g1 = project.gradient[1] || project.gradient[0];

              return (
                <button
                  key={index}
                  onClick={() => navigate(`/project/${project.slug}`)}
                  className="proj-card group border"
                >
                  {/* ── Visual area ── */}
                  <div className="proj-visual">
                    {/* Icon badge */}
                    <div className="proj-icon-badge">
                      {Icon && <Icon className="w-4 h-4 text-white/70" />}
                    </div>

                    {/* Abstract 3D geometric shapes */}
                    <div className="proj-abstract" aria-hidden>
                      <div
                        className="proj-shard proj-shard-1"
                        style={{ background: `linear-gradient(135deg, ${g0}, ${g1})` }}
                      />
                      <div
                        className="proj-shard proj-shard-2"
                        style={{ background: `linear-gradient(225deg, ${g1}, ${g0})` }}
                      />
                      <div
                        className="proj-shard proj-shard-3"
                        style={{ background: `linear-gradient(180deg, ${g0}cc, ${g1}88)` }}
                      />
                      <div className="proj-shard proj-shard-shine" />
                    </div>
                  </div>

                  {/* ── Content ── */}
                  <div className="proj-body">
                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug mb-2">
                      {project.title}
                    </h3>

                    <p className="text-xs md:text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-6">
                      {project.impact}
                    </p>

                    <span className="proj-view-btn">View More</span>
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

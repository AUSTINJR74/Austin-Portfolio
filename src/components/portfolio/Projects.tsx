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
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-80" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.12]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader label={sectionLabel} title={title} description={description} />

          {/* 3D Glass Cards */}
          <div className="glass-scene mt-16">
            {items.map((project, index) => {
              const Icon = iconMap[project.icon as keyof typeof iconMap];
              const grad = `linear-gradient(135deg, ${project.gradient.join(', ')})`;
              // Stagger rotations for 3D depth
              const rotations = [
                'rotateY(-8deg) rotateX(4deg) rotateZ(1deg)',
                'rotateY(0deg) rotateX(-2deg) rotateZ(0deg)',
                'rotateY(8deg) rotateX(4deg) rotateZ(-1deg)',
              ];

              return (
                <button
                  key={index}
                  onClick={() => navigate(`/project/${project.slug}`)}
                  className="glass-card group"
                  style={{
                    '--card-rotation': rotations[index] || rotations[1],
                    '--card-gradient': grad,
                  } as React.CSSProperties}
                >
                  {/* Glass reflection layer */}
                  <div className="glass-reflection" />

                  {/* Edge light */}
                  <div className="glass-edge-light" />

                  {/* Content */}
                  <div className="glass-content">
                    <div className="flex items-center gap-2 mb-4">
                      {Icon && <Icon className="w-5 h-5 md:w-6 md:h-6 text-foreground/60" />}
                      <span className="text-[9px] md:text-[10px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                        {project.stack.slice(0, 3).join(' · ')}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-foreground leading-snug mb-3">
                      {project.title}
                    </h3>

                    <p className="text-xs md:text-sm text-muted-foreground/70 leading-relaxed line-clamp-3 my-6">
                      {project.impact}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.stack.slice(0, 4).map((t, i) => (
                        <span
                          key={i}
                          className="text-[9px] md:text-[10px] font-mono px-2.5 py-1 rounded-full bg-foreground/[0.06] text-muted-foreground/60 border border-foreground/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom gradient fade */}
                  <div className="glass-gradient" />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

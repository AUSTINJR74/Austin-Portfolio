import { useParams, useNavigate } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { iconMap } from '@/lib/icon-map';
import portfolioData from '@/data/portfolio-data.json';
import { ArrowLeft } from 'lucide-react';
import { useEffect } from 'react';

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const project = portfolioData.projects.items.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Project Not Found</h1>
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:underline"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  const Icon = iconMap[project.icon as keyof typeof iconMap];

  return (
    <div className="min-h-screen bg-background relative">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-subtle" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.06]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="relative z-10">
        {/* Header bar */}
        <div className="border-b border-border/50 backdrop-blur-md bg-background/80 sticky top-0 z-20">
          <div className="container mx-auto px-6 py-4 flex items-center gap-4">
            <button
              onClick={() => navigate('/#projects')}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Projects
            </button>
          </div>
        </div>

        {/* Hero */}
        <div className="relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-10"
            style={{ background: `linear-gradient(135deg, ${project.gradient.join(', ')})` }}
          />
          <div className="container mx-auto px-6 py-16 md:py-24">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, ${project.gradient.join(', ')})` }}
                >
                  {Icon && <Icon className="w-6 h-6 text-foreground" />}
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech, i) => (
                    <Badge key={i} variant="secondary" className="font-mono text-xs">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight mb-6">
                {project.title}
              </h1>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Problem */}
            <section>
              <h2 className="text-xs font-mono tracking-[0.22em] uppercase text-primary mb-4">
                The Problem
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {project.problem}
              </p>
            </section>

            {/* Technical Decisions */}
            <section>
              <h2 className="text-xs font-mono tracking-[0.22em] uppercase text-primary mb-6">
                Technical Decisions
              </h2>
              <div className="space-y-4">
                {project.decisions.map((decision, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-4 p-4 rounded-xl solais-glass"
                  >
                    <span className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {i + 1}
                    </span>
                    <p className="text-foreground pt-1">{decision}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Impact */}
            <section>
              <h2 className="text-xs font-mono tracking-[0.22em] uppercase text-primary mb-4">
                Impact
              </h2>
              <div
                className="p-6 md:p-8 rounded-2xl border-l-4"
                style={{ borderColor: project.gradient[project.gradient.length - 1], backgroundColor: `${project.gradient[0]}20` }}
              >
                <p className="text-lg md:text-xl font-semibold text-foreground leading-relaxed">
                  {project.impact}
                </p>
              </div>
            </section>

            {/* Tech Stack */}
            <section>
              <h2 className="text-xs font-mono tracking-[0.22em] uppercase text-primary mb-4">
                Tech Stack
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.stack.map((tech, i) => (
                  <div
                    key={i}
                    className="px-4 py-2 rounded-lg solais-glass text-sm font-medium text-foreground"
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

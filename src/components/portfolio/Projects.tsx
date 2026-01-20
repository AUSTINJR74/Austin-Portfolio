import { Server, Video, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from '@/components/animations/ScrollReveal';
import { motion } from 'framer-motion';

const projects = [
  {
    icon: Server,
    title: 'CMS-Based Legal Services Platform',
    problem: 'Engineering team bottleneck for content updates; slow time-to-market for new pages.',
    decisions: [
      'SSR for SEO-critical pages to maximize crawlability',
      'CMS-driven layouts with API-first content delivery',
      'Component library for consistent UI across dynamically generated pages',
    ],
    impact: 'Reduced engineering dependency for content updates by 80%, enabling marketing team to ship pages independently.',
    stack: ['Next.js', 'React', 'TypeScript', 'REST APIs', 'Headless CMS'],
  },
  {
    icon: Video,
    title: 'Video Consultation Web Application',
    problem: 'Need for real-time legal consultations with reliable, low-latency video.',
    decisions: [
      'WebRTC for peer-to-peer video with fallback TURN servers',
      'WebSocket for signaling and real-time state synchronization',
      'Integrated authentication and payment flow',
    ],
    impact: 'Delivered production-ready video consultations with <200ms latency and seamless payment integration.',
    stack: ['React', 'WebRTC', 'WebSockets', 'Node.js', 'Payment Gateway'],
  },
  {
    icon: Search,
    title: 'Lawyers Listing & Public Q&A Platform',
    problem: 'Large datasets of lawyers and Q&A content requiring fast search and SEO visibility.',
    decisions: [
      'Server-rendered pages for search engine indexing',
      'Elasticsearch for sub-second search across 100K+ records',
      'JWT-based authentication with role-based access',
    ],
    impact: 'Achieved 99.9% uptime with <100ms search response times serving high-traffic legal queries.',
    stack: ['Next.js', 'Hapi.js', 'Elasticsearch', 'JWT', 'PostgreSQL'],
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <ScrollReveal>
            <div className="mb-16">
              <span className="text-primary font-mono text-sm tracking-wider uppercase">Projects</span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
                Case Studies
              </h2>
              <p className="text-muted-foreground mt-4 max-w-2xl">
                Real production systems with measurable outcomes. Each project represents 
                a problem solved, not just code written.
              </p>
            </div>
          </ScrollReveal>

          {/* Projects Grid */}
          <div className="grid gap-8">
            {projects.map((project, index) => (
              <ScrollReveal key={index} delay={index * 0.1}>
                <motion.article
                  className="group p-8 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated transition-all duration-300"
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left - Icon & Title */}
                    <div className="lg:w-1/3">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                        <project.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-foreground mb-4">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {project.stack.map((tech, techIndex) => (
                          <Badge
                            key={techIndex}
                            variant="secondary"
                            className="font-mono text-xs"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Right - Details */}
                    <div className="lg:w-2/3 space-y-6">
                      {/* Problem */}
                      <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                          Problem
                        </h4>
                        <p className="text-muted-foreground">{project.problem}</p>
                      </div>

                      {/* Technical Decisions */}
                      <div>
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                          Technical Decisions
                        </h4>
                        <ul className="space-y-2">
                          {project.decisions.map((decision, dIndex) => (
                            <li key={dIndex} className="flex items-start gap-2 text-muted-foreground">
                              <span className="text-primary mt-1.5">→</span>
                              <span>{decision}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Impact */}
                      <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
                        <h4 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">
                          Impact
                        </h4>
                        <p className="text-foreground font-medium">{project.impact}</p>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

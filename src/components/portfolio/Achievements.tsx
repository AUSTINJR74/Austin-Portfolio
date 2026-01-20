import { TrendingUp, Search, Gauge, Award } from 'lucide-react';

const achievements = [
  {
    icon: Search,
    metric: '3,000+',
    label: 'Underperforming Pages Fixed',
    description: 'Reduced poor-performing pages to zero in Google Search Console through systematic technical SEO improvements.',
  },
  {
    icon: TrendingUp,
    metric: '8%',
    label: 'Search Impressions Increase',
    description: 'Achieved measurable SEO lift within 10 days through structured data and meta tag optimizations.',
  },
  {
    icon: Gauge,
    metric: 'CWV',
    label: 'Core Web Vitals Green',
    description: 'Optimized LCP, FID, and CLS across mobile and desktop for production applications.',
  },
  {
    icon: Award,
    metric: '99.9%',
    label: 'Application Uptime',
    description: 'Maintained high availability for legal services platform serving thousands of daily users.',
  },
];

export const Achievements = () => {
  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="mb-16">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">Achievements</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
              Measurable Impact
            </h2>
          </div>

          {/* Achievements Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="group p-6 rounded-xl bg-card border border-border shadow-card hover:shadow-elevated hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <achievement.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {achievement.metric}
                </div>
                <h3 className="text-base font-semibold text-foreground mb-2">
                  {achievement.label}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

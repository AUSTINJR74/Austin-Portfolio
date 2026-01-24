import { Button } from '@/components/ui/button';
import { iconMap } from '@/lib/icon-map';

interface HeroProps {
  statusBadge: string;
  headline: {
    text: string;
    highlight: string;
    suffix: string;
  };
  subheadline: string;
  ctaButtons: Array<{
    label: string;
    href: string;
    variant: string;
  }>;
  stats: Array<{
    value: string;
    label: string;
  }>;
}

export const Hero = ({ statusBadge, headline, subheadline, ctaButtons, stats }: HeroProps) => {
  const ArrowRightIcon = iconMap.ArrowRight;
  const MailIcon = iconMap.Mail;

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-subtle" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
            <span className="text-sm text-muted-foreground">
              {statusBadge}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 animate-fade-up">
            {headline.text}{' '}
            <span className="text-gradient">{headline.highlight}</span>
            <br />
            {headline.suffix}
          </h1>

          {/* Sub-headline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {subheadline}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: '0.2s' }}>
            {ctaButtons.map((button, index) => {
              const Icon = index === 0 ? ArrowRightIcon : MailIcon;
              return (
                <Button
                  key={index}
                  size="lg"
                  variant={button.variant === 'primary' ? 'default' : 'outline'}
                  className={button.variant === 'primary' 
                    ? "bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity glow-hover px-8 py-6 text-base font-semibold"
                    : "border-border hover:bg-secondary px-8 py-6 text-base font-semibold"}
                  asChild
                >
                  <a href={button.href}>
                    {button.variant === 'outline' && <Icon className="mr-2 h-5 w-5" />}
                    {button.label}
                    {button.variant === 'primary' && <Icon className="ml-2 h-5 w-5" />}
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 pt-8 border-t border-border animate-fade-up" style={{ animationDelay: '0.3s' }}>
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

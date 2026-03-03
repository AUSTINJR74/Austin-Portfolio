import { Button } from '@/components/ui/button';
import { iconMap } from '@/lib/icon-map';
import ChatBot from './Bot';

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
    <section className="min-h-[100svh] md:min-h-screen flex items-center justify-center relative overflow-hidden pt-16 sm:pt-20">
      {/* Solaïs-inspired backdrop (keeps your theme tokens) */}
      <div aria-hidden className="absolute inset-0 bg-gradient-subtle" />
      <div aria-hidden className="absolute inset-0 solais-sweep opacity-70" />
      <div
        aria-hidden
        className={[
          "pointer-events-none absolute left-1/2 top-0 h-[900px] w-[1400px] -translate-x-1/2",
          "origin-top solais-grid opacity-[0.18]",
          "[transform:perspective(900px)_rotateX(66deg)]",
          "[mask-image:radial-gradient(closest-side,black,transparent)]",
        ].join(" ")}
      />
      <div aria-hidden className="absolute inset-0 solais-vignette opacity-70" />
      <div aria-hidden className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/6 rounded-full blur-3xl" />
      <div aria-hidden className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/4 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10 max-md:my-10">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] gap-10 items-center">
          {/* Left: Hero copy */}
          <div className="max-w-3xl text-center md:text-left">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
              <span className="text-sm text-muted-foreground">
                {statusBadge}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.98] text-foreground mb-6 animate-fade-up">
              {headline.text}{' '}
              <span className="text-gradient">{headline.highlight}</span>
              <br />
              {headline.suffix}
            </h1>

            {/* Sub-headline */}
            <p
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 animate-fade-up"
              style={{ animationDelay: '0.1s' }}
            >
              {subheadline}
            </p>

            {/* CTA Buttons */}
            <div
              className="flex flex-col sm:flex-row items-center sm:items-stretch justify-start gap-4 animate-fade-up"
              style={{ animationDelay: '0.2s' }}
            >
              {ctaButtons.map((button, index) => {
                const Icon = index === 0 ? ArrowRightIcon : MailIcon;
                return (
                  <Button
                    key={index}
                    size="lg"
                    variant={button.variant === 'primary' ? 'default' : 'outline'}
                    className={
                      button.variant === 'primary'
                        ? 'bg-gradient-primary text-primary-foreground hover:opacity-90 transition-opacity glow-hover px-8 py-6 text-sm font-semibold font-mono tracking-[0.16em] uppercase'
                        : 'border-border/70 bg-background/20 hover:bg-secondary/40 px-8 py-6 text-sm font-semibold font-mono tracking-[0.16em] uppercase backdrop-blur'
                    }
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
            <div
              className="grid grid-cols-3 gap-4 sm:gap-8 max-w-lg mt-12 sm:mt-16 pt-8 border-t border-border animate-fade-up"
              style={{ animationDelay: '0.3s' }}
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Chat bot */}
          <div>
            <ChatBot />
          </div>
        </div>
      </div>
    </section>
  );
};

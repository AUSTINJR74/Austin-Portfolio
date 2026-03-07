import { Button } from '@/components/ui/button';
import { iconMap } from '@/lib/icon-map';
import { SectionHeader } from '@/components/portfolio/SectionHeader';

interface FooterProps {
  sectionLabel: string;
  title: string;
  description: string;
  socialLinks: Array<{
    icon: string;
    label: string;
    href: string;
    username?: string;
  }>;
  copyright: string;
}

export const Footer = ({ sectionLabel, title, description, socialLinks, copyright }: FooterProps) => {
  const ArrowUpRightIcon = iconMap.ArrowUpRight;

  return (
    <footer id="contact" className="relative overflow-hidden py-20 md:py-32 border-t border-border">
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-60" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.10]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto ">
          {/* CTA Section */}
          <SectionHeader
            label={sectionLabel}
            title={title}
            description={description}
            className="text-left sm:"
          />

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mb-16">
            {socialLinks.map((link, index) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full sm:w-auto px-6 py-6 justify-between sm:justify-center gap-3 group solais-glass hover:shadow-elevated"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {Icon && <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />}
                    <span className="font-medium">{link.label}</span>
                    {ArrowUpRightIcon && <ArrowUpRightIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />}
                  </a>
                </Button>
              );
            })}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              {copyright.replace('{year}', new Date().getFullYear().toString())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

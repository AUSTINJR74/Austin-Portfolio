import { Button } from '@/components/ui/button';
import { iconMap } from '@/lib/icon-map';

interface FooterProps {
  sectionLabel: string;
  title: string;
  description: string;
  socialLinks: Array<{
    icon: string;
    label: string;
    href: string;
    username: string;
  }>;
  copyright: string;
}

export const Footer = ({ sectionLabel, title, description, socialLinks, copyright }: FooterProps) => {
  const ArrowUpRightIcon = iconMap.ArrowUpRight;

  return (
    <footer id="contact" className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* CTA Section */}
          <span className="text-primary font-mono text-sm tracking-wider uppercase">{sectionLabel}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            {title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            {description}
          </p>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {socialLinks.map((link, index) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full sm:w-auto px-6 py-6 justify-between sm:justify-center gap-3 group"
                  asChild
                >
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {Icon && <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />}
                    <span className="font-medium">{link.username}</span>
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

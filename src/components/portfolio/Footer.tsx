import { Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  {
    icon: Mail,
    label: 'Email',
    href: 'mailto:austinjr74@gmail.com',
    username: 'austinjr74@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/austinjr74/',
    username: 'austinjr74',
  },
  {
    icon: Github,
    label: 'GitHub',
    href: 'https://github.com/austinjr74',
    username: 'austinjr74',
  },
];

export const Footer = () => {
  return (
    <footer id="contact" className="py-24 md:py-32 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* CTA Section */}
          <span className="text-primary font-mono text-sm tracking-wider uppercase">Contact</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Let's Build Something Fast
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            I'm always interested in discussing high-performance web systems, 
            frontend architecture, and scalable solutions.
          </p>

          {/* Social Links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            {socialLinks.map((link, index) => (
              <Button
                key={index}
                variant="outline"
                className="w-full sm:w-auto px-6 py-6 justify-between sm:justify-center gap-3 group"
                asChild
              >
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="font-medium">{link.username}</span>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                </a>
              </Button>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Built with performance in mind. © {new Date().getFullYear()} Austin Jose R
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

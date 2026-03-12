import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Briefcase } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContexts';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  navLinks: Array<{
    href: string;
    label: string;
  }>;
  ctaButtons: Array<{
    label: string;
    href: string;
    variant: string;
  }>;
}

export const Header = ({ navLinks, ctaButtons }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 max-md:bg-background/70 max-md:backdrop-blur-xl max-md:border-b max-md:border-border/60 ${
        isScrolled
          ? 'md:bg-background/70 md:backdrop-blur-xl md:border-b md:border-border/60'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          {/* {theme === 'dark' ? ( */}
            <img src="/asjs-logo-light.png" alt="ASJS Logo" className="h-full w-auto" />
          {/* ) : ( */}
            {/* <img src="/asjs-logo-dark.png" alt="ASJS Logo" className="h-full w-auto" /> */}
          {/* )} */}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-3 font-mono text-xs tracking-[0.22em] uppercase">
              {navLinks.map((link, idx) => (
                <div key={link.href} className="flex items-center gap-3">
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                  {idx < navLinks.length - 1 ? (
                    <span className="text-muted-foreground/60">/</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4">
            {/* Hire Me Button - Mobile Only */}
            <Button
              size="sm"
              variant="outline"
              className="md:hidden border-border/70 bg-background/20 hover:bg-secondary/40 hover:text-primary px-3 py-2 text-xs font-semibold font-mono tracking-[0.16em] uppercase backdrop-blur"
              onClick={() => {
                window.open(ctaButtons[1].href, '_blank');
              }}
            >
              <Briefcase className="mr-1 h-4 w-4" />
              {ctaButtons[1].label}
            </Button>

            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button> */}

            <button
              className="md:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

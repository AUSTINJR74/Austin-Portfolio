import { SectionHeader } from '@/components/portfolio/SectionHeader';
import { useCallback, useEffect, useRef, useState } from 'react';

interface SkillsProps {
  sectionLabel: string;
  title: string;
  groups: Array<{
    category: string;
    skills: string[];
  }>;
}

// Icons grouped per card row — placed on the opposite side, organized near the card
// Each group's icons sit beside the card with a parallax speed multiplier
const ICON_GROUPS: Array<{
  icons: Array<{ name: string; x: number; y: number; size: number; rotate: number; speed: number }>;
}> = [
  // Row 0 — Frontend (card right) → icons on left, organized in a neat cluster
  {
    icons: [
      { name: 'react', x: 13, y: -10, size: 54, rotate: -8, speed: 0.15 },
      { name: 'javascript', x: 22, y: 10, size: 56, rotate: 6, speed: 0.2 },
      { name: 'html5', x: 6, y: 50, size: 58, rotate: -4, speed: 0.12 },
      { name: 'css3', x: 28, y: 90, size: 60, rotate: 10, speed: 0.18 },
      { name: 'typescript', x: 38, y: -5, size: 62, rotate: -12, speed: 0.22 },
    ],
  },
  // Row 1 — Backend (card left) → icons on right
  {
    icons: [
      { name: 'nodejs', x: 60, y: -10, size: 64, rotate: -6, speed: 0.18 },
      { name: 'express', x: 76, y: -6, size: 66, rotate: 8, speed: 0.14 },
      { name: 'mongodb', x: 70, y: 45, size: 68, rotate: -10, speed: 0.2 },
      { name: 'postgresql', x: 82, y: 80, size: 70, rotate: 5, speed: 0.16 },
    ],
  },
  // Row 2 — DevOps (card right) → icons on left
  {
    icons: [
      { name: 'docker', x: 6, y: -8, size: 64, rotate: 6, speed: 0.16 },
      { name: 'jenkins', x: 15, y: 8, size: 66, rotate: -10, speed: 0.22 },
      { name: 'git', x: 34, y: -6, size: 70, rotate: -8, speed: 0.19 },
      { name: 'nginx', x: 26, y: 42, size: 72, rotate: 12, speed: 0.17 },
    ],
  },
  // Row 3 — Analytics (card left) → icons on right
  {
    icons: [
      { name: 'google', x: 64, y: -6, size: 72, rotate: -5, speed: 0.18 },
      { name: 'grafana', x: 80, y: 10, size: 74, rotate: 8, speed: 0.14 },
    ],
  },
];

const getDevIconUrl = (name: string) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`;

const CARD_THEMES = [
  { accent: '#6366f1', accentLight: '#818cf8', accentDark: '#4f46e5', bg: 'rgba(99,102,241,0.08)', border: 'rgba(99,102,241,0.35)', tagBg: 'rgba(99,102,241,0.12)', tagBorder: 'rgba(99,102,241,0.25)', tagText: '#4338ca', glow: 'rgba(99,102,241,0.15)', tilt: -2.5 },
  { accent: '#f59e0b', accentLight: '#fbbf24', accentDark: '#d97706', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.35)', tagBg: 'rgba(245,158,11,0.12)', tagBorder: 'rgba(245,158,11,0.25)', tagText: '#b45309', glow: 'rgba(245,158,11,0.15)', tilt: 2 },
  { accent: '#10b981', accentLight: '#34d399', accentDark: '#059669', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.35)', tagBg: 'rgba(16,185,129,0.12)', tagBorder: 'rgba(16,185,129,0.25)', tagText: '#047857', glow: 'rgba(16,185,129,0.15)', tilt: -1.5 },
  { accent: '#ec4899', accentLight: '#f472b6', accentDark: '#db2777', bg: 'rgba(236,72,153,0.08)', border: 'rgba(236,72,153,0.35)', tagBg: 'rgba(236,72,153,0.12)', tagBorder: 'rgba(236,72,153,0.25)', tagText: '#be185d', glow: 'rgba(236,72,153,0.15)', tilt: 2.5 },
];

export const Skills = ({ sectionLabel, title, groups }: SkillsProps) => {
  const [visible, setVisible] = useState<Set<number>>(new Set());
  const [isDesktop, setIsDesktop] = useState(false);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const iconContainerRef = useRef<HTMLDivElement | null>(null);

  // Track viewport width for tilt (desktop only)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = Number(entry.target.getAttribute('data-index'));
          if (entry.isIntersecting) {
            setVisible((prev) => new Set(prev).add(idx));
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, [groups]);

  // Parallax scroll for floating icons
  useEffect(() => {
    let raf = 0;
    const section = sectionRef.current;
    const container = iconContainerRef.current;
    if (!section || !container) return;

    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // scrollProgress: 0 when section enters bottom, 1 when it leaves top
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (rect.height + vh)));

      const icons = container.querySelectorAll<HTMLElement>('[data-parallax-speed]');
      icons.forEach((el) => {
        const speed = parseFloat(el.dataset.parallaxSpeed || '0');
        const offset = (progress - 0.3) * speed * 1000; // ±px based on scroll
        el.style.transform = `translateY(${offset}px) rotate(${el.dataset.rotate || 0}deg)`;
      });
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (window.innerWidth < 768) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);

    card.style.transform = `perspective(900px) rotateX(${dy * -5}deg) rotateY(${dx * 5}deg) translateY(-6px) scale(1.02)`;
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    e.currentTarget.style.transform = '';
  }, []);

  const sides: Array<'left' | 'right'> = groups.map((_, i) =>
    i % 2 === 0 ? 'right' : 'left'
  );

  return (
    <section
      ref={(n) => { sectionRef.current = n; }}
      id="skills"
      className="relative overflow-hidden py-24 md:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-grid opacity-[0.14]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-70" />

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeader label={sectionLabel} title={title} />

          <div
            ref={(n) => { iconContainerRef.current = n; }}
            className="mt-16 flex flex-col gap-8 md:gap-12"
          >
            {groups.map((group, index) => {
              const theme = CARD_THEMES[index % CARD_THEMES.length];
              const side = sides[index];
              const isVis = visible.has(index);
              const tiltDeg = isDesktop && isVis ? theme.tilt : 0;
              const slideX = isDesktop && !isVis ? (side === 'right' ? 80 : -80) : 0;
              const iconGroup = ICON_GROUPS[index % ICON_GROUPS.length];

              return (
                <div key={index} className="relative">
                  {/* Floating icons beside this card — desktop only */}
                  {isDesktop && iconGroup.icons.map((ic, ii) => (
                    <img
                      key={ii}
                      src={getDevIconUrl(ic.name)}
                      alt=""
                      loading="lazy"
                      data-parallax-speed={ic.speed}
                      data-rotate={ic.rotate}
                      className="absolute hidden md:block pointer-events-none dark:opacity-[0.40] transition-transform duration-100"
                      style={{
                        left: `${ic.x}%`,
                        top: ic.y,
                        width: ic.size,
                        height: ic.size,
                        transform: `rotate(${ic.rotate}deg)`,
                      }}
                    />
                  ))}

                  {/* Skill card */}
                  <div
                    data-index={index}
                    ref={(n) => { cardRefs.current[index] = n; }}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    style={{
                      transformStyle: 'preserve-3d',
                      willChange: 'transform',
                      background: `linear-gradient(135deg, ${theme.bg}, transparent 60%)`,
                      borderColor: isVis ? theme.border : 'transparent',
                      borderLeftWidth: '3px',
                      borderLeftColor: theme.accent,
                      boxShadow: isVis ? `0 4px 40px ${theme.glow}` : 'none',
                      transform: `translateY(${isVis ? 0 : 40}px) translateX(${slideX}px) rotate(${tiltDeg}deg)`,
                      opacity: isVis ? 1 : 0,
                      transition: 'transform 2s cubic-bezier(0.22,1,0.36,1), opacity 0.7s ease-out, box-shadow 0.7s ease-out, border-color 1s ease',
                    }}
                    className={`
                      group relative w-full md:w-[50%] overflow-hidden
                      rounded-xl border backdrop-blur-sm
                      p-5 sm:p-6 md:p-8 z-[2]
                      ${side === 'right' ? 'md:ml-auto' : 'md:mr-auto'}
                    `}
                  >
                    {/* Colored top-edge glow line */}
                    <div
                      aria-hidden
                      className="absolute top-0 left-0 right-0 h-[2px]"
                      style={{ background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentLight}, transparent)` }}
                    />

                    <div className="relative z-10">
                      <h3
                        className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight skill-card-heading"
                        style={{ '--heading-light': theme.accentDark, '--heading-dark': theme.accentLight } as React.CSSProperties}
                      >
                        {group.category}
                      </h3>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {group.skills.map((skill, si) => (
                          <span
                            key={si}
                            className="px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 skill-card-tag"
                            style={{
                              background: theme.tagBg,
                              border: `1px solid ${theme.tagBorder}`,
                              '--tag-light': theme.tagText,
                              '--tag-dark': theme.accentLight,
                            } as React.CSSProperties}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

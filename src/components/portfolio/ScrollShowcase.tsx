import { useRef, useEffect, useState } from 'react';

interface Phase {
  type: string;
  fileName?: string;
  code?: string;
  icon?: string;
  title?: string;
  subtitle?: string;
  bars?: Array<{ label: string; value: number }>;
  url?: string;
  statusLabel?: string;
  stats?: Array<{ value: string; label: string }>;
  image?: string;
  sectionLabel?: string;
  headline?: string;
  headlineHighlight?: string;
  description?: string;
}

interface ScrollShowcaseProps {
  backgroundText: string[];
  phases: Phase[];
}

export const ScrollShowcase = ({ backgroundText, phases }: ScrollShowcaseProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [pin, setPin] = useState<'before' | 'pinned' | 'after'>('before');

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (!sectionRef.current) { ticking = false; return; }
        const rect = sectionRef.current.getBoundingClientRect();
        const vh = window.innerHeight;
        const scrollable = rect.height - vh;
        if (scrollable <= 0) { ticking = false; return; }

        const p = Math.max(0, Math.min(1, -rect.top / scrollable));
        setProgress(p);

        if (rect.top > 0) {
          setPin('before');
        } else if (rect.bottom <= vh) {
          setPin('after');
        } else {
          setPin('pinned');
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── phase opacity helpers ── */
  const fade = (start: number, end: number) => {
    if (progress < start) return 0;
    if (progress > end) return 0;
    const mid = (start + end) / 2;
    const halfLen = (end - start) / 2;
    if (progress < mid) return Math.min(1, (progress - start) / (halfLen * 0.6));
    return Math.max(0, 1 - (progress - mid) / (halfLen * 0.6));
  };

  const p1 = fade(0, 0.3);
  const p2 = fade(0.2, 0.5);
  const p3 = fade(0.42, 0.72);
  const p4 = Math.max(0, Math.min(1, (progress - 0.65) / 0.25));

  /* background text */
  const bgScale = 1 + progress * 0.4;
  const bgOpacity = Math.max(0.03, 0.35 - progress * 0.5);

  /* pin style — works regardless of ancestor overflow */
  const pinStyle: React.CSSProperties =
    pin === 'pinned'
      ? { position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 30 }
      : pin === 'after'
        ? { position: 'absolute', bottom: 0, left: 0, width: '100%' }
        : { position: 'absolute', top: 0, left: 0, width: '100%' };

  return (
    <section ref={sectionRef} style={{ height: '400vh' }} className="relative">
      <div
        ref={innerRef}
        className="h-screen flex items-center justify-center overflow-hidden bg-background"
        style={pinStyle}
      >
        {/* decorative */}
        <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-30" />
        <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-60" />

        {/* ── Large background text ── */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ transform: `scale(${bgScale})`, opacity: bgOpacity }}
        >
          <div className="text-center leading-[0.9]">
            {backgroundText.map((word, i) => (
              <span
                key={i}
                className={`block text-[14vw] tracking-tighter text-foreground ${
                  i % 2 === 1 ? 'font-extralight italic' : 'font-extrabold'
                }`}
              >
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* ── PHASE 1 — Code / Concept ── */}
        {phases[0] && (
          <div
            className="absolute inset-0 flex items-center justify-center px-4 transition-none"
            style={{ opacity: p1, transform: `scale(${0.92 + p1 * 0.08})`, willChange: 'transform, opacity' }}
          >
            <div className="w-full max-w-2xl rounded-xl border border-border/50 bg-card/70 backdrop-blur-lg p-5 md:p-6 shadow-elevated">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
                <div className="w-3 h-3 rounded-full bg-[#28C840]" />
                <span className="ml-3 text-[11px] font-mono text-muted-foreground/60">{phases[0].fileName}</span>
              </div>
              <pre className="text-xs md:text-sm font-mono text-muted-foreground leading-relaxed overflow-hidden">
                <code>{phases[0].code}</code>
              </pre>
            </div>
          </div>
        )}

        {/* ── PHASE 2 — Building / Compiling ── */}
        {phases[1] && (
          <div
            className="absolute inset-0 flex items-center justify-center px-4 transition-none"
            style={{ opacity: p2, transform: `scale(${0.9 + p2 * 0.1})`, willChange: 'transform, opacity' }}
          >
            <div className="w-full max-w-2xl rounded-2xl border border-primary/20 bg-card/80 backdrop-blur-xl p-6 md:p-8 shadow-elevated">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
                  <span className="text-primary-foreground font-bold text-lg">{phases[1].icon}</span>
                </div>
                <div>
                  <div className="font-semibold text-foreground text-sm md:text-base">{phases[1].title}</div>
                  <div className="text-[11px] md:text-xs text-muted-foreground">{phases[1].subtitle}</div>
                </div>
              </div>

              <div className="space-y-4">
                {phases[1].bars?.map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
                      <span>{item.label}</span>
                      <span>{item.value}%</span>
                    </div>
                    <div className="h-1.5 bg-primary/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-primary rounded-full showcase-bar-fill"
                        style={{ '--bar-width': `${item.value}%` } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── PHASE 3 — Deployed / Live ── */}
        {phases[2] && (
          <div
            className="absolute inset-0 flex items-center justify-center px-4 transition-none"
            style={{ opacity: p3, transform: `scale(${0.88 + p3 * 0.12})`, willChange: 'transform, opacity' }}
          >
            <div className="w-full max-w-2xl">
              {/* browser chrome */}
              <div className="rounded-t-xl bg-muted/90 border border-border px-4 py-2.5 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </div>
                <div className="flex-1 bg-background/60 rounded-md px-3 py-1 text-[11px] text-muted-foreground font-mono truncate">
                  {phases[2].url}
                </div>
              </div>
              {/* page body */}
              <div className="rounded-b-xl bg-card/90 border border-t-0 border-border overflow-hidden backdrop-blur-xl">
                {phases[2].image ? (
                  <img
                    src={phases[2].image}
                    alt={phases[2].title || 'Deployed website'}
                    className="w-full h-auto block"
                  />
                ) : (
                  <div className="p-6 md:p-8 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium mb-4">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                      {phases[2].statusLabel}
                    </div>
                    <div className="text-lg md:text-xl font-bold text-foreground mb-1">
                      {phases[2].title}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {phases[2].subtitle}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ── PHASE 4 — Impact ── */}
        {phases[3] && (
          <div
            className="absolute inset-0 flex items-center justify-center px-4 transition-none"
            style={{ opacity: p4, transform: `translateY(${(1 - p4) * 50}px)`, willChange: 'transform, opacity' }}
          >
            <div className="text-center max-w-2xl mx-auto">
              <div className="text-xs font-mono tracking-[0.22em] uppercase text-primary mb-4">
                {phases[3].sectionLabel}
              </div>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground mb-6 tracking-tight">
                {phases[3].headline}
                <br />
                <span className="text-gradient">{phases[3].headlineHighlight}</span>
              </h3>
              <p className="text-base md:text-lg text-muted-foreground max-w-lg mx-auto">
                {phases[3].description}
              </p>
            </div>
          </div>
        )}

        {/* ── Progress dots ── */}
        {/* <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 max-md:hidden">
          {[0, 1, 2, 3].map((i) => {
            const active =
              (i === 0 && progress < 0.25) ||
              (i === 1 && progress >= 0.25 && progress < 0.47) ||
              (i === 2 && progress >= 0.47 && progress < 0.7) ||
              (i === 3 && progress >= 0.7);
            return (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  active
                    ? 'bg-primary scale-125'
                    : 'bg-muted-foreground/20'
                }`}
              />
            );
          })}
        </div> */}
      </div>
    </section>
  );
};

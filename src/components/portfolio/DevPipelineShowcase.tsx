import { useRef, useEffect, useState } from 'react';
import VSCodeEditor from '../ui/devprocess/vs-code-editor';
import TerminalUI from '../ui/devprocess/terminal';
import GitHubPR from '../ui/devprocess/github-pr';
import BuildProcess from '../ui/devprocess/build-process';
import LandingPage from '../ui/devprocess/landing';
import portfolioData from '@/data/portfolio-data.json';

const { devPipeline } = portfolioData;

const RANDOM_NAMES = [
  'Alex Morgan', 'Jordan Taylor', 'Casey Parker', 'Riley Carter', 'Avery Collins',
  'Jamie Brooks', 'Cameron Reed', 'Quinn Harper', 'Taylor Bennett', 'Morgan Hayes',
  'Rowan Mitchell', 'Parker Ellis', 'Hayden Foster', 'Reese Walker', 'Charlie Dawson',
  'Sage Turner', 'Finley Brooks', 'Emerson Clarke', 'River Bennett', 'Phoenix Carter',
  'Drew Sullivan', 'Blake Morgan', 'Robin Hayes', 'Ellis Parker', 'Remy Lawson',
  'Lennon Shaw', 'Marley Quinn', 'Sam Walker', 'Dakota Hayes', 'Skyler Bennett',
];

/* ─── Main ScrollShowcase Component ─── */
export const ScrollShowcase = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [pin, setPin] = useState<'before' | 'pinned' | 'after'>('before');
  const [userName, setUserName] = useState('');

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
        setProgress(Math.max(0, Math.min(1, -rect.top / scrollable)));
        if (rect.top > 0) setPin('before');
        else if (rect.bottom <= vh) setPin('after');
        else setPin('pinned');
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const fade = (start: number, end: number) => {
    if (progress < start || progress > end) return 0;
    const range = end - start;
    const inEnd = start + range * 0.15;
    const outStart = end - range * 0.15;
    if (progress < inEnd) return (progress - start) / (range * 0.15);
    if (progress > outStart) return (end - progress) / (range * 0.15);
    return 1;
  };

  const s0 = fade(0, 0.18);
  const s1 = fade(0.14, 0.32);
  const s2 = fade(0.28, 0.46);
  const s3 = fade(0.42, 0.60);
  const s4 = fade(0.56, 0.76);
  const s5 = fade(0.72, 0.95);

  const displayName = userName || 'User';
  const branchName = `chore-${(userName || 'user').toLowerCase().replace(/\s+/g, '-')}/name-update`;

  const termLines = [
    { prompt: devPipeline.terminal.prompt, cmd: 'git add .' },
    { prompt: devPipeline.terminal.prompt, cmd: `git commit -m "${displayName}"` },
    { prompt: devPipeline.terminal.prompt, cmd: `git push origin ${branchName}` },
  ];
  const termProgress = Math.max(0, Math.min(1, (progress - 0.28) / 0.13));
  const prProgress = Math.max(0, Math.min(1, (progress - 0.42) / 0.13));
  const buildProgress = Math.max(0, Math.min(1, (progress - 0.56) / 0.15));

  const pinStyle: React.CSSProperties =
    pin === 'pinned'
      ? { position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 30 }
      : pin === 'after'
        ? { position: 'absolute', bottom: 0, left: 0, width: '100%' }
        : { position: 'absolute', top: 0, left: 0, width: '100%' };

  const bgScale = 1 + progress * 0.4;
  const bgOpacity = Math.max(0.03, 0.35 - progress * 0.5);

  return (
    <section ref={sectionRef} style={{ height: '800vh' }} className="relative">
      <div className="h-screen flex items-center justify-center overflow-hidden bg-background" style={pinStyle}>
        <div aria-hidden className="pointer-events-none absolute inset-0 solais-sweep opacity-30" />
        <div aria-hidden className="pointer-events-none absolute inset-0 solais-vignette opacity-60" />

        {/* Background text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{ transform: `scale(${bgScale})`, opacity: bgOpacity }}>
          <div className="text-center leading-[0.9]">
            {devPipeline.backgroundWords.map((w, i) => (
              <span key={i} className={`block text-[14vw] tracking-tighter text-foreground ${i % 2 === 1 ? 'font-extralight italic' : 'font-extrabold'}`}>{w}</span>
            ))}
          </div>
        </div>

        {/* Stage 0: Name Input */}
        <div className="absolute inset-0 flex items-center justify-center px-4"
          style={{ opacity: s0, transform: `scale(${0.92 + s0 * 0.08})`, willChange: 'transform, opacity', pointerEvents: s0 > 0.3 ? 'auto' : 'none', backdropFilter: s0 > 0 ? `blur(${s0 * 20}px)` : 'none', WebkitBackdropFilter: s0 > 0 ? `blur(${s0 * 20}px)` : 'none' }}>
          <div className="w-full max-w-md text-center">
            <div className="text-sm font-mono tracking-widest uppercase mb-4" style={{ color: 'var(--foreground)', opacity: 0.5 }}>{devPipeline.nameInput.label}</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6" style={{ color: 'var(--foreground)' }}>{devPipeline.nameInput.title}</h2>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder={devPipeline.nameInput.placeholder}
              className="w-full max-w-xs mx-auto block px-4 py-3 rounded-lg border border-border bg-background text-foreground text-center text-lg font-mono placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-transparent"
            />
            <div className="flex flex-col items-center gap-4 md:gap-6 mt-6">
              <div className="text-[11px] font-mono text-center" style={{ color: 'var(--foreground)'}}>
                or let <img src="/asjs_bot.png" alt="ASJS" className="h-10 w-auto inline-block" /> pick a cool name for you.
              </div>
              <button
                onClick={() => {
                  const name = RANDOM_NAMES[Math.floor(Math.random() * RANDOM_NAMES.length)];
                  setUserName(name);
                }}
                className="relative px-4 py-2 rounded-md text-[13px] font-mono font-medium transition-all duration-300 border border-primary bg-primary text-primary-foreground hover:shadow-[0_0_20px_hsl(var(--primary)/0.6),0_0_40px_hsl(var(--primary)/0.4)]"
              >
                <span className="relative flex items-center gap-2 z-10">
                  Pick One For Me
                </span>
              </button>
              {userName && (
                <div className="text-[15px] font-mono font-semibold text-center animate-fade-in mt-5"
                  style={{ 
                    color: 'var(--foreground)', 
                    animation: 'glow 2s ease-in-out infinite alternate',
                    textShadow: '0 0 10px rgba(102, 126, 234, 0.5)'
                  }}>
                  Perfect. I’ll call you {userName}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stage 1: VS Code */}
        <div className="absolute inset-0 flex items-center justify-center px-4"
          style={{ opacity: s1, transform: `scale(${0.92 + s1 * 0.08})`, willChange: 'transform, opacity', pointerEvents: s1 > 0.3 ? 'auto' : 'none' }}>
          <VSCodeEditor userName={userName} onNameChange={setUserName} data={devPipeline.vsCodeEditor} />
        </div>

        {/* Stage 2: Terminal */}
        <div className="absolute inset-0 flex items-center justify-center px-4"
          style={{ opacity: s2, transform: `scale(${0.92 + s2 * 0.08})`, willChange: 'transform, opacity', pointerEvents: s2 > 0.3 ? 'auto' : 'none' }}>
          <TerminalUI lines={termLines} progress={termProgress} data={devPipeline.terminal} />
        </div>

        {/* Stage 3: GitHub PR */}
        <div className="absolute inset-0 flex items-center justify-center px-4"
          style={{ opacity: s3, transform: `scale(${0.92 + s3 * 0.08})`, willChange: 'transform, opacity', pointerEvents: s3 > 0.3 ? 'auto' : 'none' }}>
          <GitHubPR branchName={branchName} displayName={displayName} progress={prProgress} data={devPipeline.githubPR} />
        </div>

        {/* Stage 4: Build */}
        <div className="absolute inset-0 flex items-center justify-center px-4"
          style={{ opacity: s4, transform: `scale(${0.92 + s4 * 0.08})`, willChange: 'transform, opacity', pointerEvents: s4 > 0.3 ? 'auto' : 'none' }}>
          <BuildProcess progress={buildProgress} data={devPipeline.buildProcess} />
        </div>

        {/* Stage 5: Landing Page */}
        <div className="absolute inset-0 flex items-center justify-center px-4"
          style={{ opacity: s5, transform: `translateY(${(1 - s5) * 50}px)`, willChange: 'transform, opacity', pointerEvents: s5 > 0.3 ? 'auto' : 'none' }}>
          <LandingPage displayName={displayName} data={devPipeline.landingPage} />
        </div>

        {/* Scroll hint chip */}
        {pin === 'pinned' && progress < 0.72 && (progress > 0.15 || userName.trim().length > 0) && (
          <div className="fixed bottom-8 left-0 right-0 z-50 animate-bounce flex justify-center max-md:px-4">
            <div className="px-4 py-2 rounded-full text-[12px] sm:text-[13px] font-mono font-medium shadow-lg flex items-center gap-2"
              style={{ background: 'rgba(239, 68, 68, 0.7)', backdropFilter: 'blur(8px)', color: '#fff' }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 animate-pulse">
                <path d="M7 1L7 10M7 10L3.5 6.5M7 10L10.5 6.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M2 13H12" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              Scroll down to deploy the application
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

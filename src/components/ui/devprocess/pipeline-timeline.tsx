interface Stage {
  label: string;
  range: [number, number];
}

interface PipelineTimelineProps {
  progress: number;
  stages: Stage[];
}

const CheckIcon = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
    <path d="M2 5.5L4 7.5L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PipelineTimeline = ({ progress, stages }: PipelineTimelineProps) => {
  const activeIdx = stages.findIndex(
    (s, i) => progress >= s.range[0] && (i === stages.length - 1 || progress < s.range[1])
  );

  // How far through the active stage (0→1)
  const activeStage = stages[activeIdx];
  const stageProgress = activeStage
    ? Math.min(1, Math.max(0, (progress - activeStage.range[0]) / (activeStage.range[1] - activeStage.range[0])))
    : 0;

  return (
    <>
      {/* Mobile — horizontal, top */}
      {/* <div className="md:hidden fixed top-[100px] left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-4 py-3 rounded-full bg-card/70 backdrop-blur-md border border-border/40 shadow-elevated">
        {stages.map((s, i) => {
          const done = i < activeIdx;
          const active = i === activeIdx;
          return (
            <div key={s.label} className="flex items-center gap-1">
              <div className="flex flex-col items-center">
                <div
                  className={`w-2.5 h-2.5 rounded-full flex items-center justify-center transition-all duration-500 ${
                    done
                      ? 'bg-emerald-500 scale-100'
                      : active
                        ? 'bg-primary scale-110 shadow-[0_0_8px_hsl(var(--primary)/0.6)]'
                        : 'bg-muted-foreground/20 scale-100'
                  }`}
                >
                  {done && <CheckIcon />}
                </div>
                <span
                  className={`text-[10px] font-mono mt-1 transition-colors duration-500 ${
                    done
                      ? 'text-emerald-500 font-semibold'
                      : active
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground/40'
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < stages.length - 1 && (
                <div className="relative w-4 h-0.5 mb-2.5 rounded-full overflow-hidden bg-muted-foreground/15">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                    style={{
                      width: done ? '100%' : active ? `${stageProgress * 100}%` : '0%',
                      background: done ? 'rgb(16 185 129)' : 'hsl(var(--primary))',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div> */}

      {/* Desktop — vertical, right side */}
      <div className="hidden md:flex fixed right-6 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-0">
        {stages.map((s, i) => {
          const done = i < activeIdx;
          const active = i === activeIdx;
          return (
            <div key={s.label} className="flex flex-col items-center">
              <div className="flex items-center gap-2.5">
                {/* Label */}
                <span
                  className={`text-[12px] font-mono transition-all duration-500 w-12 text-right ${
                    done
                      ? 'text-emerald-500 font-semibold'
                      : active
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground/30'
                  }`}
                >
                  {s.label}
                </span>
                {/* Dot */}
                <div
                  className={`w-3 h-3 rounded-full flex items-center justify-center transition-all duration-500 ${
                    done
                      ? 'bg-emerald-500 text-white scale-100'
                      : active
                        ? 'bg-primary scale-125 shadow-[0_0_12px_hsl(var(--primary)/0.6)]'
                        : 'bg-muted-foreground/20 scale-100'
                  }`}
                >
                  {done && <CheckIcon />}
                </div>
              </div>
              {/* Connector line */}
              {i < stages.length - 1 && (
                <div className="relative w-0.5 h-6 my-1 rounded-full overflow-hidden bg-muted-foreground/15">
                  <div
                    className="absolute inset-x-0 top-0 rounded-full transition-all duration-500"
                    style={{
                      height: done ? '100%' : active ? `${stageProgress * 100}%` : '0%',
                      background: done ? 'rgb(16 185 129)' : 'hsl(var(--primary))',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PipelineTimeline;

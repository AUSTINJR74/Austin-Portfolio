import BlueTick from "../blue-tick";

interface BuildProcessData {
  jobName: string;
  steps: { name: string; time: string }[];
}

const BuildProcess = ({ progress, data }: { progress: number; data: BuildProcessData }) => {
  const { steps } = data;
  const completedCount = Math.floor(progress * (steps.length + 0.5));

  return (
    <div className="w-full max-w-2xl rounded-lg overflow-hidden border shadow-elevated" style={{ background: '#161b22', borderColor: '#30363d' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b" style={{ background: '#1c2028', borderColor: '#30363d' }}>
        <div>
          <div className="text-[14px] font-semibold" style={{ color: '#58a6ff' }}>{data.jobName}</div>        </div>
        <div className="flex items-center gap-3">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e" className="cursor-default">
            <path d="M8 2a1 1 0 110 2 1 1 0 010-2zm0 5a1 1 0 110 2 1 1 0 010-2zm0 5a1 1 0 110 2 1 1 0 010-2z" />
          </svg>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e" className="cursor-default">
            <path fillRule="evenodd" d="M7.429 1.525a3.5 3.5 0 011.142 0c.036.003.108.036.137.146l.289 1.105c.147.56.55.967.997 1.189.174.086.341.183.501.29.417.278.97.423 1.53.27l1.102-.303c.11-.03.175.016.195.046a7.6 7.6 0 01.57.98c.02.03.024.108-.051.194l-.813.806c-.411.408-.56.942-.56 1.434v.58c0 .492.149 1.026.56 1.434l.813.806c.075.086.07.164.051.194a7.6 7.6 0 01-.57.98c-.02.03-.085.076-.195.046l-1.102-.303c-.56-.153-1.113-.008-1.53.27-.16.107-.327.204-.5.29-.449.222-.851.628-.998 1.189l-.289 1.105c-.029.11-.1.143-.137.146a6.6 6.6 0 01-1.142 0c-.036-.003-.108-.037-.137-.146l-.289-1.105c-.147-.56-.55-.967-.997-1.189a4.5 4.5 0 01-.501-.29c-.417-.278-.97-.423-1.53-.27l-1.102.303c-.11.03-.175-.016-.195-.046a7.6 7.6 0 01-.57-.98c-.02-.03-.024-.108.051-.194l.813-.806c.411-.408.56-.942.56-1.434v-.58c0-.492-.149-1.026-.56-1.434l-.813-.806c-.075-.086-.07-.164-.051-.194a7.6 7.6 0 01.57-.98c.02-.03.085-.076.195-.046l1.102.303c.56.153 1.113.008 1.53-.27.16-.107.327-.204.5-.29.449-.222.851-.628.998-1.189l.289-1.105c.029-.11.1-.143.137-.146zM8 0c-.236 0-.47.01-.701.03-.743.065-1.29.615-1.458 1.261l-.29 1.106c-.017.066-.078.158-.211.224a5.994 5.994 0 00-.668.386c-.123.082-.233.117-.3.117h-.013l-1.104-.303c-.66-.182-1.343.058-1.69.652a8.6 8.6 0 00-.645 1.108c-.346.595-.274 1.322.148 1.856l.813.806c.049.048.1.148.1.356v.58c0 .208-.051.308-.1.356l-.813.806c-.422.534-.494 1.261-.149 1.856.189.326.4.64.646 1.108.346.594 1.029.834 1.69.652l1.103-.303h.013c.067 0 .177.035.3.117.214.143.437.272.668.386.133.066.194.158.212.224l.289 1.106c.169.646.715 1.196 1.458 1.26a8.094 8.094 0 001.402 0c.743-.064 1.29-.614 1.458-1.26l.29-1.106c.017-.066.078-.158.211-.224a6 6 0 00.668-.386c.123-.082.233-.117.3-.117h.013l1.104.303c.66.182 1.343-.058 1.69-.652.245-.468.456-.782.645-1.108.346-.595.274-1.322-.148-1.856l-.813-.806c-.05-.048-.1-.148-.1-.356v-.58c0-.208.05-.308.1-.356l.813-.806c.422-.534.494-1.261.148-1.856a8.6 8.6 0 00-.645-1.108c-.347-.594-1.03-.834-1.69-.652l-1.104.303h-.013c-.067 0-.177-.035-.3-.117a6 6 0 00-.668-.386c-.133-.066-.194-.158-.212-.224L9.16 1.29C8.99.645 8.444.095 7.701.031A8.094 8.094 0 008 0zM6 8a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg>
        </div>
      </div>
      <div className="py-1">
        {steps.map((step, i) => {
          const done = i < completedCount;
          const running = i === completedCount;
          const isFirst = i === 0;
          return (
            <div key={i} className="flex items-center gap-3 px-4 py-[7px] border-l-2"
              style={{
                background: isFirst && done ? '#1c2333' : 'transparent',
                borderLeftColor: isFirst && done ? '#3b82f6' : 'transparent',
              }}>
              <svg width="10" height="10" viewBox="0 0 10 10" className="shrink-0" style={{ color: '#484f58' }}>
                <path d="M3 1L7 5L3 9" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {done ? <BlueTick /> : running ? (
                <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0 animate-spin" style={{ color: '#d29922' }}>
                  <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="35" strokeDashoffset="10" strokeLinecap="round" />
                </svg>
              ) : (
                <div className="w-[18px] h-[18px] rounded-full border-2 shrink-0" style={{ borderColor: '#484f58' }} />
              )}
              <span className="text-[13px] flex-1 font-mono" style={{ color: done ? '#9ca3af' : running ? '#d29922' : '#484f58' }}>
                {step.name}
              </span>
              {done && <span className="text-[12px] font-mono" style={{ color: '#484f58' }}>{step.time}</span>}
              {running && <span className="text-[12px] font-mono animate-pulse" style={{ color: '#d29922' }}>running...</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BuildProcess;
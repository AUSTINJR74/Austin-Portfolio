interface TerminalData {
  titleLabel: string;
  gitOutput: string[];
  successMessage: string;
}

const TerminalUI = ({ lines, progress, data }: { lines: { prompt: string; cmd: string }[]; progress: number; data: TerminalData }) => {
  const totalChars = lines.reduce((s, l) => s + l.cmd.length, 0);
  let charsDone = Math.floor(progress * totalChars);

  return (
    <div className="w-full max-w-2xl rounded-lg overflow-hidden border border-[#333] shadow-elevated" style={{ background: '#1a1a2e' }}>
      <div className="flex items-center px-3 py-1.5 border-b border-[#333]" style={{ background: '#16162a' }}>
        <div className="flex gap-2 mr-3">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] text-[#ccc]/60 font-mono">{data.titleLabel}</span>
      </div>
      <div className="p-4 font-mono text-[13px] leading-[1.8] min-h-[200px]">
        {lines.map((line, i) => {
          if (charsDone <= 0 && i > 0) return null;
          const show = Math.min(line.cmd.length, charsDone);
          charsDone -= line.cmd.length;
          const done = charsDone >= 0;
          return (
            <div key={i}>
              <span style={{ color: '#50fa7b' }}>{line.prompt}</span>
              <span style={{ color: '#f8f8f2' }}> $ </span>
              <span style={{ color: '#f8f8f2' }}>{line.cmd.slice(0, show)}</span>
              {!done && show > 0 && <span className="inline-block w-[7px] h-[15px] bg-[#f8f8f2] animate-pulse ml-[1px] align-middle" />}
              {/* {done && i < lines.length - 1 && (
                <div className="text-[#6272a4] text-[12px] mt-0.5 mb-1">✓ done</div>
              )} */}
              {done && i === lines.length - 1 && charsDone >= 0 && (
                <div className="text-[#50fa7b] text-[12px] mt-1">
                  {data.gitOutput.map((line, j) => (
                    <div key={j}>{line}</div>
                  ))}
                  <div className="text-[#f1fa8c] mt-1">{data.successMessage}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TerminalUI;
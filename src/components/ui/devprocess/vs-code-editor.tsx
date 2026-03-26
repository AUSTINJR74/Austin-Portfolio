interface VSCodeEditorData {
  titleBarLabel: string;
  activeTab: string;
  activityBarIcons: string[];
  files: { name: string; isDir: boolean; indent: number; active?: boolean }[];
  lineCount: number;
  inputPlaceholder: string;
  statusBar: { branch: string; errors: string; language: string; languageShort: string; encoding: string };
}

const VSCodeEditor = ({ userName, onNameChange, data }: { userName: string; onNameChange: (v: string) => void; data: VSCodeEditorData }) => {
  const lineNumbers = Array.from({ length: data.lineCount }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-2xl rounded-lg overflow-hidden border border-[#1e1e1e] shadow-elevated" style={{ background: '#1e1e1e' }}>
      {/* Title bar */}
      <div className="flex items-center px-3 py-1.5" style={{ background: '#323233' }}>
        <div className="flex gap-2 mr-3">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] text-[#cccccc]/60 font-mono">{data.titleBarLabel}</span>
      </div>

      <div className="flex" style={{ minHeight: 220 }}>
        {/* Activity bar */}
        <div className="w-10 hidden sm:flex flex-col items-center py-2 gap-3 shrink-0" style={{ background: '#333333' }}>
          {data.activityBarIcons.map((icon, i) => (
            <div key={i} className={`text-xs opacity-${i === 0 ? '100' : '40'} cursor-default`}>{icon}</div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-44 hidden sm:block border-r border-[#2d2d2d] py-2 shrink-0 overflow-hidden" style={{ background: '#252526' }}>
          <div className="px-3 text-[10px] font-semibold tracking-wider text-[#bbbbbb]/50 mb-1.5 uppercase">Explorer</div>
          {data.files.map((f, i) => (
            <div key={i} className={`flex items-center gap-1 px-3 py-[2px] text-[12px] font-mono cursor-default ${f.active ? 'bg-[#37373d] text-[#ffffff]' : 'text-[#cccccc]/70 hover:bg-[#2a2d2e]'}`}
              style={{ paddingLeft: 12 + f.indent * 12 }}>
              <span className="text-[10px]">{f.isDir ? '📂' : '📄'}</span>
              <span>{f.name}</span>
            </div>
          ))}
        </div>

        {/* Editor */}
        <div className="flex-1 overflow-hidden" style={{ background: '#1e1e1e' }}>
          {/* Tab */}
          <div className="flex border-b border-[#2d2d2d]">
            <div className="px-3 py-1.5 text-[11px] font-mono text-[#ffffff] border-b-2 border-[#007acc]" style={{ background: '#1e1e1e' }}>
              {data.activeTab}
            </div>
          </div>

          {/* Code area */}
          <div className="flex p-2 font-mono text-[11px] sm:text-[13px] leading-[1.6]">
            {/* Line numbers */}
            <div className="pr-4 text-right select-none shrink-0" style={{ color: '#858585', minWidth: 32 }}>
              {lineNumbers.map(n => <div key={n}>{n}</div>)}
            </div>

            {/* Code content */}
            <div className="flex-1">
              <div><span style={{ color: '#c586c0' }}>import</span> <span style={{ color: '#9cdcfe' }}>React</span> <span style={{ color: '#c586c0' }}>from</span> <span style={{ color: '#ce9178' }}>'react'</span><span style={{ color: '#d4d4d4' }}>;</span></div>
              <div>&nbsp;</div>
                  <div>
                <span style={{ color: '#569cd6' }}>const</span>{' '}
                <span style={{ color: '#4fc1ff' }}>userName</span>{' '}
                <span style={{ color: '#d4d4d4' }}>=</span>{' '}
                <span style={{ color: '#ce9178' }}>"</span>
                <span className="cursor-pointer hover:underline" 
                onClick={() => {
                    window.scrollTo({ top: 1200, behavior: 'smooth' });
                }} style={{ color: '#ce9178' }}>
                    {userName || data.inputPlaceholder}
                </span>
                <span style={{ color: '#ce9178' }}>"</span><span style={{ color: '#d4d4d4' }}>;</span>
              </div>
              <div>&nbsp;</div>
              <div><span style={{ color: '#569cd6' }}>const</span> <span style={{ color: '#dcdcaa' }}>Welcome</span> <span style={{ color: '#d4d4d4' }}>=</span> <span style={{ color: '#d4d4d4' }}>{'()'}</span> <span style={{ color: '#569cd6' }}>=&gt;</span> <span style={{ color: '#d4d4d4' }}>{'{'}</span></div>
              <div>  <span style={{ color: '#c586c0' }}>return</span> <span style={{ color: '#d4d4d4' }}>(</span></div>
              <div>    <span style={{ color: '#808080' }}>&lt;</span><span style={{ color: '#4ec9b0' }}>div</span><span style={{ color: '#808080' }}>&gt;</span></div>
              <div>      <span style={{ color: '#569cd6' }}>// Content</span></div>
              <div>      <span style={{ color: '#d4d4d4' }}>Welcome, </span><span style={{ color: '#d4d4d4' }}>{'{'}</span><span style={{ color: '#9cdcfe' }}>userName</span><span style={{ color: '#d4d4d4' }}>{'}'}</span></div>
              <div>    <span style={{ color: '#808080' }}>&lt;/</span><span style={{ color: '#4ec9b0' }}>div</span><span style={{ color: '#808080' }}>&gt;</span></div>
              <div>  <span style={{ color: '#d4d4d4' }}>);</span></div>
              <div><span style={{ color: '#d4d4d4' }}>{'};'}</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between px-2 sm:px-3 py-0.5 text-[10px] sm:text-[11px]" style={{ background: '#007acc', color: '#ffffff' }}>
        <div className="flex items-center gap-2 sm:gap-3">
          <span>⎇ {data.statusBar.branch}</span>
          <span>{data.statusBar.errors}</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline">{data.statusBar.language}</span>
          <span className="sm:hidden">{data.statusBar.languageShort}</span>
          <span>{data.statusBar.encoding}</span>
        </div>
      </div>
    </div>
  );
};

export default VSCodeEditor;
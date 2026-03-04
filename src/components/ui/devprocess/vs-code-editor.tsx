const VSCodeEditor = ({ userName, onNameChange }: { userName: string; onNameChange: (v: string) => void }) => {
  const files = [
    { name: 'src', isDir: true, indent: 0 },
    { name: 'components', isDir: true, indent: 1 },
    { name: 'Welcome.tsx', isDir: false, indent: 2, active: true },
    { name: 'App.tsx', isDir: false, indent: 1 },
    { name: 'index.ts', isDir: false, indent: 1 },
    { name: 'package.json', isDir: false, indent: 0 },
    { name: 'tsconfig.json', isDir: false, indent: 0 },
  ];

  const lineNumbers = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="w-full max-w-2xl rounded-lg overflow-hidden border border-[#1e1e1e] shadow-elevated" style={{ background: '#1e1e1e' }}>
      {/* Title bar */}
      <div className="flex items-center px-3 py-1.5" style={{ background: '#323233' }}>
        <div className="flex gap-2 mr-3">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        </div>
        <span className="text-[11px] text-[#cccccc]/60 font-mono">Welcome.tsx — portfolio</span>
      </div>

      <div className="flex" style={{ minHeight: 220 }}>
        {/* Activity bar */}
        <div className="w-10 hidden sm:flex flex-col items-center py-2 gap-3 shrink-0" style={{ background: '#333333' }}>
          {['📁', '🔍', '⎇', '🐛', '⚙'].map((icon, i) => (
            <div key={i} className={`text-xs opacity-${i === 0 ? '100' : '40'} cursor-default`}>{icon}</div>
          ))}
        </div>

        {/* Sidebar */}
        <div className="w-44 hidden sm:block border-r border-[#2d2d2d] py-2 shrink-0 overflow-hidden" style={{ background: '#252526' }}>
          <div className="px-3 text-[10px] font-semibold tracking-wider text-[#bbbbbb]/50 mb-1.5 uppercase">Explorer</div>
          {files.map((f, i) => (
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
              Welcome.tsx
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
              <div><span style={{ color: '#6a9955' }}>{'// Enter your name below'}</span></div>
              <div>
                <span style={{ color: '#569cd6' }}>const</span>{' '}
                <span style={{ color: '#4fc1ff' }}>userName</span>{' '}
                <span style={{ color: '#d4d4d4' }}>=</span>{' '}
                <span style={{ color: '#ce9178' }}>"</span>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => onNameChange(e.target.value)}
                  placeholder="type your name..."
                  className="bg-transparent border-none outline-none text-[#ce9178] font-mono w-20 sm:w-32 placeholder:text-[#ce9178]/30 caret-[#aeafad]"
                  style={{ fontSize: 'inherit', lineHeight: '1.6', padding: 0 }}
                />
                <span style={{ color: '#ce9178' }}>"</span><span style={{ color: '#d4d4d4' }}>;</span>
              </div>
              <div>&nbsp;</div>
              <div><span style={{ color: '#569cd6' }}>const</span> <span style={{ color: '#dcdcaa' }}>Welcome</span> <span style={{ color: '#d4d4d4' }}>=</span> <span style={{ color: '#d4d4d4' }}>{'()'}</span> <span style={{ color: '#569cd6' }}>=&gt;</span> <span style={{ color: '#d4d4d4' }}>{'{'}</span></div>
              <div>  <span style={{ color: '#c586c0' }}>return</span> <span style={{ color: '#d4d4d4' }}>(</span></div>
              <div>    <span style={{ color: '#808080' }}>&lt;</span><span style={{ color: '#4ec9b0' }}>div</span><span style={{ color: '#808080' }}>&gt;</span></div>
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
          <span>⎇ main</span>
          <span>0 errors</span>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden sm:inline">TypeScript React</span>
          <span className="sm:hidden">TSX</span>
          <span>UTF-8</span>
        </div>
      </div>
    </div>
  );
};

export default VSCodeEditor;
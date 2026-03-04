const LandingPage = ({ displayName }: { displayName: string }) => (
  <div className="w-full max-w-3xl rounded-lg overflow-hidden border shadow-elevated" style={{ borderColor: '#1e293b' }}>
    {/* Browser chrome */}
    <div className="flex items-center px-3 py-2 gap-2" style={{ background: '#0f172a' }}>
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
      </div>
      <div className="flex-1 rounded-md px-3 py-1 text-[12px] font-mono border" style={{ background: '#1e293b', borderColor: '#334155', color: '#64748b' }}>
        https://{displayName.toLowerCase().replace(/\s+/g, '-') || 'user'}.in
      </div>
    </div>
    {/* Page content */}
    <div className="text-center px-6 sm:px-10 py-14 sm:py-20" style={{ background: '#0c1222' }}>
      <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase mb-4 sm:mb-6" style={{ color: '#22d3ee' }}>
        The Outcome
      </div>
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] mb-4 sm:mb-6">
        <span className="text-white">From Concept to </span>
        <span style={{ color: '#22d3ee' }}>Products People Actually Use</span>
      </h1>
      <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8" style={{ color: '#94a3b8' }}>
        Great software starts as structured thinking. With thoughtful engineering and careful optimization, those ideas become fast interfaces, resilient systems, and experiences people rely on every day.
      </p>
      <div className="text-lg sm:text-xl font-semibold" style={{ color: '#22d3ee' }}>
        Welcome, {displayName}!
      </div>
    </div>
  </div>
);

export default LandingPage;
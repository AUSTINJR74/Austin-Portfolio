interface LandingPageData {
  sectionLabel: string;
  headline: string;
  headlineHighlight: string;
  description: string;
  urlSuffix: string;
}

const LandingPage = ({ displayName, data }: { displayName: string; data: LandingPageData }) => (
  <div className="w-full max-w-3xl rounded-2xl overflow-hidden border shadow-2xl relative" style={{ borderColor: '#1e293b' }}>
    {/* Premium gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-magenta-500/10 pointer-events-none" />
    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 via-pink-500/5 to-magenta-500/5 pointer-events-none" />
    
    {/* Browser chrome with gradient */}
    <div className="relative flex items-center px-3 py-2 gap-2 border-b" style={{ 
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      borderColor: '#334155'
    }}>
      <div className="flex gap-1.5">
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FF5F57] to-[#FF8A80] shadow-lg shadow-[#FF5F57]/50" />
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#FEBC2E] to-[#FFD54F] shadow-lg shadow-[#FEBC2E]/50" />
        <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[#28C840] to-[#66BB6A] shadow-lg shadow-[#28C840]/50" />
      </div>
      <div className="flex-1 rounded-md px-3 py-1 text-[12px] font-mono border shadow-inner" style={{ 
        background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)', 
        borderColor: '#475569', 
        color: '#94a3b8',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
      }}>
        https://{displayName.toLowerCase().replace(/\s+/g, '-') || 'user'}{data.urlSuffix}
      </div>
    </div>
    
    {/* Page content with premium gradients */}
    <div className="relative text-center px-6 sm:px-10 py-14 sm:py-20 overflow-hidden" style={{ 
      background: 'radial-gradient(ellipse at center, #0c1222 0%, #0a0f1f 50%, #050815 100%)'
    }}>
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-0 w-80 h-80 rounded-full bg-gradient-to-br from-purple-800/20 to-magenta-800/20 blur-3xl" />
      <div className="absolute -top-[300px] md:-top-[200px] -right-[180px] w-[400px] h-[400px] rounded-full bg-gradient-to-br from-pink-800/20 to-purple-800/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-magenta-800/20 to-pink-800/20 blur-3xl" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase mb-4 sm:mb-6 font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-magenta-500 bg-clip-text text-transparent">
          {data.sectionLabel}
        </div>
        
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-[1.1] mb-4 sm:mb-6">
          <span className="text-white drop-shadow-lg">{data.headline}</span>
          <span className="ml-2 bg-gradient-to-r from-purple-400 via-pink-500 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
            {data.headlineHighlight}
          </span>
        </h1>
        
        <p className="text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-8 text-gray-300 drop-shadow">
          {data.description}
        </p>
        
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-magenta-500/20 blur-xl animate-pulse" />
          <div className="relative text-lg sm:text-xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              Welcome,
            </span>
            <span className="text-white font-bold drop-shadow-lg ml-2">{displayName}</span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-purple-800 bg-clip-text text-transparent">
              !
            </span>
          </div>
        </div>
        
        {/* Premium decorative elements */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-pink-500 to-magenta-500" />
          <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-200 to-pink-500"/>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
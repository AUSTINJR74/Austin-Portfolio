import BlueTick from "../blue-tick";

interface GitHubPRData {
  repoName: string;
  checks: { name: string; pendingStatus: string }[];
  approvalLabel: string;
  reviewer: string;
}

const GitHubPR = ({ branchName, displayName, progress, data }: { branchName: string; displayName: string; progress: number; data: GitHubPRData }) => {
  const prCreated = progress > 0.1;
  const reviewPassed = progress > 0.4;
  const approved = progress > 0.6;
  const merged = progress > 0.85;

  return (
    <div className="w-full max-w-2xl rounded-lg overflow-hidden border shadow-elevated" style={{ background: '#0d1117', borderColor: '#30363d' }}>
      {/* Header */}
      <div className="px-4 py-3 border-b" style={{ borderColor: '#30363d' }}>
        <div className="flex items-center gap-2 mb-1">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="#8b949e"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
          <span className="text-[14px] font-semibold" style={{ color: '#58a6ff' }}>{displayName}/{data.repoName}</span>
        </div>
        {prCreated && (
          <div>
            <h2 className="text-[18px] font-semibold" style={{ color: '#c9d1d9' }}>
              Update user name to "{displayName}"
            </h2>
            <div className="flex items-center gap-2 mt-1 text-[12px]" style={{ color: '#8b949e' }}>
              <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold" style={{ background: merged ? '#238636' : '#1f6feb', color: '#fff' }}>
                {merged ? 'Merged' : 'Open'}
              </span>
              <span>{branchName} → main</span>
            </div>
          </div>
        )}
      </div>

      {/* Checks */}
      <div className="px-4 py-3 space-y-2">
        {prCreated && (
          <div className="rounded-md border p-3 space-y-2" style={{ borderColor: '#30363d', background: '#161b22' }}>
            {data.checks.map((check, i) => (
              <div key={i} className="flex items-center gap-2 text-[13px]">
                <span>{reviewPassed ? <BlueTick /> : <svg width="18" height="18" viewBox="0 0 18 18" className="shrink-0 animate-spin" style={{ color: i === 0 ? '#d29922' : '#8b949e' }}><circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="35" strokeDashoffset="10" strokeLinecap="round" /></svg>}</span>
                <span style={{ color: '#c9d1d9' }}>{check.name}</span>
                <span className="ml-auto text-[11px]" style={{ color: reviewPassed ? '#3fb950' : (i === 0 ? '#d29922' : '#8b949e') }}>
                  {reviewPassed ? 'Passed' : check.pendingStatus}
                </span>
              </div>
            ))}
          </div>
        )}

        {approved && (
          <div className="rounded-md border p-3 flex items-center gap-2" style={{ borderColor: '#238636', background: '#0d1117' }}>
            <BlueTick />
            <div>
              <div className="text-[13px] font-semibold" style={{ color: '#3fb950' }}>{data.approvalLabel}</div>
              <div className="text-[11px]" style={{ color: '#8b949e' }}>{data.reviewer}</div>
            </div>
          </div>
        )}

        {approved && (
          <button className="w-full py-2 rounded-md text-[14px] font-semibold transition-all"
            style={{
              background: '#238636',
              color: '#fff',
              opacity: merged ? 0.7 : 1,
              cursor: 'default',
            }}>
            {merged ? 'Pull request merged' : 'Merge pull request'}
          </button>
        )}
      </div>
    </div>
  );
};

export default GitHubPR;
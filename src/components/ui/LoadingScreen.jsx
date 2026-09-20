export default function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 bg-[#050816] text-[#f8fafc]"
      role="status"
      aria-label="Loading portfolio"
    >
      <div className="card terminal p-8 max-w-sm w-full space-y-4 shadow-2xl border border-white/10">
        <div className="flex items-center gap-2 pb-2 border-b border-white/10">
          <span className="terminal-dot bg-[#ef4444]" />
          <span className="terminal-dot bg-[#eab308]" />
          <span className="terminal-dot bg-[#22c55e]" />
          <span className="ml-2 font-mono text-xs text-[#94a3b8]">bash - portfolio</span>
        </div>

        <p className="font-mono text-xs sm:text-sm text-[#22c55e]">&gt; npm run portfolio</p>

        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between font-mono text-xs text-[#94a3b8]">
            <span>Loading assets...</span>
            <span className="text-[#22c55e]">100%</span>
          </div>
          <div className="h-2 w-full rounded-full bg-[#111827] overflow-hidden border border-white/5">
            <div className="h-full bg-gradient-to-r from-[#2563eb] via-[#8b5cf6] to-[#22c55e] rounded-full w-full animate-pulse" />
          </div>
        </div>

        <div className="pt-2 border-t border-white/5 font-mono text-xs text-center">
          <p className="text-[#f8fafc] font-semibold">Welcome, Abhishek.</p>
        </div>
      </div>
    </div>
  )
}

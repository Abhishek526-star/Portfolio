export default function ProjectArtwork({ projectId, title }) {
  switch (projectId) {
    case 'pharmaplus':
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#0f172a] to-[#1e1b4b] p-4 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="font-mono text-[11px] text-[#22c55e] font-semibold">PharmaPlus OS</span>
            </div>
            <span className="rounded bg-[#2563eb]/20 text-[#60a5fa] px-2 py-0.5 text-[10px] font-mono">Gemini AI</span>
          </div>
          <div className="grid grid-cols-2 gap-2 my-auto">
            <div className="rounded border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
              <div className="h-1.5 w-12 bg-white/20 rounded mb-1.5" />
              <div className="h-2.5 w-16 bg-[#2563eb]/60 rounded" />
              <div className="text-[10px] text-[#22c55e] mt-1 font-mono">✓ Stock Verified</div>
            </div>
            <div className="rounded border border-white/10 bg-white/5 p-2 backdrop-blur-sm">
              <div className="h-1.5 w-10 bg-white/20 rounded mb-1.5" />
              <div className="h-2.5 w-14 bg-[#8b5cf6]/60 rounded" />
              <div className="text-[10px] text-[#8b5cf6] mt-1 font-mono">AI Rx Matched</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted font-mono pt-1">
            <span>Razorpay Secured</span>
            <span className="text-white/60">v2.4.0</span>
          </div>
        </div>
      )

    case 'campus-connect':
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#0f172a] to-[#142634] p-4 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#38bdf8] animate-pulse" />
              <span className="font-mono text-[11px] text-[#38bdf8] font-semibold">Campus Connect</span>
            </div>
            <span className="rounded bg-[#06b6d4]/20 text-[#38bdf8] px-2 py-0.5 text-[10px] font-mono">Socket.IO</span>
          </div>
          <div className="space-y-1.5 my-auto">
            <div className="flex items-center gap-2 rounded border border-white/10 bg-white/5 p-1.5 text-[10px] font-mono">
              <div className="h-5 w-5 rounded-md bg-[#2563eb]/30 border border-[#2563eb]/50 flex items-center justify-center text-[9px] text-[#60a5fa] font-bold">QR</div>
              <div className="flex-1 truncate">
                <span className="text-white/80">Attendance: Verified</span>
                <span className="text-[9px] text-muted block font-sans">Token validated in 0.4s</span>
              </div>
            </div>
            <div className="rounded border border-white/10 bg-[#38bdf8]/10 p-1.5 text-[10px] text-[#38bdf8] font-mono flex items-center justify-between">
              <span>Alumni Mentorship Chat</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted font-mono pt-1">
            <span>Role: Student / Faculty / Alumni</span>
          </div>
        </div>
      )

    case 'accenture-ready':
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#090d16] via-[#111827] to-[#1e1e2f] p-3 flex flex-col justify-between select-none font-mono text-[11px]">
          <div className="flex items-center justify-between border-b border-white/10 pb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
              <span className="h-2 w-2 rounded-full bg-[#eab308]" />
              <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
              <span className="ml-1 text-[10px] text-muted">solution.java</span>
            </div>
            <span className="text-[10px] text-[#22c55e] font-semibold">100% Passed</span>
          </div>
          <div className="space-y-1 py-1 text-[10px] text-muted">
            <p><span className="text-[#8b5cf6]">public</span> <span className="text-[#2563eb]">int</span> <span className="text-[#eab308]">maxProfit</span>(int[] p) &#123;</p>
            <p className="pl-3"><span className="text-[#8b5cf6]">int</span> min = p[0], max = 0;</p>
            <p className="pl-3 text-[#22c55e]">// Optimized O(n) scan</p>
            <p>&#125;</p>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 pt-1 text-[9px] text-muted">
            <span>Monaco IDE Powered</span>
            <span className="text-[#8b5cf6]">DSA Prep Platform</span>
          </div>
        </div>
      )

    case 'expense-tracker':
      return (
        <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#0d1c1a] to-[#111827] p-4 flex flex-col justify-between select-none">
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-mono text-[11px] text-[#22c55e] font-semibold">MERN Analytics</span>
            <span className="text-[10px] font-mono text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded">+18.4% Savings</span>
          </div>
          <div className="flex items-center justify-around my-auto">
            <div className="relative h-14 w-14 rounded-full border-4 border-dashed border-[#22c55e]/60 flex items-center justify-center">
              <span className="font-mono text-[9px] text-[#22c55e] font-bold">Charts</span>
            </div>
            <div className="space-y-1 text-[10px] font-mono">
              <div className="text-white/80">Housing: 42%</div>
              <div className="text-[#2563eb]">Tech: 28%</div>
              <div className="text-[#8b5cf6]">Food: 18%</div>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted font-mono pt-1">
            <span>JWT Auth &amp; REST</span>
            <span>Monthly Tracking</span>
          </div>
        </div>
      )

    default:
      return (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2563eb]/20 to-[#8b5cf6]/20 font-mono text-xs text-muted">
          {title}
        </div>
      )
  }
}

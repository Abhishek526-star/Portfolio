import {
  Code2,
  Database,
  Cpu,
  Boxes,
  Layers,
  Sparkles,
  GitBranch,
  Terminal,
  Shield,
  Server,
  Zap,
} from 'lucide-react'

const marqueeItems = [
  { name: 'React 19', icon: Zap, color: '#38bdf8' },
  { name: 'Node.js', icon: Server, color: '#22c55e' },
  { name: 'Express.js', icon: Terminal, color: '#94a3b8' },
  { name: 'MongoDB', icon: Database, color: '#10b981' },
  { name: 'Gemini AI', icon: Sparkles, color: '#8b5cf6' },
  { name: 'LangChain & RAG', icon: Cpu, color: '#ec4899' },
  { name: 'Tailwind CSS', icon: Layers, color: '#06b6d4' },
  { name: 'Three.js 3D', icon: Boxes, color: '#f59e0b' },
  { name: 'Docker & AWS', icon: Boxes, color: '#2563eb' },
  { name: 'C++ & DSA', icon: Code2, color: '#3b82f6' },
  { name: 'Python', icon: Terminal, color: '#eab308' },
  { name: 'Socket.IO', icon: Zap, color: '#f97316' },
  { name: 'JWT & RBAC', icon: Shield, color: '#ef4444' },
  { name: 'Git & GitHub', icon: GitBranch, color: '#a855f7' },
]

export default function TechMarquee() {
  return (
    <div
      className="py-6 border-b overflow-hidden relative"
      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
      aria-label="Core technologies marquee"
    >
      {/* Left/Right Edge fade masks */}
      <div
        className="pointer-events-none absolute left-0 inset-y-0 w-24 z-10"
        style={{ background: 'linear-gradient(to right, var(--bg), transparent)' }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 inset-y-0 w-24 z-10"
        style={{ background: 'linear-gradient(to left, var(--bg), transparent)' }}
        aria-hidden="true"
      />

      <div className="animate-marquee">
        {/* Double array for seamless loop */}
        {[...marqueeItems, ...marqueeItems].map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={`${item.name}-${idx}`}
              className="inline-flex items-center gap-2 rounded-full border px-4 py-2 mx-3 text-xs font-mono backdrop-blur-md transition-colors hover:border-[#2563eb]"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
            >
              <Icon size={14} style={{ color: item.color }} />
              <span className="font-semibold">{item.name}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

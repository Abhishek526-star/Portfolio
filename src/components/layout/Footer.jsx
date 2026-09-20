import { Github, Linkedin, Mail, ArrowUp, Eye } from 'lucide-react'
import { profile } from '../../data/profile.js'
import { useViewCount } from '../../utils/useViewCount.js'

export default function Footer() {
  const views = useViewCount()
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer className="surface border-t mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="font-semibold text-[var(--text-primary)]">{profile.name}</p>
            <p className="text-sm text-muted">Computer Science & Engineering</p>
            <p className="text-sm text-muted">Full-Stack Developer | AI Enthusiast</p>
          </div>

          <div className="flex items-center gap-5">
            <a href={profile.github} className="text-muted hover:text-[#2563eb] transition-colors" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href={profile.linkedin} className="text-muted hover:text-[#2563eb] transition-colors" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href={`mailto:${profile.email}`} className="text-muted hover:text-[#2563eb] transition-colors" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm text-muted hover:text-[#2563eb] transition-colors cursor-pointer"
            aria-label="Back to top"
          >
            Back to Top <ArrowUp size={16} />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted" style={{ borderColor: 'var(--border)' }}>
          <div className="space-y-0.5 text-center sm:text-left">
            <p>© 2026 {profile.name} • All rights reserved.</p>
            <p>Built with React, Vite &amp; Tailwind CSS</p>
          </div>

          <div
            className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs shadow-xs"
            style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}
          >
            <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" aria-hidden="true" />
            <Eye size={14} className="text-[#38bdf8]" />
            <span>Profile Views:</span>
            <span className="font-bold text-[var(--text-primary)]">
              {views !== null ? views.toLocaleString() : '...'}
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home,
  User,
  Wrench,
  Briefcase,
  FolderGit2,
  GraduationCap,
  FileText,
  Github,
  Linkedin,
  Mail,
  Search,
  BookOpen,
} from 'lucide-react'
import { profile } from '../../data/profile.js'
import { projects } from '../../data/projects.js'
import { isPlaceholder } from '../../utils/helpers.js'

const sections = [
  { label: 'Go to Home', href: '#home', icon: Home },
  { label: 'Go to About', href: '#about', icon: User },
  { label: 'Go to Skills', href: '#skills', icon: Wrench },
  { label: 'Go to Experience', href: '#experience', icon: Briefcase },
  { label: 'Go to Projects', href: '#projects', icon: FolderGit2 },
  { label: 'Go to Education', href: '#education', icon: GraduationCap },
  { label: 'Contact Me', href: '#contact', icon: Mail },
]

const projectCommands = projects.map((p) => ({
  label: `Case Study: ${p.title.split('—')[0].trim()}`,
  to: `/project/${p.id}`,
  icon: BookOpen,
}))

const externalActions = [
  { label: 'Download Resume', href: '/resume.pdf', icon: FileText, download: true },
  { label: 'Open GitHub', href: profile.github, icon: Github, external: true },
  { label: 'Open LinkedIn', href: profile.linkedin, icon: Linkedin, external: true },
]

const commands = [...sections, ...projectCommands, ...externalActions]

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(0)
  const navigate = useNavigate()

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()))

  const close = useCallback(() => {
    setOpen(false)
    setQuery('')
    setSelected(0)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [close])

  const run = useCallback(
    (cmd) => {
      close()
      if (cmd.to) {
        navigate(cmd.to)
      } else if (cmd.href?.startsWith('#')) {
        navigate('/')
        setTimeout(() => document.getElementById(cmd.href.slice(1))?.scrollIntoView({ behavior: 'smooth' }), 50)
      } else if (cmd.download) {
        const a = document.createElement('a')
        a.href = cmd.href
        a.download = 'resume.pdf'
        a.click()
      } else if (cmd.external) {
        if (!isPlaceholder(cmd.href)) {
          window.open(cmd.href, '_blank', 'noopener')
        } else {
          navigate('/')
          setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50)
        }
      }
    },
    [close, navigate]
  )

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full border px-3 py-2 text-xs text-muted card shadow-xl"
        aria-label="Open command palette (Ctrl+K)"
      >
        <Search size={14} /> Ctrl + K
      </button>
    )
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={(e) => e.target === e.currentTarget && close()}
    >
      <div className="w-full max-w-lg card overflow-hidden shadow-2xl" style={{ background: 'var(--bg-secondary)' }}>
        <input
          autoFocus
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setSelected(0)
          }}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setSelected((s) => Math.min(s + 1, filtered.length - 1))
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              setSelected((s) => Math.max(s - 1, 0))
            }
            if (e.key === 'Enter' && filtered[selected]) run(filtered[selected])
          }}
          placeholder="Search portfolio commands..."
          className="w-full border-b bg-transparent px-4 py-3 text-sm outline-none text-[var(--text-primary)]"
          style={{ borderColor: 'var(--border)' }}
          aria-label="Search portfolio commands"
        />
        <ul className="max-h-72 overflow-y-auto py-2" role="listbox">
          {filtered.length === 0 && <li className="px-4 py-3 text-sm text-muted">No results found.</li>}
          {filtered.map((cmd, i) => {
            const Icon = cmd.icon
            return (
              <li key={cmd.label}>
                <button
                  onClick={() => run(cmd)}
                  onMouseEnter={() => setSelected(i)}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
                    i === selected ? 'bg-[#2563eb]/15 text-[#2563eb] font-medium' : 'text-muted hover:text-[var(--text-primary)]'
                  }`}
                  role="option"
                  aria-selected={i === selected}
                >
                  <Icon size={16} />
                  {cmd.label}
                </button>
              </li>
            )
          })}
        </ul>
        <div className="border-t px-4 py-2 text-xs text-muted flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <span>↑↓ navigate • ↵ select • esc close</span>
          <span className="font-mono text-[10px]">Ctrl+K</span>
        </div>
      </div>
    </div>
  )
}

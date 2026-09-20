import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, Linkedin, Mail, Download, FolderGit2, Eye, Terminal as TerminalIcon } from 'lucide-react'
import { profile } from '../../data/profile.js'
import { isPlaceholder } from '../../utils/helpers.js'
import { useViewCount } from '../../utils/useViewCount.js'

export default function Hero() {
  const views = useViewCount()
  const [terminalHistory, setTerminalHistory] = useState([])
  const [inputVal, setInputVal] = useState('')
  const terminalEndRef = useRef(null)

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return
    e.preventDefault()
    const trimmed = inputVal.trim().toLowerCase()
    if (!trimmed) return

    let response = ''
    if (trimmed === 'help') {
      response = 'Available commands: whoami, skills, projects, contact, resume, clear'
    } else if (trimmed === 'whoami') {
      response = 'Abhishek Kumar — Computer Science & Engineering Student & Full-Stack Developer'
    } else if (trimmed === 'skills') {
      response = 'MERN Stack, C++, Java, Python, Gemini API, RAG, Tailwind CSS, Vite'
    } else if (trimmed === 'projects') {
      response = 'Navigating to Projects section...'
      setTimeout(() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else if (trimmed === 'contact') {
      response = 'Scrolling to contact form...'
      setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300)
    } else if (trimmed === 'resume') {
      response = 'Downloading resume PDF...'
      const a = document.createElement('a')
      a.href = '/resume.pdf'
      a.download = 'resume.pdf'
      a.click()
    } else if (trimmed === 'clear') {
      setTerminalHistory([])
      setInputVal('')
      return
    } else {
      response = `command not found: "${trimmed}". Type "help" for available commands.`
    }

    setTerminalHistory((prev) => [...prev, { cmd: inputVal, output: response }])
    setInputVal('')
    setTimeout(() => terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 50)
  }

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(600px circle at 20% 30%, rgba(37,99,235,0.12), transparent 60%), radial-gradient(600px circle at 80% 70%, rgba(139,92,246,0.10), transparent 60%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12 grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#22c55e]/40 bg-[#22c55e]/10 px-3 py-1 text-xs text-[#22c55e]">
              <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" aria-hidden="true" />
              {profile.openToWork}
            </span>

            <span
              className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-mono font-medium shadow-xs"
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                color: 'var(--text-primary)',
              }}
              title="Total Profile Views"
            >
              <Eye size={13} className="text-[#38bdf8]" />
              <span className="text-[#38bdf8] font-bold">
                {views !== null ? views.toLocaleString() : '...'}
              </span>
              <span className="text-muted text-[11px]">views</span>
            </span>
          </div>

          <h1 className="mt-5 text-4xl sm:text-6xl font-extrabold tracking-tight">
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
          </h1>

          <p className="mt-3 text-lg sm:text-xl font-medium text-[#2563eb]">
            {profile.tagline}
          </p>

          <p className="mt-4 text-sm sm:text-base text-muted max-w-xl leading-relaxed">
            {profile.bio}
          </p>

          {Array.isArray(profile.subRoles) && profile.subRoles.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-mono">
              {profile.subRoles.map((role) => (
                <span
                  key={role}
                  className="rounded-md border px-2.5 py-1 text-muted"
                  style={{ borderColor: 'var(--border)' }}
                >
                  {role}
                </span>
              ))}
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-3 text-sm font-medium text-white hover:bg-[#1d4ed8] hover:-translate-y-0.5 transition-all shadow-lg shadow-[#2563eb]/25"
            >
              <FolderGit2 size={16} /> View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <Mail size={16} /> Contact Me
            </a>
          </div>

          {/* Social links */}
          <div className="mt-8 flex items-center gap-3">
            {!isPlaceholder(profile.github || profile.socials?.github) && (
              <a
                href={profile.github || profile.socials?.github}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border hover:text-[#2563eb] hover:border-[#2563eb] transition-colors"
                style={{ borderColor: 'var(--border)' }}
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </a>
            )}
            {!isPlaceholder(profile.linkedin || profile.socials?.linkedin) && (
              <a
                href={profile.linkedin || profile.socials?.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border hover:text-[#2563eb] hover:border-[#2563eb] transition-colors"
                style={{ borderColor: 'var(--border)' }}
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </a>
            )}
            {!isPlaceholder(profile.email) && (
              <a
                href={`mailto:${profile.email}`}
                className="p-2.5 rounded-lg border hover:text-[#2563eb] hover:border-[#2563eb] transition-colors"
                style={{ borderColor: 'var(--border)' }}
                aria-label="Email Abhishek"
              >
                <Mail size={18} />
              </a>
            )}
            {profile.socials?.leetcode && !isPlaceholder(profile.socials.leetcode) && (
              <a
                href={profile.socials.leetcode}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border hover:text-[#2563eb] hover:border-[#2563eb] transition-colors text-xs font-mono font-bold"
                style={{ borderColor: 'var(--border)' }}
                aria-label="LeetCode Profile"
              >
                LC
              </a>
            )}
            {profile.socials?.gfg && !isPlaceholder(profile.socials.gfg) && (
              <a
                href={profile.socials.gfg}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-lg border hover:text-[#2563eb] hover:border-[#2563eb] transition-colors text-xs font-mono font-bold"
                style={{ borderColor: 'var(--border)' }}
                aria-label="GeeksforGeeks Profile"
              >
                GFG
              </a>
            )}
          </div>
        </motion.div>

        {/* Interactive Developer Terminal Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="terminal p-4 sm:p-5 shadow-2xl flex flex-col max-h-[460px]"
          aria-label="Interactive developer terminal"
        >
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="terminal-dot bg-[#ef4444]" />
              <span className="terminal-dot bg-[#eab308]" />
              <span className="terminal-dot bg-[#22c55e]" />
              <span className="ml-2 text-xs text-[#94a3b8] font-mono">abhishek@portfolio: ~</span>
            </div>
            <span className="text-[10px] text-slate-400 flex items-center gap-1 font-mono">
              <TerminalIcon size={12} /> interactive CLI
            </span>
          </div>

          <div className="pt-4 space-y-2 font-mono text-xs sm:text-sm overflow-y-auto flex-1 pr-1">
            {/* Base prompt content mandated by Section 6 */}
            <p className="text-[#22c55e]">&gt; whoami</p>
            <p className="text-[#f8fafc]">Abhishek Kumar</p>
            <p className="text-[#94a3b8] pl-4">Computer Science Engineer</p>
            <p className="mt-4 text-[#22c55e]">&gt; building...</p>
            <p className="text-[#2563eb]">full-stack web applications</p>
            <p className="text-[#22c55e]">&gt; learning...</p>
            <p className="text-[#8b5cf6]">Generative AI / Agentic AI</p>
            <p className="text-[#22c55e]">&gt; solving...</p>
            <p className="text-[#94a3b8]">DSA &amp; real-world problems</p>

            {/* History of user executed commands */}
            {terminalHistory.map((item, idx) => (
              <div key={idx} className="space-y-1 pt-2 border-t border-white/10">
                <p className="text-[#22c55e]">&gt; {item.cmd}</p>
                <p className="text-[#38bdf8] whitespace-pre-wrap">{item.output}</p>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          {/* Quick command buttons */}
          <div className="pt-2.5 border-t border-white/10 flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
            <span className="text-slate-400 font-medium">Quick run:</span>
            {['skills', 'projects', 'contact', 'resume', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  setInputVal(cmd)
                  setTimeout(() => {
                    handleCommand({ key: 'Enter', preventDefault: () => {} })
                  }, 10)
                }}
                className="rounded bg-white/10 border border-white/20 px-2 py-0.5 text-slate-200 hover:text-[#38bdf8] hover:border-[#38bdf8]/60 hover:bg-white/20 transition-all font-mono"
              >
                ${cmd}
              </button>
            ))}
          </div>

          {/* Interactive input bar */}
          <div className="mt-2.5 pt-2.5 border-t border-white/10 flex items-center gap-2 font-mono text-xs">
            <span className="text-[#22c55e] font-bold shrink-0">&gt;</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              placeholder="type 'help', 'projects', 'skills'..."
              className="w-full bg-transparent outline-none text-white placeholder:text-slate-400 font-mono"
              aria-label="Terminal command line input"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

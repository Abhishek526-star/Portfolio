import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  MapPin,
  Clock,
  Code2,
  BrainCircuit,
  GraduationCap,
  Sparkles,
  Compass,
  Check,
  Copy,
} from 'lucide-react'
import { profile } from '../../data/profile.js'

export default function About() {
  const [time, setTime] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour12: true,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  const codeSnippet = `const developer = {
  name: "Abhishek Kumar",
  role: "Software Engineer",
  education: "B.Tech CSE @ MMMUT",
  focus: ["Full-Stack", "AI/GenAI"],
  openToWork: true
};`

  const handleCopy = () => {
    navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="about" className="py-10 sm:py-14 relative" aria-labelledby="about-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full border border-[#2563eb]/20">
            Developer Blueprint
          </span>
          <h2 id="about-heading" className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="mt-2 text-sm text-muted">
            Blending full-stack engineering with intelligent systems &amp; modern user experiences.
          </p>
        </motion.div>

        {/* Asymmetric Bento Grid (Section 8 & 38 compliance) */}
        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tile 1: Engineering Story (Span 2 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 md:col-span-2 flex flex-col justify-between relative overflow-hidden"
          >
            <div
              className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full bg-[#2563eb]/10 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2563eb] tracking-wider">
                <Code2 size={16} /> Engineering Background
              </div>
              <h3 className="mt-3 text-xl sm:text-2xl font-bold">
                Building scalable web apps with modern stacks &amp; practical AI.
              </h3>
              <div className="mt-4 space-y-3 text-sm text-muted leading-relaxed">
                <p>
                  I&apos;m a B.Tech Computer Science &amp; Engineering student at{' '}
                  <strong className="font-semibold text-[var(--text-primary)]">Madan Mohan Malaviya University of Technology</strong> with a passion
                  for engineering high-performance software. My primary expertise revolves around the React and Node.js
                  ecosystem, architecting robust APIs, schema-optimized databases, and fluid interactive UIs.
                </p>
                <p>
                  I have hands-on experience developing industrial SCADA telecom GUIs and 3D metro station visualizations
                  using Three.js during my internship at{' '}
                  <strong className="font-semibold text-[var(--text-primary)]">Bharat Electronics Limited (BEL)</strong>.
                </p>
                <p>
                  Driven by curiosity, I actively explore Generative AI, Retrieval-Augmented Generation (RAG), and agentic
                  workflows that turn cutting-edge models into real-world software products.
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t flex flex-wrap items-center gap-3 text-xs font-mono text-muted" style={{ borderColor: 'var(--border)' }}>
              <span className="flex items-center gap-1 text-[#22c55e]">
                <Check size={14} /> Clean Code
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#38bdf8]">
                <Check size={14} /> Scalable Architecture
              </span>
              <span>•</span>
              <span className="flex items-center gap-1 text-[#8b5cf6]">
                <Check size={14} /> AI-Native Workflows
              </span>
            </div>
          </motion.div>

          {/* Tile 2: Live India Timezone & Location Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="card p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-muted flex items-center gap-1.5">
                <MapPin size={14} className="text-[#ef4444]" /> Location
              </span>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-[#22c55e] bg-[#22c55e]/10 px-2 py-0.5 rounded-full border border-[#22c55e]/20">
                <span className="h-2 w-2 rounded-full bg-[#22c55e] animate-pulse" />
                Live in India
              </span>
            </div>

            <div className="my-6 text-center">
              <p className="text-xs uppercase tracking-widest text-muted font-mono">Indian Standard Time</p>
              <p className="text-3xl sm:text-4xl font-mono font-bold text-[var(--text-primary)] mt-2">
                {time || '12:00:00 PM'}
              </p>
              <p className="text-xs text-muted font-mono mt-1">UTC +5:30 (IST)</p>
            </div>

            <div className="rounded-xl border p-3 text-xs text-muted flex items-center gap-2" style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}>
              <Clock size={16} className="text-[#38bdf8] shrink-0" />
              <span>Available for internships, placements &amp; software roles.</span>
            </div>
          </motion.div>

          {/* Tile 3: Code Philosophy / Interactive Code Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="card p-6 flex flex-col justify-between font-mono"
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--border)' }}>
              <span className="text-xs text-muted">developer.config.json</span>
              <button
                onClick={handleCopy}
                className="text-muted hover:text-[var(--text-primary)] transition-colors text-xs flex items-center gap-1 cursor-pointer"
                aria-label="Copy developer object"
              >
                {copied ? <Check size={14} className="text-[#22c55e]" /> : <Copy size={14} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            <pre className="text-xs text-muted my-4 overflow-x-auto leading-relaxed whitespace-pre">
              <code>{codeSnippet}</code>
            </pre>

            <div className="pt-2 border-t flex items-center gap-2 text-[11px] text-[#22c55e]" style={{ borderColor: 'var(--border)' }}>
              <span className="h-1.5 w-1.5 rounded-full bg-[#22c55e]" />
              <span>Tested &amp; ready to deploy</span>
            </div>
          </motion.div>

          {/* Tile 4: Generative AI & Next-Gen Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#8b5cf6] tracking-wider">
                <BrainCircuit size={16} /> Currently Learning
              </div>
              <h4 className="mt-2 text-lg font-bold">Generative &amp; Agentic AI</h4>
              <p className="mt-2 text-xs text-muted leading-relaxed">
                Exploring prompt architecture, LangChain tools, vector embeddings with RAG, and autonomous agent
                workflows powered by Gemini API.
              </p>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {['Gemini API', 'LangChain', 'RAG Pipelines', 'Vector Search'].map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[#8b5cf6]/15 border border-[#8b5cf6]/30 px-2.5 py-0.5 text-[11px] font-mono text-[#a855f7]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Tile 5: Education & Foundation Roots */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
            className="card p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#06b6d4] tracking-wider">
                <GraduationCap size={16} /> Academic Roots
              </div>
              <h4 className="mt-2 text-lg font-bold">B.Tech in Computer Science</h4>
              <p className="mt-1 text-xs text-muted">Madan Mohan Malaviya University of Technology, Gorakhpur</p>
              <div className="mt-3 pt-3 border-t text-xs text-muted space-y-1" style={{ borderColor: 'var(--border)' }}>
                <p>• Jawahar Navodaya Vidyalaya, Shahjahanpur</p>
                <p className="text-[11px] font-mono text-[#22c55e]">Class XII (80%) • Class X (83.25%)</p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-1.5 text-xs text-[#06b6d4] font-mono">
              <Sparkles size={14} /> Strong algorithmic foundation
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

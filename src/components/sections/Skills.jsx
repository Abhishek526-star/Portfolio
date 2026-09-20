import { motion } from 'framer-motion'
import {
  Code2,
  Layout,
  Server,
  Database,
  BrainCircuit,
  Wrench,
  Sparkles,
} from 'lucide-react'
import { skillGroups } from '../../data/skills.js'

const categoryMeta = {
  Languages: {
    icon: Code2,
    color: '#f59e0b',
    border: 'hover:border-amber-500/50',
    glow: 'hover:shadow-[0_12px_30px_-8px_rgba(245,158,11,0.22)]',
    badgeBg: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border-amber-500/30',
    dotBg: 'bg-amber-500',
    gradientBar: 'from-amber-500 via-orange-500 to-amber-600',
  },
  Frontend: {
    icon: Layout,
    color: '#06b6d4',
    border: 'hover:border-cyan-500/50',
    glow: 'hover:shadow-[0_12px_30px_-8px_rgba(6,182,212,0.22)]',
    badgeBg: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border-cyan-500/30',
    dotBg: 'bg-cyan-500',
    gradientBar: 'from-cyan-500 via-sky-500 to-blue-500',
  },
  Backend: {
    icon: Server,
    color: '#10b981',
    border: 'hover:border-emerald-500/50',
    glow: 'hover:shadow-[0_12px_30px_-8px_rgba(16,185,129,0.22)]',
    badgeBg: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-emerald-500/30',
    dotBg: 'bg-emerald-500',
    gradientBar: 'from-emerald-500 via-teal-500 to-emerald-600',
  },
  Databases: {
    icon: Database,
    color: '#8b5cf6',
    border: 'hover:border-purple-500/50',
    glow: 'hover:shadow-[0_12px_30px_-8px_rgba(139,92,246,0.22)]',
    badgeBg: 'bg-purple-500/10 text-purple-700 dark:text-purple-400 border-purple-500/30',
    dotBg: 'bg-purple-500',
    gradientBar: 'from-purple-500 via-indigo-500 to-violet-600',
  },
  'AI / GenAI': {
    icon: BrainCircuit,
    color: '#ec4899',
    border: 'hover:border-pink-500/50',
    glow: 'hover:shadow-[0_12px_30px_-8px_rgba(236,72,153,0.22)]',
    badgeBg: 'bg-pink-500/10 text-pink-700 dark:text-pink-400 border-pink-500/30',
    dotBg: 'bg-pink-500',
    gradientBar: 'from-pink-500 via-rose-500 to-fuchsia-600',
  },
  Tools: {
    icon: Wrench,
    color: '#3b82f6',
    border: 'hover:border-blue-500/50',
    glow: 'hover:shadow-[0_12px_30px_-8px_rgba(59,130,246,0.22)]',
    badgeBg: 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border-blue-500/30',
    dotBg: 'bg-blue-500',
    gradientBar: 'from-blue-500 via-indigo-500 to-sky-600',
  },
}

export default function Skills() {
  const handleSkillClick = (skill) => {
    window.dispatchEvent(new CustomEvent('filter-projects-by-skill', { detail: skill }))
    const el = document.getElementById('projects')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="skills"
      className="py-10 sm:py-14 border-y relative"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      aria-labelledby="skills-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full border border-[#2563eb]/20 inline-flex items-center gap-1.5">
            <Sparkles size={13} /> Technical Arsenal
          </span>
          <motion.h2
            id="skills-heading"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Skills &amp; <span className="gradient-text">Technologies</span>
          </motion.h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            Click any skill pill to filter relevant production projects below
          </p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const meta = categoryMeta[group.category] || categoryMeta.Tools
            const IconComponent = meta.icon

            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={`card group relative p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 ${meta.border} ${meta.glow}`}
              >
                {/* Top category gradient accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${meta.gradientBar} opacity-80 group-hover:opacity-100 transition-opacity`}
                />

                {/* Card Header with Icon, Category Name, and Skill Count */}
                <div className="flex items-center justify-between gap-3 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-xl border ${meta.badgeBg}`}>
                      <IconComponent size={20} />
                    </div>
                    <div>
                      <h3 className="skill-category-title font-bold text-base sm:text-lg text-[#0f172a] dark:text-[#f8fafc]">
                        {group.category}
                      </h3>
                      <p className="text-[11px] text-slate-600 dark:text-slate-400 font-medium">Core Competencies</p>
                    </div>
                  </div>

                  <span className="skill-counter-badge text-[11px] font-mono px-2.5 py-0.5 rounded-full border">
                    {group.skills.length} skills
                  </span>
                </div>

                {/* Skill Pills */}
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <li key={skill}>
                      <button
                        onClick={() => handleSkillClick(skill)}
                        className="skill-pill group/pill inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer active:scale-95"
                        title={`Filter projects using ${skill}`}
                        aria-label={`Filter projects using ${skill}`}
                      >
                        <span className={`h-2 w-2 rounded-full ${meta.dotBg} shrink-0 group-hover/pill:scale-125 transition-transform`} />
                        <span>{skill}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

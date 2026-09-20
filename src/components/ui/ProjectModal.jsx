import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Github, ExternalLink, ArrowRight, Layers } from 'lucide-react'
import { Link } from 'react-router-dom'
import { isPlaceholder } from '../../utils/helpers.js'

const caseStudySections = [
  { key: 'problem', label: '01 — Problem' },
  { key: 'research', label: '02 — Research' },
  { key: 'solution', label: '03 — Solution' },
  { key: 'architecture', label: '04 — Architecture' },
  { key: 'implementation', label: '05 — Implementation' },
  { key: 'challenges', label: '06 — Challenges' },
  { key: 'results', label: '07 — Results' },
  { key: 'learnings', label: '08 — Learnings' },
  { key: 'improvements', label: '09 — Future Improvements' },
]

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!project) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`${project.title} details`}
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2 }}
            className="card max-h-[88vh] w-full max-w-3xl overflow-y-auto"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <div
              className="sticky top-0 z-10 flex items-center justify-between border-b p-5 backdrop-blur-md"
              style={{ background: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
            >
              <div>
                <span className="text-xs font-mono text-[#2563eb]">{project.category}</span>
                <h3 className="font-bold text-lg">{project.title}</h3>
              </div>
              <button
                ref={closeRef}
                onClick={onClose}
                className="rounded-lg p-1.5 text-muted hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-[#111827] transition-colors cursor-pointer"
                aria-label="Close project details"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {project.image && (
                <div
                  className="rounded-xl overflow-hidden border max-h-64 sm:max-h-80 shadow-md bg-black/10"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              )}

              <p className="text-sm text-muted leading-relaxed">{project.shortDescription}</p>

              {/* Technology Stack */}
              <section aria-label="Technology stack">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563eb]">Technology Stack</h4>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border px-3 py-1 text-xs text-muted font-mono"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Architecture Topology */}
              {project.caseStudy && (
                <section
                  className="rounded-xl border p-4 font-mono text-xs"
                  style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
                >
                  <p className="font-semibold text-[#8b5cf6] flex items-center gap-1.5 mb-2">
                    <Layers size={14} /> Architecture Topology
                  </p>
                  <p className="text-muted leading-relaxed">
                    Client SPA (React/Tailwind) ➔ REST &amp; WebSockets (Node/Express) ➔ Services (MongoDB, Razorpay, Cloudinary, Gemini)
                  </p>
                </section>
              )}

              {/* Complete 9-step case study breakdown */}
              {project.caseStudy && (
                <section aria-label="Case study" className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563eb]">
                      Case Study (01–09 Breakdown)
                    </h4>
                    <Link
                      to={`/project/${project.id}`}
                      onClick={onClose}
                      className="text-xs text-[#8b5cf6] hover:underline flex items-center gap-1"
                    >
                      Full Page View <ArrowRight size={12} />
                    </Link>
                  </div>
                  <div className="space-y-4">
                    {caseStudySections.map((s) => {
                      if (!project[s.key]) return null
                      return (
                        <div
                          key={s.key}
                          className="rounded-lg border p-4"
                          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
                        >
                          <h5 className="font-mono text-xs font-bold text-[#8b5cf6]">{s.label}</h5>
                          <p className="mt-1.5 text-sm text-muted leading-relaxed">{project[s.key]}</p>
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}

              {/* Key Features */}
              <section aria-label="Key features">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#2563eb]">Key Features</h4>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="text-sm text-muted flex items-start gap-2">
                      <span className="text-[#22c55e] font-bold">•</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t" style={{ borderColor: 'var(--border)' }}>
                {!isPlaceholder(project.liveDemo) && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
                  >
                    <ExternalLink size={16} /> Live Demo
                  </a>
                )}
                {!isPlaceholder(project.github) && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 text-sm hover:border-[#2563eb] transition-colors"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <Github size={16} /> GitHub Source
                  </a>
                )}
                {project.caseStudy && (
                  <Link
                    to={`/project/${project.id}`}
                    onClick={onClose}
                    className="inline-flex items-center gap-1.5 text-xs text-muted hover:text-[#8b5cf6] ml-auto"
                  >
                    Open Standalone Page <ArrowRight size={14} />
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

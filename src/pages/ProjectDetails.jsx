import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Github, ExternalLink, Cpu, Layers, CheckCircle2, ShieldAlert, Sparkles, Lightbulb } from 'lucide-react'
import { projects } from '../data/projects.js'
import { isPlaceholder } from '../utils/helpers.js'

const caseStudySteps = [
  { key: 'problem', step: '01', title: 'Problem', icon: ShieldAlert, color: '#ef4444' },
  { key: 'research', step: '02', title: 'Research & User Needs', icon: Lightbulb, color: '#eab308' },
  { key: 'solution', step: '03', title: 'Solution', icon: CheckCircle2, color: '#22c55e' },
  { key: 'architecture', step: '04', title: 'System Architecture', icon: Layers, color: '#2563eb' },
  { key: 'implementation', step: '05', title: 'Implementation Details', icon: Cpu, color: '#8b5cf6' },
  { key: 'challenges', step: '06', title: 'Key Technical Challenges', icon: ShieldAlert, color: '#f97316' },
  { key: 'results', step: '07', title: 'Results & Impact', icon: Sparkles, color: '#06b6d4' },
  { key: 'learnings', step: '08', title: 'What I Learned', icon: Lightbulb, color: '#10b981' },
  { key: 'improvements', step: '09', title: 'Future Improvements', icon: Sparkles, color: '#a855f7' },
]

export default function ProjectDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])

  if (!project) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-3xl font-bold">Project Not Found</h1>
        <p className="mt-2 text-muted">The requested project case study could not be located.</p>
        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8]"
        >
          <ArrowLeft size={16} /> Back to Projects
        </Link>
      </div>
    )
  }

  return (
    <div className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/#projects')}
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-[#2563eb] transition-colors mb-8"
        aria-label="Back to projects list"
      >
        <ArrowLeft size={16} /> Back to Projects
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2563eb]/40 bg-[#2563eb]/10 px-3 py-1 text-xs text-[#2563eb]">
          {project.category}
        </div>
        <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-lg text-muted leading-relaxed max-w-3xl">{project.shortDescription}</p>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 pt-4">
          {!isPlaceholder(project.liveDemo) && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
            >
              <ExternalLink size={16} /> View Live Demo
            </a>
          )}
          {!isPlaceholder(project.github) && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium hover:border-[#2563eb] transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <Github size={16} /> View Source Code
            </a>
          )}
        </div>
      </motion.div>

      {/* Project Visual Banner */}
      {project.image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-8 rounded-2xl overflow-hidden border shadow-xl bg-black/10 max-h-[440px]"
          style={{ borderColor: 'var(--border)' }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-top"
          />
        </motion.div>
      )}

      {/* Tech Stack Pills */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mt-12 card p-6"
        aria-label="Technologies used"
      >
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#2563eb]">Technology Stack</h2>
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <li
              key={tech}
              className="rounded-full border px-3 py-1 text-xs font-mono text-muted"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}
            >
              {tech}
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Architecture Diagram Box (Section 15 requirement for complex projects) */}
      {project.caseStudy && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-10 card p-6 sm:p-8"
          aria-label="System Architecture Overview"
        >
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8b5cf6]">
            <Layers size={16} /> Architecture Diagram
          </div>
          <h3 className="mt-2 text-xl font-bold">System Topology & Data Flow</h3>

          <div
            className="mt-6 rounded-xl border p-6 font-mono text-xs sm:text-sm overflow-x-auto"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
              <div className="rounded-lg border p-4 border-[#2563eb]/40 bg-[#2563eb]/10">
                <p className="font-semibold text-[#2563eb]">Frontend Client</p>
                <p className="mt-1 text-xs text-muted">React (Vite) / Tailwind / Framer Motion</p>
              </div>
              <div className="rounded-lg border p-4 border-[#8b5cf6]/40 bg-[#8b5cf6]/10 flex flex-col justify-center">
                <p className="font-semibold text-[#8b5cf6]">Backend API Gateway</p>
                <p className="mt-1 text-xs text-muted">Node.js + Express 5 / REST / WebSockets</p>
              </div>
              <div className="rounded-lg border p-4 border-[#22c55e]/40 bg-[#22c55e]/10">
                <p className="font-semibold text-[#22c55e]">Data & External Services</p>
                <p className="mt-1 text-xs text-muted">MongoDB / Cloudinary / Razorpay / Gemini</p>
              </div>
            </div>
            <div className="mt-4 text-center text-xs text-muted">
              🔒 JWT Authentication & RBAC Middleware between Client & Server layers
            </div>
          </div>
        </motion.section>
      )}

      {/* Key Features */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 card p-6 sm:p-8"
        aria-label="Key features"
      >
        <h2 className="text-xl font-bold">Key Platform Features</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {project.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5 text-sm text-muted">
              <CheckCircle2 size={16} className="mt-0.5 text-[#22c55e] shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </motion.section>

      {/* Complete 9-step Case Study (Section 35) */}
      {project.caseStudy && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-14 space-y-8"
          aria-label="In-depth Case Study"
        >
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">
              In-Depth <span className="gradient-text">Case Study</span>
            </h2>
            <p className="mt-2 text-sm text-muted">
              A comprehensive technical walkthrough from initial research to deployment.
            </p>
          </div>

          <div className="space-y-6">
            {caseStudySteps.map((step) => {
              const content = project[step.key]
              if (!content) return null
              const Icon = step.icon

              return (
                <article
                  key={step.key}
                  className="card card-hover p-6 sm:p-8 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-xs font-bold px-2.5 py-1 rounded-md"
                      style={{ backgroundColor: `${step.color}20`, color: step.color }}
                    >
                      {step.step}
                    </span>
                    <Icon size={18} style={{ color: step.color }} />
                    <h3 className="font-semibold text-base sm:text-lg">{step.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-muted leading-relaxed pl-1 sm:pl-2">
                    {content}
                  </p>
                </article>
              )
            })}
          </div>
        </motion.section>
      )}
    </div>
  )
}

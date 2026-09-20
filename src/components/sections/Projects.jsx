import { useState, lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, Github } from 'lucide-react'
import { projects } from '../../data/projects.js'
import { profile } from '../../data/profile.js'
import { isPlaceholder } from '../../utils/helpers.js'
import ProjectCard from '../ui/ProjectCard.jsx'

const ProjectModal = lazy(() => import('../ui/ProjectModal.jsx'))

export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [showAll, setShowAll] = useState(false)

  const displayedProjects = showAll ? projects : projects.filter((p) => p.featured)

  return (
    <section
      id="projects"
      className="py-10 sm:py-14 border-y relative"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full border border-[#2563eb]/20">
            Selected Work
          </span>
          <h2
            id="projects-heading"
            className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="mt-2 text-sm text-muted">
            Production-oriented full-stack platforms and intelligent software systems I&apos;ve engineered.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="mt-8 sm:mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {displayedProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} index={i} />
          ))}
        </div>

        {/* See More Projects Button */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 rounded-xl bg-[#2563eb]/10 border border-[#2563eb]/30 px-6 py-3 text-sm font-semibold text-[#38bdf8] hover:bg-[#2563eb] hover:text-white transition-all shadow-lg hover:shadow-[#2563eb]/20 cursor-pointer"
            aria-expanded={showAll}
          >
            <span>{showAll ? 'Show Less' : 'See More Projects'}</span>
            {showAll ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {!isPlaceholder(profile.github) && (
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-medium text-muted hover:text-white hover:border-[#2563eb] transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <Github size={16} /> More on GitHub
            </a>
          )}
        </div>
      </div>

      <Suspense fallback={null}>
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      </Suspense>
    </section>
  )
}

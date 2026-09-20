import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Github, ExternalLink, BookOpen, ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react'
import { isPlaceholder } from '../../utils/helpers.js'

import ProjectArtwork from './ProjectArtwork.jsx'
import TiltCard from './TiltCard.jsx'

export default function ProjectCard({ project, onOpen, index = 0 }) {
  return (
    <TiltCard maxTilt={5}>
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.45, delay: (index % 3) * 0.08 }}
        className="card card-hover flex flex-col overflow-hidden h-full"
      >
      {/* Product Artwork / Screenshot Preview */}
      <div
        className="h-48 border-b relative group overflow-hidden bg-black/20"
        style={{ borderColor: 'var(--border)' }}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        ) : (
          <ProjectArtwork projectId={project.id} title={project.title} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-3 right-3 z-10">
          <span
            className="rounded-full bg-[#111827]/85 backdrop-blur-md px-2.5 py-0.5 text-xs text-white/90 border shadow-sm"
            style={{ borderColor: 'var(--border)' }}
          >
            {project.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6 space-y-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
          <p className="mt-2 text-sm text-muted leading-relaxed">{project.shortDescription}</p>
        </div>

        {/* Problem Solved snippet - mandated by Section 11 */}
        {project.problem && (
          <div
            className="rounded-lg border p-3 text-xs leading-relaxed"
            style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
          >
            <p className="font-semibold text-[#8b5cf6] flex items-center gap-1.5 mb-1">
              <AlertCircle size={14} /> Problem Solved
            </p>
            <p className="text-muted line-clamp-2">{project.problem}</p>
          </div>
        )}

        {/* Tech Stack */}
        <div>
          <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2">Tech Stack</p>
          <ul className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((t) => (
              <li key={t} className="rounded-full bg-[#2563eb]/10 px-2.5 py-0.5 text-xs text-[#2563eb]">
                {t}
              </li>
            ))}
            {project.techStack.length > 4 && (
              <li className="rounded-full bg-[#2563eb]/10 px-2.5 py-0.5 text-xs text-[#2563eb]">
                +{project.techStack.length - 4}
              </li>
            )}
          </ul>
        </div>

        {/* Key Features preview - mandated by Section 11 */}
        {project.features && project.features.length > 0 && (
          <div className="flex-1">
            <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-1.5">Key Features</p>
            <ul className="space-y-1">
              {project.features.slice(0, 2).map((feature) => (
                <li key={feature} className="flex items-center gap-1.5 text-xs text-muted truncate">
                  <CheckCircle2 size={13} className="text-[#22c55e] shrink-0" />
                  <span className="truncate">{feature}</span>
                </li>
              ))}
              {project.features.length > 2 && (
                <li className="text-[11px] text-muted pl-4">
                  +{project.features.length - 2} more features
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Action Buttons (Quick View, Case Study, Code, Live Demo) */}
        <div
          className="pt-3 border-t flex items-center justify-between gap-1.5 sm:gap-2 text-xs flex-nowrap"
          style={{ borderColor: 'var(--border)' }}
        >
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button
              onClick={onOpen}
              className="rounded-lg bg-[#2563eb]/10 px-2 sm:px-2.5 py-1.5 font-medium text-[11px] sm:text-xs text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
              aria-label={`Quick view details of ${project.title}`}
            >
              Quick View
            </button>

            {project.caseStudy && (
              <Link
                to={`/project/${project.id}`}
                className="inline-flex items-center gap-1 rounded-lg border px-2 sm:px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-muted hover:text-[#8b5cf6] hover:border-[#8b5cf6] transition-colors whitespace-nowrap"
                style={{ borderColor: 'var(--border)' }}
                aria-label={`Read full case study of ${project.title}`}
              >
                <BookOpen size={12} /> Case Study
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!isPlaceholder(project.github) && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-muted hover:text-[var(--text-primary)] transition-colors whitespace-nowrap"
                aria-label={`${project.title} GitHub repository`}
              >
                <Github size={13} /> Code
              </a>
            )}

            {!isPlaceholder(project.liveDemo) && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-medium text-muted hover:text-[#22c55e] transition-colors whitespace-nowrap"
                aria-label={`Live demo of ${project.title}`}
              >
                <ExternalLink size={13} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
    </TiltCard>
  )
}

import { motion } from 'framer-motion'
import { GraduationCap, MapPin, BookOpen, Award } from 'lucide-react'
import { education } from '../../data/education.js'

export default function Education() {
  return (
    <section id="education" className="py-10 sm:py-14" aria-labelledby="education-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="education-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center"
        >
          Edu<span className="gradient-text">cation</span>
        </motion.h2>

        <div className="mt-8 sm:mt-10 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-[#8b5cf6]/30" aria-hidden="true" />
          <ol className="space-y-10">
            {education.map((edu, i) => (
              <motion.li
                key={edu.degree}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12"
              >
                <span
                  className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#8b5cf6]/15 text-[#8b5cf6]"
                  aria-hidden="true"
                >
                  <GraduationCap size={16} />
                </span>
                <div className="card card-hover p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-xs text-muted">{edu.duration}</p>
                    {edu.score && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#22c55e]/15 border border-[#22c55e]/30 px-2.5 py-0.5 text-xs font-mono font-semibold text-[#22c55e]">
                        <Award size={12} /> {edu.score}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-1.5 text-lg font-bold text-[var(--text-primary)]">{edu.degree}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-0.5">
                    <p className="text-sm text-[#7c3aed] dark:text-[#8b5cf6] font-semibold">{edu.school}</p>
                    {edu.stream && (
                      <span className="rounded bg-[#8b5cf6]/15 text-[#7c3aed] dark:text-[#8b5cf6] text-[11px] font-mono px-2 py-0.5 border border-[#8b5cf6]/30 font-medium">
                        {edu.stream}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <MapPin size={12} /> {edu.location}
                  </p>

                  {edu.coursework && edu.coursework.length > 0 && (
                    <div className="mt-4">
                      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
                        <BookOpen size={12} /> Key Subjects &amp; Coursework
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-2">
                        {edu.coursework.map((c) => (
                          <li
                            key={c}
                            className="rounded-full border px-3 py-1 text-xs text-[var(--text-secondary)] font-mono font-medium"
                            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { Briefcase, MapPin, Check, GitCommit, Boxes, Terminal, Layers } from 'lucide-react'
import { experience } from '../../data/experience.js'

export default function Experience() {
  return (
    <section id="experience" className="py-10 sm:py-14 relative" aria-labelledby="experience-heading">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full border border-[#2563eb]/20">
            Professional Track Record
          </span>
          <h2
            id="experience-heading"
            className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            Work <span className="gradient-text">Experience</span>
          </h2>
          <p className="mt-2 text-sm text-muted">
            Hands-on software engineering internships &amp; real-world system deployments.
          </p>
        </motion.div>

        {/* Tree visualization mandated by Section 10 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 rounded-2xl border p-6 font-mono text-xs sm:text-sm card relative overflow-hidden"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
          aria-label="Experience git-tree visualization"
        >
          <div className="flex items-center justify-between pb-3 text-muted border-b" style={{ borderColor: 'var(--border)' }}>
            <div className="flex items-center gap-2">
              <GitCommit size={16} className="text-[#38bdf8]" />
              <span className="text-xs uppercase tracking-wider font-semibold text-[#38bdf8]">
                Git Commit Tree &bull; main
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#22c55e] bg-[#22c55e]/10 px-2.5 py-0.5 rounded-full border border-[#22c55e]/20">
              verified
            </span>
          </div>

          <div className="mt-4 space-y-2.5 text-xs text-muted">
            <div className="flex items-start gap-2">
              <span className="text-[#2563eb] select-none font-bold">* 7f3a9e2</span>
              <div>
                <span className="text-[var(--text-primary)] font-semibold">feat(metro-3d):</span> Interactive 3D metro rail digital twin with Three.js &amp; dynamic routing
              </div>
            </div>
            <div className="flex items-start gap-2 pl-4 border-l border-[#2563eb]/30 ml-2">
              <span className="text-[#8b5cf6] select-none font-bold">* 4b1c8d0</span>
              <div>
                <span className="text-[var(--text-primary)] font-semibold">feat(scada):</span> Real-time SCADA telemetry dashboard with sub-second alert dispatch
              </div>
            </div>
            <div className="flex items-start gap-2 pl-4 border-l border-[#8b5cf6]/30 ml-2">
              <span className="text-[#22c55e] select-none font-bold">* 1a9f0e4</span>
              <div>
                <span className="text-[var(--text-primary)] font-semibold">init:</span> Production architecture setup &amp; enterprise engineering guidelines
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t flex flex-wrap gap-4 text-[11px] text-muted font-mono" style={{ borderColor: 'var(--border)' }}>
            <span className="flex items-center gap-1.5 text-[#f59e0b]">
              <Boxes size={14} /> Three.js 3D Metro Visuals
            </span>
            <span className="flex items-center gap-1.5 text-[#38bdf8]">
              <Layers size={14} /> Telecom SCADA GUI
            </span>
            <span className="flex items-center gap-1.5 text-[#22c55e]">
              <Terminal size={14} /> Modern Frontend
            </span>
          </div>
        </motion.div>

        {/* Timeline representation */}
        <div className="mt-8 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-[#2563eb] via-[#8b5cf6] to-transparent" aria-hidden="true" />
          <ol className="space-y-10">
            {experience.map((job, i) => (
              <motion.li
                key={job.company}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative pl-12"
              >
                <span
                  className="absolute left-0 top-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-lg shadow-[#2563eb]/40"
                  aria-hidden="true"
                >
                  <Briefcase size={16} />
                </span>

                <div className="card card-hover p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-mono text-xs text-muted">{job.duration}</p>
                    <span className="rounded-full bg-[#2563eb]/10 border border-[#2563eb]/30 px-2.5 py-0.5 text-xs text-[#38bdf8] font-mono">
                      {job.year}
                    </span>
                  </div>

                  <h3 className="mt-2 text-xl font-bold">{job.company}</h3>
                  <p className="text-sm text-[#38bdf8] font-semibold">{job.role}</p>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted">
                    <MapPin size={12} /> {job.location}
                  </p>

                  {job.project && (
                    <div
                      className="mt-4 rounded-xl border p-3 text-xs font-mono text-muted flex items-start gap-2"
                      style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)' }}
                    >
                      <Boxes size={16} className="text-[#f59e0b] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[#f59e0b] font-bold">Key Project &amp; Tech:</span> {job.project}
                      </div>
                    </div>
                  )}

                  <ul className="mt-5 space-y-2.5">
                    {job.responsibilities.map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm text-muted leading-relaxed">
                        <Check size={16} className="mt-0.5 text-[#22c55e] shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

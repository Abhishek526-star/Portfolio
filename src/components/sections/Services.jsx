import { motion } from 'framer-motion'
import { Layers, BrainCircuit, Sparkles, Server } from 'lucide-react'
import { services } from '../../data/profile.js'

const cardMeta = [
  { icon: Layers, color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.12)', border: 'rgba(56, 189, 248, 0.3)', tag: 'Frontend + Backend' },
  { icon: BrainCircuit, color: '#a855f7', bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.3)', tag: 'LLMs & Agents' },
  { icon: Sparkles, color: '#22c55e', bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)', tag: 'Modern UI/UX' },
  { icon: Server, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', tag: 'REST & Auth' },
]

export default function Services() {
  return (
    <section
      id="services"
      className="py-10 sm:py-14 border-y relative"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      aria-labelledby="services-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="text-xs font-mono uppercase tracking-widest text-[#2563eb] bg-[#2563eb]/10 px-3 py-1 rounded-full border border-[#2563eb]/20">
            Specialized Capabilities
          </span>
          <h2
            id="services-heading"
            className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight"
          >
            What <span className="gradient-text">I Build</span>
          </h2>
          <p className="mt-2 text-sm text-muted">
            End-to-end engineering from cloud-ready backend architectures to high-fidelity user interfaces.
          </p>
        </motion.div>

        <div className="mt-8 sm:mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => {
            const meta = cardMeta[i % cardMeta.length]
            const Icon = meta.icon
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="card card-hover p-7 flex flex-col justify-between relative group overflow-hidden"
              >
                {/* Accent top edge line */}
                <div
                  className="absolute top-0 inset-x-0 h-1 transition-all duration-300 group-hover:h-1.5"
                  style={{ backgroundColor: meta.color }}
                  aria-hidden="true"
                />

                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="inline-flex rounded-xl p-3"
                      style={{ backgroundColor: meta.bg, color: meta.color, border: `1px solid ${meta.border}` }}
                      aria-hidden="true"
                    >
                      <Icon size={22} />
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[10px] font-mono"
                      style={{ backgroundColor: meta.bg, color: meta.color }}
                    >
                      {meta.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 font-bold text-lg">{service.title}</h3>
                  <p className="mt-2 text-sm text-muted leading-relaxed">{service.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t text-[11px] font-mono text-muted flex items-center gap-1.5" style={{ borderColor: 'var(--border)' }}>
                  <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: meta.color }} />
                  <span>Production Ready</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { motion } from 'framer-motion'
import { stats } from '../../data/profile.js'

export default function QuickStats() {
  return (
    <section className="border-y" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }} aria-label="Quick statistics">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <dl className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <dt className="text-3xl font-bold gradient-text">{s.value}</dt>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  )
}

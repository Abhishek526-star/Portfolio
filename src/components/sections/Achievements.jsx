import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import { achievements } from '../../data/achievements.js'
import { isPlaceholder } from '../../utils/helpers.js'

export default function Achievements() {
  return (
    <section id="certifications" className="py-10 sm:py-14" aria-labelledby="certifications-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="certifications-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center"
        >
          Achievements & <span className="gradient-text">Certifications</span>
        </motion.h2>

        <div className="mt-8 sm:mt-10 max-w-2xl mx-auto">
          {achievements.length === 0 ? (
            <div className="card p-8 text-center text-muted" role="status">
              <Award size={36} className="mx-auto mb-3 text-[#2563eb]" aria-hidden="true" />
              <p className="font-semibold text-lg">No verified achievements added yet.</p>
              <p className="mt-2 text-sm leading-relaxed">
                Achievements and certifications will appear here once verified. To add items, configure{' '}
                <code className="font-mono text-xs text-[#2563eb]">src/data/achievements.js</code>.
              </p>
            </div>
          ) : (
            <ul className="grid gap-6 sm:grid-cols-2">
              {achievements.map((item, i) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="card card-hover p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted">{item.organization}</p>
                      <p className="text-xs text-muted mt-1">{item.date}</p>
                      <p className="mt-3 text-sm text-muted">{item.description}</p>
                    </div>
                    {!isPlaceholder(item.link) && (
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${item.title} certificate`}
                        className="text-[#2563eb] hover:text-[#1d4ed8]"
                      >
                        <ExternalLink size={16} />
                      </a>
                    )}
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

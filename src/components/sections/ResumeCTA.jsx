import { motion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'

export default function ResumeCTA() {
  return (
    <section id="resume" className="py-10 sm:py-14" aria-labelledby="resume-heading">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card p-10"
          style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(139,92,246,0.08))' }}
        >
          <h2 id="resume-heading" className="text-2xl sm:text-3xl font-bold">
            Want to know more about my <span className="gradient-text">experience?</span>
          </h2>
          <p className="mt-3 text-muted">
            Download my resume and explore my skills, projects and experience.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="/resume.pdf"
              download
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-3 text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
            >
              <Download size={16} /> Download Resume
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium hover:border-[#2563eb] hover:text-[#2563eb] transition-colors"
              style={{ borderColor: 'var(--border)' }}
            >
              <Eye size={16} /> View Resume
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

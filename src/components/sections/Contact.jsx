import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Send, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react'
import { profile } from '../../data/profile.js'
import { isPlaceholder } from '../../utils/helpers.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '', _gotcha: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required.'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!EMAIL_RE.test(form.email)) e.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) e.subject = 'Subject is required.'
    if (!form.message.trim()) e.message = 'Message is required.'
    return e
  }

  const handleChange = (field) => (e) => {
    setForm({ ...form, [field]: e.target.value })
    if (errors[field]) setErrors({ ...errors, [field]: undefined })
    if (serverError) setServerError('')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setServerError('')

    // Spam protection (honeypot trap check)
    if (form._gotcha) {
      setStatus('success')
      return
    }

    const validation = validate()
    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      return
    }

    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      })

      const data = await res.json().catch(() => ({}))

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send message via Gmail SMTP.')
      }

      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '', _gotcha: '' })
    } catch (err) {
      setStatus('error')
      setServerError(err.message || 'Something went wrong. Please check your connection or email me directly.')
    }
  }

  const inputClass = (field) =>
    `w-full rounded-lg border bg-transparent px-4 py-3 text-sm outline-none transition-colors text-[var(--text-primary)] placeholder:text-muted/60 ${
      errors[field] ? 'border-[#ef4444]' : 'focus:border-[#2563eb]'
    }`
  const borderStyle = { borderColor: 'var(--border)' }

  return (
    <section
      id="contact"
      className="py-10 sm:py-14 border-t"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}
      aria-labelledby="contact-heading"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.h2
          id="contact-heading"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-bold text-center"
        >
          Let&apos;s Build Something <span className="gradient-text">Together</span>
        </motion.h2>

        <div className="mt-8 sm:mt-10 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-6">
            <p className="text-muted leading-relaxed">
              Have a project in mind, an internship opportunity, or just want to discuss software engineering? My
              inbox is always open.
            </p>
            <ul className="space-y-4">
              <li>
                <a
                  href={isPlaceholder(profile.email) ? '#contact' : `mailto:${profile.email}`}
                  className="flex items-center gap-3 text-sm hover:text-[#2563eb] transition-colors"
                >
                  <span className="rounded-lg bg-[#2563eb]/15 p-2.5 text-[#2563eb]">
                    <Mail size={18} />
                  </span>
                  <span>{isPlaceholder(profile.email) ? 'Email (Configure in profile.js)' : profile.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={isPlaceholder(profile.github) ? '#contact' : profile.github}
                  target={isPlaceholder(profile.github) ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-[#2563eb] transition-colors"
                >
                  <span className="rounded-lg bg-[#2563eb]/15 p-2.5 text-[#2563eb]">
                    <Github size={18} />
                  </span>
                  <span>GitHub Profile</span>
                </a>
              </li>
              <li>
                <a
                  href={isPlaceholder(profile.linkedin) ? '#contact' : profile.linkedin}
                  target={isPlaceholder(profile.linkedin) ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm hover:text-[#2563eb] transition-colors"
                >
                  <span className="rounded-lg bg-[#2563eb]/15 p-2.5 text-[#2563eb]">
                    <Linkedin size={18} />
                  </span>
                  <span>LinkedIn Profile</span>
                </a>
              </li>
            </ul>

            
          </div>

          <form onSubmit={onSubmit} noValidate className="lg:col-span-3 space-y-4">
            {/* Honeypot field for spam bots (Section 21) */}
            <div className="sr-only" aria-hidden="true" style={{ display: 'none' }}>
              <label htmlFor="contact-website-gotcha">Do not fill this if human</label>
              <input
                id="contact-website-gotcha"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form._gotcha}
                onChange={handleChange('_gotcha')}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                  Your Name <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  value={form.name}
                  onChange={handleChange('name')}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  className={inputClass('name')}
                  style={borderStyle}
                  placeholder="John Doe"
                  required
                />
                {errors.name && (
                  <p id="contact-name-error" role="alert" className="mt-1 text-xs text-[#ef4444]">
                    {errors.name}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                  Your Email <span aria-hidden="true">*</span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={handleChange('email')}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  className={inputClass('email')}
                  style={borderStyle}
                  placeholder="john@example.com"
                  required
                />
                {errors.email && (
                  <p id="contact-email-error" role="alert" className="mt-1 text-xs text-[#ef4444]">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                Subject <span aria-hidden="true">*</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                value={form.subject}
                onChange={handleChange('subject')}
                aria-invalid={!!errors.subject}
                aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                className={inputClass('subject')}
                style={borderStyle}
                placeholder="Project inquiry / Opportunity"
                required
              />
              {errors.subject && (
                <p id="contact-subject-error" role="alert" className="mt-1 text-xs text-[#ef4444]">
                  {errors.subject}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-[var(--text-primary)]">
                Message <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                rows={5}
                value={form.message}
                onChange={handleChange('message')}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                className={`${inputClass('message')} resize-y`}
                style={borderStyle}
                placeholder="Tell me about your project or opportunity..."
                required
              />
              {errors.message && (
                <p id="contact-message-error" role="alert" className="mt-1 text-xs text-[#ef4444]">
                  {errors.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-6 py-3 text-sm font-medium text-white hover:bg-[#1d4ed8] disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Sending...
                </>
              ) : (
                <>
                  <Send size={16} /> Send Message
                </>
              )}
            </button>

            {status === 'success' && (
              <p
                role="status"
                className="flex items-center gap-2 rounded-lg border border-[#22c55e]/40 bg-[#22c55e]/10 px-4 py-3 text-sm text-[#22c55e]"
              >
                <CheckCircle2 size={16} /> Message sent successfully! I&apos;ll get back to you soon.
              </p>
            )}
            {status === 'error' && (
              <p
                role="alert"
                className="flex items-center gap-2 rounded-lg border border-[#ef4444]/40 bg-[#ef4444]/10 px-4 py-3 text-sm text-[#ef4444]"
              >
                <AlertCircle size={16} className="shrink-0" />
                <span>{serverError || 'Something went wrong. Please try again or email me directly.'}</span>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}

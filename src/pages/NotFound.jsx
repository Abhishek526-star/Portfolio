import { Link } from 'react-router-dom'
import { FileQuestion } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center" aria-labelledby="notfound-heading">
      <FileQuestion size={48} className="text-[#2563eb] mb-4" aria-hidden="true" />
      <h1 id="notfound-heading" className="font-mono text-6xl font-bold gradient-text">404</h1>
      <p className="mt-4 font-mono text-muted">
        &gt; Looks like you found an undocumented route.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-5 py-3 text-sm font-medium text-white hover:bg-[#1d4ed8] transition-colors"
      >
        Back to Home
      </Link>
    </section>
  )
}

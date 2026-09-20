/**
 * Checks if a value is a placeholder string like '[ADD GITHUB URL]'
 */
export function isPlaceholder(val) {
  if (!val || typeof val !== 'string') return true
  return val.trim().startsWith('[') && val.trim().endsWith(']')
}

/**
 * Formats a project title for SEO and page headers
 */
export function formatProjectTitle(title) {
  return `${title} | Abhishek Kumar Portfolio`
}

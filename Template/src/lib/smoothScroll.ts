/**
 * Scrolls to a page section by anchor href, accounting for the sticky header.
 * Falls back to window.location for non-anchor hrefs.
 */
export function scrollToSection(href: string): void {
  if (!href.startsWith('#')) {
    window.location.href = href
    return
  }

  const id = href.slice(1)
  if (!id) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    return
  }

  const el = document.getElementById(id)
  if (!el) return

  // Read actual header height so scroll offset stays correct if header height changes
  const header = document.querySelector<HTMLElement>('header[data-sticky]')
  const offset = header?.offsetHeight ?? 64

  const top = el.getBoundingClientRect().top + window.scrollY - offset
  window.scrollTo({ top, behavior: 'smooth' })
}

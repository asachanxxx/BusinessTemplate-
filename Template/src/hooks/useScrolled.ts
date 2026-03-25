import { useState, useEffect } from 'react'

/**
 * Returns true once the page has scrolled past `threshold` pixels.
 * Used by the header to transition from transparent → opaque,
 * and by BackToTop to show/hide.
 */
export function useScrolled(threshold = 64): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    handler() // run on mount
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}

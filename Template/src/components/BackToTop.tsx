import { useScrolled } from '@/hooks/useScrolled'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/lib/utils'

/**
 * Floating "back to top" button. Appears after the user scrolls 400 px down.
 */
export function BackToTop() {
  const visible = useScrolled(400)

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={cn(
        'fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center',
        'rounded-full bg-primary text-white shadow-elevated',
        'transition-all duration-300',
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  )
}

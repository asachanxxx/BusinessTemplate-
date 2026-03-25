import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/lib/smoothScroll'
import { cn } from '@/lib/utils'
import type { HeroContent } from '@/types'

interface HeroSectionProps {
  content: HeroContent
}

export function HeroSection({ content }: HeroSectionProps) {
  const {
    headline,
    subheadline,
    primaryCta,
    secondaryCta,
    slides,
    autoPlayInterval = 5000,
  } = content

  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const total = slides.length
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback(
    (index: number) => {
      setCurrent((index + total) % total)
    },
    [total]
  )

  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  // Auto-play
  useEffect(() => {
    if (paused || total <= 1) return
    timerRef.current = setTimeout(next, autoPlayInterval)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [current, paused, next, autoPlayInterval, total])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [next, prev])

  return (
    <section
      id="home"
      aria-label="Hero"
      className="relative h-screen min-h-[560px] w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Slides ──────────────────────────────────────────── */}
      {slides.map((slide, i) => (
        <div
          key={slide.imageUrl}
          aria-hidden={i !== current}
          className={cn(
            'absolute inset-0 transition-opacity duration-700',
            i === current ? 'opacity-100' : 'opacity-0'
          )}
        >
          <img
            src={slide.imageUrl}
            alt={slide.imageAlt}
            className="h-full w-full object-cover"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      {/* ── Dark overlay ────────────────────────────────────── */}
      <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

      {/* ── Content overlay ─────────────────────────────────── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
        <h1 className="mb-5 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl md:text-6xl">
          {headline}
        </h1>

        {subheadline && (
          <p className="mb-8 max-w-2xl text-lg text-white/85 sm:text-xl">
            {subheadline}
          </p>
        )}

        {/* CTA buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            onClick={() => scrollToSection(primaryCta.href)}
          >
            {primaryCta.label}
          </Button>

          {secondaryCta && (
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary"
              onClick={() => scrollToSection(secondaryCta.href)}
            >
              {secondaryCta.label}
            </Button>
          )}
        </div>
      </div>

      {/* ── Prev / Next arrows ──────────────────────────────── */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous slide"
            className="absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={next}
            aria-label="Next slide"
            className="absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* ── Dot indicators ──────────────────────────────────── */}
      {total > 1 && (
        <div
          role="tablist"
          aria-label="Slide indicators"
          className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-2"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === current}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                'h-2.5 rounded-full transition-all duration-300',
                i === current
                  ? 'w-7 bg-white'
                  : 'w-2.5 bg-white/50 hover:bg-white/75'
              )}
            />
          ))}
        </div>
      )}
    </section>
  )
}

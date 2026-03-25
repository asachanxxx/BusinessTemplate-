import { useState, useEffect, useCallback, useRef } from 'react'
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Container } from '@/components/Container'
import { cn } from '@/lib/utils'
import type { TestimonialsContent } from '@/types'

interface TestimonialsSectionProps {
  content: TestimonialsContent
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            'h-4 w-4',
            i < rating ? 'fill-accent text-accent' : 'fill-border text-border'
          )}
        />
      ))}
    </div>
  )
}

export function TestimonialsSection({ content }: TestimonialsSectionProps) {
  const { sectionTitle, sectionSubtitle, items, autoPlayInterval = 4000 } = content
  const total = items.length
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const goTo = useCallback(
    (index: number) => setCurrent((index + total) % total),
    [total]
  )
  const next = useCallback(() => goTo(current + 1), [current, goTo])
  const prev = useCallback(() => goTo(current - 1), [current, goTo])

  useEffect(() => {
    if (paused || total <= 1) return
    timerRef.current = setTimeout(next, autoPlayInterval)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, paused, next, autoPlayInterval, total])

  if (total === 0) return null

  return (
    <section id="testimonials" className="bg-bg-alt py-20">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        {/* Slider */}
        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Cards track */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {items.map((item) => (
                <div
                  key={item.id}
                  className="w-full flex-shrink-0 px-2 sm:px-4"
                  aria-hidden={items[current].id !== item.id}
                >
                  <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-bg p-8 shadow-card">
                    {/* Quote icon */}
                    <Quote className="mb-4 h-8 w-8 text-primary/30" aria-hidden="true" />

                    {/* Rating */}
                    {item.rating !== undefined && (
                      <div className="mb-4">
                        <StarRating rating={item.rating} />
                      </div>
                    )}

                    {/* Quote text */}
                    <blockquote className="mb-6 text-lg leading-relaxed text-text">
                      &ldquo;{item.quote}&rdquo;
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4">
                      {item.photoUrl && (
                        <img
                          src={item.photoUrl}
                          alt={item.name}
                          className="h-12 w-12 rounded-full object-cover"
                          loading="lazy"
                        />
                      )}
                      <div>
                        <p className="font-semibold text-text">{item.name}</p>
                        {item.role && (
                          <p className="text-sm text-text-muted">{item.role}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows */}
          {total > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="absolute -left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg shadow-card transition-colors hover:bg-primary hover:text-white hover:border-primary"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="absolute -right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg shadow-card transition-colors hover:bg-primary hover:text-white hover:border-primary"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        {/* Dots */}
        {total > 1 && (
          <div
            role="tablist"
            aria-label="Testimonial indicators"
            className="mt-8 flex justify-center gap-2"
          >
            {items.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => goTo(i)}
                className={cn(
                  'h-2.5 rounded-full transition-all duration-300',
                  i === current ? 'w-7 bg-primary' : 'w-2.5 bg-border hover:bg-primary/50'
                )}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

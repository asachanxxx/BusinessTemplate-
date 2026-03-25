import { useState, useCallback, useEffect } from 'react'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { Container } from '@/components/Container'
import { cn } from '@/lib/utils'
import type { GalleryContent } from '@/types'

interface GallerySectionProps {
  content: GalleryContent
}

export function GallerySection({ content }: GallerySectionProps) {
  const { sectionTitle, sectionSubtitle, items, mode = 'grid' } = content
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const close = useCallback(() => setLightboxIndex(null), [])
  const total = items.length

  const showPrev = useCallback(
    () => setLightboxIndex((i) => (i != null ? (i - 1 + total) % total : 0)),
    [total]
  )
  const showNext = useCallback(
    () => setLightboxIndex((i) => (i != null ? (i + 1) % total : 0)),
    [total]
  )

  useEffect(() => {
    if (lightboxIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') showPrev()
      if (e.key === 'ArrowRight') showNext()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [lightboxIndex, close, showPrev, showNext])

  if (items.length === 0) return null

  const activeItem = lightboxIndex !== null ? items[lightboxIndex] : null

  return (
    <section id="gallery" className="bg-bg py-20">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        {/* Portfolio mode: alternating image + text rows */}
        {mode === 'portfolio' ? (
          <div className="flex flex-col gap-16">
            {items.map((item, index) => (
              <div
                key={item.id}
                className={cn(
                  'flex flex-col items-center gap-8 md:flex-row',
                  index % 2 !== 0 && 'md:flex-row-reverse',
                )}
              >
                <button
                  className="w-full overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:w-1/2"
                  onClick={() => setLightboxIndex(index)}
                  aria-label={item.caption ? `View: ${item.caption}` : `View image ${index + 1}`}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.alt}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </button>
                <div className="flex flex-col md:w-1/2">
                  {item.caption && (
                    <p className="text-lg leading-relaxed text-text-muted">{item.caption}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
        /* Grid mode (default) */
        <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative aspect-square overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label={item.caption ? `View: ${item.caption}` : `View image ${index + 1}`}
            >
              <img
                src={item.imageUrl}
                alt={item.alt}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-200 group-hover:bg-black/40">
                <ZoomIn className="h-8 w-8 text-white opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
              </div>
            </button>
          ))}
        </div>
        )}
      </Container>

      {/* Lightbox */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
          onClick={close}
        >
          {/* Image container — stop propagation so clicking image doesn't close */}
          <div
            className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeItem.imageUrl}
              alt={activeItem.caption ?? ''}
              className="max-h-[80vh] max-w-full rounded-xl object-contain shadow-2xl"
            />
            {activeItem.caption && (
              <p className="mt-3 text-center text-sm text-white/80">{activeItem.caption}</p>
            )}
          </div>

          {/* Close */}
          <button
            onClick={close}
            aria-label="Close lightbox"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); showPrev() }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Next */}
          {total > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); showNext() }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/25"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Counter */}
          {total > 1 && lightboxIndex !== null && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-4 py-1 text-sm text-white">
              {lightboxIndex + 1} / {total}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

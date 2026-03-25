import { useState, useRef, useCallback } from 'react'
import { Container } from '@/components/Container'
import type { BeforeAfterContent, BeforeAfterPair } from '@/types'

interface Props {
  content: BeforeAfterContent
}

// ── Single slider ─────────────────────────────────────────────────────────
function Slider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const move = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
    setPosition(pct)
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={containerRef}
        role="slider"
        aria-label={pair.caption ?? 'Before / After comparison'}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        tabIndex={0}
        className="relative select-none overflow-hidden rounded-[--radius] bg-surface"
        style={{ aspectRatio: '4/3' }}
        onMouseMove={(e) => { if (e.buttons === 1) move(e.clientX) }}
        onTouchMove={(e) => move(e.touches[0].clientX)}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft')  setPosition((p) => Math.max(0, p - 2))
          if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 2))
        }}
      >
        {/* After image (full width, behind) */}
        <img
          src={pair.afterUrl}
          alt="After"
          className="absolute inset-0 size-full object-cover"
          loading="lazy"
        />

        {/* Before image (clipped to left portion) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${position}%` }}
        >
          <img
            src={pair.beforeUrl}
            alt="Before"
            className="absolute inset-0 size-full object-cover"
            style={{ width: `${(100 / position) * 100}%`, maxWidth: '100vw' }}
            loading="lazy"
          />
        </div>

        {/* Divider handle */}
        <div
          className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white/90 shadow-lg"
          style={{ left: `${position}%` }}
        >
          <div className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary shadow-lg">
            <svg viewBox="0 0 24 24" className="size-4 text-text-inverse" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M8 5l-5 7 5 7M16 5l5 7-5 7" />
            </svg>
          </div>
        </div>

        <span className="absolute bottom-3 left-3 rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">Before</span>
        <span className="absolute bottom-3 right-3 rounded bg-black/60 px-2 py-0.5 text-xs font-medium text-white">After</span>
      </div>

      {pair.caption && (
        <p className="text-center text-sm text-text-muted">{pair.caption}</p>
      )}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────
export function BeforeAfterSection({ content }: Props) {
  const { sectionTitle, sectionSubtitle, pairs } = content

  if (pairs.length === 0) return null

  return (
    <section id="before-after" className="bg-bg-alt py-20">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        <div
          className={
            pairs.length === 1
              ? 'mx-auto max-w-xl'
              : 'grid gap-8 sm:grid-cols-2 lg:grid-cols-3'
          }
        >
          {pairs.map((pair) => (
            <Slider key={pair.id} pair={pair} />
          ))}
        </div>
      </Container>
    </section>
  )
}

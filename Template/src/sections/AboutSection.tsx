import { Container } from '@/components/Container'
import { cn } from '@/lib/utils'
import type { AboutContent } from '@/types'

interface AboutSectionProps {
  content: AboutContent
}

export function AboutSection({ content }: AboutSectionProps) {
  const {
    sectionTitle,
    sectionSubtitle,
    body,
    imageUrl,
    imageAlt,
    imagePosition = 'right',
    stats,
  } = content

  const imgFirst = imagePosition === 'left'

  return (
    <section id="about" className="bg-bg-alt py-20">
      <Container>
        {/* ── Text + Image row ─────────────────────────────── */}
        <div
          className={cn(
            'flex flex-col items-center gap-12 lg:flex-row',
            imgFirst && 'lg:flex-row-reverse'
          )}
        >
          {/* Text column */}
          <div className="flex-1">
            {sectionSubtitle && (
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
                {sectionSubtitle}
              </p>
            )}
            <h2 className="mb-5 text-3xl font-bold text-text sm:text-4xl">
              {sectionTitle}
            </h2>
            <p className="text-base leading-relaxed text-text-muted">
              {body}
            </p>

            {/* Stats row — shown inline on desktop, below text */}
            {stats && stats.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:hidden">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-3xl font-bold text-primary">{stat.value}</p>
                    <p className="mt-1 text-xs text-text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Image column */}
          <div className="w-full flex-1 lg:max-w-[520px]">
            <div className="relative overflow-hidden rounded-2xl shadow-elevated">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="h-auto w-full object-cover"
                loading="lazy"
              />
              {/* Accent border flourish */}
              <div
                aria-hidden="true"
                className={cn(
                  'absolute -bottom-3 h-16 w-16 rounded-full bg-primary/20',
                  imgFirst ? '-left-3' : '-right-3'
                )}
              />
              <div
                aria-hidden="true"
                className={cn(
                  'absolute -top-3 h-10 w-10 rounded-full bg-accent/30',
                  imgFirst ? '-right-3' : '-left-3'
                )}
              />
            </div>
          </div>
        </div>

        {/* ── Stats row — shown only on lg+ under the main row ─ */}
        {stats && stats.length > 0 && (
          <div className="mt-14 hidden lg:grid lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-border bg-bg p-6 text-center shadow-card"
              >
                <p className="text-4xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1.5 text-sm text-text-muted">{stat.label}</p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}

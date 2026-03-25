import { getLucideIcon } from '@/lib/getLucideIcon'
import { scrollToSection } from '@/lib/smoothScroll'
import { Container } from '@/components/Container'
import { cn } from '@/lib/utils'
import type { ServicesContent, ServiceItem, ServicesVariant } from '@/types'

interface ServicesSectionProps {
  content: ServicesContent
}

// ── Variant: services (default) ──────────────────────────────────────────────
function ServiceCard({ item }: { item: ServiceItem }) {
  const Icon = getLucideIcon(item.icon ?? 'Circle')
  return (
    <div
      className={cn(
        'group flex flex-col rounded-xl border border-border bg-bg p-7',
        'shadow-card transition-all duration-300',
        'hover:-translate-y-1 hover:shadow-elevated hover:border-primary/30',
        item.href && 'cursor-pointer',
      )}
      onClick={() => item.href && scrollToSection(item.href)}
      role={item.href ? 'button' : undefined}
      tabIndex={item.href ? 0 : undefined}
      onKeyDown={(e) => {
        if (item.href && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          scrollToSection(item.href)
        }
      }}
    >
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="mb-2 text-xl font-semibold text-text">{item.title}</h3>
      <p className="flex-1 text-sm leading-relaxed text-text-muted">{item.description}</p>
      {item.href && (
        <p className="mt-4 text-sm font-medium text-primary opacity-0 transition-opacity group-hover:opacity-100">
          Learn more &rarr;
        </p>
      )}
    </div>
  )
}

// ── Variant: courses ─────────────────────────────────────────────────────────
const LEVEL_COLORS = {
  beginner:     'bg-green-100 text-green-800',
  intermediate: 'bg-yellow-100 text-yellow-800',
  advanced:     'bg-red-100 text-red-800',
}

function CourseCard({ item }: { item: ServiceItem }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-bg shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-elevated">
      {item.imageUrl && (
        <div className="aspect-video overflow-hidden">
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex flex-wrap items-center gap-2">
          {item.level && (
            <span className={cn('rounded-full px-2 py-0.5 text-xs font-medium capitalize', LEVEL_COLORS[item.level])}>
              {item.level}
            </span>
          )}
          {item.duration && <span className="text-xs text-text-muted">{item.duration}</span>}
        </div>
        <h3 className="mb-1 text-lg font-semibold text-text">{item.title}</h3>
        <p className="flex-1 text-sm leading-relaxed text-text-muted">{item.description}</p>
        {item.price && <p className="mt-3 font-semibold text-primary">{item.price}</p>}
        {item.href && (
          <a href={item.href} className="mt-3 text-sm font-medium text-primary hover:underline">
            Enroll &rarr;
          </a>
        )}
      </div>
    </div>
  )
}

// ── Variant: rooms ────────────────────────────────────────────────────────────
function RoomCard({ item }: { item: ServiceItem }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-bg shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
      {item.imageUrl && (
        <div className="aspect-[4/3] overflow-hidden">
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-semibold text-text">{item.title}</h3>
          {item.price && <span className="shrink-0 font-bold text-primary">{item.price}</span>}
        </div>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-text-muted">{item.description}</p>
        {item.tags && item.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {item.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border px-2 py-0.5 text-xs text-text-muted">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ── Variant: products ─────────────────────────────────────────────────────────
function ProductCard({ item }: { item: ServiceItem }) {
  return (
    <div className="group flex flex-col overflow-hidden rounded-xl border border-border bg-bg shadow-card transition-all hover:-translate-y-1 hover:shadow-elevated">
      {item.imageUrl && (
        <div className="aspect-square overflow-hidden">
          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
        </div>
      )}
      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-sm font-semibold text-text">{item.title}</h3>
        <p className="mt-0.5 flex-1 text-xs leading-relaxed text-text-muted">{item.description}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          {item.price && <span className="font-bold text-primary">{item.price}</span>}
          {item.href && (
            <a href={item.href} className="rounded-full bg-primary px-3 py-1 text-xs font-medium text-text-inverse transition-colors hover:bg-primary-dark">
              View
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

// ── Card dispatcher ───────────────────────────────────────────────────────────
function ItemCard({ item, variant }: { item: ServiceItem; variant: ServicesVariant }) {
  switch (variant) {
    case 'courses':  return <CourseCard  item={item} />
    case 'rooms':    return <RoomCard    item={item} />
    case 'products': return <ProductCard item={item} />
    default:         return <ServiceCard item={item} />
  }
}

export function ServicesSection({ content }: ServicesSectionProps) {
  const { sectionTitle, sectionSubtitle, items, variant = 'services' } = content

  return (
    <section id="services" className="bg-bg py-20">
      <Container>
        {/* Section header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">
            {sectionTitle}
          </h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">
              {sectionSubtitle}
            </p>
          )}
        </div>

        {/* Cards grid */}
        <div
          className={cn(
            'grid gap-6',
            items.length === 1 && 'mx-auto max-w-md grid-cols-1',
            items.length === 2 && 'sm:grid-cols-2',
            items.length >= 3 && 'sm:grid-cols-2 lg:grid-cols-3',
          )}
        >
          {items.map((item) => (
            <ItemCard key={item.id} item={item} variant={variant} />
          ))}
        </div>
      </Container>
    </section>
  )
}

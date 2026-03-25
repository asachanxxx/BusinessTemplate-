import { Container } from '@/components/Container'
import type { PartnersContent } from '@/types'

interface PartnersSectionProps {
  content: PartnersContent
}

export function PartnersSection({ content }: PartnersSectionProps) {
  const { sectionTitle, items } = content

  if (items.length === 0) return null

  return (
    <section id="partners" className="bg-bg py-16">
      <Container>
        {/* Header */}
        {sectionTitle && (
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-text">{sectionTitle}</h2>
          </div>
        )}

        {/* Logo strip */}
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {items.map((partner) => {
            const inner = (
              <img
                src={partner.logoUrl}
                alt={partner.name}
                className="h-10 max-w-[140px] object-contain opacity-50 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
                loading="lazy"
              />
            )

            return partner.href ? (
              <a
                key={partner.id}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={partner.name}
                className="flex items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
              >
                {inner}
              </a>
            ) : (
              <div key={partner.id} className="flex items-center">
                {inner}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

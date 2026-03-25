import { useState } from 'react'
import { Container } from '@/components/Container'
import type { MenuContent, MenuDietaryTag } from '@/types'
import { cn } from '@/lib/utils'

interface Props {
  content: MenuContent
}

const DIETARY_LABELS: Record<MenuDietaryTag, { label: string; color: string }> = {
  vegan:       { label: 'Vegan',        color: 'bg-green-100 text-green-800' },
  vegetarian:  { label: 'Veg',          color: 'bg-lime-100 text-lime-800' },
  glutenFree:  { label: 'GF',           color: 'bg-yellow-100 text-yellow-800' },
  dairy:       { label: 'Dairy-free',   color: 'bg-orange-100 text-orange-800' },
  spicy:       { label: '🌶 Spicy',     color: 'bg-red-100 text-red-800' },
  nuts:        { label: 'Contains Nuts',color: 'bg-amber-100 text-amber-800' },
}

export function MenuSection({ content }: Props) {
  const { sectionTitle, sectionSubtitle, categories } = content
  const [activeCategory, setActiveCategory] = useState<string>(categories[0]?.id ?? '')

  const category = categories.find((c) => c.id === activeCategory)

  if (categories.length === 0) return null

  return (
    <section id="menu" className="bg-bg py-20">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        {/* Category tabs */}
        <div
          role="tablist"
          aria-label="Menu categories"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={cat.id === activeCategory}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'rounded-[--radius] border px-5 py-2 text-sm font-medium transition-colors',
                cat.id === activeCategory
                  ? 'border-primary bg-primary text-text-inverse'
                  : 'border-border bg-surface text-text hover:border-primary hover:text-primary',
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Items */}
        {category && (
          <ul className="mx-auto max-w-3xl divide-y divide-border">
            {category.items.map((item) => (
              <li key={item.id} className="flex gap-4 py-5">
                {item.imageUrl && (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="size-20 shrink-0 rounded-[--radius] object-cover"
                    loading="lazy"
                  />
                )}

                <div className="flex flex-1 flex-col gap-1">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <h3 className="text-base font-semibold text-text">{item.name}</h3>
                    <span className="shrink-0 font-semibold text-primary">{item.price}</span>
                  </div>

                  {item.description && (
                    <p className="text-sm leading-relaxed text-text-muted">{item.description}</p>
                  )}

                  {item.tags && item.tags.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                      {item.tags.map((tag) => {
                        const meta = DIETARY_LABELS[tag]
                        return meta ? (
                          <span
                            key={tag}
                            className={cn('rounded-full px-2 py-0.5 text-xs font-medium', meta.color)}
                          >
                            {meta.label}
                          </span>
                        ) : null
                      })}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </section>
  )
}

import { Check, X } from 'lucide-react'
import { Container } from '@/components/Container'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { PricingContent } from '@/types'

interface PricingSectionProps {
  content: PricingContent
}

export function PricingSection({ content }: PricingSectionProps) {
  const { sectionTitle, sectionSubtitle, plans } = content

  if (plans.length === 0) return null

  return (
    <section id="pricing" className="bg-bg py-20">
      <Container>
        {/* Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-3xl font-bold text-text sm:text-4xl">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="mx-auto max-w-2xl text-lg text-text-muted">{sectionSubtitle}</p>
          )}
        </div>

        {/* Cards */}
        <div
          className={cn(
            'mx-auto grid max-w-5xl gap-8',
            plans.length === 1 && 'max-w-sm',
            plans.length === 2 && 'sm:grid-cols-2',
            plans.length >= 3 && 'md:grid-cols-3'
          )}
        >
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                'relative flex flex-col rounded-2xl border p-8 transition-shadow duration-200 hover:shadow-lg',
                plan.featured
                  ? 'border-primary bg-primary text-white ring-2 ring-primary ring-offset-2 ring-offset-bg shadow-lg scale-[1.02]'
                  : 'border-border bg-bg-alt text-text'
              )}
            >


              {/* Plan name */}
              <h3 className={cn(
                'mb-1 text-xl font-bold',
                plan.featured ? 'text-white' : 'text-text'
              )}>
                {plan.name}
              </h3>

              {/* Description */}
              {plan.description && (
                <p className={cn(
                  'mb-4 text-sm',
                  plan.featured ? 'text-white/80' : 'text-text-muted'
                )}>
                  {plan.description}
                </p>
              )}

              {/* Price */}
              <div className="mb-6">
                <span className={cn(
                  'text-4xl font-extrabold',
                  plan.featured ? 'text-white' : 'text-text'
                )}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span className={cn(
                    'ml-1 text-sm',
                    plan.featured ? 'text-white/70' : 'text-text-muted'
                  )}>
                    {plan.period}
                  </span>
                )}
              </div>

              {/* Divider */}
              <div className={cn(
                'mb-6 border-t',
                plan.featured ? 'border-white/20' : 'border-border'
              )} />

              {/* Features */}
              <ul className="mb-8 flex flex-col gap-3">
                {plan.features.map((feature, fi) => (
                  <li key={fi} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check
                        className={cn(
                          'mt-0.5 h-4 w-4 flex-shrink-0',
                          plan.featured ? 'text-white' : 'text-primary'
                        )}
                        aria-hidden="true"
                      />
                    ) : (
                      <X
                        className={cn(
                          'mt-0.5 h-4 w-4 flex-shrink-0 opacity-40',
                          plan.featured ? 'text-white' : 'text-text-muted'
                        )}
                        aria-hidden="true"
                      />
                    )}
                    <span className={cn(
                      'text-sm',
                      !feature.included && 'opacity-50',
                      plan.featured ? 'text-white' : 'text-text'
                    )}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              {plan.cta?.label && (
                <div className="mt-auto">
                  <Button
                    asChild={!!plan.cta.href}
                    variant={plan.featured ? 'secondary' : 'default'}
                    className={cn(
                      'w-full',
                      plan.featured && 'bg-white text-primary hover:bg-white/90'
                    )}
                  >
                    {plan.cta.href ? (
                      <a href={plan.cta.href}>{plan.cta.label}</a>
                    ) : (
                      <span>{plan.cta.label}</span>
                    )}
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

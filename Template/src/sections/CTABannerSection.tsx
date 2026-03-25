import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/lib/smoothScroll'
import { cn } from '@/lib/utils'
import type { CTABannerContent } from '@/types'

interface CTABannerSectionProps {
  content: CTABannerContent
}

const variantStyles = {
  primary: 'bg-primary text-white',
  accent:  'bg-accent text-white',
  dark:    'bg-slate-900 text-white',
}

const btnVariantMap: Record<string, 'outline' | 'accent' | 'secondary'> = {
  primary: 'outline',
  accent:  'secondary',
  dark:    'outline',
}

export function CTABannerSection({ content }: CTABannerSectionProps) {
  const { headline, subtext, cta, variant = 'primary' } = content

  return (
    <section
      id="cta-banner"
      aria-label="Call to action"
      className={cn('w-full py-16', variantStyles[variant])}
    >
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="flex flex-col items-center justify-between gap-8 text-center md:flex-row md:text-left">

          {/* Text */}
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl md:text-4xl">
              {headline}
            </h2>
            {subtext && (
              <p className="mt-3 text-base opacity-85">
                {subtext}
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <Button
              size="lg"
              variant={btnVariantMap[variant]}
              className={cn(
                variant !== 'accent' &&
                  'border-white text-white hover:bg-white hover:text-primary'
              )}
              onClick={() => scrollToSection(cta.href)}
            >
              {cta.label}
            </Button>
          </div>

        </div>
      </div>
    </section>
  )
}

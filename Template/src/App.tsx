import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { lazy, Suspense } from 'react'
import { Layout } from '@/components/Layout'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { BackToTop } from '@/components/BackToTop'
import { SEOHead } from '@/components/SEOHead'
import { useConfig } from '@/hooks/useConfig'
import { useTheme } from '@/hooks/useTheme'
import type { SiteConfig } from '@/types'
import './index.css'

// ── Eager sections (always in the initial bundle) ──────────────────────────
import { HeroSection }         from '@/sections/HeroSection'
import { ServicesSection }     from '@/sections/ServicesSection'
import { AboutSection }        from '@/sections/AboutSection'
import { CTABannerSection }    from '@/sections/CTABannerSection'
import { TestimonialsSection } from '@/sections/TestimonialsSection'
import { GallerySection }      from '@/sections/GallerySection'
import { FAQSection }          from '@/sections/FAQSection'
import { PartnersSection }     from '@/sections/PartnersSection'
import { PricingSection }      from '@/sections/PricingSection'
import { MapSection }          from '@/sections/MapSection'
import { TeamSection }         from '@/sections/TeamSection'
import { OpeningHoursSection } from '@/sections/OpeningHoursSection'
import { ScheduleSection }     from '@/sections/ScheduleSection'

// ── Lazy sections (split out of initial bundle) ────────────────────────────
const BookingSection   = lazy(() => import('@/sections/BookingSection').then((m)   => ({ default: m.BookingSection })))
const ContactSection   = lazy(() => import('@/sections/ContactSection').then((m)   => ({ default: m.ContactSection })))
const MenuSection      = lazy(() => import('@/sections/MenuSection').then((m)      => ({ default: m.MenuSection })))
const BeforeAfterSection = lazy(() => import('@/sections/BeforeAfterSection').then((m) => ({ default: m.BeforeAfterSection })))

// ── Section registry ───────────────────────────────────────────────────────
// Maps every section key to a render function that receives the full config.
// Add new sections here — App.tsx never needs another if-branch.
type SectionRenderer = (config: SiteConfig) => React.ReactElement | null

const SECTION_REGISTRY: Record<string, SectionRenderer> = {
  hero:         (c) => <HeroSection key="hero" content={c.content.hero} />,
  services:     (c) => <ServicesSection key="services" content={c.content.services} />,
  about:        (c) => <AboutSection key="about" content={c.content.about} />,
  ctaBanner:    (c) => <CTABannerSection key="ctaBanner" content={c.content.ctaBanner} />,
  testimonials: (c) => <TestimonialsSection key="testimonials" content={c.content.testimonials} />,
  gallery:      (c) => <GallerySection key="gallery" content={c.content.gallery} />,
  faq:          (c) => <FAQSection key="faq" content={c.content.faq} />,
  partners:     (c) => <PartnersSection key="partners" content={c.content.partners} />,
  pricing:      (c) => <PricingSection key="pricing" content={c.content.pricing} />,
  map:          (c) => <MapSection key="map" contactInfo={c.business.contactInfo} />,
  team:         (c) => c.content.team
                         ? <TeamSection key="team" content={c.content.team} />
                         : null,
  openingHours: (c) => c.content.openingHours
                         ? <OpeningHoursSection key="openingHours" content={c.content.openingHours} />
                         : null,
  schedule:     (c) => c.content.schedule
                         ? <ScheduleSection key="schedule" content={c.content.schedule} />
                         : null,
  booking: (c) => (
    <Suspense key="booking" fallback={null}>
      <BookingSection content={c.content.booking} />
    </Suspense>
  ),
  contact: (c) => (
    <Suspense key="contact" fallback={null}>
      <ContactSection content={c.content.contact} business={c.business} />
    </Suspense>
  ),
  menu: (c) => c.content.menu ? (
    <Suspense key="menu" fallback={null}>
      <MenuSection content={c.content.menu} />
    </Suspense>
  ) : null,
  beforeAfter: (c) => c.content.beforeAfter ? (
    <Suspense key="beforeAfter" fallback={null}>
      <BeforeAfterSection content={c.content.beforeAfter} />
    </Suspense>
  ) : null,
}

// ── Page ───────────────────────────────────────────────────────────────────
function SinglePage() {
  const { config } = useConfig()
  useTheme(config)

  const order = config.sectionOrder ?? (Object.keys(config.sections) as Array<keyof typeof config.sections>)

  return (
    <>
      <SEOHead seo={config.seo} business={config.business} />
      {order.map((key) => {
        if (!config.sections[key]) return null
        const renderer = SECTION_REGISTRY[key]
        return renderer ? renderer(config) : null
      })}
    </>
  )
}

export default function App() {
  const { config, loading } = useConfig()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-text-muted">Loading…</span>
      </div>
    )
  }

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Layout config={config}>
          <Header config={config} />
          <Routes>
            <Route path="/" element={<SinglePage />} />
          </Routes>
          <Footer config={config} />
          <BackToTop />
        </Layout>
      </BrowserRouter>
    </HelmetProvider>
  )
}
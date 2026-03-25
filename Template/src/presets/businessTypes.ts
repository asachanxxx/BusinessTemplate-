import type { BusinessType, SectionFlags } from '@/types'

// ─── Business Type Presets ──────────────────────────────────────────────────
// Each preset defines which sections are on by default and the recommended
// rendering order. siteConfig.json can override both with sections:{} and
// sectionOrder:[].

type SectionKey = keyof SectionFlags

interface BusinessPreset {
  defaultSections: Partial<SectionFlags>
  defaultSectionOrder: SectionKey[]
}

export const BUSINESS_PRESETS: Record<BusinessType, BusinessPreset> = {
  // ── Generic ─────────────────────────────────────────────────────────────
  generic: {
    defaultSections: {
      hero: true, services: true, about: true, gallery: true,
      testimonials: true, faq: true, pricing: false, ctaBanner: true,
      partners: false, booking: true, contact: true, map: true,
      team: false, menu: false, schedule: false, openingHours: false,
      beforeAfter: false,
    },
    defaultSectionOrder: [
      'hero', 'services', 'about', 'gallery', 'testimonials',
      'faq', 'ctaBanner', 'booking', 'contact', 'map',
    ],
  },

  // ── Restaurant / Café ───────────────────────────────────────────────────
  restaurant: {
    defaultSections: {
      hero: true, services: false, about: true, gallery: true,
      testimonials: true, faq: true, pricing: false, ctaBanner: true,
      partners: false, booking: true, contact: true, map: true,
      team: false, menu: true, schedule: false, openingHours: true,
      beforeAfter: false,
    },
    defaultSectionOrder: [
      'hero', 'menu', 'openingHours', 'about', 'gallery',
      'testimonials', 'faq', 'ctaBanner', 'booking', 'contact', 'map',
    ],
  },

  // ── Salon / Barber ──────────────────────────────────────────────────────
  salon: {
    defaultSections: {
      hero: true, services: true, about: true, gallery: true,
      testimonials: true, faq: true, pricing: true, ctaBanner: true,
      partners: false, booking: true, contact: true, map: true,
      team: true, menu: false, schedule: false, openingHours: true,
      beforeAfter: true,
    },
    defaultSectionOrder: [
      'hero', 'services', 'team', 'beforeAfter', 'gallery', 'pricing',
      'testimonials', 'faq', 'openingHours', 'booking', 'contact', 'map',
    ],
  },

  // ── Gym / Fitness ───────────────────────────────────────────────────────
  gym: {
    defaultSections: {
      hero: true, services: true, about: true, gallery: true,
      testimonials: true, faq: true, pricing: true, ctaBanner: true,
      partners: true, booking: true, contact: true, map: true,
      team: true, menu: false, schedule: true, openingHours: true,
      beforeAfter: false,
    },
    defaultSectionOrder: [
      'hero', 'services', 'schedule', 'team', 'pricing', 'gallery',
      'testimonials', 'partners', 'faq', 'ctaBanner', 'openingHours',
      'booking', 'contact', 'map',
    ],
  },

  // ── Cleaning Service ────────────────────────────────────────────────────
  cleaning: {
    defaultSections: {
      hero: true, services: true, about: true, gallery: true,
      testimonials: true, faq: true, pricing: true, ctaBanner: true,
      partners: true, booking: true, contact: true, map: true,
      team: false, menu: false, schedule: false, openingHours: false,
      beforeAfter: true,
    },
    defaultSectionOrder: [
      'hero', 'services', 'about', 'beforeAfter', 'pricing', 'gallery',
      'testimonials', 'partners', 'faq', 'ctaBanner', 'booking', 'contact', 'map',
    ],
  },

  // ── Auto Service ────────────────────────────────────────────────────────
  auto: {
    defaultSections: {
      hero: true, services: true, about: true, gallery: true,
      testimonials: true, faq: true, pricing: true, ctaBanner: true,
      partners: true, booking: true, contact: true, map: true,
      team: false, menu: false, schedule: false, openingHours: true,
      beforeAfter: true,
    },
    defaultSectionOrder: [
      'hero', 'services', 'beforeAfter', 'about', 'pricing', 'gallery',
      'testimonials', 'partners', 'faq', 'openingHours', 'ctaBanner',
      'booking', 'contact', 'map',
    ],
  },

  // ── Clinic / Dental ─────────────────────────────────────────────────────
  clinic: {
    defaultSections: {
      hero: true, services: true, about: true, gallery: false,
      testimonials: true, faq: true, pricing: true, ctaBanner: true,
      partners: true, booking: true, contact: true, map: true,
      team: true, menu: false, schedule: false, openingHours: true,
      beforeAfter: false,
    },
    defaultSectionOrder: [
      'hero', 'services', 'team', 'about', 'pricing',
      'testimonials', 'partners', 'faq', 'openingHours', 'ctaBanner',
      'booking', 'contact', 'map',
    ],
  },

  // ── Photography ─────────────────────────────────────────────────────────
  photography: {
    defaultSections: {
      hero: true, services: false, about: true, gallery: true,
      testimonials: true, faq: false, pricing: true, ctaBanner: false,
      partners: false, booking: true, contact: true, map: false,
      team: false, menu: false, schedule: false, openingHours: false,
      beforeAfter: false,
    },
    defaultSectionOrder: [
      'hero', 'gallery', 'about', 'pricing',
      'testimonials', 'booking', 'contact',
    ],
  },

  // ── Coaching / Academy ──────────────────────────────────────────────────
  coaching: {
    defaultSections: {
      hero: true, services: true, about: true, gallery: false,
      testimonials: true, faq: true, pricing: true, ctaBanner: true,
      partners: false, booking: true, contact: true, map: false,
      team: true, menu: false, schedule: true, openingHours: false,
      beforeAfter: false,
    },
    defaultSectionOrder: [
      'hero', 'services', 'schedule', 'team', 'about', 'pricing',
      'testimonials', 'faq', 'ctaBanner', 'booking', 'contact',
    ],
  },

  // ── Hotel / Guesthouse ──────────────────────────────────────────────────
  hotel: {
    defaultSections: {
      hero: true, services: true, about: true, gallery: true,
      testimonials: true, faq: true, pricing: false, ctaBanner: true,
      partners: false, booking: true, contact: true, map: true,
      team: false, menu: false, schedule: false, openingHours: false,
      beforeAfter: false,
    },
    defaultSectionOrder: [
      'hero', 'services', 'about', 'gallery',
      'testimonials', 'faq', 'ctaBanner', 'booking', 'contact', 'map',
    ],
  },

  // ── Retail Shop ─────────────────────────────────────────────────────────
  retail: {
    defaultSections: {
      hero: true, services: true, about: true, gallery: true,
      testimonials: true, faq: true, pricing: false, ctaBanner: true,
      partners: true, booking: false, contact: true, map: true,
      team: false, menu: false, schedule: false, openingHours: true,
      beforeAfter: false,
    },
    defaultSectionOrder: [
      'hero', 'services', 'about', 'gallery', 'testimonials',
      'partners', 'faq', 'openingHours', 'ctaBanner', 'contact', 'map',
    ],
  },
}

/** Return the preset for a given business type, falling back to generic. */
export function getBusinessPreset(type: BusinessType): BusinessPreset {
  return BUSINESS_PRESETS[type] ?? BUSINESS_PRESETS.generic
}

import type { BusinessType, ThemeConfig } from '@/types'

// ─── Theme Presets ─────────────────────────────────────────────────────────────
// Each entry defines CSS custom property values, fonts, border-radius, and the
// overall visual style for a given business type. These are the defaults; clients
// can override any key via siteConfig.json > theme.

const INTER_URL =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap'

export const THEMES: Record<BusinessType, ThemeConfig> = {
  // ── Generic (default blue) ────────────────────────────────────────────────
  generic: {
    colors: {
      primary:       '#2563eb',
      primaryLight:  '#3b82f6',
      primaryDark:   '#1d4ed8',
      secondary:     '#7c3aed',
      secondaryLight:'#8b5cf6',
      secondaryDark: '#6d28d9',
      accent:        '#f59e0b',
      accentLight:   '#fbbf24',
      accentDark:    '#d97706',
      bg:            '#ffffff',
      bgAlt:         '#f8fafc',
      surface:       '#f1f5f9',
      border:        '#e2e8f0',
      text:          '#0f172a',
      textMuted:     '#64748b',
      textInverse:   '#ffffff',
    },
    fonts: {
      sans:    '"Inter", system-ui, sans-serif',
      heading: '"Inter", system-ui, sans-serif',
      googleFontUrl: INTER_URL,
    },
    radius: '0.5rem',
    sectionStyle: 'minimal',
  },

  // ── Restaurant / Café ─────────────────────────────────────────────────────
  restaurant: {
    colors: {
      primary:       '#c0392b',
      primaryLight:  '#e74c3c',
      primaryDark:   '#96281b',
      secondary:     '#7f5539',
      secondaryLight:'#9c6644',
      secondaryDark: '#6b3a2a',
      accent:        '#f39c12',
      accentLight:   '#f1c40f',
      accentDark:    '#d68910',
      bg:            '#fffbf5',
      bgAlt:         '#fdf3e3',
      surface:       '#f9e4c8',
      border:        '#e6ccaa',
      text:          '#1a0f00',
      textMuted:     '#7d5a3c',
      textInverse:   '#ffffff',
    },
    fonts: {
      sans:    '"Lato", system-ui, sans-serif',
      heading: '"Lora", Georgia, serif',
      googleFontUrl:
        'https://fonts.googleapis.com/css2?family=Lato:wght@400;700&family=Lora:wght@500;600;700&display=swap',
    },
    radius: '0.375rem',
    sectionStyle: 'bold',
  },

  // ── Salon / Barber ────────────────────────────────────────────────────────
  salon: {
    colors: {
      primary:       '#1c1c1c',
      primaryLight:  '#333333',
      primaryDark:   '#000000',
      secondary:     '#b8960c',
      secondaryLight:'#d4a820',
      secondaryDark: '#8c7209',
      accent:        '#c9b037',
      accentLight:   '#e0c94a',
      accentDark:    '#a89020',
      bg:            '#fafafa',
      bgAlt:         '#f4f0eb',
      surface:       '#ede8df',
      border:        '#d4c9ba',
      text:          '#1c1c1c',
      textMuted:     '#7c7062',
      textInverse:   '#ffffff',
    },
    fonts: {
      sans:    '"Raleway", system-ui, sans-serif',
      heading: '"Playfair Display", Georgia, serif',
      googleFontUrl:
        'https://fonts.googleapis.com/css2?family=Raleway:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap',
    },
    radius: '0.625rem',
    sectionStyle: 'luxury',
  },

  // ── Gym / Fitness ─────────────────────────────────────────────────────────
  gym: {
    colors: {
      primary:       '#f97316',
      primaryLight:  '#fb923c',
      primaryDark:   '#ea580c',
      secondary:     '#111111',
      secondaryLight:'#1f1f1f',
      secondaryDark: '#000000',
      accent:        '#facc15',
      accentLight:   '#fde047',
      accentDark:    '#eab308',
      bg:            '#0d0d0d',
      bgAlt:         '#161616',
      surface:       '#1f1f1f',
      border:        '#2d2d2d',
      text:          '#f5f5f5',
      textMuted:     '#9ca3af',
      textInverse:   '#0d0d0d',
    },
    fonts: {
      sans:    '"Barlow", system-ui, sans-serif',
      heading: '"Barlow Condensed", system-ui, sans-serif',
      googleFontUrl:
        'https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;700&family=Barlow+Condensed:wght@600;700;800&display=swap',
    },
    radius: '0.25rem',
    sectionStyle: 'bold',
  },

  // ── Cleaning Service ──────────────────────────────────────────────────────
  cleaning: {
    colors: {
      primary:       '#0369a1',
      primaryLight:  '#0284c7',
      primaryDark:   '#075985',
      secondary:     '#0891b2',
      secondaryLight:'#06b6d4',
      secondaryDark: '#0e7490',
      accent:        '#34d399',
      accentLight:   '#6ee7b7',
      accentDark:    '#059669',
      bg:            '#ffffff',
      bgAlt:         '#f0f9ff',
      surface:       '#e0f2fe',
      border:        '#bae6fd',
      text:          '#0c1a2e',
      textMuted:     '#4b7a9a',
      textInverse:   '#ffffff',
    },
    fonts: {
      sans:    '"Inter", system-ui, sans-serif',
      heading: '"Inter", system-ui, sans-serif',
      googleFontUrl: INTER_URL,
    },
    radius: '0.5rem',
    sectionStyle: 'minimal',
  },

  // ── Auto Service ──────────────────────────────────────────────────────────
  auto: {
    colors: {
      primary:       '#f97316',
      primaryLight:  '#fb923c',
      primaryDark:   '#c2410c',
      secondary:     '#334155',
      secondaryLight:'#475569',
      secondaryDark: '#1e293b',
      accent:        '#fbbf24',
      accentLight:   '#fcd34d',
      accentDark:    '#d97706',
      bg:            '#0f172a',
      bgAlt:         '#1e293b',
      surface:       '#293548',
      border:        '#334155',
      text:          '#f1f5f9',
      textMuted:     '#94a3b8',
      textInverse:   '#0f172a',
    },
    fonts: {
      sans:    '"Roboto Condensed", system-ui, sans-serif',
      heading: '"Roboto Condensed", system-ui, sans-serif',
      googleFontUrl:
        'https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;600;700&display=swap',
    },
    radius: '0.25rem',
    sectionStyle: 'industrial',
  },

  // ── Clinic / Dental ───────────────────────────────────────────────────────
  clinic: {
    colors: {
      primary:       '#0284c7',
      primaryLight:  '#0ea5e9',
      primaryDark:   '#0369a1',
      secondary:     '#0891b2',
      secondaryLight:'#22d3ee',
      secondaryDark: '#0e7490',
      accent:        '#10b981',
      accentLight:   '#34d399',
      accentDark:    '#059669',
      bg:            '#ffffff',
      bgAlt:         '#f0faff',
      surface:       '#e0f2ff',
      border:        '#bae6fd',
      text:          '#0c2340',
      textMuted:     '#426378',
      textInverse:   '#ffffff',
    },
    fonts: {
      sans:    '"Inter", system-ui, sans-serif',
      heading: '"Inter", system-ui, sans-serif',
      googleFontUrl: INTER_URL,
    },
    radius: '0.5rem',
    sectionStyle: 'minimal',
  },

  // ── Photography ───────────────────────────────────────────────────────────
  photography: {
    colors: {
      primary:       '#f5f5f5',
      primaryLight:  '#ffffff',
      primaryDark:   '#d4d4d4',
      secondary:     '#a3a3a3',
      secondaryLight:'#d4d4d4',
      secondaryDark: '#737373',
      accent:        '#c8a96e',
      accentLight:   '#dfc08f',
      accentDark:    '#a08040',
      bg:            '#0a0a0a',
      bgAlt:         '#111111',
      surface:       '#1a1a1a',
      border:        '#262626',
      text:          '#f5f5f5',
      textMuted:     '#a3a3a3',
      textInverse:   '#0a0a0a',
    },
    fonts: {
      sans:    '"Montserrat", system-ui, sans-serif',
      heading: '"Montserrat", system-ui, sans-serif',
      googleFontUrl:
        'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap',
    },
    radius: '0rem',
    sectionStyle: 'minimal',
  },

  // ── Coaching / Academy ────────────────────────────────────────────────────
  coaching: {
    colors: {
      primary:       '#0d9488',
      primaryLight:  '#14b8a6',
      primaryDark:   '#0f766e',
      secondary:     '#6366f1',
      secondaryLight:'#818cf8',
      secondaryDark: '#4f46e5',
      accent:        '#f59e0b',
      accentLight:   '#fbbf24',
      accentDark:    '#d97706',
      bg:            '#ffffff',
      bgAlt:         '#f0fdfa',
      surface:       '#ccfbf1',
      border:        '#99f6e4',
      text:          '#042f2e',
      textMuted:     '#3d706b',
      textInverse:   '#ffffff',
    },
    fonts: {
      sans:    '"Nunito", system-ui, sans-serif',
      heading: '"Nunito", system-ui, sans-serif',
      googleFontUrl:
        'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap',
    },
    radius: '0.625rem',
    sectionStyle: 'soft',
  },

  // ── Hotel / Guesthouse ────────────────────────────────────────────────────
  hotel: {
    colors: {
      primary:       '#c9a84c',
      primaryLight:  '#dbbe70',
      primaryDark:   '#a68730',
      secondary:     '#1a1a2e',
      secondaryLight:'#2a2a4e',
      secondaryDark: '#0f0f1c',
      accent:        '#e8d5a3',
      accentLight:   '#f0e4bf',
      accentDark:    '#c5a86a',
      bg:            '#faf8f4',
      bgAlt:         '#f2ede4',
      surface:       '#e8e0d0',
      border:        '#d4c9b0',
      text:          '#1a1410',
      textMuted:     '#6b5e4a',
      textInverse:   '#faf8f4',
    },
    fonts: {
      sans:    '"Cormorant Garamond", Georgia, serif',
      heading: '"Cormorant Garamond", Georgia, serif',
      googleFontUrl:
        'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap',
    },
    radius: '0.25rem',
    sectionStyle: 'luxury',
  },

  // ── Retail Shop ───────────────────────────────────────────────────────────
  retail: {
    colors: {
      primary:       '#6d28d9',
      primaryLight:  '#7c3aed',
      primaryDark:   '#5b21b6',
      secondary:     '#db2777',
      secondaryLight:'#ec4899',
      secondaryDark: '#be185d',
      accent:        '#f59e0b',
      accentLight:   '#fbbf24',
      accentDark:    '#d97706',
      bg:            '#ffffff',
      bgAlt:         '#faf5ff',
      surface:       '#f3e8ff',
      border:        '#e9d5ff',
      text:          '#1a0533',
      textMuted:     '#6b5080',
      textInverse:   '#ffffff',
    },
    fonts: {
      sans:    '"Inter", system-ui, sans-serif',
      heading: '"Inter", system-ui, sans-serif',
      googleFontUrl: INTER_URL,
    },
    radius: '0.5rem',
    sectionStyle: 'bold',
  },
}

import { useLayoutEffect, useRef } from 'react'
import type { SiteConfig, ThemeConfig } from '@/types'
import { THEMES } from '@/presets/themes'

// ─── useTheme ────────────────────────────────────────────────────────────────
// Reads the resolved theme from the config object and synchronously writes CSS
// custom properties to :root so components can use var(--color-primary) etc.
// useLayoutEffect (not useEffect) prevents a flash-of-unstyled-content because
// it fires before the browser paints.

function applyTheme(theme: ThemeConfig): void {
  const root = document.documentElement
  const s = root.style

  // Colors
  s.setProperty('--color-primary',        theme.colors.primary)
  s.setProperty('--color-primary-light',  theme.colors.primaryLight)
  s.setProperty('--color-primary-dark',   theme.colors.primaryDark)
  s.setProperty('--color-secondary',      theme.colors.secondary)
  s.setProperty('--color-secondary-light',theme.colors.secondaryLight)
  s.setProperty('--color-secondary-dark', theme.colors.secondaryDark)
  s.setProperty('--color-accent',         theme.colors.accent)
  s.setProperty('--color-accent-light',   theme.colors.accentLight)
  s.setProperty('--color-accent-dark',    theme.colors.accentDark)
  s.setProperty('--color-bg',             theme.colors.bg)
  s.setProperty('--color-bg-alt',         theme.colors.bgAlt)
  s.setProperty('--color-surface',        theme.colors.surface)
  s.setProperty('--color-border',         theme.colors.border)
  s.setProperty('--color-text',           theme.colors.text)
  s.setProperty('--color-text-muted',     theme.colors.textMuted)
  s.setProperty('--color-text-inverse',   theme.colors.textInverse)

  // Typography
  s.setProperty('--font-sans',    theme.fonts.sans)
  s.setProperty('--font-heading', theme.fonts.heading)

  // Radius
  s.setProperty('--radius', theme.radius)

  // Inject Google Font link tag (swap src to avoid duplicate requests)
  const FONT_LINK_ID = 'template-google-font'
  const existing = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null

  if (theme.fonts.googleFontUrl) {
    if (existing) {
      if (existing.href !== theme.fonts.googleFontUrl) {
        existing.href = theme.fonts.googleFontUrl
      }
    } else {
      const link = document.createElement('link')
      link.id   = FONT_LINK_ID
      link.rel  = 'stylesheet'
      link.href = theme.fonts.googleFontUrl
      document.head.appendChild(link)
    }
  } else if (existing) {
    existing.remove()
  }
}

export function useTheme(config: SiteConfig): void {
  const businessType = config.businessType ?? 'generic'
  const presetTheme  = THEMES[businessType] ?? THEMES.generic

  // Merge preset with any per-config overrides stored in config.theme
  const resolved: ThemeConfig = config.theme
    ? {
        colors: { ...presetTheme.colors, ...(config.theme.colors ?? {}) },
        fonts:  { ...presetTheme.fonts,  ...(config.theme.fonts  ?? {}) },
        radius: config.theme.radius  ?? presetTheme.radius,
        sectionStyle: config.theme.sectionStyle ?? presetTheme.sectionStyle,
      }
    : presetTheme

  // Track previous theme to skip unnecessary DOM writes
  const prevRef = useRef<string>('')

  useLayoutEffect(() => {
    const key = JSON.stringify(resolved)
    if (key === prevRef.current) return
    prevRef.current = key
    applyTheme(resolved)
  }, [resolved])
}

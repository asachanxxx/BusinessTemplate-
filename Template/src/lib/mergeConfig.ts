import type { SiteConfig } from '@/types'
import { getBusinessPreset } from '@/presets/businessTypes'
import { THEMES } from '@/presets/themes'

// ─── mergeConfig ────────────────────────────────────────────────────────────
// Computes the final resolved SiteConfig from three sources (lowest → highest
// priority):
//   1. Business-type preset   (defaultSections, defaultSectionOrder, preset theme)
//   2. Local siteConfig.json  (all keys the designer set)
//   3. Remote config (optional, e.g. from a CMS or API)

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

function deepMerge<T extends object>(base: T, ...overrides: Array<DeepPartial<T> | undefined>): T {
  let result = { ...base }
  for (const override of overrides) {
    if (!override) continue
    for (const key of Object.keys(override) as Array<keyof T>) {
      const val = override[key]
      if (val !== undefined && val !== null) {
        if (
          typeof val === 'object' &&
          !Array.isArray(val) &&
          typeof result[key] === 'object' &&
          !Array.isArray(result[key])
        ) {
          result = { ...result, [key]: deepMerge(result[key] as object, val as object) }
        } else {
          result = { ...result, [key]: val }
        }
      }
    }
  }
  return result
}

export function mergeConfig(
  local: SiteConfig,
  remote?: Partial<SiteConfig>,
): SiteConfig {
  const businessType = remote?.businessType ?? local.businessType ?? 'generic'
  const preset = getBusinessPreset(businessType)
  const presetTheme = THEMES[businessType]

  // Sections: preset fills gaps, then local overrides, then remote overrides
  const sections = {
    ...preset.defaultSections,
    ...local.sections,
    ...(remote?.sections ?? {}),
  } as SiteConfig['sections']

  // Section order: remote wins, then local, then preset default
  const sectionOrder =
    remote?.sectionOrder ??
    local.sectionOrder ??
    preset.defaultSectionOrder

  // Theme: deep-merge preset → local partial → remote partial
  const theme = deepMerge(
    presetTheme,
    local.theme ?? {},
    remote?.theme ?? {},
  )

  // Content: local wins, remote overrides
  const content = deepMerge(
    local.content,
    (remote?.content ?? {}) as DeepPartial<SiteConfig['content']>,
  )

  return {
    ...local,
    ...(remote ?? {}),
    businessType,
    sections,
    sectionOrder,
    theme,
    content,
  }
}

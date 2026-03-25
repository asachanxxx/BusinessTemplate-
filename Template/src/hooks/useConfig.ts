import { useState, useEffect } from 'react'
import type { SiteConfig } from '@/types'
import localConfig from '@/data/siteConfig.json'
import { mergeConfig } from '@/lib/mergeConfig'

/**
 * Loads and resolves site configuration.
 *
 * Priority (lowest → highest):
 *   1. Business-type preset (sections, order, theme defaults)
 *   2. Local siteConfig.json
 *   3. Remote JSON (if apiUrl argument or localConfig.apiConfigUrl is set)
 *
 * Usage:
 *   const { config, loading, error } = useConfig()
 *   const { config } = useConfig('https://api.example.com/config')
 */
export function useConfig(apiUrl?: string) {
  const base = localConfig as SiteConfig
  const remoteUrl = apiUrl ?? base.apiConfigUrl

  // Resolved config starts as local merged with its own business-type preset
  const [config, setConfig] = useState<SiteConfig>(() => mergeConfig(base))
  const [loading, setLoading] = useState<boolean>(!!remoteUrl)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!remoteUrl) return

    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(remoteUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Config fetch failed: ${res.status}`)
        return res.json() as Promise<Partial<SiteConfig>>
      })
      .then((remote) => {
        if (!cancelled) {
          setConfig(mergeConfig(base, remote as SiteConfig))
          setLoading(false)
        }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          const message = err instanceof Error ? err.message : 'Unknown error'
          setError(message)
          setLoading(false)
          // Keep merged local config as fallback on error
        }
      })

    return () => { cancelled = true }
  }, [remoteUrl])  // eslint-disable-line react-hooks/exhaustive-deps

  return { config, loading, error }
}

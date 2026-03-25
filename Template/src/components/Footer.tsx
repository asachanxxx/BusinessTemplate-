import { Phone, Mail, MapPin } from 'lucide-react'
import { getSocialIcon } from '@/components/ui/social-icons'
import type { SiteConfig } from '@/types'

interface FooterProps {
  config: SiteConfig
}

export function Footer({ config }: FooterProps) {
  const { business, content } = config
  const { footer } = content
  const { contactInfo, socialLinks, name, tagline, logoUrl, logoText } = business
  const year = new Date().getFullYear()

  return (
    <footer className="bg-slate-900 text-slate-300">

      {/* ── Main content ───────────────────────────────────────── */}
      <div className="mx-auto max-w-[1280px] px-6 py-14">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand column */}
          <div className="lg:col-span-1">

            {/* Logo */}
            <div className="mb-4">
              {logoUrl ? (
                <img
                  src={logoUrl}
                  alt={name}
                  className="h-9 w-auto brightness-0 invert"
                />
              ) : (
                <span className="text-xl font-bold text-white">
                  {logoText ?? name}
                </span>
              )}
            </div>

            {tagline && (
              <p className="mb-5 text-sm leading-relaxed text-slate-400">{tagline}</p>
            )}

            {/* Contact info */}
            <div className="space-y-2.5 text-sm">
              {contactInfo.phone && (
                <a
                  href={`tel:${contactInfo.phone}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 flex-shrink-0 text-primary-light" />
                  {contactInfo.phone}
                </a>
              )}
              {contactInfo.email && (
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 flex-shrink-0 text-primary-light" />
                  {contactInfo.email}
                </a>
              )}
              {contactInfo.address && (
                <p className="flex items-start gap-2">
                  <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-light" />
                  <span>{contactInfo.address}</span>
                </p>
              )}
            </div>

            {/* Social links */}
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-2.5">
                {socialLinks.map(({ platform, url }) => {
                  const Icon = getSocialIcon(platform)
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={platform}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-colors hover:bg-primary hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  )
                })}
              </div>
            )}
          </div>

          {/* Link group columns */}
          {footer.linkGroups.map((group) => (
            <div key={group.heading}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-white">
                {group.heading}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>
      </div>

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-6 py-4 sm:flex-row">

          <p className="text-xs text-slate-500">
            {footer.copyrightText ??
              `\u00A9 ${year} ${name}. All rights reserved.`}
          </p>

          {footer.legalLinks && footer.legalLinks.length > 0 && (
            <div className="flex gap-5">
              {footer.legalLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-500 transition-colors hover:text-slate-300"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

        </div>
      </div>

    </footer>
  )
}

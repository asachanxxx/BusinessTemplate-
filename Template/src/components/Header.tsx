import { useState, useEffect } from 'react'
import { useScrolled } from '@/hooks/useScrolled'
import { scrollToSection } from '@/lib/smoothScroll'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X, ChevronDown } from 'lucide-react'
import type { SiteConfig, NavItem } from '@/types'

// ─── Desktop nav item (with hover dropdown) ───────────────────────────────────

interface DesktopNavItemProps {
  item: NavItem
  opaque: boolean
  onNavClick: (href: string) => void
}

function DesktopNavItem({ item, opaque, onNavClick }: DesktopNavItemProps) {
  const hasChildren = (item.children?.length ?? 0) > 0

  const linkClass = cn(
    'text-sm font-medium px-3 py-2 rounded-md transition-colors',
    opaque
      ? 'text-text hover:text-primary hover:bg-surface'
      : 'text-white/90 hover:text-white hover:bg-white/10'
  )

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        onClick={(e) => { e.preventDefault(); onNavClick(item.href) }}
        className={linkClass}
      >
        {item.label}
      </a>
    )
  }

  return (
    <div className="relative group">
      <button className={cn(linkClass, 'flex items-center gap-1 cursor-pointer')}>
        {item.label}
        <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
      </button>

      {/* Dropdown panel — shown on hover via Tailwind group utilities */}
      <div
        className={cn(
          'absolute top-full left-0 mt-2 w-48 rounded-lg border border-border bg-bg shadow-elevated',
          'opacity-0 invisible pointer-events-none translate-y-1',
          'group-hover:opacity-100 group-hover:visible group-hover:pointer-events-auto group-hover:translate-y-0',
          'transition-all duration-200'
        )}
      >
        {item.children!.map((child) => (
          <a
            key={child.href}
            href={child.href}
            onClick={(e) => { e.preventDefault(); onNavClick(child.href) }}
            className="block px-4 py-2.5 text-sm text-text hover:text-primary hover:bg-surface first:rounded-t-lg last:rounded-b-lg transition-colors"
          >
            {child.label}
          </a>
        ))}
      </div>
    </div>
  )
}

// ─── Mobile nav item (accordion for children) ────────────────────────────────

interface MobileNavItemProps {
  item: NavItem
  onNavClick: (href: string) => void
}

function MobileNavItem({ item, onNavClick }: MobileNavItemProps) {
  const [open, setOpen] = useState(false)
  const hasChildren = (item.children?.length ?? 0) > 0

  const rowClass =
    'flex w-full items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface hover:text-primary'

  if (!hasChildren) {
    return (
      <a
        href={item.href}
        onClick={(e) => { e.preventDefault(); onNavClick(item.href) }}
        className={rowClass}
      >
        {item.label}
      </a>
    )
  }

  return (
    <div>
      <button onClick={() => setOpen((v) => !v)} className={rowClass}>
        <span>{item.label}</span>
        <ChevronDown
          className={cn('h-4 w-4 transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="ml-3 mt-1 flex flex-col border-l-2 border-border pl-3">
          {item.children!.map((child) => (
            <a
              key={child.href}
              href={child.href}
              onClick={(e) => { e.preventDefault(); onNavClick(child.href) }}
              className="block py-2 px-2 text-sm text-text-muted transition-colors hover:text-primary"
            >
              {child.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Mobile drawer ────────────────────────────────────────────────────────────

interface MobileDrawerProps {
  open: boolean
  config: SiteConfig
  onNavClick: (href: string) => void
  onClose: () => void
}

function MobileDrawer({ open, config, onNavClick, onClose }: MobileDrawerProps) {
  const { nav, business } = config

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  // Lock body scroll while drawer is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-40 bg-black/50 lg:hidden transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        )}
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed top-0 right-0 z-50 flex h-full w-72 flex-col bg-bg shadow-elevated lg:hidden',
          'transition-transform duration-300',
          open ? 'translate-x-0' : 'translate-x-full'
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-4">
          <span className="text-lg font-bold text-text">
            {business.logoText ?? business.name}
          </span>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-text transition-colors hover:bg-surface"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav links */}
        <nav
          className="flex flex-1 flex-col gap-1 overflow-y-auto p-4"
          aria-label="Mobile navigation"
        >
          {nav.items.map((item) => (
            <MobileNavItem key={item.href} item={item} onNavClick={onNavClick} />
          ))}
        </nav>

        {/* CTA */}
        <div className="border-t border-border p-4">
          <Button className="w-full" onClick={() => onNavClick(nav.ctaButton.href)}>
            {nav.ctaButton.label}
          </Button>
        </div>
      </div>
    </>
  )
}

// ─── Header ───────────────────────────────────────────────────────────────────

interface HeaderProps {
  config: SiteConfig
}

export function Header({ config }: HeaderProps) {
  const scrolled = useScrolled(20)
  const [mobileOpen, setMobileOpen] = useState(false)

  // If hero is disabled, header is always opaque (no transparent hero underneath)
  const opaque = scrolled || !config.sections.hero

  const handleNavClick = (href: string) => {
    setMobileOpen(false)
    scrollToSection(href)
  }

  return (
    <>
      <header
        data-sticky="true"
        className={cn(
          'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
          opaque
            ? 'border-b border-border bg-bg/95 shadow-card backdrop-blur-sm'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home') }}
              className="flex flex-shrink-0 items-center gap-2"
              aria-label={`${config.business.name} — home`}
            >
              {config.business.logoUrl ? (
                <img
                  src={config.business.logoUrl}
                  alt={config.business.name}
                  className="h-9 w-auto"
                />
              ) : (
                <span
                  className={cn(
                    'text-xl font-bold transition-colors',
                    opaque ? 'text-primary' : 'text-white'
                  )}
                >
                  {config.business.logoText ?? config.business.name}
                </span>
              )}
            </a>

            {/* Desktop navigation */}
            <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
              {config.nav.items.map((item) => (
                <DesktopNavItem
                  key={item.href}
                  item={item}
                  opaque={opaque}
                  onNavClick={handleNavClick}
                />
              ))}
            </nav>

            {/* Right side: CTA + hamburger */}
            <div className="flex items-center gap-3">
              <Button
                size="sm"
                className="hidden lg:inline-flex"
                onClick={() => handleNavClick(config.nav.ctaButton.href)}
              >
                {config.nav.ctaButton.label}
              </Button>

              <button
                className={cn(
                  'rounded-md p-2 transition-colors lg:hidden',
                  opaque ? 'text-text hover:bg-surface' : 'text-white hover:bg-white/10'
                )}
                onClick={() => setMobileOpen((v) => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>

          </div>
        </div>
      </header>

      <MobileDrawer
        open={mobileOpen}
        config={config}
        onNavClick={handleNavClick}
        onClose={() => setMobileOpen(false)}
      />
    </>
  )
}

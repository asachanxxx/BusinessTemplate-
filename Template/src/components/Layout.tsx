import type { SiteConfig } from '@/types'
import {
  ToastProvider,
  ToastViewport,
  Toast,
  ToastClose,
  ToastTitle,
  ToastDescription,
} from '@/components/ui/toast'
import { useToast } from '@/hooks/useToast'

interface LayoutProps {
  config: SiteConfig
  children: React.ReactNode
}

/**
 * Root layout wrapper.
 * - Provides the Toast provider so any section can trigger notifications.
 * - Renders children (Header + Sections + Footer) in order.
 * - Slots are assembled in App.tsx so sections can be toggled via config.
 */
export function Layout({ children }: LayoutProps) {
  const { toasts, dismiss } = useToast()

  return (
    <ToastProvider>
      <div className="flex min-h-screen flex-col">
        {children}
      </div>

      {/* Toast viewport — rendered at the end of the DOM tree */}
      <ToastViewport />
      {toasts.map((t) => (
        <Toast key={t.id} open={t.open} variant={t.variant} onOpenChange={(open) => { if (!open) dismiss(t.id) }}>
          <div className="grid gap-1">
            <ToastTitle>{t.title}</ToastTitle>
            {t.description && <ToastDescription>{t.description}</ToastDescription>}
          </div>
          <ToastClose />
        </Toast>
      ))}
    </ToastProvider>
  )
}

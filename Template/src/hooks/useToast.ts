import { useState, useCallback } from 'react'
import type { ToastVariant } from '@/components/ui/toast'

interface ToastMessage {
  id: string
  title: string
  description?: string
  variant?: ToastVariant
  open: boolean
}

let counter = 0

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const toast = useCallback(
    ({
      title,
      description,
      variant = 'default',
    }: {
      title: string
      description?: string
      variant?: ToastVariant
    }) => {
      const id = `toast-${++counter}`
      setToasts((prev) => [...prev, { id, title, description, variant, open: true }])

      // Auto-remove after 4 s
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, 4000)
    },
    []
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { toasts, toast, dismiss }
}

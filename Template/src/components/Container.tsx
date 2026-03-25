import { cn } from '@/lib/utils'

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** When true the inner max-width box is removed — useful for full-bleed sections */
  fluid?: boolean
}

/**
 * Responsive container. Default: max-w-7xl centered with horizontal padding.
 * Pass `fluid` to remove the max-width constraint (edge-to-edge inner content).
 */
export function Container({ className, fluid = false, children, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'w-full px-6',
        !fluid && 'mx-auto max-w-[1280px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

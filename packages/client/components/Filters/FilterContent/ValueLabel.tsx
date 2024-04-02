import { cn } from '@/lib/utils'
import { PropsWithChildren } from 'react'

interface ValueLabelProps extends PropsWithChildren {
  className?: string
}

export function ValueLabel({ children, className }: ValueLabelProps) {
  return <div className={cn('text-xs truncate', className)}>{children}</div>
}

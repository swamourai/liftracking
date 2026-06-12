// src/components/ui/Card.tsx

import type {
  HTMLAttributes,
} from 'react'

import { cn } from '@/lib/cn'

type Props =
  HTMLAttributes<HTMLDivElement>

export function Card({
  className,

  ...props
}: Props) {
  return (
    <div
      className={cn(
        `
          rounded-(--radius-card)

          bg-(--color-surface)

          p-(--space-card)

          shadow-sm
        `,
        className,
      )}
      {...props}
    />
  )
}
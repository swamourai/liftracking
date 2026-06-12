// src/components/ui/Textarea.tsx

import type {
  TextareaHTMLAttributes,
} from 'react'

import { cn } from '@/lib/cn'

type Props =
  TextareaHTMLAttributes<HTMLTextAreaElement>

export function Textarea({
  className,

  ...props
}: Props) {
  return (
    <textarea
      className={cn(
        `
          min-h-35
          w-full

          resize-none

          rounded-(--radius-card)

          border-none

          bg-(--color-surface-muted)

          p-(--space-card)

          text-(--color-text)

          outline-none
        `,
        className,
      )}
      {...props}
    />
  )
}
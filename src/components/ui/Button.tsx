// src/components/ui/Button.tsx

import type {
  ButtonHTMLAttributes,
} from 'react'

import { cn } from '@/lib/cn'

interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
  | 'primary'
  | 'secondary'
  | 'danger'
  | 'ghost'

  size?:
  | 'sm'
  | 'md'
  | 'lg'

  fullWidth?: boolean

  active?: boolean
}

export function Button({
  children,

  className,

  variant = 'primary',

  size = 'md',

  fullWidth = false,

  active = false,

  ...props
}: Props) {
  return (
    <button
      className={cn(
        `
          flex items-center
          justify-center

          font-semibold

          transition-all

          active:scale-[0.98]
        `,

        // variants

        {
          'bg-(--color-primary) text-white':
            variant ===
            'primary',

          'bg-(--color-surface-muted) text-(--color-text)':
            variant ===
            'secondary',

          'bg-(--color-danger) text-white':
            variant ===
            'danger',

          'bg-transparent text-(--color-text)':
            variant === 'ghost',
        },

        // sizes

        {
          'h-12 rounded-2xl px-4 text-sm':
            size === 'sm',

          'h-12 rounded-3xl px-5 text-sm':
            size === 'md',

          'h-12 rounded-4xl px-6 text-base':
            size === 'lg',
        },

        // states

        {
          'w-full': fullWidth,

          'bg-(--color-primary) text-white':
            active,
        },

        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
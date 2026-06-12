// components/ui/BottomSheet.tsx

import { createPortal } from 'react-dom'

import type { ReactNode } from 'react'

interface Props {
  children: ReactNode

  onClose: () => void

  className?: string

  zIndex?: number
}

export function BottomSheet({
  children,
  onClose,
  className,
  zIndex = 300,
}: Props) {
  return createPortal(
    <div
      className="fixed inset-0 flex items-end bg-black/30 backdrop-blur-sm"
      style={{ zIndex }}
      onClick={onClose}
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        }
        className={`
          w-full

          rounded-t-[40px]

          bg-(--color-surface)

          ${className ?? ''}
        `}
      >
        <div
          className="mx-auto mt-3 h-1.5 w-14 rounded-full bg-(--color-border-soft) mb-4"
        />

        {children}
      </div>
    </div>,
    document.body,
  )
}
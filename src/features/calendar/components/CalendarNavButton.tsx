import type { ReactNode } from 'react'

interface Props {
  onClick: () => void

  children: ReactNode

  size?: 'md' | 'lg'
}

export function CalendarNavButton({
  onClick,
  children,
  size = 'md',
}: Props) {
  const isLarge =
    size === 'lg'

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex
        items-center
        justify-center

        ${isLarge
          ? 'h-18 rounded-3xl bg-(--color-surface) shadow-sm w-full'
          : 'h-12 w-12 rounded-full bg-transparent'
        }
      `}
    >
      {children}
    </button>
  )
}

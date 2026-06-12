interface Props {
  children: string

  onClick?: () => void

  href?: string

  danger?: boolean
}

export function TextAction({
  children,
  onClick,
  danger = false,
}: Props) {
  return (
    <div
      className="mt-6 border-t border-black/5 pt-6"
    >
      <button
        onClick={onClick}
        className={`
          w-full

          text-center

          text-sm
          font-medium

          transition-colors

          ${danger
            ? `
                text-(--color-danger)

                hover:text-(--color-danger-text)
              `
            : `
                text-(--color-text-muted)

                hover:text-(--color-text)
              `
          }
        `}
      >
        {children}
      </button>
    </div>
  )
}
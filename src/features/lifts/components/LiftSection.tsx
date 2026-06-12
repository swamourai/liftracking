import type { ReactNode } from 'react'

interface Props {
  title: string

  children: ReactNode
}

export function LiftSection({
  title,
  children,
}: Props) {
  return (
    <div className="mt-6">
      <p
        className="mb-3 text-sm font-semibold uppercase tracking-wide text-(--color-text-muted)"
      >
        {title}
      </p>

      {children}
    </div>
  )
}
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export function LiftSheet({
  children,
}: Props) {
  return (
    <div className="px-5">
      <div
        className="relative z-20 -mt-10 rounded-[40px] bg-white px-5 py-6"
      >
        {children}
      </div>
    </div>
  )
}
import {
  liftImages,
} from '@/features/lifts/liftAssets'

import type { LiftType } from '@/types/lift'

interface Props {
  type: LiftType
}

export function LiftHero({
  type,
}: Props) {
  return (
    <div
      className="relative overflow-hidden bg-linear-to-b from-(--color-primary-soft) via-(--color-surface-tint) to-(--color-bg)"
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.5),transparent_40%)]"
      />

      <img
        src={liftImages[type]}
        alt={type}
        className="relative z-10 h-80 w-full object-cover"
      />
    </div>
  )
}
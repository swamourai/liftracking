import { liftImages, liftLabels } from '@/features/lifts/liftAssets'

import type { Lift } from '@/types/lift'

interface Props {
  lift: Lift
}

export function LiftCard({ lift }: Props) {
  return (
    <div
      className="group relative overflow-hidden rounded-3xl bg-white/80 p-4 shadow-sm backdrop-blur-sm"
    >
      <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-(--color-surface-tint)" />

      <img
        src={liftImages[lift.type]}
        alt={lift.type}
        className="relative z-10 mx-auto h-36 object-contain transition-transform duration-300 group-hover:scale-105"
      />

      <div className="relative z-10 mt-2">
        <h3 className="text-lg font-bold">
          {liftLabels[lift.type]}
        </h3>

        <p className="text-sm text-(--color-text-muted)">
          {lift.weight} KG
        </p>

        <p className="mt-2 text-sm text-(--color-text-muted)">
          {lift.series} sets × {lift.reps} reps
        </p>
      </div>
    </div>
  )
}
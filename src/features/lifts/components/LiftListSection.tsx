import { LiftListItem } from '@/components/cards/LiftListItem'

import type { Lift } from '@/types/lift'

interface Props {
  title: string

  lifts: Lift[]

  emptyMessage?: string
}

export function LiftListSection({
  title,
  lifts,
  emptyMessage = 'Aucun lift pour le moment',
}: Props) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2
          className="text-2xl font-bold text-(--color-text)"
        >
          {title}
        </h2>

        <p
          className="text-sm font-medium text-(--color-primary)"
        >
          {lifts.length} séances
        </p>
      </div>

      {lifts.length > 0 ? (
        <div
          className="overflow-hidden rounded-[20px] bg-white/80 shadow-sm backdrop-blur-sm"
        >
          {lifts.map((lift) => (
            <LiftListItem
              key={lift.id}
              lift={lift}
            />
          ))}
        </div>
      ) : (
        <div
          className="empty-state-card flex items-center justify-center bg-white/80 text-center shadow-sm"
        >
          <p className="text-(--color-text-muted)">
            {emptyMessage}
          </p>
        </div>
      )}
    </section>
  )
}

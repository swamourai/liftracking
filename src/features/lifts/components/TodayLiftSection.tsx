import { useNavigate } from 'react-router-dom'

import { CirclePlus } from 'lucide-react'

import { LiftListItem } from '@/components/cards/LiftListItem'

import type { Lift } from '@/types/lift'

interface Props {
  lifts: Lift[]
}

export function TodayLiftSection({
  lifts,
}: Props) {
  const navigate = useNavigate()

  return (
    <section className="space-y-4 mb-5">
      <div className="flex items-center justify-between">
        <h2
          className="text-2xl font-bold text-(--color-text)"
        >
          Lifts du jour
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
          <p
            className="text-sm leading-relaxed text-(--color-text-muted)"
          >
            Aucun lift enregistré aujourd’hui.
          </p>
        </div>
      )}

      <button
        onClick={() =>
          navigate('/add')
        }
        className="control-icon-lg flex w-full items-center justify-center gap-3 rounded-3xl bg-(--color-primary) px-5 text-white transition-all active:scale-[0.98]"
      >
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full"
        >
          <CirclePlus
            size={34}
            strokeWidth={2.5}
          />
        </div>

        <div className="text-left">
          <p className="text-lg font-semibold">
            Ajouter un lift
          </p>

          <p className="text-sm text-white/70">
            Suivre ta séance du jour
          </p>
        </div>
      </button>
    </section>
  )
}

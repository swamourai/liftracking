import {
  liftLabels,
} from '@/features/lifts/liftAssets'

import { SetTypeBadge } from './SetTypeBadge'

import type { LiftType } from '@/types/lift'

import type { SetType } from '@/features/lifts/constants/setTypes'
import { LiftBadge } from './LiftBadge'
import { getRpeColor } from '@/features/lifts/utils/getRpeColor'

interface Props {
  type: LiftType

  setType?: SetType

  date?: string

  rpe?: number

  done?: boolean
}

export function LiftHeader({
  type,
  setType,
  date,
  rpe,
  done,
}: Props) {
  return (
    <div
      className="flex items-start justify-between gap-3"
    >
      <div>
        <div
          className="flex flex-wrap items-center gap-2"
        >
          <h2
            className="text-xl font-bold text-(--color-text)"
          >
            {liftLabels[type]}
          </h2>

          {typeof rpe === 'number' && (
            <LiftBadge
              color={getRpeColor(rpe)}
            >
              RPE {rpe}
            </LiftBadge>
          )}

          <SetTypeBadge
            type={setType}
          />
        </div>

        {date && (
          <p
            className="mt-2 text-(--color-text-muted)"
          >
            {date}
          </p>
        )}
      </div>

      {done !== undefined && (
        <LiftBadge
          color={
            done
              ? 'green'
              : 'orange'
          }
        >
          {done
            ? 'Terminé'
            : 'En attente'}
        </LiftBadge>
      )}
    </div>
  )
}

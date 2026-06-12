import { useNavigate } from 'react-router-dom'

import {
  liftImages,
  liftLabels,
} from '@/features/lifts/liftAssets'

import { SetTypeBadge } from '@/features/lifts/components/SetTypeBadge'

import type { Lift } from '@/types/lift'
import { LiftBadge } from '@/features/lifts/components/LiftBadge'
import { getRpeColor } from '@/features/lifts/utils/getRpeColor'

interface Props {
  lift: Lift
}

export function LiftListItem({
  lift,
}: Props) {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      onClick={() =>
        navigate(
          `/lifts/${lift.id}`,
        )
      }
      className="flex w-full items-center justify-between border-b border-black/5 px-4 py-3 text-left transition-colors hover:bg-black/[0.02] active:bg-black/[0.04]"
    >
      <div
        className="flex min-w-0 items-center gap-3"
      >
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--color-surface-tint)"
        >
          <img
            src={
              liftImages[
              lift.type
              ]
            }
            alt={lift.type}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h3
            className="truncate text-base font-semibold text-(--color-text)"
          >
            {
              liftLabels[
              lift.type
              ]
            }
          </h3>

          <div
            className="mt-1 flex flex-wrap items-center gap-2"
          >
            <span
              className="text-sm text-(--color-text-muted)"
            >
              {lift.series} ×{' '}
              {lift.reps}
              {' @ '}
              {lift.weight}kg
            </span>

            {typeof lift.rpe === 'number' && (
              <LiftBadge
                size="sm"
                color={getRpeColor(
                  lift.rpe,
                )}
              >
                RPE {lift.rpe}
              </LiftBadge>
            )}

            <SetTypeBadge
              type={lift.setType}
            />
          </div>
        </div>
      </div>

      <div
        className="ml-3 flex shrink-0 flex-col items-end gap-1"
      >
        <div
          className={`
            rounded-full

            px-3 py-1

            text-xs
            font-semibold

            ${lift.done
              ? `
                  bg-(--color-success-soft)
                  text-(--color-success)
                `
              : `
                  bg-(--color-warning-soft)
                  text-(--color-warning)
                `
            }
          `}
        >
          {lift.done
            ? 'Terminé'
            : 'En attente'}
        </div>

        <p
          className="text-xs text-(--color-text-soft)"
        >
          {new Date(
            lift.date,
          ).toLocaleDateString(
            'fr-FR',
          )}
        </p>
      </div>
    </button>
  )
}

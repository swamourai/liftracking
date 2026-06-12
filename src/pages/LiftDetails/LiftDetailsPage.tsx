import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { AppLayout } from '@/components/layout/AppLayout'

import { TextAction } from '@/components/ui/TextAction'

import { useApp } from '@/store/useApp'

import { LiftHero } from '@/features/lifts/components/LiftHero'

import { LiftSheet } from '@/features/lifts/components/LiftSheet'

import { LiftHeader } from '@/features/lifts/components/LiftHeader'

import { LiftStatsGrid } from '@/features/lifts/components/LiftStatsGrid'
import { WorkoutStatusToggle } from '@/features/lifts/components/WorkoutStatusToggle'

import { LiftSection } from '@/features/lifts/components/LiftSection'

export function LiftDetailsPage() {
  const navigate = useNavigate()

  const { id } = useParams()

  const {
    lifts,
    updateLift,
  } = useApp()

  const lift = lifts.find(
    (item) => item.id === id,
  )

  if (!lift) {
    return null
  }

  const toggleDone = () => {
    updateLift({
      ...lift,

      done: !lift.done,
    })
  }

  return (
    <AppLayout showBackButton>
      <div>
        <LiftHero type={lift.type} />

        <LiftSheet>
          <LiftHeader
            type={lift.type}
            rpe={lift.rpe}
            done={lift.done}
            setType={lift.setType}
            date={new Date(
              lift.date,
            ).toLocaleDateString()}
          />

          <LiftStatsGrid
            weight={lift.weight}
            series={lift.series}
            reps={lift.reps}
          />

          <WorkoutStatusToggle
            className="mt-6"
            done={lift.done}
            onToggle={toggleDone}
            doneLabel="Séance terminée"
            pendingLabel="Marquer comme terminée"
          />

          {lift.description && (
            <LiftSection title="Notes">
              <div
                className="rounded-4xl bg-[#F5F5F7] p-5"
              >
                <p
                  className="leading-relaxed text-[#111827]"
                >
                  {lift.description}
                </p>
              </div>
            </LiftSection>
          )}

          <TextAction
            onClick={() =>
              navigate(
                `/lifts/${lift.id}/edit`,
              )
            }
          >
            Modifier le lift
          </TextAction>
        </LiftSheet>
      </div>
    </AppLayout>
  )
}

import { NumberInputCard } from '@/components/ui/NumberInputCard'
import { Textarea } from '@/components/ui/Textarea'

import { TextAction } from '@/components/ui/TextAction'

import { DateField } from '@/components/ui/DateField'

import { DatePickerSheet } from '@/components/modals/DatePickerSheet'

import { DeleteLiftModal } from '@/components/modals/DeleteLiftModal'

import { SetTypePicker } from '@/features/lifts/components/SetTypePicker'
import {
  useLiftForm,
  type LiftFormMode,
} from '@/features/lifts/hooks/useLiftForm'

import { LiftHero } from './LiftHero'

import { LiftSheet } from './LiftSheet'

import { LiftHeader } from './LiftHeader'
import { WorkoutStatusToggle } from './WorkoutStatusToggle'

import { LiftSection } from './LiftSection'

import {
  liftLabels,
} from '@/features/lifts/liftAssets'

import type {
  Lift,
  LiftType,
} from '@/types/lift'
import { Button } from '@/components/ui/Button'

interface Props {
  mode: LiftFormMode

  initialLift?: Lift
}

const liftTypes: LiftType[] = [
  'pullup',
  'dip',
  'muscleup',
  'squat',
  'deadlift',
  'benchpress',
]

export function LiftForm({
  mode,
  initialLift,
}: Props) {
  const {
    showDeleteModal,
    showDatePicker,

    liftType,
    setType,
    date,
    weight,
    sets,
    reps,
    rpe,
    notes,
    done,

    setLiftType,
    setSetType,
    setDate,
    setWeight,
    setSets,
    setReps,
    setRpe,
    setNotes,

    openDeleteModal,
    closeDeleteModal,
    openDatePicker,
    closeDatePicker,
    toggleDone,
    goBack,

    handleSubmit,
    handleDeleteLift,
  } = useLiftForm({
    mode,
    initialLift,
  })

  return (
    <>
      <div>
        <LiftHero type={liftType} />

        <LiftSheet>
          <LiftHeader
            type={liftType}
            rpe={rpe}
            done={done}
          />

          <LiftSection title="Mouvement">
            <div className="grid grid-cols-2 gap-3">
              {liftTypes.map(
                (type) => (
                  <Button
                    key={type}
                    type="button"
                    size="sm"
                    variant={
                      liftType === type
                        ? 'primary'
                        : 'secondary'
                    }
                    onClick={() =>
                      setLiftType(type)
                    }
                  >
                    {liftLabels[type]}
                  </Button>
                ),
              )}
            </div>
          </LiftSection>

          <LiftSection title="Type de série">
            <SetTypePicker
              value={setType}
              onChange={
                setSetType
              }
            />
          </LiftSection>

          <div
            className="mt-6 grid grid-cols-2 gap-3"
          >
            <NumberInputCard
              label="Poids"
              value={weight}
              onChange={setWeight}
              step={0.25}
              decimals={2}
              max={1000}
            />

            <NumberInputCard
              label="RPE"
              value={rpe}
              onChange={setRpe}
              min={0}
              max={10}
              step={0.5}
              decimals={1}
              accent
            />
          </div>

          <div
            className="mt-3 grid grid-cols-2 gap-3"
          >
            <NumberInputCard
              label="Séries"
              value={sets}
              onChange={setSets}
              min={1}
              integer
              max={1000}
            />

            <NumberInputCard
              label="Répétitions"
              value={reps}
              onChange={setReps}
              min={1}
              integer
              max={1000}
            />
          </div>

          <LiftSection title="Date">
            <DateField
              value={date}
              onPress={openDatePicker}
            />
          </LiftSection>

          <LiftSection title="Notes">
            <Textarea
              value={notes}
              onChange={(e) =>
                setNotes(
                  e.target.value,
                )
              }
              placeholder="Ajouter des notes..."
              maxLength={1000}
            />
          </LiftSection>

          <WorkoutStatusToggle
            className="mt-6"
            done={done}
            onToggle={toggleDone}
          />

          <div
            className="mt-8 flex gap-3"
          >
            {mode === 'edit' && (
              <Button
                type="button"
                variant="secondary"
                fullWidth
                onClick={goBack}
              >
                Annuler
              </Button>
            )}
            <Button
              type="button"
              variant="primary"
              fullWidth
              onClick={handleSubmit}
            >
              {mode === 'edit'
                ? 'Enregistrer'
                : 'Créer'}
            </Button>
          </div>

          {mode === 'edit' && (
            <TextAction
              danger
              onClick={openDeleteModal}
            >
              Supprimer le lift
            </TextAction>
          )}
        </LiftSheet>
      </div>

      {showDeleteModal && (
        <DeleteLiftModal
          onClose={closeDeleteModal}
          onConfirm={
            handleDeleteLift
          }
        />
      )}

      {showDatePicker && (
        <DatePickerSheet
          open={showDatePicker}
          value={date}
          onClose={closeDatePicker}
          onSelect={setDate}
        />
      )}
    </>
  )
}

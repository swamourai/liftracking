import dip from '@/assets/images/lifts/dip.webp'
import muscleup from '@/assets/images/lifts/muscleup.webp'
import pullup from '@/assets/images/lifts/pullup.webp'
import squat from '@/assets/images/lifts/squat.webp'
import benchpress from '@/assets/images/lifts/benchpress.webp'
import deadlift from '@/assets/images/lifts/deadlift.webp'

import type { LiftType } from '@/types/lift'

export const liftImages: Record<LiftType, string> = {
  dip,
  muscleup,
  pullup,
  squat,
  benchpress,
  deadlift,
}

export const liftLabels: Record<LiftType, string> = {
  dip: 'Dips',
  muscleup: 'Muscle-up',
  pullup: 'Pull-up',
  squat: 'Squat',
  benchpress: 'Bench press',
  deadlift: 'Deadlift',
}

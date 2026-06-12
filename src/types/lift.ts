import type { SetType } from '@/features/lifts/constants/setTypes'

export type LiftType =
  | 'pullup'
  | 'dip'
  | 'muscleup'
  | 'squat'
  | 'benchpress'
  | 'deadlift'

export interface Lift {
  id: string

  type: LiftType

  date: string

  weight: number

  reps: number

  series: number

  rpe?: number

  description?: string

  done: boolean

  setType?: SetType
}
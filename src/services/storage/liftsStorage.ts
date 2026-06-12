import type { Lift } from '@/types/lift'
import { setTypes } from '@/features/lifts/constants/setTypes'
import type {
  SetType,
} from '@/features/lifts/constants/setTypes'
import type { LiftType } from '@/types/lift'

import { STORAGE_KEYS } from './storageKeys'

const LIFTS_STORAGE_VERSION = 2

const LIFT_TYPES = new Set([
  'pullup',
  'dip',
  'muscleup',
  'squat',
  'benchpress',
  'deadlift',
])

const SET_TYPES = new Set(setTypes)

const DATE_PATTERN =
  /^\d{4}-\d{2}-\d{2}$/

function isLiftType(
  value: unknown,
): value is LiftType {
  return (
    typeof value === 'string' &&
    LIFT_TYPES.has(value)
  )
}

function isSetType(
  value: unknown,
): value is SetType {
  return (
    typeof value === 'string' &&
    SET_TYPES.has(value as SetType)
  )
}

interface LiftStoragePayload {
  version: number
  lifts: Lift[]
}

function safeGetItem(
  key: string,
) {
  try {
    return localStorage.getItem(
      key,
    )
  } catch {
    return null
  }
}

function safeSetItem(
  key: string,
  value: string,
) {
  try {
    localStorage.setItem(
      key,
      value,
    )
  } catch {
    // no-op
  }
}

function safeRemoveItem(
  key: string,
) {
  try {
    localStorage.removeItem(
      key,
    )
  } catch {
    // no-op
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return (
    typeof value === 'object' &&
    value !== null
  )
}

function toSafeNumber(
  value: unknown,
): number | null {
  if (
    typeof value !== 'number' ||
    !Number.isFinite(value)
  ) {
    return null
  }

  return value
}

function parseLift(
  value: unknown,
): Lift | null {
  if (!isObject(value)) {
    return null
  }

  if (
    typeof value.id !== 'string' ||
    value.id.trim().length === 0
  ) {
    return null
  }

  if (!isLiftType(value.type)) {
    return null
  }

  if (
    typeof value.date !== 'string' ||
    !DATE_PATTERN.test(value.date)
  ) {
    return null
  }

  const weight =
    toSafeNumber(value.weight)
  const reps = toSafeNumber(value.reps)
  const series =
    toSafeNumber(value.series)

  if (
    weight === null ||
    weight < 0 ||
    reps === null ||
    !Number.isInteger(reps) ||
    reps < 1 ||
    series === null ||
    !Number.isInteger(series) ||
    series < 1 ||
    typeof value.done !== 'boolean'
  ) {
    return null
  }

  let rpe: number | undefined

  if (value.rpe !== undefined) {
    const parsedRpe =
      toSafeNumber(value.rpe)

    if (
      parsedRpe === null ||
      parsedRpe < 0 ||
      parsedRpe > 10
    ) {
      return null
    }

    rpe = parsedRpe
  }

  const description =
    value.description === undefined
      ? undefined
      : typeof value.description ===
          'string'
        ? value.description
        : undefined

  const setType =
    value.setType === undefined
      ? undefined
      : isSetType(value.setType)
        ? value.setType
        : undefined

  return {
    id: value.id,
    type: value.type,
    date: value.date,
    weight,
    reps,
    series,
    done: value.done,
    rpe,
    description,
    setType,
  }
}

export function sanitizeLiftInput(
  value: Omit<Lift, 'id'>,
): Omit<Lift, 'id'> | null {
  const parsed = parseLift({
    ...value,
    id: 'tmp',
  })

  if (!parsed) {
    return null
  }

  return {
    type: parsed.type,
    date: parsed.date,
    weight: parsed.weight,
    reps: parsed.reps,
    series: parsed.series,
    rpe: parsed.rpe,
    description:
      parsed.description,
    done: parsed.done,
    setType: parsed.setType,
  }
}

function parseLiftsArray(
  value: unknown,
): Lift[] {
  if (!Array.isArray(value)) {
    return []
  }

  return value
    .map(parseLift)
    .filter(
      (lift): lift is Lift =>
        lift !== null,
    )
}

export function getStoredLifts(): Lift[] {
  const data = safeGetItem(
    STORAGE_KEYS.lifts,
  )

  if (!data) {
    return []
  }

  try {
    const parsed = JSON.parse(data)

    if (!isObject(parsed)) {
      safeRemoveItem(
        STORAGE_KEYS.lifts,
      )
      return []
    }

    if (
      parsed.version !==
      LIFTS_STORAGE_VERSION
    ) {
      safeRemoveItem(
        STORAGE_KEYS.lifts,
      )
      return []
    }

    return parseLiftsArray(
      parsed.lifts,
    )
  } catch {
    safeRemoveItem(
      STORAGE_KEYS.lifts,
    )
    return []
  }
}

export function saveLifts(lifts: Lift[]) {
  const payload: LiftStoragePayload = {
    version:
      LIFTS_STORAGE_VERSION,
    lifts,
  }

  safeSetItem(
    STORAGE_KEYS.lifts,
    JSON.stringify(payload),
  )
}
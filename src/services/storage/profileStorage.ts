import type { ProfileData } from '@/types/profile'

import { STORAGE_KEYS } from './storageKeys'

const PROFILE_STORAGE_VERSION = 2

interface ProfileStoragePayload {
  version: number
  profile: ProfileData
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

function sanitizeProfile(
  value: unknown,
): ProfileData | null {
  if (!isObject(value)) {
    return null
  }

  const lastName =
    typeof value.lastName === 'string'
      ? value.lastName
      : ''

  const firstName =
    typeof value.firstName === 'string'
      ? value.firstName
      : ''

  const age =
    typeof value.age === 'number' &&
    Number.isFinite(value.age) &&
    value.age >= 0
      ? Math.round(value.age)
      : null

  const weight =
    typeof value.weight ===
      'number' &&
    Number.isFinite(value.weight) &&
    value.weight >= 0
      ? value.weight
      : null

  return {
    lastName,
    firstName,
    age,
    weight,
  }
}

export function getStoredProfile(): ProfileData | null {
  const data = safeGetItem(
    STORAGE_KEYS.profile,
  )

  if (!data) {
    return null
  }

  try {
    const parsed = JSON.parse(data)

    if (!isObject(parsed)) {
      safeRemoveItem(
        STORAGE_KEYS.profile,
      )
      return null
    }

    if (
      parsed.version !==
      PROFILE_STORAGE_VERSION
    ) {
      safeRemoveItem(
        STORAGE_KEYS.profile,
      )
      return null
    }

    return sanitizeProfile(
      parsed.profile,
    )
  } catch {
    safeRemoveItem(
      STORAGE_KEYS.profile,
    )
    return null
  }
}

export function saveProfile(profile: ProfileData) {
  const payload: ProfileStoragePayload = {
    version:
      PROFILE_STORAGE_VERSION,
    profile,
  }

  safeSetItem(
    STORAGE_KEYS.profile,
    JSON.stringify(payload),
  )
}

export function clearStoredProfile() {
  safeRemoveItem(
    STORAGE_KEYS.profile,
  )
}

import { AppLayout } from '@/components/layout/AppLayout'
import {
  useEffect,
  useState,
} from 'react'
import type { FormEvent } from 'react'
import { Pencil } from 'lucide-react'

import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { TextAction } from '@/components/ui/TextAction'

import { DeleteProfileModal } from '@/components/modals/DeleteProfileModal'

import {
  clearStoredProfile,
  getStoredProfile,
  saveProfile,
} from '@/services/storage/profileStorage'

import {
  EMPTY_PROFILE,
  type ProfileData,
} from '@/types/profile'
import { STORAGE_KEYS } from '@/services/storage/storageKeys'

import { useToast } from '@/store/useToast'
import { useApp } from '@/store/useApp'

const APP_VERSION =
  import.meta.env
    .VITE_APP_VERSION ??
  '0.0.0'

const MAX_NAME_LENGTH = 20
const MAX_AGE = 120
const MAX_PROFILE_WEIGHT = 500

interface FormValues {
  lastName: string
  firstName: string
  age: string
  weight: string
}

function toFormValues(
  profile: ProfileData,
): FormValues {
  return {
    lastName: profile.lastName,
    firstName: profile.firstName,
    age:
      profile.age !== null
        ? String(profile.age)
        : '',
    weight:
      profile.weight !== null
        ? String(profile.weight)
        : '',
  }
}

function displayValue(
  value: string | null | undefined,
) {
  if (!value) {
    return 'Non renseigné'
  }

  const trimmed = value.trim()

  return trimmed.length > 0
    ? trimmed
    : 'Non renseigné'
}

export function AccountPage() {
  const { showToast } = useToast()
  const { clearLifts } = useApp()

  const [profile, setProfile] =
    useState<ProfileData>(
      () =>
        getStoredProfile() ??
        EMPTY_PROFILE,
    )

  const [isEditing, setIsEditing] =
    useState(false)

  const [showDeleteModal, setShowDeleteModal] =
    useState(false)

  const [formValues, setFormValues] =
    useState<FormValues>(() =>
      toFormValues(
        getStoredProfile() ??
        EMPTY_PROFILE,
      ),
    )

  useEffect(() => {
    function handleStorage(
      event: StorageEvent,
    ) {
      if (
        event.key !==
        STORAGE_KEYS.profile
      ) {
        return
      }

      const nextProfile =
        getStoredProfile() ??
        EMPTY_PROFILE

      setProfile(nextProfile)

      if (!isEditing) {
        setFormValues(
          toFormValues(
            nextProfile,
          ),
        )
      }
    }

    window.addEventListener(
      'storage',
      handleStorage,
    )

    return () => {
      window.removeEventListener(
        'storage',
        handleStorage,
      )
    }
  }, [isEditing])

  function handleStartEdit() {
    setFormValues(
      toFormValues(profile),
    )
    setIsEditing(true)
  }

  function handleCancelEdit() {
    setIsEditing(false)
  }

  function handleChange(
    field: keyof FormValues,
    value: string,
  ) {
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  function handleSave(
    event: FormEvent,
  ) {
    event.preventDefault()

    const lastName =
      formValues.lastName.trim()
    const firstName =
      formValues.firstName.trim()

    if (
      lastName.length >
      MAX_NAME_LENGTH
    ) {
      showToast({
        type: 'error',
        message: `Nom: ${MAX_NAME_LENGTH} caractères max`,
      })

      return
    }

    if (
      firstName.length >
      MAX_NAME_LENGTH
    ) {
      showToast({
        type: 'error',
        message: `Prénom: ${MAX_NAME_LENGTH} caractères max`,
      })

      return
    }

    const parsedAge =
      formValues.age.trim().length > 0
        ? Number(formValues.age)
        : null

    if (
      parsedAge !== null &&
      (!Number.isInteger(parsedAge) ||
        parsedAge < 0 ||
        parsedAge > MAX_AGE)
    ) {
      showToast({
        type: 'error',
        message: `Âge invalide (0-${MAX_AGE})`,
      })

      return
    }

    const parsedWeight =
      formValues.weight.trim().length > 0
        ? Number(
          formValues.weight,
        )
        : null

    if (
      parsedWeight !== null &&
      (!Number.isFinite(parsedWeight) ||
        parsedWeight < 0 ||
        parsedWeight >
        MAX_PROFILE_WEIGHT)
    ) {
      showToast({
        type: 'error',
        message: `Poids invalide (0-${MAX_PROFILE_WEIGHT} kg)`,
      })

      return
    }

    const nextProfile: ProfileData = {
      lastName,
      firstName,
      age:
        parsedAge !== null &&
          Number.isInteger(
            parsedAge,
          ) &&
          parsedAge >= 0 &&
          parsedAge <= MAX_AGE
          ? parsedAge
          : null,
      weight:
        parsedWeight !== null &&
          Number.isFinite(
            parsedWeight,
          ) &&
          parsedWeight >= 0 &&
          parsedWeight <=
          MAX_PROFILE_WEIGHT
          ? parsedWeight
          : null,
    }

    saveProfile(nextProfile)
    setProfile(nextProfile)
    setIsEditing(false)

    showToast({
      type: 'success',
      message: 'Profil enregistré',
    })
  }

  function handleDeleteProfile() {
    clearStoredProfile()
    clearLifts()
    setProfile(EMPTY_PROFILE)
    setFormValues(
      toFormValues(EMPTY_PROFILE),
    )
    setShowDeleteModal(false)
    setIsEditing(false)

    showToast({
      type: 'success',
      message:
        'Compte et lifts supprimés',
    })
  }

  return (
    <AppLayout>
      <div className="space-y-4 px-5 pt-5">
        <Card>
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold uppercase tracking-wide text-(--color-text-muted)">Profil</p>

            {!isEditing && (
              <Button type="button" variant="primary" size="sm" onClick={handleStartEdit}>
                <Pencil size={14} />
              </Button>
            )}
          </div>

          {isEditing ? (
            <form className="mt-4 space-y-4" onSubmit={handleSave}>
              <div>
                <p className="mb-1 text-sm text-(--color-text-muted)">Nom</p>
                <input
                  type="text"
                  maxLength={MAX_NAME_LENGTH}
                  value={formValues.lastName}
                  onChange={(event) => handleChange('lastName', event.target.value)}
                  className="h-12 w-full rounded-2xl bg-(--color-surface-muted) px-4 text-(--color-text) outline-none"
                />
              </div>

              <div>
                <p className="mb-1 text-sm text-(--color-text-muted)">Prénom</p>
                <input
                  type="text"
                  maxLength={MAX_NAME_LENGTH}
                  value={formValues.firstName}
                  onChange={(event) => handleChange('firstName', event.target.value)}
                  className="h-12 w-full rounded-2xl bg-(--color-surface-muted) px-4 text-(--color-text) outline-none"
                />
              </div>

              <div>
                <p className="mb-1 text-sm text-(--color-text-muted)">Âge</p>
                <input
                  type="number"
                  min={0}
                  max={MAX_AGE}
                  step={1}
                  value={formValues.age}
                  onChange={(event) => handleChange('age', event.target.value)}
                  className="h-12 w-full rounded-2xl bg-(--color-surface-muted) px-4 text-(--color-text) outline-none"
                />
              </div>

              <div>
                <p className="mb-1 text-sm text-(--color-text-muted)">Poids (kg)</p>
                <input
                  type="number"
                  min={0}
                  max={MAX_PROFILE_WEIGHT}
                  step={0.1}
                  value={formValues.weight}
                  onChange={(event) => handleChange('weight', event.target.value)}
                  className="h-12 w-full rounded-2xl bg-(--color-surface-muted) px-4 text-(--color-text) outline-none"
                />
              </div>

              <div className="flex gap-3">
                <Button type="button" variant="secondary" fullWidth onClick={handleCancelEdit}>
                  Annuler
                </Button>

                <Button type="submit" variant="primary" fullWidth>
                  Enregistrer le profil
                </Button>
              </div>
            </form>
          ) : (
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between rounded-2xl bg-(--color-surface-muted) px-4 py-3">
                <p className="text-sm text-(--color-text-muted)">Nom</p>
                <p className="text-sm font-semibold text-(--color-text)">{displayValue(profile.lastName)}</p>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-(--color-surface-muted) px-4 py-3">
                <p className="text-sm text-(--color-text-muted)">Prénom</p>
                <p className="text-sm font-semibold text-(--color-text)">{displayValue(profile.firstName)}</p>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-(--color-surface-muted) px-4 py-3">
                <p className="text-sm text-(--color-text-muted)">Âge</p>
                <p className="text-sm font-semibold text-(--color-text)">{profile.age !== null ? `${profile.age} ans` : 'Non renseigné'}</p>
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-(--color-surface-muted) px-4 py-3">
                <p className="text-sm text-(--color-text-muted)">Poids</p>
                <p className="text-sm font-semibold text-(--color-text)">{profile.weight !== null ? `${profile.weight} kg` : 'Non renseigné'}</p>
              </div>
            </div>
          )}
        </Card>

        <Card>
          <p className="text-sm font-semibold uppercase tracking-wide text-(--color-text-muted)">Application</p>

          <div className="mt-4 flex items-center justify-between rounded-2xl bg-(--color-surface-muted) px-4 py-3">
            <p className="text-sm text-(--color-text-muted)">Version</p>
            <p className="text-sm font-semibold text-(--color-text)">v{APP_VERSION}</p>
          </div>

          <TextAction danger onClick={() => setShowDeleteModal(true)}>
            Supprimer mon compte
          </TextAction>
        </Card>

      </div>

      {showDeleteModal && (
        <DeleteProfileModal onConfirm={handleDeleteProfile} onClose={() => setShowDeleteModal(false)} />
      )}
    </AppLayout>
  )
}

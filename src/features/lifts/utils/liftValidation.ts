// src/features/lifts/utils/liftValidation.ts

interface Props {
  weight: number

  rpe: number

  sets: number

  reps: number

  notes: string

  date: Date

  done: boolean
}

interface ValidationResult {
  valid: boolean

  message?: string
}

function isInvalidNumber(
  value: number,
) {
  return (
    Number.isNaN(value) ||
    !Number.isFinite(value)
  )
}

export function validateLiftForm({
  weight,
  rpe,
  sets,
  reps,
  notes,
  date,
  done,
}: Props): ValidationResult {
  // Weight

  if (
    isInvalidNumber(weight)
  ) {
    return {
      valid: false,
      message:
        'Poids invalide',
    }
  }

  if (weight < 0) {
    return {
      valid: false,
      message:
        'Le poids ne peut pas être négatif',
    }
  }

  if (weight > 1000) {
    return {
      valid: false,
      message:
        'Le poids est trop élevé',
    }
  }

  // RPE

  if (isInvalidNumber(rpe)) {
    return {
      valid: false,
      message: 'RPE invalide',
    }
  }

  if (rpe < 0 || rpe > 10) {
    return {
      valid: false,
      message:
        'Le RPE doit être compris entre 0 et 10',
    }
  }

  // Sets

  if (
    isInvalidNumber(sets)
  ) {
    return {
      valid: false,
      message:
        'Nombre de séries invalide',
    }
  }

  if (!Number.isInteger(sets)) {
    return {
      valid: false,
      message:
        'Le nombre de séries doit être un entier',
    }
  }

  if (sets < 1) {
    return {
      valid: false,
      message:
        'Il faut au moins 1 série',
    }
  }

  if (sets > 1000) {
    return {
      valid: false,
      message:
        'Le nombre de séries est trop élevé',
    }
  }

  // Reps

  if (
    isInvalidNumber(reps)
  ) {
    return {
      valid: false,
      message:
        'Nombre de répétitions invalide',
    }
  }

  if (!Number.isInteger(reps)) {
    return {
      valid: false,
      message:
        'Le nombre de répétitions doit être un entier',
    }
  }

  if (reps < 1) {
    return {
      valid: false,
      message:
        'Il faut au moins 1 répétition',
    }
  }

  if (reps > 1000) {
    return {
      valid: false,
      message:
        'Le nombre de répétitions est trop élevé',
    }
  }

  // Notes

  if (
    typeof notes !==
    'string'
  ) {
    return {
      valid: false,
      message:
        'Notes invalides',
    }
  }

  if (
    notes.length > 1000
  ) {
    return {
      valid: false,
      message:
        'Les notes sont trop longues',
    }
  }

  // Date

  if (!(date instanceof Date)) {
    return {
      valid: false,
      message:
        'Date invalide',
    }
  }

  if (
    Number.isNaN(
      date.getTime(),
    )
  ) {
    return {
      valid: false,
      message:
        'Date invalide',
    }
  }

  const now = new Date()

  const minDate =
    new Date('2020-01-01')

  const maxDate =
    new Date(
      now.getFullYear() + 1,
      11,
      31,
    )

  if (date < minDate) {
    return {
      valid: false,
      message:
        'La date est trop ancienne',
    }
  }

  if (date > maxDate) {
    return {
      valid: false,
      message:
        'La date est trop éloignée dans le futur',
    }
  }

  // Done
  if (
    typeof done !==
    'boolean'
  ) {
    return {
      valid: false,
      message:
        'Statut de séance invalide',
    }
  }
  return {
    valid: true,
  }
}

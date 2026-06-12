import {
  useCallback,
  useState,
} from 'react'

import { format } from 'date-fns'

import { useNavigate } from 'react-router-dom'

import { validateLiftForm } from '@/features/lifts/utils/liftValidation'

import { useApp } from '@/store/useApp'
import { useToast } from '@/store/useToast'

import type {
  Lift,
  LiftType,
} from '@/types/lift'

import type { SetType } from '@/features/lifts/constants/setTypes'

export type LiftFormMode =
  | 'create'
  | 'edit'

interface Props {
  mode: LiftFormMode

  initialLift?: Lift
}

export function useLiftForm({
  mode,
  initialLift,
}: Props) {
  const navigate = useNavigate()

  const { showToast } =
    useToast()

  const {
    addLift,
    updateLift,
    deleteLift,
  } = useApp()

  const [showDeleteModal, setShowDeleteModal] =
    useState(false)

  const [showDatePicker, setShowDatePicker] =
    useState(false)

  const [liftType, setLiftType] =
    useState<LiftType>(
      initialLift?.type ?? 'pullup',
    )

  const [setType, setSetType] =
    useState<
      SetType | undefined
    >(
      initialLift?.setType,
    )

  const [date, setDate] =
    useState<Date>(
      initialLift?.date
        ? new Date(
          initialLift.date,
        )
        : new Date(),
    )

  const [weight, setWeight] =
    useState(
      initialLift?.weight ?? 0,
    )

  const [sets, setSets] =
    useState(
      initialLift?.series ?? 1,
    )

  const [reps, setReps] =
    useState(
      initialLift?.reps ?? 1,
    )

  const [rpe, setRpe] = useState(
    initialLift?.rpe ?? 5,
  )

  const [notes, setNotes] =
    useState(
      initialLift?.description ??
      '',
    )

  const [done, setDone] =
    useState(
      initialLift?.done ??
      false,
    )

  const getLiftPayload =
    useCallback(() => {
    return {
      type: liftType,

      setType,

      date: format(
        date,
        'yyyy-MM-dd',
      ),

      weight,

      series: sets,

      reps,

      rpe,

      description: notes,

      done,
    }
  }, [
    date,
    done,
    liftType,
    notes,
    reps,
    rpe,
    setType,
    sets,
    weight,
  ])

  const handleSubmit =
    useCallback(() => {
    const validation =
      validateLiftForm({
        weight,
        rpe,
        sets,
        reps,
        notes,
        date,
        done,
      })

    if (!validation.valid) {
      showToast({
        type: 'error',
        message:
          validation.message ??
          'Formulaire invalide',
      })

      return
    }

    const payload =
      getLiftPayload()

    if (
      mode === 'edit' &&
      initialLift
    ) {
      updateLift({
        ...initialLift,
        ...payload,
      })

      showToast({
        type: 'success',
        message:
          'Lift mis à jour',
      })

      navigate(
        `/lifts/${initialLift.id}`,
      )

      return
    }

    addLift(payload)

    showToast({
      type: 'success',
      message:
        'Lift créé',
    })

    navigate('/')
  }, [
    addLift,
    date,
    done,
    getLiftPayload,
    initialLift,
    mode,
    navigate,
    notes,
    reps,
    rpe,
    sets,
    showToast,
    updateLift,
    weight,
  ])

  const handleDeleteLift =
    useCallback(() => {
    if (!initialLift) {
      return
    }

    deleteLift(initialLift.id)

    showToast({
      type: 'success',
      message:
        'Lift supprimé',
    })

    navigate('/')
  }, [
    deleteLift,
    initialLift,
    navigate,
    showToast,
  ])

  const openDeleteModal =
    useCallback(() => {
    setShowDeleteModal(true)
  }, [])

  const closeDeleteModal =
    useCallback(() => {
    setShowDeleteModal(false)
  }, [])

  const openDatePicker =
    useCallback(() => {
    setShowDatePicker(true)
  }, [])

  const closeDatePicker =
    useCallback(() => {
    setShowDatePicker(false)
  }, [])

  const toggleDone =
    useCallback(() => {
    setDone((prev) => !prev)
  }, [])

  const goBack =
    useCallback(() => {
    navigate(-1)
  }, [navigate])

  return {
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
  }
}

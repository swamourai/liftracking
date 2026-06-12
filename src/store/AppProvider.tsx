import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react'

import type { ReactNode } from 'react'

import type { Lift } from '@/types/lift'
import { AppContext } from '@/store/appContext'

import {
  getStoredLifts,
  sanitizeLiftInput,
  saveLifts,
} from '@/services/storage/liftsStorage'
import { STORAGE_KEYS } from '@/services/storage/storageKeys'

interface Props {
  children: ReactNode
}

export function AppProvider({
  children,
}: Props) {
  const [lifts, setLifts] =
    useState<Lift[]>(() => {
      const storedLifts =
        getStoredLifts()

      if (storedLifts.length > 0) {
        return storedLifts
      }
      return []
    })

  const addLift = useCallback((
    lift: Omit<Lift, 'id'>,
  ) => {
    setLifts((prev) => {
      const safeLift =
        sanitizeLiftInput(lift)

      if (!safeLift) {
        return prev
      }

      const newLift: Lift = {
        ...safeLift,

        id: crypto.randomUUID(),
      }

      const updated = [newLift, ...prev]

      saveLifts(updated)

      return updated
    })
  }, [])

  const updateLift = useCallback((updatedLift: Lift) => {
    setLifts((prev) => {
      if (
        typeof updatedLift.id !==
        'string' ||
        updatedLift.id.trim()
          .length === 0
      ) {
        return prev
      }

      const safeLift =
        sanitizeLiftInput({
          type: updatedLift.type,
          setType:
            updatedLift.setType,
          date: updatedLift.date,
          weight:
            updatedLift.weight,
          series:
            updatedLift.series,
          reps: updatedLift.reps,
          rpe: updatedLift.rpe,
          description:
            updatedLift.description,
          done: updatedLift.done,
        })

      if (!safeLift) {
        return prev
      }

      const normalizedLift: Lift = {
        ...safeLift,
        id: updatedLift.id,
      }

      const updated = prev.map((lift) =>
        lift.id === updatedLift.id
          ? normalizedLift
          : lift,
      )

      saveLifts(updated)

      return updated
    })
  }, [])

  const deleteLift = useCallback((id: string) => {
    setLifts((prev) => {
      const updated = prev.filter(
        (lift) => lift.id !== id,
      )

      saveLifts(updated)

      return updated
    })
  }, [])

  const clearLifts = useCallback(() => {
    setLifts([])
    saveLifts([])
  }, [])

  useEffect(() => {
    function handleStorage(
      event: StorageEvent,
    ) {
      if (
        event.key !==
        STORAGE_KEYS.lifts
      ) {
        return
      }

      setLifts(getStoredLifts())
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
  }, [])

  const value = useMemo(
    () => ({
      lifts,
      addLift,
      updateLift,
      deleteLift,
      clearLifts,
    }),
    [
      addLift,
      clearLifts,
      deleteLift,
      lifts,
      updateLift,
    ],
  )

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  )
}
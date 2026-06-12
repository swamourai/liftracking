import { createContext } from 'react'

import type { Lift } from '@/types/lift'

export interface AppContextValue {
  lifts: Lift[]

  addLift: (
    lift: Omit<Lift, 'id'>,
  ) => void

  updateLift: (lift: Lift) => void

  deleteLift: (id: string) => void

  clearLifts: () => void
}

export const AppContext =
  createContext<AppContextValue | null>(null)

import { createContext } from 'react'

export type ToastType =
  | 'success'
  | 'error'

interface ShowToastInput {
  type: ToastType

  message: string
}

export interface ToastContextValue {
  showToast: (
    input: ShowToastInput,
  ) => void
}

export const ToastContext =
  createContext<
    ToastContextValue | undefined
  >(undefined)

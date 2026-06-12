// ToastProvider.tsx

import {
  useCallback,
  useMemo,
  useState,
} from 'react'

import type {
  ReactNode,
} from 'react'

import {
  Check,
  TriangleAlert,
} from 'lucide-react'
import {
  ToastContext,
  type ToastType,
} from '@/store/toastContext'

interface Toast {
  id: number

  type: ToastType

  message: string
}

interface Props {
  children: ReactNode
}

export function ToastProvider({
  children,
}: Props) {
  const [toasts, setToasts] =
    useState<Toast[]>([])

  const showToast = useCallback(({
    type,
    message,
  }: {
    type: ToastType
    message: string
  }) => {
    const id = Date.now()

    setToasts((prev) => [
      ...prev,
      {
        id,
        type,
        message,
      },
    ])

    setTimeout(() => {
      setToasts((prev) =>
        prev.filter(
          (toast) =>
            toast.id !== id,
        ),
      )
    }, 2600)
  }, [])

  const value = useMemo(
    () => ({
      showToast,
    }),
    [showToast],
  )

  return (
    <ToastContext.Provider
      value={value}
    >
      {children}

      <div
        className="pointer-events-none fixed inset-x-0 top-20 z-999 flex flex-col items-center gap-3 px-5"
      >
        {toasts.map((toast) => {
          const success =
            toast.type ===
            'success'

          return (
            <div
              key={toast.id}
              className={`
                animate-toast-in

                flex w-full
                max-w-sm
                min-h-18
                items-center
                gap-4

                overflow-hidden

                rounded-[30px]

                border

                px-5

                shadow-2xl
                backdrop-blur-xl

                ${success
                  ? `
                      border-(--color-success-border)

                      bg-(--color-success-soft)/95
                    `
                  : `
                      border-(--color-danger-border)

                      bg-(--color-danger-soft)/95
                    `
                }
              `}
            >
              <div
                className={`
                  flex h-12 w-12
                  items-center
                  justify-center

                  rounded-2xl

                  shrink-0

                  ${success
                    ? `
                        bg-(--color-success)
                        text-white
                      `
                    : `
                        bg-(--color-danger)
                        text-white
                      `
                  }
                `}
              >
                {success ? (
                  <Check size={22} />
                ) : (
                  <TriangleAlert
                    size={22}
                  />
                )}
              </div>

              <div className="flex-1">
                <p
                  className={`
                    text-sm
                    font-semibold

                    ${success
                      ? 'text-(--color-success-text-strong)'
                      : 'text-(--color-danger-text-strong)'
                    }
                  `}
                >
                  {success
                    ? 'Succès'
                    : 'Erreur'}
                </p>

                <p
                  className={`
                    mt-0.5

                    text-sm

                    ${success
                      ? 'text-(--color-success-text)'
                      : 'text-(--color-danger-text)'
                    }
                  `}
                >
                  {toast.message}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </ToastContext.Provider>
  )
}

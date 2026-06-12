import {
  memo,
  useCallback,
  useState,
} from 'react'

interface Props {
  label: string

  value: number

  onChange: (
    value: number,
  ) => void

  min?: number

  max?: number

  step?: number

  decimals?: number

  integer?: boolean

  accent?: boolean
}

function NumberInputCardComponent({
  label,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  decimals = 0,
  integer = false,
  accent = false,
}: Props) {
  const formatValue =
    useCallback(
      (value: number) => {
        if (integer) {
          return String(
            Math.round(value),
          )
        }

        return value.toFixed(
          decimals,
        )
      },
      [decimals, integer],
    )

  const [inputValue, setInputValue] =
    useState(() => formatValue(value))

  const [isEditing, setIsEditing] =
    useState(false)

  const sanitizeValue =
    useCallback(
      (value: number) => {
        let next = value

        if (Number.isNaN(next)) {
          next = min
        }

        if (next < min) {
          next = min
        }

        if (
          max !== undefined &&
          next > max
        ) {
          next = max
        }

        if (integer) {
          next = Math.round(next)
        } else {
          next = Number(
            next.toFixed(
              decimals,
            ),
          )
        }

        return next
      },
      [decimals, integer, max, min],
    )

  const handleBlur = useCallback(() => {
    const parsed =
      parseFloat(inputValue)

    const next =
      sanitizeValue(parsed)

    if (next !== value) {
      onChange(next)
    }

    setInputValue(
      formatValue(next),
    )

    setIsEditing(false)
  }, [
    formatValue,
    inputValue,
    onChange,
    sanitizeValue,
    value,
  ])

  const handleFocus = useCallback(() => {
    setIsEditing(true)

    setInputValue(
      formatValue(value),
    )
  }, [formatValue, value])

  return (
    <div
      className="rounded-(--radius-card) bg-(--color-surface-muted) p-(--space-card)"
    >
      <p
        className="text-sm text-(--color-text-muted)"
      >
        {label}
      </p>

      <input
        value={
          isEditing
            ? inputValue
            : formatValue(value)
        }
        type="number"
        min={min}
        max={max}
        step={step}
        inputMode={
          integer
            ? 'numeric'
            : 'decimal'
        }
        onChange={(e) => {
          setInputValue(
            e.target.value,
          )
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`
          mt-3
          w-full

          bg-transparent

          text-2xl
          font-bold

          outline-none

          ${accent
            ? 'text-(--color-primary)'
            : 'text-(--color-text)'
          }
        `}
      />
    </div>
  )
}

export const NumberInputCard =
  memo(NumberInputCardComponent)
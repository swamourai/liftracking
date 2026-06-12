// DateField.tsx

import { Calendar } from 'lucide-react'

import {
  format,
  isToday,
} from 'date-fns'
import { fr } from 'date-fns/locale'

interface Props {
  value: Date

  onPress: () => void
}

export function DateField({
  value,
  onPress,
}: Props) {
  const displayDate =
    isToday(value)
      ? 'Aujourd’hui'
      : format(
        value,
        'dd MMM yyyy',
        { locale: fr },
      )

  return (
    <button
      type="button"
      onClick={onPress}
      className="flex w-full items-center justify-between rounded-3xl bg-(--color-surface-muted) px-5 py-5 transition-opacity active:opacity-70"
    >
      <div>
        <p
          className="text-sm font-medium text-left text-(--color-text-muted)"
        >
          Date
        </p>

        <p
          className="mt-1 text-lg font-semibold text-(--color-text)"
        >
          {displayDate}
        </p>
      </div>

      <div
        className="flex h-11 w-11 items-center justify-center rounded-2xl bg-(--color-surface)"
      >
        <Calendar
          size={20}
          className="text-(--color-text)"
        />
      </div>
    </button>
  )
}
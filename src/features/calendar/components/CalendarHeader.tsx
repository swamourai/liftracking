import { Calendar } from 'lucide-react'

interface Props {
  selectedDate: Date
}

export function CalendarHeader({
  selectedDate,
}: Props) {
  return (
    <div className="flex items-center justify-between">
      <div
        className="flex items-center gap-3 rounded-2xl bg-(--color-surface) px-4 py-3 shadow-sm"
      >
        <Calendar
          size={20}
          className="text-(--color-primary)"
        />

        <p className="font-semibold text-(--color-text)">
          {selectedDate.toLocaleDateString(
            'fr-FR',
            {
              weekday: 'short',
              month: 'short',
              day: 'numeric',
            },
          )}
        </p>
      </div>
    </div>
  )
}
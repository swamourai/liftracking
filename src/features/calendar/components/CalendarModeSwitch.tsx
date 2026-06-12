import type { CalendarMode } from '@/pages/Calendar/CalendarPage'

interface Props {
  mode: CalendarMode

  onChange: (
    mode: CalendarMode,
  ) => void
}

export function CalendarModeSwitch({
  mode,
  onChange,
}: Props) {
  return (
    <div
      className="flex overflow-hidden rounded-4xl bg-(--color-surface) p-1 shadow-sm"
    >
      <button
        onClick={() =>
          onChange('week')
        }
        className={`
          flex-1

          h-12

          rounded-3xl

          px-4

          text-md
          font-semibold

          transition-all

          ${mode === 'week'
            ? `
                bg-(--color-primary)
                text-white

                shadow-sm
              `
            : `
                text-(--color-text-muted)
              `
          }
        `}
      >
        Semaine
      </button>

      <button
        onClick={() =>
          onChange('month')
        }
        className={`
          flex-1

          h-12

          rounded-3xl

          px-4

          text-md
          font-semibold

          transition-all

          ${mode === 'month'
            ? `
                bg-(--color-primary)
                text-white

                shadow-sm
              `
            : `
                text-(--color-text-muted)
              `
          }
        `}
      >
        Mois
      </button>
    </div>
  )
}
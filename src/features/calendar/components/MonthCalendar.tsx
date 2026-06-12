import {
  useCallback,
  useMemo,
} from 'react'

import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

import { formatDate } from '@/utils/date'

import { useApp } from '@/store/useApp'
import { CalendarNavButton } from '@/features/calendar/components/CalendarNavButton'

interface Props {
  selectedDate: Date

  onSelectDate: (
    date: Date,
  ) => void

  onMonthChange?: (
    date: Date,
  ) => void

  className?: string

  withShadow?: boolean
}

const weekdays = [
  'Lu',
  'Ma',
  'Me',
  'Je',
  'Ve',
  'Sa',
  'Di',
]

function toDateKey(date: Date) {
  return formatDate(date)
}

export function MonthCalendar({
  selectedDate,
  onSelectDate,
  onMonthChange,
  className = '',
  withShadow = true,
}: Props) {
  const { lifts } = useApp()

  const currentYear =
    selectedDate.getFullYear()

  const currentMonth =
    selectedDate.getMonth()

  const calendarDays = useMemo<
    Array<number | null>
  >(() => {
    const firstDayOfMonth =
      new Date(
        currentYear,
        currentMonth,
        1,
      )

    const lastDayOfMonth =
      new Date(
        currentYear,
        currentMonth + 1,
        0,
      )

    const daysInMonth =
      lastDayOfMonth.getDate()

    const startingDay =
      firstDayOfMonth.getDay()

    const normalizedStartingDay =
      startingDay === 0
        ? 6
        : startingDay - 1

    const days: Array<
      number | null
    > = []

    for (
      let i = 0;
      i < normalizedStartingDay;
      i++
    ) {
      days.push(null)
    }

    for (
      let day = 1;
      day <= daysInMonth;
      day++
    ) {
      days.push(day)
    }

    while (
      days.length % 7 !==
      0
    ) {
      days.push(null)
    }

    return days
  }, [currentMonth, currentYear])

  const calendarWeeks = useMemo(
    () => {
      const weeks: Array<
        Array<number | null>
      > = []

      for (
        let i = 0;
        i < calendarDays.length;
        i += 7
      ) {
        weeks.push(
          calendarDays.slice(
            i,
            i + 7,
          ),
        )
      }

      return weeks
    },
    [calendarDays],
  )

  const liftCountByDate = useMemo(
    () => {
      const counts = new Map<
        string,
        number
      >()

      lifts.forEach((lift) => {
        const dateKey =
          lift.date.slice(0, 10)

        counts.set(
          dateKey,
          (counts.get(dateKey) ??
            0) + 1,
        )
      })

      return counts
    },
    [lifts],
  )

  const selectedDateKey =
    toDateKey(selectedDate)

  const todayDateKey =
    toDateKey(new Date())

  const previousMonth =
    useCallback(() => {
      const newDate = new Date(
        currentYear,
        currentMonth - 1,
        1,
      )

      if (onMonthChange) {
        onMonthChange(newDate)

        return
      }

      onSelectDate(newDate)
    }, [
      currentMonth,
      currentYear,
      onMonthChange,
      onSelectDate,
    ])

  const nextMonth =
    useCallback(() => {
      const newDate = new Date(
        currentYear,
        currentMonth + 1,
        1,
      )

      if (onMonthChange) {
        onMonthChange(newDate)

        return
      }

      onSelectDate(newDate)
    }, [
      currentMonth,
      currentYear,
      onMonthChange,
      onSelectDate,
    ])

  return (
    <div
      className={`
        rounded-4xl
        bg-white

        p-4

        ${withShadow
          ? 'shadow-sm'
          : ''
        }

        ${className}
      `}
    >
      <div
        className="mb-5 flex items-center justify-between"
      >
        <CalendarNavButton
          onClick={previousMonth}
        >
          <ChevronLeft size={18} />
        </CalendarNavButton>

        <h2
          className="text-lg font-bold capitalize text-(--color-text)"
        >
          {selectedDate.toLocaleDateString(
            'fr-FR',
            {
              month: 'long',
              year: 'numeric',
            },
          )}
        </h2>

        <CalendarNavButton
          onClick={nextMonth}
        >
          <ChevronRight size={18} />
        </CalendarNavButton>
      </div>

      <table className="w-full table-fixed border-collapse">
        <thead>
          <tr>
            {weekdays.map((day) => (
              <th
                key={day}
                className="pb-3 text-center text-xs font-medium text-(--color-text-muted)"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {calendarWeeks.map(
            (
              week,
              weekIndex,
            ) => (
              <tr key={weekIndex}>
                {week.map(
                  (
                    day,
                    dayIndex,
                  ) => {
                    if (
                      day === null
                    ) {
                      return (
                        <td
                          key={
                            dayIndex
                          }
                          className="h-14"
                        />
                      )
                    }

                    const date =
                      new Date(
                        currentYear,
                        currentMonth,
                        day,
                      )

                    const dateKey =
                      toDateKey(date)

                    const isSelected =
                      dateKey ===
                      selectedDateKey

                    const isToday =
                      dateKey ===
                      todayDateKey

                    const liftCount =
                      liftCountByDate.get(
                        dateKey,
                      ) ?? 0

                    const hasLift =
                      liftCount > 0

                    const displayCount =
                      liftCount > 9
                        ? '9+'
                        : liftCount

                    return (
                      <td
                        key={dateKey}
                        className="h-14 text-center"
                      >
                        <button
                          type="button"
                          onClick={() =>
                            onSelectDate(
                              date,
                            )
                          }
                          className={`
                            relative

                            mx-auto

                            flex h-12 w-12
                            items-center
                            justify-center

                            rounded-full

                            text-sm
                            font-semibold

                            transition-all

                            ${isSelected
                              ? `
                                  bg-(--color-primary)
                                  text-white
                                `
                              : isToday
                                ? `
                                    bg-(--color-surface-tint)
                                    text-(--color-primary)
                                  `
                                : `
                                    text-(--color-text)
                                  `
                            }
                          `}
                        >
                          {day}

                          {hasLift && (
                            <span
                              className={`
                                absolute
                                -right-1
                                -bottom-1

                                inline-flex
                                min-w-4
                                h-4
                                items-center
                                justify-center
                                px-0.5

                                rounded-full

                                text-[9px]
                                font-bold
                                leading-none

                                ${isSelected
                                  ? 'bg-white text-(--color-primary)'
                                  : 'bg-(--color-primary) text-white'
                                }
                              `}
                            >
                              {displayCount}
                            </span>
                          )}
                        </button>
                      </td>
                    )
                  },
                )}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  )
}
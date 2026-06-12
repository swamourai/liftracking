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
}

function toDateKey(date: Date) {
  return formatDate(date)
}

export function WeekCalendar({
  selectedDate,
  onSelectDate,
}: Props) {
  const { lifts } = useApp()

  const weekDays = useMemo(
    () => {
      const currentDay =
        selectedDate.getDay()

      const mondayOffset =
        currentDay === 0
          ? -6
          : 1 - currentDay

      const monday = new Date(
        selectedDate,
      )

      monday.setDate(
        selectedDate.getDate() +
        mondayOffset,
      )

      return Array.from(
        { length: 7 },
        (_, index) => {
          const date = new Date(
            monday,
          )

          date.setDate(
            monday.getDate() +
            index,
          )

          return date
        },
      )
    },
    [selectedDate],
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

  const goToPreviousWeek =
    useCallback(() => {
      const newDate = new Date(
        selectedDate,
      )

      newDate.setDate(
        selectedDate.getDate() - 7,
      )

      onSelectDate(newDate)
    }, [onSelectDate, selectedDate])

  const goToNextWeek =
    useCallback(() => {
      const newDate = new Date(
        selectedDate,
      )

      newDate.setDate(
        selectedDate.getDate() + 7,
      )

      onSelectDate(newDate)
    }, [onSelectDate, selectedDate])

  return (
    <div
      className="grid grid-cols-9 gap-2"
    >
      <CalendarNavButton
        onClick={goToPreviousWeek}
        size="lg"
      >
        <ChevronLeft
          size={24}
        />
      </CalendarNavButton>

      {weekDays.map((date) => {
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
            ? '9'
            : liftCount

        return (
          <button
            type="button"
            key={date.toISOString()}
            onClick={() =>
              onSelectDate(date)
            }
            className={`
              relative

              w-full
              h-18
              flex flex-col
              items-center
              justify-center

              rounded-3xl

              transition-all

              ${isSelected
                ? `
                    bg-[#A855F7]
                    text-white

                    shadow-lg
                    shadow-[#A855F7]/20
                  `
                : isToday
                  ? `
                      bg-[#F3E8FF]
                      text-[#A855F7]
                    `
                  : `
                      bg-white
                      text-[#111827]
                    `
              }
            `}
          >
            <span
              className="text-[11px] font-medium capitalize"
            >
              {date.toLocaleDateString(
                'fr-FR',
                {
                  weekday:
                    'short',
                },
              )}
            </span>

            <span
              className="mt-2 text-[18px] font-bold leading-none"
            >
              {date.getDate()}
            </span>

            {hasLift && (
              <span
                className={`
                  absolute
                  right-1
                  bottom-1

                  inline-flex
                  h-4
                  w-4
                  items-center
                  justify-center

                  rounded-full

                  text-[8px]
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
        )
      })}

      <CalendarNavButton
        onClick={goToNextWeek}
        size="lg"
      >
        <ChevronRight
          size={24}
        />
      </CalendarNavButton>
    </div>
  )
}
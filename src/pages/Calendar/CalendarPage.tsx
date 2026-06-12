import { useMemo, useState } from 'react'

import { AppLayout } from '@/components/layout/AppLayout'

import { useApp } from '@/store/useApp'

import { LiftListSection } from '@/features/lifts/components/LiftListSection'

import { CalendarHeader } from '@/features/calendar/components/CalendarHeader'

import { CalendarModeSwitch } from '@/features/calendar/components/CalendarModeSwitch'

import { WeekCalendar } from '@/features/calendar/components/WeekCalendar'

import { MonthCalendar } from '@/features/calendar/components/MonthCalendar'

export type CalendarMode =
  | 'week'
  | 'month'

export function CalendarPage() {
  const { lifts } = useApp()

  const [mode, setMode] =
    useState<CalendarMode>('week')

  const [selectedDate, setSelectedDate] =
    useState(new Date())

  const selectedDateString =
    selectedDate
      .toISOString()
      .split('T')[0]

  const selectedLifts =
    useMemo(() => {
      return lifts.filter(
        (lift) =>
          lift.date ===
          selectedDateString,
      )
    }, [
      lifts,
      selectedDateString,
    ])

  return (
    <AppLayout>
      <div className="space-y-5 p-5 pb-0">
        <CalendarHeader
          selectedDate={
            selectedDate
          }
        />

        <CalendarModeSwitch
          mode={mode}
          onChange={setMode}
        />

        {mode === 'week' ? (
          <WeekCalendar
            selectedDate={
              selectedDate
            }
            onSelectDate={
              setSelectedDate
            }
          />
        ) : (
          <MonthCalendar
            selectedDate={
              selectedDate
            }
            onSelectDate={
              setSelectedDate
            }
          />
        )}

        <LiftListSection
          title="Séances"
          lifts={selectedLifts}
        />
      </div>
    </AppLayout>
  )
}

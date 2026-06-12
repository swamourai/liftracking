import { useState } from 'react'

import { X } from 'lucide-react'

import { BottomSheet } from '@/components/ui/BottomSheet'

import { MonthCalendar } from '@/features/calendar/components/MonthCalendar'

interface Props {
  open: boolean

  value: Date

  onSelect: (
    date: Date,
  ) => void

  onClose: () => void
}

export function DatePickerSheet({
  value,
  onSelect,
  onClose,
}: Props) {
  const [
    currentDate,
    setCurrentDate,
  ] = useState(value)

  return (
    <BottomSheet onClose={onClose}>
      <div
        className="pb-8"
      >
        <div
          className="mb-5 flex items-center justify-between px-5 pt-2"
        >
          <h2
            className="text-xl font-bold text-[#111827]"
          >
            Choisir une date
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="flex h-12 w-12 items-center justify-center rounded-2xl text-[#6B7280]"
          >
            <X size={20} />
          </button>
        </div>

        <MonthCalendar
          selectedDate={
            currentDate
          }
          onMonthChange={
            setCurrentDate
          }
          withShadow={false}
          onSelectDate={(date) => {
            onSelect(date)

            onClose()
          }}
          className="px-5"
        />
      </div>
    </BottomSheet>
  )
}

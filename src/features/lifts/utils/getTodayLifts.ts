import type { Lift } from '@/types/lift'

import { formatDate } from '@/utils/date'

export function getTodayLifts(
  lifts: Lift[],
) {
  const today = formatDate(
    new Date(),
  )

  return lifts.filter(
    (lift) => lift.date === today,
  )
}
import type {
  Lift,
  LiftType,
} from '@/types/lift'

export interface WeekStat {
  key: string
  label: string
  volume: number
  sessions: number
}

export type PeriodWeeks =
  | 4
  | 8

export type ChartMetric =
  | 'volume'
  | 'sessions'

export interface LiftTypeStats {
  sessions: number
  volume: number
  pr: number
}

export type ByTypeStats = Record<
  LiftType,
  LiftTypeStats
>

export function getLiftVolume(lift: Lift) {
  return lift.weight * lift.reps * lift.series
}

function toDateKey(date: Date) {
  const year = date.getFullYear()
  const month = String(
    date.getMonth() + 1,
  ).padStart(2, '0')
  const day = String(
    date.getDate(),
  ).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export function getWeekStart(date: Date) {
  const start = new Date(date)
  const day = start.getDay()
  const offset =
    day === 0
      ? -6
      : 1 - day

  start.setDate(
    start.getDate() + offset,
  )
  start.setHours(0, 0, 0, 0)

  return start
}

export function getLastWeeks(
  count: number,
  offsetWeeks = 0,
) {
  const weeks: Date[] = []
  const currentWeekStart =
    getWeekStart(new Date())

  currentWeekStart.setDate(
    currentWeekStart.getDate() -
    offsetWeeks * 7,
  )

  for (
    let index = count - 1;
    index >= 0;
    index--
  ) {
    const weekStart = new Date(
      currentWeekStart,
    )
    weekStart.setDate(
      currentWeekStart.getDate() -
      index * 7,
    )
    weeks.push(weekStart)
  }

  return weeks
}

export function buildWeekStats(
  lifts: Lift[],
  weekStarts: Date[],
) {
  const map = new Map<
    string,
    WeekStat
  >()

  weekStarts.forEach((weekStart) => {
    const key = toDateKey(weekStart)
    const label = weekStart.toLocaleDateString(
      'fr-FR',
      {
        day: '2-digit',
        month: '2-digit',
      },
    )

    map.set(key, {
      key,
      label,
      volume: 0,
      sessions: 0,
    })
  })

  lifts.forEach((lift) => {
    const liftDate = new Date(
      lift.date,
    )

    if (
      Number.isNaN(
        liftDate.getTime(),
      )
    ) {
      return
    }

    const weekKey = toDateKey(
      getWeekStart(liftDate),
    )

    const stat = map.get(weekKey)

    if (!stat) {
      return
    }

    stat.volume +=
      getLiftVolume(lift)
    stat.sessions += 1
  })

  return Array.from(map.values())
}

export function getRangeFromWeeks(
  weekStarts: Date[],
) {
  const start = new Date(
    weekStarts[0],
  )
  const end = new Date(
    weekStarts[
    weekStarts.length - 1
    ],
  )

  end.setDate(end.getDate() + 6)
  end.setHours(23, 59, 59, 999)

  return { start, end }
}

export function formatDelta(
  current: number,
  previous: number,
  suffix = '',
) {
  const delta =
    current - previous

  if (delta === 0) {
    return `= 0${suffix}`
  }

  const sign =
    delta > 0
      ? '+'
      : '-'

  return `${sign}${Math.abs(delta)}${suffix}`
}

export function createEmptyByTypeStats(): ByTypeStats {
  return {
    pullup: {
      sessions: 0,
      volume: 0,
      pr: 0,
    },
    dip: {
      sessions: 0,
      volume: 0,
      pr: 0,
    },
    muscleup: {
      sessions: 0,
      volume: 0,
      pr: 0,
    },
    squat: {
      sessions: 0,
      volume: 0,
      pr: 0,
    },
    benchpress: {
      sessions: 0,
      volume: 0,
      pr: 0,
    },
    deadlift: {
      sessions: 0,
      volume: 0,
      pr: 0,
    },
  }
}

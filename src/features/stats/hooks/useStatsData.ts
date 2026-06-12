import {
  useMemo,
  useState,
} from 'react'

import type {
  Lift,
  LiftType,
} from '@/types/lift'

import {
  buildWeekStats,
  createEmptyByTypeStats,
  getLastWeeks,
  getLiftVolume,
  getRangeFromWeeks,
} from '@/features/stats/utils/stats'

import type {
  ByTypeStats,
  ChartMetric,
  PeriodWeeks,
} from '@/features/stats/utils/stats'

function getLiftsInRange(
  lifts: Lift[],
  start: Date,
  end: Date,
) {
  return lifts.filter((lift) => {
    const date = new Date(
      lift.date,
    )

    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {
      return false
    }

    return (
      date >= start &&
      date <= end
    )
  })
}

function getCompletionRate(
  doneSessions: number,
  totalSessions: number,
) {
  if (totalSessions === 0) {
    return 0
  }

  return Math.round(
    (doneSessions /
      totalSessions) *
    100,
  )
}

function getAverageRpe(
  lifts: Lift[],
) {
  let sum = 0
  let count = 0

  lifts.forEach((lift) => {
    if (
      typeof lift.rpe ===
      'number'
    ) {
      sum += lift.rpe
      count += 1
    }
  })

  if (count === 0) {
    return null
  }

  return Number(
    (sum / count).toFixed(1),
  )
}

interface UseStatsDataReturn {
  periodWeeks: PeriodWeeks
  setPeriodWeeks: (
    weeks: PeriodWeeks,
  ) => void
  chartMetric: ChartMetric
  setChartMetric: (
    metric: ChartMetric,
  ) => void
  currentWeekStats: ReturnType<
    typeof buildWeekStats
  >
  maxWeekValue: number
  totalSessions: number
  previousSessions: number
  completionRate: number
  previousCompletionRate: number
  totalVolume: number
  previousTotalVolume: number
  avgRpeLabel: string
  avgRpeNumber: number
  previousAvgRpe: number
  byType: ByTypeStats
  topLiftType?: LiftType
}

export function useStatsData(
  lifts: Lift[],
): UseStatsDataReturn {
  const [periodWeeks, setPeriodWeeks] =
    useState<PeriodWeeks>(8)

  const [chartMetric, setChartMetric] =
    useState<ChartMetric>('volume')

  const currentWeekStarts = useMemo(
    () => getLastWeeks(periodWeeks, 0),
    [periodWeeks],
  )

  const previousWeekStarts = useMemo(
    () =>
      getLastWeeks(
        periodWeeks,
        periodWeeks,
      ),
    [periodWeeks],
  )

  const currentWeekStats = useMemo(
    () =>
      buildWeekStats(
        lifts,
        currentWeekStarts,
      ),
    [currentWeekStarts, lifts],
  )

  const currentRange = useMemo(
    () =>
      getRangeFromWeeks(
        currentWeekStarts,
      ),
    [currentWeekStarts],
  )

  const previousRange = useMemo(
    () =>
      getRangeFromWeeks(
        previousWeekStarts,
      ),
    [previousWeekStarts],
  )

  const currentPeriodLifts = useMemo(
    () =>
      getLiftsInRange(
        lifts,
        currentRange.start,
        currentRange.end,
      ),
    [
      currentRange.end,
      currentRange.start,
      lifts,
    ],
  )

  const previousPeriodLifts = useMemo(
    () =>
      getLiftsInRange(
        lifts,
        previousRange.start,
        previousRange.end,
      ),
    [
      lifts,
      previousRange.end,
      previousRange.start,
    ],
  )

  const totalSessions =
    currentPeriodLifts.length

  const previousSessions =
    previousPeriodLifts.length

  const doneSessions = currentPeriodLifts.filter(
    (lift) => lift.done,
  ).length

  const previousDoneSessions = previousPeriodLifts.filter(
    (lift) => lift.done,
  ).length

  const completionRate =
    getCompletionRate(
      doneSessions,
      totalSessions,
    )

  const previousCompletionRate =
    getCompletionRate(
      previousDoneSessions,
      previousSessions,
    )

  const totalVolume = currentPeriodLifts.reduce(
    (sum, lift) =>
      sum + getLiftVolume(lift),
    0,
  )

  const previousTotalVolume = previousPeriodLifts.reduce(
    (sum, lift) =>
      sum + getLiftVolume(lift),
    0,
  )

  const avgRpeValue =
    getAverageRpe(
      currentPeriodLifts,
    )

  const previousAvgRpeValue =
    getAverageRpe(
      previousPeriodLifts,
    )

  const avgRpeLabel =
    avgRpeValue === null
      ? '—'
      : avgRpeValue.toFixed(1)

  const avgRpeNumber =
    avgRpeValue ?? 0

  const previousAvgRpe =
    previousAvgRpeValue ?? 0

  const maxWeekValue = useMemo(
    () =>
      Math.max(
        ...currentWeekStats.map(
          (week) =>
            chartMetric ===
            'volume'
              ? week.volume
              : week.sessions,
        ),
        1,
      ),
    [chartMetric, currentWeekStats],
  )

  const byType = useMemo(() => {
    const initial =
      createEmptyByTypeStats()

    currentPeriodLifts.forEach((lift) => {
      const current =
        initial[lift.type]

      current.sessions += 1
      current.volume +=
        getLiftVolume(lift)
      current.pr = Math.max(
        current.pr,
        lift.weight,
      )
    })

    return initial
  }, [currentPeriodLifts])

  const topLiftType = useMemo(
    () =>
      (
        Object.entries(
          byType,
        ) as Array<
          [
            LiftType,
            {
              sessions: number
              volume: number
              pr: number
            },
          ]
        >
      )
        .sort(
          (a, b) =>
            b[1].sessions -
            a[1].sessions,
        )
        .at(0)?.[0],
    [byType],
  )

  return {
    periodWeeks,
    setPeriodWeeks,
    chartMetric,
    setChartMetric,
    currentWeekStats,
    maxWeekValue,
    totalSessions,
    previousSessions,
    completionRate,
    previousCompletionRate,
    totalVolume,
    previousTotalVolume,
    avgRpeLabel,
    avgRpeNumber,
    previousAvgRpe,
    byType,
    topLiftType,
  }
}

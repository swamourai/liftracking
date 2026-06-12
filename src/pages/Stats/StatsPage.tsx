import { AppLayout } from '@/components/layout/AppLayout'

import { Card } from '@/components/ui/Card'

import { liftLabels } from '@/features/lifts/liftAssets'

import { useStatsData } from '@/features/stats/hooks/useStatsData'

import {
  formatDelta,
  type PeriodWeeks,
} from '@/features/stats/utils/stats'

import { useApp } from '@/store/useApp'

import type { LiftType } from '@/types/lift'


export function StatsPage() {
  const { lifts } = useApp()

  const {
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
  } = useStatsData(lifts)

  const sectionTitleClass =
    'text-sm font-semibold uppercase tracking-wide text-(--color-text-muted)'

  return (
    <AppLayout>
      <div className="space-y-4 px-5 pt-5">
        <Card>
          <div className="flex items-center justify-between">
            <p className={sectionTitleClass}>Période</p>
            <p className="text-xs text-(--color-text-muted)">{periodWeeks} semaines</p>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {([4, 8] as PeriodWeeks[]).map((weeks) => (
              <button
                key={weeks}
                type="button"
                onClick={() =>
                  setPeriodWeeks(weeks)
                }
                className={periodWeeks === weeks
                  ? 'h-12 rounded-2xl bg-(--color-primary) text-sm font-semibold text-white'
                  : 'h-12 rounded-2xl bg-(--color-surface-muted) text-sm font-semibold text-(--color-text-muted)'
                }
              >
                {weeks} sem
              </button>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-2 gap-3">
          <Card>
            <p className={sectionTitleClass}>Séances</p>
            <p className="mt-2 text-2xl font-bold text-(--color-text)">{totalSessions}</p>
            <p className="mt-1 text-xs text-(--color-text-muted)">{formatDelta(totalSessions, previousSessions)}</p>
          </Card>

          <Card>
            <p className={sectionTitleClass}>Complétion</p>
            <p className="mt-2 text-2xl font-bold text-(--color-text)">{completionRate}%</p>
            <p className="mt-1 text-xs text-(--color-text-muted)">{formatDelta(completionRate, previousCompletionRate, '%')}</p>
          </Card>

          <Card>
            <p className={sectionTitleClass}>Tonnage</p>
            <p className="mt-2 text-2xl font-bold text-(--color-text)">{Math.round(totalVolume)} kg</p>
            <p className="mt-1 text-xs text-(--color-text-muted)">{formatDelta(Math.round(totalVolume), Math.round(previousTotalVolume), ' kg')}</p>
          </Card>

          <Card>
            <p className={sectionTitleClass}>RPE moyen</p>
            <p className="mt-2 text-2xl font-bold text-(--color-text)">{avgRpeLabel}</p>
            <p className="mt-1 text-xs text-(--color-text-muted)">{avgRpeLabel === '—' ? '—' : formatDelta(avgRpeNumber, previousAvgRpe)}</p>
          </Card>
        </div>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className={sectionTitleClass}>{chartMetric === 'volume' ? 'Volume' : 'Séances'}<br />Semaine</h2>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() =>
                  setChartMetric('volume')
                }
                className={chartMetric === 'volume'
                  ? 'h-8 rounded-xl bg-(--color-primary) px-3 text-xs font-semibold text-white'
                  : 'h-8 rounded-xl bg-(--color-surface-muted) px-3 text-xs font-semibold text-(--color-text-muted)'
                }
              >
                Volume
              </button>
              <button
                type="button"
                onClick={() =>
                  setChartMetric('sessions')
                }
                className={chartMetric === 'sessions'
                  ? 'h-8 rounded-xl bg-(--color-primary) px-3 text-xs font-semibold text-white'
                  : 'h-8 rounded-xl bg-(--color-surface-muted) px-3 text-xs font-semibold text-(--color-text-muted)'
                }
              >
                Séances
              </button>
            </div>
          </div>

          <div className="mt-4 grid gap-2" style={{ gridTemplateColumns: `repeat(${periodWeeks}, minmax(0, 1fr))` }}>
            {currentWeekStats.map((week) => {
              const value =
                chartMetric === 'volume'
                  ? week.volume
                  : week.sessions

              const ratio =
                value /
                maxWeekValue

              const height = Math.max(
                Math.round(ratio * 96),
                value > 0
                  ? 10
                  : 4,
              )

              return (
                <div key={week.key} className="flex flex-col items-center gap-2">
                  <div className="overflow-hidden max-w-8 flex h-24 w-full items-end justify-center rounded-2xl bg-(--color-surface-muted)">
                    <div className="w-full rounded-full bg-(--color-primary)" style={{ height }} />
                  </div>
                  <span className="text-[10px] text-(--color-text-muted)">{week.label}</span>
                </div>
              )
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between">
            <h2 className={sectionTitleClass}>Records par lift</h2>
            <p className="text-xs text-(--color-text-muted)">Record charge</p>
          </div>

          <div className="mt-4 space-y-3">
            {(Object.keys(byType) as LiftType[]).map((type) => (
              <div key={type} className="flex items-center justify-between rounded-2xl bg-(--color-surface-muted) px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-(--color-text)">{liftLabels[type]}</p>
                  <p className="text-xs text-(--color-text-muted)">{byType[type].sessions} séances</p>
                </div>

                <p className="text-sm font-bold text-(--color-primary)">{byType[type].pr} kg</p>
              </div>
            ))}
          </div>
        </Card>

        {topLiftType && (
          <Card>
            <p className={sectionTitleClass}>Lift favori</p>
            <p className="mt-2 text-lg font-bold text-(--color-text)">{liftLabels[topLiftType]}</p>
            <p className="mt-1 text-sm text-(--color-text-muted)">{byType[topLiftType].sessions} séances • {Math.round(byType[topLiftType].volume)} kg</p>
          </Card>
        )}
      </div>
    </AppLayout>
  )
}

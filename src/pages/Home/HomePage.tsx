import { AppLayout } from '@/components/layout/AppLayout'
import { useMemo } from 'react'

import { useApp } from '@/store/useApp'

import { DailyMantraCard } from '@/features/mantras/components/DailyMantraCard'

import { LiftListSection } from '@/features/lifts/components/LiftListSection'

import { TodayLiftSection } from '@/features/lifts/components/TodayLiftSection'

import { getTodayLifts } from '@/features/lifts/utils/getTodayLifts'
import { formatDate } from '@/utils/date'

const HOME_LIST_LIMIT = 5

export function HomePage() {
  const { lifts } = useApp()

  const {
    todayLifts,
    upcomingLifts,
    latestLifts,
  } = useMemo(() => {
    const today = formatDate(
      new Date(),
    )

    const todayLifts =
      getTodayLifts(lifts)

    const upcomingLifts = lifts
      .filter(
        (lift) =>
          lift.date > today,
      )
      .sort((a, b) =>
        a.date.localeCompare(
          b.date,
        ),
      )
      .slice(0, HOME_LIST_LIMIT)

    const latestLifts = lifts
      .filter(
        (lift) =>
          lift.date < today,
      )
      .sort((a, b) =>
        b.date.localeCompare(
          a.date,
        ),
      )
      .slice(0, HOME_LIST_LIMIT)

    return {
      todayLifts,
      upcomingLifts,
      latestLifts,
    }
  }, [lifts])

  return (
    <AppLayout>
      <div className="space-y-1 px-5">
        <div className="pb-0 pt-5 mb-5">
          <DailyMantraCard />
        </div>

        <TodayLiftSection
          lifts={todayLifts}
        />

        <LiftListSection
          title="Prochains lifts"
          lifts={upcomingLifts}
          emptyMessage="Aucun lift à venir"
        />

        <LiftListSection
          title="Derniers lifts"
          lifts={latestLifts}
          emptyMessage="Aucun lift passé"
        />
      </div>
    </AppLayout>
  )
}

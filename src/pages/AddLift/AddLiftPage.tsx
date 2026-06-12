import { AppLayout } from '@/components/layout/AppLayout'

import { LiftForm } from '@/features/lifts/components/LiftForm'

export function AddLiftPage() {
  return (
    <AppLayout title="Nouveau lift">
      <LiftForm mode="create" />
    </AppLayout>
  )
}

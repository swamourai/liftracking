import { useParams } from 'react-router-dom'

import { AppLayout } from '@/components/layout/AppLayout'

import { useApp } from '@/store/useApp'

import { LiftForm } from '@/features/lifts/components/LiftForm'

export function EditLiftPage() {
  const { id } = useParams()

  const { lifts } = useApp()

  const lift = lifts.find(
    (item) => item.id === id,
  )

  if (!lift) {
    return null
  }

  return (
    <AppLayout showBackButton>
      <LiftForm
        mode="edit"
        initialLift={lift}
      />
    </AppLayout>
  )
}
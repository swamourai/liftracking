import type { ReactNode } from 'react'

import { useNavigate } from 'react-router-dom'

import { BottomTabBar } from '@/components/navigation/BottomTabBar'
import { HeaderBar } from '@/components/layout/HeaderBar'

interface Props {
  children: ReactNode

  title?: string

  showBackButton?: boolean
}

export function AppLayout({
  children,
  title,
  showBackButton = false,
}: Props) {
  const navigate = useNavigate()

  return (
    <div
      className="relative h-dvh overflow-hidden bg-linear-to-b from-(--color-bg-soft) to-(--color-bg)"
    >
      <div
        className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-(--color-surface)/70 backdrop-blur-xl"
      >
        <div
          className="mx-auto w-full max-w-screen-sm py-3"
        >
          <HeaderBar
            title={title}
            showBackButton={showBackButton}
            onBack={() => navigate(-1)}
          />
        </div>
      </div>

      <main
        className="mx-auto h-full w-full max-w-screen-sm overflow-y-auto overscroll-y-contain pt-16 pb-28"
      >
        {children}
      </main>

      <BottomTabBar />
    </div>
  )
}
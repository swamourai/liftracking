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
      className="bg-gradient-to-b from-(--color-bg-soft) to-(--color-bg)"
    >
      <div
        className="sticky top-0 z-50 border-b border-black/5 bg-(--color-surface)/70 backdrop-blur-xl"
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
        className="mx-auto w-full max-w-screen-sm pb-28"
      >
        {children}
      </main>

      <BottomTabBar />
    </div>
  )
}
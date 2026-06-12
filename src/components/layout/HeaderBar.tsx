import { ChevronLeft } from 'lucide-react'

import logo from '@/assets/images/logo/logo.webp'

interface Props {
  title?: string

  showBackButton?: boolean

  onBack?: () => void
}

export function HeaderBar({
  showBackButton = false,
  onBack,
}: Props) {
  return (
    <header
      className="relative flex items-center justify-between px-5 h-10"
    >
      <div className="w-10">
        {showBackButton && (
          <button
            onClick={onBack}
            className="flex h-12 w-12 items-center justify-center rounded-full text-(--color-text)"
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      <div
        className="absolute left-1/2 -translate-x-1/2"
      >
        <img
          src={logo}
          alt="SL Tracking"
          className="h-7 w-auto object-contain"
        />
      </div>

      <div className="flex w-10 justify-end">
      </div>
    </header>
  )
}
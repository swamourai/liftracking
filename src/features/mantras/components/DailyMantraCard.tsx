import { Quote } from 'lucide-react'

import { getDailyMantra } from '../utils/getDailyMantra'

export function DailyMantraCard() {
  const mantra = getDailyMantra()

  return (
    <div
      className="relative overflow-hidden rounded-[32px] bg-white p-4 shadow-sm backdrop-blur-sm"
    >
      <Quote
        size={120}
        strokeWidth={1.2}
        className="absolute -right-6 -top-6 text-[#A855F7]/10"
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3">
          <img
            src={mantra.image}
            alt={mantra.author}
            className="h-14 w-14 rounded-2xl object-cover"
          />

          <div>
            <p
              className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A855F7]"
            >
              Mantra du jour
            </p>

            <p
              className="mt-1 text-sm font-medium text-black/50"
            >
              {mantra.author}
            </p>
          </div>
        </div>

        <p
          className="mt-4 text-[18px] font-medium leading-relaxed tracking-[-0.02em] text-[#111827]"
        >
          “{mantra.quote}”
        </p>
      </div>
    </div>
  )
}

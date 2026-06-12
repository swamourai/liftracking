import {
  Calendar,
  ChartColumn,
  CirclePlus,
  House,
  User,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const tabs = [
  {
    to: '/',
    icon: House,
  },
  {
    to: '/calendar',
    icon: Calendar,
  },
  {
    to: '/add',
    icon: CirclePlus,
    isPrimary: true,
  },
  {
    to: '/stats',
    icon: ChartColumn,
  },
  {
    to: '/account',
    icon: User,
  },
]

export function BottomTabBar() {
  return (
    <div
      className="fixed bottom-5 left-0 right-0 z-50 px-5"
    >
      <div
        className="mx-auto flex w-full max-w-screen-sm items-center justify-between rounded-full bg-[#6F6875]/95 px-5 py-3 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-xl"
      >
        {tabs.map((tab) => {
          const Icon = tab.icon

          return (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `
                flex h-12 w-12
                items-center justify-center
                rounded-full
                transition-all duration-200

                ${tab.isPrimary
                  ? `
                      scale-110
                      bg-[#A855F7]
                      text-white
                      shadow-lg
                    `
                  : isActive
                    ? `
                      bg-white
                      text-[#A855F7]
                    `
                    : `
                      text-white
                    `
                }
              `
              }
            >
              <Icon size={22} />
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}
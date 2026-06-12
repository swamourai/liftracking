import { createBrowserRouter } from 'react-router-dom'

import { AppErrorPage } from '@/pages/Error/AppErrorPage'

const errorElement =
  <AppErrorPage />

export const router = createBrowserRouter(
  [
    {
      path: '/',
      errorElement,
      lazy: async () => {
        const module = await import(
          '@/pages/Home/HomePage'
        )

        return {
          Component:
            module.HomePage,
        }
      },
    },
    {
      path: '/calendar',
      errorElement,
      lazy: async () => {
        const module = await import(
          '@/pages/Calendar/CalendarPage'
        )

        return {
          Component:
            module.CalendarPage,
        }
      },
    },
    {
      path: '/add',
      errorElement,
      lazy: async () => {
        const module = await import(
          '@/pages/AddLift/AddLiftPage'
        )

        return {
          Component:
            module.AddLiftPage,
        }
      },
    },
    {
      path: '/stats',
      errorElement,
      lazy: async () => {
        const module = await import(
          '@/pages/Stats/StatsPage'
        )

        return {
          Component:
            module.StatsPage,
        }
      },
    },
    {
      path: '/account',
      errorElement,
      lazy: async () => {
        const module = await import(
          '@/pages/Account/AccountPage'
        )

        return {
          Component:
            module.AccountPage,
        }
      },
    },
    {
      path: '/lifts/:id',
      errorElement,
      lazy: async () => {
        const module = await import(
          '@/pages/LiftDetails/LiftDetailsPage'
        )

        return {
          Component:
            module.LiftDetailsPage,
        }
      },
    },
    {
      path: '/lifts/:id/edit',
      errorElement,
      lazy: async () => {
        const module = await import(
          '@/pages/EditLift/EditLiftPage'
        )

        return {
          Component:
            module.EditLiftPage,
        }
      },
    },
  ],
  {
    basename:
      import.meta.env.BASE_URL,
  },
)
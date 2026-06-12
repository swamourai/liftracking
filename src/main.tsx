import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  RouterProvider,
} from 'react-router-dom'

import { router } from '@/app/router'

import { AppProvider } from '@/store/AppProvider'
import { ToastProvider } from './store/ToastProvider'

ReactDOM.createRoot(
  document.getElementById('root')!,
).render(
  <React.StrictMode>
    <AppProvider>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </AppProvider>
  </React.StrictMode>,
)
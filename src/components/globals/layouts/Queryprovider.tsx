'use client'

import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment'
import moment from 'moment'
import 'moment/locale/id'
import { IdleTimerProvider } from 'react-idle-timer'
import { useRouter } from 'next/navigation'
import ModalConfirm from '../modal/ModalConfirm'

interface IProps {
  children: React.ReactNode
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

const locales = ['id']
type LocaleKey = (typeof locales)[number]

export default function QueryProvider({ children }: IProps) {
  const router = useRouter()
  const locale: LocaleKey = 'id'

  if (moment.locale() !== locale) {
    moment.locale(locale)
  }

  return (
    <>
      <IdleTimerProvider timeout={1000 * 60 * 60 * 2}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <LocalizationProvider
              dateAdapter={AdapterMoment}
              adapterLocale={locale}
            >
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                theme="colored"
              />
              <ModalConfirm />
              {/* {hasMounted ? children : null} */}
              {children}
              <ReactQueryDevtools />
            </LocalizationProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </IdleTimerProvider>
    </>
  )
}

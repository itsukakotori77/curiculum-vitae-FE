'use client'

import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import moment from 'moment'
import 'moment/locale/id'
import { IdleTimerProvider } from 'react-idle-timer'
import { useRouter } from 'next/navigation'


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

export default function QueryProvider({children}: IProps) {
   const router = useRouter()
   const locale: LocaleKey = 'id'

   if (moment.locale() !== locale) {
      moment.locale(locale)
   }
   const [hasMounted, setHasMounted] = useState<boolean>(false)

   //   useEffect(() => {
   //     const getModelFaceDetector = async () => {
   //       const MODEL_URL = '/models'
   //       await faceapi.loadSsdMobilenetv1Model(MODEL_URL)
   //     }
   //     getModelFaceDetector()
   //     setHasMounted(true)
   //   }, [])
   return (
      <>
         <IdleTimerProvider timeout={1000 * 60 * 60 * 2}>
            <QueryClientProvider client={queryClient}>
               <RecoilRoot>
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
                  {/* <ModalConfirmation /> */}
                  {/* {hasMounted ? children : null} */}
                  {children}
                  <ReactQueryDevtools />
               </RecoilRoot>
            </QueryClientProvider>
         </IdleTimerProvider>
      </>
   )
}

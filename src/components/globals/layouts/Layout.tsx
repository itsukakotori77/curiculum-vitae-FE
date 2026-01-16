import React from 'react'
import Navbar from './Navbar'
import Loading from '../UI/Loading'

interface IProps {
  title?: string
  children: React.ReactNode
  useHeader?: boolean
}

export default function Layout({
  title,
  children,
  useHeader = true,
}: IProps) {
  return (
    <>
      {/* <Loading isLoading/> */}
      <div className="w-full h-screen flex flex-col" id="outer-container">
        {useHeader && <Navbar />}
        <main className="flex-1 overflow-y-auto" id="page-wrap">
          <span className="text-lg">{title}</span>
          {children}
        </main>
      </div>
    </>
  )
}

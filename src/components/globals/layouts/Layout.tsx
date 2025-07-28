import React from 'react'
import Navbar from './Navbar'

interface IProps {
   title?: string
   children: React.ReactNode
   useHeader?: boolean
}

export default function Layout({ title, children, useHeader = true }: IProps) {
   return (
      <div className="w-full h-screen flex flex-col">
         {useHeader && (
            <Navbar />
         )}
         <main className="flex-1 overflow-y-auto">
            <span className="text-lg">{title}</span>
            {children}
         </main>
      </div>
   )
}

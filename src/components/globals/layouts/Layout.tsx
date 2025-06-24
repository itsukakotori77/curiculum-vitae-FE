import React from 'react'
import Navbar from './Navbar'

interface IProps {
   title?: string
   children: React.ReactNode
}

export default function Layout({ title, children }: IProps) {
   return (
      <div className="w-full h-screen flex flex-col">
         <Navbar />
         <main className="flex-1 overflow-y-auto">
            <span className="text-lg">{title}</span>
            {children}
         </main>
      </div>
   )
}

import React from 'react'
import Navbar from './Navbar'

interface IProps {
   title?: string
   children: React.ReactNode
}

export default function Layout({ title, children }: IProps) {
   return (
      <main className="w-full h-screen">
         <span className="text-lg">{title}</span>
         <Navbar />
         {children}
      </main>
   )
}

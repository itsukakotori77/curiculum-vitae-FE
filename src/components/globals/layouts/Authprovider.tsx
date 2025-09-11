'use client'
import { SessionProvider } from 'next-auth/react'

interface Props {
  children: React.ReactNode
  session?: any
}

export default function AuthProvider({ children, session }: Props) {
  return (
    <SessionProvider 
      session={session}
      basePath="/api/v1/auth"
    >
      {children}
    </SessionProvider>
  )
}
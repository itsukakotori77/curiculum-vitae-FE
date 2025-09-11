'use client'
import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const { data: session, status } = useSession()
  const router = useRouter()

  const logout = async () => {
    // Clear legacy cookie
    document.cookie = 'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    
    // Sign out from NextAuth
    await signOut({ 
      callbackUrl: '/auth/signin',
      redirect: true 
    })
  }

  const getToken = () => {
    // Prefer NextAuth token
    if (session?.accessToken) {
      return session.accessToken
    }
    
    // Fallback to legacy cookie
    const cookies = document.cookie.split(';')
    const accessTokenCookie = cookies.find(cookie => 
      cookie.trim().startsWith('accessToken=')
    )
    
    if (accessTokenCookie) {
      return accessTokenCookie.split('=')[1]
    }
    
    return null
  }

  return {
    user: session?.user,
    session,
    isLoading: status === 'loading',
    isAuthenticated: !!session || !!getToken(),
    token: getToken(),
    logout
  }
}
import { getServerSession } from 'next-auth'
import { authOptions } from '@/libs/auth'
import { cookies } from 'next/headers'
import { jwtDecode } from 'jwt-decode'

export async function getAuthToken() {
  // Try NextAuth session first
  const session = await getServerSession(authOptions)
  if (session?.accessToken) {
    return session.accessToken
  }

  // Fallback to legacy cookie
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')?.value

  if (accessToken) {
    try {
      const decoded = jwtDecode(accessToken)
      const currentTime = Math.floor(Date.now() / 1000)

      if (decoded.exp && decoded.exp > currentTime) {
        return accessToken
      }
    } catch (error) {
      console.error('Invalid access token:', error)
    }
  }

  return null
}

export async function requireAuth() {
  const token = await getAuthToken()
  if (!token) {
    throw new Error('Unauthorized')
  }
  return token
}

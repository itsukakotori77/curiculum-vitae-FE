// libs/auth.ts
import { NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { API_URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'
import { jwtDecode } from 'jwt-decode'

const fetch = httpRequest(API_URL!)

export const authOptions: NextAuthOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const params = {
            username: credentials.email,
            password: credentials.password,
          }

          const res = await fetch.post(`/auth/login`, params)

          if (res?.data?.data?.token) {
            const decoded = jwtDecode(res.data.data.token) as any

            return {
              id: decoded.sub || decoded.id,
              email: credentials.email,
              name: decoded.name || credentials.email,
              accessToken: res.data.data.token,
            }
          }

          return null
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        try {
          // Send Google user data to your backend
          const googleAuthData = {
            email: user.email,
            name: user.name,
            googleId: user.id,
            provider: 'google',
          }

          const res = await fetch.post(`/auth/google-login`, googleAuthData)

          if (res?.data?.data?.token) {
            // Store the token from your backend
            user.accessToken = res.data.data.token
            return true
          }

          return false
        } catch (error) {
          console.error('Google auth error:', error)
          return false
        }
      }

      return true
    },

    async jwt({ token, user, account }) {
      if (user) {
        token.accessToken = user.accessToken
        token.id = user.id
      }

      return token
    },

    async session({ session, token }) {
      // Send properties to the client
      session.accessToken = token.accessToken as string
      session.user.id = token.id as string

      return session
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
}

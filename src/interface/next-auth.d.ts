import NextAuth, { DefaultSession } from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      id: string
    } & DefaultSession['user']
  }

  interface User {
    id: string
    accessToken?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id?: string
    accessToken?: string
  }
}

declare module 'next-auth/adapters' {
  interface AdapterUser {
    accessToken?: string
  }
}

import { API_URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

const fetch = httpRequest(API_URL!)

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const token = searchParams.get('token')
  const error = searchParams.get('error')

  // Handle error from backend
  if (error) {
    return NextResponse.redirect(
      new URL(`/?error=google_auth_failed`, request.url)
    )
  }

  // Handle successful authentication
  if (token) {
    try {
      const { exp } = jwtDecode(token)

      // Set cookie
      ;(await cookies()).set('accessToken', token, {
        expires: new Date(exp! * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

      return NextResponse.redirect(new URL('/?success=login', request.url))
    } catch (error) {
      return NextResponse.redirect(
        new URL(`/?error=invalid_token`, request.url)
      )
    }
  }

  return NextResponse.redirect(new URL('/', request.url))
}

export async function POST(request: Request) {
  const body = await request.json()
  const { email, password } = body
  const params = { username: email, password }

  try {
    const res = await fetch.post(`/auth/login`, params)
    const { exp } = jwtDecode(res?.data?.data?.token)

    if (res?.data?.data?.token) {
      ;(await cookies()).set('accessToken', res?.data?.data?.token, {
        expires: new Date(exp! * 1000),
      })
    }

    return NextResponse.json(res?.data, { status: res?.data?.status })
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status ?? 400,
    })
  }
}

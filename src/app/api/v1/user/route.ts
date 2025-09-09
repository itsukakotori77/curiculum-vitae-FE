import { API_URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

const fetch = httpRequest(API_URL!)

export async function GET(request: Request) {}

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

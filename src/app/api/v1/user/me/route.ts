import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { jwtDecode } from 'jwt-decode'

export async function GET(request: Request) {
  const token = (await cookies()).get('accessToken')

  if (!token) {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }

  try {
    const payload = jwtDecode(token?.value)

    return NextResponse.json({
      authenticated: true,
      user: payload,
    })
  } catch {
    return NextResponse.json({ authenticated: false }, { status: 401 })
  }
}

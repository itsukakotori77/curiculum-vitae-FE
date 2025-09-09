import { API_URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const token = (await cookies()).get('accessToken')
  const fetch = httpRequest(API_URL!, token?.value)

  try {
    const res = await fetch.post(`/curiculum-setting/create`, body)

    return NextResponse.json(res?.data, { status: res?.data?.status })
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status ?? 400,
    })
  }
}

import { API_URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const token = (await cookies()).get('accessToken')
  const fetch = httpRequest(API_URL!, token?.value)

  try {
    const res = await fetch.get('/curiculum-vitae/getAll')

    return NextResponse.json(res?.data, {
      status: res?.data?.status,
    })
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status ?? 400,
    })
  }
}

export async function POST(request: Request) {
  const token = (await cookies()).get('accessToken')
  const body = await request.json()

  try {
    const fetch = httpRequest(API_URL!, token?.value)
    const res = await fetch.post(`/curiculum-vitae/create`, body)

    return NextResponse.json(res?.data, {
      status: res?.data?.status,
    })
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status ?? 400,
    })
  }
}

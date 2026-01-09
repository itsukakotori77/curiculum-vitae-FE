import httpRequest from '@/libs/httpsRequest'
import { NextResponse } from 'next/server'
import { API_URL } from '@/libs/constants'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const token = (await cookies()).get('accessToken')
  const fetch = httpRequest(API_URL!, token?.value)
  const url = new URL(request.url)
  const params = Object.fromEntries(url.searchParams)
  const id = url.searchParams.get('id')

  console.log('Received params:', params) 
  console.log('URL searchParams:', url.searchParams.toString())
  
  try {
    if (id) {
      const res = await fetch.get(`/curiculum-template/getOne/${id}`)
      return NextResponse.json(res?.data, {
        status: res?.data?.status,
      })
    }

    const res = await fetch.get('/curiculum-template/getAll', { params })
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
  const fetch = httpRequest(API_URL!, token?.value)

  try {
    const body = await request.json()
    const res = await fetch.post('/curiculum-template/create', body)

    return NextResponse.json(res?.data, {
      status: res?.data?.status,
    })
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status ?? 400,
    })
  }
}

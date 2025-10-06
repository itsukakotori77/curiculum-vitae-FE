import { API_URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')
  const token = (await cookies()).get('accessToken')
  const fetch = httpRequest(API_URL!, token?.value)

  try {
    if (id) {
      const res = await fetch.get(`/file-manager/getOne/${id}`)
      return NextResponse.json(res?.data, {
        status: res?.data?.status,
      })
    }

    const params = Object.fromEntries(url.searchParams)
    const res = await fetch.get(`/file-manager/getAll`, { params })

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
    const body = await request.formData()
    const res = await fetch.post(`/file-manager/create`, body, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return NextResponse.json(res?.data, {
      status: res?.data?.status,
    })
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error?.response?.data ?? 400,
    })
  }
}

export async function DELETE(request: Request) {
  const token = (await cookies()).get('accessToken')
  const fetch = httpRequest(API_URL!, token?.value)
  const body = await request.json()

  const params = {
    id: +body.id,
    public_id: String(body.public_id),
    folder: String(body.folder),
    resourceType: String(body.resourceType)
  }

  try {
    const res = await fetch.delete(`/file-manager/delete`, {
      data: params
    })

    return NextResponse.json(res?.data, { status: res?.data?.status })
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, {
      status: error?.response?.status ?? 400,
    })
  }
}

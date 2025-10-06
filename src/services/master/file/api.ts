import { URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'

const api = httpRequest(URL!)

export async function apiGetFile(params: any) {
  const res = api.get<any, any>(`/api/v1/master/file`, {
    params: params,
  })

  return res
}

export async function apiGetFileById(id: number) {
  const res = await api.get<any, any>(`/api/v1/master/file`, {
    params: { id: id },
  })

  return res
}

export async function apiPostFile(body: any) {
  const res = await api.post<any, any>(`/api/v1/master/file`, body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return res
}

export async function apiDeleteFile(body: any) {
  const res = await api.delete<any, any>(`/api/v1/master/file`, {
    data: body,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return res
}

import { URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'

const api = httpRequest(URL!)

export async function apiGetListTemplate(params: any) {
  const res = await api.get<any, any>(`/api/v1/template`, { params })

  return res
}

export async function apiGetDetailTemplate(id: number | string) {
  const res = await api.get<any, any>(`/api/v1/template`, { params: { id } })

  return res
}

export async function apiPostTemplate(params: any) {
  const res = await api.post<any, any>(`/api/v1/template`, params)

  return res
}

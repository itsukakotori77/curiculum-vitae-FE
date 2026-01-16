import { URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'

const api = httpRequest(URL!)

export async function apiPostLogin(params: any) {
  const res = await api.post<any, any>(`/api/v1/user`, params)

  return res
}

export async function apiGetIsLogin(params?: any) {
  const { data } = await api.get<any, any>(`/api/v1/user/me`, params)

  console.log('response', data)
  return data
}

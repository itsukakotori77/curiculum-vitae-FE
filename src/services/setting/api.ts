import { URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'

const api = httpRequest(URL!)

export async function apiPostSetting(params: any) {
  const res = await api.post<any, any>(`/api/v1/setting`, params)

  return res
}

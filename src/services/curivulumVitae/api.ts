import { URL } from '@/libs/constants'
import httpRequest from '@/libs/httpsRequest'

const api = httpRequest(URL!)

export async function apiGetById(id: number) {
  const res = await api.get<any, any>(`/api/v1/curiculumVitae`, {
    params: { id },
  })

  return res
}

export async function apiPostCurr(payload: any) {
  const res = await api.post<any, any>(
    `/api/v1/curiculumVitae`,
    payload,
  )

  return res
}

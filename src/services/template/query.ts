import { useQuery } from '@tanstack/react-query'
import { apiGetDetailTemplate, apiGetListTemplate } from './api'

export function useGetDetailTemplate(id: number, options?: any) {
  return useQuery({
    queryKey: ['Detail Template', id],
    queryFn: async () => {
      const { data } = await apiGetDetailTemplate(+id)

      return data
    },
    ...options,
  })
}

export async function useGetListTempalte(params: any, enabled?: boolean) {
  return useQuery({
    queryKey: ['List Template'],
    queryFn: async () => {
      const data = await apiGetListTemplate(params)

      return data
    },
  })
}

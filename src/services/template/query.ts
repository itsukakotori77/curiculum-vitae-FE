import { useQuery } from '@tanstack/react-query'
import { apiGetDetailTemplate, apiGetListTemplate } from './api'

export async function useGetDetail(id: number, enabled?: boolean) {
  return useQuery({
    queryKey: ['Detail Template'],
    queryFn: async () => {
      const { data } = await apiGetDetailTemplate(+id)

      return data
    },
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

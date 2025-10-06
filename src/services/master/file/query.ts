import { useQuery } from '@tanstack/react-query'
import { apiGetFile, apiGetFileById } from './api'

export async function useGetFile(params: any, enabled?: boolean) {
  return useQuery({
    queryKey: ['Detail File'],
    queryFn: async () => {
      const { data } = await apiGetFile(params)

      return data
    },
    enabled,
  })
}

export async function useGetFileById(id: number, enabled?: boolean) {
  return useQuery({
    queryKey: ['Detail File'],
    queryFn: async () => {
      const { data } = await apiGetFileById(id)

      return data
    },
    enabled,
  })
}

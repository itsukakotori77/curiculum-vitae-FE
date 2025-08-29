import { useQuery } from '@tanstack/react-query'
import { apiGetById } from './api'

export async function useGetCurrById(id: number, enabled?: boolean) {
  return useQuery({
    queryKey: ['Detail Curriculum'],
    queryFn: async () => {
      const { data } = await apiGetById(id)

      return data
    },
    enabled: enabled,
  })
}

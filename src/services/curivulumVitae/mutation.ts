import { useMutation } from '@tanstack/react-query'
import { apiPostCurr } from './api'

export function usePostCurr() {
  return useMutation({
    mutationKey: ['Post Curriculum'],
    mutationFn: async (params: any) => {
      const { data } = await apiPostCurr(params)

      return data
    },
  })
}

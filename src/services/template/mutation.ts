import { useMutation } from '@tanstack/react-query'
import { apiPostTemplate } from './api'

export function usePostTemppate() {
  return useMutation({
    mutationKey: ['Post Template CV'],
    mutationFn: async (params: any) => {
      const { data } = await apiPostTemplate(params)

      return data
    },
  })
}

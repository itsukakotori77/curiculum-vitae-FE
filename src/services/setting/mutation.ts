import { useMutation } from '@tanstack/react-query'
import { apiPostSetting } from './api'

export function usePostSetting() {
  return useMutation({
    mutationKey: ['Post Setting CV'],
    mutationFn: async (params: any) => {
      const { data } = await apiPostSetting(params)

      return data
    },
  })
}

import { useMutation } from '@tanstack/react-query'
import { apiPostLogin } from './api'

export function useLogin() {
  return useMutation({
    mutationKey: ['Login User'],
    mutationFn: async (params) => {
      const { data } = await apiPostLogin(params)

      return data
    },
  })
}

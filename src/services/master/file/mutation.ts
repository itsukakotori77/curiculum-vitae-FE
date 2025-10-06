import { useMutation } from '@tanstack/react-query'
import { apiDeleteFile, apiPostFile } from './api'

export function usePostFile() {
  return useMutation({
    mutationKey: ['Upload File'],
    mutationFn: async (body: any) => {
      const { data } = await apiPostFile(body)

      return data
    },
  })
}

export function useDeleteFile() {
  return useMutation({
    mutationKey: ['Delete File'],
    mutationFn: async (body: any) => {
      const { data } = await apiDeleteFile(body)

      return data
    },
  })
}

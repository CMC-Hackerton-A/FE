import { useMutation, useQueryClient } from '@tanstack/react-query'
import { MEMORIAL_KEYS } from './queryKeys'
import { createMemorialMessage } from './memorialService'
import type { CreateMemorialMessageRequest, CreateMemorialMessageResponse } from '../model/types'

export const useCreateMemorialMessageMutation = () => {
  const queryClient = useQueryClient()

  return useMutation<CreateMemorialMessageResponse, Error, CreateMemorialMessageRequest>({
    mutationFn: createMemorialMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: MEMORIAL_KEYS.MESSAGES })
    },
  })
}
import { useQuery } from '@tanstack/react-query'
import { MEMORIAL_KEYS } from './queryKeys'
import { getMemorialMessages } from './memorialService'
import type { MemorialMessagesResponse } from '../model/types'

export const useGetMemorialMessagesQuery = () => {
  return useQuery<MemorialMessagesResponse>({
    queryKey: MEMORIAL_KEYS.MESSAGES,
    queryFn: getMemorialMessages,
  })
}
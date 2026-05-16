import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'
import type {
  MemorialMessagesResponse,
  CreateMemorialMessageRequest,
  CreateMemorialMessageResponse,
} from '../model/types'

export const getMemorialMessages = async (): Promise<MemorialMessagesResponse> => {
  const { data } = await apiClient.get<ApiResponse<MemorialMessagesResponse>>(
    '/api/memorials/memorial/messages'
  )
  return data.result
}

export const createMemorialMessage = async (
  body: CreateMemorialMessageRequest
): Promise<CreateMemorialMessageResponse> => {
  const { data } = await apiClient.post<ApiResponse<CreateMemorialMessageResponse>>(
    '/api/memorials/memorial/messages',
    body
  )
  return data.result
}
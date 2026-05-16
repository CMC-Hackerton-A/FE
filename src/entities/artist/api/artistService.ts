import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'
import type { ArtistSearchResult, CreateArtistRequest } from '../model/types'

export const searchArtists = async (q: string): Promise<ArtistSearchResult[]> => {
  const { data } = await apiClient.get<ApiResponse<ArtistSearchResult[]>>('/artists/search', {
    params: { q },
  })
  return data.result
}

export const createArtist = async (body: CreateArtistRequest): Promise<ArtistSearchResult> => {
  const { data } = await apiClient.post<ApiResponse<ArtistSearchResult>>('/artists', body)
  return data.result
}
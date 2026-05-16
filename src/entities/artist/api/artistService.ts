import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'
import type {
  ArtistSearchResult,
  CreateArtistRequest,
  DetailResponse,
  TopArtistResponse,
} from '../model/types'

export const getTopArtists = async (): Promise<TopArtistResponse[]> => {
  const { data } = await apiClient.get<ApiResponse<TopArtistResponse[]>>('/artists/top')
  return data.result
}

export const getArtistDetail = async (artistId: number): Promise<DetailResponse> => {
  const { data } = await apiClient.get<ApiResponse<DetailResponse>>(`/artists/${artistId}`)
  return data.result
}

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
import { apiClient } from '@/shared/api/client'
import type { ApiResponse } from '@/shared/api/types'
import type { LastAlbumAndTrackResponse } from '../model/types'

export const getLastAlbumAndTrack = async (
  artistId: number
): Promise<LastAlbumAndTrackResponse> => {
  const { data } = await apiClient.get<ApiResponse<LastAlbumAndTrackResponse>>('/albums/last', {
    params: { artist_id: artistId },
  })
  return data.result
}
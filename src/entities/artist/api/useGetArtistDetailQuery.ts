import { useQuery } from '@tanstack/react-query'
import { ARTIST_KEYS } from './queryKeys'
import { getArtistDetail } from './artistService'
import type { DetailResponse } from '../model/types'

export const useGetArtistDetailQuery = (artistId: number) => {
  return useQuery<DetailResponse>({
    queryKey: ARTIST_KEYS.DETAIL(artistId),
    queryFn: () => getArtistDetail(artistId),
    enabled: artistId > 0,
  })
}
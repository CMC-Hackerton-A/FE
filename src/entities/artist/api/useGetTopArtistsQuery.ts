import { useQuery } from '@tanstack/react-query'
import { ARTIST_KEYS } from './queryKeys'
import { getTopArtists } from './artistService'
import type { TopArtistResponse } from '../model/types'

export const useGetTopArtistsQuery = () => {
  return useQuery<TopArtistResponse[]>({
    queryKey: ARTIST_KEYS.TOP,
    queryFn: getTopArtists,
  })
}
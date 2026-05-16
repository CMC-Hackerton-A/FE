import { useQuery } from '@tanstack/react-query'
import { ARTIST_KEYS } from './queryKeys'
import { searchArtists } from './artistService'
import type { ArtistSearchResult } from '../model/types'

export const useSearchArtistsQuery = (q: string) => {
  return useQuery<ArtistSearchResult[]>({
    queryKey: ARTIST_KEYS.SEARCH(q),
    queryFn: () => searchArtists(q),
    enabled: q.trim().length > 0,
  })
}
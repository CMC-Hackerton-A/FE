import { useQuery } from '@tanstack/react-query'
import { ALBUM_KEYS } from './queryKeys'
import { getLastAlbumAndTrack } from './albumService'
import type { LastAlbumAndTrackResponse } from '../model/types'

export const useGetLastAlbumAndTrackQuery = (artistId: number) => {
  return useQuery<LastAlbumAndTrackResponse>({
    queryKey: ALBUM_KEYS.LAST(artistId),
    queryFn: () => getLastAlbumAndTrack(artistId),
    enabled: artistId > 0,
  })
}
import { useGetTopArtistsQuery } from '@/entities/artist/api/useGetTopArtistsQuery'
import type { TopArtistResponse } from '@/entities/artist/model/types'
import TopArtistCard from './top-artist-card'
import type { TopArtist } from './top-artist-card'

function mapToTopArtist(artist: TopArtistResponse): TopArtist {
  const [start, end] = (artist.activityPeriod ?? '')
    .split('-')
    .map((s) => parseInt(s.trim(), 10))

  return {
    id: artist.artistId,
    name: artist.artistName,
    imageUrl: artist.imageUrl,
    genre: '',
    country: '',
    startYear: isNaN(start) ? 0 : start,
    endYear: isNaN(end) ? 0 : end,
    starCount: artist.starCount,
  }
}

export function TopArtistSection() {
  const { data, isPending, isError } = useGetTopArtistsQuery()

  if (isPending) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="caption1-semibold text-mono-gray-4">불러오는 중...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p className="caption1-semibold text-mono-gray-4">
          데이터를 불러올 수 없어요.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
      {data.map((artist, idx) => (
        <TopArtistCard
          key={artist.artistId}
          rank={idx + 1}
          artist={mapToTopArtist(artist)}
        />
      ))}
    </div>
  )
}

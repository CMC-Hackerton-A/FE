import TopArtistCard from './top-artist-card'
import type { TopArtist } from './top-artist-card'
import MockImg from '@/assets/images/main-beatles.png'

export function TopArtistSection() {
  const topArtists: TopArtist[] = Array.from({ length: 10 }).map((_, idx) => ({
    id: idx + 1,
    name: '비틀즈',
    imageUrl: MockImg,
    genre: '인디밴드',
    country: '미국',
    startYear: 1985,
    endYear: 2014,
    starCount: 10238 - idx * 100,
  }))
  return (
    <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {topArtists.map((artist, idx) => (
          <TopArtistCard key={artist.id} rank={idx + 1} artist={artist} />
        ))}
      </div>
    </div>
  )
}

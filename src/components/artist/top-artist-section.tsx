import TopArtistCard from './top-artist-card'
import type { TopArtist } from './top-artist-card'
import MockImg from '@/assets/images/main-beatles.png'

export default function TopArtistSection() {
  // TODO: 백엔드 연동 시 API 응답으로 교체
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
    <div className="flex h-full w-full flex-col gap-5 rounded-t-[20px] bg-white px-4 py-8 shadow-[0_-4px_20px_0_rgba(17,0,36,0.25)]">
      <h1 className="subtitle7 text-purple-60 shrink-0">
        지금 가장 빛나는 별 TOP 10
      </h1>

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {topArtists.map((artist, idx) => (
          <TopArtistCard key={artist.id} rank={idx + 1} artist={artist} />
        ))}
      </div>
    </div>
  )
}

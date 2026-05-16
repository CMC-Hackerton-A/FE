import TopArtistCard from './top-artist-card'

export default function TopArtistSection() {
  return (
    <div className="flex w-full flex-col gap-5 rounded-t-[20px] bg-white px-4 py-8 shadow-[0_-4px_20px_0_rgba(17,0,36,0.25)]">
      <h1 className="subtitle7 text-purple-60">지금 가장 빛나는 별 TOP 10</h1>

      {/* 카드 리스트 */}
      <div className="flex flex-col gap-3">
        <TopArtistCard />
        <TopArtistCard />
        <TopArtistCard />
        <TopArtistCard />
        <TopArtistCard />
      </div>
    </div>
  )
}

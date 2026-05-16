import TopArtistSection from '@/components/artist/top-artist-section'

export default function HomePage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-white">
      <div className="h-[360px] bg-purple-50"></div>

      <div className="relative z-10 -mt-6 min-h-[calc(100dvh-360px-24px)]">
        <TopArtistSection />
      </div>
    </main>
  )
}
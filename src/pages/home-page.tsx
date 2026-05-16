import TopArtistSection from '@/components/artist/top-artist-section'
import HeroSection from '@/components/main/hero-section'
import Header from '@/components/ui/header'

export default function HomePage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-white">
      <div className="fixed inset-x-0 top-6 z-50 flex justify-center">
        <div className="w-full max-w-[430px] px-4">
          <Header />
        </div>
      </div>
      <HeroSection />

      <div className="relative z-10 -mt-6 min-h-[calc(100dvh-360px-24px)]">
        <TopArtistSection />
      </div>
    </main>
  )
}

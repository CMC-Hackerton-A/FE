import TopArtistSection from '@/components/artist/top-artist-section'
import HeroSection from '@/components/main/hero-section'
import Header from '@/components/ui/header'

export default function HomePage() {
  return (
    <main className="relative h-dvh w-full overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-6 z-50">
        <Header showBackButton={false} />
      </div>
      <HeroSection />

      <div className="relative z-10 -mt-6 h-[calc(60dvh+24px)]">
        <TopArtistSection />
      </div>
    </main>
  )
}
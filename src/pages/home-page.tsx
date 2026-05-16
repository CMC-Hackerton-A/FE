import { useState } from 'react'
import { HeroSection } from '@/components/main/hero-section'
import { HomeContentPanel } from '@/components/main/HomeContentPanel'
import { TopArtistSection } from '@/components/artist/top-artist-section'
import { SearchResultSection } from '@/components/artist/search-result-section'
import Header from '@/components/ui/header'

export default function HomePage() {
  // 검색어
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-6 z-50">
        <Header showBackButton={false} />
      </div>

      <HeroSection onSearch={setSearchQuery} searchedText={searchQuery} />

      <div className="relative z-10 -mt-6 h-[calc(60dvh+24px)]">
        <HomeContentPanel
          title={searchQuery ? '검색 결과' : '지금 가장 빛나는 별 TOP 10'}
        >
          {searchQuery ? (
            <SearchResultSection query={searchQuery} />
          ) : (
            <TopArtistSection />
          )}
        </HomeContentPanel>
      </div>
    </main>
  )
}

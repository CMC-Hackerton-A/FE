import { useState } from 'react'
import { HeroSection } from '@/components/main/hero-section'
import { HomeContentPanel } from '@/components/main/HomeContentPanel'
import { TopArtistSection } from '@/components/artist/top-artist-section'
import { SearchResultSection } from '@/components/artist/search-result-section'
import Header from '@/components/ui/header'
import { useNavigate } from 'react-router'

export default function HomePage() {
  // 검색어
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  const handleSearchSubmit = () => {
    // 현재는 mock 데이터 기준 첫 아티스트(1번)로 이동
    navigate('/active/1')
  }

  const handleSelectArtist = (artistId: number) => {
    navigate(`/active/${artistId}`)
  }

  return (
    <main className="relative h-dvh w-full overflow-hidden bg-white">
      <div className="absolute inset-x-0 top-6 z-50">
        <Header showBackButton={false} />
      </div>

      <HeroSection
        searchedText={searchQuery}
        onSearchChange={setSearchQuery}
        onSearchSubmit={handleSearchSubmit}
      />

      <div className="relative z-10 -mt-6 h-[calc(60dvh+24px)]">
        <HomeContentPanel
          title={searchQuery ? '검색 결과' : '지금 가장 빛나는 별 TOP 10'}
        >
          {searchQuery ? (
            <SearchResultSection
              query={searchQuery}
              onSelectArtist={handleSelectArtist}
            />
          ) : (
            <TopArtistSection />
          )}
        </HomeContentPanel>
      </div>
    </main>
  )
}

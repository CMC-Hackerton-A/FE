import { SearchBar, BackButton } from '@/components/ui/SearchBar'

export default function HomePage() {
  const handleSearch = (query: string) => {
    console.log('검색어:', query)
  }

  return (
    <main className="min-h-screen bg-white">
      <BackButton onClick={() => console.log('뒤로가기')} />
      <SearchBar onSearch={handleSearch} />
    </main>
  )
}

import SearchResultItem from './search-result-item'
import TopArtistCard from './top-artist-card'

interface SearchResultSectionProps {
  query: string
}

export function SearchResultSection({ query }: SearchResultSectionProps) {
  // TODO: useSearchArtistsQuery(query) 로 교체
  return (
    <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
      <SearchResultItem />
      <SearchResultItem />
      <SearchResultItem />
    </div>
  )
}

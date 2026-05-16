import SearchResultItem from './search-result-item'
import XIcon from '@/assets/icons/common/x-icon.svg?react'
interface SearchResultSectionProps {
  query: string
}

export function SearchResultSection({ query }: SearchResultSectionProps) {
  // TODO: useSearchArtistsQuery(query) 로 교체

  const length = 1
  return (
    <>
      {length > 0 ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
            <SearchResultItem />
            <SearchResultItem />
            <SearchResultItem />
            <SearchResultItem />
          </div>
          <div className="flex w-full items-center justify-center">...</div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="body1-medium text-mono-gray-4 flex flex-col items-center gap-2">
            <XIcon />
            아티스트명을 다시 입력해주세요.
          </p>
        </div>
      )}
    </>
  )
}

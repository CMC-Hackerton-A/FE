import SearchResultItem from './search-result-item'
import { Swiper, SwiperSlide } from 'swiper/react'
import XIcon from '@/assets/icons/common/x-icon.svg?react'
import { Pagination } from 'swiper/modules'
import 'swiper/css'

interface SearchResultSectionProps {
  query: string
  onSelectArtist?: (artistId: number) => void
}

export function SearchResultSection({
  query,
  onSelectArtist,
}: SearchResultSectionProps) {
  // TODO: useSearchArtistsQuery(query) 로 교체
  const length = 7

  const mockData = Array.from({ length }, (_, index) => ({
    id: index + 1,
    name: `artist-${index + 1}`,
  }))

  const chunkedData = Array.from(
    { length: Math.ceil(mockData.length / 4) },
    (_, index) => mockData.slice(index * 4, index * 4 + 4)
  )

  return (
    <>
      {mockData.length > 0 ? (
        <div className="flex flex-col gap-5">
          <Swiper slidesPerView={1}>
            {chunkedData.map((slideItems, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                <div className="flex flex-col gap-2">
                  {slideItems.map((artist) => (
                    <SearchResultItem
                      key={artist.id}
                      onClick={() => onSelectArtist?.(artist.id)}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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

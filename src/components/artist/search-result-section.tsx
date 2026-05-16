import SearchResultItem from './search-result-item'
import { Swiper, SwiperSlide } from 'swiper/react'
import XIcon from '@/assets/icons/common/x-icon.svg?react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { useState } from 'react'

interface SearchResultSectionProps {
  query: string
}

export function SearchResultSection({ query }: SearchResultSectionProps) {
  // TODO: useSearchArtistsQuery(query) 로 교체
  const [activeIndex, setActiveIndex] = useState(0)

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
        <div className="flex flex-col gap-5 overflow-hidden">
          <Swiper
            slidesPerView={1}
            className="w-full"
            pagination={{ clickable: true }}
            onSlideChange={(swiper: SwiperType) =>
              setActiveIndex(swiper.activeIndex)
            }
          >
            {chunkedData.map((slideItems, slideIndex) => (
              <SwiperSlide key={slideIndex}>
                <div className="flex flex-col gap-2">
                  {slideItems.map((artist) => (
                    <SearchResultItem key={artist.id} />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="flex w-full items-center justify-center gap-1.5">
            {chunkedData.map((_, i) => (
              <div
                key={i}
                className={`rounded-full transition-all duration-300 ${
                  i === activeIndex
                    ? 'bg-mono-gray-7 size-3' // 활성 — 길쭉한 pill
                    : 'bg-mono-gray-3 size-3' // 비활성 — 작은 원
                }`}
              />
            ))}
          </div>
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

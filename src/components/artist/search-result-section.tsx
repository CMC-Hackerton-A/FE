import SearchResultItem from './search-result-item'
import { Swiper, SwiperSlide } from 'swiper/react'
import XIcon from '@/assets/icons/common/x-icon.svg?react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import { useState } from 'react'
import { useSearchArtistsQuery } from '@/entities/artist/api/useSearchArtistsQuery'

interface SearchResultSectionProps {
  query: string
  onSelectArtist?: (artistId: number) => void
}

export function SearchResultSection({
  query,
  onSelectArtist,
}: SearchResultSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { data, isPending, isError } = useSearchArtistsQuery(query)

  if (isPending) {
    return <div></div>
  }

  if (isError) {
    return <div>에러</div>
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <p className="body1-medium text-mono-gray-4 flex flex-col items-center gap-2">
          <XIcon />
          아티스트명을 다시 입력해주세요.
        </p>
      </div>
    )
  }

  const chunkedData = Array.from(
    { length: Math.ceil(data.length / 4) },
    (_, index) => data.slice(index * 4, index * 4 + 4)
  )

  return (
    <>
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
                  <SearchResultItem
                    artist={artist}
                    key={artist.artistId}
                    onClick={() => onSelectArtist?.(artist.artistId)}
                  />
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
    </>
  )
}

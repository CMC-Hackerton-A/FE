import homeBackground from '@/img/home-background.png'
import { SearchBar } from '../ui/SearchBar'

interface HeroSectionProps {
  searchedText: string
  onSearchChange: (query: string) => void
  onSearchSubmit?: (query: string) => void
}

export function HeroSection({
  onSearchChange,
  onSearchSubmit,
  searchedText,
}: HeroSectionProps) {
  return (
    <div
      className="relative h-[40%] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <div className="absolute inset-x-0 bottom-[50px] flex flex-col gap-4 px-[32px] text-[24px] leading-[132%] text-white">
        <div>
          {searchedText ? (
            <>
              <span className="block font-extralight">
                <span className="font-semibold">'{searchedText}'</span>에 대한
              </span>
              <span className="block font-semibold">검색결과 입니다.</span>
            </>
          ) : (
            <>
              <span className="block font-extralight">그들은 여전히</span>
              <span className="block font-semibold">스타로 남아있다.</span>
            </>
          )}
        </div>
        <SearchBar
          value={searchedText}
          onChange={onSearchChange}
          onSubmit={onSearchSubmit}
        />
      </div>
    </div>
  )
}

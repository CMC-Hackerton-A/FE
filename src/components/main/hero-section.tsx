import homeBackground from '@/assets/images/main-bg.png'
import { SearchBar } from '../ui/SearchBar'

export default function HeroSection() {
  return (
    <div
      className="relative h-[40%] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <div className="absolute inset-x-0 bottom-[50px] flex flex-col gap-4 px-[32px] text-[24px] leading-[132%] text-white">
        <div>
          <span className="block font-extralight">그들은 여전히</span>
          <span className="block font-semibold">스타로 남아있다.</span>
        </div>
        <SearchBar />
      </div>
    </div>
  )
}

import MockImg from '@/assets/images/main-beatles.png'
import { StarIcon } from 'lucide-react'

export default function TopArtistCard() {
  const startYear = 1985
  const endYear = 2024
  const starCnt = 10238

  return (
    <div className="border-mono-gray-2 flex items-center gap-5 rounded-xl border bg-white px-5 py-4">
      <span className="text-pink-40 body1-semibold w-4 shrink-0">1</span>
      <img
        src={MockImg}
        className="h-16 w-16 shrink-0 rounded-sm object-cover"
      />

      {/* 텍스트 영역 — 세로 스택 */}
      <div className="flex flex-col gap-1">
        <h2 className="body1-semibold">{`비틀즈`}</h2>
        <span className="caption4-regular text-mono-gray-6">
          {`${startYear} - ${endYear} , ${endYear - startYear}년`}
        </span>
        {/* 구분선 */}
        <div className="bg-mono-gray-3 my-1 h-[0.5px] w-full" />
        <div className="flex items-center gap-[5px]">
          <StarIcon size={14} className="text-yellow-400" />
          <span className="text-pink-30 text-sm leading-none font-bold">
            {starCnt.toLocaleString()}개
          </span>
        </div>
      </div>
    </div>
  )
}

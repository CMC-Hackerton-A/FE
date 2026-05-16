import MainBeatles from '@/assets/images/main-beatles.png'

interface LastAlbumSectionProps {
  albumTitle: string
  albumYear: string
  songTitle: string
  songYear: string
}

export function LastAlbumSection({
                                   albumTitle,
                                   albumYear,
                                   songTitle,
                                   songYear,
                                 }: LastAlbumSectionProps) {
  return (
    <div className="flex flex-col gap-5 self-stretch border-b border-[#CBCBCB] py-3">
      {/* 마지막 앨범 */}
      <div className="flex flex-col gap-5 self-stretch">
        <span className="font-pretendard text-[17px] leading-none font-semibold text-[#3C1961]">
          마지막 앨범
        </span>

        <div className="flex flex-col items-center justify-center gap-2 self-stretch">
          <img
            src={MainBeatles}
            alt="앨범 표지"
            className="flex size-20 items-center justify-center"
          />

          <div className="flex w-[105px] flex-col items-center justify-center gap-1">
            <span className="font-pretendard text-center text-[16px] leading-[150%] font-semibold text-black">
              {albumTitle}
            </span>

            <span className="font-pretendard text-center text-[13px] leading-none font-normal text-[#353535]">
              {albumYear}
            </span>
          </div>
        </div>
      </div>

      {/* 마지막 곡 */}
      <div className="flex flex-col gap-5 self-stretch">
        <span className="font-pretendard text-[17px] leading-none font-semibold text-[#3C1961]">
          마지막 곡
        </span>

        <div className="flex flex-col items-center justify-center gap-2 self-stretch">
          <img
            src={MainBeatles}
            alt="곡 표지"
            className="flex size-20 items-center justify-center"
          />

          <div className="flex w-[105px] flex-col items-center justify-center gap-1">
            <span className="font-pretendard text-center text-[16px] leading-[150%] font-semibold text-black">
              {songTitle}
            </span>

            <span className="font-pretendard text-center text-[13px] leading-none font-normal text-[#353535]">
              {songYear}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
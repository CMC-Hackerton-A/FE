import MockImg from '@/assets/images/main-beatles.png'

export default function SearchResultItem() {
  const startYear = 1985
  const endYear = 2024

  return (
    <div className="border-mono-gray-2 flex items-center gap-7 rounded-[12px] border px-5 py-4">
      <img className="size-[38px] rounded-sm" src={MockImg} />

      <div className="flex flex-col gap-0.5">
        <h2 className="body1-semibold text-black">비틀즈</h2>
        <span className="caption4-regular text-mono-gray-6">
          {`${startYear} - ${endYear} , ${endYear - startYear}년`}
        </span>
      </div>
    </div>
  )
}

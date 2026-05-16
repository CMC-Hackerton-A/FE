import MockImg from '@/assets/images/main-beatles.png'

interface SearchResultItemProps {
  onClick?: () => void
}

export default function SearchResultItem({ onClick }: SearchResultItemProps) {
  const startYear = 1985
  const endYear = 2024

  return (
    <button
      type="button"
      onClick={onClick}
      className="border-mono-gray-2 flex w-full items-center gap-7 rounded-[12px] border px-5 py-4 text-left"
    >
      <img className="size-[38px] rounded-sm" src={MockImg} />

      <div className="flex flex-col gap-0.5">
        <h2 className="body1-semibold text-black">비틀즈</h2>
        <span className="caption4-regular text-mono-gray-6">
          {`${startYear} - ${endYear} , ${endYear - startYear}년`}
        </span>
      </div>
    </button>
  )
}

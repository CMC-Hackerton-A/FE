import MockImg from '@/assets/images/main-beatles.png'
import type { ArtistSearchResult } from '@/entities/artist/model/types'

interface SearchResultItemProps {
  artist: ArtistSearchResult
  onClick?: () => void
}

export default function SearchResultItem({
  onClick,
  artist,
}: SearchResultItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="border-mono-gray-2 flex w-full items-center gap-7 rounded-[12px] border px-5 py-4 text-left"
    >
      <img className="size-[38px] rounded-sm" src={artist.imageUrl} />

      <div className="flex flex-col gap-0.5">
        <h2 className="body1-semibold text-black">{artist.artistName}</h2>
        <span className="caption4-regular text-mono-gray-6">
          {`${artist.activityPeriod} , ${artist.activityYears}년`}
        </span>
      </div>
    </button>
  )
}

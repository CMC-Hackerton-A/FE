import { Link } from 'react-router'
import MockImg from '@/assets/images/main-beatles.png'
import { StarIcon } from 'lucide-react'

export type TopArtist = {
  id: number
  name: string
  imageUrl: string
  genre: string
  country: string
  startYear: number
  endYear: number
  starCount: number
}

type TopArtistCardProps = {
  rank: number
  artist: TopArtist
}

const FALLBACK_IMAGE = MockImg

export default function TopArtistCard({ rank, artist }: TopArtistCardProps) {
  const duration = artist.endYear - artist.startYear
  return (
    <Link
      to={`/active/${artist.id}`}
      state={{ artist }}
      className="border-mono-gray-2 flex items-center gap-4 rounded-xl border bg-white px-4 py-4 transition hover:shadow-sm active:scale-[0.99]"
    >
      <span className="text-pink-40 body1-semibold w-4 shrink-0">{rank}</span>

      <div className="items-cener flex gap-7">
        <img
          src={artist.imageUrl || FALLBACK_IMAGE}
          alt={artist.name}
          className="size-20 shrink-0 rounded-sm object-cover"
        />

        <div className="inline-flex flex-col justify-center">
          <h2 className="body1-semibold truncate">{artist.name}</h2>
          <span className="caption4-regular text-mono-gray-6 block truncate">
            {`${artist.startYear} - ${artist.endYear}, ${duration}년`}
          </span>
          <div className="bg-mono-gray-3 my-2 h-[0.5px] w-[114px]" />
          <div className="flex items-center gap-[5px]">
            <StarIcon size={14} className="text-yellow-400" />
            <span className="text-pink-30 text-sm leading-none font-bold">
              {artist.starCount.toLocaleString()}개
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

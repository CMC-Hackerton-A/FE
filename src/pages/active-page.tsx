import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { MessageCircle, Star } from 'lucide-react'
import { useQuery } from '@tanstack/react-query'
import { IconButton } from '@/components/ui/icon-button'
import BackIcon from '@/assets/icons/common/back.svg?react'
import beatlesImg from '@/assets/images/main-beatles.png'
import activeBackground from '@/img/active-background.png'
import type { TopArtist } from '@/components/artist/top-artist-card'

type ArtistApiPayload = Partial<{
  id: number | string
  artistId: number | string
  name: string
  artistName: string
  profileImage: string
  imageUrl: string
  genre: string
  country: string
  startYear: number | string
  endYear: number | string
  starCount: number | string
}>

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

function mapArtistPayloadToTopArtist(payload: ArtistApiPayload, fallbackId: number): TopArtist {
  const startYear = Number(payload.startYear ?? 1985)
  const endYear = Number(payload.endYear ?? 2014)

  return {
    id: Number(payload.id ?? payload.artistId ?? fallbackId),
    name: payload.name ?? payload.artistName ?? '비틀즈',
    imageUrl: payload.imageUrl ?? payload.profileImage ?? beatlesImg,
    genre: payload.genre ?? '인디밴드',
    country: payload.country ?? '미국',
    startYear,
    endYear,
    starCount: Number(payload.starCount ?? 0),
  }
}

async function fetchArtistDetail(artistId: number): Promise<TopArtist> {
  const endpointCandidates = [`${API_BASE_URL}/api/artists/${artistId}`, `${API_BASE_URL}/artists/${artistId}`]

  let lastError: Error | null = null

  for (const endpoint of endpointCandidates) {
    try {
      const response = await fetch(endpoint)
      if (!response.ok) {
        throw new Error(`요청 실패: ${response.status}`)
      }

      const json: unknown = await response.json()
      const root = json as { result?: ArtistApiPayload; data?: ArtistApiPayload } & ArtistApiPayload
      const payload = root.result ?? root.data ?? root

      return mapArtistPayloadToTopArtist(payload, artistId)
    } catch (error) {
      lastError = error instanceof Error ? error : new Error('아티스트 정보를 불러오지 못했습니다.')
    }
  }

  throw lastError ?? new Error('아티스트 정보를 불러오지 못했습니다.')
}

export default function ActivePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const artistId = Number(id ?? 0)

  const stateArtist = useMemo<TopArtist | null>(() => {
    const artist = (location.state as { artist?: TopArtist } | null)?.artist
    return artist ?? null
  }, [location.state])

  const { data: apiArtist } = useQuery({
    queryKey: ['artist-detail', artistId],
    queryFn: () => fetchArtistDetail(artistId),
    enabled: Number.isFinite(artistId) && artistId > 0,
  })

  const artist = useMemo<TopArtist>(() => {
    if (apiArtist) return apiArtist
    if (stateArtist) return stateArtist

    return {
      id: artistId,
      name: '비틀즈',
      imageUrl: beatlesImg,
      genre: '인디밴드',
      country: '미국',
      startYear: 1985,
      endYear: 2014,
      starCount: 0,
    }
  }, [apiArtist, artistId, stateArtist])

  const duration = artist.endYear - artist.startYear
  const [starCount, setStarCount] = useState(artist.starCount)

  useEffect(() => {
    setStarCount(artist.starCount)
  }, [artist.starCount])

  return (
    <main
      className="relative h-dvh overflow-hidden bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${activeBackground})` }}
    >
      <div className="relative z-10 flex h-full flex-col px-4 pt-5">
        <div className="flex items-center gap-2">
          <IconButton icon={<BackIcon />} onClick={() => navigate(-1)} />

          <div className="flex flex-1 justify-center">
          <div
  className="
    relative inline-flex h-8 items-center justify-center
    rounded-[50px] bg-[#FEE4EF]
    px-5 py-2.5
    text-[10px] leading-[12px] font-semibold text-[#3E2A69]
    whitespace-nowrap
    after:content-[''] after:absolute
    after:-top-[4px] after:right-[14px]
    after:h-[10px] after:w-[10px]
    after:rotate-45 after:bg-[#FEE4EF]
    after:rounded-[2px]
  "
>
  내 스타에게 메시지를 남겨주세요!
</div>
          </div>

          <IconButton icon={<MessageCircle size={18} />} />
        </div>

        <section className="mt-9 flex flex-1 flex-col items-center overflow-y-auto pb-4">
          <img
            src={artist.imageUrl || beatlesImg}
            alt={artist.name}
            className="h-[182px] w-[270px] max-w-full rounded-2xl object-cover"
          />

          <h1 className="mt-6 text-center text-[22px] leading-[100%] font-semibold">{artist.name}</h1>
          <p className="mt-2 text-center text-[12px] font-medium">{`${artist.genre} / ${artist.country}`}</p>
          <p className="mt-1 text-center text-[20px] leading-[100%] font-bold">
            {`${artist.startYear} - ${artist.endYear}, ${duration}년`}
          </p>

          <button
            type="button"
            onClick={() => setStarCount((prev) => prev + 1)}
            aria-label="별 추가"
            className="mt-16 rounded-full transition-transform active:scale-95"
          >
            <Star className="h-14 w-14 fill-white text-white" />
          </button>

          <p className="mt-3 text-[44px] leading-none font-extrabold">{starCount.toLocaleString()}</p>
          <p className="mt-10 text-sm font-semibold">⭐ 당신의 별이 더해졌어요</p>
        </section>

        <div className="-mx-4 h-[52px] shrink-0 rounded-t-[24px] bg-white">
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-[#d7d7d7]" />
        </div>
      </div>
    </main>
  )
}
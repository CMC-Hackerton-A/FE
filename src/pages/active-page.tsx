import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { MessageCircle, Star } from 'lucide-react'
import { IconButton } from '@/components/ui/icon-button'
import BackIcon from '@/assets/icons/common/back.svg?react'
import beatlesImg from '@/assets/images/main-beatles.png'
import activeBackground from '@/img/active-background.png'
import type { TopArtist } from '@/components/artist/top-artist-card'

export default function ActivePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { id } = useParams()

  const artist = useMemo<TopArtist>(() => {
    const stateArtist = (location.state as { artist?: TopArtist } | null)?.artist
    if (stateArtist) return stateArtist

    // TODO: 상세 API 연결 후 id로 조회한 실제 데이터로 대체
    return {
      id: Number(id ?? 0),
      name: '비틀즈',
      imageUrl: beatlesImg,
      genre: '인디밴드',
      country: '미국',
      startYear: 1985,
      endYear: 2014,
      starCount: 0,
    }
  }, [id, location.state])

  const duration = artist.endYear - artist.startYear
  const [starCount, setStarCount] = useState(artist.starCount)

  return (
    <main
      className="relative h-dvh overflow-hidden bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${activeBackground})` }}
    >
      <div className="relative z-10 flex h-full flex-col px-4 pt-5">
        <div className="flex items-center gap-2">
          <IconButton icon={<BackIcon />} onClick={() => navigate(-1)} />
          <div className="flex flex-1 items-center justify-center gap-2 rounded-[50px] bg-[#FEE4EF] px-5 py-2.5 text-center text-[10px] leading-none font-semibold text-[#5d2a8f]">
            내 스타에게 메시지를 남겨주세요!
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
          <p className="mt-3 text-[44px] leading-none font-extrabold">
            {starCount.toLocaleString()}
          </p>
          <p className="mt-10 text-sm font-semibold">연타해서 별을 더하세요!</p>
        </section>

        <div className="-mx-4 h-[52px] shrink-0 rounded-t-[24px] bg-white">
          <div className="mx-auto mt-3 h-1 w-24 rounded-full bg-[#d7d7d7]" />
        </div>
      </div>
    </main>
  )
}
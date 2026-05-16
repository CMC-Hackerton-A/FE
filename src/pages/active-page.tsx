import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router'
import { MessageCircle, Star } from 'lucide-react'
import { IconButton } from '@/components/ui/icon-button'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { LastAlbumSection } from '@/components/bottom-sheet/last-album-section'
import { useGetArtistDetailQuery } from '@/entities/artist/api/useGetArtistDetailQuery'
import type { DetailResponse } from '@/entities/artist/model/types'
import BackIcon from '@/assets/icons/common/back.svg?react'
import beatlesImg from '@/assets/images/main-beatles.png'
import activeBackground from '@/img/active-background.png'
import type { TopArtist } from '@/components/artist/top-artist-card'

type Sparkle = {
  id: string
  top: number
  left: number
  size: number
  opacity: number
  duration: number
  delay: number
  rotate: number
}

// 100 / 1000 / 10000 단계별 반짝이 개수
const SPARKLE_COUNT_BY_LEVEL = [0, 10, 18, 28] as const
// 단계별 반짝이 최종 크기 배율
const SPARKLE_SIZE_MULTIPLIER_BY_LEVEL = [0, 1.3, 1.65, 2.0] as const

const sparkleKeyframes = `
@keyframes sparkleTwinkle {
  0%, 100% {
    transform: translate(-50%, -50%) scale(0.58) rotate(var(--sparkle-rotate));
    opacity: 0.12;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.12) rotate(var(--sparkle-rotate));
    opacity: var(--sparkle-opacity);
  }
}
`

function createSeededRandom(seed: number) {
  let value = seed >>> 0
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0
    return value / 4294967296
  }
}

function createSparkles(level: number, seed: number): Sparkle[] {
  const count = SPARKLE_COUNT_BY_LEVEL[level] ?? 0
  if (!count) return []

  const random = createSeededRandom(seed + level * 97)

  const minSizeByLevel = [0, 7, 9, 11] as const
  const maxSizeByLevel = [0, 11, 14, 18] as const
  const minSize = minSizeByLevel[level] ?? 6
  const maxSize = maxSizeByLevel[level] ?? 10

  return Array.from({ length: count }, (_, index) => {
    const isHighlight = random() > 0.9
    const baseSize =
      minSize + random() * (maxSize - minSize) + (isHighlight ? level * 2 : 0)

    return {
      id: `sparkle-${level}-${index}`,
      top: 8 + random() * 76,
      left: 4 + random() * 92,
      size: Math.round(baseSize),
      opacity: 0.58 + random() * 0.35,
      duration: 1.1 + random() * 1.8,
      delay: random() * 2.6,
      rotate: Math.round(random() * 360),
    }
  })
}

function mapDetailToTopArtist(detail: DetailResponse): TopArtist {
  const [start, end] = (detail.activityPeriod ?? '')
    .split('-')
    .map((s) => parseInt(s.trim(), 10))

  return {
    id: detail.artistId,
    name: detail.artistName,
    imageUrl: detail.imageUrl,
    genre: detail.genre,
    country: detail.country,
    startYear: isNaN(start) ? 0 : start,
    endYear: isNaN(end) ? 0 : end,
    starCount: detail.starCount,
  }
}

function normalizeStarCount(value: unknown): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
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

  const { data: detailData } = useGetArtistDetailQuery(artistId)

  const artist = useMemo<TopArtist>(() => {
    if (detailData) return mapDetailToTopArtist(detailData)
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
  }, [detailData, artistId, stateArtist])

  const duration = artist.endYear - artist.startYear
  const [starCount, setStarCount] = useState(() =>
    normalizeStarCount(artist.starCount)
  )
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true)

  useEffect(() => {
    setStarCount(normalizeStarCount(artist.starCount))
  }, [artist.starCount])

  const sparkleLevel = useMemo(() => {
    if (starCount >= 10000) return 3
    if (starCount >= 1000) return 2
    if (starCount >= 100) return 1
    return 0
  }, [starCount])

  const sparkleSizeMultiplier =
    SPARKLE_SIZE_MULTIPLIER_BY_LEVEL[sparkleLevel] ?? 1

  const sparkles = useMemo(() => {
    return createSparkles(sparkleLevel, artist.id)
  }, [artist.id, sparkleLevel])

  return (
    <main
      className="relative h-dvh overflow-hidden bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${activeBackground})` }}
    >
      <style>{sparkleKeyframes}</style>

      {sparkles.length > 0 ? (
        <div
          className="pointer-events-none absolute inset-0 z-[5] overflow-hidden"
          aria-hidden="true"
        >
          {sparkles.map((sparkle) => (
            <div
              key={sparkle.id}
              className="absolute will-change-transform"
              style={
                {
                  top: `${sparkle.top}%`,
                  left: `${sparkle.left}%`,
                  width: sparkle.size * sparkleSizeMultiplier,
                  height: sparkle.size * sparkleSizeMultiplier,
                  animation: `sparkleTwinkle ${sparkle.duration}s ease-in-out ${sparkle.delay}s infinite`,
                  filter: `drop-shadow(0 0 ${Math.max(6, Math.round(sparkle.size * sparkleSizeMultiplier * 0.95))}px rgba(255,255,255,0.95))`,
                  ['--sparkle-rotate' as string]: `${sparkle.rotate}deg`,
                  ['--sparkle-opacity' as string]: sparkle.opacity,
                } as CSSProperties
              }
            >
              <svg
                viewBox="0 0 24 24"
                className="h-full w-full fill-white text-white"
              >
                <path d="M12 1.7L14.83 7.44L21.16 8.36L16.58 12.82L17.66 19.12L12 16.14L6.34 19.12L7.42 12.82L2.84 8.36L9.17 7.44L12 1.7Z" />
              </svg>
            </div>
          ))}

          {sparkles.map((sparkle) => (
            <div
              key={`${sparkle.id}-glow`}
              className="absolute rounded-full bg-white/65"
              style={{
                top: `${sparkle.top}%`,
                left: `${sparkle.left}%`,
                width: Math.max(
                  5,
                  Math.round(sparkle.size * sparkleSizeMultiplier * 0.52)
                ),
                height: Math.max(
                  5,
                  Math.round(sparkle.size * sparkleSizeMultiplier * 0.52)
                ),
                transform: 'translate(-50%, -50%)',
                filter: `blur(${Math.max(2, Math.round(sparkle.size * sparkleSizeMultiplier * 0.2))}px)`,
                opacity: Math.min(0.45, sparkle.opacity * 0.6),
                animation: `sparkleTwinkle ${sparkle.duration + 0.15}s ease-in-out ${sparkle.delay}s infinite`,
              }}
            />
          ))}
        </div>
      ) : null}

      <div className="relative z-10 flex h-full flex-col px-4 pt-5 pb-24">
        <div className="flex items-start justify-between">
          <IconButton icon={<BackIcon />} onClick={() => navigate(-1)} />

          <div className="flex items-start gap-2">
            <div className="relative inline-flex h-8 items-center justify-center rounded-[50px] bg-[#FEE4EF] px-5 py-2.5 text-[10px] leading-[12px] font-semibold whitespace-nowrap text-[#3E2A69] after:absolute after:top-1/2 after:-right-[4px] after:h-[7px] after:w-[7px] after:-translate-y-1/2 after:rotate-45 after:rounded-[2px] after:bg-[#FEE4EF] after:content-['']">
              내 스타에게 메시지를 남겨주세요!
            </div>

            <IconButton
              icon={<MessageCircle size={18} />}
              onClick={() => navigate(`/active/${artist.id}/comments`)}
            />
          </div>
        </div>

        <section className="mt-9 flex flex-1 flex-col items-center overflow-y-auto pb-4">
          <img
            src={artist.imageUrl || beatlesImg}
            alt={artist.name}
            className="size-[188px] max-w-full rounded-2xl object-cover"
          />

          <h1 className="mt-6 text-center text-[22px] leading-[100%] font-semibold">
            {artist.name}
          </h1>
          <p className="mt-2 text-center text-[12px] font-medium">{`${artist.genre} / ${artist.country}`}</p>
          <p className="mt-1 text-center text-[20px] leading-[100%] font-bold">
            {`${artist.startYear} - ${artist.endYear}, ${duration}년`}
          </p>

          <button
            type="button"
            onClick={() => {
              setStarCount((prev) => normalizeStarCount(prev) + 1)
            }}
            aria-label="별 추가"
            className="mt-16 rounded-full transition-transform active:scale-95"
          >
            <Star className="h-14 w-14 fill-white text-white" />
          </button>

          <p className="mt-3 text-[44px] leading-none font-extrabold">
            {starCount.toLocaleString()}
          </p>
          <p className="mt-10 text-sm font-semibold">
            ⭐ 당신의 별이 더해졌어요
          </p>
        </section>
      </div>

      <BottomSheet
        isOpen={isBottomSheetOpen}
        onClose={() => setIsBottomSheetOpen(false)}
        title=""
      >
        {() => (
          <div className="pt-1">
            <LastAlbumSection
              albumTitle="Meet the Beatles!"
              albumYear="1985.08"
              songTitle="Introducing... The Beatles"
              songYear="1985.08"
            />
          </div>
        )}
      </BottomSheet>
    </main>
  )
}
import BackIcon from '@/assets/icons/common/back.svg?react'
import { IconButton } from '@/components/ui/icon-button'

interface CommentHeaderProps {
  totalCount: number
  onBack?: () => void
}

export function CommentHeader({ totalCount, onBack }: CommentHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <IconButton
        icon={<BackIcon />}
        onClick={onBack}
      />

      <span className="font-pretendard text-[17px] leading-none font-semibold text-[#3C1961]">
        함께 빛내는 사람들
      </span>

      <span className="font-pretendard text-mono-gray-5 text-[11px] leading-none font-medium">
        총 {totalCount.toLocaleString()}개
      </span>
    </div>
  )
}

import EnterIcon from '@/assets/icons/common/enter-icon.svg?react'
import { IconButton } from '@/components/ui/icon-button'

interface CommentInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: () => void
}

export function CommentInput({ value, onChange, onSubmit }: CommentInputProps) {
  return (
    <div className="flex items-center gap-3 self-stretch bg-white px-7 py-2">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="댓글을 입력해주세요"
        className="bg-mono-gray-2 text-mono-gray-7 flex flex-1 resize-none flex-col justify-center self-stretch rounded-[12px] border border-[#ECECEC] p-4 text-[14px] leading-none font-medium outline-none"
      />

      <IconButton
        icon={<EnterIcon />}
        onClick={onSubmit}
        className="size-[46px] rounded-[50px] border-none bg-[#FF549A] shadow-none"
      />
    </div>
  )
}

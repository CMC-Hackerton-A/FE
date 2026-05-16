import * as React from 'react'
import { cn } from '@/lib/utils'
import BackIcon from '@/assets/icons/common/back.svg?react'
import { IconButton } from '@/components/ui/icon-button'

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    style={{ aspectRatio: '1/1', flexShrink: 0 }}
  >
    <circle
      cx="7.33333"
      cy="7.33333"
      r="5.33333"
      stroke="#431C6C"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11 11.3054L14.3333 14.6388"
      stroke="#431C6C"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const BackButton = ({ onClick }: { onClick?: () => void }) => (
  <IconButton icon={<BackIcon className="text-white" />} onClick={onClick} />
)

interface SearchBarProps {
  placeholder?: string
  onSearch?: (query: string) => void
  className?: string
}

export function SearchBar({
  placeholder = '여전히 빛나고 있는 스타들을 검색하세요',
  onSearch,
  className,
}: SearchBarProps) {
  const [query, setQuery] = React.useState('')

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch?.(query.trim())
    }
  }

  return (
    <div className="flex w-full items-center gap-3 rounded-[12px] bg-white p-3 pr-5">
      <SearchIcon />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="text-mono-gray-4 placeholder:text-mono-gray-4 flex-1 border-none bg-transparent text-xs font-semibold outline-none"
      />
    </div>
  )
}

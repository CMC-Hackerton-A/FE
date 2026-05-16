import * as React from 'react'
import SearchIcon from '@/assets/icons/common/search-icon.svg?react'

interface SearchBarProps {
  value: string
  placeholder?: string
  onChange: (query: string) => void
  onSubmit?: (query: string) => void
  className?: string
}

export function SearchBar({
  value,
  placeholder = '다시 빛낼 스타를 입력하세요.',
  onChange,
  onSubmit,
  className,
}: SearchBarProps) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      onSubmit?.(value.trim())
    }
  }

  return (
    <div className="flex w-full items-center gap-3 rounded-[12px] border border-transparent bg-white p-3 pr-5 transition-all duration-300 focus-within:border-[#E3DDE9] focus-within:shadow-[0_0_0_3px_rgba(227,221,233,0.4),0_0_16px_6px_rgba(227,221,233,0.35)]">
      <SearchIcon />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="text-purple-60 placeholder:text-mono-gray-4 caption1-semibold flex-1 translate-y-px border-none bg-transparent outline-none"
      />
    </div>
  )
}

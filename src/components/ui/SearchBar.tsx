import * as React from 'react'
import { cn } from '@/lib/utils'

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

export const BackIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.444 9.33325L8 13.7773L12.444 18.2226M8 13.7773H20.2227C21.4015 13.7773 22.532 14.2455 23.3655 15.0791C24.1991 15.9126 24.6673 17.0431 24.6673 18.2219C24.6673 19.4007 24.1991 20.5312 23.3655 21.3648C22.532 22.1983 21.4015 22.6666 20.2227 22.6666H19.1107"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export const BackButton = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    aria-label="뒤로가기"
    style={{
      width: '40px',
      height: '40px',
      borderRadius: '50px',
      border: '0.2px solid rgba(255,255,255,0.14)',
      background: 'rgba(255,255,255,0.10)',
      boxShadow: '0 4px 4px 0 rgba(255,255,255,0.10)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}
  >
    <BackIcon />
  </button>
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
    <div
      style={{
        width: '292px',
        padding: '12px 20px 12px 12px',
        borderRadius: '12px',
        backgroundColor: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
      }}
      className={cn(className)}
    >
      <SearchIcon />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="font-pretendard text-mono-gray-4 placeholder:text-mono-gray-4 flex-1 border-none bg-transparent text-xs font-semibold outline-none"
      />
    </div>
  )
}

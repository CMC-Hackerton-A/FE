import { useState } from 'react'
import { useLocation } from 'react-router'
import BackIcon from '@/assets/icons/common/back.svg?react'
import CommentItem from '@/components/comment/comment-item'
import { CommentInput } from '@/components/comment/comment-input'
import { useGetMemorialMessagesQuery } from '@/entities/memorial/api/useGetMemorialMessagesQuery'
import { useCreateMemorialMessageMutation } from '@/entities/memorial/api/useCreateMemorialMessageMutation'

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diff < 60) return '방금 전'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  return `${Math.floor(diff / 86400)}일 전`
}

export function CommentSection() {
  const location = useLocation()
  const artistId = (location.state as { artistId?: number } | null)?.artistId ?? 0

  const [inputValue, setInputValue] = useState('')

  const { data: messages } = useGetMemorialMessagesQuery()
  const { mutate } = useCreateMemorialMessageMutation()

  const handleSubmit = () => {
    if (inputValue.trim().length > 0) {
      mutate({ content: inputValue, artist_id: artistId })
      setInputValue('')
    }
  }

  return (
    <div className="flex h-dvh w-full flex-col">
      <header className="text-purple-60 flex shrink-0 items-center gap-3 px-7 py-10">
        <button className="cursor-pointer" onClick={() => history.back()}>
          <BackIcon />
        </button>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h1 className="subtitle7">함께 빛내는 사람들</h1>
            <span className="text-mono-gray-5 caption3-medium">
              {messages && messages.messages.length > 0 &&
                `총 ${messages.messages.length}개`}
            </span>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-7 pb-4">
        {messages?.messages.map((message) => (
          <CommentItem
            key={message.id}
            comment={message.content}
            day={timeAgo(message.createdAt)}
          />
        ))}
      </div>

      <CommentInput
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default CommentSection
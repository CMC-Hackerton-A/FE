import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { CommentHeader } from '@/components/comment/comment-header'
import { CommentInput } from '@/components/comment/comment-input'

interface Comment {
  id: number
  content: string
  createdAt: string
  artist_id: number
}

function timeAgo(dateStr: string): string {
  const now = new Date()
  const date = new Date(dateStr)
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diff < 60) return '방금 전'
  if (diff < 3600) return `${Math.floor(diff / 60)}분 전`
  if (diff < 86400) return `${Math.floor(diff / 3600)}시간 전`
  return `${Math.floor(diff / 86400)}일 전`
}

export function CommentSection({ onBack }: { onBack?: () => void }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const artistId = Number(id ?? 0)
  const [comments, setComments] = useState<Comment[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!Number.isFinite(artistId) || artistId <= 0) return

    fetch(`/api/memorials/memorial/messages?artist_id=${artistId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess) {
          setComments(data.result.messages)
        }
      })
      .catch((err) => console.error('댓글 불러오기 실패:', err))
  }, [artistId])

  const handleSubmit = async () => {
    const trimmedInput = inputValue.trim()
    if (!trimmedInput || isSubmitting) return
    if (!Number.isFinite(artistId) || artistId <= 0) return

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/memorials/memorial/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: trimmedInput,
          artist_id: artistId,
          artistId,
        }),
      })
      const data = await response.json()

      if (data.isSuccess && data.result) {
        setComments((prev) => [data.result, ...prev])
        setInputValue('')
      }
    } catch (err) {
      console.error('댓글 등록 실패:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="flex flex-col items-center gap-5 self-stretch bg-white px-7"
      style={{
        height: '678px',
        paddingTop: '40px',
        paddingBottom: '20px',
        boxShadow: '0 -4px 20px 0 rgba(17, 0, 36, 0.25)',
      }}
    >
      {/* 헤더 */}
      <div className="flex w-full items-center justify-between">
        <CommentHeader totalCount={comments.length} onBack={onBack ?? (() => navigate(-1))} />
      </div>

      {/* 댓글 목록 */}
      <div className="flex w-full flex-1 flex-col gap-2 overflow-y-auto">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="flex w-[304px] flex-col gap-1 rounded-[12px] border border-[#F3F3F3] bg-[#FEEDF4] p-4"
          >
            <span className="font-pretendard text-mono-gray-5 text-[11px] leading-none font-medium">
              {timeAgo(comment.createdAt)}
            </span>
            <span className="font-pretendard text-mono-gray-7 h-[14px] overflow-hidden text-[14px] leading-none font-medium text-ellipsis whitespace-nowrap">
              {comment.content}
            </span>
          </div>
        ))}
      </div>

      {/* 댓글 입력 */}
      <div className="w-full">
        <CommentInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  )
}

export default CommentSection

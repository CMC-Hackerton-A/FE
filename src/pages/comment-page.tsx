import { useState } from 'react'
import BackIcon from '@/assets/icons/common/back.svg?react'
import CommentItem from '@/components/comment/comment-item'

import { CommentInput } from '@/components/comment/comment-input'

interface Comment {
  id: number
  content: string
  createdAt: string
  artist_id: number
}

const MOCK_COMMENTS: Comment[] = [
  {
    id: 1,
    content: '정말 전설적인 아티스트입니다. 항상 그리워요.',
    createdAt: '2025-05-17T10:00:00Z',
    artist_id: 1,
  },
  {
    id: 2,
    content: '그들의 음악은 시대를 초월해요.',
    createdAt: '2025-05-17T08:30:00Z',
    artist_id: 1,
  },
  {
    id: 3,
    content: '처음 들었을 때가 생각나네요. 추억이에요.',
    createdAt: '2025-05-16T22:00:00Z',
    artist_id: 1,
  },
  {
    id: 4,
    content: '지금도 자주 듣고 있어요. 최고!',
    createdAt: '2025-05-15T14:00:00Z',
    artist_id: 1,
  },
  {
    id: 5,
    content: '이런 아티스트가 다시 나올 수 있을까요.',
    createdAt: '2025-05-10T09:00:00Z',
    artist_id: 1,
  },
  {
    id: 6,
    content: '콘서트에서 직접 봤을 때 정말 감동이었어요.',
    createdAt: '2025-05-09T18:00:00Z',
    artist_id: 1,
  },
  {
    id: 7,
    content: '어릴 때부터 좋아했는데 지금도 변함없어요.',
    createdAt: '2025-05-08T12:00:00Z',
    artist_id: 1,
  },
  {
    id: 8,
    content: '이 아티스트 없이 제 청춘은 없었어요.',
    createdAt: '2025-05-07T20:00:00Z',
    artist_id: 1,
  },
  {
    id: 9,
    content: '앨범 전곡이 다 명곡이에요. 진짜로요.',
    createdAt: '2025-05-06T15:30:00Z',
    artist_id: 1,
  },
  {
    id: 10,
    content: '이름만 들어도 행복해지는 아티스트.',
    createdAt: '2025-05-05T11:00:00Z',
    artist_id: 1,
  },
  {
    id: 11,
    content: '오늘도 플레이리스트에 올려놨어요.',
    createdAt: '2025-05-04T09:00:00Z',
    artist_id: 1,
  },
  {
    id: 12,
    content: '다시 활동했으면 좋겠다는 생각이 가끔 들어요.',
    createdAt: '2025-05-03T22:00:00Z',
    artist_id: 1,
  },
  {
    id: 13,
    content: '해외에서도 인정받은 진짜 레전드.',
    createdAt: '2025-05-02T17:00:00Z',
    artist_id: 1,
  },
  {
    id: 14,
    content: '처음 들었던 순간이 아직도 생생해요.',
    createdAt: '2025-05-01T14:00:00Z',
    artist_id: 1,
  },
  {
    id: 15,
    content: '후배 가수들에게도 큰 영향을 준 아티스트죠.',
    createdAt: '2025-04-30T10:00:00Z',
    artist_id: 1,
  },
]

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
  const [inputValue, setInputValue] = useState('')

  // TODO: useGetMemorialMessagesQuery()로 교체
  const comments = MOCK_COMMENTS

  const handleSubmit = async () => {
    // TODO: useCreateMemorialMessageMutation 연결
    setInputValue('')
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
              총 {comments.length}개
            </span>
          </div>
        </div>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto px-7 pb-4">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment.content}
            day={timeAgo(comment.createdAt)}
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

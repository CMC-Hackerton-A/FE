interface Comment {
  id: number
  content: string
  createdAt: string
}

interface CommentListProps {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="flex flex-col gap-2">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="border-mono-gray-1 flex w-[304px] flex-col gap-1 rounded-[12px] border bg-white p-4"
        >
          <span className="font-pretendard text-mono-gray-5 text-[11px] leading-none font-medium">
            {comment.createdAt}
          </span>

          <span className="font-pretendard text-mono-gray-7 h-[14px] overflow-hidden text-[14px] leading-none font-medium text-ellipsis whitespace-nowrap">
            {comment.content}
          </span>
        </div>
      ))}
    </div>
  )
}

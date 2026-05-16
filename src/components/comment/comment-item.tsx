export default function CommentItem({
  comment,
  day,
}: {
  comment: string
  day: string
}) {
  return (
    <div className="border-mono-gray-1 flex flex-col gap-1 rounded-[12px] border p-4">
      <p className="text-mono-gray-5 button2-medium">{day}</p>
      <span className="">{comment}</span>
    </div>
  )
}

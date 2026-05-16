import { BottomSheet } from '@/components/ui/bottom-sheet'
export default function BottomSheetExamplePage() {
  return (
    <div className="relative h-dvh w-full bg-gray-50">
      {/* 페이지 콘텐츠 */}
      <div className="flex flex-col items-center gap-2 px-4 pt-16 text-center">
        <h1 className="text-xl font-bold text-gray-900">아티스트</h1>
        <p className="text-sm text-gray-400">
          아래 핸들을 위로 스와이프해서 목록을 열어보세요
        </p>
      </div>

      {/* 항상 열린 상태 — peek에서 시작 */}
      <BottomSheet
        isOpen={true}
        onClose={() => {}}
        title="지금 가장 빛나는 별 TOP 10"
      >
        {() => (
          <ul className="flex flex-col gap-3 py-2">
            {Array.from({ length: 10 }, (_, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-xl border border-gray-100 bg-white px-4 py-3"
              >
                <div className="size-10 shrink-0 rounded-full bg-purple-100" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">아티스트 {i + 1}</p>
                  <p className="text-xs text-gray-400">팬 {(i + 1) * 1200}명</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </BottomSheet>
    </div>
  )
}
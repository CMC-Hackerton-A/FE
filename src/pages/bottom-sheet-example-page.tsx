import { useState } from 'react'
import { BottomSheet } from '@/components/ui/bottom-sheet'
import { Button } from '@/components/ui/button'
import type { SnapPoint } from '@/constants/bottom-sheet'

export default function BottomSheetExamplePage() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-xl font-bold text-gray-900">바텀시트 예시</h1>
        <p className="mt-1 text-sm text-gray-500">
          핸들을 드래그하거나 백드롭을 클릭해 닫을 수 있어요
        </p>
      </div>

      <Button onClick={() => setIsOpen(true)}>바텀시트 열기</Button>

      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="아티스트 선택"
      >
        {({ snapTo }: { snapTo: (snap: SnapPoint) => void }) => (
          <div className="flex flex-col gap-4 py-2">
            <p className="text-sm text-gray-500">
              아래로 드래그하면 닫히고, 위로 드래그하면 전체화면으로 펼쳐져요.
            </p>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1" onClick={() => snapTo('half')}>
                절반
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => snapTo('full')}>
                전체화면
              </Button>
              <Button variant="outline" className="flex-1" onClick={() => snapTo('closed')}>
                닫기
              </Button>
            </div>

            <ul className="flex flex-col gap-3">
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
          </div>
        )}
      </BottomSheet>
    </div>
  )
}
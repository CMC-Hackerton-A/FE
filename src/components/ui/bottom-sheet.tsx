import { createPortal } from 'react-dom'
import type { SnapPoint } from '@/constants/bottom-sheet'
import { usePreventScroll } from '@/hooks/common/use-prevent-scroll'
import { useBottomSheet } from '@/hooks/bottom-sheet/use-bottom-sheet'
import { BottomSheetHeader } from './bottom-sheet-header'
import { BottomSheetHandle } from './bottom-sheet-handle'
import { cn } from '@/lib/utils'

interface BottomSheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: (props: { snapTo: (snap: SnapPoint) => void }) => React.ReactNode
  halfRatio?: number
}

const portalTarget = document.body

export function BottomSheet({
  isOpen,
  onClose,
  title,
  children,
  halfRatio,
}: BottomSheetProps) {
  const { sheetRef, currentSnap, snapTo, dragHandleProps } = useBottomSheet({
    isOpen,
    onClose,
    halfRatio,
  })

  const isPeek = currentSnap === 'peek'
  const isFull = currentSnap === 'full'

  // peek 상태에서는 배경 스크롤 허용
  usePreventScroll(isOpen && !isPeek)

  if (!isOpen) return null

  return createPortal(
    <div className="fixed inset-0 touch-none" style={{ zIndex: 100 }}>
      {/* backdrop */}
      {/** biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
        data-backdrop
        className="absolute inset-0 bg-black/50"
        style={{ pointerEvents: isPeek ? 'none' : 'auto' }}
        onClick={() => snapTo('peek')}
      />
      <div
        ref={sheetRef}
        className={cn(
          'fixed bottom-0 left-1/2 w-full max-w-[430px] -translate-x-1/2',
          'flex flex-col bg-white',
          'overflow-hidden',
          isFull ? 'rounded-none' : 'rounded-t-2xl'
        )}
        style={{ top: '100%' }}
      >
        {/* 하프: 핸들 */}
        {!isFull && <BottomSheetHandle dragHandleProps={dragHandleProps} />}

        <div className="flex w-full flex-1 flex-col gap-2 overflow-hidden px-5 pt-2">
          <BottomSheetHeader
            title={title}
            onBack={isFull ? () => snapTo('closed', false) : undefined}
          />
          <div
            className="flex w-full flex-1 flex-col overflow-y-auto pb-8"
            style={{ touchAction: 'pan-y' }}
          >
            {children({ snapTo })}
          </div>
        </div>
      </div>
    </div>,
    portalTarget
  )
}
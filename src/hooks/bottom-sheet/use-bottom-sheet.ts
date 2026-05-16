import { useRef, useCallback, useEffect, useState } from 'react'
import type { SnapPoint } from '@/constants/bottom-sheet'
import {
  DEFAULT_HALF_RATIO,
  PEEK_HEIGHT,
  VELOCITY_THRESHOLD,
  SNAP_EASING,
  SNAP_DURATION_MS,
} from '@/constants/bottom-sheet'

interface UseBottomSheetOptions {
  isOpen: boolean
  onClose: () => void
  halfRatio?: number
}

interface UseBottomSheetReturn {
  sheetRef: React.RefObject<HTMLDivElement | null>
  currentSnap: SnapPoint
  snapTo: (snap: SnapPoint, animate?: boolean) => void
  dragHandleProps: {
    onMouseDown: (e: React.MouseEvent) => void
    onTouchStart: (e: React.TouchEvent) => void
  }
}

export function useBottomSheet({
  isOpen,
  onClose,
  halfRatio = DEFAULT_HALF_RATIO,
}: UseBottomSheetOptions): UseBottomSheetReturn {
  const sheetRef = useRef<HTMLDivElement>(null)
  const [currentSnap, setCurrentSnap] = useState<SnapPoint>('peek')

  // ref로 관리하는 이유:
  // 드래그 중 매 mousemove마다 setState하면 리렌더링 폭풍이 발생합니다.
  // top은 직접 DOM 조작으로 처리하고, 최종 스냅 상태만 state로 관리합니다.
  const isDragging = useRef(false)
  const startY = useRef(0)
  const startTop = useRef(0)
  const currentTop = useRef(0)
  const lastY = useRef(0)
  const lastTime = useRef(0)
  const velocity = useRef(0)
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const backdropRef = useRef<HTMLElement | null>(null)

  const getContainerH = useCallback(() => {
    return sheetRef.current?.parentElement?.offsetHeight ?? 0
  }, [])

  const getHalfH = useCallback(() => {
    return Math.round(getContainerH() * halfRatio)
  }, [getContainerH, halfRatio])

  /**
   * `topForSnap`
   * - top이 작을수록 시트가 높이 올라감
   * - peek: 핸들바만 보이는 상태 (containerH - PEEK_HEIGHT)
   * - half: 화면의 halfRatio만큼 차지
   * - full: 전체화면 (top = 0)
   */
  const topForSnap = useCallback(
    (snap: SnapPoint): number => {
      const containerH = getContainerH()
      if (snap === 'closed') return containerH
      if (snap === 'peek') return containerH - PEEK_HEIGHT
      if (snap === 'half') return containerH - getHalfH()
      return 0
    },
    [getContainerH, getHalfH]
  )

  const setSheetTop = useCallback(
    (top: number, animate: boolean) => {
      const el = sheetRef.current
      if (!el) return

      el.style.transition = animate
        ? `top ${SNAP_DURATION_MS}ms ${SNAP_EASING}`
        : 'none'
      el.style.top = `${top}px`

      const backdrop = backdropRef.current
      if (backdrop) {
        const containerH = getContainerH()
        const pct = 1 - top / containerH
        backdrop.style.transition = animate
          ? `opacity ${SNAP_DURATION_MS}ms ${SNAP_EASING}`
          : 'none'
        backdrop.style.opacity = String(Math.min(1, Math.max(0, pct * 1.3)))
      }
    },
    [getContainerH]
  )

  const snapTo = useCallback(
    (snap: SnapPoint, animate = true) => {
      clearTimeout(closeTimeoutRef.current)
      closeTimeoutRef.current = undefined

      const top = topForSnap(snap)
      currentTop.current = top
      setSheetTop(top, animate)
      setCurrentSnap(snap)

      if (snap === 'closed') {
        closeTimeoutRef.current = setTimeout(onClose, SNAP_DURATION_MS)
      }
    },
    [topForSnap, setSheetTop, onClose]
  )

  useEffect(() => {
    return () => {
      clearTimeout(closeTimeoutRef.current)
    }
  }, [])

  // isOpen 변화 감지 → peek 상태로 올라오는 애니메이션
  useEffect(() => {
    if (!isOpen) return

    const el = sheetRef.current
    if (!el) return

    backdropRef.current =
      el.parentElement?.querySelector<HTMLElement>('[data-backdrop]') ?? null

    const containerH = getContainerH()

    el.style.transition = 'none'
    el.style.top = `${containerH}px`
    currentTop.current = containerH

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // snapTo는 deps에서 의도적으로 제외 (isOpen 변화 시에만 실행하는 열기 애니메이션)
    requestAnimationFrame(() => {
      setCurrentSnap('peek')
      snapTo('peek', true)
    })
  }, [isOpen])

  const onDragStart = useCallback((clientY: number) => {
    isDragging.current = true
    startY.current = clientY
    startTop.current = currentTop.current
    lastY.current = clientY
    lastTime.current = Date.now()
    velocity.current = 0

    const el = sheetRef.current
    if (el) el.style.transition = 'none'
  }, [])

  const onDragMove = useCallback(
    (clientY: number) => {
      if (!isDragging.current) return

      const now = Date.now()
      const dt = now - lastTime.current
      if (dt > 0) {
        velocity.current = (clientY - lastY.current) / dt
      }
      lastY.current = clientY
      lastTime.current = now

      const raw = startTop.current + (clientY - startY.current)
      // peek 위치(핸들바)보다 아래로는 내려가지 않도록 클램핑
      const peekTop = topForSnap('peek')
      const clamped = Math.max(0, Math.min(peekTop, raw))
      currentTop.current = clamped
      setSheetTop(clamped, false)
    },
    [topForSnap, setSheetTop]
  )

  /**
   * `onDragEnd`
   * - 최소 스냅: peek (핸들바만 보이는 상태, closed 없음)
   * - peek → half → full 3단계
   */
  const onDragEnd = useCallback(() => {
    if (!isDragging.current) return
    isDragging.current = false

    const peekTop = topForSnap('peek')
    const halfTop = topForSnap('half')
    const v = velocity.current
    const top = currentTop.current

    // 빠른 스와이프: 속도로 방향 결정
    if (v > VELOCITY_THRESHOLD) {
      snapTo('peek') // 아래로 빠르게 → peek
      return
    }
    if (v < -VELOCITY_THRESHOLD) {
      snapTo('full') // 위로 빠르게 → full
      return
    }

    // 느린 드래그: 가장 가까운 스냅으로
    const midPeekToHalf = (peekTop + halfTop) / 2
    const midHalfToFull = halfTop * 0.45

    if (top < midHalfToFull) snapTo('full')
    else if (top < midPeekToHalf) snapTo('half')
    else snapTo('peek')
  }, [topForSnap, snapTo])

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => onDragMove(e.clientY)
    const onMouseUp = () => {
      if (isDragging.current) onDragEnd()
    }
    const onTouchMove = (e: TouchEvent) => onDragMove(e.touches[0].clientY)
    const onTouchEnd = () => {
      if (isDragging.current) onDragEnd()
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    window.addEventListener('touchend', onTouchEnd)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
      window.removeEventListener('touchmove', onTouchMove)
      window.removeEventListener('touchend', onTouchEnd)
    }
  }, [onDragMove, onDragEnd])

  const dragHandleProps = {
    onMouseDown: (e: React.MouseEvent) => {
      e.preventDefault()
      onDragStart(e.clientY)
    },
    onTouchStart: (e: React.TouchEvent) => {
      onDragStart(e.touches[0].clientY)
    },
  }

  return { sheetRef, currentSnap, snapTo, dragHandleProps }
}
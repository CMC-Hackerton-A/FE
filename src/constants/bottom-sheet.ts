export type SnapPoint = 'closed' | 'peek' | 'half' | 'full'

export const SNAP: Record<string, SnapPoint> = {
  CLOSED: 'closed',
  PEEK: 'peek',
  HALF: 'half',
  FULL: 'full',
} as const

export const DEFAULT_HALF_RATIO = 0.8

// 핸들바만 보이는 peek 높이 (py-4 패딩 32px + h-1 바 4px + 여유 4px)
export const PEEK_HEIGHT = 40

// 이 이상 속도면 snap 방향 강제 결정
export const VELOCITY_THRESHOLD = 0.6

// 스냅 애니메이션 커브 — iOS 바텀시트에서 따옴
export const SNAP_EASING = 'cubic-bezier(0.32, 0.72, 0, 1)'
export const SNAP_DURATION_MS = 340

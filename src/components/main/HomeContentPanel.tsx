import type { ReactNode } from 'react'

interface HomeContentPanelProps {
  title: string
  children: ReactNode
}

export function HomeContentPanel({ title, children }: HomeContentPanelProps) {
  return (
    <div className="flex h-full w-full flex-col gap-5 rounded-t-[20px] bg-white px-4 py-8 shadow-[0_-4px_20px_0_rgba(17,0,36,0.25)]">
      <h1 className="subtitle7 shrink-0 text-purple-60">{title}</h1>
      {children}
    </div>
  )
}
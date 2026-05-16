import { cn } from '@/lib/utils'
import type { ComponentProps, ReactNode } from 'react'

interface IconButtonProps extends ComponentProps<'button'> {
  icon: ReactNode
}

export const IconButton = ({ className, icon, ...props }: IconButtonProps) => {
  return (
    <button
      className={cn(
        'flex size-10 items-center justify-center rounded-[50px] border border-[0.2px] border-white/14 bg-white/10 shadow-[0_4px_4px_0_rgba(255,255,255,0.10)]',
        className
      )}
      {...props}
    >
      {icon}
    </button>
  )
}

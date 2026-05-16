import { IconButton } from './icon-button'
import BackIcon from '@/assets/icons/common/back.svg?react'
import logoImage from '@/img/logo.png'
import { cn } from '@/lib/utils'
import LogoIcon from '@/assets/icons/common/logo.svg?react'

type HeaderProps = {
  showBackButton?: boolean
}

export default function Header({ showBackButton = true }: HeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center',
        showBackButton ? 'justify-between' : 'justify-start px-8'
      )}
    >
      <LogoIcon className="h-[15px] w-fit" />
      {showBackButton ? <IconButton icon={<BackIcon />} /> : null}
    </header>
  )
}

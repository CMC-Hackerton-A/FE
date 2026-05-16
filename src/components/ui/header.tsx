import { IconButton } from './icon-button'
import BackIcon from '@/assets/icons/common/back.svg?react'
import logoImage from '@/img/logo.png'
import { cn } from '@/lib/utils'

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
      <img
        src={logoImage}
        alt="Still Star"
        className="h-5 w-auto"
      />
      {showBackButton ? <IconButton icon={<BackIcon />} /> : null}
    </header>
  )
}
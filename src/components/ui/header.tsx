import { IconButton } from './icon-button'
import BackIcon from '@/assets/icons/common/back.svg?react'
import logoImage from '@/img/logo.png'

type HeaderProps = {
  showBackButton?: boolean
}

export default function Header({ showBackButton = true }: HeaderProps) {
  return (
    <header className="flex items-center justify-between">
      <img src={logoImage} alt="Still Star" className="h-5 w-auto" />
      {showBackButton ? <IconButton icon={<BackIcon />} /> : null}
    </header>
  )
}
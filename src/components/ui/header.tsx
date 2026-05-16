import { IconButton } from './icon-button'
import BackIcon from '@/assets/icons/common/back.svg?react'

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <span className="subtitle7 text-white">Still star</span>
      <IconButton icon={<BackIcon />} />
    </header>
  )
}

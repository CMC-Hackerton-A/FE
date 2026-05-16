import { Link, Outlet, useLocation } from 'react-router'
import LogoIcon from '@/assets/icons/common/logo.svg?react'

export default function GlobalLayout() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const isImmersivePage = isHome || pathname.startsWith('/active')

  return (
    <div className="flex min-h-screen flex-col">
      <main className="relative mx-auto w-full max-w-175 flex-1 border-x">
        {!isImmersivePage ? (
          <header className="absolute inset-x-0 top-0 z-20 flex h-15 items-center border-0 bg-transparent">
            <div className="flex h-full w-full items-center justify-between px-4">
              <Link
                to="/"
                className={`inline-flex shrink-0 items-center rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                  isHome
                    ? 'ring-offset-transparent focus-visible:ring-white/80'
                    : 'focus-visible:ring-ring ring-offset-background'
                }`}
              >
                <LogoIcon className="h-[15px] w-fit" />
              </Link>
            </div>
          </header>
        ) : null}
        <div className={isImmersivePage ? '' : 'px-4 pb-6'}>
          <Outlet />
        </div>
      </main>
      {!isImmersivePage ? (
        <footer className="text-muted-foreground border-t py-10 text-center">
          @hani0903
        </footer>
      ) : null}
    </div>
  )
}

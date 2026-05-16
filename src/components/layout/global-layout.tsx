import { Outlet } from 'react-router'

export default function GlobalLayout() {
  return (
    <div className="bg-mono-gray-1 flex min-h-screen justify-center">
      <div className="relative min-h-screen w-full max-w-[430px] overflow-x-hidden bg-white">
        <Outlet />
      </div>
    </div>
  )
}

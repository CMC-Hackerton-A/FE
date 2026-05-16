import { Link, Outlet, useLocation } from "react-router";

export default function GlobalLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <main className="relative mx-auto w-full max-w-175 flex-1 border-x">
        <header className="absolute inset-x-0 top-0 z-20 flex h-15 items-center border-0 bg-transparent">
          <div className="flex h-full w-full items-center justify-between px-4">
            <Link
              to="/"
              className={`font-pretendard text-lg font-semibold tracking-tight ${
                isHome ? "text-white" : "text-foreground"
              }`}
            >
              Still star
            </Link>
          </div>
        </header>
        <div className="px-4 pb-6">
          <Outlet />
        </div>
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @hani0903
      </footer>
    </div>
  );
}
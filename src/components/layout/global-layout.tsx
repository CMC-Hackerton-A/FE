import { Link, Outlet, useLocation } from "react-router";
import logoSrc from "@/img/logo.png";

export default function GlobalLayout() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const isImmersivePage = isHome || pathname.startsWith("/active");

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
                    ? "focus-visible:ring-white/80 ring-offset-transparent"
                    : "focus-visible:ring-ring ring-offset-background"
                }`}
              >
                <img
                  src={logoSrc}
                  alt="Still star"
                  className="h-8 w-auto max-h-10 object-contain"
                  width={160}
                  height={40}
                  decoding="async"
                />
              </Link>
            </div>
          </header>
        ) : null}
        <div className={isImmersivePage ? "" : "px-4 pb-6"}>
          <Outlet />
        </div>
      </main>
      {!isImmersivePage ? (
        <footer className="text-muted-foreground border-t py-10 text-center">
          @hani0903
        </footer>
      ) : null}
    </div>
  );
}
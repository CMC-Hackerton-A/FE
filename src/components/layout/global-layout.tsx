import React from "react";
import { Link, Outlet } from "react-router";
import { Button } from "../ui/button";
import { SunIcon } from "lucide-react";

export default function GlobalLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="h-15 border-b">
        <div className="mx-auto flex h-full w-full max-w-175 items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2">
            <img className="w-5" alt="로고" />
            <div>로고</div>
          </Link>

          <div className="flex items-center gap-5">
            <div className="hover:bg-muted rounded-full p-2">
              <SunIcon />
            </div>
            <img />
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-175 flex-1 border-x px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-muted-foreground border-t py-10 text-center">
        @hani0903
      </footer>
    </div>
  );
}

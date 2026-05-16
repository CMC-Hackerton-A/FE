import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon, CheckCircleIcon } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">CMC Hackathon</h1>
        <p className="text-muted-foreground">
          Tailwind CSS, shadcn/ui, React Router, TanStack Query, Zustand 셋업
          확인용 페이지입니다.
        </p>
        <Button asChild>
          <Link to="/test">
            UI 컴포넌트 테스트 <ArrowRightIcon />
          </Link>
        </Button>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">설치된 패키지</h2>
        <ul className="space-y-2">
          {[
            "React 19 + Vite",
            "TypeScript",
            "Tailwind CSS v4",
            "shadcn/ui (radix-nova)",
            "React Router v7",
            "TanStack Query v5",
            "Zustand v5",
            "Lucide React",
            "Geist Variable 폰트",
          ].map((item) => (
            <li key={item} className="flex items-center gap-2 text-sm">
              <CheckCircleIcon className="text-primary size-4 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

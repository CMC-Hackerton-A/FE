import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "lucide-react";

const BUTTON_VARIANTS = [
  "default",
  "secondary",
  "outline",
  "ghost",
  "destructive",
  "link",
] as const;

const BUTTON_SIZES = ["xs", "sm", "default", "lg"] as const;

const THEME_COLORS = [
  { label: "Primary", className: "bg-primary text-primary-foreground" },
  { label: "Secondary", className: "bg-secondary text-secondary-foreground" },
  { label: "Muted", className: "bg-muted text-muted-foreground" },
  { label: "Accent", className: "bg-accent text-accent-foreground" },
  { label: "Destructive", className: "bg-destructive text-white" },
  { label: "Card", className: "bg-card text-card-foreground border" },
];

export default function UITestPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link to="/">
            <ArrowLeftIcon />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">UI 테스트</h1>
      </div>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tailwind CSS — 색상 팔레트</h2>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-8">
          {[
            "bg-red-400",
            "bg-orange-400",
            "bg-amber-400",
            "bg-yellow-400",
            "bg-green-400",
            "bg-teal-400",
            "bg-blue-400",
            "bg-violet-400",
          ].map((color) => (
            <div key={color} className={`${color} h-12 rounded-lg`} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">shadcn/ui — Button variants</h2>
        <div className="flex flex-wrap gap-3">
          {BUTTON_VARIANTS.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant}
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">shadcn/ui — Button sizes</h2>
        <div className="flex flex-wrap items-center gap-3">
          {BUTTON_SIZES.map((size) => (
            <Button key={size} size={size}>
              size: {size}
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">CSS Variables — 테마 색상</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {THEME_COLORS.map(({ label, className }) => (
            <div
              key={label}
              className={`${className} rounded-lg p-4 text-sm font-medium`}
            >
              {label}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Tailwind — Typography</h2>
        <div className="space-y-2">
          <p className="text-4xl font-bold">Heading 4xl bold</p>
          <p className="text-2xl font-semibold">Heading 2xl semibold</p>
          <p className="text-xl font-medium">Heading xl medium</p>
          <p className="text-base">Base text — Geist Variable 폰트 테스트</p>
          <p className="text-muted-foreground text-sm">
            Small muted text — 보조 설명 텍스트
          </p>
        </div>
      </section>
    </div>
  );
}

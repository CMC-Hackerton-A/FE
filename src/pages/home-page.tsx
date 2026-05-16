import homeBackground from "@/icons/common/home-background.svg";

export default function HomePage() {
  return (
    <div
      className="-mx-4 w-[calc(100%+2rem)] min-h-[85dvh] bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${homeBackground})` }}
      role="presentation"
    />
  );
}
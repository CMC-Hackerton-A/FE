import homeBackground from "@/icons/common/home-background.svg";

export default function HomePage() {
  return (
    <div
      className="relative -mx-4 w-[calc(100%+2rem)] min-h-[85dvh] bg-cover bg-center bg-no-repeat px-4 pt-20"
      style={{ backgroundImage: `url(${homeBackground})` }}
    >
      <p
        className="font-pretendard text-[24px] leading-[132%] text-white [display:-webkit-box] [-webkit-line-clamp:2] [-webkit-box-orient:vertical] overflow-hidden text-ellipsis"
      >
        <span className="block font-extralight">그들은 여전히</span>
        <span className="block font-semibold">스타로 남아있다.</span>
      </p>
    </div>
  );
}
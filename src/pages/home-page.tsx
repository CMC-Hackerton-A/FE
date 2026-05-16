// <<<<<<< feat/#14
// import { SearchBar, BackButton } from '@/components/ui/SearchBar'

// export default function HomePage() {
//   const handleSearch = (query: string) => {
//     console.log('검색어:', query)
//   }

//   return (
//     <main className="min-h-screen bg-white">
//       <BackButton onClick={() => console.log('뒤로가기')} />
//       <SearchBar onSearch={handleSearch} />
//     </main>
//   )
// }
// =======
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


import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

/**
 * queryClient: TanStack Query를 이용해서 관리하는 모든 서버 상태를 보관하는 일종의 저장소이다. API 요청의 응답값이나, 캐싱 값, 캐시 옵션이 모두 보관된다.
 */
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </BrowserRouter>,
);

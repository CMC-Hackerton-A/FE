import { Route, Routes } from 'react-router'
import GlobalLayout from './components/layout/global-layout'
import HomePage from './pages/home-page'
import UITestPage from './pages/ui-test-page'
import BottomSheetExamplePage from './pages/bottom-sheet-example-page'
import ActivePage from './pages/active-page'
import CommentPage from './pages/comment-page'

function App() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route index element={<HomePage />} />
        <Route path="test" element={<UITestPage />} />
        <Route path="bottom-sheet" element={<BottomSheetExamplePage />} />
        <Route path="active/:id" element={<ActivePage />} />
        <Route path="active/:id/comments" element={<CommentPage />} />
      </Route>
    </Routes>
  )
}

export default App
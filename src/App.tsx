import { Route, Routes } from 'react-router'
import GlobalLayout from './components/layout/global-layout'
import HomePage from './pages/home-page'
import UITestPage from './pages/ui-test-page'

function App() {
  return (
    <Routes>
      <Route element={<GlobalLayout />}>
        <Route index element={<HomePage />} />
        <Route path="test" element={<UITestPage />} />
      </Route>
    </Routes>
  )
}

export default App

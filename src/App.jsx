import { Navigate, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { HomePage } from './pages/HomePage'
import { PartnerPage } from './pages/PartnerPage'
import { PolicyPage } from './pages/PolicyPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { privacy, terms } from './content/policies'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="become-a-partner" element={<PartnerPage />} />
        <Route path="privacy" element={<PolicyPage document={privacy} path="/privacy" />} />
        <Route path="terms" element={<PolicyPage document={terms} path="/terms" />} />
        <Route path="privacy-policy" element={<Navigate to="/privacy" replace />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

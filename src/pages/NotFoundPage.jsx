import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

export function NotFoundPage() {
  usePageMeta({
    title: 'Page not found | Alignaa',
    description: 'This Alignaa page is not available. Return home to request a scan.',
    path: '/',
  })
  return (
    <div className="section">
      <div className="container-site max-w-xl text-center">
        <p className="eyebrow">404</p>
        <h1 className="mt-3 text-[32px]">This page is not available</h1>
        <p className="mt-4 text-muted">
          The address may have changed. Return to the Alignaa homepage to request a scan or read about treatment.
        </p>
        <Link className="btn btn-primary mt-6" to="/">
          Back to home
        </Link>
      </div>
    </div>
  )
}

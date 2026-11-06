import { ExternalLink } from 'lucide-react'
import { usePageMeta } from '../lib/usePageMeta'
import { partnerContent, site } from '../content/site'
import { PartnerForm } from '../components/forms/PartnerForm'

export function PartnerPage() {
  usePageMeta({
    title: 'Become an Alignaa partner | Alignaa',
    description: 'Dentists and dental clinic owners can enquire about partnering with Alignaa.',
    path: '/become-a-partner',
  })
  return (
    <div className="section">
      <div className="container-site grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
        <div>
          <p className="eyebrow">Dentists and clinic owners</p>
          <h1 className="mt-3 text-[32px] sm:text-[40px]">{partnerContent.title}</h1>
          <p className="mt-4 text-muted">{partnerContent.intro}</p>
          <ul className="mt-6 grid gap-3">
            {partnerContent.benefits.map((item) => (
              <li key={item} className="card p-4">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-muted">{partnerContent.disclaimer}</p>
          <a className="btn btn-secondary mt-6" href={site.parentUrl} target="_blank" rel="noreferrer">
            {site.parentLabel}
            <ExternalLink size={16} />
          </a>
        </div>
        <PartnerForm />
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { site } from '../../content/site'
import { scrollToId } from '../../lib/scroll'

export function Footer() {
  return (
    <footer className="bg-[#062b2d] text-white pt-14 pb-8">
      <div className="container-site grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <img src="/assets/logo-white.png" alt="Alignaa" className="h-10 sm:h-12 w-auto" />
          <p className="mt-4 max-w-md text-white/80 leading-relaxed">
            Clear aligner treatment with professional planning. Request a scan and the Alignaa support team will contact
            you.
          </p>
        </div>
        <div>
          <h2 className="text-white text-lg mb-3">Explore</h2>
          <ul className="grid gap-2 text-white/85">
            <li>
              <Link className="text-white no-underline hover:underline" to="/#how-it-works" onClick={() => scrollToId('how-it-works')}>
                How it works
              </Link>
            </li>
            <li>
              <Link className="text-white no-underline hover:underline" to="/#enquiry" onClick={() => scrollToId('enquiry')}>
                Contact
              </Link>
            </li>
            <li>
              <Link className="text-white no-underline hover:underline" to="/become-a-partner">
                Become a Partner
              </Link>
            </li>
            <li>
              <a className="text-white no-underline hover:underline inline-flex items-center gap-1" href={site.parentUrl}>
                Alignaa professional website
                <ExternalLink size={14} />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-lg mb-3">Policies</h2>
          <ul className="grid gap-2 text-white/85">
            <li>
              <Link className="text-white no-underline hover:underline" to="/privacy">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className="text-white no-underline hover:underline" to="/terms">
                Terms of Use
              </Link>
            </li>
          </ul>
          <p className="mt-4 text-sm text-white/70">{site.support.pendingLabel}</p>
        </div>
      </div>
      <div className="container-site mt-10 pt-6 border-t border-white/15 text-sm text-white/70 flex flex-col sm:flex-row gap-2 sm:justify-between">
        <p>{site.copyright}</p>
        <p>English · alignaa.co</p>
      </div>
    </footer>
  )
}

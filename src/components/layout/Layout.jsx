import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { DesignSwitcher } from './DesignSwitcher'
import { site } from '../../content/site'
import { scrollToId } from '../../lib/scroll'

export function Layout() {
  const location = useLocation()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [showSticky, setShowSticky] = useState(false)
  const [enquiryVisible, setEnquiryVisible] = useState(false)

  const rawOption = (
    searchParams.get('option') ||
    searchParams.get('design') ||
    (typeof window !== 'undefined' ? localStorage.getItem('alignaa_design_option') : '') ||
    'a'
  ).toLowerCase()
  const activeOption = ['a', 'b', 'c'].includes(rawOption) ? rawOption : 'a'

  function handleSelectOption(id) {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev)
        next.set('option', id)
        return next
      },
      { replace: true },
    )
    try {
      localStorage.setItem('alignaa_design_option', id)
    } catch {
      // storage unavailable
    }
  }

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '')
      requestAnimationFrame(() => scrollToId(id))
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' })
    }
  }, [location.pathname, location.hash])

  useEffect(() => {
    function onScroll() {
      setShowSticky(window.scrollY > 480)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const enquiry = document.getElementById('enquiry')
    if (!enquiry) {
      return undefined
    }
    const observer = new IntersectionObserver(([entry]) => setEnquiryVisible(entry.isIntersecting), {
      threshold: 0.2,
    })
    observer.observe(enquiry)
    return () => observer.disconnect()
  }, [location.pathname])

  function requestScan() {
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: 'enquiry' })
      return
    }
    scrollToId('enquiry')
  }

  return (
    <div className="min-h-svh flex flex-col bg-white">
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      {site.draftMode ? (
        <DesignSwitcher activeOption={activeOption} onSelectOption={handleSelectOption} />
      ) : null}

      <Header />
      <main id="main" className="flex-1">
        <Outlet context={{ activeOption, selectOption: handleSelectOption }} />
      </main>
      <Footer />
      {showSticky && !enquiryVisible ? (
        <div className="sm:hidden sticky bottom-0 z-30 p-3 bg-white/95 border-t border-line">
          <button type="button" className="btn btn-primary w-full" onClick={requestScan}>
            Request a Scan
          </button>
        </div>
      ) : null}
    </div>
  )
}

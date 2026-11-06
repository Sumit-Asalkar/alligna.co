import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ChevronRight, ExternalLink, Menu, X } from 'lucide-react'
import { navItems, site } from '../../content/site'
import { scrollToId } from '../../lib/scroll'

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!open) return undefined
    function onKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  function go(href) {
    setOpen(false)
    if (href.startsWith('/#')) {
      const id = href.slice(2)
      if (location.pathname !== '/') {
        navigate({ pathname: '/', hash: id })
        return
      }
      setTimeout(() => scrollToId(id), 50)
      return
    }
    navigate(href)
  }

  function requestScan() {
    setOpen(false)
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: 'enquiry' })
      return
    }
    setTimeout(() => scrollToId('enquiry'), 50)
  }

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-line shadow-xs">
        <div className="container-site flex items-center justify-between gap-4 min-h-[72px]">
          <Link to="/" className="flex items-center shrink-0" aria-label="Alignaa home" onClick={() => setOpen(false)}>
            <img src="/assets/logo.png" alt="Alignaa" className="h-10 sm:h-12 w-auto" />
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {navItems.map((item) =>
              item.href.startsWith('/#') ? (
                <button
                  key={item.label}
                  type="button"
                  className="bg-transparent border-0 p-0 text-[15px] font-medium text-ink hover:text-teal transition cursor-pointer"
                  onClick={() => go(item.href)}
                >
                  {item.label}
                </button>
              ) : (
                <NavLink
                  key={item.label}
                  to={item.href}
                  className={({ isActive }) =>
                    `text-[15px] no-underline transition ${
                      isActive ? 'text-teal font-semibold' : 'text-ink font-medium hover:text-teal'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="btn btn-primary hidden sm:inline-flex"
              onClick={requestScan}
            >
              Request a Scan
            </button>

            {/* Mobile / Tablet Hamburger Three Lines Button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center p-2.5 rounded-xl border border-line bg-white text-ink hover:bg-tint hover:text-teal focus:outline-none focus:ring-2 focus:ring-teal cursor-pointer transition shadow-xs"
              aria-expanded={open}
              aria-controls="mobile-nav-drawer"
              aria-label={open ? 'Close menu' : 'Open navigation menu'}
              onClick={() => setOpen((prev) => !prev)}
            >
              {open ? <X size={22} className="text-teal" /> : <Menu size={22} className="text-ink" />}
              <span className="sr-only">{open ? 'Close menu' : 'Menu'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Full Mobile & Tablet Navigation Overlay Drawer */}
      {open ? (
        <div id="mobile-nav-drawer" className="lg:hidden fixed inset-0 z-50 flex flex-col justify-start">
          {/* Backdrop Blur Overlay */}
          <div
            className="fixed inset-0 bg-[#002024]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />

          {/* Slide-Down Menu Sheet */}
          <div className="relative w-full bg-white shadow-2xl border-b border-line z-10 max-h-[90vh] overflow-y-auto animate-in slide-in-from-top-4 duration-200">
            <div className="container-site py-4 flex items-center justify-between border-b border-line/60">
              <Link to="/" onClick={() => setOpen(false)}>
                <img src="/assets/logo.png" alt="Alignaa" className="h-9 w-auto" />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 rounded-xl text-ink hover:bg-tint hover:text-teal transition cursor-pointer"
                aria-label="Close navigation"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="container-site py-6 grid gap-2" aria-label="Mobile Navigation Drawer">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  className="text-left w-full py-3.5 px-4 rounded-xl text-base font-semibold text-ink hover:bg-tint hover:text-teal transition flex items-center justify-between cursor-pointer"
                  onClick={() => go(item.href)}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={18} className="text-teal/70" />
                </button>
              ))}

              <div className="mt-4 pt-4 border-t border-line/80 grid gap-3">
                <button
                  type="button"
                  className="btn btn-primary w-full text-base py-3.5"
                  onClick={requestScan}
                >
                  Request a Scan
                </button>
                <a
                  href={site.parentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-secondary w-full text-sm py-2.5 flex items-center justify-center gap-1.5"
                >
                  <span>{site.parentLabel}</span>
                  <ExternalLink size={14} />
                </a>
              </div>

              <div className="mt-6 pt-4 border-t border-line/40 text-center">
                <p className="text-xs text-muted">
                  Clear aligners starting at <strong className="text-teal font-heading font-bold">{site.startingPrice}</strong>
                </p>
                <p className="mt-1 text-[11px] text-muted">Personalized treatment planned with dental professionals</p>
              </div>
            </nav>
          </div>
        </div>
      ) : null}
    </>
  )
}

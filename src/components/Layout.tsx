import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CookieConsent } from './CookieConsent'
import { useDocumentMeta } from '../lib/seo'
import { loadGa, readConsent, trackPageView } from '../lib/analytics'

export function Layout() {
  const { pathname, hash } = useLocation()
  const title = useDocumentMeta(pathname)

  // Re-attach a previously granted consent on first load.
  useEffect(() => {
    if (readConsent() === 'granted') loadGa()
  }, [])

  useEffect(() => {
    trackPageView(pathname, title)
  }, [pathname, title])

  // Restore top-of-page on navigation, but honour in-page anchors.
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname, hash])

  return (
    <div className="flex min-h-dvh flex-col">
      <Header />
      <main id="main" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  )
}

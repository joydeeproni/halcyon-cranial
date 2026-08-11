/**
 * Google Analytics 4, gated on explicit consent.
 *
 * Nothing is loaded and no cookie is set until the visitor opts in. This is
 * deliberate: the site collects PHI elsewhere, so a third-party tag firing
 * before consent on the same origin is a risk not worth taking for pageview
 * counts. IP anonymisation is on, and ad signals are off.
 *
 * Set VITE_GA_ID in .env to activate. With no ID the module is inert, so
 * local development never pollutes the property.
 */

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined
const STORAGE_KEY = 'pcp-analytics-consent'

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

export type ConsentState = 'granted' | 'denied' | null

export function readConsent(): ConsentState {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'granted' || v === 'denied' ? v : null
  } catch {
    return null
  }
}

export function writeConsent(state: Exclude<ConsentState, null>) {
  try {
    localStorage.setItem(STORAGE_KEY, state)
  } catch {
    /* storage blocked — consent simply won't persist */
  }
  if (state === 'granted') loadGa()
}

let loaded = false

export function loadGa() {
  if (loaded || !GA_ID || typeof window === 'undefined') return
  loaded = true

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments)
  }

  window.gtag('js', new Date())
  window.gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'granted',
  })
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    allow_google_signals: false,
    send_page_view: false,
  })

  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)
}

/** Client-side routing means pageviews must be sent manually. */
export function trackPageView(path: string, title: string) {
  if (!GA_ID || !window.gtag) return
  window.gtag('event', 'page_view', {
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  })
}

/** Conversion events worth reporting on — booking, verification, enquiry. */
export function trackEvent(name: string, params: Record<string, unknown> = {}) {
  if (!GA_ID || !window.gtag) return
  window.gtag('event', name, params)
}

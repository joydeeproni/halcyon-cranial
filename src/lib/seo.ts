import { useEffect } from 'react'
import { posts } from '../data/site'

const SITE = 'Halcyon Cranial Studio'
const ORIGIN = 'https://halcyoncranial.com'

type Meta = { title: string; description: string }

/**
 * Per-route metadata. A client-rendered SPA needs these applied on navigation;
 * on a Webflow/Squarespace build each of these becomes the page's SEO panel.
 */
const routes: Record<string, Meta> = {
  '/': {
    title: `${SITE} — Custom hair prostheses for medical hair loss`,
    description:
      'Hand-constructed cranial prostheses for alopecia, chemotherapy and medical hair loss. Private consultations, insurance verified in writing, nationwide fitting.',
  },
  '/approach': {
    title: `Our approach — ${SITE}`,
    description:
      'Consultation, impression, hand construction, fitting and aftercare — the whole sequence with honest durations, and the four commitments we will not trade away.',
  },
  '/prostheses': {
    title: `Prostheses, bases and materials — ${SITE}`,
    description:
      'Vacuum, French lace, monofilament and silicone-lined bases compared, with published pricing from $890 and what each construction asks of your scalp.',
  },
  '/insurance': {
    title: `Insurance coverage for cranial prostheses — ${SITE}`,
    description:
      'How to get a cranial prosthesis covered: the prescription wording that matters, HCPCS and ICD-10 codes, and free verification and appeals handled for you.',
  },
  '/consultation': {
    title: `Book a private consultation — ${SITE}`,
    description:
      'A sixty-minute consultation in our Boston studio or by secure video. No fitting, no measurements, no obligation. HIPAA-compliant intake.',
  },
  '/stories': {
    title: `Client stories — ${SITE}`,
    description:
      'Experiences from people fitted for alopecia, chemotherapy-induced hair loss and pediatric hair loss, shared with permission.',
  },
  '/journal': {
    title: `Journal — ${SITE}`,
    description:
      'Practical writing on insurance coverage, treatment timelines, base construction and talking to children about hair loss.',
  },
  '/faq': {
    title: `Questions answered — ${SITE}`,
    description:
      'Cost, coverage, timelines, remote fitting, swimming and sleeping, pediatric commissions, and what happens to your medical information.',
  },
  '/contact': {
    title: `Contact — ${SITE}`,
    description:
      'Call (617) 555-0142 or send a secure message. Enquiries involving health details are routed into our HIPAA-compliant system rather than an inbox.',
  },
  '/privacy': {
    title: `Privacy & HIPAA notice — ${SITE}`,
    description:
      'What health information we collect, how it is encrypted and retained, who it is shared with, and your rights over it.',
  },
}

function metaFor(pathname: string): Meta {
  if (routes[pathname]) return routes[pathname]

  if (pathname.startsWith('/journal/')) {
    const post = posts.find((p) => p.slug === pathname.replace('/journal/', ''))
    if (post) return { title: `${post.title} — ${SITE}`, description: post.excerpt }
  }

  return { title: `Page not found — ${SITE}`, description: '' }
}

function upsert(selector: string, create: () => HTMLElement, apply: (el: HTMLElement) => void) {
  let el = document.head.querySelector<HTMLElement>(selector)
  if (!el) {
    el = create()
    document.head.appendChild(el)
  }
  apply(el)
}

/** Applies title, description, canonical and OG tags for the current route. */
export function useDocumentMeta(pathname: string): string {
  const { title, description } = metaFor(pathname)

  useEffect(() => {
    document.title = title

    upsert(
      'meta[name="description"]',
      () => Object.assign(document.createElement('meta'), { name: 'description' }),
      (el) => el.setAttribute('content', description),
    )
    upsert(
      'link[rel="canonical"]',
      () => Object.assign(document.createElement('link'), { rel: 'canonical' }),
      (el) => el.setAttribute('href', ORIGIN + pathname),
    )
    upsert(
      'meta[property="og:title"]',
      () => {
        const m = document.createElement('meta')
        m.setAttribute('property', 'og:title')
        return m
      },
      (el) => el.setAttribute('content', title),
    )
    upsert(
      'meta[property="og:description"]',
      () => {
        const m = document.createElement('meta')
        m.setAttribute('property', 'og:description')
        return m
      },
      (el) => el.setAttribute('content', description),
    )
    upsert(
      'meta[property="og:url"]',
      () => {
        const m = document.createElement('meta')
        m.setAttribute('property', 'og:url')
        return m
      },
      (el) => el.setAttribute('content', ORIGIN + pathname),
    )
  }, [pathname, title, description])

  return title
}

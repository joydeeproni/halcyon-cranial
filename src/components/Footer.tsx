import { Link } from 'react-router-dom'
import { nav, org } from '../data/site'
import { Logo } from './Logo'
import { ButtonLink } from './Button'

const utility = [
  { label: 'Book a consultation', to: '/consultation' },
  { label: 'Verify my insurance', to: '/insurance#verify' },
  { label: 'Contact', to: '/contact' },
  { label: 'Privacy & HIPAA notice', to: '/privacy' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-forest text-bone">
      <div aria-hidden className="dotfield-light fade-b pointer-events-none absolute inset-x-0 top-0 h-72 opacity-25" />

      {/* Closing invitation */}
      <div className="shell relative border-b border-bone/12 py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-20">
          <div>
            <h2 className="display-lg text-bone">
              A conversation, with
              <span className="italic text-sage-soft"> nothing decided</span> in it.
            </h2>
          </div>
          <div className="lg:pb-3">
            <p className="lede max-w-md text-sage-soft/90">
              Sixty minutes, in the studio or over secure video. No fitting, no measurements, no
              obligation — just somebody who has done this two thousand times answering your
              questions.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <ButtonLink to="/consultation" variant="light" size="lg">
                Book a consultation
              </ButtonLink>
              <a
                href={org.phoneHref}
                className="link-draw numerals py-2 text-[0.9375rem] text-sage-soft transition-colors hover:text-bone"
              >
                or call {org.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Directory */}
      <div className="shell relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        <div className="lg:col-span-1">
          <Logo tone="light" />
          <p className="mt-6 max-w-56 text-sm leading-relaxed text-sage-soft/70">
            Custom cranial prostheses, hand-constructed in Massachusetts since {org.founded}.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-3.5">
          <h3 className="mb-1 font-display text-[0.9375rem] italic text-sage">Explore</h3>
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="w-fit text-sm text-sage-soft/85 transition-colors duration-300 hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Patient services" className="flex flex-col gap-3.5">
          <h3 className="mb-1 font-display text-[0.9375rem] italic text-sage">Patient services</h3>
          {utility.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="w-fit text-sm text-sage-soft/85 transition-colors duration-300 hover:text-bone"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3.5">
          <h3 className="mb-1 font-display text-[0.9375rem] italic text-sage">Studio</h3>
          <address className="text-sm not-italic leading-relaxed text-sage-soft/85">
            {org.address.line1}
            <br />
            {org.address.city}, {org.address.region} {org.address.postal}
          </address>
          <a
            href={org.phoneHref}
            className="numerals w-fit text-sm text-sage-soft/85 transition-colors hover:text-bone"
          >
            {org.phone}
          </a>
          <a
            href={`mailto:${org.email}`}
            className="w-fit text-sm text-sage-soft/85 transition-colors hover:text-bone"
          >
            {org.email}
          </a>
          <dl className="mt-2 space-y-1.5">
            {org.hours.map((h) => (
              <div key={h.days} className="flex justify-between gap-4 text-[0.8125rem] text-sage-quiet">
                <dt>{h.days}</dt>
                <dd className="numerals">{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Legal */}
      <div className="shell relative border-t border-bone/12 py-7">
        <div className="flex flex-col gap-4 text-[0.8125rem] text-sage-quiet md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {org.name}. All rights reserved.
          </p>
          <p className="max-w-xl md:text-right">
            Information here is general and is not a substitute for advice from your physician.
            Coverage varies by plan.
          </p>
        </div>
      </div>
    </footer>
  )
}

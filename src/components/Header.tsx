import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { nav, org } from '../data/site'
import { ButtonLink } from './Button'
import { Logo } from './Logo'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close the drawer on navigation, and lock the page behind it while open.
  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Every page opens on a deep evergreen hero, so the header inverts to light
  // until the visitor scrolls past it and the bar acquires its own background.
  const overDark = !scrolled

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-forest focus:px-5 focus:py-2.5 focus:text-sm focus:text-bone"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? 'border-b border-forest/8 bg-bone/85 py-3 backdrop-blur-xl'
            : 'border-b border-transparent py-5'
        }`}
      >
        <div className="shell flex items-center justify-between gap-8">
          <Logo tone={overDark ? 'light' : 'dark'} />

          <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `link-draw text-[0.9375rem] transition-colors duration-300 ${
                    isActive
                      ? overDark
                        ? 'text-clay-soft'
                        : 'text-clay-deep'
                      : overDark
                        ? 'text-bone/80 hover:text-bone'
                        : 'text-forest/75 hover:text-forest'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href={org.phoneHref}
              className={`link-draw numerals text-[0.9375rem] transition-colors duration-300 ${
                overDark ? 'text-bone/80 hover:text-bone' : 'text-forest/75 hover:text-forest'
              }`}
            >
              {org.phone}
            </a>
            <ButtonLink to="/consultation" size="sm" variant={overDark ? 'light' : 'solid'}>
              Book a consultation
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            className={`-mr-2 flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-300 lg:hidden ${
              open || overDark ? 'text-bone' : 'text-forest'
            }`}
          >
            <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
            <span aria-hidden className="relative block h-3 w-6">
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-px w-6 bg-current transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-forest px-6 pb-10 pt-28 lg:hidden"
          >
            <div aria-hidden className="dotfield-light fade-b pointer-events-none absolute inset-x-0 top-0 h-64 opacity-30" />

            <nav aria-label="Primary" className="relative flex flex-col">
              {nav.map((item, i) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.06 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={item.to}
                    className="block border-b border-bone/12 py-4 font-display text-[1.75rem] font-light text-bone"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
              className="relative mt-auto flex flex-col gap-4"
            >
              <ButtonLink to="/consultation" variant="light" size="lg" className="w-full">
                Book a consultation
              </ButtonLink>
              <a href={org.phoneHref} className="numerals py-1 text-center text-sage-soft">
                {org.phone}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

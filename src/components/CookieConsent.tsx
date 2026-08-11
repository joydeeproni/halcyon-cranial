import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Button } from './Button'
import { readConsent, writeConsent } from '../lib/analytics'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const reduced = useReducedMotion()

  useEffect(() => {
    // Only ask if no decision has been recorded. Slight delay so the banner
    // does not compete with the hero on first paint.
    if (readConsent() === null) {
      const t = setTimeout(() => setVisible(true), 1200)
      return () => clearTimeout(t)
    }
  }, [])

  const decide = (state: 'granted' | 'denied') => {
    writeConsent(state)
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-label="Cookie preferences"
          initial={reduced ? undefined : { opacity: 0, y: 20 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          exit={reduced ? undefined : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-3 bottom-3 z-60 md:inset-x-auto md:bottom-6 md:left-6 md:max-w-md"
        >
          <div className="rounded-2xl border border-sage/40 bg-bone/95 p-5 shadow-[0_16px_50px_-20px_rgb(20_29_25_/_0.4)] backdrop-blur-xl md:p-6">
            <p className="font-display text-[1.0625rem] italic text-forest">
              A word about cookies
            </p>
            <p className="mt-3 text-[0.875rem] leading-relaxed text-moss">
              We would like to measure which pages people find useful. Nothing we collect touches
              your health information, and declining changes nothing about how the site works.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Button size="sm" onClick={() => decide('granted')}>
                Allow analytics
              </Button>
              <Button size="sm" variant="outline" onClick={() => decide('denied')}>
                Decline
              </Button>
              <Link
                to="/privacy"
                className="link-draw ml-auto text-[0.8125rem] text-muted transition-colors hover:text-forest"
              >
                Privacy notice
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Stagger index — each step adds 70ms. */
  delay?: number
  /** Distance travelled on entry, in px. */
  y?: number
  /** Resolve out of a defocus as well as up. For display figures. */
  blur?: boolean
  className?: string
  as?: 'div' | 'li' | 'section' | 'article' | 'figure'
}

/**
 * Scroll-triggered entrance. One shared easing and distance across the whole
 * site, so reveals read as a single system rather than per-section decisions.
 * Collapses to a plain wrapper when the visitor prefers reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  blur = false,
  className,
  as = 'div',
}: Props) {
  const reduced = useReducedMotion()
  const Tag = motion[as]

  if (reduced) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, ...(blur ? { filter: 'blur(14px)' } : null) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: 'blur(0px)' } : null) }}
      viewport={{ once: true, margin: '-12% 0px -8% 0px' }}
      transition={{
        // The defocus wants longer to resolve than a plain rise does.
        duration: blur ? 1.5 : 0.95,
        delay: delay * 0.07,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Tag>
  )
}

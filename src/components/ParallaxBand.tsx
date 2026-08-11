import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * Full-bleed cinematic band. The photograph is rendered taller than its frame
 * and drifts against the scroll, so the image reads as a window the page moves
 * past rather than a picture pasted onto it.
 *
 * Deliberately restrained: 18% of travel across the whole viewport pass. Enough
 * to feel dimensional, not enough to notice as an effect.
 */
export function ParallaxBand({
  image,
  alt = '',
  align = 'left',
  children,
  height = 'tall',
}: {
  image: string
  alt?: string
  align?: 'left' | 'center'
  children: ReactNode
  height?: 'tall' | 'short'
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['-9%', '9%'])

  const frame = height === 'tall' ? 'min-h-[34rem] md:min-h-[80svh]' : 'min-h-[26rem] md:min-h-[60svh]'

  return (
    <section ref={ref} className={`relative isolate flex items-end overflow-hidden bg-forest ${frame}`}>
      {/* Over-tall image so there is room to travel without exposing an edge */}
      <motion.div aria-hidden className="absolute inset-x-0 -top-[9%] -z-10 h-[118%]" style={reduced ? undefined : { y }}>
        <img src={image} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </motion.div>

      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/90 via-forest/45 to-forest/15"
      />
      <div
        aria-hidden
        className="dotfield-light dotfield-drift fade-t pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 opacity-20"
      />

      <div className="shell relative py-14 md:py-20">
        <div className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}>
          {children}
        </div>
      </div>
    </section>
  )
}

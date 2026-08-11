import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

/**
 * Shared interior-page opening. Deep evergreen field with a dissolving dot
 * lattice, so every subpage inherits the same first impression as the home
 * hero without repeating the photograph.
 */
export function PageHero({
  title,
  lede,
  children,
}: {
  title: ReactNode
  lede?: string
  children?: ReactNode
}) {
  return (
    <section className="grain relative overflow-hidden bg-forest pb-20 pt-36 text-bone md:pb-28 md:pt-44">
      <div aria-hidden className="dotfield-light dotfield-drift fade-b pointer-events-none absolute inset-x-0 top-0 h-[26rem] opacity-25" />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-10 h-[30rem] w-[30rem] rounded-full bg-moss/25 blur-3xl"
      />

      <div className="shell relative">
        <Reveal delay={1}>
          <h1 className="display-lg max-w-4xl text-bone">{title}</h1>
        </Reveal>
        {lede && (
          <Reveal delay={2}>
            <p className="lede mt-8 max-w-2xl text-sage-soft/90">{lede}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={3}>
            <div className="mt-10">{children}</div>
          </Reveal>
        )}
      </div>
    </section>
  )
}

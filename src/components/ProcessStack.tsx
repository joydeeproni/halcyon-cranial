import { ButtonLink } from './Button'
import { Reveal } from './Reveal'
import { process } from '../data/site'

/**
 * The five stages as a stack of pinned panels.
 *
 * Each panel sticks a little lower than the one before, so as you scroll the
 * previous panel is covered down to its header strip and the strips pile up
 * into a running index of where you are. Pure CSS sticky — no scroll listener,
 * no measurement, nothing to fall out of sync.
 *
 * STRIP must equal the rendered height of the header row (h-14), or the
 * panels leave a sliver of the one beneath showing.
 */
const STRIP = 3.5 // rem — matches h-14
const CLEARANCE = 5.5 // rem — room under the fixed site header

export function ProcessStack() {
  return (
    <ol className="shell mt-12 md:mt-16">
      {process.map((stage, i) => (
        <li
          key={stage.n}
          className="pb-4 lg:sticky"
          style={{ top: `${CLEARANCE + i * STRIP}rem` }}
        >
          <article className="overflow-hidden rounded-2xl border border-sage/35 bg-bone shadow-[0_-10px_36px_-24px_rgb(20_29_25_/_0.35)]">
            {/* Header strip — the only part left visible once stacked */}
            <div className="flex h-14 items-center gap-3 px-5 md:px-8">
              <span className="numerals text-[0.875rem] text-clay-deep">Stage {stage.n}</span>
              <span aria-hidden className="h-1 w-1 shrink-0 rounded-full bg-sage" />
              <span className="truncate text-[0.875rem] font-medium text-forest">
                {stage.title}
              </span>
              <span className="numerals ml-auto hidden shrink-0 text-[0.8125rem] text-muted xs:block">
                {stage.duration}
              </span>
            </div>

            <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-2 lg:items-center lg:gap-12 lg:p-10">
              <div>
                <h3 className="display-md text-forest">{stage.title}</h3>
                <p className="mt-4 max-w-lg text-[1.0625rem] leading-relaxed text-moss">
                  {stage.body}
                </p>

                <ul className="mt-7 space-y-3">
                  {stage.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-[0.9375rem] text-moss">
                      <svg
                        aria-hidden
                        width="16"
                        height="16"
                        viewBox="0 0 18 18"
                        fill="none"
                        className="mt-1 shrink-0 text-clay"
                      >
                        <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.1" opacity="0.45" />
                        <path
                          d="M5.5 9.2 7.8 11.5 12.5 6.8"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <ButtonLink to={stage.cta.to} variant="outline">
                    {stage.cta.label}
                  </ButtonLink>
                </div>
              </div>

              <img
                src={stage.image}
                alt=""
                loading="lazy"
                className="aspect-4/3 w-full rounded-xl object-cover lg:aspect-5/4"
              />
            </div>
          </article>
        </li>
      ))}
    </ol>
  )
}

/**
 * Section wrapper, so the home page stays a list of sections.
 *
 * Note the absence of `overflow-hidden` here: it would make this section the
 * sticky containing block and pin the panels inside it rather than to the
 * viewport, which looks like the effect silently not working.
 */
export function ProcessSection() {
  return (
    <section className="relative bg-parchment/70 py-20 md:py-28">
      <div className="shell relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <h2 className="display-md max-w-2xl text-forest">Five stages, none of them rushed.</h2>
          </Reveal>
          <Reveal delay={1}>
            <ButtonLink to="/consultation">Start with stage one</ButtonLink>
          </Reveal>
        </div>
      </div>

      <ProcessStack />
    </section>
  )
}

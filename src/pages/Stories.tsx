import { ButtonLink } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { stories } from '../data/site'

export function Stories() {
  const featured = stories.filter((s) => s.featured)
  const rest = stories.filter((s) => !s.featured)

  return (
    <>
      <PageHero
        title={
          <>
            Told by the people who{' '}
            <span className="italic text-sage-soft">lived them</span>.
          </>
        }
        lede="Shared with permission, and edited only for length. Names are shortened at each person’s request — this is medical information, and it stays theirs."
      />

      {/* Featured, alternating */}
      <section className="shell py-20 md:py-28">
        <div className="space-y-20 md:space-y-28">
          {featured.map((story, i) => (
            <Reveal key={story.name}>
              <figure
                className={`grid items-center gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20 ${
                  i % 2 === 1 ? 'lg:grid-cols-[1.25fr_0.75fr]' : ''
                }`}
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <div className="overflow-hidden arch-sm bg-mist">
                    <img
                      src={story.image ?? ''}
                      alt=""
                      loading="lazy"
                      className="aspect-4/5 w-full object-cover"
                    />
                  </div>
                </div>

                <blockquote className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <p className="display-md font-display font-extralight text-forest">
                    “{story.quote}”
                  </p>
                  <figcaption className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem]">
                    <span className="font-medium text-forest">{story.name}</span>
                    <span aria-hidden className="h-px w-6 bg-sage/50" />
                    <span className="text-muted">{story.context}</span>
                  </figcaption>
                </blockquote>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Remaining */}
      <section className="relative overflow-hidden bg-linen py-20 md:py-28">
        <div aria-hidden className="dotfield fade-b pointer-events-none absolute inset-x-0 top-0 h-40 opacity-30" />
        <div className="shell relative">

          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {rest.map((story, i) => (
              <Reveal as="li" key={story.name} delay={i}>
                <blockquote className="flex h-full flex-col rounded-2xl border border-sage/35 bg-bone/70 p-7 md:p-9">
                  <svg aria-hidden width="24" height="18" viewBox="0 0 24 18" fill="none" className="text-clay-deep/40">
                    <path
                      d="M0 18V9.6C0 4.3 3.1.7 8.2 0l.8 2.7C6 3.6 4.4 5.4 4.4 8h3.4v10H0Zm14.6 0V9.6c0-5.3 3.1-8.9 8.2-9.6l.8 2.7c-3 .9-4.6 2.7-4.6 5.3H22v10h-7.4Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="mt-5 flex-1 text-[1.0625rem] leading-relaxed text-forest">
                    {story.quote}
                  </p>
                  <footer className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-sage/30 pt-5 text-[0.875rem]">
                    <span className="font-medium text-forest">{story.name}</span>
                    <span aria-hidden className="h-px w-5 bg-sage/50" />
                    <span className="text-muted">{story.context}</span>
                  </footer>
                </blockquote>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={2}>
            <div className="mt-16 rounded-3xl border border-sage/35 bg-bone/60 p-8 text-center md:p-12">
              <h2 className="display-sm mx-auto max-w-xl text-forest">
                If we made something for you, we would be glad to hear how it went.
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-moss">
                Only ever published with your written permission, and always in the form you approve.
              </p>
              <div className="mt-7 flex justify-center">
                <ButtonLink to="/contact" variant="outline">
                  Share your experience
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

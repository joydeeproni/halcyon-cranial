import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'motion/react'
import { ButtonLink } from '../components/Button'
import { ParallaxBand } from '../components/ParallaxBand'
import { ProcessSection } from '../components/ProcessStack'
import { Reveal } from '../components/Reveal'
import { StoryCarousel } from '../components/StoryCarousel'
import { conditions, insuranceSteps, posts, stats, stories, team, trustMarks } from '../data/site'

export function Home() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <Opening />
      <Conditions />
      <Craft />
      <AtelierBand />
      <ProcessSection />
      <Team />
      <FeaturedStory />
      <InsuranceBand />
      <JournalTeaser />
    </>
  )
}

/* ------------------------------------------------------------------ hero */

function Hero() {
  const reduced = useReducedMotion()

  return (
    <section className="relative isolate flex min-h-[42rem] items-end overflow-hidden bg-forest pb-12 pt-32 md:min-h-[90svh] md:pb-16">
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10"
        initial={reduced ? undefined : { scale: 1.06, opacity: 0 }}
        animate={reduced ? undefined : { scale: 1, opacity: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/img/hero.jpg"
          alt=""
          className="h-full w-full object-cover object-[68%_center] md:object-[60%_center]"
          fetchPriority="high"
        />
      </motion.div>

      {/* Scrim: heavier on mobile where text sits over the photograph */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-forest/92 via-forest/55 to-forest/25 md:bg-gradient-to-r md:from-forest/90 md:via-forest/45 md:to-transparent"
      />
      <div
        aria-hidden
        className="dotfield-light dotfield-drift fade-t pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-56 opacity-25"
      />

      <div className="shell relative">
        <div className="max-w-3xl">
          <Reveal delay={1} y={26}>
            <h1 className="display-xl text-bone">
              You will recognize
              <br />
              <span className="italic text-sage-soft">yourself</span> again.
            </h1>
          </Reveal>

          <Reveal delay={2}>
            <p className="lede mt-8 max-w-xl text-bone/85">
              Hand-constructed hair prostheses for medical hair loss — fitted with clinical
              precision, in a room with a door that closes. Insurance verified before you commit to
              anything.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap items-center gap-3.5">
              <ButtonLink to="/consultation" variant="light" size="lg">
                Book a private consultation
              </ButtonLink>
              <ButtonLink to="/insurance" variant="glass" size="lg">
                Check my coverage
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- trust strip */

function TrustStrip() {
  return (
    <section aria-label="What to expect" className="relative overflow-hidden border-b border-sage/25 bg-linen">
      <div aria-hidden className="dotfield fade-r pointer-events-none absolute inset-0 opacity-25" />
      <div className="shell relative">
        <ul className="grid gap-x-10 gap-y-2.5 py-5 xs:grid-cols-2 lg:flex lg:justify-between">
          {trustMarks.map((mark) => (
            <li key={mark} className="flex items-center gap-2.5 text-[0.875rem] text-moss">
              <svg aria-hidden width="13" height="13" viewBox="0 0 14 14" fill="none" className="shrink-0 text-clay-deep">
                <path d="M1.5 7.5 5 11l7.5-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {mark}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- opening + stats */

function Opening() {
  return (
    <section className="shell py-20 md:py-28">
      <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <div className="lg:sticky lg:top-32">
            <ButtonLink to="/approach" variant="outline">
              How the process works
            </ButtonLink>
          </div>
        </Reveal>

        <div>
          <Reveal delay={1}>
            <h2 className="display-md max-w-2xl text-forest">
              Medical hair loss is not a cosmetic problem, and we have never treated it like one.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="lede mt-7 max-w-xl text-moss">
              Every prosthesis leaves this studio made to an impression of your own scalp, knotted
              strand by strand, and cut on you rather than on a block. We handle the prescription
              language, the carrier calls and the appeal letters — because the part you should be
              spending energy on is your treatment, not your paperwork.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-3">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={3 + i} blur>
                <div className="border-t border-sage/35 pt-5">
                  <p className="numerals font-display text-[clamp(2.75rem,5vw,4rem)] font-extralight leading-none tracking-[-0.03em] text-forest">
                    {stat.value}
                  </p>
                  <p className="mt-4 text-[0.9375rem] font-medium text-forest">{stat.label}</p>
                  <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-muted">{stat.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------- conditions */

function Conditions() {
  return (
    <section className="relative overflow-hidden bg-linen py-20 md:py-28">
      <div aria-hidden className="dotfield fade-b pointer-events-none absolute inset-x-0 top-0 h-48 opacity-30" />

      <div className="shell relative">
        <div className="max-w-3xl">
          <Reveal delay={1}>
            <h2 className="display-md text-forest">
              Different diagnoses ask different things of a prosthesis.
            </h2>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-sage/25 sm:grid-cols-2 lg:grid-cols-3">
          {conditions.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i % 3}>
              <Link
                to={`/prostheses#${c.slug}`}
                className="group flex h-full flex-col bg-bone p-7 transition-colors duration-500 hover:bg-white md:p-8"
              >
                <span className="numerals font-display text-[1.75rem] font-extralight leading-none text-clay-deep transition-colors duration-500 group-hover:text-forest">
                  {c.n}
                </span>
                <h3 className="display-sm mt-6 text-forest">{c.title}</h3>
                <p className="mt-3.5 flex-1 text-[0.9375rem] leading-relaxed text-moss">{c.body}</p>
                <span className="mt-6 flex items-center gap-2 text-[0.875rem] font-medium text-forest">
                  <span className="link-draw">Read more</span>
                  <svg
                    aria-hidden
                    width="14"
                    height="14"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ craft */

function Craft() {
  return (
    <section className="shell py-20 md:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <img
            src="/img/craft.jpg"
            alt="A specialist hand-tying individual strands of hair into a lace base stretched over a canvas block."
            loading="lazy"
            className="aspect-4/5 w-full rounded-2xl object-cover"
          />
        </Reveal>

        <div>
          <Reveal delay={2}>
            <h2 className="display-md text-forest">
              Forty hours, one strand at a time.
            </h2>
          </Reveal>
          <Reveal delay={3}>
            <p className="lede mt-7 text-moss">
              Each hair is knotted individually into a base cut to your impression, at a density
              that thins deliberately toward the front so the hairline reads as skin rather than as
              an edge. It is slow, unglamorous work, and it is the entire difference between
              something you wear and something you keep checking in windows.
            </p>
          </Reveal>

          {/* Two ways to build the same object, side by side. The gap is the
              argument — so it is set as a comparison rather than a sentence. */}
          <Reveal delay={4}>
            <dl className="mt-10 grid grid-cols-2 overflow-hidden rounded-2xl border border-sage/35">
              <div className="border-r border-sage/35 bg-forest p-6 text-bone md:p-7">
                <dt className="text-[0.8125rem] text-sage">Knotted by hand, here</dt>
                <dd className="numerals mt-3 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extralight leading-none text-bone">
                  40 hours
                </dd>
                <dd className="mt-3 text-[0.8125rem] leading-relaxed text-sage-quiet">
                  One strand at a time, into a base cut to your impression
                </dd>
              </div>
              <div className="bg-linen p-6 md:p-7">
                <dt className="text-[0.8125rem] text-muted">Machine-wefted elsewhere</dt>
                <dd className="numerals mt-3 font-display text-[clamp(2rem,3.4vw,2.75rem)] font-extralight leading-none text-moss">
                  1 day
                </dd>
                <dd className="mt-3 text-[0.8125rem] leading-relaxed text-muted">
                  Rows sewn to a cap, in a shape that was never yours
                </dd>
              </div>
            </dl>
          </Reveal>

          <Reveal delay={5}>
            <blockquote className="mt-10 border-l border-clay/45 pl-6">
              <p className="display-sm font-display italic text-forest">
                “The goal is not a beautiful wig. The goal is that nobody, including you, thinks
                about your hair for the rest of the day.”
              </p>
              <footer className="mt-4 text-[0.875rem] text-moss">
                Marguerite Vale — <span className="text-muted">founder</span>
              </footer>
            </blockquote>
          </Reveal>

          <Reveal delay={6}>
            <div className="mt-10">
              <ButtonLink to="/prostheses" variant="outline">
                Bases, materials and construction
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------- atelier band */

function AtelierBand() {
  return (
    <ParallaxBand
      image="/img/atelier.jpg"
      alt="A long oak workbench by tall windows, with canvas blocks, thread and ventilating needles laid out."
      height="short"
      align="center"
    >
      <Reveal>
        <h2 className="display-md text-bone">
          Nothing here is made anywhere else.
        </h2>
      </Reveal>
      <Reveal delay={1}>
        <p className="lede mx-auto mt-6 max-w-xl text-sage-soft/90">
          One bench, three pairs of hands, and a waiting list we would rather keep than shorten by
          sending the work out.
        </p>
      </Reveal>
    </ParallaxBand>
  )
}

/* ------------------------------------------------------------------- team */

function Team() {
  return (
    <section className="shell py-20 md:py-28">
      <div className="max-w-2xl">
        <Reveal delay={1}>
          <h2 className="display-md text-forest">
            The same three people, from your first call to your fourth year.
          </h2>
        </Reveal>
      </div>

      <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {team.map((person, i) => (
          <Reveal as="li" key={person.name} delay={i}>
            <figure>
              <div className="overflow-hidden arch-sm bg-mist">
                <img
                  src={person.image}
                  alt={`${person.name}, ${person.role}`}
                  loading="lazy"
                  className="aspect-4/5 w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-[1.03]"
                />
              </div>
              <figcaption className="mt-5">
                <h3 className="display-sm text-forest">{person.name}</h3>
                <p className="mt-1.5 text-[0.875rem] text-clay-deep">{person.role}</p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-moss">{person.bio}</p>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

/* -------------------------------------------------------- featured story */

function FeaturedStory() {
  const story = stories[0]

  return (
    <>
      <ParallaxBand
        image="/img/mirror.jpg"
        alt="A woman looking steadily at her own reflection in an arched mirror."
      >
        <Reveal>
          <blockquote>
            <p className="display-lg font-display font-extralight text-bone">“{story.quote}”</p>
            <footer className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.9375rem]">
              <span className="text-bone">{story.name}</span>
              <span aria-hidden className="h-px w-6 bg-sage/50" />
              <span className="text-sage-quiet">{story.context}</span>
            </footer>
          </blockquote>
        </Reveal>
      </ParallaxBand>

      {/* The wall of stories, moving on its own */}
      <section className="overflow-hidden bg-linen py-20 md:py-28">
        <div className="shell">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <Reveal>
              <h2 className="display-md max-w-2xl text-forest">
                Two thousand four hundred people have sat in that chair.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <ButtonLink to="/stories" variant="outline">
                Read their stories
              </ButtonLink>
            </Reveal>
          </div>
        </div>

        <Reveal delay={2} className="mt-12 md:mt-16">
          <StoryCarousel />
        </Reveal>
      </section>
    </>
  )
}

/* -------------------------------------------------------- insurance band */

function InsuranceBand() {
  return (
    <section className="shell py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <Reveal delay={1}>
            <h2 className="display-md text-forest">
              One word on your prescription decides whether this is covered.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="lede mt-7 max-w-lg text-moss">
              “Wig” is a cosmetic purchase. “Cranial prosthesis” is durable medical equipment. Same
              object, different outcome — and most physicians write the first one without knowing.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="mt-9 flex flex-wrap gap-3.5">
              <ButtonLink to="/insurance">How coverage works</ButtonLink>
              <ButtonLink to="/insurance#verify" variant="outline">
                Verify my benefit
              </ButtonLink>
            </div>
          </Reveal>
        </div>

        <ol className="grid gap-px overflow-hidden rounded-2xl bg-sage/25 sm:grid-cols-2">
          {insuranceSteps.map((step, i) => (
            <Reveal as="li" key={step.n} delay={i}>
              <div className="flex h-full flex-col bg-linen p-6 md:p-7">
                <span className="numerals font-display text-[1.5rem] font-extralight leading-none text-clay-deep">
                  {step.n}
                </span>
                <h3 className="mt-5 text-[1.0625rem] font-medium text-forest">{step.title}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-moss">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* --------------------------------------------------------- journal teaser */

function JournalTeaser() {
  return (
    <section className="relative overflow-hidden border-t border-sage/25 bg-linen py-20 md:py-28">
      <div className="shell relative">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Reveal delay={1}>
              <h2 className="display-md text-forest">
                Written for the week you were diagnosed.
              </h2>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <ButtonLink to="/journal" variant="outline">
              All writing
            </ButtonLink>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-x-8 gap-y-12 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i}>
              <Link to={`/journal/${post.slug}`} className="group flex h-full flex-col">
                <div className="overflow-hidden rounded-xl bg-mist">
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    className="aspect-3/2 w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-center gap-3 text-[0.8125rem]">
                  <span className="text-clay-deep">{post.category}</span>
                  <span aria-hidden className="h-px w-4 bg-sage/50" />
                  <span className="numerals text-muted">{post.readingTime}</span>
                </div>
                <h3 className="display-sm mt-3 text-forest transition-colors duration-500 group-hover:text-moss">
                  {post.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-moss">{post.excerpt}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

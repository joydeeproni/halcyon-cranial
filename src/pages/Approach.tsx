import { ButtonLink } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { process, team } from '../data/site'

const principles = [
  {
    title: 'You are never sold to',
    body: 'Nobody here works on commission. If a ready-to-fit piece at $890 would serve you as well as a $3,600 commission, we will tell you so — and we frequently do.',
  },
  {
    title: 'One room, one door',
    body: 'Every appointment is private. There is no shop floor, no other clients in the mirror, and no receptionist asking why you are here in front of anybody else.',
  },
  {
    title: 'Your fitter stays yours',
    body: 'You will not be handed to whoever is available. The person who takes your impression is the person who cuts it on you and refits it three years later.',
  },
  {
    title: 'Nothing is decided in the first hour',
    body: 'The consultation exists to answer questions. You will not be asked for a deposit, a decision, or a measurement unless you ask us to take one.',
  },
]

export function Approach() {
  return (
    <>
      <PageHero
        title={
          <>
            Unhurried, private, and{' '}
            <span className="italic text-sage-soft">medical</span> in the way it should be.
          </>
        }
        lede="From the first conversation to your fourth year of refits — what happens, who does it, and how long each part honestly takes."
      >
        <ButtonLink to="/consultation" variant="light" size="lg">
          Book a private consultation
        </ButtonLink>
      </PageHero>

      {/* The studio */}
      <section className="shell py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <img
              src="/img/studio.jpg"
              alt="A private consultation room with a soft armchair, arched mirror and linen curtains."
              loading="lazy"
              className="aspect-4/3 w-full rounded-2xl object-cover"
            />
          </Reveal>
          <div>
            <Reveal delay={2}>
              <h2 className="display-md text-forest">
                It does not look like a clinic, on purpose.
              </h2>
            </Reveal>
            <Reveal delay={3}>
              <p className="lede mt-7 text-moss">
                People arrive here having already spent a great deal of time in rooms with
                fluorescent light and paper gowns. So this one has an armchair, a kettle, and a
                mirror you can turn away from. You are welcome to bring somebody, and you are
                welcome to come alone.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <dl className="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2">
                <div className="border-t border-sage/35 pt-4">
                  <dt className="text-[0.875rem] font-medium text-forest">In the studio</dt>
                  <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-moss">
                    Boston, Massachusetts. Street parking validated, accessible entrance on
                    Newbury.
                  </dd>
                </div>
                <div className="border-t border-sage/35 pt-4">
                  <dt className="text-[0.875rem] font-medium text-forest">Or remotely</dt>
                  <dd className="mt-1.5 text-[0.875rem] leading-relaxed text-moss">
                    Around half of our commissions never come to Boston. Impression kits ship
                    with a scheduled video call.
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Process, in full */}
      <section className="relative overflow-hidden bg-linen py-20 md:py-28">
        <div aria-hidden className="dotfield fade-b pointer-events-none absolute inset-x-0 top-0 h-48 opacity-30" />
        <div className="shell relative">
          <div className="max-w-2xl">
            <Reveal delay={1}>
              <h2 className="display-md text-forest">The whole sequence, with real durations.</h2>
            </Reveal>
          </div>

          <ol className="mt-14 space-y-px overflow-hidden rounded-2xl bg-sage/25">
            {process.map((step, i) => (
              <Reveal as="li" key={step.n} delay={i}>
                <div className="grid gap-y-4 bg-bone p-7 md:grid-cols-[3.5rem_1fr_10rem] md:gap-x-8 md:p-10">
                  <span className="numerals font-display text-[2rem] font-extralight leading-none text-clay-deep">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="display-sm text-forest">{step.title}</h3>
                    <p className="mt-3 max-w-2xl text-[1.0625rem] leading-relaxed text-moss">
                      {step.body}
                    </p>
                  </div>
                  <span className="numerals self-start text-[0.8125rem] text-muted md:text-right">
                    {step.duration}
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Principles */}
      <section className="shell py-20 md:py-28">
        <div className="max-w-2xl">
          <Reveal delay={1}>
            <h2 className="display-md text-forest">Four commitments we will not trade away.</h2>
          </Reveal>
        </div>

        <ul className="mt-14 grid gap-x-12 gap-y-10 md:grid-cols-2">
          {principles.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i}>
              <div className="border-t border-sage/35 pt-6">
                <h3 className="display-sm text-forest">{p.title}</h3>
                <p className="mt-3 text-[1.0625rem] leading-relaxed text-moss">{p.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Team */}
      <section className="relative overflow-hidden bg-forest py-20 text-bone md:py-28">
        <div aria-hidden className="dotfield-light fade-b pointer-events-none absolute inset-x-0 top-0 h-56 opacity-20" />
        <div className="shell relative">
          <div className="max-w-2xl">
            <Reveal delay={1}>
              <h2 className="display-md text-bone">Small on purpose.</h2>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person, i) => (
              <Reveal as="li" key={person.name} delay={i}>
                <figure>
                  <div className="overflow-hidden arch-sm bg-moss/40">
                    <img
                      src={person.image}
                      alt={`${person.name}, ${person.role}`}
                      loading="lazy"
                      className="aspect-4/5 w-full object-cover"
                    />
                  </div>
                  <figcaption className="mt-5">
                    <h3 className="display-sm text-bone">{person.name}</h3>
                    <p className="mt-1.5 text-[0.875rem] text-sage">{person.role}</p>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-sage-soft/80">
                      {person.bio}
                    </p>
                    <p className="mt-3 text-[0.8125rem] text-sage-quiet">{person.credential}</p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

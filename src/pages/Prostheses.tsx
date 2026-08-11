import { ButtonLink } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { conditions } from '../data/site'

const bases = [
  {
    name: 'Vacuum base',
    for: 'Total or near-total loss',
    body: 'A silicone shell moulded to your impression that holds by suction alone — no tape, no adhesive, no clips. Secure enough to swim and to sleep in. Requires a smooth scalp with little or no anchoring hair.',
    weight: 'Heaviest',
    lead: '8 weeks',
  },
  {
    name: 'French lace',
    for: 'Visible partings and hairlines',
    body: 'Fine lace hand-knotted at a graduated density, so the front edge disappears into the skin. The most natural front available, and the most delicate — expect to replace the lace every eighteen months.',
    weight: 'Lightest',
    lead: '7 weeks',
  },
  {
    name: 'Monofilament',
    for: 'Sensitive or healing scalps',
    body: 'A breathable mesh crown that lets you part the hair in any direction, with a soft cotton band at the perimeter. Our usual recommendation during active treatment.',
    weight: 'Light',
    lead: '6 weeks',
  },
  {
    name: 'Silicone-lined comfort base',
    for: 'Post-surgical and burn sites',
    body: 'Pressure mapped around grafts and healing tissue, with relief built into the areas that must be left alone. Designed in consultation with your surgical team.',
    weight: 'Medium',
    lead: '8 weeks',
  },
]

const tiers = [
  {
    name: 'Ready-to-fit',
    price: 'from $890',
    lead: 'Same week',
    body: 'Stock bases in a range of sizes, cut and coloured on you. The right answer when treatment starts sooner than a custom build allows.',
    includes: ['Professional cut and style', 'One adjustment visit', 'Care kit'],
  },
  {
    name: 'Custom commission',
    price: '$2,400 – $4,800',
    lead: '6 – 8 weeks',
    body: 'Made to an impression of your scalp, hand-knotted strand by strand, at a density and hairline designed for your face.',
    includes: [
      'Impression and density mapping',
      'Three fittings included',
      'Twice-yearly cleaning for two years',
      'Insurance billing and appeals',
    ],
    featured: true,
  },
  {
    name: 'Pediatric commission',
    price: '$1,900 – $3,400',
    lead: '6 weeks',
    body: 'A custom build with a growth allowance in the base and a rebuild scheduled as the head changes.',
    includes: ['Growth allowance', 'Rebuild at 12–18 months', 'Swim and sport fitting'],
  },
]

export function Prostheses() {
  return (
    <>
      <PageHero
        title={
          <>
            The base matters more than{' '}
            <span className="italic text-sage-soft">the hair</span>.
          </>
        }
        lede="Four constructions, each suited to a different scalp and a different life. This page is the honest version of a conversation we have every day."
      />

      {/* Materials */}
      <section className="shell py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <img
              src="/img/materials.jpg"
              alt="Hair swatches in four textures laid on linen beside prosthesis base material, shears and a ventilating needle."
              loading="lazy"
              className="aspect-3/2 w-full rounded-2xl object-cover"
            />
          </Reveal>
          <div>
            <Reveal delay={2}>
              <h2 className="display-md text-forest">European and Southeast Asian hair, single-drawn.</h2>
            </Reveal>
            <Reveal delay={3}>
              <p className="lede mt-7 text-moss">
                Cuticle intact, aligned in one direction, and never acid-stripped. We hold thirty-one
                base shades and blend across them, because natural hair is three colours and a wig
                that is one colour announces itself from across a room.
              </p>
            </Reveal>
            <Reveal delay={4}>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-moss">
                For coily and kinky textures we source separately and match by curl pattern as well
                as shade — a distinction most suppliers do not make, and the reason Naomi leads
                those commissions herself.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Base constructions */}
      <section className="relative overflow-hidden bg-linen py-20 md:py-28">
        <div aria-hidden className="dotfield fade-b pointer-events-none absolute inset-x-0 top-0 h-48 opacity-30" />
        <div className="shell relative">
          <div className="max-w-2xl">
            <Reveal delay={1}>
              <h2 className="display-md text-forest">Four bases, and who each one is for.</h2>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-sage/25 md:grid-cols-2">
            {bases.map((base, i) => (
              <Reveal as="li" key={base.name} delay={i % 2}>
                <div className="flex h-full flex-col bg-bone p-7 md:p-9">
                  <h3 className="display-sm text-forest">{base.name}</h3>
                  <p className="mt-2 text-[0.875rem] text-clay-deep">{base.for}</p>
                  <p className="mt-4 flex-1 text-[0.9375rem] leading-relaxed text-moss">{base.body}</p>
                  <dl className="mt-7 flex gap-8 border-t border-sage/30 pt-4">
                    <div>
                      <dt className="text-[0.75rem] text-muted">Weight</dt>
                      <dd className="mt-0.5 text-[0.875rem] text-forest">{base.weight}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.75rem] text-muted">Build time</dt>
                      <dd className="numerals mt-0.5 text-[0.875rem] text-forest">{base.lead}</dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Conditions, anchored from the home page */}
      <section className="shell py-20 md:py-28">
        <div className="max-w-2xl">
          <Reveal delay={1}>
            <h2 className="display-md text-forest">What each diagnosis asks for.</h2>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-sage/35">
          {conditions.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i % 3}>
              <div id={c.slug} className="scroll-mt-32 border-b border-sage/35 py-8 md:py-10">
                <div className="grid gap-4 md:grid-cols-[3rem_18rem_1fr] md:gap-x-8">
                  <span className="numerals font-display text-[1.5rem] font-extralight leading-none text-clay-deep">
                    {c.n}
                  </span>
                  <h3 className="display-sm text-forest">{c.title}</h3>
                  <p className="max-w-2xl text-[1.0625rem] leading-relaxed text-moss">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Investment */}
      <section className="relative overflow-hidden bg-parchment/70 py-20 md:py-28">
        <div className="shell relative">
          <div className="max-w-2xl">
            <Reveal delay={1}>
              <h2 className="display-md text-forest">Published prices, because guessing is worse.</h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="lede mt-7 text-moss">
                Most clients receive partial reimbursement, and every quote is itemised before you
                commit. Payment plans are available at no interest over six months.
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-6 lg:grid-cols-3">
            {tiers.map((tier, i) => (
              <Reveal as="li" key={tier.name} delay={i}>
                <div
                  className={`flex h-full flex-col rounded-2xl p-7 md:p-8 ${
                    tier.featured
                      ? 'bg-forest text-bone'
                      : 'border border-sage/35 bg-bone/70 text-forest'
                  }`}
                >
                  <h3 className={`display-sm ${tier.featured ? 'text-bone' : 'text-forest'}`}>
                    {tier.name}
                  </h3>
                  <p
                    className={`numerals mt-4 font-display text-[1.75rem] font-extralight leading-none ${
                      tier.featured ? 'text-sage-soft' : 'text-clay-deep'
                    }`}
                  >
                    {tier.price}
                  </p>
                  <p
                    className={`mt-4 text-[0.9375rem] leading-relaxed ${
                      tier.featured ? 'text-sage-soft/85' : 'text-moss'
                    }`}
                  >
                    {tier.body}
                  </p>

                  <ul className="mt-7 flex-1 space-y-2.5 border-t pt-5"
                      style={{ borderColor: tier.featured ? 'rgb(199 214 204 / 0.25)' : 'rgb(125 150 134 / 0.3)' }}>
                    {tier.includes.map((inc) => (
                      <li
                        key={inc}
                        className={`flex items-start gap-2.5 text-[0.875rem] ${
                          tier.featured ? 'text-sage-soft/85' : 'text-moss'
                        }`}
                      >
                        <svg
                          aria-hidden
                          width="13"
                          height="13"
                          viewBox="0 0 14 14"
                          fill="none"
                          className={`mt-1 shrink-0 ${tier.featured ? 'text-sage' : 'text-clay-deep'}`}
                        >
                          <path d="M1.5 7.5 5 11l7.5-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {inc}
                      </li>
                    ))}
                  </ul>

                  <p
                    className={`numerals mt-6 text-[0.8125rem] ${
                      tier.featured ? 'text-sage-quiet' : 'text-muted'
                    }`}
                  >
                    Ready in {tier.lead}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={4}>
            <div className="mt-12 flex flex-wrap gap-3.5">
              <ButtonLink to="/consultation" size="lg">
                Book a consultation
              </ButtonLink>
              <ButtonLink to="/insurance#verify" variant="outline" size="lg">
                Verify my insurance first
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

import { Accordion } from '../components/Accordion'
import { ButtonLink } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { faqs, org } from '../data/site'

export function Faq() {
  return (
    <>
      <PageHero
        title={
          <>
            Answered properly, including the{' '}
            <span className="italic text-sage-soft">awkward ones</span>.
          </>
        }
        lede="If yours is not here, ask it. Nothing on this list is a question we mind being asked."
      />

      <section className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal delay={1}>
              <p className="text-[0.9375rem] leading-relaxed text-moss">
                Written by our clinical team rather than by a marketing department, which is why some
                of the answers are longer than you might expect and none of them say “it depends” and
                stop there.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-8 border-t border-sage/35 pt-6">
                <p className="text-[0.875rem] font-medium text-forest">Still unsure?</p>
                <p className="mt-2 text-[0.875rem] leading-relaxed text-moss">
                  Call {org.phone} between nine and five, and you will reach one of the three people
                  whose photographs are on this site.
                </p>
                <div className="mt-5">
                  <ButtonLink to="/contact" variant="outline" size="sm">
                    Ask us directly
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <Accordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* FAQ structured data — the page's SEO payload */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />
    </>
  )
}

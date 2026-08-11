import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { org } from '../data/site'

const sections = [
  {
    heading: 'What we collect, and why',
    paras: [
      'To make a prosthesis and to pursue reimbursement on your behalf we collect your name, contact details, date of birth, diagnosis, physician’s prescription, insurance plan details, scalp measurements and photographs, and notes from your appointments. This is protected health information, and it is collected for those two purposes only.',
      'We also collect ordinary analytics about how this website is used — pages viewed, approximate region, device type. That data is aggregated, contains no health information, and is never joined to your patient record.',
    ],
  },
  {
    heading: 'How it is protected',
    paras: [
      'Everything you submit through this site travels over TLS 1.3 and is stored encrypted at rest in a HIPAA-eligible system operated under a signed Business Associate Agreement. Uploaded documents go directly to encrypted storage and are never delivered to an ordinary email inbox.',
      'Access is limited to the three members of staff who need it. Every access is logged. Records are retained for seven years as required by Massachusetts law, then destroyed.',
    ],
  },
  {
    heading: 'Who we share it with',
    paras: [
      'Your insurance carrier, when you have authorized us to verify or bill on your behalf. Your referring physician, where they have requested confirmation of supply. Nobody else — without your specific written permission — unless compelled by law.',
      'We do not sell your information. We do not share it with advertising networks. We do not use your health information for marketing of any kind, including our own.',
    ],
  },
  {
    heading: 'Your rights',
    paras: [
      'You may request a copy of your record, ask us to correct it, ask for a list of every disclosure we have made, or ask us to restrict how it is used. You may withdraw consent at any time, though this may prevent us from continuing an insurance claim already in progress.',
      'To exercise any of these rights, write to our Privacy Officer at the address below. We will respond within thirty days.',
    ],
  },
  {
    heading: 'Cookies',
    paras: [
      'This site sets a small number of cookies: one to remember your cookie preference, and analytics cookies that are set only after you consent. No cookie on this site records anything about your health, and declining analytics does not limit any part of the site.',
    ],
  },
  {
    heading: 'Complaints',
    paras: [
      'If you believe your privacy rights have been violated you may complain to us directly, and you may also complain to the U.S. Department of Health and Human Services Office for Civil Rights. We will never retaliate against anybody for making a complaint.',
    ],
  },
]

export function Privacy() {
  return (
    <>
      <PageHero
        title="What we know about you, and what we do with it."
        lede="Written to be read. If any part of this is unclear, that is a fault in our writing and we would like to hear about it."
      />

      <section className="shell-narrow py-16 md:py-24">
        <Reveal>
          <p className="text-[0.8125rem] text-muted">
            Effective 1 January 2026 · Applies to {org.name} and this website
          </p>
        </Reveal>

        {sections.map((section, i) => (
          <Reveal key={section.heading} delay={i % 3}>
            <div className="mt-14 border-t border-sage/35 pt-8">
              <h2 className="display-sm text-forest">{section.heading}</h2>
              {section.paras.map((p) => (
                <p key={p} className="mt-5 text-[1.0625rem] leading-[1.72] text-moss">
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        ))}

        <Reveal>
          <div className="mt-14 rounded-2xl border border-sage/35 bg-linen/70 p-7">
            <h2 className="display-sm text-forest">Privacy Officer</h2>
            <address className="mt-4 text-[1rem] not-italic leading-relaxed text-moss">
              {org.name}
              <br />
              {org.address.line1}
              <br />
              {org.address.city}, {org.address.region} {org.address.postal}
              <br />
              <a href={`mailto:privacy@halcyoncranial.com`} className="link-draw mt-2 inline-block text-clay-deep">
                privacy@halcyoncranial.com
              </a>
            </address>
          </div>
        </Reveal>
      </section>
    </>
  )
}

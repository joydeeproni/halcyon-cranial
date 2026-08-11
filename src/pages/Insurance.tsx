import { useState } from 'react'
import { Button } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { Checkbox, Field, PrivacyNote, SecureUpload, Select } from '../components/Form'
import { trackEvent } from '../lib/analytics'
import { codingReference, insuranceSteps } from '../data/site'

const carriers = [
  'Aetna',
  'Blue Cross Blue Shield',
  'Cigna',
  'UnitedHealthcare',
  'Harvard Pilgrim',
  'Tufts Health Plan',
  'Medicare',
  'Medicaid / MassHealth',
  'Other',
]

export function Insurance() {
  return (
    <>
      <PageHero
        title={
          <>
            We do the paperwork.{' '}
            <span className="italic text-sage-soft">All of it.</span>
          </>
        }
        lede="Verification, submission, and the appeal if it comes to that — written by somebody who has overturned hundreds of denials. There is no charge for any of it."
      />

      {/* The one word */}
      <section className="shell py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
          <div>
            <Reveal delay={1}>
              <h2 className="display-md text-forest">
                Ask your physician for the words “cranial prosthesis”.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="lede mt-7 text-moss">
                It is the single highest-leverage thing you can do. A prescription that says “wig”
                describes a cosmetic purchase and will be denied by almost every carrier in the
                country. The same document, describing the same object, as a{' '}
                <em className="font-display italic">cranial prosthesis</em> describes durable medical
                equipment — and durable medical equipment is a covered benefit.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8 rounded-2xl border border-clay/35 bg-clay-soft/25 p-6">
                <p className="font-display text-[0.9375rem] italic text-clay-deep">
                  Wording you can hand your physician
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-forest">
                  “Patient requires a cranial prosthesis secondary to [diagnosis]. This is a medical
                  necessity, not a cosmetic request. Diagnosis code [ICD-10]. Please supply as
                  durable medical equipment.”
                </p>
              </div>
            </Reveal>
          </div>

          <ol className="grid gap-px self-start overflow-hidden rounded-2xl bg-sage/25 sm:grid-cols-2">
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

      {/* Coding reference */}
      <section className="relative overflow-hidden bg-linen py-20 md:py-28">
        <div aria-hidden className="dotfield fade-b pointer-events-none absolute inset-x-0 top-0 h-40 opacity-30" />
        <div className="shell relative">
          <div className="max-w-2xl">
            <Reveal delay={1}>
              <h2 className="display-md text-forest">The codes, so nobody has to look them up.</h2>
            </Reveal>
          </div>

          <Reveal delay={2}>
            {/* Scrolls sideways on narrow screens, so it needs to be reachable
                by keyboard in its own right. */}
            <div
              className="mt-12 overflow-x-auto"
              tabIndex={0}
              role="region"
              aria-label="Billing and diagnosis codes"
            >
              <table className="w-full min-w-2xl border-collapse text-left">
                <thead>
                  <tr className="border-b border-sage/40">
                    <th scope="col" className="py-3 pr-6 text-[0.8125rem] font-medium text-muted">Code</th>
                    <th scope="col" className="py-3 pr-6 text-[0.8125rem] font-medium text-muted">Description</th>
                    <th scope="col" className="py-3 text-[0.8125rem] font-medium text-muted">Typically used by</th>
                  </tr>
                </thead>
                <tbody>
                  {codingReference.map((row) => (
                    <tr key={row.code} className="border-b border-sage/25">
                      <td className="numerals py-4 pr-6 align-top text-[0.9375rem] font-medium text-forest">
                        {row.code}
                      </td>
                      <td className="py-4 pr-6 align-top text-[0.9375rem] text-moss">{row.meaning}</td>
                      <td className="py-4 align-top text-[0.9375rem] text-moss">{row.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <p className="mt-6 max-w-2xl text-[0.8125rem] leading-relaxed text-muted">
              Coding requirements change annually and vary by carrier and state. Ruth confirms the
              correct current code with your specific plan during verification — you do not need to
              get this right yourself.
            </p>
          </Reveal>

          {/* However the paperwork arrives, it is our problem and not yours. */}
          <Reveal delay={4}>
            <div className="mt-14 rounded-2xl border border-sage/35 bg-bone/60 p-6 md:p-8">
              <p className="text-[1.0625rem] font-medium text-forest">
                Send it however it reaches you.
              </p>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {[
                  'Secure upload',
                  'A photograph on your phone',
                  'Fax from your physician',
                  'Patient portal export',
                  'Post',
                ].map((channel) => (
                  <li
                    key={channel}
                    className="rounded-full border border-sage/40 bg-white/70 px-4 py-2 text-[0.875rem] text-moss"
                  >
                    {channel}
                  </li>
                ))}
              </ul>
              <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-moss">
                A blurred photograph of a prescription taken in a car park is a perfectly good
                starting point. We would rather chase the legible copy ourselves than have you
                delay because the paperwork is not tidy.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <VerificationForm />
    </>
  )
}

/* ------------------------------------------------- verification form */

function VerificationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [consent, setConsent] = useState(false)
  const [carrier, setCarrier] = useState('')

  return (
    <section id="verify" className="scroll-mt-24 py-20 md:py-28">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal delay={1}>
              <h2 className="display-md text-forest">Find out what you would pay.</h2>
            </Reveal>
            <Reveal delay={2}>
              <p className="lede mt-7 text-moss">
                Send us your plan details and Ruth will call your carrier, confirm your benefit and
                deductible, and email you a written estimate — usually within two business days.
              </p>
            </Reveal>
            <Reveal delay={3}>
              <div className="mt-8">
                <PrivacyNote>
                  This form is transmitted over TLS 1.3 and stored in a HIPAA-compliant system under
                  a signed Business Associate Agreement. Your details are visible only to your
                  fitter and to our insurance liaison, and are never used for marketing.
                </PrivacyNote>
              </div>
            </Reveal>
          </div>

          <Reveal delay={2}>
            <div className="rounded-3xl border border-sage/35 bg-linen/70 p-6 md:p-10">
              {submitted ? (
                <Confirmation
                  title="Sent securely."
                  body="Ruth has your details and will call your carrier within one business day. You will receive a written estimate at the email address you gave us — check your spam folder if it has not arrived in three days."
                  onReset={() => setSubmitted(false)}
                  resetLabel="Submit another verification"
                />
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                    // Carrier is a business dimension, not health information.
                    trackEvent('insurance_verification_submitted', { carrier })
                  }}
                  className="space-y-6"
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="First name" name="firstName" required autoComplete="given-name" />
                    <Field label="Last name" name="lastName" required autoComplete="family-name" />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Email" name="email" type="email" required autoComplete="email" />
                    <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
                  </div>

                  <Field label="Date of birth" name="dob" type="date" required
                    hint="Carriers will not release benefit information without it." />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Select
                      label="Insurance carrier"
                      name="carrier"
                      required
                      value={carrier}
                      onChange={(e) => setCarrier(e.target.value)}
                      options={[
                        { value: '', label: 'Select your carrier' },
                        ...carriers.map((c) => ({ value: c, label: c })),
                      ]}
                    />
                    <Field label="Member ID" name="memberId" required />
                  </div>

                  {carrier === 'Other' && (
                    <Field label="Carrier name" name="carrierOther" required
                      hint="We work with plans nationwide, including smaller regional carriers." />
                  )}

                  <Field label="Group number" name="groupNumber" optional />

                  <Select
                    label="Do you have a prescription yet?"
                    name="prescription"
                    options={[
                      { value: 'yes-cranial', label: 'Yes — it says “cranial prosthesis”' },
                      { value: 'yes-wig', label: 'Yes — but it says “wig”' },
                      { value: 'no', label: 'Not yet' },
                      { value: 'unsure', label: 'I am not sure what it says' },
                    ]}
                    hint="If it says “wig”, we will send your physician the corrected wording. This happens constantly and it is easily fixed."
                  />

                  <SecureUpload
                    label="Insurance card and prescription"
                    hint="Front and back of your card, plus the prescription if you have it. Uploads go directly to encrypted storage — they never touch an inbox."
                  />

                  <div className="border-t border-sage/30 pt-6">
                    <Checkbox checked={consent} onChange={setConsent}>
                      I authorize Halcyon Cranial Studio to contact my insurance carrier on my
                      behalf to verify benefits, and I have read the{' '}
                      <a href="/privacy" className="link-draw font-medium text-clay-deep">
                        privacy notice
                      </a>
                      .
                    </Checkbox>
                  </div>

                  <Button type="submit" size="lg" arrow disabled={!consent} className="w-full sm:w-auto">
                    Send securely
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Confirmation({
  title,
  body,
  onReset,
  resetLabel,
}: {
  title: string
  body: string
  onReset: () => void
  resetLabel: string
}) {
  return (
    <div className="py-6 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-clay-soft/60">
        <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" fill="none" className="text-clay-deep">
          <path d="M4 12.5 9.5 18 20 6.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h3 className="display-md mt-7 text-forest">{title}</h3>
      <p className="mx-auto mt-5 max-w-md text-[1.0625rem] leading-relaxed text-moss">{body}</p>
      <button
        type="button"
        onClick={onReset}
        className="link-draw mt-8 text-[0.9375rem] font-medium text-clay-deep"
      >
        {resetLabel}
      </button>
    </div>
  )
}

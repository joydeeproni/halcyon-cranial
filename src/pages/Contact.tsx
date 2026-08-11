import { useState } from 'react'
import { Button } from '../components/Button'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { ChoiceCards, Checkbox, Field, PrivacyNote, TextArea } from '../components/Form'
import { Confirmation } from './Insurance'
import { trackEvent } from '../lib/analytics'
import { org } from '../data/site'

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [reason, setReason] = useState('question')
  const [consent, setConsent] = useState(false)

  const clinical = reason === 'clinical'

  return (
    <>
      <PageHero
        title={
          <>
            A person will answer.{' '}
            <span className="italic text-sage-soft">Usually the same day.</span>
          </>
        }
        lede="No ticket numbers, no chatbot, no queue. Three people work here and all of them read this inbox."
      />

      <section className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* Details */}
          <div>

            <Reveal delay={1}>
              <dl className="mt-8 space-y-7">
                <div className="border-t border-sage/35 pt-5">
                  <dt className="text-[0.875rem] font-medium text-forest">Telephone</dt>
                  <dd className="mt-1.5">
                    <a
                      href={org.phoneHref}
                      className="numerals font-display text-[1.5rem] font-light text-forest transition-colors hover:text-clay-deep"
                    >
                      {org.phone}
                    </a>
                  </dd>
                </div>

                <div className="border-t border-sage/35 pt-5">
                  <dt className="text-[0.875rem] font-medium text-forest">Email</dt>
                  <dd className="mt-1.5">
                    <a
                      href={`mailto:${org.email}`}
                      className="text-[1.0625rem] text-forest transition-colors hover:text-clay-deep"
                    >
                      {org.email}
                    </a>
                  </dd>
                  <dd className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
                    Please do not send medical details or insurance cards by email — use the secure
                    form instead.
                  </dd>
                </div>

                <div className="border-t border-sage/35 pt-5">
                  <dt className="text-[0.875rem] font-medium text-forest">Studio</dt>
                  <dd className="mt-1.5 text-[1.0625rem] leading-relaxed text-moss">
                    {org.address.line1}
                    <br />
                    {org.address.city}, {org.address.region} {org.address.postal}
                  </dd>
                </div>

                <div className="border-t border-sage/35 pt-5">
                  <dt className="text-[0.875rem] font-medium text-forest">Hours</dt>
                  <dd className="mt-2 space-y-1.5">
                    {org.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-6 text-[0.9375rem] text-moss">
                        <span>{h.days}</span>
                        <span className="numerals">{h.time}</span>
                      </div>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={1}>
            <div className="rounded-3xl border border-sage/35 bg-linen/70 p-6 md:p-10">
              {submitted ? (
                <Confirmation
                  title="Message received."
                  body="One of us will reply within one business day — sooner if you told us treatment is starting. If it is urgent, please call instead; we would rather you did."
                  onReset={() => setSubmitted(false)}
                  resetLabel="Send another message"
                />
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                    trackEvent('contact_submitted', { reason })
                  }}
                  className="space-y-6"
                >
                  <ChoiceCards
                    legend="What is this about?"
                    name="reason"
                    value={reason}
                    onChange={setReason}
                    options={[
                      { value: 'question', label: 'A general question' },
                      { value: 'clinical', label: 'My own hair loss', note: 'Includes health details' },
                      { value: 'insurance', label: 'Insurance or billing' },
                      { value: 'referral', label: 'I am a clinician referring' },
                    ]}
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" required autoComplete="name" />
                    <Field label="Email" type="email" required autoComplete="email" />
                  </div>

                  <Field label="Phone" type="tel" optional autoComplete="tel"
                    hint="Only if you would rather we called." />

                  <TextArea
                    label="How can we help?"
                    required
                    placeholder={
                      clinical
                        ? 'Tell us as much or as little as you like. There is no wrong amount.'
                        : 'A sentence or two is plenty.'
                    }
                  />

                  {clinical && (
                    <PrivacyNote>
                      Because you have told us this concerns your own health, this message is routed
                      into our HIPAA-compliant record system rather than to a standard inbox, and is
                      readable only by clinical staff.
                    </PrivacyNote>
                  )}

                  <div className="border-t border-sage/30 pt-6">
                    <Checkbox checked={consent} onChange={setConsent}>
                      I have read the{' '}
                      <a href="/privacy" className="link-draw font-medium text-clay-deep">
                        privacy notice
                      </a>{' '}
                      and consent to Halcyon contacting me about my enquiry.
                    </Checkbox>
                  </div>

                  <Button type="submit" size="lg" arrow disabled={!consent} className="w-full sm:w-auto">
                    Send message
                  </Button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

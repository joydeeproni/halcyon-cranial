import { useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Button } from '../components/Button'
import { PageHero } from '../components/PageHero'
import {
  ChoiceCards,
  Checkbox,
  Field,
  PrivacyNote,
  SecureUpload,
  Select,
  TextArea,
} from '../components/Form'
import { Confirmation } from './Insurance'
import { trackEvent } from '../lib/analytics'
import { org } from '../data/site'

const steps = [
  { n: '01', label: 'About you' },
  { n: '02', label: 'Your situation' },
  { n: '03', label: 'Appointment' },
  { n: '04', label: 'Consent' },
]

const times = ['9:00', '10:30', '13:00', '14:30', '16:00']

/** Next ten weekdays, formatted for the slot picker. */
function useUpcomingDays() {
  return useMemo(() => {
    const out: { iso: string; weekday: string; day: string; month: string }[] = []
    const cursor = new Date()
    cursor.setDate(cursor.getDate() + 2)
    while (out.length < 10) {
      const dow = cursor.getDay()
      if (dow !== 0 && dow !== 6) {
        out.push({
          iso: cursor.toISOString().slice(0, 10),
          weekday: cursor.toLocaleDateString('en-US', { weekday: 'short' }),
          day: cursor.toLocaleDateString('en-US', { day: 'numeric' }),
          month: cursor.toLocaleDateString('en-US', { month: 'short' }),
        })
      }
      cursor.setDate(cursor.getDate() + 1)
    }
    return out
  }, [])
}

export function Consultation() {
  const [step, setStep] = useState(0)
  const [done, setDone] = useState(false)
  const reduced = useReducedMotion()
  const days = useUpcomingDays()

  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    format: 'studio',
    diagnosis: '',
    stage: '',
    urgency: '',
    notes: '',
    date: '',
    time: '',
    consentPhi: false,
    consentTelehealth: false,
  })

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((f) => ({ ...f, [key]: value }))

  const canAdvance = [
    form.firstName && form.lastName && form.email && form.phone,
    form.diagnosis && form.stage,
    form.date && form.time,
    form.consentPhi,
  ][step]

  if (done) {
    return (
      <>
        <PageHero title="Your consultation is booked." />
        <section className="shell py-20 md:py-28">
          <div className="mx-auto max-w-2xl rounded-3xl border border-sage/35 bg-linen/70 p-8 md:p-12">
            <Confirmation
              title="We will see you soon."
              body={`A confirmation is on its way to ${form.email}, with a secure video link if you chose a remote appointment and directions if you are coming to the studio. If anything changes, call us on ${org.phone} — you will reach a person.`}
              onReset={() => {
                setDone(false)
                setStep(0)
              }}
              resetLabel="Book another appointment"
            />
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHero
        title={
          <>
            Sixty minutes, and{' '}
            <span className="italic text-sage-soft">nothing decided</span> in them.
          </>
        }
        lede="No fitting, no measurements, no obligation. Bring your questions and, if you like, somebody to sit with you."
      />

      <section className="shell py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* Progress rail — vertical on desktop, collapsed to a bar on mobile */}
          <div className="hidden lg:sticky lg:top-32 lg:block lg:self-start">

            <ol className="mt-8 space-y-1">
              {steps.map((s, i) => {
                const active = i === step
                const complete = i < step
                return (
                  <li key={s.n}>
                    <button
                      type="button"
                      onClick={() => i < step && setStep(i)}
                      disabled={i > step}
                      className={`flex w-full items-center gap-4 rounded-xl px-4 py-3.5 text-left transition-all duration-500 ${
                        active
                          ? 'bg-forest text-bone'
                          : complete
                            ? 'text-forest hover:bg-forest/[0.05]'
                            : 'text-moss/45'
                      }`}
                    >
                      <span
                        className={`numerals font-display text-[1.0625rem] font-extralight ${
                          active ? 'text-sage-soft' : complete ? 'text-clay-deep' : 'text-moss/40'
                        }`}
                      >
                        {complete ? '✓' : s.n}
                      </span>
                      <span className="text-[0.9375rem]">{s.label}</span>
                    </button>
                  </li>
                )
              })}
            </ol>

            <div className="mt-8">
              <PrivacyNote>
                Everything on this page travels over an encrypted connection into a HIPAA-compliant
                record system. We will never ask you to email medical details.
              </PrivacyNote>
            </div>
          </div>

          {/* Panels */}
          <div className="rounded-3xl border border-sage/35 bg-linen/70 p-6 md:p-10">
            {/* Compact mobile stepper */}
            <div className="mb-8 lg:hidden">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-[0.9375rem] font-medium text-forest">{steps[step].label}</p>
                <p className="numerals text-[0.8125rem] text-muted">
                  Step {step + 1} of {steps.length}
                </p>
              </div>
              <div className="mt-3 flex gap-1.5" aria-hidden>
                {steps.map((s, i) => (
                  <span
                    key={s.n}
                    className={`h-0.5 flex-1 rounded-full transition-colors duration-500 ${
                      i <= step ? 'bg-clay' : 'bg-sage/35'
                    }`}
                  />
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (step < steps.length - 1) {
                  const next = step + 1
                  setStep(next)
                  // Step completion, so drop-off can be found in Analytics.
                  trackEvent('booking_step_complete', { step: steps[step].label })
                } else {
                  setDone(true)
                  // No PHI in the payload — diagnosis and notes are never sent.
                  trackEvent('booking_confirmed', { format: form.format })
                }
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={reduced ? undefined : { opacity: 0, x: 18 }}
                  animate={reduced ? undefined : { opacity: 1, x: 0 }}
                  exit={reduced ? undefined : { opacity: 0, x: -18 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {step === 0 && (
                    <fieldset className="space-y-6">
                      <legend className="display-sm mb-6 text-forest">
                        First, how do we reach you?
                      </legend>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="First name"
                          required
                          autoComplete="given-name"
                          value={form.firstName}
                          onChange={(e) => set('firstName', e.target.value)}
                        />
                        <Field
                          label="Last name"
                          required
                          autoComplete="family-name"
                          value={form.lastName}
                          onChange={(e) => set('lastName', e.target.value)}
                        />
                      </div>

                      <div className="grid gap-5 sm:grid-cols-2">
                        <Field
                          label="Email"
                          type="email"
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={(e) => set('email', e.target.value)}
                        />
                        <Field
                          label="Phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={form.phone}
                          onChange={(e) => set('phone', e.target.value)}
                        />
                      </div>

                      <ChoiceCards
                        legend="Where would you like to meet?"
                        name="format"
                        value={form.format}
                        onChange={(v) => set('format', v)}
                        options={[
                          { value: 'studio', label: 'In the studio', note: 'Boston, Massachusetts' },
                          { value: 'video', label: 'Secure video call', note: 'From anywhere in the US' },
                        ]}
                      />
                    </fieldset>
                  )}

                  {step === 1 && (
                    <fieldset className="space-y-6">
                      <legend className="display-sm mb-6 text-forest">
                        Tell us only what you want to.
                      </legend>

                      <Select
                        label="What is causing your hair loss?"
                        value={form.diagnosis}
                        onChange={(e) => set('diagnosis', e.target.value)}
                        required
                        options={[
                          { value: '', label: 'Select one' },
                          { value: 'alopecia', label: 'Alopecia areata, totalis or universalis' },
                          { value: 'chemo', label: 'Chemotherapy or radiation' },
                          { value: 'ffa', label: 'Frontal fibrosing alopecia' },
                          { value: 'trich', label: 'Trichotillomania' },
                          { value: 'surgical', label: 'Post-surgical, burn or trauma' },
                          { value: 'undiagnosed', label: 'I do not have a diagnosis yet' },
                          { value: 'private', label: 'I would rather discuss it in person' },
                        ]}
                      />

                      <ChoiceCards
                        legend="Where are you in the process?"
                        name="stage"
                        columns={1}
                        value={form.stage}
                        onChange={(v) => set('stage', v)}
                        options={[
                          {
                            value: 'anticipating',
                            label: 'Anticipating loss',
                            note: 'Treatment has not started, or shedding has just begun',
                          },
                          {
                            value: 'current',
                            label: 'Currently losing hair',
                            note: 'This is happening now',
                          },
                          {
                            value: 'established',
                            label: 'Loss is established',
                            note: 'Months or years in, and looking for something better',
                          },
                          {
                            value: 'replacing',
                            label: 'Replacing a prosthesis',
                            note: 'I already wear one and want a better fit',
                          },
                        ]}
                      />

                      <Select
                        label="How soon do you need this?"
                        value={form.urgency}
                        onChange={(e) => set('urgency', e.target.value)}
                        options={[
                          { value: '', label: 'Select one' },
                          { value: 'urgent', label: 'Within two weeks — treatment is starting' },
                          { value: 'month', label: 'Within a month' },
                          { value: 'flexible', label: 'No particular deadline' },
                        ]}
                        hint="If treatment starts sooner than a custom build allows, we will bridge you with a ready-to-fit piece."
                      />

                      <TextArea
                        label="Anything you would like us to know first?"
                        optional
                        value={form.notes}
                        onChange={(e) => set('notes', e.target.value)}
                        placeholder="How you wear your hair now, what worries you most, whether you would rather we did not use the word wig — anything at all."
                      />

                      <SecureUpload
                        label="Photographs or prescription"
                        hint="Entirely optional. A photograph of your hair before loss helps enormously with colour matching, but it can wait until we have spoken."
                      />
                    </fieldset>
                  )}

                  {step === 2 && (
                    <fieldset>
                      <legend className="display-sm mb-6 text-forest">
                        Choose a time that suits you.
                      </legend>

                      <p className="mb-6 text-[0.9375rem] leading-relaxed text-moss">
                        {form.format === 'video'
                          ? 'A secure video link will be sent with your confirmation. No app to install.'
                          : `${org.address.line1}, ${org.address.city}. Parking is validated.`}
                      </p>

                      <div>
                        <span className="mb-3 block text-[0.875rem] font-medium text-forest">Date</span>
                        <div className="no-scrollbar -mx-1 flex snap-x gap-2.5 overflow-x-auto px-1 pb-2">
                          {days.map((d) => {
                            const active = form.date === d.iso
                            return (
                              <button
                                key={d.iso}
                                type="button"
                                onClick={() => set('date', d.iso)}
                                aria-pressed={active}
                                aria-label={new Date(`${d.iso}T00:00:00`).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                                className={`flex shrink-0 snap-start flex-col items-center gap-0.5 rounded-xl border px-4 py-3 transition-all duration-300 ${
                                  active
                                    ? 'border-clay bg-clay-soft/40 ring-3 ring-clay/12'
                                    : 'border-sage/35 bg-white/60 hover:border-sage/70 hover:bg-white'
                                }`}
                              >
                                <span className="text-[0.75rem] text-muted">{d.weekday}</span>
                                <span className="numerals font-display text-[1.375rem] font-light leading-none text-forest">
                                  {d.day}
                                </span>
                                <span className="text-[0.6875rem] text-muted">{d.month}</span>
                              </button>
                            )
                          })}
                        </div>
                      </div>

                      <div className="mt-8">
                        <span className="mb-3 block text-[0.875rem] font-medium text-forest">Time</span>
                        <div className="flex flex-wrap gap-2.5">
                          {times.map((t) => {
                            const active = form.time === t
                            return (
                              <button
                                key={t}
                                type="button"
                                disabled={!form.date}
                                onClick={() => set('time', t)}
                                aria-pressed={active}
                                aria-label={`${t} appointment`}
                                className={`numerals rounded-full border px-5 py-2.5 text-[0.9375rem] transition-all duration-300 disabled:opacity-40 ${
                                  active
                                    ? 'border-clay bg-clay-soft/40 text-forest ring-3 ring-clay/12'
                                    : 'border-sage/35 bg-white/60 text-forest hover:border-sage/70 hover:bg-white'
                                }`}
                              >
                                {t}
                              </button>
                            )
                          })}
                        </div>
                        {!form.date && (
                          <p className="mt-3 text-[0.8125rem] text-muted">Pick a date first.</p>
                        )}
                      </div>
                    </fieldset>
                  )}

                  {step === 3 && (
                    <fieldset className="space-y-6">
                      <legend className="display-sm mb-6 text-forest">
                        Two consents, in plain English.
                      </legend>

                      <div className="space-y-5 rounded-2xl border border-sage/30 bg-white/60 p-5 md:p-6">
                        <Checkbox
                          checked={form.consentPhi}
                          onChange={(v) => set('consentPhi', v)}
                        >
                          I understand that the health information I provide will be stored in a
                          HIPAA-compliant record system, used to plan my care and to pursue insurance
                          reimbursement on my behalf, and shared with nobody else without my written
                          permission. I have read the{' '}
                          <a href="/privacy" className="link-draw font-medium text-clay-deep">
                            privacy notice
                          </a>
                          .{' '}
                          <span className="text-clay-deep">(required)</span>
                        </Checkbox>

                        <div className="border-t border-sage/25 pt-5">
                          <Checkbox
                            checked={form.consentTelehealth}
                            onChange={(v) => set('consentTelehealth', v)}
                          >
                            If we meet by video, I consent to a remote consultation and understand it
                            is not a substitute for examination by my physician.{' '}
                            <span className="text-muted">
                              (only needed for video appointments)
                            </span>
                          </Checkbox>
                        </div>
                      </div>

                      <dl className="rounded-2xl border border-sage/30 bg-mist/40 p-5 md:p-6">
                        <div className="flex flex-wrap justify-between gap-2 border-b border-sage/25 pb-3">
                          <dt className="text-[0.875rem] text-moss">Appointment</dt>
                          <dd className="numerals text-[0.875rem] font-medium text-forest">
                            {form.date
                              ? new Date(`${form.date}T00:00:00`).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                })
                              : '—'}{' '}
                            at {form.time || '—'}
                          </dd>
                        </div>
                        <div className="flex flex-wrap justify-between gap-2 border-b border-sage/25 py-3">
                          <dt className="text-[0.875rem] text-moss">Format</dt>
                          <dd className="text-[0.875rem] font-medium text-forest">
                            {form.format === 'video' ? 'Secure video call' : 'In the studio'}
                          </dd>
                        </div>
                        <div className="flex flex-wrap justify-between gap-2 pt-3">
                          <dt className="text-[0.875rem] text-moss">Duration</dt>
                          <dd className="numerals text-[0.875rem] font-medium text-forest">60 minutes</dd>
                        </div>
                      </dl>

                      <PrivacyNote>
                        No payment is taken now, and there is nothing to cancel — if you change your
                        mind, simply do not come. We would rather that than have you feel committed.
                      </PrivacyNote>
                    </fieldset>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Controls */}
              <div className="mt-10 flex items-center justify-between gap-4 border-t border-sage/30 pt-6">
                {step > 0 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s - 1)}
                    className="link-draw text-[0.9375rem] text-moss transition-colors hover:text-forest"
                  >
                    Back
                  </button>
                ) : (
                  <span />
                )}

                <Button type="submit" size="lg" arrow disabled={!canAdvance}>
                  {step === steps.length - 1 ? 'Confirm appointment' : 'Continue'}
                </Button>
              </div>
            </form>
          </div>

          <div className="lg:hidden">
            <PrivacyNote>
              Everything on this page travels over an encrypted connection into a HIPAA-compliant
              record system. We will never ask you to email medical details.
            </PrivacyNote>
          </div>
        </div>
      </section>
    </>
  )
}

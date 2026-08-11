import { ButtonLink } from '../components/Button'

export function NotFound() {
  return (
    <section className="grain relative flex min-h-[70svh] items-center overflow-hidden bg-forest py-32 text-bone">
      <div aria-hidden className="dotfield-light fade-radial pointer-events-none absolute inset-0 opacity-20" />
      <div className="shell relative text-center">
        <h1 className="display-lg mx-auto max-w-2xl text-bone">
          This page has moved, or never existed.
        </h1>
        <p className="lede mx-auto mt-7 max-w-lg text-sage-soft/85">
          Either way, the two things most people are looking for are below.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3.5">
          <ButtonLink to="/consultation" variant="light" size="lg">
            Book a consultation
          </ButtonLink>
          <ButtonLink to="/" variant="glass" size="lg">
            Return home
          </ButtonLink>
        </div>
      </div>
    </section>
  )
}

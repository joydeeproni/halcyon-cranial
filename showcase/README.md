# Halcyon Cranial Studio — website & patient intake

Brand, UX and front-end build for a cranial prosthesis practice.
Eight interaction studies at 1600×1200, plus a project cover.

---

## The company

Halcyon Cranial Studio makes custom hair prostheses for people experiencing
medical hair loss — alopecia areata and universalis, chemotherapy and radiation,
frontal fibrosing alopecia, trichotillomania, paediatric loss, and post-surgical
cases. Each piece is made to an impression of the client's scalp and hand-knotted
strand by strand, then cut on the person rather than on a block.

The practice also absorbs the administrative side of the process: writing the
prescription language, verifying insurance benefits, submitting claims, and
appealing denials on the client's behalf.

## The brief

Design and build a site that reads as a premium healthcare brand rather than a
beauty retailer, and that carries the weight of the decision a visitor is
actually making. Three problems shaped it:

1. **The category is misfiled.** Cranial prostheses are routinely marketed as
   wigs. That single word is also the difference between a reimbursed medical
   device and an uncovered cosmetic purchase, so the distinction had to be a
   structural argument across the site, not a line of copy.
2. **The audience is mid-crisis.** Most visitors arrive within days of a
   diagnosis. The IA had to let someone find cost, coverage and timeline in
   under a minute, while letting someone else read slowly.
3. **Intake carries protected health information.** Booking, insurance
   verification and document upload had to feel unhurried and private while
   behaving correctly — encrypted transport, explicit consent, and no medical
   detail collected without a reason the visitor can see.

## Approach

**Research into structure.** Conditions served, base constructions and the
five-stage process each became a navigable content model rather than prose, so
the same source drives the home page, the detail pages and the search-visible
markup.

**Trust as an interface problem.** Published pricing, real durations against
each stage, a coding reference for the client's physician, and a privacy note
sitting beside every field that asks for health data. Reassurance is placed at
the moment of hesitation rather than collected on a policy page.

**A restrained, deliberate visual system.** Deep evergreen and warm bone with a
single terracotta accent used sparingly. Hairline rules instead of shadows. An
arch motif drawn from the photography and repeated across portraiture and the
brand mark. Commissioned-style imagery throughout, no stock.

**Motion with a job.** Every animation either establishes hierarchy, signals
state, or shows progress. Nothing decorates. All of it stops under
`prefers-reduced-motion`.

**Measured, not assumed.** Interaction flows and an automated accessibility
audit run against all eleven routes at mobile and desktop widths — currently
zero WCAG 2.1 AA violations, verified against the live deployment.

---

## The studies

### 00 · Cover
`00-cover.png`

Project cover. The brand panel carries the mark and positioning; the site bleeds
off the frame behind it, pairing the emotional register of the hero with the
structural work of the process sequence.

### 01 · Hero entrance
`01-hero-entrance.gif`

The landing moment. The photograph settles from a slow scale while the headline,
supporting copy and calls to action arrive on a staggered rise, so the eye is led
down the page in the order the content should be read. A dot lattice drifts
continuously behind the image at a speed intended to register as atmosphere
rather than animation. Composition holds the subject to the right so the type has
uncontested space.

### 02 · Proof figures
`02-stat-figures-blur-in.gif`

Three credibility figures resolve out of a defocus as they enter the viewport.
The blur gives the numerals a moment of arrival that a plain fade does not, which
matters because these are the only hard numbers on the page. Each figure carries
a qualifying line beneath it, so the claim and its condition are read together
rather than the figure standing alone.

### 03 · Process sequence
`03-process-stack-scroll.gif`

The five stages as pinned panels. Each stage sticks slightly lower than the last,
so the previous panel is progressively covered down to its header strip and the
strips accumulate into a running index of where the visitor is in the sequence.
Solving the core problem of a long linear process: the reader can see how far
through they are without losing the stages already passed. Every panel carries
its duration, a short checklist and a contextual next step.

### 04 · Client stories
`04-testimonial-marquee.gif`

A continuously moving wall of client experiences, each card pairing a portrait
with the person's own words and their diagnosis and fitting year. Motion is used
to imply volume — this is a practice with a long history of clients, and a static
grid of three would undersell it. The track pauses on hover and on keyboard
focus, so reading is never a race against the animation.

### 05 · Closing invitation
`05-closing-invitation.gif`

The final ask, deliberately low-pressure: sixty minutes, no fitting, no
obligation. Set on the deep evergreen field that bookends the page, with the
booking action and a phone number given equal weight — a visitor in distress
should not be forced through a form to reach a person.

### 06 · Insurance verification
`06-insurance-verification-form.gif`

The most consequential flow on the site. The form collects plan details, reveals
a conditional field when the carrier is not listed, and gates submission behind
an explicit authorisation to contact the carrier. A privacy note sits alongside
rather than beneath, and uploads are framed as going to encrypted storage — the
reassurance appears at the moment the visitor is deciding whether to hand over
their information.

### 07 · Story reveal
`07-story-reveal.gif`

Long-form testimonial layout. The portrait is masked into the arch motif carried
through the identity, and the quotation is set large enough to be the primary
element on the screen. Attribution is deliberately minimal — first name, initial,
diagnosis and year — because this is medical information and it stays the
client's.

### 08 · Questions
`08-faq-accordion.gif`

Cost, coverage, timelines and the awkward questions, answered at length. Panels
expand in place with a measured easing so the reader keeps their position, and
the open item is marked in the accent colour. Written to answer rather than
deflect, which is why several answers run longer than an FAQ usually would.

---

**Note.** This is a design prototype. Company details, figures, testimonials,
staff and billing references are placeholder content for design review, and the
photography is generated rather than licensed.

# Halcyon Cranial Studio

A custom, responsive marketing and patient-intake site for a cranial prosthesis practice.
Built as a working site rather than a mockup: every page, form and interaction below runs.

**Status: design prototype for client review.** All copy, names, statistics, testimonials and
billing codes are invented placeholders. Read *Before this goes live* before showing it to
anyone who might mistake it for a live business.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into dist/
npm run preview    # serve the production build
```

Verification:

```bash
npm run verify     # build, then interaction checks, then the accessibility audit
npm run shots      # design-review screenshots into shots/ (desktop + mobile)
```

`flows` and `a11y` expect a server running — `npm run preview` in another terminal, or
`BASE=http://localhost:5173 npm run flows` against the dev server.

---

## What's here

| Route | Purpose |
| --- | --- |
| `/` | Home — hero, conditions served, craft, process, team, story, insurance, journal |
| `/approach` | The studio, the five stages with real durations, four commitments, the team |
| `/prostheses` | Materials, four base constructions, conditions by diagnosis, published pricing |
| `/insurance` | Prescription wording, coding reference, **benefit verification form** |
| `/consultation` | **Four-step booking and intake wizard** with date/time selection and consent |
| `/stories` | Testimonials |
| `/journal` + `/journal/:slug` | Filterable index and a full editorial article template |
| `/faq` | Accordion with `FAQPage` structured data |
| `/contact` | Details and a branching contact form |
| `/privacy` | HIPAA notice and privacy policy |
| anything else | 404 |

### Design system

- **Type** — Newsreader (editorial serif; display, italic section labels, oversized numerals)
  paired with Hanken Grotesk (warm grotesque; body and UI).
- **Colour** — deep evergreen and warm bone, with terracotta as the single accent. Tokens live
  in `src/index.css` under `@theme`; nothing hardcodes a hex outside that block.
- **Motion set pieces** — `<ProcessStack>` (the five stages as pinned panels that stack into a
  running index — pure CSS `position: sticky`, no scroll listener),
  `<ParallaxBand>` (full-bleed image drifting 18% against the scroll),
  `<StoryCarousel>` (seamless testimonial marquee, pauses on hover and focus), `.dotfield-drift`
  (the hero lattice moving on a 60s loop), and `<Reveal blur>` for figures that resolve out of a
  defocus. All four stop under `prefers-reduced-motion`.
- **Motifs** — the arch (`.arch`, `.arch-sm`), echoing the window in the brand photography;
  halftone dot fields (`.dotfield*` with `.fade-*` masks) as section transitions; hairline
  rules instead of drop shadows; grain over large flat fields.
- **Motion** — one shared easing and distance, via `<Reveal>`. Everything collapses to static
  under `prefers-reduced-motion`.

### Photography

The fourteen images in `public/img/` were generated for this prototype and are consistent in
palette and treatment. **They are not licensed stock and no release exists for the people
depicted** — replace them with commissioned or licensed photography before launch.

---

## Editing content after launch

Most changes need no code. In a Webflow or Squarespace rebuild, each of these becomes a CMS
collection with the same fields.

**`src/data/site.ts`** — the file to open first:

| Export | Controls |
| --- | --- |
| `org` | Name, phone, email, address, opening hours. Used in the header, footer and contact page. |
| `trustMarks` | The four reassurance items under the hero |
| `stats` | The three oversized figures on the home page |
| `conditions` | The six diagnoses. Adding one adds a home card *and* a section on `/prostheses`. |
| `process` | The five stages — title, duration, body, checklist `points`, `image` and a `cta`. Drives the stacking panels on the home page and the plain list on `/approach`. |
| `team` | Staff — name, role, photo path, bio, credential |
| `stories` | Testimonials. `featured: true` promotes one to the large alternating layout. |
| `insuranceSteps`, `codingReference` | The insurance explainer and the code table |
| `faqs` | Accordion entries. These also feed the FAQ structured data automatically. |
| `posts` | Journal index entries |
| `nav` | Header and footer navigation |

**Article bodies** live in `bodies` in `src/pages/JournalPost.tsx`, as a list of typed blocks
(`p`, `h2`, `quote`, `list`, `aside`). A post in `posts` without a matching entry falls back to
a holding message rather than breaking.

**Page-specific content** — base constructions and pricing tiers sit at the top of
`src/pages/Prostheses.tsx`; the four commitments at the top of `src/pages/Approach.tsx`;
privacy sections at the top of `src/pages/Privacy.tsx`. They are plain arrays at the top of
each file, above the markup.

**SEO** — per-page titles and meta descriptions are in `src/lib/seo.ts`, one entry per route.
Journal posts derive theirs from the post's title and excerpt.

---

## Analytics and Search Console

Analytics is wired but dormant. Nothing loads and no cookie is set until a visitor accepts
the consent banner — deliberate, given the site handles health information on the same origin.

1. Create a GA4 property, copy the measurement ID.
2. Put it in `.env` as `VITE_GA_ID=G-XXXXXXXXXX` (see `.env.example`), then rebuild.
3. In Search Console, choose HTML-tag verification and replace
   `REPLACE_WITH_SEARCH_CONSOLE_TOKEN` in `index.html`.
4. Submit `https://halcyoncranial.com/sitemap.xml`. Update the domain in `sitemap.xml`,
   `robots.txt`, `index.html` and `src/lib/seo.ts` first.

Conversion events already fire: `booking_step_complete`, `booking_confirmed`,
`insurance_verification_submitted`, `contact_submitted`. None carries health information —
diagnosis, notes and uploads are never sent to Analytics.

---

## Before this goes live

These are not optional, and none of them is something I can complete from the code alone.

1. **The forms do not submit anywhere.** They validate, branch, gate on consent and show
   confirmations, but no data leaves the browser. This is intentional — see below.

2. **HIPAA needs a Business Associate Agreement, and that is a business decision.** The site
   *says* intake is HIPAA-compliant; it will not be until a BAA is signed and the forms post to
   a covered service. Squarespace forms are not HIPAA-eligible at all. Webflow requires an
   Enterprise plan with a signed BAA. In practice this means routing intake, uploads and
   scheduling through a vetted provider — Jotform HIPAA, IntakeQ, Formstack or similar — and
   embedding it behind this design. The `SecureUpload` component is built for that: it collects
   files client-side so the picker can be pointed at a signed direct-to-storage URL, keeping
   PHI off any server of ours.

3. **Every factual claim is invented.** "2,400+ prostheses", "9 in 10 claims reimbursed",
   pricing, staff names and credentials, testimonials, the 2009 founding date. Healthcare
   advertising claims are regulated; each one needs to be verified or removed. Testimonials
   need written, signed permission on file.

4. **The billing codes need professional review.** A9282, S8095, L65.9 and L64.8 are the codes
   commonly cited for cranial prostheses, but coding changes annually and varies by carrier and
   state. Have the client's billing counsel confirm before publishing a page that physicians
   will act on.

5. **Replace the photography** (see above).

6. **The privacy notice is a draft, not legal advice.** It needs review by counsel, a named
   Privacy Officer, and a real effective date.

---

## Accessibility

`npm run a11y` runs axe-core against all eleven routes at 390px and 1440px, checking WCAG 2.1
A and AA. It currently reports zero violations and exits non-zero if that regresses — worth
keeping in CI.

Beyond the automated pass: keyboard navigation works throughout, focus is visible against both
the light and evergreen fields, the booking wizard is operable without a mouse, and all motion
respects `prefers-reduced-motion`. Contrast of secondary text is why `--color-muted` and
`--color-sage-quiet` exist rather than opacity modifiers — blended text kept landing under
4.5:1 at 13–14px.

Not yet covered: screen-reader testing with a real user, and a focus-trap in the mobile menu
(it closes on navigation and on Escape via the browser, but focus is not cycled inside it).

## Performance

Routes are code-split; the home page ships ~124KB gzipped of JS and ~10KB of CSS. Images are
resized and compressed (2.8MB total for fourteen). Fonts are preconnected and swap.

Worth doing before launch: serve AVIF/WebP alongside the JPEGs with `<picture>`, self-host the
two font families to drop the Google Fonts round-trip, and add width/height attributes to the
remaining images to nail down CLS.

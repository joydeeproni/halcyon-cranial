/**
 * Single source of truth for site content.
 *
 * Everything a non-technical editor would reasonably want to change lives
 * here rather than inside components. In a Webflow/Squarespace build these
 * become CMS collections; the shapes below map 1:1 to those collections.
 *
 * NOTE: all figures, names, quotes and codes are PLACEHOLDER content for
 * design review and must be verified by the client before launch.
 */

export const org = {
  name: 'Halcyon Cranial Studio',
  shortName: 'Halcyon',
  tagline: 'Custom cranial prostheses for medical hair loss',
  phone: '(617) 555-0142',
  phoneHref: 'tel:+16175550142',
  email: 'care@halcyoncranial.com',
  address: {
    line1: '128 Newbury Street, Suite 300',
    city: 'Boston',
    region: 'MA',
    postal: '02116',
  },
  hours: [
    { days: 'Monday – Thursday', time: '9:00 – 17:00' },
    { days: 'Friday', time: '9:00 – 14:00' },
    { days: 'Saturday', time: 'By appointment' },
  ],
  founded: 2009,
}

/** Reassurance strip under the hero. */
export const trustMarks = [
  'HIPAA-compliant intake',
  'Insurance verification handled for you',
  'Virtual and in-studio fittings',
  'Nationwide shipping, discreetly packed',
]

export const stats = [
  {
    value: '2,400+',
    label: 'Prostheses fitted',
    note: `Commissioned and delivered since ${org.founded}`,
  },
  {
    value: '9 in 10',
    label: 'Claims reimbursed in part',
    note: 'When a physician’s prescription is on file',
  },
  {
    value: '3',
    label: 'Fittings included',
    note: 'Every commission, at no additional cost',
  },
]

/** Conditions served — doubles as the site's primary SEO surface. */
export const conditions = [
  {
    n: '01',
    title: 'Alopecia areata & universalis',
    body: 'Patchy or complete loss, often sudden. We design for a scalp with no anchoring hair, using vacuum or adhesive-free suction bases that stay put through a full day.',
    slug: 'alopecia',
  },
  {
    n: '02',
    title: 'Chemotherapy & radiation',
    body: 'Fitted before treatment begins wherever possible, so the transition is yours to control. We hold your measurements for the regrowth stage.',
    slug: 'oncology',
  },
  {
    n: '03',
    title: 'Trichotillomania',
    body: 'Discreet, breathable coverage that protects the scalp and interrupts the cycle, made without judgement and without questions you would rather not answer.',
    slug: 'trichotillomania',
  },
  {
    n: '04',
    title: 'Frontal fibrosing alopecia',
    body: 'Scarring at the hairline calls for an exceptionally light front edge. We hand-tie a graduated density that reads as skin, not as a seam.',
    slug: 'ffa',
  },
  {
    n: '05',
    title: 'Pediatric hair loss',
    body: 'For children and teenagers, with a growth allowance built into the base and a rebuild scheduled as the head changes. Parents sit in on every stage.',
    slug: 'pediatric',
  },
  {
    n: '06',
    title: 'Post-surgical & burn',
    body: 'Working alongside your surgical team around grafts, flaps and healing tissue, with pressure mapped to avoid the areas that need to be left alone.',
    slug: 'post-surgical',
  },
]

export const process = [
  {
    n: '01',
    title: 'Consultation',
    duration: '60 minutes',
    body: 'A private conversation — in the studio or over secure video. We talk about your diagnosis, your treatment timeline, how you wear your hair now, and what you want to stop thinking about.',
    points: [
      'No fitting, measurements or deposit taken',
      'Bring somebody, or come alone',
      'Insurance checked before you decide anything',
    ],
    image: '/img/studio.jpg',
    cta: { label: 'Book a consultation', to: '/consultation' },
  },
  {
    n: '02',
    title: 'Impression & design',
    duration: '90 minutes',
    body: 'A plaster impression of your scalp, density mapping, and colour matched against your own hair — from a photograph if it has already gone.',
    points: [
      'Thirty-one base shades, blended rather than matched to one',
      'Density mapped to thin toward the hairline',
      'Curl pattern matched as carefully as colour',
    ],
    image: '/img/materials.jpg',
    cta: { label: 'Bases and materials', to: '/prostheses' },
  },
  {
    n: '03',
    title: 'Hand construction',
    duration: '6 – 8 weeks',
    body: 'Each strand is individually knotted into the base by hand. A machine-made cap takes a day; this takes upwards of forty hours, and it is the reason it moves the way it does.',
    points: [
      'Forty hours of knotting, one strand at a time',
      'Built to your impression, not to a stock block',
      'A ready-to-fit piece bridges you if treatment starts sooner',
    ],
    image: '/img/craft.jpg',
    cta: { label: 'How a base is chosen', to: '/journal/how-a-base-is-chosen' },
  },
  {
    n: '04',
    title: 'Fitting & cut',
    duration: '2 visits',
    body: 'We adjust the base to the millimetre, then cut and style it on you — never on a block. You leave wearing it.',
    points: [
      'Three fittings included in every commission',
      'Cut on you, with the mirror turned away until you ask',
      'Adjusted until it is right, however long that takes',
    ],
    image: '/img/stage-fitting.jpg',
    cta: { label: 'What it costs', to: '/prostheses' },
  },
  {
    n: '05',
    title: 'Aftercare',
    duration: 'Ongoing',
    body: 'Refitting as your scalp changes, cleaning and re-knotting twice a year, and a direct line to your fitter. Not a support ticket.',
    points: [
      'Twice-yearly cleaning and re-knotting for two years',
      'Refitted free as your scalp changes',
      'The same fitter, for as long as you want them',
    ],
    image: '/img/stage-aftercare.jpg',
    cta: { label: 'Questions answered', to: '/faq' },
  },
]

export const team = [
  {
    name: 'Marguerite Vale',
    role: 'Founder, Certified Prosthetic Hair Specialist',
    image: '/img/team-1.jpg',
    bio: 'Twenty-two years in prosthetic hair, the last fourteen at Halcyon. Trained in Brussels; certified through the American Hair Loss Council.',
    credential: 'CPHS, ABCHS',
  },
  {
    name: 'Naomi Okafor',
    role: 'Lead Fitter & Textured Hair Specialist',
    image: '/img/team-2.jpg',
    bio: 'Specialises in coily and kinky textures, and in bases for scalps with active alopecia. Leads our pediatric commissions.',
    credential: 'CPHS',
  },
  {
    name: 'Ruth Ellery',
    role: 'Patient Advocate & Insurance Liaison',
    image: '/img/team-3.jpg',
    bio: 'Fifteen years in medical billing. Ruth writes the appeal letters, calls the carriers, and has overturned more denials than anyone we know.',
    credential: 'CPC',
  },
]

export const stories = [
  {
    quote:
      'I had spent four months avoiding my own reflection. Marguerite cut it on me, turned the chair around, and I cried — because it was just my hair. Nobody at work ever knew.',
    name: 'Dana R.',
    context: 'Alopecia universalis · Fitted 2024',
    image: '/img/story-1.jpg',
    featured: true,
  },
  {
    quote:
      'They fitted me two weeks before my first infusion, which meant I never had a day of not recognising myself. That was a gift I did not know to ask for.',
    name: 'Helen M.',
    context: 'Breast cancer · Fitted 2023',
    image: '/img/story-2.jpg',
    featured: true,
  },
  {
    quote:
      'Ruth got a flat denial reversed into 80% coverage. She sent me the letter she wrote. I have never had anyone in healthcare fight for me like that.',
    name: 'Priya S.',
    context: 'Chemotherapy-induced alopecia · Fitted 2025',
    image: '/img/story-3.jpg',
    featured: false,
  },
  {
    quote:
      'My daughter was eleven and would not go to school. She wears it to swim practice now. That sentence is the whole review.',
    name: 'Cathleen B.',
    context: 'Parent · Pediatric commission 2024',
    image: '/img/story-4.jpg',
    featured: false,
  },
  {
    quote:
      'I had worn the same three synthetic pieces for nine years and assumed that was simply the deal. Nobody had ever matched a curl pattern to mine before. It moves.',
    name: 'Yvonne A.',
    context: 'Frontal fibrosing alopecia · Fitted 2025',
    image: '/img/story-5.jpg',
    featured: false,
  },
]

/**
 * Insurance guidance. HCPCS/ICD-10 references are the codes commonly used
 * for cranial prostheses — the client must confirm current-year coding with
 * their billing counsel before this page goes live.
 */
export const insuranceSteps = [
  {
    n: '01',
    title: 'Ask for the right words',
    body: 'Your physician’s prescription should read “cranial prosthesis” — never “wig”. The same object under the wrong noun is a cosmetic purchase, and cosmetic purchases are not covered.',
  },
  {
    n: '02',
    title: 'Send us the plan details',
    body: 'Upload your card and prescription through the encrypted form. You will not be asked to email a photograph of your insurance card to anyone here.',
  },
  {
    n: '03',
    title: 'We verify, in writing',
    body: 'Ruth calls your carrier, confirms benefit and deductible, and sends you a written estimate of your out-of-pocket cost before you commit to anything.',
  },
  {
    n: '04',
    title: 'We bill, and we appeal',
    body: 'We submit the claim on your behalf. If it is denied, we write the appeal — including the letter of medical necessity — at no charge.',
  },
]

export const codingReference = [
  { code: 'A9282', meaning: 'Wig, any type (HCPCS)', use: 'Most commercial carriers' },
  { code: 'S8095', meaning: 'Breast prosthesis adhesive / cranial prosthesis', use: 'Select regional plans' },
  { code: 'L65.9', meaning: 'Nonscarring hair loss, unspecified (ICD-10)', use: 'Diagnosis code' },
  { code: 'L64.8', meaning: 'Other androgenic alopecia (ICD-10)', use: 'Diagnosis code' },
]

export const faqs = [
  {
    q: 'Is a cranial prosthesis the same thing as a wig?',
    a: 'Physically they are relatives; medically and legally they are not. A cranial prosthesis is prescribed by a physician for diagnosed medical hair loss, made to an impression of your scalp, and coded as durable medical equipment. That distinction is what makes reimbursement possible — and it is why we are careful about the language on every document we send.',
  },
  {
    q: 'Will my insurance cover it?',
    a: 'Frequently, in part. Coverage depends on your carrier, your plan year, and whether the prescription uses the correct terminology. Nine in ten of our clients receive some reimbursement. We verify your benefit in writing before you commit to a commission, so you are never guessing at the number.',
  },
  {
    q: 'How much does a commission cost?',
    a: 'Custom hand-tied commissions run from $2,400 to $4,800 depending on base construction, hair length and density. Ready-to-fit prostheses start at $890. Every quote is itemised, and we will tell you honestly when a ready-to-fit piece would serve you just as well as a custom one.',
  },
  {
    q: 'How long does it take?',
    a: 'Six to eight weeks from impression to first fitting for a custom commission. If you are starting chemotherapy sooner than that, tell us — we keep ready-to-fit inventory precisely for this, and we can bridge you until the custom piece is ready.',
  },
  {
    q: 'Can I do this without travelling to Boston?',
    a: 'Yes. Around half of our commissions are fitted remotely. We send a measurement and impression kit with a video call scheduled to walk you through it, and adjustments are handled by post with a local stylist we brief directly.',
  },
  {
    q: 'Can I sleep, swim and exercise in it?',
    a: 'In a vacuum or suction base, yes — including swimming and inversion. We will be direct with you about which base construction supports which life. If you are in the pool four mornings a week, that changes what we make.',
  },
  {
    q: 'What happens to my medical information?',
    a: 'Intake forms, uploads and messages are transmitted over encrypted connections and stored in a HIPAA-compliant system under a Business Associate Agreement. Your records are visible to your fitter and to our insurance liaison, and to nobody else. We do not use your information for marketing, and we do not sell it — ever.',
  },
  {
    q: 'Do you work with children?',
    a: 'Yes, from around age five. Pediatric commissions include a growth allowance and a scheduled rebuild, usually every twelve to eighteen months. A parent or guardian is present at every appointment, and we let the child make as many of the decisions as they want to.',
  },
  {
    q: 'What if I hate it?',
    a: 'Then it is not finished. Custom work is adjusted until it is right — that is what the three included fittings are for. In the rare case where we cannot get there, we will say so and refund the balance of the commission.',
  },
  {
    q: 'How do I care for it?',
    a: 'Wash it every ten to fourteen wears with the sulphate-free products we send you, dry it on a stand rather than a head, and bring it in twice a year for professional cleaning and re-knotting. We will show you all of it at your final fitting, and you can always call.',
  },
]

export const posts = [
  {
    slug: 'the-word-on-your-prescription',
    title: 'The word on your prescription is worth thousands of dollars',
    excerpt:
      'Why “cranial prosthesis” and “wig” are not interchangeable on paper, and exactly what to ask your physician to write.',
    category: 'Insurance',
    date: '2026-07-14',
    readingTime: '6 min',
    image: '/img/materials.jpg',
    featured: true,
  },
  {
    slug: 'before-your-first-infusion',
    title: 'What to arrange before your first infusion',
    excerpt:
      'A practical sequence for the two weeks between diagnosis and treatment, written with oncology nurses rather than at them.',
    category: 'Oncology care',
    date: '2026-06-02',
    readingTime: '8 min',
    image: '/img/studio.jpg',
    featured: false,
  },
  {
    slug: 'how-a-base-is-chosen',
    title: 'How a base is chosen, and why it matters more than the hair',
    excerpt:
      'Silicone, monofilament, French lace, vacuum. What each one asks of your scalp, and what it gives back.',
    category: 'Craft',
    date: '2026-04-21',
    readingTime: '9 min',
    image: '/img/craft.jpg',
    featured: false,
  },
  {
    slug: 'talking-to-your-child',
    title: 'Talking to your child about hair loss',
    excerpt:
      'Language that helps, language that quietly harms, and how to let a nine-year-old lead the decision.',
    category: 'Pediatric',
    date: '2026-03-08',
    readingTime: '7 min',
    image: '/img/story-2.jpg',
    featured: false,
  },
]

export const nav = [
  { label: 'Our approach', to: '/approach' },
  { label: 'Prostheses', to: '/prostheses' },
  { label: 'Insurance', to: '/insurance' },
  { label: 'Stories', to: '/stories' },
  { label: 'Journal', to: '/journal' },
  { label: 'Questions', to: '/faq' },
]

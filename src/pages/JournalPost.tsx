import { Link, useParams } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { Reveal } from '../components/Reveal'
import { posts } from '../data/site'

/**
 * Article bodies. In a CMS build this is the rich-text field on the post
 * collection; the block types below are the ones the editor gets.
 */
type Block =
  | { type: 'p'; text: string }
  | { type: 'h2'; text: string }
  | { type: 'quote'; text: string }
  | { type: 'list'; items: string[] }
  | { type: 'aside'; title: string; text: string }

const bodies: Record<string, Block[]> = {
  'the-word-on-your-prescription': [
    {
      type: 'p',
      text: 'There is a sentence that decides whether your prosthesis costs you four thousand dollars or four hundred, and it is not a sentence you write. It is written by a physician who has perhaps ninety seconds left in your appointment, and who is choosing between two words that mean the same object and entirely different things.',
    },
    {
      type: 'p',
      text: 'The two words are “wig” and “cranial prosthesis”. Almost every carrier in the United States treats the first as a cosmetic purchase, which is to say not covered, ever, under any plan. The second describes durable medical equipment prescribed for a diagnosed condition — the same category as a brace, a compression garment, or a breast prosthesis. Durable medical equipment is a covered benefit under the overwhelming majority of commercial plans.',
    },
    {
      type: 'quote',
      text: 'It is the same object. The noun is the difference between a denial and a reimbursement.',
    },
    { type: 'h2', text: 'Why physicians write the wrong one' },
    {
      type: 'p',
      text: 'Not carelessness. “Wig” is simply the word people use, including patients, and a physician writing quickly will use the word the patient used. Most have never been told the distinction matters, because nobody in their training had reason to tell them. The billing consequence lands weeks later, on somebody else’s desk, and nobody traces it back.',
    },
    {
      type: 'p',
      text: 'So the correction has to come from you, or from us. We would rather it came from us — but it helps enormously if you know to ask.',
    },
    {
      type: 'aside',
      title: 'What to ask for, verbatim',
      text: '“Patient requires a cranial prosthesis secondary to [diagnosis]. This is a medical necessity, not a cosmetic request. Please supply as durable medical equipment.” Bring this on your phone. Physicians are, in our experience, glad to be told.',
    },
    { type: 'h2', text: 'The four things a claim needs' },
    {
      type: 'p',
      text: 'A clean submission is not complicated, but it is specific. Missing any one of these is the most common reason a legitimate claim comes back denied:',
    },
    {
      type: 'list',
      items: [
        'A prescription using the words “cranial prosthesis”, dated before the purchase — not after.',
        'A diagnosis code. L65.9 covers most nonscarring loss; oncology cases usually code to the underlying malignancy.',
        'An itemised invoice from a supplier, showing the HCPCS code your carrier expects.',
        'A letter of medical necessity, if the plan asks for one. This is the piece most people do not know exists, and it is the piece that wins appeals.',
      ],
    },
    { type: 'h2', text: 'If you are denied anyway' },
    {
      type: 'p',
      text: 'Appeal. First denials are frequently automated, issued on the basis of a keyword rather than a reading, and a surprising proportion are overturned on the first appeal with no new information beyond a properly written letter. You have a statutory right to internal appeal and, in most states, to external review by an independent body afterwards.',
    },
    {
      type: 'p',
      text: 'We write these letters as a matter of course, at no charge, for anybody whose prosthesis we made. If we did not make yours, write to us anyway — we will send you the template we use.',
    },
  ],
}

const fallback: Block[] = [
  {
    type: 'p',
    text: 'This article is being prepared for publication. In the meantime, our team is glad to answer the same question directly — and usually faster than reading would take.',
  },
  {
    type: 'aside',
    title: 'Ask us instead',
    text: 'Every question that arrives through the contact form is answered by a person, generally within one business day.',
  },
]

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function JournalPost() {
  const { slug } = useParams()
  const post = posts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <section className="shell py-40 text-center">
        <h1 className="display-md text-forest">We could not find that article.</h1>
        <div className="mt-8 flex justify-center">
          <ButtonLink to="/journal" variant="outline">
            Back to the journal
          </ButtonLink>
        </div>
      </section>
    )
  }

  const body = bodies[post.slug] ?? fallback
  const more = posts.filter((p) => p.slug !== post.slug).slice(0, 3)

  return (
    <article>
      {/* Header */}
      <header className="grain relative overflow-hidden bg-forest pb-16 pt-36 text-bone md:pb-20 md:pt-44">
        <div aria-hidden className="dotfield-light fade-b pointer-events-none absolute inset-x-0 top-0 h-96 opacity-25" />
        <div className="shell relative">
          <Reveal>
            <Link to="/journal" className="link-draw text-[0.875rem] text-sage-soft/80">
              ← Journal
            </Link>
          </Reveal>
          <Reveal delay={1}>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-[0.8125rem]">
              <span className="text-sage">{post.category}</span>
              <span aria-hidden className="h-px w-4 bg-sage/50" />
              <span className="numerals text-sage-quiet">{formatDate(post.date)}</span>
              <span aria-hidden className="h-px w-4 bg-sage/50" />
              <span className="numerals text-sage-quiet">{post.readingTime} read</span>
            </div>
          </Reveal>
          <Reveal delay={2}>
            <h1 className="display-lg mt-6 max-w-4xl text-bone">{post.title}</h1>
          </Reveal>
          <Reveal delay={3}>
            <p className="lede mt-7 max-w-2xl text-sage-soft/85">{post.excerpt}</p>
          </Reveal>
        </div>
      </header>

      {/* Lead image */}
      <Reveal>
        <div className="shell -mt-8 md:-mt-12">
          <img
            src={post.image}
            alt=""
            className="aspect-3/2 w-full rounded-2xl object-cover md:aspect-21/9"
          />
        </div>
      </Reveal>

      {/* Body */}
      <div className="shell-narrow py-16 md:py-24">
        {body.map((block, i) => {
          if (block.type === 'h2') {
            return (
              <Reveal key={i}>
                <h2 className="display-sm mt-14 text-forest first:mt-0">{block.text}</h2>
              </Reveal>
            )
          }
          if (block.type === 'quote') {
            return (
              <Reveal key={i}>
                <blockquote className="my-12 border-l border-clay/45 pl-6">
                  <p className="display-sm font-display italic text-forest">{block.text}</p>
                </blockquote>
              </Reveal>
            )
          }
          if (block.type === 'list') {
            return (
              <Reveal key={i}>
                <ul className="my-8 space-y-4">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-4 text-[1.0625rem] leading-relaxed text-moss">
                      <span aria-hidden className="mt-3 h-1 w-1 shrink-0 rounded-full bg-clay" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          }
          if (block.type === 'aside') {
            return (
              <Reveal key={i}>
                <aside className="my-12 rounded-2xl border border-clay/35 bg-clay-soft/25 p-6 md:p-7">
                  <p className="font-display text-[1.0625rem] italic text-clay-deep">{block.title}</p>
                  <p className="mt-3 text-[1rem] leading-relaxed text-forest">{block.text}</p>
                </aside>
              </Reveal>
            )
          }
          return (
            <Reveal key={i}>
              <p
                className={`mt-6 text-[1.125rem] leading-[1.75] text-moss first:mt-0 ${
                  i === 0
                    ? 'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-[3.75rem] first-letter:font-light first-letter:leading-[0.82] first-letter:text-forest'
                    : ''
                }`}
              >
                {block.text}
              </p>
            </Reveal>
          )
        })}

        <Reveal>
          <div className="mt-16 rounded-2xl border border-sage/35 bg-linen/70 p-7 md:p-9">
            <h2 className="display-sm text-forest">Would you like us to check your plan?</h2>
            <p className="mt-3 text-[1rem] leading-relaxed text-moss">
              Send us your carrier and member ID through the encrypted form and we will tell you what
              you would actually pay — in writing, before you commit to anything.
            </p>
            <div className="mt-6 flex flex-wrap gap-3.5">
              <ButtonLink to="/insurance#verify">Verify my benefit</ButtonLink>
              <ButtonLink to="/consultation" variant="outline">
                Book a consultation
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>

      {/* More reading */}
      <section className="relative overflow-hidden border-t border-sage/25 bg-linen py-16 md:py-24">
        <div className="shell relative">
          <h2 className="display-sm text-forest">More reading</h2>
          <ul className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {more.map((p, i) => (
              <Reveal as="li" key={p.slug} delay={i}>
                <Link to={`/journal/${p.slug}`} className="group flex h-full flex-col">
                  <div className="overflow-hidden rounded-xl bg-mist">
                    <img
                      src={p.image}
                      alt=""
                      loading="lazy"
                      className="aspect-3/2 w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <span className="mt-4 text-[0.8125rem] text-clay-deep">{p.category}</span>
                  <h3 className="display-sm mt-2 text-forest transition-colors duration-500 group-hover:text-moss">
                    {p.title}
                  </h3>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </article>
  )
}

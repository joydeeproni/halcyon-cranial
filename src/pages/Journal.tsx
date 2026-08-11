import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { PageHero } from '../components/PageHero'
import { Reveal } from '../components/Reveal'
import { posts } from '../data/site'

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function Journal() {
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((p) => p.category)))],
    [],
  )
  const [filter, setFilter] = useState('All')

  const visible = filter === 'All' ? posts : posts.filter((p) => p.category === filter)
  const [lead, ...others] = visible

  return (
    <>
      <PageHero
        title={
          <>
            Written for the week you were{' '}
            <span className="italic text-sage-soft">diagnosed</span>.
          </>
        }
        lede="Practical writing on coverage, treatment timelines and craft — reviewed by our clinical team, and free of the reassuring vagueness this subject usually attracts."
      />

      <section className="shell py-16 md:py-24">
        {/* Filter */}
        <Reveal>
          <div className="no-scrollbar -mx-1 flex gap-2.5 overflow-x-auto px-1 pb-2">
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setFilter(c)}
                className={`shrink-0 rounded-full border px-4 py-2 text-[0.875rem] transition-all duration-300 ${
                  filter === c
                    ? 'border-forest bg-forest text-bone'
                    : 'border-sage/40 text-moss hover:border-sage/80 hover:text-forest'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Lead article */}
        {lead && (
          <Reveal delay={1}>
            <Link to={`/journal/${lead.slug}`} className="group mt-12 grid gap-8 lg:grid-cols-2 lg:gap-16">
              <div className="overflow-hidden rounded-2xl bg-mist">
                <img
                  src={lead.image}
                  alt=""
                  className="aspect-3/2 w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
                />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex items-center gap-3 text-[0.8125rem]">
                  <span className="text-clay-deep">{lead.category}</span>
                  <span aria-hidden className="h-px w-4 bg-sage/50" />
                  <span className="numerals text-muted">{formatDate(lead.date)}</span>
                  <span aria-hidden className="h-px w-4 bg-sage/50" />
                  <span className="numerals text-muted">{lead.readingTime}</span>
                </div>
                <h2 className="display-md mt-5 text-forest transition-colors duration-500 group-hover:text-moss">
                  {lead.title}
                </h2>
                <p className="lede mt-5 text-moss">{lead.excerpt}</p>
                <span className="mt-7 flex items-center gap-2 text-[0.9375rem] font-medium text-forest">
                  <span className="link-draw">Read the article</span>
                  <svg
                    aria-hidden
                    width="15"
                    height="15"
                    viewBox="0 0 16 16"
                    fill="none"
                    className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-1"
                  >
                    <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {/* The rest */}
        {others.length > 0 && (
          <ul className="mt-20 grid gap-x-8 gap-y-14 border-t border-sage/35 pt-14 md:grid-cols-3">
            {others.map((post, i) => (
              <Reveal as="li" key={post.slug} delay={i}>
                <Link to={`/journal/${post.slug}`} className="group flex h-full flex-col">
                  <div className="overflow-hidden rounded-xl bg-mist">
                    <img
                      src={post.image}
                      alt=""
                      loading="lazy"
                      className="aspect-3/2 w-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="mt-5 flex items-center gap-3 text-[0.8125rem]">
                    <span className="text-clay-deep">{post.category}</span>
                    <span aria-hidden className="h-px w-4 bg-sage/50" />
                    <span className="numerals text-muted">{post.readingTime}</span>
                  </div>
                  <h3 className="display-sm mt-3 text-forest transition-colors duration-500 group-hover:text-moss">
                    {post.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9375rem] leading-relaxed text-moss">
                    {post.excerpt}
                  </p>
                  <span className="numerals mt-5 text-[0.8125rem] text-muted">
                    {formatDate(post.date)}
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

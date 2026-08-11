import { stories } from '../data/site'

/**
 * Continuously scrolling wall of stories.
 *
 * The track holds the list twice and translates exactly -50%, so the loop is
 * seamless with no snap. It pauses on hover and on keyboard focus inside the
 * track, and under prefers-reduced-motion it stops entirely and becomes an
 * ordinary horizontally scrollable region.
 */
export function StoryCarousel() {
  const cards = stories.filter((s) => s.image)

  return (
    <div
      // Focusable in its own right: it pauses the marquee for keyboard users,
      // and under reduced motion the track becomes a plain scroller that has
      // to be reachable without a pointer.
      tabIndex={0}
      role="region"
      aria-label="What clients have said"
      className="story-scroller group relative overflow-hidden"
      // Edge fade so cards enter and leave rather than being cut off
      style={{
        maskImage:
          'linear-gradient(to right, transparent, black 6%, black 94%, transparent)',
      }}
    >
      <ul className="story-marquee flex w-max gap-5 py-1">
        {[...cards, ...cards].map((story, i) => (
          <li
            key={`${story.name}-${i}`}
            aria-hidden={i >= cards.length}
            className="w-[17rem] shrink-0 sm:w-[20rem]"
          >
            <figure className="flex h-full flex-col overflow-hidden rounded-2xl bg-bone">
              <img
                src={story.image ?? ''}
                alt=""
                loading="lazy"
                className="aspect-4/5 w-full object-cover"
              />
              <figcaption className="flex flex-1 flex-col p-6">
                <blockquote className="flex-1 text-[0.9375rem] leading-relaxed text-forest">
                  “{story.quote}”
                </blockquote>
                <div className="mt-5 border-t border-sage/30 pt-4">
                  <p className="text-[0.875rem] font-medium text-forest">{story.name}</p>
                  <p className="mt-0.5 text-[0.8125rem] text-muted">{story.context}</p>
                </div>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  )
}

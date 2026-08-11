import { Link } from 'react-router-dom'

/**
 * Wordmark. The mark is the arch motif — the same silhouette used on the
 * photography — with a single interior stroke suggesting a parting.
 */
export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  const text = tone === 'light' ? 'text-bone' : 'text-forest'
  const sub = tone === 'light' ? 'text-sage-soft/80' : 'text-muted'

  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="Halcyon Cranial Studio — home">
      <svg
        aria-hidden
        width="22"
        height="28"
        viewBox="0 0 22 28"
        fill="none"
        className={`${text} shrink-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-px`}
      >
        <path
          d="M1 27V11a10 10 0 0 1 20 0v16"
          stroke="currentColor"
          strokeWidth="1.3"
          strokeLinecap="round"
        />
        <path d="M11 27V1.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.4" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[1.375rem] font-normal tracking-[-0.02em] ${text}`}>
          Halcyon
        </span>
        <span className={`mt-1 text-[0.6875rem] font-normal tracking-[0.02em] ${sub}`}>
          Cranial Studio
        </span>
      </span>
    </Link>
  )
}

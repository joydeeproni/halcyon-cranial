import { Link } from 'react-router-dom'
import type { ComponentProps, ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'light' | 'quiet' | 'glass'

const base =
  'group inline-flex items-center justify-center gap-2.5 rounded-full text-[0.9375rem] font-medium ' +
  'transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:opacity-45 disabled:pointer-events-none'

const sizes = {
  md: 'px-6 py-3',
  lg: 'px-7 py-3.5 text-base',
  sm: 'px-5 py-2.5 text-sm',
}

const variants: Record<Variant, string> = {
  solid: 'bg-forest text-bone hover:bg-evergreen',
  outline: 'border border-forest/25 text-forest hover:border-forest/60 hover:bg-forest/[0.04]',
  light: 'bg-bone text-forest hover:bg-white',
  quiet: 'border border-sage-soft/70 bg-white/60 text-forest hover:bg-white',
  /** For placing on photography or the evergreen field — legible over both. */
  glass:
    'border border-bone/45 bg-bone/12 text-bone backdrop-blur-md hover:border-bone/80 hover:bg-bone/22',
}

function Arrow() {
  return (
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
  )
}

type CommonProps = {
  children: ReactNode
  variant?: Variant
  size?: keyof typeof sizes
  arrow?: boolean
  className?: string
}

export function ButtonLink({
  to,
  children,
  variant = 'solid',
  size = 'md',
  arrow = true,
  className = '',
  ...rest
}: CommonProps & { to: string } & Omit<ComponentProps<typeof Link>, 'to' | 'children' | 'className'>) {
  const external = /^(https?:|tel:|mailto:)/.test(to)

  if (external) {
    return (
      <a href={to} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
        {children}
        {arrow && <Arrow />}
      </a>
    )
  }

  return (
    <Link to={to} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow />}
    </Link>
  )
}

export function Button({
  children,
  variant = 'solid',
  size = 'md',
  arrow = false,
  className = '',
  ...rest
}: CommonProps & ComponentProps<'button'>) {
  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
      {arrow && <Arrow />}
    </button>
  )
}

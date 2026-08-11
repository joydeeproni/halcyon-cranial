import { useId, useRef, useState } from 'react'
import type { ComponentProps, ReactNode } from 'react'

const fieldBase =
  'w-full rounded-xl border border-sage/35 bg-white/70 px-4 py-3 text-[0.9375rem] text-forest ' +
  'placeholder:text-muted transition-all duration-300 ' +
  'hover:border-sage/60 focus:border-clay focus:bg-white focus:outline-none focus:ring-3 focus:ring-clay/12'

function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 flex items-baseline gap-2 text-[0.875rem] font-medium text-forest">
      {children}
      {optional && <span className="font-normal text-muted">optional</span>}
    </label>
  )
}

export function Field({
  label,
  hint,
  optional,
  className = '',
  ...rest
}: { label: string; hint?: string; optional?: boolean } & ComponentProps<'input'>) {
  const id = useId()
  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <input id={id} className={fieldBase} {...rest} />
      {hint && <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{hint}</p>}
    </div>
  )
}

export function TextArea({
  label,
  hint,
  optional,
  className = '',
  ...rest
}: { label: string; hint?: string; optional?: boolean } & ComponentProps<'textarea'>) {
  const id = useId()
  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <textarea id={id} rows={5} className={`${fieldBase} resize-y`} {...rest} />
      {hint && <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{hint}</p>}
    </div>
  )
}

export function Select({
  label,
  hint,
  options,
  optional,
  className = '',
  ...rest
}: {
  label: string
  hint?: string
  optional?: boolean
  options: { value: string; label: string }[]
} & ComponentProps<'select'>) {
  const id = useId()
  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <div className="relative">
        <select id={id} className={`${fieldBase} appearance-none pr-11`} {...rest}>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-moss"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
        >
          <path d="M1 1.5 6 6.5l5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        </svg>
      </div>
      {hint && <p className="mt-2 text-[0.8125rem] leading-relaxed text-muted">{hint}</p>}
    </div>
  )
}

/** Large tappable choice cards — used for the intake's branching questions. */
export function ChoiceCards({
  legend,
  name,
  options,
  value,
  onChange,
  columns = 2,
}: {
  legend: string
  name: string
  options: { value: string; label: string; note?: string }[]
  value: string
  onChange: (v: string) => void
  columns?: 1 | 2 | 3
}) {
  const cols = columns === 1 ? 'sm:grid-cols-1' : columns === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'
  return (
    <fieldset>
      <legend className="mb-3 text-[0.875rem] font-medium text-forest">{legend}</legend>
      <div className={`grid gap-3 ${cols}`}>
        {options.map((o) => {
          const active = value === o.value
          return (
            <label
              key={o.value}
              className={`group cursor-pointer rounded-xl border px-4 py-3.5 transition-all duration-300 ${
                active
                  ? 'border-clay bg-clay-soft/35 ring-3 ring-clay/12'
                  : 'border-sage/35 bg-white/60 hover:border-sage/70 hover:bg-white'
              }`}
            >
              <span className="flex items-start gap-3">
                <input
                  type="radio"
                  name={name}
                  value={o.value}
                  checked={active}
                  onChange={() => onChange(o.value)}
                  className="sr-only"
                />
                <span
                  aria-hidden
                  className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
                    active ? 'border-clay' : 'border-sage/70'
                  }`}
                >
                  <span
                    className={`h-2 w-2 rounded-full bg-clay transition-transform duration-300 ${
                      active ? 'scale-100' : 'scale-0'
                    }`}
                  />
                </span>
                <span className="flex flex-col">
                  <span className="text-[0.9375rem] font-medium leading-snug text-forest">{o.label}</span>
                  {o.note && <span className="mt-1 text-[0.8125rem] leading-snug text-muted">{o.note}</span>}
                </span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}

export function Checkbox({
  label,
  children,
  checked,
  onChange,
}: {
  label?: string
  children?: ReactNode
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <span
        aria-hidden
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-[0.3rem] border transition-all duration-300 ${
          checked ? 'border-clay bg-clay' : 'border-sage/60 bg-white/70'
        }`}
      >
        <svg
          width="11"
          height="9"
          viewBox="0 0 11 9"
          fill="none"
          className={`transition-transform duration-300 ${checked ? 'scale-100' : 'scale-0'}`}
        >
          <path d="M1 4.5 4 7.5 10 1.5" stroke="#F7F4EE" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-[0.875rem] leading-relaxed text-moss">{children ?? label}</span>
    </label>
  )
}

/**
 * Encrypted upload. Client-side this only collects and lists files; in
 * production the picker posts directly to the HIPAA-eligible storage
 * provider under a signed URL, so PHI never transits our own server.
 */
export function SecureUpload({
  label,
  hint,
  accept = 'image/*,.pdf',
}: {
  label: string
  hint?: string
  accept?: string
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<{ name: string; size: number }[]>([])
  const [dragging, setDragging] = useState(false)

  const add = (list: FileList | null) => {
    if (!list) return
    setFiles((prev) => [
      ...prev,
      ...Array.from(list).map((f) => ({ name: f.name, size: f.size })),
    ])
  }

  return (
    <div>
      <span className="mb-2 flex items-center gap-2 text-[0.875rem] font-medium text-forest">
        {label}
        <LockGlyph />
      </span>

      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          add(e.dataTransfer.files)
        }}
        className={`rounded-xl border border-dashed px-5 py-8 text-center transition-all duration-300 ${
          dragging ? 'border-clay bg-clay-soft/25' : 'border-sage/50 bg-white/50'
        }`}
      >
        <p className="text-[0.9375rem] text-moss">
          Drop files here, or{' '}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="link-draw font-medium text-clay-deep"
          >
            browse your device
          </button>
        </p>
        <p className="mt-1.5 text-[0.8125rem] text-muted">PDF, JPG or PNG · up to 25 MB each</p>
        {/* Visually replaced by the drop zone above, but it stays a real,
            labelled input so it is reachable and announced. */}
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          aria-label={label}
          onChange={(e) => add(e.target.files)}
          className="sr-only"
        />
      </div>

      {files.length > 0 && (
        <ul className="mt-3 space-y-2">
          {files.map((f, i) => (
            <li
              key={`${f.name}-${i}`}
              className="flex items-center justify-between gap-4 rounded-lg border border-sage/30 bg-white/70 px-3.5 py-2.5"
            >
              <span className="flex min-w-0 items-center gap-2.5">
                <LockGlyph />
                <span className="truncate text-[0.875rem] text-forest">{f.name}</span>
              </span>
              <span className="flex shrink-0 items-center gap-3">
                <span className="numerals text-[0.75rem] text-muted">
                  {(f.size / 1024 / 1024).toFixed(1)} MB
                </span>
                <button
                  type="button"
                  onClick={() => setFiles((prev) => prev.filter((_, j) => j !== i))}
                  className="text-[0.75rem] text-muted underline transition-colors hover:text-clay-deep"
                >
                  Remove
                </button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {hint && <p className="mt-2.5 text-[0.8125rem] leading-relaxed text-muted">{hint}</p>}
    </div>
  )
}

export function LockGlyph({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="none"
      className={`shrink-0 text-muted ${className}`}
    >
      <rect x="0.65" y="5.15" width="9.7" height="7.2" rx="1.6" stroke="currentColor" strokeWidth="1.1" />
      <path d="M3 5V3.4a2.5 2.5 0 0 1 5 0V5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  )
}

/** The recurring privacy reassurance that sits beside every PHI field. */
export function PrivacyNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-start gap-2.5 rounded-xl border border-sage/30 bg-mist/40 px-4 py-3.5 text-[0.8125rem] leading-relaxed text-moss">
      <LockGlyph className="mt-0.5" />
      <span>{children}</span>
    </p>
  )
}

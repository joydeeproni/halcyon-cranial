import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

type Item = { q: string; a: string }

export function Accordion({ items }: { items: Item[] }) {
  const [open, setOpen] = useState<number | null>(0)
  const reduced = useReducedMotion()

  return (
    <ul className="border-t border-sage/25">
      {items.map((item, i) => {
        const isOpen = open === i
        return (
          <li key={item.q} className="border-b border-sage/25">
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left md:py-7"
              >
                <span
                  className={`display-sm max-w-2xl font-display transition-colors duration-500 ${
                    isOpen ? 'text-clay-deep' : 'text-forest group-hover:text-moss'
                  }`}
                >
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className={`relative mt-2 flex h-6 w-6 shrink-0 items-center justify-center transition-colors duration-500 ${
                    isOpen ? 'text-clay-deep' : 'text-sage'
                  }`}
                >
                  <span className="absolute h-px w-4 bg-current" />
                  <span
                    className={`absolute h-4 w-px bg-current transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                      isOpen ? 'rotate-90 scale-0' : ''
                    }`}
                  />
                </span>
              </button>
            </h3>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduced ? undefined : { height: 0, opacity: 0 }}
                  animate={reduced ? undefined : { height: 'auto', opacity: 1 }}
                  exit={reduced ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-2xl pb-8 pr-8 text-[1.0625rem] leading-relaxed text-moss">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        )
      })}
    </ul>
  )
}

/**
 * axe-core audit across every route, at mobile and desktop widths.
 * Exits non-zero on any violation so it can gate a deploy.
 */
import { chromium } from 'playwright'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const axePath = require.resolve('axe-core/axe.min.js')
const BASE = process.env.BASE ?? 'http://localhost:4173'

const routes = [
  '/',
  '/approach',
  '/prostheses',
  '/insurance',
  '/consultation',
  '/stories',
  '/journal',
  '/journal/the-word-on-your-prescription',
  '/faq',
  '/contact',
  '/privacy',
]

const browser = await chromium.launch()
let total = 0

for (const [label, width, height] of [
  ['mobile', 390, 844],
  ['desktop', 1440, 900],
]) {
  const ctx = await browser.newContext({ viewport: { width, height }, reducedMotion: 'reduce' })
  const page = await ctx.newPage()

  for (const route of routes) {
    await page.goto(BASE + route, { waitUntil: 'networkidle' })
    await page.addScriptTag({ path: axePath })
    const results = await page.evaluate(async () =>
      // @ts-ignore — axe is injected above
      await window.axe.run(document, {
        runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] },
      }),
    )

    if (results.violations.length) {
      console.log(`\n${label} ${route}`)
      for (const v of results.violations) {
        total += v.nodes.length
        console.log(`  ✗ [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length})`)
        for (const n of v.nodes.slice(0, 3)) {
          console.log(`      ${n.target.join(' ')}`)
          if (n.failureSummary) {
            console.log(`      ${n.failureSummary.split('\n').slice(0, 2).join(' / ')}`)
          }
        }
      }
    }
  }
  await ctx.close()
  console.log(`${label}: audited ${routes.length} routes`)
}

await browser.close()
console.log(total === 0 ? '\nNo WCAG 2.1 AA violations found.' : `\n${total} violating nodes.`)
process.exit(total === 0 ? 0 : 1)

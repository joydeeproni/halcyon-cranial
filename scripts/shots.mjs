/**
 * Design-review screenshots. Not part of the site build.
 *   node scripts/shots.mjs [full]
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:5199'
const OUT = 'shots'
const full = process.argv.includes('full')

const routes = [
  ['home', '/'],
  ['approach', '/approach'],
  ['prostheses', '/prostheses'],
  ['insurance', '/insurance'],
  ['consultation', '/consultation'],
  ['stories', '/stories'],
  ['journal', '/journal'],
  ['article', '/journal/the-word-on-your-prescription'],
  ['faq', '/faq'],
  ['contact', '/contact'],
]

const viewports = [
  ['desktop', 1440, 900],
  ['mobile', 390, 844],
]

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()

for (const [vpName, width, height] of viewports) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce', // freeze entrance animations so reveals are visible
  })
  const page = await ctx.newPage()

  for (const [name, path] of routes) {
    await page.goto(BASE + path, { waitUntil: 'networkidle' })
    await page.evaluate(() => document.fonts.ready)
    // Scroll through so lazy images and in-view reveals resolve.
    await page.evaluate(async () => {
      const step = window.innerHeight * 0.8
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y)
        await new Promise((r) => setTimeout(r, 60))
      }
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(400)
    await page.screenshot({
      path: `${OUT}/${vpName}-${name}.png`,
      fullPage: full,
      scale: 'css',
    })
    console.log(`${vpName}/${name}`)
  }
  await ctx.close()
}

await browser.close()
console.log('done')

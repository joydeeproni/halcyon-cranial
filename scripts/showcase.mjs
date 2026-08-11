/**
 * Renders showcase GIFs of the site's interactions and scroll animations.
 *
 *   node scripts/showcase.mjs            # all scenes
 *   node scripts/showcase.mjs 03 06      # only those ids
 *
 * Output: showcase/NN-name.gif at 1600x1200.
 *
 * Scroll-driven sequences are stepped deterministically — we set scrollY per
 * frame — so playback is smooth no matter how slow capture is. Time-based
 * animations (entrance choreography, blur reveals) are sampled in real time.
 *
 * Frames are written as PNG and assembled by ffmpeg: a JS encoder with a
 * shared palette posterises the photography badly, while ffmpeg's palettegen
 * weights toward what actually changes between frames.
 */
import { chromium } from 'playwright'
import { execFileSync } from 'node:child_process'
import { copyFileSync, mkdirSync, rmSync, statSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const FFMPEG = '/opt/homebrew/bin/ffmpeg'
const W = 1600
const H = 1200
const DELAY = 62 // ms per frame → ~16fps
const OUT = 'showcase'
const TMP = '/tmp/halcyon-frames'

mkdirSync(OUT, { recursive: true })
const only = process.argv.slice(2)
const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2)
const pad = (n) => String(n).padStart(4, '0')

/* ------------------------------------------------------------- recording */

function recorder() {
  rmSync(TMP, { recursive: true, force: true })
  mkdirSync(TMP, { recursive: true })
  let n = 0
  return {
    async shot(page, times = 1, gap = 0) {
      for (let i = 0; i < times; i++) {
        await page.screenshot({ path: `${TMP}/f-${pad(n++)}.png`, type: 'png' })
        if (gap) await page.waitForTimeout(gap)
      }
    },
    /** Freeze on the final frame so the loop reads as finished. */
    hold(times = 8) {
      const last = `${TMP}/f-${pad(n - 1)}.png`
      for (let i = 0; i < times; i++) copyFileSync(last, `${TMP}/f-${pad(n++)}.png`)
    },
    get count() {
      return n
    },
  }
}

const LIMIT = 5 * 1024 * 1024 // hard ceiling per GIF

/**
 * Quality ladder, tried in order until the file fits under LIMIT.
 *
 * Ordering matters: palette reductions are nearly invisible on this brand's
 * muted range, dropping frames is noticeable but acceptable, and scaling down
 * is the last thing to give up. `every: 2` keeps one frame in two and halves
 * the output rate so the sequence still plays at its intended speed.
 */
const LADDER = [
  { colors: 200, every: 1, dither: 'sierra2_4a' },
  { colors: 160, every: 1, dither: 'bayer:bayer_scale=5' },
  { colors: 128, every: 1, dither: 'bayer:bayer_scale=5' },
  { colors: 96, every: 1, dither: 'bayer:bayer_scale=4' },
  { colors: 72, every: 1, dither: 'bayer:bayer_scale=4' },
  { colors: 128, every: 2, dither: 'bayer:bayer_scale=5' },
  { colors: 96, every: 2, dither: 'bayer:bayer_scale=4' },
  { colors: 64, every: 2, dither: 'bayer:bayer_scale=4' },
  { colors: 48, every: 3, dither: 'bayer:bayer_scale=4' },
]

function run({ colors, every, dither }, path) {
  const fps = Math.round(1000 / DELAY)
  // Output stays 1600x1200 — the budget comes out of palette and frame rate,
  // never resolution.
  const chain =
    every > 1
      ? `[0:v]select='not(mod(n\\,${every}))',split[a][b]`
      : '[0:v]split[a][b]'

  execFileSync(
    FFMPEG,
    [
      '-y',
      '-loglevel', 'error',
      '-framerate', String(fps),
      '-start_number', '0',
      '-i', `${TMP}/f-%04d.png`,
      '-filter_complex',
      `${chain};` +
        `[a]palettegen=max_colors=${colors}:stats_mode=diff[p];` +
        `[b][p]paletteuse=dither=${dither}:diff_mode=rectangle`,
      '-r', String(Math.max(1, Math.round(fps / every))),
      '-loop', '0',
      path,
    ],
    { stdio: 'pipe' },
  )
  return statSync(path).size
}

/** Encodes at the highest rung of the ladder that lands under the ceiling. */
function encode(path) {
  let size = 0
  for (const [i, rung] of LADDER.entries()) {
    size = run(rung, path)
    if (size <= LIMIT) {
      const notes = [
        `${rung.colors} colours`,
        rung.every > 1 ? `every ${rung.every}${rung.every === 2 ? 'nd' : 'rd'} frame` : 'all frames',
        `${W}x${H}`,
      ].filter(Boolean)
      return { size, rung: i, notes: notes.join(', ') }
    }
  }
  return { size, rung: LADDER.length - 1, notes: 'floor reached — still over' }
}

/* --------------------------------------------------------------- helpers */

async function newPage(browser) {
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 1,
  })
  const page = await ctx.newPage()
  // Keep the consent banner out of every capture.
  await page.addInitScript(() => localStorage.setItem('pcp-analytics-consent', 'denied'))
  return { ctx, page }
}

/** One full pass so lazy images decode. Also fires every in-view reveal. */
async function warm(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 70))
    }
    window.scrollTo(0, 0)
  })
  await page.waitForTimeout(500)
}

/**
 * Warm, then reload.
 *
 * Warming is what decodes the lazy images, but it also trips every
 * scroll-triggered reveal — and those fire once. Capturing straight after a
 * warm gives you a page where all the entrance animation has already
 * happened, which is exactly why a recording looks inert. The reload resets
 * the reveals while the images stay in cache, so they play on camera.
 */
async function prime(page, url = BASE) {
  await page.goto(url, { waitUntil: 'networkidle' })
  await warm(page)
  await page.reload({ waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(400)
}

/** Park above a point so the approach sweep plays the reveals on the way in. */
async function parkAbove(page, y, gap = H * 0.85) {
  await page.evaluate((v) => window.scrollTo(0, Math.max(0, v)), y - gap)
  await page.waitForTimeout(450)
  return Math.max(0, y - gap)
}

/** Absolute document Y of the section containing `text`. */
const anchorY = (page, text) =>
  page.evaluate((t) => {
    const el = [...document.querySelectorAll('h1,h2,h3')].find((e) =>
      e.textContent.includes(t),
    )
    return (el.closest('section') ?? el).getBoundingClientRect().top + window.scrollY
  }, text)

async function sweep(page, rec, from, to, count, settle = 85) {
  for (let i = 0; i < count; i++) {
    const t = easeInOut(i / (count - 1))
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(from + (to - from) * t))
    await page.waitForTimeout(settle)
    await rec.shot(page)
  }
}

/* ----------------------------------------------------------------- scenes */

const scenes = [
  {
    id: '01',
    name: 'hero-entrance',
    async run(page, rec) {
      // Fresh load, so the entrance choreography plays from frame zero.
      await page.goto(BASE, { waitUntil: 'domcontentloaded' })
      await page.evaluate(() => document.fonts.ready)
      await rec.shot(page, 22, 70)
      // Then drift down so the trust strip and opening section reveal.
      await sweep(page, rec, 0, 900, 12, 70)
      rec.hold()
    },
  },
  {
    id: '02',
    name: 'stat-figures-blur-in',
    async run(page, rec) {
      await prime(page)
      const y = await anchorY(page, 'Medical hair loss is not a cosmetic problem')
      const from = await parkAbove(page, y)
      await sweep(page, rec, from, y - H * 0.06, 15, 70)
      await rec.shot(page, 13, 70) // hold while the figures resolve
      rec.hold()
    },
  },
  {
    id: '03',
    name: 'process-stack-scroll',
    heavy: true,
    async run(page, rec) {
      await prime(page)
      const y = await anchorY(page, 'Five stages, none of them rushed')
      const from = await parkAbove(page, y, H * 0.75)
      await sweep(page, rec, from, y + 3500, 38, 55)
      rec.hold()
    },
  },
  {
    id: '04',
    name: 'testimonial-marquee',
    heavy: true,
    async run(page, rec) {
      await prime(page)
      const y = await anchorY(page, 'Two thousand four hundred people')
      const from = await parkAbove(page, y, H * 0.7)
      // Approach first, so the heading reveals and the cards arrive moving.
      await sweep(page, rec, from, y - 30, 10, 70)
      const total = await page.evaluate(() => {
        const t = document.querySelector('.story-marquee')
        t.style.animation = 'none'
        return t.scrollWidth / 2
      })
      const N = 28
      for (let i = 0; i < N; i++) {
        await page.evaluate((x) => {
          document.querySelector('.story-marquee').style.transform = `translate3d(${-x}px,0,0)`
        }, (total * i) / N)
        await page.waitForTimeout(35)
        await rec.shot(page)
      }
    },
  },
  {
    id: '05',
    name: 'closing-invitation',
    async run(page, rec) {
      await prime(page)
      const end = await page.evaluate(() => document.body.scrollHeight - window.innerHeight)
      await page.evaluate((v) => window.scrollTo(0, v), end - 1700)
      await page.waitForTimeout(450)
      await sweep(page, rec, end - 1700, end, 28, 70)
      rec.hold()
    },
  },
  {
    id: '06',
    name: 'insurance-verification-form',
    async run(page, rec) {
      await prime(page, `${BASE}/insurance`)
      const y = await anchorY(page, 'Find out what you would pay')
      const from = await parkAbove(page, y, H * 0.8)
      // Scroll in first, so the panel and privacy note reveal on camera.
      await sweep(page, rec, from, y - 50, 12, 70)

      const type = async (label, value) => {
        await page.getByLabel(label, { exact: true }).click()
        await page.keyboard.type(value, { delay: 14 })
        await rec.shot(page, 2)
      }

      await rec.shot(page, 2)
      await type('First name', 'Dana')
      await type('Last name', 'Reyes')
      await type('Email', 'dana@example.com')
      await page.getByLabel('Insurance carrier', { exact: true }).selectOption('Other')
      await page.waitForTimeout(280)
      await rec.shot(page, 5, 60) // the conditional carrier field appears
      await type('Carrier name', 'Neighborhood Health Plan')
      await page.getByText('I authorize Halcyon Cranial Studio').click()
      await page.waitForTimeout(280)
      await rec.shot(page, 5, 60) // consent ticked, submit enables
      await page.getByRole('button', { name: 'Send securely' }).click()
      await page.waitForTimeout(450)
      await rec.shot(page, 8, 70) // confirmation
      rec.hold(10)
    },
  },
  {
    id: '07',
    name: 'story-reveal',
    heavy: true,
    async run(page, rec) {
      await prime(page, `${BASE}/stories`)
      const y = await anchorY(page, 'Told by the people')
      await page.evaluate((v) => window.scrollTo(0, v), y + 200)
      await page.waitForTimeout(400)
      await sweep(page, rec, y + 200, y + 1650, 30, 72)
      rec.hold()
    },
  },
  {
    id: '08',
    name: 'faq-accordion',
    async run(page, rec) {
      await prime(page, `${BASE}/faq`)
      const y = await anchorY(page, 'Is a cranial prosthesis the same thing as a wig')
      const from = await parkAbove(page, y, H * 0.8)
      // Scroll in so the intro column and first answer reveal, then interact.
      await sweep(page, rec, from, y - 240, 12, 70)
      await rec.shot(page, 3, 50)
      for (const q of [
        /Will my insurance cover it/,
        /How much does a commission cost/,
        /How long does it take/,
      ]) {
        await page.getByRole('button', { name: q }).click()
        await rec.shot(page, 8, 45)
      }
      rec.hold()
    },
  },
]

/* -------------------------------------------------------------------- run */

const browser = await chromium.launch()
for (const scene of scenes) {
  if (only.length && !only.includes(scene.id)) continue
  const { ctx, page } = await newPage(browser)
  const rec = recorder()
  const started = Date.now()
  await scene.run(page, rec)
  const path = `${OUT}/${scene.id}-${scene.name}.gif`
  const { size, notes } = encode(path)
  console.log(
    `${path}\n    ${rec.count} frames · ${(size / 1048576).toFixed(1)} MB · ${notes} · ${((Date.now() - started) / 1000).toFixed(1)}s`,
  )
  await ctx.close()
}
await browser.close()
rmSync(TMP, { recursive: true, force: true })
console.log('done')

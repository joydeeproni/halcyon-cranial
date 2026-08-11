/**
 * Renders the project cover image.
 *
 *   node scripts/cover.mjs
 *
 * Output: showcase/00-cover.png at 1600x1200.
 *
 * Left: a solid brand panel carrying the name and one line of positioning.
 * Right: the live site, scaled and bled off the right and bottom edges so it
 * reads as a window onto the work rather than a framed screenshot.
 */
import { chromium } from 'playwright'
import { mkdirSync, readFileSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:4173'
const W = 1600
const H = 1200
const OUT = 'showcase'

mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()

/* Capture the two site views that appear in the collage ------------------ */

const shots = {}
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1080 },
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()
  await page.addInitScript(() => localStorage.setItem('pcp-analytics-consent', 'denied'))

  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(900)
  shots.hero = (await page.screenshot({ type: 'png' })).toString('base64')

  // Second view: the stacked process panels, further down the page.
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y)
      await new Promise((r) => setTimeout(r, 60))
    }
  })
  const y = await page.evaluate(() => {
    const h = [...document.querySelectorAll('h2')].find((e) =>
      e.textContent.includes('Five stages'),
    )
    return h.closest('section').getBoundingClientRect().top + window.scrollY
  })
  await page.evaluate((v) => window.scrollTo(0, v), y + 1500)
  await page.waitForTimeout(700)
  shots.process = (await page.screenshot({ type: 'png' })).toString('base64')

  await ctx.close()
}

/* Compose ---------------------------------------------------------------- */

const css = readFileSync('src/index.css', 'utf8')
const grab = (name) => css.match(new RegExp(`--color-${name}:\\s*([^;]+);`))[1].trim()

const forest = grab('forest')
const bone = grab('bone')
const sageSoft = grab('sage-soft')
const clay = grab('clay')

const html = `<!doctype html>
<html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,200..600;1,6..72,200..500&family=Hanken+Grotesk:wght@300..700&display=swap" rel="stylesheet">
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { width:${W}px; height:${H}px; overflow:hidden; background:${forest};
         font-family:'Hanken Grotesk',sans-serif; -webkit-font-smoothing:antialiased; }
  .cover { position:relative; width:100%; height:100%; display:grid;
           grid-template-columns: 34% 66%; }

  .panel { position:relative; background:${forest}; color:${bone};
           padding:76px 58px; display:flex; flex-direction:column; }
  .dots { position:absolute; inset:0; opacity:.22; pointer-events:none;
          background-image: radial-gradient(rgb(255 255 255 / .34) 1.2px, transparent 1.2px);
          background-size:12px 12px;
          -webkit-mask-image:linear-gradient(to bottom, black, transparent 70%); }

  .mark { position:relative; display:flex; align-items:center; gap:14px; }
  .mark svg { flex-shrink:0; }
  .wordmark { font-family:'Newsreader',serif; font-weight:400; font-size:40px;
              letter-spacing:-.02em; line-height:1; }
  .sub { font-size:15px; letter-spacing:.01em; color:${sageSoft}; opacity:.8; margin-top:6px; }

  .line { position:relative; margin-top:78px; }
  .kicker { font-family:'Newsreader',serif; font-style:italic; font-size:19px;
            color:${sageSoft}; opacity:.85; margin-bottom:18px; }
  h1 { font-family:'Newsreader',serif; font-weight:300; font-size:42px; line-height:1.14;
       letter-spacing:-.022em; color:${bone}; text-wrap:balance; }
  h1 em { font-style:italic; color:${sageSoft}; }
  .rule { width:56px; height:1px; background:${clay}; opacity:.75; margin:30px 0 22px; }
  .meta { font-size:14.5px; line-height:1.65; color:${sageSoft}; opacity:.72; }

  /* Right side: two views, bled off the edges */
  .stage { position:relative; overflow:hidden; background:${forest}; }
  .shot { position:absolute; border-radius:10px; overflow:hidden;
          box-shadow:0 40px 90px -30px rgb(10 16 13 / .75); }
  .shot img { display:block; width:100%; }
  .shot-a { top:78px; left:56px; width:118%; }
  .shot-b { top:700px; left:250px; width:96%;
            box-shadow:0 30px 70px -26px rgb(10 16 13 / .8); }
</style></head>
<body>
  <div class="cover">
    <div class="panel">
      <div class="dots"></div>

      <div class="mark">
        <svg width="26" height="33" viewBox="0 0 22 28" fill="none">
          <path d="M1 27V11a10 10 0 0 1 20 0v16" stroke="${bone}" stroke-width="1.3" stroke-linecap="round"/>
          <path d="M11 27V1.4" stroke="${bone}" stroke-width="1.3" stroke-linecap="round" opacity=".4"/>
        </svg>
        <div>
          <div class="wordmark">Halcyon</div>
          <div class="sub">Cranial Studio</div>
        </div>
      </div>

      <div class="line">
        <div class="kicker">Website &amp; patient intake</div>
        <h1>Custom hair prostheses for <em>medical hair loss</em></h1>
        <div class="rule"></div>
        <div class="meta">
          Brand, UX and front-end build<br>
          Eleven pages · HIPAA-shaped intake · WCAG 2.1 AA
        </div>
      </div>
    </div>

    <div class="stage">
      <div class="shot shot-a"><img src="data:image/png;base64,${shots.hero}"></div>
      <div class="shot shot-b"><img src="data:image/png;base64,${shots.process}"></div>
    </div>
  </div>
</body></html>`

{
  const ctx = await browser.newContext({
    viewport: { width: W, height: H },
    deviceScaleFactor: 2,
  })
  const page = await ctx.newPage()
  await page.setContent(html, { waitUntil: 'networkidle' })
  await page.evaluate(() => document.fonts.ready)
  await page.waitForTimeout(600)
  await page.screenshot({ path: `${OUT}/00-cover.png`, type: 'png' })
  await ctx.close()
}

await browser.close()
console.log(`${OUT}/00-cover.png`)

/**
 * Interaction check for the stateful surfaces: booking wizard, accordion,
 * mobile menu, insurance form. Fails loudly if a step cannot be reached.
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.env.BASE ?? 'http://localhost:5199'
const OUT = 'shots/flows'
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch()
const errors = []

/* ---------------- booking wizard, desktop ---------------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
  })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => errors.push(`consultation: ${e.message}`))
  await page.goto(`${BASE}/consultation`, { waitUntil: 'networkidle' })

  // Step 1
  await page.getByLabel('First name').fill('Dana')
  await page.getByLabel('Last name').fill('Reyes')
  await page.getByLabel('Email').fill('dana@example.com')
  await page.getByLabel('Phone').fill('617 555 0188')
  await page.getByText('Secure video call').click()
  await page.getByRole('button', { name: 'Continue' }).click()

  // Step 2
  await page.getByLabel('What is causing your hair loss?').selectOption('alopecia')
  await page.getByText('Currently losing hair').click()
  await page.getByLabel('How soon do you need this?').selectOption('month')
  await page.screenshot({ path: `${OUT}/wizard-step2.png`, scale: 'css' })
  await page.getByRole('button', { name: 'Continue' }).click()

  // Step 3 — pick the first available date and time
  await page
    .getByRole('button', { name: /^(Monday|Tuesday|Wednesday|Thursday|Friday), / })
    .first()
    .click()
  await page.getByRole('button', { name: '10:30 appointment' }).click()
  await page.screenshot({ path: `${OUT}/wizard-step3.png`, scale: 'css' })
  await page.getByRole('button', { name: 'Continue' }).click()

  // Step 4 — consent gate
  const confirm = page.getByRole('button', { name: 'Confirm appointment' })
  if (!(await confirm.isDisabled())) errors.push('consent gate did not disable submit')
  await page.getByText('I understand that the health information').click()
  await page.screenshot({ path: `${OUT}/wizard-step4.png`, scale: 'css' })
  await confirm.click()

  await page.getByText('We will see you soon.').waitFor({ timeout: 4000 })
  await page.screenshot({ path: `${OUT}/wizard-done.png`, scale: 'css' })
  console.log('✓ booking wizard reached confirmation')
  await ctx.close()
}

/* ---------------- accordion + insurance form ---------------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
  })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => errors.push(`faq/insurance: ${e.message}`))

  await page.goto(`${BASE}/faq`, { waitUntil: 'networkidle' })
  const q = page.getByRole('button', { name: /How much does a commission cost/ })
  await q.click()
  if ((await q.getAttribute('aria-expanded')) !== 'true') errors.push('accordion did not expand')
  console.log('✓ accordion expands')

  await page.goto(`${BASE}/insurance#verify`, { waitUntil: 'networkidle' })
  await page.getByLabel('First name').fill('Dana')
  await page.getByLabel('Last name').fill('Reyes')
  await page.getByLabel('Email').fill('dana@example.com')
  await page.getByLabel('Phone').fill('6175550188')
  await page.getByLabel('Date of birth').fill('1979-04-02')
  await page.getByLabel('Insurance carrier', { exact: true }).selectOption('Other')
  await page.getByLabel('Member ID').fill('XQ88213004')
  // The conditional field must appear once "Other" is chosen
  await page.getByLabel('Carrier name').waitFor({ timeout: 2000 })
  await page.getByLabel('Carrier name').fill('Neighborhood Health Plan of RI')
  console.log('✓ conditional carrier field appears')

  const send = page.getByRole('button', { name: 'Send securely' })
  if (!(await send.isDisabled())) errors.push('insurance consent gate did not disable submit')
  await page.getByText('I authorize Halcyon Cranial Studio').click()
  await send.click()
  await page.getByText('Sent securely.').waitFor({ timeout: 4000 })
  await page.screenshot({ path: `${OUT}/insurance-sent.png`, scale: 'css' })
  console.log('✓ insurance form submits')
  await ctx.close()
}

/* ---------------- mobile menu ---------------- */
{
  const ctx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    reducedMotion: 'reduce',
    isMobile: true,
    hasTouch: true,
  })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => errors.push(`mobile menu: ${e.message}`))
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.getByRole('navigation', { name: 'Primary' }).last().waitFor()
  await page.waitForTimeout(500)
  await page.screenshot({ path: `${OUT}/mobile-menu.png`, scale: 'css' })
  await page.locator('#mobile-menu').getByRole('link', { name: 'Insurance' }).click()
  await page.waitForURL('**/insurance')
  // The lock is released on the commit that closes the drawer, a frame later.
  await page.waitForTimeout(250)
  const scrolled = await page.evaluate(() => {
    window.scrollTo(0, 300)
    return window.scrollY
  })
  if (scrolled === 0) errors.push('body scroll left locked after menu navigation')
  console.log('✓ mobile menu navigates and unlocks scroll')
  await ctx.close()
}

/* ---------------- horizontal overflow check, all routes ---------------- */
{
  const routes = ['/', '/approach', '/prostheses', '/insurance', '/consultation', '/stories', '/journal', '/journal/the-word-on-your-prescription', '/faq', '/contact', '/privacy', '/nope']
  for (const [w, h] of [[390, 844], [768, 1024], [1440, 900]]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, reducedMotion: 'reduce' })
    const page = await ctx.newPage()
    page.on('pageerror', (e) => errors.push(`${w}px: ${e.message}`))
    for (const r of routes) {
      await page.goto(BASE + r, { waitUntil: 'networkidle' })
      const over = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      if (over > 1) errors.push(`horizontal overflow ${over}px at ${w}px on ${r}`)
    }
    await ctx.close()
    console.log(`✓ no horizontal overflow at ${w}px`)
  }
}

await browser.close()

if (errors.length) {
  console.error('\nFAILURES:')
  for (const e of errors) console.error(' ✗ ' + e)
  process.exit(1)
}
console.log('\nAll interaction checks passed.')

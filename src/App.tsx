import { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'

/**
 * The home page ships in the initial bundle since it is the overwhelming
 * majority of first landings. Everything else is fetched on navigation —
 * the booking wizard in particular carries weight nobody should pay for
 * unless they are actually booking.
 */
const Approach = lazy(() => import('./pages/Approach').then((m) => ({ default: m.Approach })))
const Prostheses = lazy(() => import('./pages/Prostheses').then((m) => ({ default: m.Prostheses })))
const Insurance = lazy(() => import('./pages/Insurance').then((m) => ({ default: m.Insurance })))
const Consultation = lazy(() =>
  import('./pages/Consultation').then((m) => ({ default: m.Consultation })),
)
const Stories = lazy(() => import('./pages/Stories').then((m) => ({ default: m.Stories })))
const Journal = lazy(() => import('./pages/Journal').then((m) => ({ default: m.Journal })))
const JournalPost = lazy(() =>
  import('./pages/JournalPost').then((m) => ({ default: m.JournalPost })),
)
const Faq = lazy(() => import('./pages/Faq').then((m) => ({ default: m.Faq })))
const Contact = lazy(() => import('./pages/Contact').then((m) => ({ default: m.Contact })))
const Privacy = lazy(() => import('./pages/Privacy').then((m) => ({ default: m.Privacy })))
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })))

/**
 * Holds the evergreen field a route is about to paint anyway, so the
 * transition reads as a pause rather than a flash of the page background.
 */
function RouteFallback() {
  return <div aria-hidden className="min-h-[70svh] bg-forest" />
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Routes>
                <Route path="approach" element={<Approach />} />
                <Route path="prostheses" element={<Prostheses />} />
                <Route path="insurance" element={<Insurance />} />
                <Route path="consultation" element={<Consultation />} />
                <Route path="stories" element={<Stories />} />
                <Route path="journal" element={<Journal />} />
                <Route path="journal/:slug" element={<JournalPost />} />
                <Route path="faq" element={<Faq />} />
                <Route path="contact" element={<Contact />} />
                <Route path="privacy" element={<Privacy />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          }
        />
      </Route>
    </Routes>
  )
}

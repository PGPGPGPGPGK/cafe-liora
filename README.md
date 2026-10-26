# Cafe Liora — concept preview

An unofficial, speculative website concept for **Cafe Liora**, a café and pickleball
destination in Nagole, Hyderabad. Built as a client presentation piece: a single-page,
mobile-first site with a working prototype of a court-booking flow.

> This site is **not** operated by, affiliated with or endorsed by Cafe Liora. A
> "Concept preview" label is shown in the header on every screen, and the court booking
> flow is a demonstration — it creates no reservations and collects no payment.

## Stack

React 19 · Vite · TypeScript · Tailwind CSS v4 · Framer Motion · lucide-react.
No backend, no database, no payment integration.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev        # dev server on http://localhost:5173
npm run build      # typecheck (tsc -b) + production build into dist/
npm run preview    # serve the production build locally
npm run lint       # oxlint
npm run images     # regenerate responsive images from assets/originals/
```

## Project layout

```
assets/originals/          Untouched client photographs (not deployed)
public/images/liora/       Generated WebP derivatives + JPEG fallbacks + ASSET_MANIFEST.csv
scripts/optimize-images.mjs  sharp pipeline: original -> 400/800/1200/full WebP + 1200px JPEG
src/data/                  All café content: assets, site details, menu, experiences
src/lib/availability.ts    The booking prototype's only data boundary (mock)
src/components/            Sections; src/components/booking/ holds the booking flow
```

Café content lives in `src/data/` rather than in components. To change a dish, a section
of copy or a contact detail, edit the data file — no component changes needed.

## Images

Original photographs supplied by the client are kept **unmodified** in `assets/originals/`
and are never deployed. `npm run images` derives responsive WebP variants (400, 800, 1200
and full width, quality 82) plus one 1200px JPEG fallback into `public/images/liora/`.
The `<Photo>` component emits a `srcset`/`sizes` pair so the browser downloads the
smallest usable file, lazy-loads everything except the hero, and renders an elegant
monogram placeholder — never unrelated stock photography — for any photograph Liora has
not supplied yet.

Every image is recorded in `public/images/liora/ASSET_MANIFEST.csv` with its description,
source and status.

## Demo vs. production

| Feature | Status |
| --- | --- |
| Court booking flow (court → date → one-hour slot → review → confirmation) | **Demo.** Fully interactive UI. |
| Court availability | **Demo.** Deterministic mock data in `src/lib/availability.ts`. Not a live diary. |
| Booking confirmation | **Demo.** Shows "Demo complete — no reservation has been made." Nothing is stored or sent. |
| Pricing | **Not shown.** The UI displays "Pricing to be confirmed by venue". |
| Payments | **Not implemented**, by design. No checkout, no payment provider. |
| Menu items | Real — taken from Cafe Liora's own Instagram. **No prices are listed.** |
| Experiences | Real categories. Past events are labelled "Previously at Liora" and never advertised as upcoming. |
| Call / Directions / Instagram | **Live links** to the café's real phone, Google Maps listing and Instagram. |

### Wiring up a real booking backend

`src/lib/availability.ts` is the single seam. Replace the bodies of `getDays()`,
`getSlots()` and `createBooking()` with API calls and keep the exported types; the
components in `src/components/booking/` need no changes.

## GitHub Pages deployment

The build reads a `BASE_PATH` environment variable so the same source works at a domain
root or under a repository subpath:

```bash
BASE_PATH=/cafe-liora/ npm run build
```

`.github/workflows/deploy.yml` builds on every push to `main` with
`BASE_PATH=/<repository-name>/` and publishes `dist/` to GitHub Pages. In the repository,
set **Settings → Pages → Source** to **GitHub Actions** once; no `gh-pages` branch is
needed.

## Image rights

Photographs belong to Cafe Liora. Confirm usage rights with the café before any public or
commercial use of this concept.

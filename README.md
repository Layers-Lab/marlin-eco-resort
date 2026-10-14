# Marlin Eco Resort

A responsive editorial resort website built with Next.js App Router, TypeScript, Tailwind CSS 4, shadcn-style Radix Dialog/Button components, and Motion.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm start
```

Production builds use Webpack because Turbopack's CSS worker port is restricted in the development sandbox.

## Brand and content

- Original logo artwork, Heksilo display font, Acumin body font, and palette come from `resources/`.
- Brand colors: navy `#092942`, green `#18492C`, gold `#C1A66B`, cream `#FFFBEF`.
- Tagline, wooden cottage description, location, and four post images are sourced from https://www.instagram.com/marlinecoresort.bd/ (October 14, 2026).
- The hero ocean and palm imagery is atmospheric stock photography from Unsplash, not verified photography of the property. Sources: `photo-1518837695005-2083093ee35b` and `photo-1506953823976-52e1fdc0149a`. The ocean interlude uses a generated Cox’s Bazar-inspired beach image. The original resort posts are used in the gallery and cottage sections.
- All displayed media and fonts are served locally. No Instagram embeds or remote image dependencies.
- Additional descriptive copy is editorial concept copy. No invented rates, reviews, room categories, amenities, or availability.

## Launch waitlist

The signup dialog collects an optional name, email address, and explicit consent to receive opening updates. `POST /api/waitlist` adds opted-in contacts to a dedicated Resend segment. To enable it, create an API key and a segment such as “Marlin Opening Updates,” then set `RESEND_API_KEY` and `RESEND_WAITLIST_SEGMENT_ID` in `.env.local` using `.env.example` as a template. Without both values, the form returns a clear temporary-unavailable message. Send the launch announcement to the segment from Resend when opening plans are ready; joining the list does not book a stay.

## Checks

`npm run typecheck` and `npm run build`. Browser checks cover desktop/mobile overflow, loaded media, menu navigation, dialog dismissal, and waitlist form validation.

## Coastal motion

The existing MIT-licensed Motion library drives the hero image's gentle zoom-out on load, staggered experience/gallery reveals, and the ocean interlude. The hero has no scroll-linked movement. CSS supplies short, interruptible control feedback and Radix dialog entry/exit transitions. Reduced-motion preferences disable image movement; touch and keyboard scrolling stay native. Hero labels use a warm sand accent (`#E3CF9E`) with increased sizes and a darker image overlay.

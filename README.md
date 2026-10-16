# Marlin Eco Resort

A one-page coastal journal website built with Next.js App Router and TypeScript.

## Run locally

```sh
npm install
npm run dev
```

Open http://localhost:3000.

```sh
npm run typecheck
npm run build
npm start
```

The production build uses Webpack because the sandbox restricts Turbopack's CSS worker port.

## Content and media

- The logo, Heksilo and Abel fonts, navy/green/gold/cream palette, and four Marlin social artworks come from the client's supplied materials. Original files remain untouched.
- Six temporary generated images live in `public/images/generated/`. Their prompts, placements, and replacement instructions are in `output/imagery/README.md`.
- The property, dining, and sustainability copy contains proposed claims invented for this preview at the owner's request. Verify them before public launch using `output/content/proposed-claims.md`.
- Stay inquiries use `marlinecoresort@gmail.com`. The phone link uses the temporary number `01000000000`; replace it with a working Marlin number before public use.
- The location link is `https://maps.app.goo.gl/CobZPUt5Fkqp8pkd8`.

## Replacing images

Keep client media and generated media in separate directories. Replace paths and intrinsic dimensions in `src/lib/media.ts` when actual property photography arrives, then update alt text to describe the final images.

## Checks

Run `npm run typecheck` and `npm run build`. Browser checks should cover desktop/mobile layout, image loading, gallery swiping and keyboard navigation, email/phone links, and reduced motion.

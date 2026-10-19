# TropicanaClean — The Art of a Cleaner Space

A bespoke, responsive homepage concept built with React, TypeScript, Vite, Tailwind CSS, Lucide and Motion. This is an independent redesign, not the official TropicanaClean website.

## Run locally

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm run preview
```

The production output is `dist/`. Import this directory into Vercel as a Vite project, or connect the repository and let the included `vercel.json` configure the build. No API keys, environment variables or backend are required. A `noindex, nofollow` meta tag intentionally keeps this unofficial concept out of search results. Update that only with business-owner approval for an official launch.

## Interactions

- Sticky, compacting navigation; animated mobile menu with focus handling, Escape support and scroll locking.
- Animated underline beneath “feeling” and locally hosted, muted 60-second professional-cleaning videos in the hero and care sections. Pause/play control, automatic off-screen pausing, reduced-motion still image and matching image fallback are included.
- Service category filters; service and area selection scroll to and prefill the quote form.
- Native range comparison supporting pointer, touch and keyboard input. It uses one photograph with a simulated dull finish and is explicitly labelled illustrative.
- Accessible form validation and a demo completion state. The form sends no request and stores no personal information. Valid submission clears the fields; calling the published number is the real contact option.
- Dated, attributed historical Yell review excerpts and click-to-call links.
- Reduced-motion support, local licensed fonts and local, compressed photographs.

## Browser checks

With the dev server running in another terminal:

```sh
npm run test:e2e
```

Tests automatically use the installed Chromium executable on this Linux workstation. On another machine, run `npx playwright install chromium` first, or set `CHROMIUM_PATH` to an existing browser executable. The suite covers four viewport widths, assets, anchor targets, service and area selection, demo privacy, validation, mouse/touch/keyboard comparison input, mobile menu handling and axe accessibility checks.

Validated on 19 October 2026: the browser suite includes 16 checks, including both videos’ one-minute durations, independent playback, keyboard pause/resume, reduced-motion behaviour, video failure fallback, and automated WCAG A/AA checks at 375px and 1440px. Layout and image loading are checked at 375px, 768px, 1024px and 1440px. Automated accessibility checks supplement, rather than replace, manual review.

See [SOURCES.md](SOURCES.md) for research, photography, licences and content decisions.

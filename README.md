# shamsullahfayzi.dev — portfolio

**My portfolio, in English and Dari.** One button switches the whole site between left-to-right English and right-to-left Dari, the same way the hospital software I build does.

![Next.js](https://img.shields.io/badge/Next.js_15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Lighthouse](https://img.shields.io/badge/Lighthouse-100_a11y_·_100_SEO-22389a)

## How it works

- **Bilingual by design.** All copy lives in [`content/content.ts`](content/content.ts) in both languages. The toggle sets `<html lang dir>`, and every layout rule uses CSS logical properties (`margin-inline-start`, `border-inline-start`, …), so the page mirrors without a second stylesheet.
- **No flash of the wrong language.** A tiny inline script restores the saved language before first paint.
- **One animated moment.** The language flip uses the View Transitions API, and is skipped for people who prefer reduced motion.
- **One type family for both scripts.** IBM Plex Sans and IBM Plex Sans Arabic, self-hosted.
- **Static export.** `next build` produces plain files in `out/` that any host can serve.
- **Accessible:** skip link, visible keyboard focus, AA contrast in light and dark mode, Persian numerals in Dari.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Edit the content

Everything a visitor reads is in `content/content.ts`. Fill in `LINKS` (email, LinkedIn, CV) and the empty links appear automatically.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) (zero config), or drag the `out/` folder onto Netlify.

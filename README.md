# Portfolio — Shamsullah Fayzi

A type-led, animation-rich developer portfolio. Warm paper, hard ink, one vermillion accent; the headline is the interface.

![Next.js](https://img.shields.io/badge/Next.js_15-000000?logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

## What's in it

- **Hero:** your portrait rebuilt from ~32,000 particles (React Three Fiber shader). The cursor pushes and swirls them out of the picture like liquid and they flow back; scrolling away dissolves it. Idea from 21st.dev's Liquid Sculpture Hero. Plus a masked-letter entrance (pure CSS), magnetic letters, and a marquee. The still photo is the base layer for phones, reduced motion and no-WebGL.
- **Work:** a plain scrolling list by default, with a "View in 3D room" button (desktop with a mouse) that switches to a pinned 3D room: scroll to walk a corridor from an entrance door, past one frame per project, out an exit door (CSS 3D, real DOM so every demo stays interactive; dots jump to a project; "List view" switches to a plain list). Phones, touch and reduced motion get the plain list. Seven projects, each with its own palette and a playable or interactive demo using clearly fake data: REDMARS visit flow, a live React Three Fiber solar-taxi twin, attendance scan, Al-Raheel before/after, Trendora roles, Zombie Typing, Job Center.
- **Range:** skills as a map. Pick a skill to see which projects used it and which skills travelled with it.
- **Path:** a timeline whose rail draws as you scroll.
- **Contact:** rotating headline, copy-email button, live Dubai time.

## Quality choices

- Animates `transform`/`opacity` only. Every demo is its own lazy chunk; three.js loads only when the Solar demo nears the viewport.
- Phones: no cursor effects, lower-resolution 3D with a gentle sway instead of drag controls.
- `prefers-reduced-motion`: nothing moves, everything stays visible and usable (marquee becomes a static list, the zombie waits).
- Static export (`out/`), deployable to Vercel as-is.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static site in out/
```

## Edit the content

All copy is in [`content/content.ts`](content/content.ts), sourced from the CV. `public/cv.pdf` and `public/me.jpg` back the CV button and hero portrait; empty either in `LINKS` and the button hides / a marked placeholder shows.

## Design system

Persisted from UI/UX Pro Max in `design-system/fayzi-portfolio/MASTER.md`; the real tokens live in `app/globals.css`.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) (zero config), or drag `out/` onto Netlify.

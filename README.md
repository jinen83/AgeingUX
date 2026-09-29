# Age‑Friendly Dropdowns (Static Blog Scaffold)

Static single‑article site scaffold using Vite + React + TypeScript + Tailwind with MDX support.

## What’s inside
- Vite build with React fast refresh
- TypeScript strict config and npm run typecheck
- TailwindCSS wired via PostCSS
- MDX enabled (via @mdx-js/rollup + remark-gfm)
- Accessible, mobile‑first article layout

## Quickstart

npm ci
npm run dev

- Dev server: http://localhost:5173
- Build: npm run build → dist/
- Typecheck: npm run typecheck

## Adding your article (MDX)
- Place your MDX file anywhere under src/ and import it in a route/component.
- A type stub for *.mdx is included at src/types/mdx.d.ts.

## License
MIT

## Docs static site

A lightweight static site lives in `docs/` for GitHub Pages. It uses Tailwind via CDN and small local CSS/JS.

- Open `docs/index.html` directly or serve the repo and visit `/docs/`.
- Base CSS: `docs/assets/site.css`
- Base JS: `docs/assets/site.js`


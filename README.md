# Mesh Contingency marketing site

An Angular site for [mesh-contingency](https://github.com/DJSnitker/mesh-contingency).

```sh
npm install
npm start          # dev server at http://localhost:4200
npm run build      # prerendered pages in dist/mesh-contingency-marketing/browser
```

- Each page is a route (`src/app/app.routes.ts`, components in `src/app/pages`), prerendered at
  build time to its own `index.html`, so every address works on GitHub Pages and has its own title
  and description for link previews.
- Shared copy (commands, features, the console and app tours, the hero carousel's slides, guides) lives in
  `src/app/content.ts`.
- Brand colors are CSS variables at the top of `src/styles.scss`, taken from
  `docs/branding` in mesh-contingency: `#0D1117`, `#151B23`, `#FF5F1F`, `#38BDF8`, `#F2F5F8`.
- Logos in `public/branding` are copied from that same folder; re-copy them if the branding changes.
- Console screenshots in `public/console` come from mesh-contingency's
  `scripts/demo_console.py --screenshots DIR` (made-up data); regenerate them when the console changes.
- App screenshots in `public/app` come from the app's demo build (`npm run demo` in
  mesh-contingency's `app/`: a pretend radio answering with the bot's real replies): the phone ones
  at 390×844 at 2x, the `desktop-*` ones at 880×620 at 2x; regenerate them when the app's screens
  change.

## Deploying

Pushes to `main` build and publish the site to GitHub Pages
(`.github/workflows/deploy.yml`). The base path comes from the repo's Pages
settings, so it works under `/<repo>/` or on a custom domain without changes.

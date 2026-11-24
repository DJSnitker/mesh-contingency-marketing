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
- Shared copy (the channel and admin demos, commands, safeguards, wiki guides, wallpapers) lives in
  `src/app/content.ts`. It follows mesh-contingency 1.0's README and wiki; the pages from before 1.0
  (`/console`, `/app`, `/people`) are redirects.
- Brand colors are CSS variables at the top of `src/styles.scss`, taken from
  `docs/branding` in mesh-contingency: `#0D1117`, `#151B23`, `#FF5F1F`, `#38BDF8`, `#F2F5F8`.
- Logos in `public/branding` are copied from that same folder; re-copy them if the branding changes.
- Wallpapers (the `/wallpapers` page) live in `resources/wallpapers`, published under
  `wallpapers/`; its README has the generator and the commands to redraw them.

## Deploying

Pushes to `main` build and publish the site to GitHub Pages
(`.github/workflows/deploy.yml`). The base path comes from the repo's Pages
settings, so it works under `/<repo>/` or on a custom domain without changes.

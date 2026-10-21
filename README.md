# Mesh Contingency marketing site

A single-page Angular site for [mesh-contingency](https://github.com/DJSnitker/mesh-contingency).

```sh
npm install
npm start          # dev server at http://localhost:4200
npm run build      # static output in dist/mesh-contingency-marketing/browser
```

- Copy (features, commands, guides) lives in `src/app/content.ts`.
- Brand colors are CSS variables at the top of `src/styles.scss`, taken from
  `docs/branding` in mesh-contingency: `#0D1117`, `#151B23`, `#FF5F1F`, `#38BDF8`, `#F2F5F8`.
- Logos in `public/branding` are copied from that same folder; re-copy them if the branding changes.

## Deploying

Pushes to `main` build and publish the site to GitHub Pages
(`.github/workflows/deploy.yml`). The base path comes from the repo's Pages
settings, so it works under `/<repo>/` or on a custom domain without changes.

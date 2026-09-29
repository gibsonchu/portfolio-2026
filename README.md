# Gibson Chu — local recreation

Faithful frontend recreation of https://gibsonchu.com/, captured September 29, 2026.

Built with React and Vite. Includes the profile, Selected Works and Information panels, organic-waste research article, live clock, hover previews, and image enlargement. All image/font assets are served locally; external links retain their original destinations.

## Development

```sh
npm install
npm run dev -- --host 0.0.0.0 --port 4173 --strictPort
```

## Validation

```sh
npm run build
npm run test:sites
```

Source content lives in `src/content.json`; behavior in `src/App.jsx`; visual rules in `src/styles.css`. Source asset URL provenance is recorded in `public/asset-manifest.json`. Fonts retain their original third-party ownership and licensing terms.

See `design-qa.md` for verification details; screenshot evidence remains in the local recreation workspace. Production URL: https://gibsonchu.vercel.app/

GitHub: https://github.com/gibsonchu/portfolio-2026

Vercel deploys the main branch, using the Vite build output in dist/client.

# Scally Network

Astro rebuild of Jake Scally's personal site and archive for [https://jakescally.com](https://jakescally.com).

## Commands

- `npm run dev`
- `npm run build`
- `npm run preview`
- `npm run check`
- `npm run test:e2e`

## Content

- Blog posts live in `src/content/blog`
- Project entries live in `src/content/projects`
- Photo sets live in `src/content/photoSets`
- Drink recipes live in `src/content/drinks`
- Static page content lives in `src/content/sitePages`
- Authoring workflow is documented in `AUTHORING_GUIDE.md`

## Deployment

The repo is configured for GitHub Pages via `.github/workflows/deploy.yml`.
`npm run build` produces the static `dist/` output, Pagefind search index, `feed.xml`, `robots.txt`, and `sitemap.xml`.

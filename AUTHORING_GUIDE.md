# Scally Network Authoring Guide

This site is an Astro-based static site. Content is file-driven. You add Markdown, MDX, and images to the repo, preview locally, then build and deploy.

## Quick Start

From the project root:

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

Before committing:

```bash
npm run build
```

That runs Astro checks, builds the static site, and generates the Pagefind search index.

## Content Locations

- Blog posts: `src/content/blog`
- Projects: `src/content/projects`
- Photo sets: `src/content/photoSets`
- Drink recipes: `src/content/drinks`
- Static page content: `src/content/sitePages`
- Images and graphics: `src/assets`

## What Is Automatic Now

You no longer need to register new content in `src/lib/content.ts`.

You no longer need to register new images in `src/lib/assets.ts`.

The generated registries are rebuilt automatically whenever you run:

- `npm run dev`
- `npm run check`
- `npm run build`
- `npm run preview`

Relevant scripts:

- `scripts/generate-asset-map.mjs`
- `scripts/generate-content-registry.mjs`

Anything added to the content folders and `src/assets` is discovered automatically as long as:

- the frontmatter is valid
- image paths point to files inside `src/assets`
- slugs are unique

## Image Paths

All content files reference images relative to `src/assets`, without the `src/assets/` prefix.

Examples:

- `editorial/github-image.png`
- `photos/japanPictures1/P1010602.jpg`
- `photos/powershotG2shots/firetower.jpg`

Do not write paths like:

- `/src/assets/photos/example.jpg`
- `./image.jpg`

## Blog Posts

Blog posts live in `src/content/blog`.

Use `.md` for normal posts.

Use `.mdx` when you need embedded galleries or inline images.

### Required Frontmatter

```md
---
title: My New Post
slug: my-new-post
description: Short summary for cards, archive pages, and SEO.
publishedAt: 2025-03-11
topics:
  - Photography
  - Cameras
heroImage: photos/example/hero.jpg
featured: false
legacyPaths: []
---
```

### Optional Fields

- `updatedAt`
- `draft`
- `photoSetIds`

### Example Markdown Post

```md
---
title: Example Post
slug: example-post
description: A short summary.
publishedAt: 2025-03-11
topics:
  - Notes
heroImage: editorial/example.png
featured: false
legacyPaths: []
---

This is a normal Markdown post.
```

### Example MDX Post

```mdx
---
title: Example MDX Post
slug: example-mdx-post
description: A post with richer media.
publishedAt: 2025-03-11
topics:
  - Photography
heroImage: photos/example/hero.jpg
featured: false
legacyPaths: []
photoSetIds:
  - my-photo-set
---

This post includes an inline image:

<InlineImage
  asset="photos/example/detail.jpg"
  alt="A detailed view of the subject."
  caption="Optional caption."
/>

And an embedded gallery:

<GalleryEmbed set="my-photo-set" />
```

## Inline Images

Inline images are available in blog posts automatically through the writing layout.

Use:

```mdx
<InlineImage
  asset="photos/example/detail.jpg"
  alt="Describe the image clearly."
  caption="Optional caption."
/>
```

Behavior:

- scales to the article width
- preserves original proportions
- opens in a fullscreen lightbox on click

## Photo Sets

Photo sets live in `src/content/photoSets`.

These power:

- the Photography index
- standalone photo-set pages
- embedded galleries inside blog posts

### Photo Set Template

```md
---
title: My Photo Set
slug: my-photo-set
description: Short gallery description.
coverImage: photos/example/cover.jpg
featured: false
legacyPaths: []
images:
  - src: photos/example/cover.jpg
    alt: Cover image description.
  - src: photos/example/second.jpg
    alt: Second image description.
    caption: Optional caption.
---

Optional intro text for the standalone photo-set page.
```

### Notes

- `featured: true` lets a photo set appear on the home page
- `slug` becomes the URL at `/photography/<slug>/`
- `images` is the gallery content

## Projects

Projects live in `src/content/projects`.

### Project Template

```md
---
title: My Project
slug: my-project
summary: Short project summary.
year: 2025
status: shipping
stack:
  - Astro
  - TypeScript
links:
  github: https://github.com/yourname/project
  demo: https://example.com
heroImage: editorial/example.png
featured: true
detailMode: case-study
---

Project write-up content goes here.
```

### Important Fields

- `featured: true` surfaces it more prominently
- `detailMode: case-study` gives it a standalone detail page
- `detailMode: card` keeps it as a lighter project card entry

## About Page

The About page content lives in:

- `src/content/sitePages/about.md`

Edit that file directly.

## Slugs And URLs

Each content type uses its `slug` for URLs:

- blog post: `/writing/<slug>/`
- project: `/projects/<slug>/`
- photo set: `/photography/<slug>/`
- drink recipe: `/bar/<slug>/`

Keep slugs stable after publishing unless you also add redirects.

## Redirects For Old URLs

Legacy redirects are defined in:

- `src/lib/legacy-redirects.ts`

If you rename a published route and want the old path to keep working, add a redirect there.

## Homepage Surfacing

Homepage visibility is controlled by frontmatter:

- blog posts: `featured: true` marks the lead article candidate
- projects: `featured: true` surfaces them in selected work
- photo sets: `featured: true` surfaces them in the Photography section

## Drafts

For blog posts, use:

```md
draft: true
```

Draft posts stay out of the published archive.

For drink recipes, use:

```md
draft: true
```

Draft drinks stay out of `/bar/` and do not get detail pages.

## Drinks

Drink recipes live in `src/content/drinks`.

They power:

- the `/bar/` menu landing page
- individual recipe pages under `/bar/<slug>/`

### Drink Template

```md
---
title: Example Negroni
slug: example-negroni
description: Bitter, bright, and stirred cold for anyone who likes a classic aperitivo profile.
menuSection: House Standards
baseSpirit: Gin
tags:
  - Bitter
  - Stirred
  - Aperitif
heroImage: drinks/example-negroni.jpg
glassware: Double rocks
garnish: Orange twist
method: Stir
ingredients:
  - amount: 1 oz
    ingredient: London dry gin
  - amount: 1 oz
    ingredient: Campari
  - amount: 1 oz
    ingredient: Sweet vermouth
instructions:
  - Add all ingredients to a mixing glass with ice.
  - Stir until cold and properly diluted.
  - Strain over a large cube and express an orange twist.
searchTerms:
  - classic
  - equal parts
sortOrder: 10
inStock: true
draft: false
---

Optional notes can live here in normal Markdown.
```

### Notes

- Put drink images under `src/assets/drinks`
- `menuSection` controls grouping on `/bar/`
- `baseSpirit`, `tags`, `ingredients`, `description`, and `searchTerms` are all searchable
- `sortOrder` controls order within and across sections
- `inStock: false` adds an out-of-stock marker to the menu item without hiding the recipe
- `heroImage` is optional
- the Markdown body is optional and renders on the recipe detail page

## Recommended Workflow For A New Post

1. Add any new images to `src/assets/editorial` or `src/assets/photos/...`.
2. Create a new file in `src/content/blog`.
3. Add frontmatter and body content.
4. If needed, create a related photo set in `src/content/photoSets`.
5. Run `npm run dev` and review the page locally.
6. Run `npm run build`.
7. Commit and push.

## Recommended Workflow For A New Gallery

1. Add the image files under `src/assets/photos/...`.
2. Create a new file in `src/content/photoSets`.
3. Fill in the frontmatter and image list.
4. Optionally embed it into a blog post with `<GalleryEmbed set="your-slug-or-id" />`.
5. Preview with `npm run dev`.
6. Verify with `npm run build`.

## Recommended Workflow For A New Drink

1. Add any recipe image to `src/assets/drinks`.
2. Create a new file in `src/content/drinks`.
3. Fill in the frontmatter for metadata, ingredients, and instructions.
4. Add optional Markdown notes below the frontmatter if useful.
5. Preview locally with `npm run dev`.
6. Verify the menu at `/bar/` and the recipe page at `/bar/<slug>/`.
7. Run `npm run build`.

## Troubleshooting

### Build fails with "Missing image asset"

One of your frontmatter or MDX image paths does not match a file under `src/assets`.

Check for:

- wrong folder name
- wrong capitalization
- wrong file extension
- a leading slash you did not intend

### A post does not appear

Check:

- frontmatter syntax
- `draft: true`
- duplicate slug
- invalid date

### Search does not work in dev

That is expected. Pagefind is generated during `npm run build`.

To test search locally:

```bash
npm run build
npm run preview
```

## Current Command Reference

- `npm run dev`: local development server
- `npm run check`: Astro validation
- `npm run build`: production build plus search index
- `npm run preview`: preview the built site locally
- `npm run test:e2e`: Playwright smoke tests

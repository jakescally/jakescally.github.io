# Scally Network Site Content Guide

This guide is for updating the main site content: images, blog posts, photo sets, projects, and the About page.

Use `DRINK_MENU_AUTHORING_GUIDE.md` for the apartment bar menu. The drink workflow is separate enough that it has its own guide.

## What This Site Is

- The site is an Astro static site.
- Content is file-driven. Most updates are made by editing Markdown or MDX in `src/content/` and images in `src/assets/`.
- The live site is deployed by GitHub Actions from pushes to `main`.
- You do not hand-edit generated registries or the built `dist/` output.

## One-Time Setup

If you are returning after a long break, start here:

```bash
nvm use 20
npm install
```

If you do not use `nvm`, the important part is using a Node version compatible with Node 20, because the deploy workflow runs on Node 20.

## The Only Commands You Normally Need

From the repo root:

```bash
npm run dev
```

- Starts the local dev server at `http://localhost:4321`
- Rebuilds the generated content and asset registries first

```bash
npm run build
```

- Rebuilds generated registries
- Runs Astro checks
- Builds the production site into `dist/`
- Generates the Pagefind search index used by `/search/`

```bash
npm run preview
```

- Serves the built site from `dist/`
- Use this if you want to test site search locally after `npm run build`

Optional extra validation:

```bash
npm run test:e2e
```

## How Publishing Works

`main` is the publish branch.

The live deploy happens when:

1. You commit your changes.
2. You push them to `origin/main`, or merge a branch into `main`.
3. GitHub Actions runs `.github/workflows/deploy.yml`.
4. That workflow runs `npm ci` and `npm run build`.
5. The built `dist/` folder is deployed to GitHub Pages at `https://jakescally.com`.

Important:

- Pushing to a branch other than `main` does not publish the site.
- You do not need to edit `dist/`.
- You do not need to trigger deployment manually unless you want to rerun the workflow with no new commit.

## Where Everything Lives

| What you are adding | Folder | What it creates |
| --- | --- | --- |
| Blog posts | `src/content/blog` | `/writing/<slug>/`, writing archive entries, RSS feed items, sitemap entries |
| Projects | `src/content/projects` | `/projects/` cards, and optionally `/projects/<slug>/` if `detailMode: case-study` |
| Photo sets | `src/content/photoSets` | `/photography/<slug>/`, photography archive cards, optional gallery embeds in posts |
| About page content | `src/content/sitePages/about.md` | `/about/` page content |
| Images | `src/assets` | Source images used throughout the site |

There is not a generic "drop a Markdown file here and get a new page" system for `src/content/sitePages`.

Right now, `about.md` is the only static page content file wired into the site. If you want a brand new top-level page such as `/talks/` or `/resume/`, that is a code change in `src/pages/`, not just a content change.

## Rules That Matter Everywhere

### 1. Image paths are always relative to `src/assets`

Correct:

- `editorial/github-image.png`
- `photos/powershotG2camera/front.jpg`
- `drinks/my-cocktail.jpg`

Wrong:

- `/src/assets/editorial/github-image.png`
- `./front.jpg`
- `/photos/powershotG2camera/front.jpg`

### 2. Supported image formats

The asset generator picks up these file types anywhere under `src/assets/`:

- `.avif`
- `.gif`
- `.jpeg`
- `.jpg`
- `.png`
- `.webp`

You can create new folders under `src/assets/` whenever you want. The generator walks the whole tree.

### 3. Do not edit generated files by hand

These are generated automatically:

- `src/generated/assets.generated.ts`
- `src/generated/content.generated.ts`

These are rebuilt whenever you run:

- `npm run dev`
- `npm run check`
- `npm run build`
- `npm run preview`

If those generated files changed because you added content or images, that is expected. Do not hand-edit them.

### 4. Keep file names and slugs aligned

Best practice:

- file name: `my-new-post.md`
- frontmatter slug: `my-new-post`

This is especially important for photo sets, because collection IDs come from file names and gallery references are easier to reason about when the file stem and slug match.

### 5. Slugs must be unique within their content type

If two blog posts share a slug, or two projects share a slug, routing becomes ambiguous. Pick a new slug instead of reusing an old one.

## Adding Images

If all you need is a new image asset:

1. Put the file somewhere under `src/assets/`.
2. Use an image path relative to `src/assets/` when you reference it from frontmatter or MDX.
3. Run `npm run dev` or `npm run build` so the asset registry is regenerated.

Recommended folders:

- `src/assets/editorial` for article/project graphics, screenshots, or diagrams
- `src/assets/photos/<set-name>` for photo-set image groups
- `src/assets/drinks` for bar menu images
- `src/assets/brand` for logos, icons, or site identity assets

If you want the image to have its own public page, that is not just an image upload. Create a photo set, or embed it inside a blog post.

## Adding a Blog Post

Blog posts live in `src/content/blog`.

### When to use `.md` vs `.mdx`

Use `.md` when the post is normal text content.

Use `.mdx` when you need custom embedded media inside the article body, especially:

- `<InlineImage ... />`
- `<GalleryEmbed set="..." />`

### Copy-Paste Blog Template

```md
---
title: My New Post
slug: my-new-post
description: Short summary for archive cards, social previews, and SEO.
publishedAt: 2025-03-17
updatedAt: 2025-03-17
topics:
  - Notes
  - Development
heroImage: editorial/example.png
featured: false
draft: false
legacyPaths: []
photoSetIds: []
---

Write the post here.
```

If you want no hero image, leave `heroImage:` blank.

### Blog Fields Explained

- `title`: shown on the article page, cards, home page, feed, and metadata.
- `slug`: creates the URL at `/writing/<slug>/`.
- `description`: shown on cards and article headers; also used for feed and metadata.
- `publishedAt`: controls archive ordering. Newer dates appear first.
- `updatedAt`: currently used for sitemap `lastmod`; it is not shown on the article page.
- `topics`: creates the filter chips on `/writing/` and powers related-post matching.
- `heroImage`: optional display image for the article card and hero. Path is relative to `src/assets/`.
- `featured`: if `true`, the newest featured post becomes the home page lead story.
- `draft`: if `true`, the post is hidden from the site.
- `legacyPaths`: keep this as `[]` unless you want to record old URLs for yourself. This field does not create redirects.
- `photoSetIds`: use this when a post is tied to one or more photo sets. The photography landing page only checks whether this array has values, but you should still keep the values accurate.

### What Happens When You Publish a Blog Post

If `draft: false`, the post appears in:

- `/writing/`
- `/writing/<slug>/`
- `feed.xml`
- `sitemap.xml`

It may also appear on the home page:

- The home page lead article is the newest post with `featured: true`.
- If no posts are featured, the newest published post becomes the lead.

### MDX Components Available in Blog Posts

Inside blog post MDX, these are already wired in:

```mdx
<InlineImage
  asset="photos/example/detail.jpg"
  alt="Describe the image clearly."
  caption="Optional caption."
/>
```

```mdx
<GalleryEmbed set="my-photo-set" />
```

Use `set` as the photo set slug or file stem. Keeping the file stem and slug identical avoids mistakes.

## Adding a Photo Set

Photo sets live in `src/content/photoSets`.

Use a photo set when:

- you want a standalone gallery page under `/photography/`
- you want to group many related images together
- you want to embed a gallery into a blog post

### Copy-Paste Photo Set Template

```md
---
title: My Photo Set
slug: my-photo-set
description: Short gallery description.
date: 2025-03-17
location: Tokyo, Japan
camera: Canon PowerShot G2
coverImage: photos/my-photo-set/cover.jpg
featured: false
legacyPaths: []
images:
  - src: photos/my-photo-set/cover.jpg
    alt: Cover image description.
    caption: Optional caption.
  - src: photos/my-photo-set/detail.jpg
    alt: Detail image description.
    exif: Optional EXIF or capture note.
---

Optional intro text for the photo-set page.
```

### Photo Set Fields Explained

- `title`: shown on the photography page and the photo-set page.
- `slug`: creates the URL at `/photography/<slug>/`.
- `description`: shown on cards and in the photo-set header.
- `date`: optional, but affects sorting and sitemap `lastmod`.
- `location`: shown on the photography card.
- `camera`: shown on the photography card.
- `coverImage`: required hero image for the card and page.
- `featured`: if any photo sets are featured, the home page photography section shows featured sets only.
- `legacyPaths`: informational only; it does not create redirects.
- `images`: the actual gallery. Every image needs at least `src` and `alt`.
- body content below the frontmatter: shown above the gallery on the standalone photo-set page.

### Embedding a Photo Set Into a Blog Post

1. Create the photo set file first.
2. In the blog post MDX body, add:

```mdx
<GalleryEmbed set="my-photo-set" />
```

3. Add `photoSetIds` to the blog post frontmatter if you want that post to be treated as a photo-heavy article on `/photography/`.

## Adding a Project

Projects live in `src/content/projects`.

Projects do not support drafts right now. If a project file exists in the repo, it is live.

### Copy-Paste Project Template

```md
---
title: My Project
slug: my-project
summary: Short project summary for cards and metadata.
year: 2025
status: shipping
stack:
  - Astro
  - TypeScript
links:
  github: https://github.com/yourname/project
  demo: https://example.com
  writeup: /writing/some-article/
heroImage: editorial/example.png
featured: false
detailMode: case-study
---

Project write-up body goes here.
```

### Allowed Project Status Values

- `building`
- `shipping`
- `documenting`
- `archived`

### The Most Important Project Choice: `detailMode`

`detailMode: case-study`

- creates an internal page at `/projects/<slug>/`
- renders the Markdown body on that page
- uses the project card to link to that internal page

`detailMode: card`

- does not create an internal project page
- uses `links.writeup`, then `links.github`, then `links.demo` for the card link
- does not render the Markdown body anywhere on the live site

If you choose `card` and provide no link fields, the project still appears in `/projects/`, but it will not have a clickable title.

### Project Fields Explained

- `title`: shown on cards and case-study pages.
- `slug`: only matters for `case-study` projects.
- `summary`: shown on cards and case-study headers.
- `year`: displayed on cards and used for sorting.
- `status`: displayed on cards and case-study headers.
- `stack`: shown as pills on project cards.
- `links.github`: optional external GitHub link.
- `links.demo`: optional external demo link.
- `links.writeup`: optional link to a write-up, often one of your `/writing/.../` URLs.
- `heroImage`: required.
- `featured`: featured projects are prioritized on `/projects/` and the home page.
- `detailMode`: decides whether the project is a case study or a link-out card.

### Project Sorting

Projects are sorted by:

1. `featured: true` first
2. newer `year` first
3. title alphabetically

There is no manual `sortOrder` field for projects.

## Updating the About Page

The About page content lives in `src/content/sitePages/about.md`.

Template:

```md
---
title: About Scally Network
description: Short description for the page header.
heroImage: editorial/example.png
---

Full About page body goes here.
```

Important:

- The `/about/` page uses this file directly.
- The home page only uses the `title` and `description` from this file.
- The body text in the home page About section is hardcoded in `src/pages/index.astro`.

So:

- edit `src/content/sitePages/about.md` to change the actual About page
- edit `src/pages/index.astro` only if you also want to change the home page teaser copy

## Renaming Something That Is Already Live

If you rename a published slug, do not just change the frontmatter and walk away.

Do this instead:

1. Update the content file's `slug`.
2. Add a redirect entry to `src/lib/legacy-redirects.ts`.
3. Run `npm run build`.
4. Test the old URL locally if it matters.

Important:

- `legacyPaths` in frontmatter does not create redirects.
- Actual redirects only come from `src/lib/legacy-redirects.ts`.

## Exact Publish Checklist

When you are done authoring, do this every time:

1. Run `npm run dev`.
2. Open the relevant page locally and confirm the content appears where you expect.
3. Run `npm run build`.
4. If you need to test site search, run `npm run preview` and check `/search/`.
5. Run `git status`.
6. Review the changed files. Expect to see your content file, any new images, and possibly the generated files in `src/generated/`.
7. Commit all relevant changes, including generated file updates if they changed.
8. Push to `main`, or merge into `main`.
9. Wait for the GitHub Pages deploy workflow to finish.

## What You Never Need to Touch for Normal Content Updates

- `dist/`
- `.astro/`
- `src/generated/assets.generated.ts`
- `src/generated/content.generated.ts`
- `.github/workflows/deploy.yml`

## Troubleshooting

### The build says `Missing image asset`

One of your image paths does not match a real file under `src/assets/`.

Check:

- folder name
- file name capitalization
- file extension
- whether you accidentally included a leading slash

### A blog post does not appear

Check:

- `draft: true`
- invalid frontmatter syntax
- duplicate slug
- bad date value

### A project does not get its own page

That project is probably using `detailMode: card`.

Only `detailMode: case-study` creates `/projects/<slug>/`.

### A photo set is not on the home page

Home page photography cards show:

- featured photo sets, if any exist
- otherwise the first three photo sets from the normal sort order

If you want a set on the home page reliably, mark it `featured: true`.

### Search looks empty during `npm run dev`

That is expected for the global site search page.

The site search index is only generated during `npm run build`. To test it locally:

```bash
npm run build
npm run preview
```

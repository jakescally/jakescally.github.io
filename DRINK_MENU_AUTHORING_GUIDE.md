# Scally Network Drink Menu Guide

This guide is only for the apartment bar menu at `/bar/`.

The drink menu is content-driven, but it behaves differently from the rest of the site:

- every drink is a Markdown file in `src/content/drinks`
- the live page is a single menu landing page at `/bar/`
- individual drinks do not get their own Astro pages
- direct recipe links use hash URLs like `/bar/#old-fashioned`

## What Actually Powers the Live Drink Menu

Only drink frontmatter is used on the live site.

Important:

- the menu card list comes from drink frontmatter
- the recipe modal comes from drink frontmatter
- the drink file body below the frontmatter is not rendered anywhere on the live site right now

You can still use the body for private notes in the repo, but it is not public.

## Files and Folders You Will Use

| What you are changing | Folder |
| --- | --- |
| Drink recipes | `src/content/drinks` |
| Drink images | `src/assets/drinks` |

`src/assets/drinks` does not exist yet in this repo. Create it when you add the first drink image, or use another folder under `src/assets/` if you prefer.

## Commands You Need

```bash
npm run dev
```

- starts the local site
- rebuilds the generated content and asset registries first

```bash
npm run build
```

- rebuilds generated registries
- checks the site
- builds the production output

## Copy-Paste Drink Template

Create a file in `src/content/drinks` named after the slug, for example:

- `src/content/drinks/manhattan.md`

Use this template:

```md
---
title: Manhattan
slug: manhattan
description: Spirit-forward rye with sweet vermouth and bitters.
menuSection: House Standards
baseSpirit: Rye
tags:
  - Stirred
  - Classic
  - Spirit-forward
heroImage: drinks/manhattan.jpg
glassware: Coupe
garnish: Brandied cherry
method: Stir
ingredients:
  - amount: 2 oz
    ingredient: Rye whiskey
  - amount: 1 oz
    ingredient: Sweet vermouth
  - amount: 2 dashes
    ingredient: Angostura bitters
instructions:
  - Add all ingredients to a mixing glass with ice.
  - Stir until chilled and diluted.
  - Strain into a chilled coupe.
  - Garnish with a brandied cherry.
searchTerms:
  - whiskey
  - rye
  - vermouth
sortOrder: 10
inStock: true
updatedAt: 2025-03-17
draft: false
---

Optional private notes can go here, but they are not rendered on the live site.
```

## Drink Fields Explained

- `title`: shown on the menu card and in the recipe modal.
- `slug`: used for the modal hash URL, for example `/bar/#manhattan`.
- `description`: shown on the menu card and in the modal header; also included in search.
- `menuSection`: creates the visible menu section heading and the section filter chip.
- `baseSpirit`: shown on the card and creates the spirit filter chip.
- `tags`: searchable; the first two tags also appear on the menu card.
- `heroImage`: optional modal image. If omitted, the modal shows a text placeholder instead.
- `glassware`: shown in the recipe modal service section and on the card tail.
- `garnish`: shown in the modal.
- `method`: shown on the card and in the modal.
- `ingredients`: shown in the recipe modal. Each item needs `amount` and `ingredient`. `notes` is optional.
- `instructions`: shown in the recipe modal as the numbered method.
- `searchTerms`: extra words that help the menu search find the drink.
- `sortOrder`: controls ordering. Lower numbers appear first.
- `inStock`: if `false`, the drink still appears but gets an `Out of stock` badge.
- `updatedAt`: currently stored in data, but not shown anywhere on the live bar page.
- `draft`: if `true`, the drink is hidden from `/bar/`.

## The Three Most Important Drink Rules

### 1. Keep the file name and slug the same

Recommended:

- file: `src/content/drinks/manhattan.md`
- slug: `manhattan`

This keeps the content registry and the hash URL easy to reason about.

### 2. Be consistent with `menuSection` and `baseSpirit`

These values are used exactly as written for filters.

That means:

- `House Standards` and `House standards` become two different section chips
- `Whiskey`, `Whisky`, `Bourbon`, and `Rye` become separate spirit chips

Choose the naming you want and keep using it consistently.

### 3. `draft` hides; `inStock` does not

- `draft: true` removes the drink from the menu completely
- `inStock: false` keeps the drink visible and marks it unavailable

Use `draft` for unpublished work.

Use `inStock: false` for a published recipe you want listed but unavailable.

## How Ordering Really Works

There are two layers of ordering on `/bar/`:

1. section order
2. drink order within each section

### Drink order inside a section

Drinks inside a section are sorted by:

1. lower `sortOrder` first
2. title alphabetically for ties

### Section order

Sections are not configured in a separate file.

The section order is derived from the first drink from each section that appears in the global sort.

In practice, that means the section with the lowest-numbered drink appears first.

If two sections tie on their first visible drink's `sortOrder`, the section that wins the title tiebreak on that first drink appears first.

### Recommended numbering scheme

Use number bands so section placement is predictable.

Example:

- `10` to `19`: House Standards
- `20` to `29`: Citrus & Sours
- `30` to `39`: Martinis & Up
- `40` to `49`: Low / No Proof

You do not have to use that exact scheme, but using grouped ranges makes the menu easier to maintain.

## What the Bar Search Looks At

The `/bar/` search is local to the bar page. It searches:

- title
- description
- menu section
- base spirit
- glassware
- garnish
- method
- tags
- search terms
- ingredient names
- ingredient amounts
- ingredient notes

So if you want a drink to be easy to find:

- write a strong description
- use consistent tags
- add a few useful `searchTerms`

## Adding a Drink Image

Drink images are optional.

If you want one:

1. Create `src/assets/drinks/` if it does not exist.
2. Add the image file there.
3. Reference it in frontmatter without the `src/assets/` prefix.

Example:

```md
heroImage: drinks/manhattan.jpg
```

Supported image types are:

- `.avif`
- `.gif`
- `.jpeg`
- `.jpg`
- `.png`
- `.webp`

## Exact Workflow for Adding a New Drink

1. Decide the final section name, base spirit label, and slug before you start.
2. If you want an image, add it under `src/assets/drinks/`.
3. Create `src/content/drinks/<slug>.md`.
4. Fill in the frontmatter.
5. Run `npm run dev`.
6. Open `http://localhost:4321/bar/`.
7. Confirm all of the following:
   - the drink appears in the expected section
   - the section filter chip text is correct
   - the base spirit chip text is correct
   - the card order is correct
   - the modal opens and shows the recipe correctly
   - the image loads if you added one
   - searching for obvious terms finds the drink
8. Test the direct hash URL if you care about sharing it:

```text
http://localhost:4321/bar/#your-slug
```

9. Run `npm run build`.
10. Run `git status` and review the changed files.
11. Commit the drink file, any new image, and any changed generated files in `src/generated/`.
12. Push to `main`, or merge into `main`.
13. Wait for the GitHub Pages deploy workflow to finish.

## Editing an Existing Drink

To update a drink that is already live:

1. Edit the existing file in `src/content/drinks/`.
2. Run `npm run dev` and check `/bar/`.
3. Run `npm run build`.
4. Commit and push to `main`.

## Hiding or Removing a Drink

Use `draft: true` if you want to hide the drink but keep the file around.

Delete the file only if you truly want to remove it from the repo.

## Renaming a Drink Slug

If you change a drink slug:

- the direct link changes from `/bar/#old-slug` to `/bar/#new-slug`
- old shared hash links do not redirect

There is no redirect system for old drink hash fragments.

So if a drink is already shared around with a slug, only rename it if you are okay breaking those old deep links.

## What You Never Need to Touch for Drink Updates

- `src/generated/content.generated.ts`
- `src/generated/assets.generated.ts`
- `dist/`
- `.github/workflows/deploy.yml`

Those are either generated or deployment-only.

## Troubleshooting

### The drink does not appear on `/bar/`

Check:

- `draft: true`
- invalid frontmatter formatting
- missing required fields
- whether the dev server was restarted after a bad edit

### The drink image does not load

Check:

- the file really exists under `src/assets/`
- the path does not start with `/`
- the capitalization matches exactly
- the file extension matches exactly

### The menu got a duplicate section or spirit chip

You probably changed capitalization or wording.

Examples:

- `House Standards` vs `House standards`
- `Gin` vs `London Dry Gin`

Normalize the field values across the drink files.

### My notes under the frontmatter are not showing up

That is expected.

The Markdown body of drink files is not rendered on the live site right now. Only frontmatter powers the menu and modal.

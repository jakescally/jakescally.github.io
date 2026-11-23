# Scally Network Recipe Guide

How to add recipes to `/recipes/`.

- Every recipe is one Markdown file in `src/content/recipes/`.
- Each recipe gets its own page at `/recipes/<slug>/`.
- `/recipes/` lists them all, grouped by category, with search and filters for cuisine and tags.
- Recipe photos go in `src/assets/recipes/` (create it when you add the first one).
- The **Recipes** link in the site nav appears automatically once at least one recipe is published.

## Workflow

1. Copy `src/content/recipes/example-buttermilk-pancakes.md` to a new file named after the slug, e.g. `src/content/recipes/carbonara.md`.
2. Fill in the front matter (template below) and write any notes under it.
3. Leave `draft: true` while you work. Drafts show up in `npm run dev` (marked DRAFT) but never on the live site.
4. Set `draft: false` (or delete the line) when it's ready.
5. Run `npm run build` to check it, then commit and push to `main` to publish.

If a field has the wrong shape (for example, `servings` missing or a timer that isn't a number), `npm run build` fails and names the file and field.

## Template

```yaml
---
title: Carbonara
slug: carbonara                # becomes /recipes/carbonara/
description: One line.         # optional
category: Mains                # tab on the recipes page; any text, e.g. Breakfast, Soups, Baking
cuisine: Italian               # optional; the nationality filter
tags:                          # optional
  - Quick
servings: 2                    # required: what the amounts below are written for
prepTime: 10                   # optional, minutes
cookTime: 15                   # optional, minutes
totalTime: 25                  # optional; defaults to prep + cook
heroImage: recipes/carbonara.jpg   # optional, path under src/assets/
ingredients:
  - qty: 200
    unit: g
    item: spaghetti
  - group: Sauce               # optional heading; consecutive items with the same group share it
    qty: 3
    item: egg yolks
    grams: 55                  # optional weight, used by the Grams button
  - group: Sauce
    qty: 1/2
    unit: cup
    item: pecorino romano
    note: finely grated
    grams: 50
  - item: black pepper
    note: to taste             # no qty means it never scales
steps:
  - Boil the pasta in well-salted water.
  - text: Rest the sauce off the heat.   # a step with a timer
    timer: 2                             # minutes
source: Grandma                # optional
sourceUrl: https://example.com # optional; turns the source into a link
draft: true
---
Notes go here. Anything below the front matter shows up in the recipe's Notes section.
```

## Quantities and units

`qty` accepts numbers or text: `2`, `0.5`, `1/2`, `1 1/2`, `1½`, or a range like `2-3`.

`unit` can be any of these. Spelled-out and plural forms work too (`tablespoons`, `cups`, `grams`):

| Kind | Units |
| --- | --- |
| Volume | `tsp`, `tbsp`, `cup`, `fl oz`, `pint`, `quart`, `gallon`, `ml`, `l` |
| Weight | `g`, `kg`, `oz`, `lb` |
| Anything else | e.g. `clove`, `can`, `pinch`, or none at all. Scaled as a count and never converted. |

What the unit buttons do:

- **As written:** your units, scaled to the chosen servings.
- **Cups & spoons:** US measures. Picks tsp, tbsp or cups automatically, so 12 tsp becomes ¼ cup.
- **Grams:** weights in g/kg. For volume ingredients (a cup of flour), add `grams:` with the weight of the written amount. Without it, the page falls back to ml. Counted items with `grams:` show both, e.g. `3 (150 g)`.

The reader's unit choice is remembered between recipes.

## On the recipe page

- Servings − / + rescale every amount that has a `qty`.
- Tick ingredients and steps off as you go.
- Steps with a `timer` get a start button that counts down and beeps.
- **Keep screen on** stops the phone from sleeping (on browsers that support it).
- **Print** gives a clean page without the controls.

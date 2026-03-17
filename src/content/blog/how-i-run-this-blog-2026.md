---
title: How I run the new site (2026)
slug: how-i-run-this-blog-2026
description: Finally replaced the old Jekyll site with an Astro site, with a little help of course
publishedAt: 2026-03-17
topics:
  - Blog
  - Development
  - Tutorial
  - GitHub Pages
heroImage:
featured: false
legacyPaths:
  - /how-i-run-this-blog-2026/
---
I finally ditched Jekyll. Not that it was all that hard considering the coding agents available right now, but the usability for me and viewers is seriously improved. Codex suggested Astro, a different (aptly named) static site framework that is much more usable than Jekyll.

This still wasn't perfect in terms of my workflow though. I really want to be able to come in, write a markdown file as an article or blog post, and build and ship the site. The way I worked around this (really Codex's idea) was to use node scripts that detects new markdown files and fills out the relevant pages and html files, which works really well. Adding a new article is literally as easy as creating a markdown file for it and filling out the common header I have, which looks pretty standard compared to Jekyll's formatting.

Image viewing is also revamped. Images are now separate mini galleries ("photo sets"), and multiple galleries can be embedded within a single post (see the Canon PowerShot G2 article for example, they look excellent there). Then you can view all these photos under the photography tab, which are also organized by photo set. Adding a photo set is also as easy as creating a header-only markdown file and including the paths to each image.

Once the markdown files are updated, all I do is `npm run build` (which will also run the node scripts to find and link new articles) and `npm run preview` to view it locally. Pushing to GitHub is exactly as you'd expect.

Anyways, this is a huge improvement for usability. And the UI looks nicer too
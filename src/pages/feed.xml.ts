import type { APIContext } from "astro";
import rss from "@astrojs/rss";

import { getPublishedPosts } from "@/lib/content";
import { siteMeta } from "@/lib/site";

export async function GET(context: APIContext) {
  const posts = getPublishedPosts();

  return rss({
    title: siteMeta.name,
    description: siteMeta.description,
    site: context.site ?? siteMeta.url,
    items: posts.map((entry) => ({
      title: entry.data.title,
      description: entry.data.description,
      pubDate: entry.data.publishedAt,
      link: `/writing/${entry.data.slug}/`
    }))
  });
}

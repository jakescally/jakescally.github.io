import { getCaseStudyProjects, getPhotoSets, getPublishedPosts } from "@/lib/content";
import { getPublishedDrinks } from "@/lib/drinks";
import { siteMeta } from "@/lib/site";

interface SitemapEntry {
  path: string;
  lastmod?: Date;
}

function absoluteUrl(path: string) {
  return new URL(path, `${siteMeta.url}/`).toString();
}

function formatLastmod(value?: Date) {
  return value ? `<lastmod>${value.toISOString()}</lastmod>` : "";
}

export function GET() {
  const entries: SitemapEntry[] = [
    { path: "/" },
    { path: "/about/" },
    { path: "/writing/" },
    { path: "/projects/" },
    { path: "/photography/" },
    { path: "/search/" },
    { path: "/bar/" },
    ...getPublishedPosts().map((entry) => ({
      path: `/writing/${entry.data.slug}/`,
      lastmod: entry.data.updatedAt ?? entry.data.publishedAt
    })),
    ...getCaseStudyProjects().map((entry) => ({
      path: `/projects/${entry.data.slug}/`
    })),
    ...getPhotoSets().map((entry) => ({
      path: `/photography/${entry.data.slug}/`,
      lastmod: entry.data.date
    })),
    ...getPublishedDrinks().map((entry) => ({
      path: `/bar/${entry.data.slug}/`,
      lastmod: entry.data.updatedAt
    }))
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${absoluteUrl(entry.path)}</loc>
    ${formatLastmod(entry.lastmod)}
  </url>`
  )
  .join("\n")}
</urlset>
`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}

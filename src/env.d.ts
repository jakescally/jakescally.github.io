/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "/pagefind/pagefind.js" {
  export interface PagefindItem {
    url: string;
    excerpt?: string;
    meta: {
      title?: string;
    };
  }

  export interface PagefindMatch {
    data: () => Promise<PagefindItem>;
  }

  export function search(term: string): Promise<{
    results: PagefindMatch[];
  }>;
}

declare module "*.JPG" {
  const value: import("astro").ImageMetadata;
  export default value;
}

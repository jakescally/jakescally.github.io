import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://jakescally.com",
  output: "static",
  trailingSlash: "always",
  integrations: [mdx()],
  image: {
    service: {
      entrypoint: "astro/assets/services/sharp"
    }
  }
});

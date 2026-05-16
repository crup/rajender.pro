import { defineConfig } from "astro/config";
import UnoCSS from "@unocss/astro";
import rehypeHighlight from "rehype-highlight";

export default defineConfig({
  site: "https://rajender.pro",
  output: "static",
  devToolbar: {
    enabled: false,
  },
  integrations: [UnoCSS()],
  markdown: {
    syntaxHighlight: false,
    rehypePlugins: [rehypeHighlight],
  },
  prefetch: false,
});

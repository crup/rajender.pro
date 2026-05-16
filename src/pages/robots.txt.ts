import type { APIContext } from "astro";

export function GET({ site }: APIContext) {
  const siteUrl = site ?? new URL("https://rajender.pro");
  return new Response(`User-agent: *\nAllow: /\nSitemap: ${new URL("sitemap.xml", siteUrl).toString()}\n`, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
    },
  });
}
